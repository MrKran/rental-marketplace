import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, BookOpen, Laptop, Music, DollarSign, Clock, Users, TrendingUp, CheckCircle, Star } from "lucide-react";
import { motion } from "motion/react";

interface StudentsPageProps {
  setCurrentPage: (page: string) => void;
}

export function StudentsPage({ setCurrentPage }: StudentsPageProps) {
  const benefits = [
    {
      icon: DollarSign,
      title: "Экономия средств",
      description: "Арендуйте вместо покупки и экономьте до 80% от стоимости"
    },
    {
      icon: BookOpen,
      title: "Доступ к знаниям",
      description: "Учитесь у лучших преподавателей города по доступным ценам"
    },
    {
      icon: Users,
      title: "Сообщество",
      description: "Общайтесь с единомышленниками и обменивайтесь опытом"
    },
    {
      icon: TrendingUp,
      title: "Дополнительный доход",
      description: "Сдавайте свои неиспользуемые вещи в аренду"
    }
  ];

  const categories = [
    {
      icon: Laptop,
      title: "Техника и электроника",
      description: "Ноутбуки, планшеты, калькуляторы, проекторы",
      savings: "до 70%",
      popular: ["MacBook Pro", "iPad", "Графические планшеты", "Веб-камеры"]
    },
    {
      icon: BookOpen,
      title: "Учебные материалы",
      description: "Книги, методички, конспекты, справочники",
      savings: "до 60%",
      popular: ["Учебники по математике", "Атласы", "Словари", "Научная литература"]
    },
    {
      icon: Music,
      title: "Творчество и искусство",
      description: "Музыкальные инструменты, художественные принадлежности",
      savings: "до 80%",
      popular: ["Гитары", "Синтезаторы", "Мольберты", "Кисти и краски"]
    }
  ];

  const educationServices = [
    {
      title: "Индивидуальные занятия",
      price: "2,000-8,000 ₸/час",
      description: "Персональные уроки с опытными преподавателями",
      subjects: ["Математика", "Физика", "Химия", "Английский", "Программирование"]
    },
    {
      title: "Групповые курсы",
      price: "1,000-3,000 ₸/час",
      description: "Обучение в небольших группах до 6 человек",
      subjects: ["ЕНТ подготовка", "IELTS", "Дизайн", "Языки", "IT-курсы"]
    },
    {
      title: "Онлайн обучение",
      price: "1,500-5,000 ₸/час",
      description: "Дистанционные занятия в удобное время",
      subjects: ["Веб-разработка", "Маркетинг", "Дизайн", "Языки", "Школьные предметы"]
    }
  ];

  const tips = [
    {
      title: "Планируйте заранее",
      description: "Бронируйте товары и услуги заблаговременно, особенно в период сессий"
    },
    {
      title: "Читайте отзывы",
      description: "Изучайте рейтинги и комментарии других пользователей перед выбором"
    },
    {
      title: "Общайтесь с арендодателями",
      description: "Задавайте вопросы о состоянии товара и условиях аренды"
    },
    {
      title: "Берегите арендованные вещи",
      description: "Относитесь к чужим вещам как к своим собственным"
    }
  ];

  const successExamples = [
    {
      name: "Алия С.",
      year: "2 курс, КазНУ",
      story: "Сэкономила 200,000 ₸ за семестр, арендуя учебники и ноутбук вместо покупки",
      category: "Экономия"
    },
    {
      name: "Ерлан К.",
      year: "4 курс, КБТУ",
      story: "Подготовился к IELTS с преподавателем с платформы, набрал 7.5 баллов",
      category: "Образование"
    },
    {
      name: "Динара М.",
      year: "1 курс, АГУ",
      story: "Научилась играть на гитаре, арендуя инструмент на выходные",
      category: "Хобби"
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
            <h1 className="text-4xl lg:text-5xl mb-4">Для студентов</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Учитесь эффективно и экономно с EduRent
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
            <h2 className="text-3xl mb-4">Преимущества для студентов</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Почему студенты выбирают EduRent
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

      {/* Categories */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Категории товаров</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Все необходимое для учебы и творчества
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
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
                      <div className="flex items-center gap-2">
                        <category.icon className="w-6 h-6 text-primary" />
                        {category.title}
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Экономия {category.savings}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Популярные товары:</h4>
                      {category.popular.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{item}</span>
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

      {/* Education Services */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Образовательные услуги</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Выбирайте формат обучения, который подходит именно вам
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {educationServices.map((service, index) => (
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
                    <div className="space-y-1">
                      {service.subjects.map((subject, subjectIndex) => (
                        <Badge key={subjectIndex} variant="outline" className="text-xs mr-1 mb-1">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Полезные советы</h2>
            <p className="text-muted-foreground text-lg">
              Как максимально эффективно использовать платформу
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">{tip.title}</h3>
                        <p className="text-muted-foreground text-sm">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Examples */}
      <section className="py-20 px-4">
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
              Как другие студенты используют EduRent
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="font-medium">{example.name}</h3>
                      <p className="text-sm text-muted-foreground">{example.year}</p>
                      <Badge className="mt-2" variant="outline">{example.category}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm italic text-center">
                      "{example.story}"
                    </p>
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
            <h2 className="text-3xl text-white mb-4">Начните экономить уже сегодня</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам студентов, которые уже используют EduRent для учебы и творчества
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => setCurrentPage('register')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Зарегистрироваться
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setCurrentPage('items')}
              >
                Смотреть товары
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}