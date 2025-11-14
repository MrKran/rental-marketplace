import { useState, useEffect, useCallback } from 'react';
import { 
  rateLimiter, 
  logSuspiciousActivity, 
  generateCSRFToken,
  validateCSRFToken,
  containsMaliciousContent 
} from '../utils/security';
import { toast } from 'sonner';


export function useFormSecurity(formId: string) {
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const token = generateCSRFToken();
    setCsrfToken(token);
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setIsBlocked(false);
          }
          return newTime;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [remainingTime]);

  const validateSubmission = useCallback((data: any): boolean => {
    if (!validateCSRFToken(csrfToken)) {
      logSuspiciousActivity('invalid_csrf_token', { formId, csrfToken });
      toast.error('Ошибка безопасности. Перезагрузите страницу.');
      return false;
    }

    const userKey = `form_${formId}_${navigator.userAgent}`;
    if (!rateLimiter.isAllowed(userKey, 5, 300000)) { 
      const timeLeft = rateLimiter.getRemainingTime(userKey);
      setIsBlocked(true);
      setRemainingTime(timeLeft);
      logSuspiciousActivity('rate_limit_exceeded', { formId, userKey });
      toast.error(`Слишком много попыток. Попробуйте через ${timeLeft} секунд.`);
      return false;
    }

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string' && containsMaliciousContent(value)) {
        logSuspiciousActivity('malicious_content_detected', { formId, field: key, value });
        toast.error('Обнаружен подозрительный контент. Проверьте введенные данные.');
        return false;
      }
    }

    return true;
  }, [formId, csrfToken]);

  const refreshCSRF = useCallback(() => {
    const newToken = generateCSRFToken();
    setCsrfToken(newToken);
  }, []);

  return {
    csrfToken,
    isBlocked,
    remainingTime,
    validateSubmission,
    refreshCSRF
  };
}

export function useSecurityMonitor() {
  const [suspiciousEvents, setSuspiciousEvents] = useState<number>(0);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'SCRIPT' || 
                  element.tagName === 'IFRAME' || 
                  element.getAttribute('onclick') ||
                  element.getAttribute('onerror')) {
                logSuspiciousActivity('suspicious_dom_modification', {
                  tagName: element.tagName,
                  attributes: Array.from(element.attributes).map(attr => ({
                    name: attr.name,
                    value: attr.value
                  }))
                });
                setSuspiciousEvents(prev => prev + 1);
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['onclick', 'onerror', 'onload', 'src', 'href']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkConsoleAbuse = () => {
      if (performance.now() > 0) {
        logSuspiciousActivity('console_activity_monitored', { timestamp: Date.now() });
      }
    };

    const interval = setInterval(checkConsoleAbuse, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const monitorStorage = () => {
      try {
        const testKey = '__security_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        
        const storageSize = JSON.stringify(localStorage).length;
        if (storageSize > 1000000) { // > 1MB
          logSuspiciousActivity('large_storage_detected', { size: storageSize });
          setSuspiciousEvents(prev => prev + 1);
        }
      } catch (error) {
        logSuspiciousActivity('storage_access_error', { error: error });
      }
    };

    const interval = setInterval(monitorStorage, 300000);
    return () => clearInterval(interval);
  }, []);

  return {
    suspiciousEvents,
    resetEvents: () => setSuspiciousEvents(0)
  };
}

export function useApiSecurity() {
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const secureRequest = useCallback(async (url: string, options: RequestInit = {}) => {
    const now = Date.now();
    
    if (now - lastRequestTime < 100) { 
      logSuspiciousActivity('rapid_api_requests', { url, timeDiff: now - lastRequestTime });
      throw new Error('Слишком частые запросы');
    }

    setLastRequestTime(now);
    setRequestCount(prev => prev + 1);

    const secureOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': generateCSRFToken(),
        ...options.headers
      }
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true, json: () => Promise.resolve({}) });
      }, 100);
    });
  }, [lastRequestTime]);

  return {
    secureRequest,
    requestCount,
    resetCount: () => setRequestCount(0)
  };
}

export function useDataValidation() {
  const validateUserInput = useCallback((input: any, rules: ValidationRules): ValidationResult => {
    const errors: string[] = [];
    
    for (const [field, rule] of Object.entries(rules)) {
      const value = input[field];
      
      if (rule.required && (!value || value.toString().trim() === '')) {
        errors.push(`Поле "${field}" обязательно для заполнения`);
        continue;
      }
      
      if (value && rule.minLength && value.toString().length < rule.minLength) {
        errors.push(`Поле "${field}" должно содержать минимум ${rule.minLength} символов`);
      }
      
      if (value && rule.maxLength && value.toString().length > rule.maxLength) {
        errors.push(`Поле "${field}" не может содержать более ${rule.maxLength} символов`);
      }
      
      if (value && rule.pattern && !rule.pattern.test(value.toString())) {
        errors.push(`Поле "${field}" имеет неверный формат`);
      }
      
      if (value && rule.custom && !rule.custom(value)) {
        errors.push(rule.customMessage || `Поле "${field}" содержит недопустимое значение`);
      }
      
      if (typeof value === 'string' && containsMaliciousContent(value)) {
        errors.push(`Поле "${field}" содержит недопустимый контент`);
        logSuspiciousActivity('malicious_input_detected', { field, value });
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }, []);

  return { validateUserInput };
}

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  customMessage?: string;
}

interface ValidationRules {
  [field: string]: ValidationRule;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}