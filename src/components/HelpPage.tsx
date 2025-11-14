import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  Shield, 
  CreditCard, 
  Users, 
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Video,
  Download,
  ExternalLink,
  ChevronRight,
  Star,
  ThumbsUp
} from "lucide-react";
import { motion } from "motion/react";

interface HelpPageProps {
  setCurrentPage: (page: string) => void;
}

export function HelpPage({ setCurrentPage }: HelpPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Все категории", icon: HelpCircle },
    { id: "getting-started", label: "Начало работы", icon: BookOpen },
    { id: "renting", label: "Аренда товаров", icon: Users },
    { id: "services", label: "Образовательные услуги", icon: BookOpen },
    { id: "payments", label: "Платежи", icon: CreditCard },
    { id: "safety", label: "Безопасность", icon: Shield }
  ];

  const faqData = [
    {
      category: "getting-started",
      question: "Как зарегистрироваться на платформе?",
      answer: "Для регистрации нажмите кнопку 'Войти' в правом верхнем углу, затем выберите 'Регистрация'. Заполните все необходимые поля: имя, email, пароль и выберите тип аккаунта (студент или преподаватель). После подтверждения email ваш аккаунт будет активирован.",
      popularity: 5
    },
    {
      category: "getting-started", 
      question: "Какие типы аккаунтов существуют?",
      answer: "На EduRent есть два основных типа аккаунтов: Студент и Преподаватель. Студенты могут арендовать товары и записываться на курсы. Преподаватели могут размещать свои товары для аренды и предлагать образовательные услуги.",
      popularity: 4
    },
    {
      category: "renting",
      question: "Как арендовать товар?",
      answer: "Найдите интересующий товар через поиск или категории, нажмите на карточку товара, выберите даты аренды и нажмите 'Забронировать'. После подтверждения владельцем и оплаты, вы получите контактные данные для получения товара.",
      popularity: 5
    },
    {
      category: "renting",
      question: "Как разместить товар для аренды?",
      answer: "Войдите в свой аккаунт, нажмите кнопку 'Добавить' в шапке сайта, выберите 'Товар для аренды', заполните описание, загрузите фотографии, укажите цену и условия аренды. После модерации ваше объявление будет опубликовано.",
      popularity: 4
    },
    {
      category: "services",
      question: "Как записаться на курс или к репетитору?",
      answer: "Перейдите в раздел 'Услуги', найдите подходящий курс или репетитора, изучите описание и отзывы, выберите удобное время и нажмите 'Записаться'. После подтверждения преподавателем вы получите детали занятия.",
      popularity: 5
    },
    {
      category: "services",
      question: "Как стать преподавателем на платформе?",
      answer: "Зарегистрируйтесь как преподаватель, заполните подробный профиль с описанием навыков и опыта, пройдите верификацию (загрузите документы об образовании), создайте свои первые услуги. После проверки модераторами вы сможете принимать студентов.",
      popularity: 4
    },
    {
      category: "payments",
      question: "Какие способы оплаты доступны?",
      answer: "Мы принимаем оплату банковскими картами (Visa, MasterCard), через Kaspi Pay, банковские переводы и электронные кошельки. Все платежи защищены SSL-шифрованием и проходят через безопасные платежные шлюзы.",
      popularity: 5
    },
    {
      category: "payments", 
      question: "Какую комиссию берет платформа?",
      answer: "Размещение объявлений бесплатно. Комиссия взимается только с успешных сделок: 5% для аренды товаров и 7% для образовательных услуг. Комиссия автоматически вычитается при получении платежа.",
      popularity: 4
    },
    {
      category: "safety",
      question: "Как обеспечивается безопасность сделок?",
      answer: "Мы проверяем всех пользователей при регистрации, используем систему рейтингов и отзывов, предоставляем защиту платежей через эскроу-сервис, а также имеем службу поддержки для решения спорных ситуаций 24/7.",
      popularity: 5
    },
    {
      category: "safety",
      question: "Что делать если возникла проблема?",
      answer: "Обратитесь в службу поддержки через чат на сайте, email support@edurent.com или телефон +7 (717) 123-45-67. При серьезных нарушениях используйте функцию 'Пожаловаться' в профиле пользователя или объявлении.",
      popularity: 3
    }
  ];

  const quickActions = [
    {
      title: "Руководство для новичков",
      description: "Пошаговое руководство по использованию платформы",
      icon: BookOpen,
      action: () => setCurrentPage('guide')
    },
    {
      title: "Связаться с поддержкой",
      description: "Получить помощь от нашей команды",
      icon: MessageCircle,
      action: () => setCurrentPage('contact')
    },
    {
      title: "Сообщить о проблеме",
      description: "Уведомить нас о технических проблемах",
      icon: Shield,
      action: () => setCurrentPage('report')
    },
    {
      title: "Видео-туториалы",
      description: "Обучающие видео по работе с платформой",
      icon: Video,
      action: () => setCurrentPage('tutorials')
    }
  ];

  const resources = [
    {
      title: "Пользовательское соглашение",
      description: "Правила использования платформы",
      icon: FileText,
      link: "#"
    },
    {
      title: "Политика конфиденциальности",
      description: "Как мы защищаем ваши данные",
      icon: Shield,
      link: "#"
    },
    {
      title: "Руководство по безопасности",
      description: "Советы по безопасным сделкам",
      icon: Download,
      link: "#"
    }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Центр помощи</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Найдите ответы на ваши вопросы или обратитесь к нашей команде поддержки
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Поиск по часто задаваемым вопросам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {quickActions.map((action, index) => (
            <Card 
              key={action.title}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={action.action}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <action.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Категории</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="w-4 h-4 mr-2" />
                    {category.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Нужна помощь?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+7 (717) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>support@edurent.com</span>
                </div>
                <Button size="sm" className="w-full" onClick={() => setCurrentPage('contact')}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Написать в поддержку
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="faq">Часто задаваемые вопросы</TabsTrigger>
                <TabsTrigger value="resources">Полезные ресурсы</TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="mt-6">
                {/* Results Info */}
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    Часто задаваемые вопросы
                  </h2>
                  <p className="text-muted-foreground">
                    Найдено {filteredFAQ.length} вопросов
                    {selectedCategory !== 'all' && (
                      <span> в категории "{categories.find(c => c.id === selectedCategory)?.label}"</span>
                    )}
                  </p>
                </div>

                {/* FAQ Accordion */}
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQ.map((item, index) => (
                    <Card key={index} className="border-0 shadow-sm">
                      <AccordionItem value={`item-${index}`} className="border-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg">
                          <div className="flex items-center gap-3 text-left">
                            <div className="flex items-center gap-2">
                              {[...Array(item.popularity)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="font-medium">{item.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                          <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                            <span className="text-sm text-muted-foreground">Был ли этот ответ полезен?</span>
                            <Button size="sm" variant="outline">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              Да
                            </Button>
                            <Button size="sm" variant="outline">
                              Нет
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  ))}
                </Accordion>

                {/* No Results */}
                {filteredFAQ.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                    <p className="text-muted-foreground mb-6">
                      Попробуйте изменить поисковый запрос или выбрать другую категорию
                    </p>
                    <Button onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}>
                      Сбросить фильтры
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <h2 className="text-2xl font-semibold mb-6">Полезные ресурсы</h2>
                
                <div className="grid gap-6">
                  {resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <resource.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">{resource.title}</h3>
                              <p className="text-muted-foreground text-sm">{resource.description}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={resource.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Открыть
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Additional Help */}
                <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">Не нашли ответ на свой вопрос?</h3>
                    <p className="text-muted-foreground mb-4">
                      Обратитесь к нашей команде поддержки, и мы поможем решить любую проблему
                    </p>
                    <Button onClick={() => setCurrentPage('contact')}>
                      Связаться с поддержкой
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}