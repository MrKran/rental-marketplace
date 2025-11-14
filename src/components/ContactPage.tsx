import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Users,
  Shield,
  Heart,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";

interface ContactPageProps {
  setCurrentPage: (page: string) => void;
}

export function ContactPage({ setCurrentPage }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Сообщение отправлено! Мы свяжемся с вами в течение 24 часов.");
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Онлайн чат",
      description: "Мгновенная поддержка",
      details: "Лучший способ связи",
      action: "Начать чат",
      available: true
    },
    {
      icon: MapPin,
      title: "Местоположение",
      description: "г. Астана, Казахстан",
      details: "Школьная платформа",
      action: "Подробнее",
      available: true
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#", followers: "" },
    { icon: Instagram, label: "Instagram", href: "#", followers: "" },
    { icon: Twitter, label: "Twitter", href: "#", followers: "" },
    { icon: Youtube, label: "YouTube", href: "#", followers: "" }
  ];

  const stats = [
    { icon: Users, value: "Растём", label: "Сообщество" },
    { icon: MessageCircle, value: "Быстро", label: "Поддержка" },
    { icon: CheckCircle, value: "Стараемся", label: "Решать вопросы" },
    { icon: Heart, value: "Заботимся", label: "О пользователях" }
  ];

  const faqHighlights = [
    {
      question: "Как быстро вы отвечаете на обращения?",
      answer: "Через онлайн-чат мгновенно, по email и телефону - в течение 24 часов."
    },
    {
      question: "Можно ли получить консультацию бесплатно?",
      answer: "Да, все консультации по использованию платформы абсолютно бесплатны."
    },
    {
      question: "Работаете ли вы в выходные?",
      answer: "Онлайн-чат работает круглосуточно, телефон - в выходные с 10:00 до 16:00."
    }
  ];

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
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Свяжитесь с нами</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            У вас есть вопросы? Наша команда готова помочь вам 24/7. 
            Выберите удобный способ связи или заполните форму ниже.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Отправить сообщение</CardTitle>
                <p className="text-muted-foreground">
                  Заполните форму, и мы свяжемся с вами в ближайшее время
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Категория</label>
                    <select 
                      className="w-full p-3 border rounded-lg bg-background"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="general">Общий вопрос</option>
                      <option value="technical">Техническая поддержка</option>
                      <option value="billing">Вопросы по оплате</option>
                      <option value="partnership">Партнерство</option>
                      <option value="complaint">Жалоба</option>
                      <option value="suggestion">Предложение</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Тема *</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="О чем ваше сообщение?"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Подробно опишите ваш вопрос или проблему..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Отправить сообщение
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Нажимая "Отправить", вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Methods & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Methods */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Способы связи</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <method.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{method.title}</h3>
                        {method.available && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            Доступно
                          </Badge>
                        )}
                      </div>
                      <p className="text-primary font-medium mb-1">{method.description}</p>
                      <p className="text-sm text-muted-foreground">{method.details}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Часы работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Понедельник - Пятница</span>
                    <span className="font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Суббота - Воскресенье</span>
                    <span className="font-medium">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-muted-foreground">Онлайн чат</span>
                    <span className="font-medium text-primary">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Highlights */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Часто задаваемые вопросы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqHighlights.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium text-sm">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    {index < faqHighlights.length - 1 && <div className="border-b"></div>}
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={() => setCurrentPage('help')}
                >
                  Посмотреть все вопросы
                </Button>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Мы в социальных сетях</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto p-3"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="w-4 h-4 mr-2" />
                        <div className="text-left">
                          <div className="font-medium text-xs">{social.label}</div>
                          {social.followers && (
                            <div className="text-xs text-muted-foreground">{social.followers} подписчиков</div>
                          )}
                        </div>
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}