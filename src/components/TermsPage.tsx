import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ArrowLeft, FileText, Clock, Shield, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

interface TermsPageProps {
  setCurrentPage: (page: string) => void;
}

export function TermsPage({ setCurrentPage }: TermsPageProps) {
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
            <h1 className="text-4xl lg:text-5xl mb-4">Пользовательское соглашение</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Условия использования платформы EduRent
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Последнее обновление: 1 октября 2024</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="prose max-w-none"
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 space-y-8">
                <section>
                  <h2 className="text-2xl mb-4">1. Общие положения</h2>
                  <p className="text-muted-foreground mb-4">
                    Настоящее Пользовательское соглашение (далее - "Соглашение") является официальным предложением ТОО "EduRent" 
                    (далее - "Компания") для физических лиц (далее - "Пользователь") по использованию интернет-платформы EduRent.
                  </p>
                  <p className="text-muted-foreground">
                    Начиная использовать платформу EduRent, Пользователь принимает все условия настоящего Соглашения в полном объеме 
                    без всяких оговорок и исключений.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">2. Определения</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Платформа</strong> - интернет-сайт EduRent, включающий все его страницы и функциональные возможности.</p>
                    <p><strong>Пользователь</strong> - физическое лицо, зарегистрированное на Платформе или использующее ее.</p>
                    <p><strong>Арендодатель</strong> - Пользователь, предоставляющий товары в аренду или оказывающий образовательные услуги.</p>
                    <p><strong>Арендатор</strong> - Пользователь, получающий товары в аренду или образовательные услуги.</p>
                    <p><strong>Контент</strong> - любая информация, размещаемая Пользователями на Платформе.</p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">3. Предмет соглашения</h2>
                  <p className="text-muted-foreground mb-4">
                    Компания предоставляет Пользователю право использовать Платформу для:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li>• Поиска и аренды товаров образовательного назначения</li>
                    <li>• Поиска и получения образовательных услуг</li>
                    <li>• Размещения объявлений о сдаче товаров в аренду</li>
                    <li>• Предложения образовательных услуг</li>
                    <li>• Взаимодействия с другими Пользователями</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">4. Регистрация и аккаунт</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Для использования полного функционала Платформы необходима регистрация. При регистрации Пользователь обязуется 
                      предоставлять достоверную информацию о себе.
                    </p>
                    <p>
                      Пользователь несет ответственность за сохранность своих учетных данных и все действия, совершенные под его аккаунтом.
                    </p>
                    <p>
                      Запрещается создание более одного аккаунта одним Пользователем, а также передача аккаунта третьим лицам.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">5. Права и обязанности сторон</h2>
                  
                  <h3 className="text-xl mb-3">5.1. Пользователь имеет право:</h3>
                  <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
                    <li>• Использовать все функции Платформы в соответствии с настоящим Соглашением</li>
                    <li>• Размещать объявления о товарах и услугах</li>
                    <li>• Получать поддержку от службы клиентского сервиса</li>
                    <li>• Удалить свой аккаунт в любое время</li>
                  </ul>

                  <h3 className="text-xl mb-3">5.2. Пользователь обязуется:</h3>
                  <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
                    <li>• Соблюдать требования законодательства Республики Казахстан</li>
                    <li>• Предоставлять достоверную информацию</li>
                    <li>• Не нарушать права других Пользователей</li>
                    <li>• Соблюдать правила Платформы</li>
                    <li>• Нести ответственность за размещаемый контент</li>
                  </ul>

                  <h3 className="text-xl mb-3">5.3. Компания имеет право:</h3>
                  <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
                    <li>• Модерировать размещаемый контент</li>
                    <li>• Ограничивать или прекращать доступ Пользователя к Платформе</li>
                    <li>• Изменять функционал Платформы</li>
                    <li>• Взимать комиссию за использование платежных услуг</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">6. Платежи и комиссии</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Использование базового функционала Платформы является бесплатным. Компания взимает комиссию с успешных сделок 
                      в размере 5% от стоимости услуги.
                    </p>
                    <p>
                      Все платежи осуществляются через интегрированную платежную систему. Компания не хранит платежные данные Пользователей.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">7. Ответственность сторон</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Компания не является стороной сделок между Пользователями и не несет ответственности за качество товаров 
                      и услуг, предоставляемых Пользователями друг другу.
                    </p>
                    <p>
                      Пользователи самостоятельно несут ответственность за соблюдение условий заключаемых между ними договоров.
                    </p>
                    <p>
                      Компания не возмещает убытки, возникшие в результате использования Платформы, за исключением случаев, 
                      предусмотренных законодательством РК.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">8. Конфиденциальность</h2>
                  <p className="text-muted-foreground">
                    Обработка персональных данных Пользователей осуществляется в соответствии с Политикой конфиденциальности, 
                    которая является неотъемлемой частью настоящего Соглашения.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">9. Заключительные положения</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Настоящее Соглашение может быть изменено Компанией в одностороннем порядке. Уведомление об изменениях 
                      публикуется на Платформе.
                    </p>
                    <p>
                      Если какое-либо положение Соглашения будет признано недействительным, остальные положения сохраняют свою силу.
                    </p>
                    <p>
                      К настоящему Соглашению применяется законодательство Республики Казахстан. Споры разрешаются в суде 
                      по месту нахождения Компании.
                    </p>
                  </div>
                </section>

                <Separator />

                <section className="bg-muted/30 p-6 rounded-lg">
                  <h2 className="text-2xl mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                    Контактная информация
                  </h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>ТОО "EduRent"</strong></p>
                    <p>БИН: 123456789012</p>
                    <p>Адрес: г. Астана, пр. Назарбаева, 1</p>
                    <p>Email: legal@edurent.com</p>
                    <p>Телефон: +7 (717) 123-45-67</p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}