import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, Shield, Eye, EyeOff, GraduationCap, ArrowRight, Mail, Lock, User as UserIcon, School } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useFormSecurity, useDataValidation } from "../hooks/useSecurity";
import { sanitizeHtml, validateEmail, validatePassword, logSuspiciousActivity } from "../utils/security";
import { motion } from "motion/react";

interface RegisterPageProps {
  setCurrentPage: (page: string) => void;
  setIsLoggedIn: (value: boolean) => void;
  setCurrentUser: (user: any) => void;
}

export function RegisterPage({ setCurrentPage, setIsLoggedIn, setCurrentUser }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student",
    school: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string[]>([]);

  // Системы безопасности
  const { validateSubmission, isBlocked, remainingTime } = useFormSecurity('register');
  const { validateUserInput } = useDataValidation();

  const handleChange = (field: string, value: string) => {
    const sanitizedValue = field === 'password' || field === 'confirmPassword' ? value : sanitizeHtml(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Проверка силы пароля в реальном времени
    if (field === 'password') {
      const validation = validatePassword(value);
      setPasswordStrength(validation.errors);
    }
  };

  const binomSchools = [
    "Binom 1 (BI-1)",
    "Binom 2 (BI-2)",
    "Binom 3 (BI-3)",
    "Binom 4 (BI-4)",
    "Binom 5 (BI-5)",
    "Binom 6 (BI-6)",
    "Binom 7 (BI-7)"
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      toast.error(`Форма заблокирована. Попробуйте через ${remainingTime} секунд.`);
      return;
    }
    
    setLoading(true);

    // Комплексная валидация
    const validationResult = validateUserInput(formData, {
      name: { 
        required: true, 
        minLength: 2, 
        maxLength: 50,
        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
        customMessage: 'Имя должно содержать только буквы'
      },
      email: { 
        required: true, 
        minLength: 5, 
        maxLength: 254,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        customMessage: 'Введите корректный email'
      },
      password: { 
        required: true, 
        minLength: 8, 
        maxLength: 128 
      }
    });

    if (!validationResult.isValid) {
      validationResult.errors.forEach(error => toast.error(error));
      setLoading(false);
      return;
    }

    // Проверка email
    if (!validateEmail(formData.email)) {
      toast.error('Некорректный формат email');
      logSuspiciousActivity('invalid_email_registration', { email: formData.email });
      setLoading(false);
      return;
    }

    // Проверка пароля
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      passwordValidation.errors.forEach(error => toast.error(error));
      setLoading(false);
      return;
    }

    // Проверка совпадения паролей
    if (formData.password !== formData.confirmPassword) {
      toast.error("Пароли не совпадают");
      setLoading(false);
      return;
    }

    // Проверка системы безопасности
    if (!validateSubmission(formData)) {
      setLoading(false);
      return;
    }

    // Проверка выбора школы
    if (!formData.school) {
      toast.error("Пожалуйста, выберите школу");
      setLoading(false);
      return;
    }

    // Симуляция регистрации
    setTimeout(() => {
      const user = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        type: formData.userType,
        school: formData.school
      };
      
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentPage('home');
      toast.success("Регистрация успешна! Добро пожаловать в Alash!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4 py-8">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Регистрация в Alash</CardTitle>
            <p className="text-muted-foreground">
              Присоединяйтесь к образовательной платформе
            </p>
          </CardHeader>
          <CardContent>
            {/* Индикатор безопасности */}
            <motion.div 
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-green-700">Защищенное соединение</div>
                <div className="text-xs text-green-600">Ваши данные в безопасности</div>
              </div>
            </motion.div>

          {isBlocked && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Форма временно заблокирована из-за подозрительной активности. 
                Попробуйте через {remainingTime} секунд.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Label htmlFor="name" className="text-sm">Полное имя</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
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
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Label htmlFor="email" className="text-sm">Email адрес</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
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
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Label htmlFor="password" className="text-sm">Пароль</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Минимум 8 символов"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
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
              
              {/* Индикатор силы пароля */}
              {formData.password && passwordStrength.length > 0 && (
                <div className="text-sm text-red-600">
                  <p className="mb-1">Требования к паролю:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {passwordStrength.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {formData.password && passwordStrength.length === 0 && (
                <p className="text-sm text-green-600">✓ Пароль соответствует требованиям безопасности</p>
              )}
            </motion.div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Label htmlFor="confirmPassword" className="text-sm">Подтвердите пароль</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  disabled={isBlocked}
                  className="pl-10 h-12 border-0 bg-muted/50 focus:bg-white focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              
              {/* Индикатор совпадения паролей */}
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-600">✗ Пароли не совпадают</p>
              )}
              
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-sm text-green-600">✓ Пароли совпадают</p>
              )}
            </motion.div>

            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Label className="text-sm">Школа Binom</Label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select 
                  value={formData.school} 
                  onValueChange={(value) => handleChange('school', value)}
                  disabled={isBlocked}
                >
                  <SelectTrigger className="pl-10 h-12 border-0 bg-muted/50 focus:bg-white focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Выберите вашу школу" />
                  </SelectTrigger>
                  <SelectContent>
                    {binomSchools.map((school) => (
                      <SelectItem key={school} value={school}>
                        {school}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Label className="text-sm">Тип аккаунта</Label>
              <RadioGroup 
                value={formData.userType} 
                onValueChange={(value) => handleChange('userType', value)}
                disabled={isBlocked}
                className="grid grid-cols-2 gap-4"
              >
                <div className="relative">
                  <RadioGroupItem value="student" id="student" className="peer sr-only" />
                  <Label 
                    htmlFor="student" 
                    className="flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <GraduationCap className="w-8 h-8 mb-2 text-primary" />
                    <span>Ученик</span>
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
                  <Label 
                    htmlFor="teacher" 
                    className="flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <UserIcon className="w-8 h-8 mb-2 text-primary" />
                    <span>Учитель</span>
                  </Label>
                </div>
              </RadioGroup>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 group" 
                disabled={loading || isBlocked || passwordStrength.length > 0}
              >
                {loading ? (
                  "Регистрация..."
                ) : isBlocked ? (
                  `Заблокировано (${remainingTime}с)`
                ) : (
                  <>
                    Зарегистрироваться
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Separator className="my-8" />
            
            <div className="text-center">
              <p className="text-muted-foreground">
                Уже есть аккаунт?{" "}
                <button
                  className="text-primary hover:underline transition-colors"
                  onClick={() => setCurrentPage('login')}
                >
                  Войти в систему
                </button>
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}