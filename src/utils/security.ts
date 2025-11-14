import { toast } from "sonner";

export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#96;')
    .replace(/=/g, '&#61;');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Пароль должен содержать минимум 8 символов');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Пароль должен содержать заглавную букву');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Пароль должен содержать строчную букву');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Пароль должен содержать цифру');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Пароль должен содержать специальный символ');
  }

  if (password.length > 128) {
    errors.push('Пароль не может быть длиннее 128 символов');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+7|8)?[\s\-]?\(?7\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function validatePrice(price: string | number): boolean {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(numPrice) && numPrice > 0 && numPrice <= 10000000;
}

export function validateText(text: string, minLength: number = 1, maxLength: number = 1000): boolean {
  return text.length >= minLength && text.length <= maxLength && !containsMaliciousContent(text);
}

export function containsMaliciousContent(text: string): boolean {
  if (typeof text !== 'string') return false;
  
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /eval\s*\(/i,
    /<iframe/i,
    /data:.*base64.*script/i  
  ];
  
  return maliciousPatterns.some(pattern => pattern.test(text));
}

class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  
  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(key);
    
    if (!userAttempts || now > userAttempts.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (userAttempts.count >= maxAttempts) {
      return false;
    }
    
    userAttempts.count++;
    return true;
  }
  
  getRemainingTime(key: string): number {
    const userAttempts = this.attempts.get(key);
    if (!userAttempts) return 0;
    
    const remainingTime = userAttempts.resetTime - Date.now();
    return Math.max(0, Math.ceil(remainingTime / 1000)); 
  }
}

export const rateLimiter = new RateLimiter();

export function logSuspiciousActivity(action: string, details: any): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    details,
    userAgent: navigator.userAgent,
    url: window.location.href,
    sessionId: getSessionId()
  };
  
  console.warn('🚨 Подозрительная активность:', logEntry);
  
  const existingLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
  existingLogs.push(logEntry);
  
  if (existingLogs.length > 100) {
    existingLogs.splice(0, existingLogs.length - 100);
  }
  
  localStorage.setItem('security_logs', JSON.stringify(existingLogs));
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

export function validateFile(file: File): { isValid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024;
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Разрешены только изображения (JPG, PNG, WebP)' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'Размер файла не должен превышать 5MB' };
  }
  
  return { isValid: true };
}

export function generateCSRFToken(): string {
  const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
  sessionStorage.setItem('csrf_token', token);
  return token;
}

export function validateCSRFToken(token: string): boolean {
  const storedToken = sessionStorage.getItem('csrf_token');
  return storedToken === token && token.length > 10;
}

export function sanitizeObject(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  const sanitized: any = {};
  const allowedKeys = [
    'title', 'description', 'price', 'location', 'category', 'type', 
    'duration', 'instructor', 'maxStudents', 'name', 'email', 'bio',
    'phoneNumber', 'cardNumber', 'cardName', 'expiryDate', 'rentalDays'
  ];
  
  for (const key of allowedKeys) {
    if (key in obj) {
      const value = obj[key];
      if (typeof value === 'string') {
        sanitized[key] = sanitizeHtml(value).trim();
      } else if (typeof value === 'number') {
        sanitized[key] = isFinite(value) ? value : 0;
      } else {
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized;
}

export function validateDataIntegrity(data: any, requiredFields: string[]): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = [];
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      missingFields.push(field);
    }
  }
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

export function safeJsonParse(jsonString: string, fallback: any = null): any {
  try {
    const parsed = JSON.parse(jsonString);
    return sanitizeObject(parsed);
  } catch (error: any) {
    logSuspiciousActivity('invalid_json_parse', { jsonString, error: error.message });
    return fallback;
  }
}

export function checkUserPermission(user: any, action: string, resource: any = null): boolean {
  if (!user || !user.id) {
    return false;
  }
  
  switch (action) {
    case 'create_item':
    case 'create_service':
      return user.type === 'student' || user.type === 'teacher';
    
    case 'edit_item':
    case 'delete_item':
      return resource && resource.ownerId === user.id;
    
    case 'edit_service':
    case 'delete_service':
      return resource && resource.instructorId === user.id;
    
    case 'view_profile':
      return true;
    
    case 'edit_profile':
      return true;
    
    default:
      return false;
  }
}

export function safeLocalStorageSet(key: string, value: any): boolean {
  try {
    const sanitizedValue = sanitizeObject(value);
    localStorage.setItem(key, JSON.stringify(sanitizedValue));
    return true;
  } catch (error: any) {
    logSuspiciousActivity('localStorage_error', { key, error: error.message });
    toast.error('Ошибка сохранения данных');
    return false;
  }
}

export function safeLocalStorageGet(key: string, fallback: any = null): any {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return safeJsonParse(item, fallback);
  } catch (error: any) {
    logSuspiciousActivity('localStorage_read_error', { key, error: error.message });
    return fallback;
  }
}