import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Shield, AlertTriangle, Eye, Trash2, RefreshCcw } from "lucide-react";
import { useSecurityMonitor } from "../hooks/useSecurity";
import { safeLocalStorageGet } from "../utils/security";

interface SecurityDashboardProps {
  currentUser: any;
}

export function SecurityDashboard({ currentUser }: SecurityDashboardProps) {
  const { suspiciousEvents, resetEvents } = useSecurityMonitor();
  const [securityLogs, setSecurityLogs] = useState<any[]>([]);
  const [isAdmin] = useState(currentUser?.type === 'admin' || currentUser?.email?.includes('admin'));

  useEffect(() => {
    // Загружаем логи безопасности
    const logs = safeLocalStorageGet('security_logs', []);
    setSecurityLogs(logs.slice(-20)); // Показываем последние 20 записей
  }, [suspiciousEvents]);

  const clearLogs = () => {
    localStorage.removeItem('security_logs');
    setSecurityLogs([]);
    resetEvents();
  };

  const getEventTypeColor = (action: string) => {
    switch (action) {
      case 'rate_limit_exceeded':
        return 'destructive';
      case 'malicious_content_detected':
        return 'destructive';
      case 'unauthorized_action_attempt':
        return 'destructive';
      case 'suspicious_dom_modification':
        return 'secondary';
      case 'invalid_email_format':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getEventDescription = (action: string) => {
    switch (action) {
      case 'rate_limit_exceeded':
        return 'Превышен лимит запросов';
      case 'malicious_content_detected':
        return 'Обнаружен вредоносный контент';
      case 'unauthorized_action_attempt':
        return 'Попытка неавторизованного действия';
      case 'suspicious_dom_modification':
        return 'Подозрительное изменение DOM';
      case 'invalid_email_format':
        return 'Некорректный формат email';
      case 'suspicious_console_activity':
        return 'Подозрительная активность в консоли';
      case 'suspicious_storage_access':
        return 'Подозрительный доступ к хранилищу';
      default:
        return action;
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-6">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            У вас нет прав доступа к панели безопасности.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">Панель безопасности Alash</h2>
          <p className="text-muted-foreground">
            Мониторинг и анализ событий безопасности
          </p>
        </div>
        <Button onClick={clearLogs} variant="outline" size="sm">
          <Trash2 className="w-4 h-4 mr-2" />
          Очистить логи
        </Button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Всего событий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-2xl font-bold">{securityLogs.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Подозрительные события</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-2xl font-bold text-orange-500">{suspiciousEvents}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Статус безопасности</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">
                {suspiciousEvents > 10 ? 'Высокий риск' : suspiciousEvents > 5 ? 'Средний риск' : 'Безопасно'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Список событий безопасности */}
      <Card>
        <CardHeader>
          <CardTitle>Журнал событий безопасности</CardTitle>
        </CardHeader>
        <CardContent>
          {securityLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Нет записей о событиях безопасности</p>
            </div>
          ) : (
            <div className="space-y-4">
              {securityLogs.reverse().map((log, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getEventTypeColor(log.action)}>
                        {getEventDescription(log.action)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  
                  {log.details && (
                    <div className="text-sm bg-gray-50 rounded p-2">
                      <details>
                        <summary className="cursor-pointer text-muted-foreground">
                          Подробности
                        </summary>
                        <pre className="mt-2 text-xs overflow-x-auto">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>URL: {log.url}</span>
                    <span>Session: {log.sessionId?.slice(-8)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Рекомендации по безопасности */}
      <Card>
        <CardHeader>
          <CardTitle>Рекомендации по безопасности</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Активные защиты</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>✓ XSS защита активирована</li>
                  <li>✓ Rate limiting включен</li>
                  <li>✓ Валидация данных активна</li>
                  <li>✓ CSRF защита включена</li>
                  <li>✓ Мониторинг DOM изменений</li>
                </ul>
              </div>
            </div>
            
            {suspiciousEvents > 5 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Обнаружено повышенное количество подозрительных событий. 
                  Рекомендуется усилить мониторинг и проверить активность пользователей.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}