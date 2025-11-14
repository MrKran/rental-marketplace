import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  Star, 
  Clock, 
  Users, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  ArrowLeft,
  Share2,
  Heart,
  BookOpen,
  Award,
  GraduationCap,
  User
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";

interface ServiceDetailPageProps {
  service: any;
  setCurrentPage: (page: string) => void;
  setSelectedService: (service: any) => void;
}

export function ServiceDetailPage({ service, setCurrentPage, setSelectedService }: ServiceDetailPageProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showContact, setShowContact] = useState(false);

  if (!service) {
    return null;
  }

  const availableDates = [
    "2024-01-15",
    "2024-01-17", 
    "2024-01-19",
    "2024-01-22",
    "2024-01-24"
  ];

  const availableTimes = [
    "09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"
  ];

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Пожалуйста, выберите дату и время");
      return;
    }
    setCurrentPage('payment');
  };

  const handleContact = () => {
    setShowContact(true);
    toast.success("Контакты преподавателя открыты");
  };

  const reviews = [
    {
      id: 1,
      name: "Анна Смирнова",
      avatar: null,
      rating: 5,
      date: "2024-01-10",
      text: "Отличный преподаватель! Объясняет сложные темы простым языком. Рекомендую всем!"
    },
    {
      id: 2,
      name: "Иван Петров",
      avatar: null,
      rating: 5,
      date: "2024-01-08",
      text: "Прошел полный курс. Очень доволен результатом. Теперь уверенно программирую на Python."
    },
    {
      id: 3,
      name: "Мария Козлова",
      avatar: null,
      rating: 4,
      date: "2024-01-05",
      text: "Хороший курс для начинающих. Много практики и интересных заданий."
    }
  ];

  const instructor = {
    name: service.instructor || "Преподаватель",
    email: "instructor@alash.kz",
    phone: "+7 (777) 123-45-67",
    experience: "5+ лет",
    students: "200+",
    rating: service.rating || "4.9",
    bio: "Опытный преподаватель с большим стажем работы. Специализируюсь на индивидуальном подходе к каждому студенту.",
    achievements: [
      "Сертифицированный специалист",
      "Автор образовательных программ",
      "Победитель конкурса 'Учитель года'"
    ]
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedService(null);
              setCurrentPage('services');
            }}
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Назад к услугам
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {service.type}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-3">{service.title}</h1>
                  
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{service.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>До {service.maxStudents} студентов</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Описание</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Что вы изучите</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Основы программирования
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Работа с данными
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Создание проектов
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Подготовка к собеседованию
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructor Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    О преподавателе
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-lg">
                        {instructor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{instructor.name}</h3>
                      <p className="text-muted-foreground mb-2">{instructor.bio}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="font-semibold text-primary">{instructor.rating}</div>
                          <div className="text-xs text-muted-foreground">Рейтинг</div>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="font-semibold text-primary">{instructor.students}</div>
                          <div className="text-xs text-muted-foreground">Студентов</div>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="font-semibold text-primary">{instructor.experience}</div>
                          <div className="text-xs text-muted-foreground">Опыт</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Достижения:</h4>
                        {instructor.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Award className="w-4 h-4 text-yellow-500" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {showContact && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border-t pt-4 mt-4"
                    >
                      <h4 className="font-medium mb-3">Контактная информация:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-primary" />
                          <span>{instructor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-primary" />
                          <span>{instructor.email}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Отзывы студентов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="" />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.name}</span>
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Бронирование</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {service.price?.toLocaleString()} ₸
                      </div>
                      <div className="text-sm text-muted-foreground">за {service.duration}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Выберите дату</label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableDates.map((date) => (
                        <Button
                          key={date}
                          variant={selectedDate === date ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedDate(date)}
                          className="text-xs"
                        >
                          {new Date(date).toLocaleDateString('ru-RU', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Выберите время</label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="text-xs"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleBook}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Забронировать
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleContact}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Связаться с преподавателем
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    * Оплата производится после подтверждения бронирования
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Место проведения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">Астана, район Есиль</p>
                    <p className="text-xs text-muted-foreground">
                      Точный адрес будет предоставлен после бронирования
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span>Учебный центр Alash</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}