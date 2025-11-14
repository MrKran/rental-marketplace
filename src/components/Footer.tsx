import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Youtube
} from "lucide-react";
import { motion } from "motion/react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export function Footer({ setCurrentPage }: FooterProps) {

  const footerLinks = {
    platform: [
      { label: "О платформе", action: () => setCurrentPage('about') },
      { label: "Как это работает", action: () => setCurrentPage('how-it-works') },
      { label: "Правила", action: () => setCurrentPage('rules') }
    ],
    services: [
      { label: "Аренда товаров", action: () => setCurrentPage('items') },
      { label: "Образовательные услуги", action: () => setCurrentPage('services') },
      { label: "Для преподавателей", action: () => setCurrentPage('teachers') },
      { label: "Для студентов", action: () => setCurrentPage('students') }
    ],
    support: [
      { label: "Центр помощи", action: () => setCurrentPage('help') },
      { label: "Часто задаваемые вопросы", action: () => setCurrentPage('faq') },
      { label: "Связаться с нами", action: () => setCurrentPage('contact') },
      { label: "Сообщить о проблеме", action: () => setCurrentPage('report') }
    ],
    legal: [
      { label: "Пользовательское соглашение", action: () => setCurrentPage('terms') },
      { label: "Политика конфиденциальности", action: () => setCurrentPage('privacy') },
      { label: "Лицензии", action: () => setCurrentPage('licenses') }
    ]
  };

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-t">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Alash</span>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Образовательная платформа для аренды товаров и предоставления образовательных услуг. 
                Объединяем студентов и преподавателей для обмена знаниями и ресурсами.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Используйте чат для связи</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Астана, Казахстан</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([section, links], sectionIndex) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold mb-4 capitalize">
                  {section === 'platform' && 'Платформа'}
                  {section === 'services' && 'Услуги'}
                  {section === 'support' && 'Поддержка'}
                  {section === 'legal' && 'Правовая информация'}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-normal text-muted-foreground hover:text-primary text-left justify-start"
                        onClick={link.action}
                      >
                        {link.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-sm text-muted-foreground">
            © Alash. Все права защищены.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social, index) => (
              <Button
                key={social.label}
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0"
                asChild
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}