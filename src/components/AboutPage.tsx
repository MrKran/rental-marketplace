import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  BookOpen, 
  Users, 
  Target, 
  Heart, 
  Award, 
  Shield, 
  Lightbulb,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
}

export function AboutPage({ setCurrentPage }: AboutPageProps) {
  const features = [
    {
      icon: Shield,
      title: "Безопасность",
      description: "Проверка всех пользователей и защита ваших данных - наш приоритет"
    },
    {
      icon: Users,
      title: "Сообщество",
      description: "Растущее сообщество студентов и преподавателей"
    },
    {
      icon: Zap,
      title: "Простота",
      description: "Интуитивный интерфейс для быстрого поиска и размещения"
    },
    {
      icon: Globe,
      title: "Доступность",
      description: "Платформа доступна для всех пользователей"
    }
  ];

  const values = [
    {
      icon: BookOpen,
      title: "Образование",
      description: "Мы верим, что качественное образование должно быть доступным каждому"
    },
    {
      icon: Heart,
      title: "Забота",
      description: "Каждый пользователь важен для нас, мы помогаем решать проблемы"
    },
    {
      icon: Target,
      title: "Инновации",
      description: "Постоянно развиваемся и внедряем новые технологии"
    },
    {
      icon: Lightbulb,
      title: "Творчество",
      description: "Поддерживаем креативность и новые идеи в образовании"
    }
  ];

  // Информация о команде будет добавлена позже
  const team = [];

  // Статистика будет добавлена по мере роста платформы
  const achievements = [];

  const timeline = [
    {
      year: "2024",
      title: "Запуск платформы",
      description: "Начало работы Alash - платформы для аренды товаров и образовательных услуг"
    },
    {
      year: "Будущее",
      title: "Развитие",
      description: "Постоянное улучшение функционала и расширение возможностей платформы"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-4">
              О нашей платформе
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Мы делаем образование доступным
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Alash - это инновационная платформа, которая объединяет студентов и преподавателей, 
              предоставляя доступ к качественному образованию и необходимым учебным материалам.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary"
                onClick={() => setCurrentPage('services')}
              >
                Начать обучение
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setCurrentPage('contact')}
              >
                Связаться с нами
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Почему выбирают Alash?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мы создали платформу, которая решает основные проблемы современного образования
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Наши ценности</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Принципы, которые определяют нашу работу и отношение к каждому пользователю
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shrink-0">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Наша история</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Развитие платформы EduRent
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-center mb-12 last:mb-0"
              >
                {/* Timeline line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-1/2 top-16 w-0.5 h-20 bg-gradient-to-b from-primary to-secondary transform -translate-x-1/2"></div>
                )}
                
                <div className={`flex items-center w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-gradient-to-r from-primary to-secondary">
                          {item.year}
                        </Badge>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Присоединяйтесь к нашему сообществу</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Станьте частью образовательной революци��. Начните учиться или преподавать уже сегодня!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setCurrentPage('register')}
                className="bg-white text-primary hover:bg-white/90"
              >
                Зарегистрироваться
                <UserCheck className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setCurrentPage('services')}
                className="border-white text-white hover:bg-white/10"
              >
                Посмотреть услуги
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}