import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  HelpCircle, 
  Send, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [activeTab, setActiveTab] = useState<'contact' | 'faq' | 'form'>('faq');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending support request
    toast.success("Обращение отправлено! Мы свяжемся с вами в течение 24 часов.");
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
    onClose();
  };

  const faqItems = [
    {
      question: "Как разместить товар для аренды?",
      answer: "Войдите в свой аккаунт, нажмите кнопку 'Добавить' в шапке сайта, заполните описание товара, загрузите фотографии и укажите цену.",
      category: "rental"
    },
    {
      question: "Как обеспечивается безопасность сделок?",
      answer: "Мы проверяем всех пользователей, используем систему рейтингов и отзывов, а также предоставляем защиту платежей.",
      category: "security"
    },
    {
      question: "Какую комиссию берет платформа?",
      answer: "Размещение объявлений бесплатно. Комиссия взимается только с успешных сделок и составляет 5% от суммы.",
      category: "payment"
    },
    {
      question: "Как стать преподавателем на платформе?",
      answer: "Зарегистрируйтесь как преподаватель, пройдите верификацию, создайте профиль с описанием своих навыков и начните предлагать услуги.",
      category: "education"
    },
    {
      question: "Что делать если товар не соответствует описанию?",
      answer: "Свяжитесь с нашей поддержкой в течение 24 часов после получения товара. Мы поможем решить проблему.",
      category: "dispute"
    }
  ];

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "Онлайн чат",
      description: "Круглосуточная поддержка",
      action: "Начать чат",
      available: true
    },
    {
      icon: Phone,
      title: "Телефон",
      description: "+7 (717) 123-45-67",
      action: "Позвонить",
      available: true
    },
    {
      icon: Mail,
      title: "Email",
      description: "support@alash.kz",
      action: "Написать письмо",
      available: true
    }
  ];

  const categoryIcons = {
    general: Info,
    rental: HelpCircle,
    security: AlertCircle,
    payment: CheckCircle,
    education: MessageSquare,
    dispute: AlertCircle
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            Центр поддержки
          </DialogTitle>
          <DialogDescription>
            Найдите ответы на вопросы или свяжитесь с нашей службой поддержки
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <div className="w-48 border-r bg-muted/30 p-4 flex-shrink-0">
            <div className="space-y-2">
              {[
                { id: 'faq', label: 'Частые вопросы', icon: HelpCircle },
                { id: 'contact', label: 'Контакты', icon: Phone },
                { id: 'form', label: 'Обращение', icon: Send }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`w-full flex items-center gap-2 p-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                    }`}
                    onClick={() => setActiveTab(tab.id as any)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'faq' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl mb-4">Частые вопросы</h3>
                <div className="space-y-4">
                  {faqItems.map((item, index) => {
                    const Icon = categoryIcons[item.category as keyof typeof categoryIcons];
                    return (
                      <Card key={index} className="border-0 shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Icon className="w-4 h-4 text-primary" />
                            {item.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl mb-4">Связаться с нами</h3>
                <div className="grid gap-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{method.title}</h4>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {method.available && (
                                <Badge variant="outline" className="text-green-600 border-green-200">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                  Доступно
                                </Badge>
                              )}
                              <Button size="sm" variant="outline">
                                {method.action}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <Card className="mt-6 border-0 shadow-sm bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <h4 className="font-medium">Время работы поддержки</h4>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Понедельник - Пятница: 9:00 - 18:00</p>
                      <p>Суббота - Воскресенье: 10:00 - 16:00</p>
                      <p className="text-primary">Онлайн чат доступен 24/7</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'form' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl mb-4">Обратиться в поддержку</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
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
                      className="w-full p-2 border rounded-lg"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="general">Общий вопрос</option>
                      <option value="rental">Аренда товаров</option>
                      <option value="education">Образовательные услуги</option>
                      <option value="payment">Платежи и комиссии</option>
                      <option value="security">Безопасность</option>
                      <option value="dispute">Спорные ситуации</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Тема</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Кратко опишите проблему"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Подробно опишите вашу ситуацию..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Отправить обращение
                    </Button>
                    <Button type="button" variant="outline" onClick={onClose}>
                      Отмена
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}