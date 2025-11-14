import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { 
  MessageCircle, 
  Send, 
  Search,
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Smile,
  Users,
  UserPlus,
  X
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";

interface ChatPageProps {
  currentUser: any;
  setCurrentPage: (page: string) => void;
}

interface Message {
  id: number;
  sender: string;
  senderId: string;
  message: string;
  time: string;
  isOwn: boolean;
}

export function ChatPage({ currentUser, setCurrentPage }: ChatPageProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>("user1");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newChatName, setNewChatName] = useState("");
  const [showNewChatInput, setShowNewChatInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  // Состояние для чатов и сообщений
  const [chats, setChats] = useState([
    {
      id: "user1",
      name: "Айгерим К.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Книга еще доступна?",
      lastTime: "5 мин назад",
      unread: 2,
      online: true
    },
    {
      id: "user2",
      name: "Данияр М.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Спасибо за аренду!",
      lastTime: "1 час назад",
      unread: 0,
      online: false
    },
    {
      id: "user3",
      name: "Алия С.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Когда можем встретиться?",
      lastTime: "2 часа назад",
      unread: 1,
      online: true
    },
    {
      id: "support",
      name: "Поддержка EduRent",
      avatar: null,
      lastMessage: "Чем могу помочь?",
      lastTime: "Вчера",
      unread: 0,
      online: true,
      isSupport: true
    }
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    user1: [
      {
        id: 1,
        sender: "Айгерим К.",
        senderId: "user1",
        message: "Здравствуйте! Интересует учебник по математике",
        time: "14:30",
        isOwn: false
      },
      {
        id: 2,
        sender: "Вы",
        senderId: currentUser?.id,
        message: "Здравствуйте! Да, учебник доступен для аренды",
        time: "14:32",
        isOwn: true
      },
      {
        id: 3,
        sender: "Айгерим К.",
        senderId: "user1",
        message: "Отлично! А на сколько дней можно взять?",
        time: "14:33",
        isOwn: false
      },
      {
        id: 4,
        sender: "Вы",
        senderId: currentUser?.id,
        message: "Минимум на неделю, максимум на месяц",
        time: "14:35",
        isOwn: true
      },
      {
        id: 5,
        sender: "Айгерим К.",
        senderId: "user1",
        message: "Книга еще доступна?",
        time: "сейчас",
        isOwn: false
      }
    ],
    user2: [
      {
        id: 1,
        sender: "Данияр М.",
        senderId: "user2",
        message: "Добрый день! Хочу взять в аренду ноутбук",
        time: "Вчера",
        isOwn: false
      },
      {
        id: 2,
        sender: "Вы",
        senderId: currentUser?.id,
        message: "Здравствуйте! Какая модель вас интересует?",
        time: "Вчера",
        isOwn: true
      },
      {
        id: 3,
        sender: "Данияр М.",
        senderId: "user2",
        message: "Спасибо за аренду!",
        time: "1 час назад",
        isOwn: false
      }
    ],
    user3: [
      {
        id: 1,
        sender: "Алия С.",
        senderId: "user3",
        message: "Привет! Видела твое объявление о репетиторстве по английскому",
        time: "2 часа назад",
        isOwn: false
      },
      {
        id: 2,
        sender: "Вы",
        senderId: currentUser?.id,
        message: "Привет! Да, провожу занятия. Какой у вас уровень?",
        time: "2 часа назад",
        isOwn: true
      },
      {
        id: 3,
        sender: "Алия С.",
        senderId: "user3",
        message: "Когда можем встретиться?",
        time: "2 часа назад",
        isOwn: false
      }
    ],
    support: [
      {
        id: 1,
        sender: "Поддержка EduRent",
        senderId: "support",
        message: "Здравствуйте! Чем могу помочь?",
        time: "Вчера",
        isOwn: false
      }
    ]
  });

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    
    const newMessage: Message = {
      id: Date.now(),
      sender: "Вы",
      senderId: currentUser?.id || "current",
      message: message.trim(),
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    // Добавляем сообщение в чат
    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));

    // Обновляем последнее сообщение в списке чатов
    setChats(prev => prev.map(chat => 
      chat.id === selectedChat 
        ? { ...chat, lastMessage: message.trim(), lastTime: "сейчас" }
        : chat
    ));

    setMessage("");
    setTimeout(scrollToBottom, 100);
  };

  const handleNewChat = () => {
    if (!newChatName.trim()) {
      toast.error("Введите имя для нового чата");
      return;
    }

    const newChatId = `chat_${Date.now()}`;
    const newChat = {
      id: newChatId,
      name: newChatName.trim(),
      avatar: null,
      lastMessage: "Новый чат создан",
      lastTime: "сейчас",
      unread: 0,
      online: false
    };

    setChats(prev => [...prev, newChat]);
    setMessages(prev => ({
      ...prev,
      [newChatId]: []
    }));

    setSelectedChat(newChatId);
    setNewChatName("");
    setShowNewChatInput(false);
    toast.success(`Чат "${newChatName.trim()}" создан`);
  };

  const currentChatData = chats.find(chat => chat.id === selectedChat);
  const currentMessages = selectedChat ? messages[selectedChat] || [] : [];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage('home')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl">Сообщения</h1>
                <p className="text-sm text-muted-foreground">
                  Общайтесь с другими пользователями
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
          {/* Chats List */}
          <Card className="lg:col-span-1 flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Поиск чатов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredChats.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Нет чатов</p>
                  </div>
                ) : (
                  filteredChats.map((chat) => (
                    <motion.button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors mb-1 ${
                        selectedChat === chat.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            {chat.avatar ? (
                              <AvatarImage src={chat.avatar} />
                            ) : (
                              <AvatarFallback className="bg-primary text-white">
                                {chat.isSupport ? <Users className="w-5 h-5" /> : chat.name.charAt(0)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          {chat.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium truncate">{chat.name}</h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {chat.lastTime}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">
                              {chat.lastMessage}
                            </p>
                            {chat.unread > 0 && (
                              <Badge className="ml-2 bg-primary text-white px-2 py-0 text-xs">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t space-y-2">
              {showNewChatInput ? (
                <div className="space-y-2">
                  <Input
                    placeholder="Имя собеседника..."
                    value={newChatName}
                    onChange={(e) => setNewChatName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleNewChat()}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      onClick={handleNewChat}
                    >
                      Создать
                    </Button>
                    <Button 
                      className="flex-1" 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setShowNewChatInput(false);
                        setNewChatName("");
                      }}
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  className="w-full" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowNewChatInput(true)}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Новый чат
                </Button>
              )}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 flex flex-col h-full">
            {selectedChat && currentChatData ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          {currentChatData.avatar ? (
                            <AvatarImage src={currentChatData.avatar} />
                          ) : (
                            <AvatarFallback className="bg-primary text-white">
                              {currentChatData.isSupport ? <Users className="w-5 h-5" /> : currentChatData.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        {currentChatData.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{currentChatData.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {currentChatData.online ? "Онлайн" : "Не в сети"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentMessages.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                          <MessageCircle className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">Нет сообщений</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Начните общение первым!
                        </p>
                      </div>
                    ) : (
                      currentMessages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}
                        >
                          {!msg.isOwn && (
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              {currentChatData.avatar ? (
                                <AvatarImage src={currentChatData.avatar} />
                              ) : (
                                <AvatarFallback className="bg-primary text-white text-xs">
                                  {currentChatData.isSupport ? <Users className="w-4 h-4" /> : currentChatData.name.charAt(0)}
                                </AvatarFallback>
                              )}
                            </Avatar>
                          )}
                          <div className={`flex-1 max-w-[70%] ${msg.isOwn ? "text-right" : ""}`}>
                            <div
                              className={`inline-block px-4 py-2 rounded-2xl ${
                                msg.isOwn
                                  ? "bg-gradient-to-r from-primary to-secondary text-white rounded-br-sm"
                                  : "bg-muted rounded-bl-sm"
                              }`}
                            >
                              <p>{msg.message}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-2">
                              {msg.time}
                            </p>
                          </div>
                        </motion.div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Напишите сообщение..."
                      className="flex-1"
                    />
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="flex-shrink-0 bg-gradient-to-r from-primary to-secondary"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl mb-2">Выберите чат</h3>
                  <p className="text-muted-foreground">
                    Выберите диалог слева, чтобы начать общение
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
