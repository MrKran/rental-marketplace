import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ArrowLeft, DollarSign, Clock, Shield, CheckCircle, XCircle, AlertTriangle, CreditCard } from "lucide-react";
import { motion } from "motion/react";

interface RefundPageProps {
  setCurrentPage: (page: string) => void;
}

export function RefundPage({ setCurrentPage }: RefundPageProps) {
  const refundReasons = [
    { reason: "Товар не соответствует описанию", timeframe: "7 дней", guarantee: "100%" },
    { reason: "Товар поврежден при получении", timeframe: "24 часа", guarantee: "100%" },
    { reason: "Преподаватель не явился на занятие", timeframe: "24 часа", guarantee: "100%" },
    { reason: "Техническая неисправность товара", timeframe: "3 дня", guarantee: "100%" },
    { reason: "Низкое качество образовательной услуги", timeframe: "48 часов", guarantee: "Частичный" },
    { reason: "Отмена по личным причинам", timeframe: "До начала", guarantee: "90%" }
  ];

  const refundProcess = [
    {
      step: 1,
      title: "Подача заявки",
      description: "Отправьте запрос на возврат через личный кабинет или службу поддержки",
      time: "В любое время"
    },
    {
      step: 2,
      title: "Рассмотрение",
      description: "Наша команда проверит основания для возврата",
      time: "1-3 рабочих дня"
    },
    {
      step: 3,
      title: "Одобрение",
      description: "При положительном решении мы инициируем возврат средств",
      time: "В день одобрения"
    },
    {
      step: 4,
      title: "Получение денег",
      description: "Средства поступят на ваш счет согласно политике банка",
      time: "3-10 рабочих дней"
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
            <h1 className="text-4xl lg:text-5xl mb-4">Политика возврата</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Простые и справедливые условия возврата средств на EduRent
            </p>
          </motion.div>
        </div>
      </div>

      {/* Refund Guarantee */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl mb-4">Гарантия возврата средств</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Мы гарантируем справедливое рассмотрение всех запросов на возврат. 
              Ваше удовлетворение - наш приоритет.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg text-center h-full">
                <CardContent className="p-8">
                  <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl mb-2">100% возврат</h3>
                  <p className="text-muted-foreground">
                    При нарушении условий со стороны арендодателя или преподавателя
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg text-center h-full">
                <CardContent className="p-8">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl mb-2">Быстрое рассмотрение</h3>
                  <p className="text-muted-foreground">
                    Большинство запросов обрабатывается в течение 24 часов
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg text-center h-full">
                <CardContent className="p-8">
                  <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl mb-2">Удобные способы</h3>
                  <p className="text-muted-foreground">
                    Возврат на карту, электронный кошелек или баланс платформы
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Refund Reasons */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Основания для возврата</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              В каких случаях вы можете получить полный или частичный возврат средств
            </p>
          </motion.div>

          <div className="space-y-4">
            {refundReasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          {item.guarantee === "100%" ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                          )}
                          <span className="font-medium">{item.reason}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Badge variant="outline">
                          {item.timeframe}
                        </Badge>
                        <Badge 
                          className={
                            item.guarantee === "100%" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {item.guarantee}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Process */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Процесс возврата средств</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Как происходит возврат средств от заявки до получения денег
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {refundProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">{step.step}</span>
                  </div>
                  {index < refundProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                  )}
                </div>
                <h3 className="text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{step.description}</p>
                <Badge variant="outline" className="text-xs">
                  {step.time}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Cases */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Особые случаи</h2>
            <p className="text-muted-foreground text-lg">
              Дополнительная информация о возврате средств
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Принимается возврат
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Товар значительно отличается от описания</li>
                  <li>• Преподаватель отменил занятие менее чем за 2 часа</li>
                  <li>• Технические проблемы с товаром</li>
                  <li>• Качество услуги ниже заявленного</li>
                  <li>• Нарушение правил платформы арендодателем</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  Не подлежит возврату
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Изменение планов арендатора в последний момент</li>
                  <li>• Нормальный износ арендованного товара</li>
                  <li>• Услуги, полностью оказанные согласно описанию</li>
                  <li>• Отмена после начала аренды без уважительных причин</li>
                  <li>• Субъективное недовольство без объективных оснований</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl text-white mb-4">Нужна помощь с возвратом?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Наша служба поддержки готова помочь вам с любыми вопросами по возврату средств
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => setCurrentPage('contact')}
              >
                Связаться с поддержкой
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setCurrentPage('report')}
              >
                Подать заявку на возврат
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}