import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Search, UserPlus, MessageCircle, CreditCard, Shield, Star, Clock, Users, Laptop } from "lucide-react";
import { motion } from "motion/react";

interface HowItWorksPageProps {
  setCurrentPage: (page: string) => void;
}

export function HowItWorksPage({ setCurrentPage }: HowItWorksPageProps) {
  const steps = [
    {
      number: 1,
      title: "Регистрация",
      description: "Создайте аккаунт студента или преподавателя",
      icon: UserPlus,
      details: ["Быстрая регистрация", "Подтверждение email", "Настройка профиля"]
    },
    {
      number: 2,
      title: "Поиск или размещение",
      description: "Найдите нужное или разместите свое объявление",
      icon: Search,
      details: ["Удобные фильтры", "Фото и описания", "Контакты владельца"]
    },
    {
      number: 3,
      title: "Общение",
      description: "Свяжитесь с арендодателем или учеником",
      icon: MessageCircle,
      details: ["Безопасный чат", "Обсуждение деталей", "Договоренности"]
    },
    {
      number: 4,
      title: "Сделка",
      description: "Завершите аренду или бронирование услуги",
      icon: CreditCard,
      details: ["Безопасная оплата", "Подтверждение сделки", "Система отзывов"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Безопасность",
      description: "Проверенные пользователи и безопасные платежи"
    },
    {
      icon: Star,
      title: "Качество",
      description: "Система рейтингов и отзывов от реальных пользователей"
    },
    {
      icon: Clock,
      title: "Удобство",
      description: "Быстрый поиск и простое оформление сделок"
    },
    {
      icon: Users,
      title: "Сообщество",
      description: "Растущее сообщество студентов и преподавателей"
    }
  ];

  const benefits = {
    students: [
      "Экономия на покупке дорогих учебных материалов",
      "Доступ к качественным образовательным услугам",
      "Возможность зарабатывать на сдаче своих вещей",
      "Общение с единомышленниками"
    ],
    teachers: [
      "Дополнительный доход от преподавания",
      "Гибкий график и выбор учеников",
      "Возможность делиться знаниями",
      "Построение репутации преподавателя"
    ]
  };

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
            <h1 className="text-4xl lg:text-5xl mb-4">Как это работает</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Простые шаги для начала работы с EduRent
            </p>
          </motion.div>
        </div>
      </div>

      {/* How it Works Steps */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Как начать работу с EduRent</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Простое пошаговое руководство для новых пользователей
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-primary rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                  )}
                </div>
                
                <h3 className="text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                
                <div className="space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <Badge key={detailIndex} variant="outline" className="text-xs mx-1">
                      {detail}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Почему выбирают EduRent</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Преимущества нашей платформы
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg text-center h-full">
                  <CardContent className="p-8">
                    <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            <h2 className="text-3xl mb-4">Преимущества для всех</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Что получают студенты и преподаватели
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Students */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg h-full">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl mb-2">Для студентов</h3>
                  </div>
                  <ul className="space-y-3">
                    {benefits.students.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* For Teachers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg h-full">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl mb-2">Для преподавателей</h3>
                  </div>
                  <ul className="space-y-3">
                    {benefits.teachers.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Add Services */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Как разместить свою услугу</h2>
            <p className="text-muted-foreground text-lg">
              Пошаговое руководство для преподавателей
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Войдите в свой аккаунт",
                description: "Зарегистрируйтесь или войдите в систему как преподаватель"
              },
              {
                step: 2,
                title: "Нажмите кнопку 'Добавить'",
                description: "В шапке сайта нажмите на кнопку с плюсом для добавления нового объявления"
              },
              {
                step: 3,
                title: "Выберите 'Услуга'",
                description: "В модальном окне выберите тип 'Образовательная услуга'"
              },
              {
                step: 4,
                title: "Заполните информацию",
                description: "Укажите название курса, описание, цену и загрузите фото"
              },
              {
                step: 5,
                title: "Опубликуйте объявление",
                description: "Проверьте данные и нажмите 'Добавить'. Ваша услуга появится в каталоге"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Примеры успешных объявлений</h2>
            <p className="text-muted-foreground text-lg">
              Вдохновитесь примерами других пользователей
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Example 1 - Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Курс Python для начинающих</h3>
                      <p className="text-sm text-muted-foreground">Образовательная услуга</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    "Индивидуальные занятия по Python с нуля. Практические задания, 
                    помощь с проектами. Опыт преподавания 3 года."
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">5,000 ₸/час</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">4.9 (12 отзывов)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Example 2 - Item */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                      <Laptop className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">MacBook Pro 13" 2021</h3>
                      <p className="text-sm text-muted-foreground">Аренда техники</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    "MacBook в отличном состоянии. Подходит для программирования, 
                    дизайна, учебы. Зарядка в комплекте."
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800">2,500 ₸/день</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">5.0 (8 отзывов)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
            <h2 className="text-3xl text-white mb-4">Готовы начать?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к сообществу EduRent уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => setCurrentPage('register')}
              >
                Зарегистрироваться
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setCurrentPage('home')}
              >
                Узнать больше
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}