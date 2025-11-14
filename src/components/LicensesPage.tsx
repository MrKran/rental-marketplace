import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ArrowLeft, Code, Package, Globe, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface LicensesPageProps {
  setCurrentPage: (page: string) => void;
}

export function LicensesPage({ setCurrentPage }: LicensesPageProps) {
  const openSourceLibraries = [
    {
      name: "React",
      version: "18.x",
      license: "MIT",
      description: "JavaScript библиотека для создания пользовательских интерфейсов",
      url: "https://reactjs.org/"
    },
    {
      name: "Tailwind CSS",
      version: "4.x",
      license: "MIT",
      description: "CSS фреймворк для быстрой разработки пользовательских интерфейсов",
      url: "https://tailwindcss.com/"
    },
    {
      name: "Lucide React",
      version: "Latest",
      license: "ISC",
      description: "Библиотека красивых и настраиваемых SVG иконок",
      url: "https://lucide.dev/"
    },
    {
      name: "Motion (Framer Motion)",
      version: "Latest",
      license: "MIT",
      description: "Библиотека анимаций для React приложений",
      url: "https://www.framer.com/motion/"
    },
    {
      name: "Radix UI",
      version: "Latest",
      license: "MIT",
      description: "Низкоуровневые UI компоненты для доступности и кастомизации",
      url: "https://www.radix-ui.com/"
    },
    {
      name: "Sonner",
      version: "2.x",
      license: "MIT",
      description: "Красивые уведомления для React приложений",
      url: "https://sonner.emilkowal.ski/"
    }
  ];

  const images = [
    {
      source: "Unsplash",
      description: "Высококачественные бесплатные фотографии",
      license: "Unsplash License",
      url: "https://unsplash.com/",
      note: "Изображения используются в соответствии с лицензией Unsplash"
    }
  ];

  const fonts = [
    {
      name: "Inter",
      license: "SIL Open Font License",
      description: "Современный шрифт для цифровых интерфейсов",
      url: "https://fonts.google.com/specimen/Inter"
    }
  ];

  const services = [
    {
      name: "Figma",
      description: "Дизайн и прототипирование пользовательского интерфейса",
      url: "https://www.figma.com/"
    },
    {
      name: "TypeScript",
      description: "Типизированный JavaScript для разработки",
      url: "https://www.typescriptlang.org/"
    }
  ];

  const mitLicense = `MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

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
            <h1 className="text-4xl lg:text-5xl mb-4">Лицензии и авторские права</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Информация об используемых библиотеках, ресурсах и лицензиях
            </p>
          </motion.div>
        </div>
      </div>

      {/* Open Source Libraries */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4 flex items-center justify-center gap-2">
              <Code className="w-8 h-8 text-primary" />
              Open Source библиотеки
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Мы благодарны сообществу разработчиков за их вклад в open source
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openSourceLibraries.map((library, index) => (
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
                      <span>{library.name}</span>
                      <span className="text-sm bg-muted px-2 py-1 rounded">{library.license}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-3">{library.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>v{library.version}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1"
                        asChild
                      >
                        <a href={library.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Images and Assets */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4 flex items-center justify-center gap-2">
              <Globe className="w-8 h-8 text-primary" />
              Изображения и ресурсы
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Источники изображений и медиа-контента
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-6">
              <h3 className="text-xl mb-4">Фотографии</h3>
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium">{image.source}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-1"
                          asChild
                        >
                          <a href={image.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{image.description}</p>
                      <p className="text-xs text-muted-foreground mb-2">Лицензия: {image.license}</p>
                      <p className="text-xs text-muted-foreground italic">{image.note}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Fonts */}
            <div className="space-y-6">
              <h3 className="text-xl mb-4">Шрифты</h3>
              {fonts.map((font, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium">{font.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-1"
                          asChild
                        >
                          <a href={font.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{font.description}</p>
                      <p className="text-xs text-muted-foreground">Лицензия: {font.license}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Development Tools */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4 flex items-center justify-center gap-2">
              <Package className="w-8 h-8 text-primary" />
              Инструменты разработки
            </h2>
            <p className="text-muted-foreground text-lg">
              Технологии и сервисы, используемые при создании платформы
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium">{service.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1"
                        asChild
                      >
                        <a href={service.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MIT License Text */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl mb-4">MIT License</h2>
            <p className="text-muted-foreground text-lg">
              Полный текст лицензии MIT, используемой большинством библиотек
            </p>
          </motion.div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-muted/30 p-4 rounded-lg overflow-auto">
                {mitLicense}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl mb-4">Благодарности</h3>
                <p className="text-muted-foreground mb-4">
                  Мы выражаем искреннюю благодарность всем разработчикам и создателям open source проектов, 
                  которые делают возможным создание современных веб-приложений.
                </p>
                <Separator className="my-6" />
                <p className="text-sm text-muted-foreground">
                  Если вы заметили нарушение авторских прав или у вас есть вопросы по лицензированию, 
                  пожалуйста, свяжитесь с нами через{" "}
                  <Button
                    variant="link"
                    className="h-auto p-0 text-primary"
                    onClick={() => setCurrentPage('contact')}
                  >
                    страницу контактов
                  </Button>
                  .
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}