import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Plus,
  ArrowRight,
  Laptop,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Heart,
  Eye,
  MessageCircle,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { StatsSection } from "./StatsSection";

interface HomePageProps {
  items: any[];
  services: any[];
  setCurrentPage: (page: string) => void;
  setSelectedItem: (item: any) => void;
  setSelectedService: (service: any) => void;
  isLoggedIn?: boolean;
  setShowAddItemModal?: (show: boolean) => void;
}

export function HomePage(props: HomePageProps) {
  const {
    items,
    services,
    setCurrentPage,
    setSelectedItem,
    setSelectedService,
    isLoggedIn,
    setShowAddItemModal,
  } = props;

  const featuredItems = items.slice(0, 6);
  const featuredServices = services.slice(0, 6);

  const advantages = [
    {
      icon: Shield,
      title: "Безопасные сделки",
      description: "Все транзакции проходят через защищенную систему платежей",
    },
    {
      icon: Award,
      title: "Проверенные пользователи",
      description: "Система рейтингов и отзывов обеспечивает надежность",
    },
    {
      icon: Zap,
      title: "Быстрое оформление",
      description: "Аренда или бронирование услуг всего в несколько кликов",
    },
    {
      icon: TrendingUp,
      title: "Выгодные цены",
      description: "Конкурентные цены и специальные предложения",
    },
  ];

  const testimonials = [
    {
      name: "Анна Смирнова",
      role: "Студентка",
      rating: 5,
      text: "Отличная платформа! Арендовала MacBook для курсовой работы - все прошло быстро и надежно.",
    },
    {
      name: "Иван Петров",
      role: "Преподаватель",
      rating: 5,
      text: "Веду курсы программирования через Alash. Удобная система, качественные студенты.",
    },
    {
      name: "Мария Козлова",
      role: "Студентка",
      rating: 5,
      text: "Нашла все нужные учебники по математике. Сэкономила много денег благодаря аренде!",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-foreground mb-6 text-4xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Alash — платформа для студентов
            </motion.h1>

            <motion.p
              className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Аренда учебных материалов и образовательные услуги в одном месте
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-primary text-white hover:shadow-lg px-8"
                onClick={() => setCurrentPage("items")}
              >
                Посмотреть товары
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8"
                onClick={() => setCurrentPage("services")}
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
                className="text-muted-foreground hover:text-primary text-base"
                onClick={() => setCurrentPage("how-it-works")}
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Как это работает?
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Advantages Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Почему выбирают Alash?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                    <h3 className="font-bold text-lg mb-3">{advantage.title}</h3>
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

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Отзывы пользователей</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                      <span className="text-white font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
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

      {/* CTA */}
      <section className="py-24 px-4">
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
              <CardContent className="relative text-center py-24 px-4">
                <h2 className="text-white text-4xl font-bold mb-6">Готовы начать?</h2>
                <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                  Присоединяйтесь к сообществу студентов и преподавателей школ Binom
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {isLoggedIn ? (
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 px-8"
                      onClick={() => setShowAddItemModal && setShowAddItemModal(true)}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Добавить объявление
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        className="bg-white text-primary hover:bg-white/90 px-8"
                        onClick={() => setCurrentPage("register")}
                      >
                        Создать аккаунт
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:bg-white/20 px-8"
                        onClick={() => setCurrentPage("login")}
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
