import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ArrowLeft, Shield, CheckCircle, XCircle, AlertTriangle, Users, BookOpen, Laptop } from "lucide-react";
import { motion } from "motion/react";

interface RulesPageProps {
  setCurrentPage: (page: string) => void;
}

export function RulesPage({ setCurrentPage }: RulesPageProps) {
  const allowedItems = [
    { category: "Техника", items: ["Ноутбуки", "Планшеты", "Калькуляторы", "Проекторы", "Камеры", "Наушники"] },
    { category: "Учебные материалы", items: ["Книги", "Методички", "Канцелярия", "Модели", "Приборы", "Софт"] },
    { category: "Творчество", items: ["Музыкальные инструменты", "Художественные принадлежности", "Микрофоны", "Стойки"] }
  ];

  const prohibitedItems = [
    "Личные вещи (одежда, обувь)",
    "Медицинские препараты",
    "Дорогие украшения",
    "Опасные предметы",
    "Еда и напитки",
    "Животные"
  ];

  const serviceRules = [
    { rule: "Четкое описание услуги", description: "Укажите программу, уровень, длительность" },
    { rule: "Реальная квалификация", description: "Предлагайте только те услуги, в которых компетентны" },
    { rule: "Честные цены", description: "Указывайте справедливые цены без скрытых доплат" },
    { rule: "Соблюдение расписания", description: "Приходите вовремя и предупреждайте об изменениях" }
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
            <h1 className="text-4xl lg:text-5xl mb-4">Правила платформы</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Создаем безопасную и дружелюбную среду для всех участников
            </p>
          </motion.div>
        </div>
      </div>

      {/* General Rules */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Основные принципы</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Наша платформа основана на взаимном уважении и честности
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
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl mb-2">Безопасность</h3>
                  <p className="text-muted-foreground">
                    Соблюдайте меры предосторожности при встречах и сделках
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
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl mb-2">Уважение</h3>
                  <p className="text-muted-foreground">
                    Относитесь к другим участникам вежливо и с пониманием
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
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl mb-2">Честность</h3>
                  <p className="text-muted-foreground">
                    Предоставляйте точную информацию о товарах и услугах
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Items Rules */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Правила аренды товаров</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Что можно и нельзя сдавать в аренду на платформе
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Allowed Items */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    Разрешено к аренде
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allowedItems.map((category, index) => (
                      <div key={index}>
                        <h4 className="font-medium mb-2">{category.category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.items.map((item, itemIndex) => (
                            <Badge key={itemIndex} variant="outline" className="text-sm">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Prohibited Items */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    Запрещено к аренде
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {prohibitedItems.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Rules */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Правила для образовательных услуг</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Требования к преподавателям и качеству услуг
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceRules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium mb-1">{rule.rule}</h3>
                        <p className="text-muted-foreground text-sm">{rule.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sanctions */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">Ответственность</h2>
            <p className="text-muted-foreground text-lg">
              Что происходит при нарушении правил
            </p>
          </motion.div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Предупреждение</h3>
                    <p className="text-muted-foreground text-sm">
                      За первое незначительное нарушение правил платформы
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Временная блокировка</h3>
                    <p className="text-muted-foreground text-sm">
                      За повторные нарушения или серьезные проступки (1-30 дней)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Постоянная блокировка</h3>
                    <p className="text-muted-foreground text-sm">
                      За грубые нарушения, мошенничество или угрозы безопасности
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Важно:</strong> Все решения принимаются индивидуально. 
                  При спорных ситуациях вы можете обратиться в службу поддержки для разъяснений.
                </p>
              </div>
            </CardContent>
          </Card>
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
            <h2 className="text-3xl text-white mb-4">Есть вопросы по правилам?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Наша служба поддержки поможет разобраться в любой ситуации
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
                Сообщить о нарушении
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}