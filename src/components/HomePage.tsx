import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Plus, 
  ArrowRight,
  Laptop,
  BookOpen,
  Music,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Heart,
  Eye,
  MessageCircle,
  ChevronRight,
  PlayCircle,
  Search
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { WelcomeBanner } from "./WelcomeBanner";
import { StatsSection } from "./StatsSection";
import { QuickViewModal } from "./QuickViewModal";
import { useState } from "react";

interface HomePageProps {
  items: any[];
  services: any[];
  setCurrentPage: (page: string) => void;
  setSelectedItem: (item: any) => void;
  setSelectedService: (service: any) => void;
  isLoggedIn?: boolean;
  setShowAddItemModal?: (show: boolean) => void;
}

export function HomePage({ items, services, setCurrentPage, setSelectedItem, setSelectedService, isLoggedIn, setShowAddItemModal }: HomePageProps) {
  const [quickViewItem, setQuickViewItem] = useState<any>(null);
  const featuredItems = items.slice(0, 6);
  const featuredServices = services.slice(0, 6);

  const advantages = [
    {
      icon: Shield,
      title: "Безопасные сделки",
      description: "Все транзакции проходят через защищенную систему платежей"
    },
    {
      icon: Award,
      title: "Проверенные пользователи",
      description: "Система рейтингов и отзывов обеспечивает надежность"
    },
    {
      icon: Zap,
      title: "Быстрое оформление",
      description: "Аренда или бронирование услуг всего в несколько кликов"
    },
    {
      icon: TrendingUp,
      title: "Выгодные цены",
      description: "Конкурентные цены и специальные предложения"
    }
  ];

  const categories = [
    { 
      name: "Аренда товаров", 
      icon: Laptop, 
      description: "Ноутбуки, учебники, инструменты, техника для учебы", 
      color: "from-primary to-secondary",
      action: () => setCurrentPage('items')
    },
    { 
      name: "Образовательные услуги", 
      icon: Users, 
      description: "Курсы, репетиторство, подготовка к экзаменам", 
      color: "from-secondary to-primary",
      action: () => setCurrentPage('services')
    }
  ];

  const testimonials = [
    {
      name: "Анна Смирнова",
      role: "Студентка",
      avatar: null,
      rating: 5,
      text: "Отличная платформа! Арендовала MacBook для курсовой работы - все прошло быстро и надежно."
    },
    {
      name: "Иван Петров",
      role: "Преподаватель",
      avatar: null,
      rating: 5,
      text: "Веду курсы программирования через Alash. Удобная система, качественные студенты."
    },
    {
      name: "Мария Козлова",
      role: "Студентка",
      avatar: null,
      rating: 5,
      text: "Нашла все нужные учебники по математике. Сэкономила много денег благодаря аренде!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-foreground mb-6 text-3xl lg:text-5xl max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Alash - платформа для студентов
              <span className="block text-muted-foreground text-xl lg:text-2xl mt-3">
                Аренда товаров и образовательные услуги
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Удобная платформа для аренды учебных материалов и поиска качественных образовательных услуг
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 px-8 py-3"
                onClick={() => setCurrentPage('items')}
              >
                Посмотреть товары
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-3"
                onClick={() => setCurrentPage('services')}
              >
                Найти услуги
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                variant="link" 
                className="text-muted-foreground hover:text-primary"
                onClick={() => setCurrentPage('how-it-works')}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Как это работает?
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Stats Section */}
      <StatsSection />

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Что мы предлагаем</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Выберите нужную категорию
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={category.action}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-0 shadow-lg h-full">
                    <div className="relative h-64">
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10`}></div>
                      <div className="relative p-8 h-full flex flex-col items-center justify-center text-center">
                        <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl mb-4">{category.name}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">{category.description}</p>
                        <div className="mt-6 flex items-center text-primary group-hover:translate-x-2 transition-transform">
                          <span className="mr-2">Перейти</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="mb-2">Товары для аренды</h2>
              <p className="text-muted-foreground">
                {featuredItems.length > 0 
                  ? "Качественные товары от проверенных пользователей" 
                  : "Станьте первым, кто предложит товары для аренды"
                }
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setCurrentPage('items')}
              className="group"
            >
              Смотреть все
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          
          {featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.map((item, index) => {
                const itemImages = [
                  "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwbGFwdG9wJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1OTY0ODk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  "https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rcyUyMHN0dWR5JTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc1OTY0ODk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  "https://images.unsplash.com/photo-1708165802530-ccf9ca6a8269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwaW5zdHJ1bWVudHMlMjBndWl0YXJ8ZW58MXx8fHwxNzU5NjAzOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                ];
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <ImageWithFallback
                          src={itemImages[index % itemImages.length]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white border-0 shadow-lg">
                          {item.price.toLocaleString()} ₸/день
                        </Badge>
                        <Button
                          size="sm"
                          className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary hover:bg-white/90"
                          onClick={() => {
                            setSelectedItem(item);
                            setCurrentPage('payment');
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{item.title}</CardTitle>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{item.rating}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              <span className="text-sm">12</span>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            от {item.owner.name}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8 opacity-20">
                <Laptop className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl mb-4">Пока нет товаров для аренды</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {isLoggedIn 
                  ? "Станьте первым! Добавьте свои товары и начните зарабатывать." 
                  : "Зарегистрируйтесь и добавьте первые товары для аренды."
                }
              </p>
              {isLoggedIn && setShowAddItemModal ? (
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary"
                  onClick={() => setShowAddItemModal(true)}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Добавить товар
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary"
                  onClick={() => setCurrentPage('register')}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Присоединиться
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-muted/10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="mb-2">Образовательные услуги</h2>
              <p className="text-muted-foreground">
                {featuredServices.length > 0 
                  ? "Учитесь у лучших преподавателей города" 
                  : "Поделитесь знаниями и начните преподавать"
                }
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setCurrentPage('services')}
              className="group"
            >
              Смотреть все
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          
          {featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white border-0 shadow-lg cursor-pointer"
                    onClick={() => {
                      setSelectedService(service);
                      setCurrentPage('service-detail');
                    }}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnRzfGVufDF8fHx8MTc1OTY0ODk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Badge className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm border-0 shadow-lg">
                        {service.serviceType}
                      </Badge>
                      <Button
                        size="sm"
                        className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary hover:bg-white/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedService(service);
                          setCurrentPage('service-detail');
                        }}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Подробнее
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{service.title}</CardTitle>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{service.teacher.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          Верифицирован
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{service.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{service.rating}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {service.maxStudents === 1 ? 'Индивидуально' : `До ${service.maxStudents} чел.`}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg text-primary">{service.price.toLocaleString()} ₸</span>
                          <span className="text-sm text-muted-foreground ml-1">/занятие</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-muted-foreground">
                            24 отзыва
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-8 opacity-20">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl mb-4">Пока нет образовательных услуг</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {isLoggedIn 
                  ? "Поделитесь своими знаниями! Создайте первый курс или предложите репетиторство." 
                  : "Присоединяйтесь к сообществу преподавателей и учеников."
                }
              </p>
              {isLoggedIn && setShowAddItemModal ? (
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-secondary to-primary"
                  onClick={() => setShowAddItemModal(true)}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Добавить услугу
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-secondary to-primary"
                  onClick={() => setCurrentPage('register')}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Присоединиться
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </section>



      {/* Advantages Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Почему выбирают Alash?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Надежная платформа для безопасных сделок
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-6 h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="mb-3">{advantage.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {advantage.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Отзывы пользователей</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Что говорят о нас студенты и преподаватели
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white">{testimonial.name[0]}</span>
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -top-48 -left-48"></div>
                <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -bottom-48 -right-48"></div>
              </div>
              <CardContent className="relative text-center py-20 px-4">
                <h2 className="text-white mb-6 text-2xl lg:text-4xl">Готовы начать?</h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Присоединяйтесь к сообществу студентов и преподавателей школ Binom
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {isLoggedIn ? (
                    <Button 
                      size="lg" 
                      className="bg-white text-primary hover:bg-white/90 px-8 py-6"
                      onClick={() => setShowAddItemModal && setShowAddItemModal(true)}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Добавить объявление
                    </Button>
                  ) : (
                    <>
                      <Button 
                        size="lg" 
                        className="bg-white text-primary hover:bg-white/90 px-8 py-6"
                        onClick={() => setCurrentPage('register')}
                      >
                        Создать аккаунт
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="border-white text-white hover:bg-white/20 px-8 py-6"
                        onClick={() => setCurrentPage('login')}
                      >
                        Войти
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

    </div>
  );
}