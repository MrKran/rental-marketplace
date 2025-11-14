import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';
import { logSuspiciousActivity } from '../utils/security';
import { useSecurityMonitor } from '../hooks/useSecurity';

interface SecurityContextType {
  isSecure: boolean;
  threats: string[];
  addThreat: (threat: string) => void;
  clearThreats: () => void;
}

const SecurityContext = createContext<SecurityContextType>({
  isSecure: true,
  threats: [],
  addThreat: () => {},
  clearThreats: () => {}
});

export const useSecurityContext = () => useContext(SecurityContext);

interface SecurityProviderProps {
  children: ReactNode;
}

export function SecurityProvider({ children }: SecurityProviderProps) {
  const [isSecure, setIsSecure] = useState(true);
  const [threats, setThreats] = useState<string[]>([]);
  const { suspiciousEvents } = useSecurityMonitor();

  // Защита от кликджекинга (мягкая проверка)
  useEffect(() => {
    // Проверяем, загружена ли страница в iframe
    if (window.self !== window.top) {
      logSuspiciousActivity('clickjacking_attempt', {
        parentUrl: document.referrer,
        currentUrl: window.location.href
      });
      
      // Показываем предупреждение вместо блокировки
      toast.error('Внимание: сайт загружен во фрейме. Для безопасности рекомендуется открыть в новом окне.');
      addThreat('Загрузка во фрейме обнаружена');
    }
  }, []);

  // Мониторинг DevTools (только для логирования, без блокировки)
  useEffect(() => {
    let devtools = false;
    const threshold = 160;

    const checkDevTools = () => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools) {
          devtools = true;
          logSuspiciousActivity('devtools_detected', {
            outerHeight: window.outerHeight,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            innerWidth: window.innerWidth
          });
          // Не добавляем как угрозу, только логируем
        }
      } else {
        devtools = false;
      }
    };

    // Проверяем реже, чтобы не влиять на производительность
    const interval = setInterval(checkDevTools, 2000);
    return () => clearInterval(interval);
  }, []);

  // Мониторинг подозрительных действий (без блокировки обычных функций)
  useEffect(() => {
    const monitorDevShortcuts = (e: KeyboardEvent) => {
      // Только логируем попытки открытия DevTools, не блокируем
      if (e.keyCode === 123 || // F12
          (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
          (e.ctrlKey && e.shiftKey && e.keyCode === 74)) { // Ctrl+Shift+J
        logSuspiciousActivity('dev_shortcut_attempt', { 
          keyCode: e.keyCode, 
          ctrlKey: e.ctrlKey, 
          shiftKey: e.shiftKey 
        });
        // Не блокируем, просто логируем
      }
    };

    document.addEventListener('keydown', monitorDevShortcuts);

    return () => {
      document.removeEventListener('keydown', monitorDevShortcuts);
    };
  }, []);

  // Мониторинг копирования (разрешаем обычное копирование)
  useEffect(() => {
    const monitorCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection()?.toString();
      // Логируем только подозрительные попытки копирования больших объемов
      if (selection && selection.length > 1000) {
        logSuspiciousActivity('large_copy_attempt', { 
          selectionLength: selection.length 
        });
      }
      // Разрешаем обычное копирование
    };

    document.addEventListener('copy', monitorCopy);
    return () => document.removeEventListener('copy', monitorCopy);
  }, []);

  // Защита изображений от перетаскивания (мягкая)
  useEffect(() => {
    const preventImageDrag = (e: DragEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'IMG') {
        logSuspiciousActivity('image_drag_attempt', { 
          imageSrc: (e.target as HTMLImageElement)?.src 
        });
        e.preventDefault();
      }
    };

    document.addEventListener('dragstart', preventImageDrag);
    return () => document.removeEventListener('dragstart', preventImageDrag);
  }, []);

  // Защита от инспектирования элементов
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'data-inspector') {
          logSuspiciousActivity('inspector_attribute_detected', {
            target: mutation.target,
            attributeName: mutation.attributeName
          });
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-inspector', 'contenteditable']
    });

    return () => observer.disconnect();
  }, []);

  const addThreat = (threat: string) => {
    setThreats(prev => [...prev, threat]);
    setIsSecure(false);
  };

  const clearThreats = () => {
    setThreats([]);
    setIsSecure(true);
  };

  // Автоматическая очистка угроз
  useEffect(() => {
    if (threats.length > 0) {
      const timer = setTimeout(() => {
        setThreats([]);
        setIsSecure(true);
      }, 30000); // Очищаем через 30 секунд

      return () => clearTimeout(timer);
    }
  }, [threats]);

  const contextValue: SecurityContextType = {
    isSecure,
    threats,
    addThreat,
    clearThreats
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
      
      {/* Водяной знак безопасности */}
      <div 
        className="fixed bottom-4 right-4 text-xs text-gray-400 pointer-events-none select-none"
        style={{ userSelect: 'none' }}
      >
        Alash Security © 2024
      </div>
      
      {/* Скрытый элемент для обнаружения AdBlock */}
      <div 
        className="advertisement banner ads" 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          width: '1px', 
          height: '1px' 
        }}
        id="adblock-detector"
      />
    </SecurityContext.Provider>
  );
}