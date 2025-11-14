import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { ArrowLeft, AlertTriangle, Shield, MessageCircle, FileText, Send, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";

interface ReportPageProps {
  setCurrentPage: (page: string) => void;
}

export function ReportPage({ setCurrentPage }: ReportPageProps) {
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    description: '',
    userUrl: '',
    email: '',
    urgent: false
  });

  const reportTypes = [
    { value: 'fraud', label: 'Мошенничество', description: 'Подозрительная активность или обман' },
    { value: 'inappropriate', label: 'Неподходящий контент', description: 'Оскорбительные материалы или спам' },
    { value: 'fake', label: 'Поддельный профиль', description: 'Фейковый аккаунт или ложная информация' },
    { value: 'harassment', label: 'Домогательства', description: 'Угрозы или нежелательное поведение' },
    { value: 'copyright', label: 'Нарушение авторских прав', description: 'Незаконное использование контента' },
    { value: 'technical', label: 'Техническая проблема', description: 'Ошибки или сбои в работе платформы' },
    { value: 'other', label: 'Другое', description: 'Иная проблема или вопрос' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.subject || !formData.description || !formData.email) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    // Simulate form submission
    toast.success("Ваше сообщение отправлено! Мы рассмотрим его в течение 24 часов.");
    
    // Reset form
    setFormData({
      type: '',
      subject: '',
      description: '',
      userUrl: '',
      email: '',
      urgent: false
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
            <h1 className="text-4xl lg:text-5xl mb-4">Сообщить о проблеме</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Помогите нам сделать EduRent безопаснее для всех пользователей
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Report Types Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Типы жалоб
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reportTypes.slice(0, 4).map((type) => (
                      <div key={type.value} className="space-y-1">
                        <div className="font-medium text-sm">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    ))}
                    <div className="text-xs text-muted-foreground">
                      <strong>Время рассмотрения:</strong> обычно 24-48 часов
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      Экстренные случаи
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      При угрозе безопасности или срочных проблемах:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Телефон:</strong> +7 (717) 123-45-67</div>
                      <div><strong>Email:</strong> urgent@edurent.com</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Report Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Форма жалобы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Report Type */}
                      <div className="space-y-2">
                        <Label htmlFor="type">Тип проблемы *</Label>
                        <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип проблемы" />
                          </SelectTrigger>
                          <SelectContent>
                            {reportTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <Label htmlFor="subject">Тема сообщения *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Краткое описание проблемы"
                          required
                        />
                      </div>

                      {/* User URL */}
                      <div className="space-y-2">
                        <Label htmlFor="userUrl">Ссылка на пользователя или объявление</Label>
                        <Input
                          id="userUrl"
                          value={formData.userUrl}
                          onChange={(e) => handleInputChange('userUrl', e.target.value)}
                          placeholder="Если применимо, укажите ссылку"
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Подробное описание *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Опишите проблему подробно. Включите даты, имена пользователей и другие детали"
                          rows={6}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Ваш email для обратной связи *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <Separator />

                      {/* Submit */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button type="submit" className="flex-1">
                          <Send className="w-4 h-4 mr-2" />
                          Отправить жалобу
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setCurrentPage('contact')}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Связаться с поддержкой
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Рекомендации по подаче жалоб
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Что включить в жалобу:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Точные даты и время инцидентов</li>
                      <li>• Имена пользователей или ссылки на профили</li>
                      <li>• Скриншоты или другие доказательства</li>
                      <li>• Описание того, как это влияет на вас</li>
                      <li>• Любые предыдущие попытки решить проблему</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Процесс рассмотрения:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Подтверждение получения в течение 1 часа</li>
                      <li>• Предварительная оценка в течение 24 часов</li>
                      <li>• Полное расследование до 5 рабочих дней</li>
                      <li>• Уведомление о принятых мерах</li>
                      <li>• Возможность обжалования решения</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}