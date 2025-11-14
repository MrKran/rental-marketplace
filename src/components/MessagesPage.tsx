import { useState } from "react";
import { motion } from "motion/react";
import { 
  MessageCircle, 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video,
  Paperclip,
  Smile,
  Archive,
  Star,
  Circle
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";

interface MessagesPageProps {
  currentUser: any;
}

const mockChats = [
  {
    id: 1,
    name: "Анна Смирнова",
    lastMessage: "Добрый день! Можно уточнить детали по аренде MacBook?",
    timestamp: "2024-01-20T14:30:00Z",
    unreadCount: 2,
    isOnline: true,
    avatar: null,
    itemTitle: "MacBook Pro 16\" M2"
  },
  {
    id: 2,
    name: "Иван Петров",
    lastMessage: "Спасибо за курс! Очень полезная информация",
    timestamp: "2024-01-20T12:15:00Z",
    unreadCount: 0,
    isOnline: false,
    avatar: null,
    itemTitle: "Курс программирования на Python"
  },
  {
    id: 3,
    name: "Мария Козлова",
    lastMessage: "Когда можно забрать учебники?",
    timestamp: "2024-01-20T10:45:00Z",
    unreadCount: 1,
    isOnline: true,
    avatar: null,
    itemTitle: "Учебники по высшей математике"
  },
  {
    id: 4,
    name: "Дмитрий Волков",
    lastMessage: "Гитара в отличном состоянии, рекомендую!",
    timestamp: "2024-01-19T18:20:00Z",
    unreadCount: 0,
    isOnline: false,
    avatar: null,
    itemTitle: "Электрогитара Fender"
  }
];

const mockMessages = [
  {
    id: 1,
    chatId: 1,
    senderId: 2,
    senderName: "Анна Смирнова",
    message: "Добрый день! Интересует аренда MacBook на 3 дня",
    timestamp: "2024-01-20T14:25:00Z",
    isOwn: false
  },
  {
    id: 2,
    chatId: 1,
    senderId: 1,
    senderName: "Вы",
    message: "Здравствуйте! Конечно, MacBook доступен. Когда планируете забрать?",
    timestamp: "2024-01-20T14:27:00Z",
    isOwn: true
  },
  {
    id: 3,
    chatId: 1,
    senderId: 2,
    senderName: "Анна Смирнова",
    message: "Можно уточнить детали по аренде MacBook? Есть ли какие-то особенности в использовании?",
    timestamp: "2024-01-20T14:30:00Z",
    isOwn: false
  }
];

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};

const formatChatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return "Только что";
  } else if (diffInHours < 24) {
    return formatTime(timestamp);
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return "Вчера";
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  }
};

export function MessagesPage({ currentUser }: MessagesPageProps) {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chatMessages = messages.filter(msg => msg.chatId === selectedChat?.id);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: messages.length + 1,
      chatId: selectedChat.id,
      senderId: currentUser?.id || 1,
      senderName: "Вы",
      message: newMessage,
      timestamp: new Date().toISOString(),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const totalUnread = mockChats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Сообщения
              </h1>
              <p className="text-muted-foreground">
                {totalUnread > 0 ? `${totalUnread} непрочитанных сообщений` : 'Все сообщения прочитаны'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div 
          className="h-[700px] bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex h-full">
            {/* Chat List */}
            <div className="w-1/3 border-r bg-muted/20">
              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Поиск чатов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-0 bg-background/50"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="overflow-y-auto h-[calc(100%-80px)]">
                {filteredChats.map((chat, index) => (
                  <motion.div
                    key={chat.id}
                    className={`p-4 border-b cursor-pointer transition-all duration-200 ${
                      selectedChat?.id === chat.id 
                        ? 'bg-primary/10 border-l-4 border-l-primary' 
                        : 'hover:bg-muted/30'
                    }`}
                    onClick={() => setSelectedChat(chat)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                            {chat.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatChatTime(chat.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-1">
                          {chat.lastMessage}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {chat.itemTitle}
                          </Badge>
                          {chat.unreadCount > 0 && (
                            <Badge className="bg-primary text-primary-foreground rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            {selectedChat ? (
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b bg-muted/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={selectedChat.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                            {selectedChat.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {selectedChat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedChat.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedChat.isOnline ? 'В сети' : 'Был в сети недавно'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className={`max-w-[70%] ${message.isOwn ? 'order-1' : 'order-2'}`}>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.isOwn 
                            ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-white/70' : 'text-muted-foreground'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      {!message.isOwn && (
                        <Avatar className="w-8 h-8 order-1 mr-2">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-xs">
                            {selectedChat.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-muted/10">
                  <div className="flex items-end space-x-2">
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <Textarea
                        placeholder="Напишите сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        className="resize-none rounded-xl border-0 bg-background/50 min-h-[44px] max-h-32"
                        rows={1}
                      />
                    </div>
                    
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      <Smile className="w-4 h-4" />
                    </Button>
                    
                    <Button 
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Выберите чат</h3>
                  <p className="text-muted-foreground">
                    Выберите чат слева, чтобы начать общение
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}