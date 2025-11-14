import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, GraduationCap, DollarSign, Clock, Users, Star, TrendingUp, Shield, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface TeachersPageProps {
  setCurrentPage: (page: string) => void;
}

export function TeachersPage({ setCurrentPage }: TeachersPageProps) {
  const benefits = [
    {
      icon: DollarSign,
      title: "Дополнительный доход",
      description: "Зарабатывайте на своих знаниях и опыте в удобное время"
    },
    {
      icon: Clock,
      title: "Гибкий график",
      description: "Выбирайте удобное время для занятий и количество учеников"
    },
    {
      icon: Users,
      title: "Заинтересованные ученики",
      description: "Работайте только с мотивированными студентами"
    },
    {
      icon: Star,
      title: "Репутация",
      description: "Получайте отзывы и стройте профессиональную репутацию"
    }
  ];

  const serviceTypes = [
    {
      title: "Индивидуальные занятия",
      description: "Персональные уроки с полным вниманием к одному ученику",
      price: "2,000-8,000 ₸/час",
      features: ["Индивидуальный подход", "Быстрый прогресс", "Гибкое расписание"]
    },
    {
      title: "Групповые курсы",
      description: "Обучение в небольших группах до 6 человек",
      price: "1,000-3,000 ₸/час с ученика",
      features: ["Социальное взаимодействие", "Соревновательный элемент", "Экономично"]
    },
    {
      title: "Онлайн занятия",
      description: "Дистанционное обучение через видеосвязь",
      price: "1,500-5,000 ₸/час",
      features: ["Экономия времени", "Широкая аудитория", "Современные технологии"]
    },
    {
      title: "Подготовка к экзаменам",
      description: "Специализированная подготовка к ЕНТ, ielts и другим экзаменам",
      price: "3,000-10,000 ₸/час",
      features: ["Высокий спрос", "Специализация", "Результативность"]
    }
  ];

  const requirements = [
    "Знание предмета на хорошем уровне",
    "Умение объяснять материал доступно",
    "Терпение и желание помогать ученикам",
    "Пунктуальность и ответственность"
  ];

  const successStories = [
    {
      name: "Айгерим К.",
      subject: "Математика",
      experience: "2 года на платформе",
      income: "150,000 ₸/месяц",
      rating: 4.9,
      story: "Начинала с 3 учеников, теперь веду 15 студентов. Помогла 20+ ученикам поступить в вузы."
    },
    {
      name: "Данияр М.",
      subject: "Программирование",
      experience: "1.5 года на платформе",
      income: "200,000 ₸/месяц",
      rating: 5.0,
      story: "Совмещаю основную работу с преподаванием. Обучил уже 50+ студентов основам Python."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage('home')}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад на главную
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl mb-4">Для преподавателей</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Делитесь знаниями и зарабатывайте на EduRent
            </p>
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Преимущества преподавания</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Почему преподаватели выбирают нашу платформу
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg text-center h-full">
                  <CardContent className="p-8">
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Виды образовательных услуг</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Выберите формат, который подходит именно вам
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceTypes.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {service.title}
                      <Badge className="bg-primary/10 text-primary">{service.price}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Требования к преподавателям</h2>
            <p className="text-muted-foreground text-lg">
              Что нужно для успешного преподавания
            </p>
          </motion.div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requirements.map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Истории успеха</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Реальные результаты наших преподавателей
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl mb-1">{story.name}</h3>
                        <p className="text-muted-foreground">{story.subject}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{story.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                        <div className="text-sm text-muted-foreground">Доход</div>
                        <div className="font-semibold">{story.income}</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                        <div className="text-sm text-muted-foreground">Опыт</div>
                        <div className="font-semibold">{story.experience}</div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground italic">"{story.story}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl text-white mb-4">Начните преподавать уже сегодня</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к сообществу преподавателей EduRent и начните зарабатывать на своих знаниях
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => setCurrentPage('register')}
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Стать преподавателем
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setCurrentPage('contact')}
              >
                Задать вопрос
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}