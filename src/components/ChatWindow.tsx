import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { 
  MessageCircle, 
  Send, 
  X, 
  Users, 
  Minimize2,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatWindowProps {
  isLoggedIn: boolean;
  currentUser?: any;
  setCurrentPage?: (page: string) => void;
}

export function ChatWindow({ isLoggedIn, currentUser, setCurrentPage }: ChatWindowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentChat, setCurrentChat] = useState("general");
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat, isOpen]);

  // Примечание: Это демо-данные для примера. В реальном приложении 
  // данные будут загружаться с сервера
  const chats = [
    {
      id: "general",
      name: "Общий чат",
      type: "group",
      lastMessage: "Обсуждение аренды",
      lastTime: "сейчас",
      unread: 0,
      avatar: null
    },
    {
      id: "support",
      name: "Поддержка",
      type: "support", 
      lastMessage: "Чем могу помочь?",
      lastTime: "онлайн",
      unread: 0,
      avatar: null
    }
  ];

  const messages = {
    general: [
      {
        id: 1,
        user: "Система",
        avatar: null,
        message: "Добро пожаловать в общий чат EduRent! Здесь вы можете общаться с другими пользователями.",
        time: "14:00",
        isOwn: false,
        isSystem: true
      }
    ],
    support: [
      {
        id: 1,
        user: "Поддержка",
        avatar: null,
        message: "Здравствуйте! Чем могу помочь?",
        time: "сейчас",
        isOwn: false,
        isSystem: true
      }
    ]
  };

  const handleSendMessage = () => {
    if (!message.trim() || !isLoggedIn) return;
    
    // В реальном приложении здесь будет отправка на сервер
    console.log("Отправка сообщения:", message);
    setMessage("");
  };

  const currentChatData = chats.find(chat => chat.id === currentChat);
  const currentMessages = messages[currentChat] || [];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => {
            if (isLoggedIn && setCurrentPage) {
              setCurrentPage('chat');
            } else {
              setIsOpen(true);
            }
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          size="lg"
          title={isLoggedIn ? "Открыть чат" : "Быстрая поддержка"}
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            height: isMinimized ? "60px" : "600px",
            width: isMinimized ? "300px" : "400px"
          }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {currentChatData?.type === "group" || currentChatData?.type === "support" ? (
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                ) : (
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentChatData?.avatar} />
                    <AvatarFallback>{currentChatData?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <h3 className="font-semibold">{currentChatData?.name}</h3>
                  <p className="text-xs text-white/80">{currentChatData?.lastTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 w-8 h-8 p-0"
                  title={isMinimized ? "Развернуть" : "Свернуть"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 w-8 h-8 p-0"
                  title="Закрыть"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Tabs */}
              <div className="p-3 bg-muted/30 border-b flex-shrink-0 space-y-2">
                {isLoggedIn && setCurrentPage && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setCurrentPage('chat')}
                  >
                    Открыть полный чат
                  </Button>
                )}
                <div className="flex gap-2">
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setCurrentChat(chat.id)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors relative ${
                        currentChat === chat.id 
                          ? "bg-primary text-white" 
                          : "bg-white hover:bg-muted"
                      }`}
                    >
                      {chat.name}
                      {chat.unread > 0 && (
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500 text-white flex items-center justify-center">
                          {chat.unread}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {currentMessages.length === 0 ? (
                    <div className="text-center py-8">
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
                      <div
                        key={msg.id}
                        className={`flex gap-2 ${msg.isOwn ? "flex-row-reverse" : ""}`}
                      >
                        {!msg.isOwn && (
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            {msg.avatar ? (
                              <AvatarImage src={msg.avatar} />
                            ) : (
                              <AvatarFallback className="bg-primary text-white text-xs">
                                {msg.user.charAt(0)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        )}
                        <div className={`flex-1 ${msg.isOwn ? "text-right" : ""}`}>
                          {!msg.isOwn && (
                            <div className="text-xs text-muted-foreground mb-1 font-medium">{msg.user}</div>
                          )}
                          <div
                            className={`inline-block px-4 py-2 rounded-2xl text-sm max-w-[85%] ${
                              msg.isOwn
                                ? "bg-primary text-white rounded-br-sm"
                                : msg.isSystem
                                ? "bg-muted/50 text-muted-foreground rounded-bl-sm"
                                : "bg-muted rounded-bl-sm"
                            }`}
                          >
                            {msg.message}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{msg.time}</div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t p-4 bg-white flex-shrink-0">
                {isLoggedIn ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Напишите сообщение..."
                      className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/50"
                    />
                    <Button 
                      size="sm" 
                      className="rounded-full w-10 h-10 p-0"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      title="Отправить"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      Войдите, чтобы участвовать в чате
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Войти в аккаунт
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}