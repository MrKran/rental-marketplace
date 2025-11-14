import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  AlertCircle, 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  GraduationCap,
  ArrowRight,
  Users,
  Star,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useFormSecurity, useDataValidation } from "../hooks/useSecurity";
import { sanitizeHtml, validateEmail, logSuspiciousActivity } from "../utils/security";
import { motion } from "motion/react";

interface LoginPageProps {
  setCurrentPage: (page: string) => void;
  setIsLoggedIn: (value: boolean) => void;
  setCurrentUser: (user: any) => void;
}

export function LoginPage({ setCurrentPage, setIsLoggedIn, setCurrentUser }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Системы безопасности
  const { validateSubmission, isBlocked, remainingTime } = useFormSecurity('login');
  const { validateUserInput } = useDataValidation();

  const features = [
    { icon: Users, text: "Более 12,500 активных пользователей" },
    { icon: Shield, text: "100% безопасные платежи" },
    { icon: Star, text: "Средний рейтинг 4.9/5" }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      toast.error(`Форма заблокирована. Попробуйте через ${remainingTime} секунд.`);
      return;
    }
    
    setLoading(true);

    // Валидация входных данных
    const validationResult = validateUserInput({
      email: email,
      password: password
    }, {
      email: { 
        required: true, 
        minLength: 5, 
        maxLength: 254,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        customMessage: 'Введите корректный email'
      },
      password: { 
        required: true, 
        minLength: 6, 
        maxLength: 128 
      }
    });

    if (!validationResult.isValid) {
      validationResult.errors.forEach(error => toast.error(error));
      setLoading(false);
      return;
    }

    // Дополнительная валидация email
    if (!validateEmail(email)) {
      toast.error('Некорректный формат email');
      logSuspiciousActivity('invalid_email_format', { email: sanitizeHtml(email) });
      setLoading(false);
      return;
    }

    // Проверка системы безопасности
    const formData = { email: sanitizeHtml(email), password };
    if (!validateSubmission(formData)) {
      setLoading(false);
      return;
    }

    // Симуляция авторизации
    setTimeout(() => {
      if (email && password) {
        const user = {
          id: 1,
          name: sanitizeHtml(email.split('@')[0]),
          email: sanitizeHtml(email),
          type: email.includes('teacher') ? 'teacher' : 'student'
        };
        
        setCurrentUser(user);
        setIsLoggedIn(true);
        setCurrentPage('home');
        toast.success("Успешная авторизация!");
      } else {
        toast.error("Заполните все поля");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h1 className="text-3xl">Alash</h1>
            </div>
            
            <h2 className="text-4xl mb-6 leading-tight">
              Добро пожаловать в
              <br />
              <span className="text-white/90">будущее образования</span>
            </h2>
            
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Присоединяйтесь к сообществу студентов и преподавателей 
              для аренды товаров и образовательных услуг.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.text}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-white/90">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Вход в аккаунт</CardTitle>
              <p className="text-muted-foreground">
                Войдите, чтобы продолжить пользоваться платформой
              </p>
            </CardHeader>
            
            <CardContent>
              {/* Security Indicator */}
              <motion.div 
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-green-700">Защищенное соединение</div>
                  <div className="text-xs text-green-600">Ваши данные в безопасности</div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
              </motion.div>

              {isBlocked && (
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Форма временно заблокирована из-за подозрительной активности. 
                    Попробуйте через {remainingTime} секунд.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Label htmlFor="email" className="text-sm">Email адрес</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(sanitizeHtml(e.target.value))}
                      disabled={isBlocked}
                      className="pl-10 h-12 border-0 bg-muted/50 focus:bg-white focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Label htmlFor="password" className="text-sm">Пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Введите пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isBlocked}
                      className="pl-10 pr-10 h-12 border-0 bg-muted/50 focus:bg-white focus:ring-2 focus:ring-primary/20"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 group" 
                    disabled={loading || isBlocked}
                  >
                    {loading ? (
                      "Вход..."
                    ) : isBlocked ? (
                      `Заблокировано (${remainingTime}с)`
                    ) : (
                      <>
                        Войти в аккаунт
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Separator className="my-8" />

                <div className="text-center space-y-6">
                  <p className="text-muted-foreground">
                    Нет аккаунта?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline transition-colors"
                      onClick={() => setCurrentPage('register')}
                    >
                      Создать аккаунт
                    </button>
                  </p>

                  <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                    <div className="text-sm">
                      <div className="text-primary mb-2">Демо аккаунты для тестирования:</div>
                      <div className="space-y-1 text-muted-foreground text-xs">
                        <div className="flex justify-between">
                          <span>Преподаватель:</span>
                          <span>teacher@example.com</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Студент:</span>
                          <span>student@example.com</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Пароль:</span>
                          <span>любой</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}