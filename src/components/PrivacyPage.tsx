import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { ArrowLeft, Shield, Eye, Lock, Database, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

interface PrivacyPageProps {
  setCurrentPage: (page: string) => void;
}

export function PrivacyPage({ setCurrentPage }: PrivacyPageProps) {
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
            <h1 className="text-4xl lg:text-5xl mb-4">Политика конфиденциальности</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Как мы собираем, используем и защищаем ваши данные
            </p>
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
                  <h2 className="text-2xl mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-primary" />
                    Общие положения
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    EduRent серьезно относится к защите вашей конфиденциальности. Настоящая Политика конфиденциальности 
                    объясняет, какую информацию мы собираем, как мы ее используем и какие меры принимаем для ее защиты.
                  </p>
                  <p className="text-muted-foreground">
                    Используя нашу платформу, вы соглашаетесь с условиями данной политики.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4 flex items-center gap-2">
                    <Database className="w-6 h-6 text-primary" />
                    Какую информацию мы собираем
                  </h2>
                  
                  <h3 className="text-xl mb-3">Информация, которую вы предоставляете</h3>
                  <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
                    <li>• Имя, email и контактная информация при регистрации</li>
                    <li>• Описания товаров и услуг, которые вы размещаете</li>
                    <li>• Сообщения и отзывы, отправляемые через платформу</li>
                    <li>• Фотографии товаров и профиля</li>
                  </ul>

                  <h3 className="text-xl mb-3">Информация, собираемая автоматически</h3>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li>• IP-адрес и данные об устройстве</li>
                    <li>• Информация о браузере и операционной системе</li>
                    <li>• Страницы, которые вы посещаете на сайте</li>
                    <li>• Время и дата использования сервиса</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4 flex items-center gap-2">
                    <Eye className="w-6 h-6 text-primary" />
                    Как мы используем информацию
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Мы используем собранную информацию для следующих целей:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li>• Предоставление и улучшение наших услуг</li>
                    <li>• Обеспечение безопасности платформы</li>
                    <li>• Связь с пользователями по вопросам сервиса</li>
                    <li>• Обработка платежей и транзакций</li>
                    <li>• Анализ использования платформы для улучшения</li>
                    <li>• Соблюдение законодательных требований</li>
                  </ul>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4 flex items-center gap-2">
                    <Lock className="w-6 h-6 text-primary" />
                    Как мы защищаем информацию
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Мы применяем современные технические и организационные меры для защиты ваших данных:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li>• Шифрование данных при передаче и хранении</li>
                      <li>• Ограниченный доступ к персональным данным</li>
                      <li>• Регулярное обновление систем безопасности</li>
                      <li>• Мониторинг на предмет подозрительной активности</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">Обмен информацией с третьими лицами</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением следующих случаев:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li>• При вашем явном согласии</li>
                      <li>• Для обработки платежей (банки и платежные системы)</li>
                      <li>• При требовании законодательства</li>
                      <li>• Для защиты прав и безопасности пользователей</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">Файлы cookie</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Мы используем файлы cookie для улучшения работы сайта и персонализации вашего опыта. 
                      Вы можете отключить cookie в настройках браузера, но это может ограничить функциональность сайта.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">Ваши права</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>В соответствии с законодательством РК, вы имеете следующие права:</p>
                    <ul className="space-y-2 ml-6">
                      <li>• <strong>Исправление:</strong> Попросить исправить неточные или устаревшие данные в вашем профиле</li>
                      <li>• <strong>Ограничение обработки:</strong> Изменить настройки приватности в личном кабинете</li>
                      <li>• <strong>Отзыв согласия:</strong> Отключить маркетинговые уведомления в настройках</li>
                      <li>• <strong>Удаление аккаунта:</strong> Удалить свой аккаунт через настройки профиля</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">Хранение данных</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Мы храним ваши персональные данные только в течение необходимого времени для достижения целей, 
                      указанных в данной политике, или в соответствии с требованиями законодательства.
                    </p>
                    <p>
                      После удаления аккаунта большинство персональных данных удаляется в течение 30 дней. 
                      Некоторые данные могут храниться дольше в целях соблюдения законодательных требований.
                    </p>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl mb-4">Изменения в политике</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Мы можем обновлять данную Политику конфиденциальности. О существенных изменениях мы уведомим 
                      пользователей через платформу или по электронной почте.
                    </p>
                    <p>
                      Рекомендуем периодически просматривать данную страницу для ознакомления с обновлениями.
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
                    <p>
                      Если у вас есть вопросы о нашей Политике конфиденциальности или вы хотите воспользоваться 
                      своими правами, свяжитесь с нами:
                    </p>
                    <p><strong>Email:</strong> privacy@edurent.com</p>
                    <p><strong>Телефон:</strong> +7 (717) 123-45-67</p>
                    <p><strong>Адрес:</strong> г. Астана, пр. Назарбаева, 1</p>
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