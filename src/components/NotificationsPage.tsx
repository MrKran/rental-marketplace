import { useState } from "react";
import { motion } from "motion/react";
import { 
  Bell, 
  Check, 
  X, 
  MessageCircle, 
  ShoppingBag, 
  GraduationCap, 
  Star, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface NotificationsPageProps {
  currentUser: any;
}

const mockNotifications = [
  {
    id: 1,
    type: "rental_request",
    title: "Новый запрос на аренду",
    message: "Пользователь Анна хочет арендовать ваш MacBook Pro на 3 дня",
    timestamp: "2024-01-20T10:30:00Z",
    isRead: false,
    avatar: null,
    itemTitle: "MacBook Pro 16\" M2",
    action: "rental_request"
  },
  {
    id: 2,
    type: "booking_confirmed",
    title: "Бронирование подтверждено",
    message: "Ваше бронирование курса Python подтверждено. Занятия начинаются завтра",
    timestamp: "2024-01-20T09:15:00Z",
    isRead: false,
    avatar: null,
    itemTitle: "Курс программирования на Python",
    action: "view_booking"
  },
  {
    id: 3,
    type: "review_received",
    title: "Новый отзыв",
    message: "Алексей оставил отзыв о вашем курсе математики: \"Отличные объяснения!\"",
    timestamp: "2024-01-20T08:45:00Z",
    isRead: true,
    avatar: null,
    rating: 5,
    action: "view_review"
  },
  {
    id: 4,
    type: "payment_received",
    title: "Платеж получен",
    message: "Получен платеж за аренду электрогитары - 45,000 ₸",
    timestamp: "2024-01-19T16:20:00Z",
    isRead: true,
    avatar: null,
    amount: 45000,
    action: "view_payment"
  },
  {
    id: 5,
    type: "message_received",
    title: "Новое сообщение",
    message: "Мария написала вам сообщение по поводу аренды учебников",
    timestamp: "2024-01-19T14:10:00Z",
    isRead: false,
    avatar: null,
    action: "view_message"
  },
  {
    id: 6,
    type: "reminder",
    title: "Напоминание",
    message: "Занятие по английскому языку начинается через 1 час",
    timestamp: "2024-01-19T12:00:00Z",
    isRead: true,
    avatar: null,
    action: "view_lesson"
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "rental_request":
      return <ShoppingBag className="w-5 h-5 text-blue-500" />;
    case "booking_confirmed":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "review_received":
      return <Star className="w-5 h-5 text-yellow-500" />;
    case "payment_received":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "message_received":
      return <MessageCircle className="w-5 h-5 text-blue-500" />;
    case "reminder":
      return <Clock className="w-5 h-5 text-orange-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return "Только что";
  } else if (diffInHours < 24) {
    return `${diffInHours} ч. назад`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return "Вчера";
    } else if (diffInDays < 7) {
      return `${diffInDays} дн. назад`;
    } else {
      return date.toLocaleDateString('ru-RU');
    }
  }
};

export function NotificationsPage({ currentUser }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Уведомления
                </h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} непрочитанных уведомлений` : 'Все уведомления прочитаны'}
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                className="rounded-xl"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Отметить все как прочитанные
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="rounded-xl"
            >
              Все ({notifications.length})
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              className="rounded-xl"
            >
              Непрочитанные ({unreadCount})
            </Button>
            <Button
              variant={filter === "read" ? "default" : "outline"}
              onClick={() => setFilter("read")}
              className="rounded-xl"
            >
              Прочитанные ({notifications.length - unreadCount})
            </Button>
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className={`transition-all duration-200 hover:shadow-lg cursor-pointer border-0 ${
                    !notification.isRead 
                      ? 'bg-primary/5 border-l-4 border-l-primary shadow-md' 
                      : 'bg-white/80 backdrop-blur-md'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-foreground">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {notification.message}
                          </p>

                          {/* Additional info */}
                          {notification.itemTitle && (
                            <div className="mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {notification.itemTitle}
                              </Badge>
                            </div>
                          )}

                          {notification.rating && (
                            <div className="flex items-center mt-2">
                              {[...Array(notification.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          )}

                          {notification.amount && (
                            <div className="mt-2">
                              <span className="font-semibold text-green-600">
                                +{notification.amount.toLocaleString()} ₸
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                            
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="h-8 px-2 text-xs rounded-lg"
                                >
                                  <Check className="w-3 h-3 mr-1" />
                                  Прочитано
                                </Button>
                              )}
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="h-8 px-2 text-xs rounded-lg hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                <Bell className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {filter === "unread" ? "Нет непрочитанных уведомлений" : 
                 filter === "read" ? "Нет прочитанных уведомлений" : 
                 "Нет уведомлений"}
              </h3>
              <p className="text-muted-foreground">
                {filter === "all" 
                  ? "Здесь будут появляться все ваши уведомления"
                  : "Попробуйте изменить фильтр"
                }
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}