import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { 
  Menu,
  X,
  Home,
  ShoppingBag,
  GraduationCap,
  User,
  Heart,
  Bell,
  MessageCircle,
  Search,
  HelpCircle,
  Info,
  LogOut,
  Shield,
  Settings,
  BookOpen,
  Plus
} from "lucide-react";
import { motion } from "motion/react";

interface MobileNavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  currentUser: any;
  setShowAddItemModal: (value: boolean) => void;
  notifications?: number;
}

export function MobileNavigation({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  setShowAddItemModal,
  notifications = 0
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
    setIsOpen(false);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  const mainMenuItems = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'search', label: 'Поиск', icon: Search },
    { id: 'items', label: 'Товары', icon: ShoppingBag },
    { id: 'services', label: 'Услуги', icon: GraduationCap }
  ];

  const userMenuItems = isLoggedIn ? [
    { id: 'profile', label: 'Профиль', icon: User },
    { id: 'favorites', label: 'Избранное', icon: Heart },
    { id: 'notifications', label: 'Уведомления', icon: Bell, badge: notifications },
    { id: 'chat', label: 'Сообщения', icon: MessageCircle }
  ] : [];

  const helpMenuItems = [
    { id: 'help', label: 'Помощь', icon: HelpCircle },
    { id: 'about', label: 'О нас', icon: Info },
    { id: 'security', label: 'Безопасность', icon: Shield }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 bg-gradient-to-r from-primary to-secondary text-white">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                EduRent
              </SheetTitle>
            </div>
            
            {isLoggedIn && currentUser && (
              <div className="text-left mt-4">
                <p className="text-white/90 text-sm">Добро пожаловать,</p>
                <p className="text-white font-semibold">{currentUser.name}</p>
                <Badge variant="secondary" className="mt-2 bg-white/20 text-white border-0">
                  {currentUser.type === 'student' ? 'Студент' : 'Преподаватель'}
                </Badge>
              </div>
            )}
          </SheetHeader>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto py-6">
            {/* Main Navigation */}
            <div className="px-6 mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">НАВИГАЦИЯ</h3>
              <div className="space-y-1">
                {mainMenuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.id)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Add Item Button */}
            {isLoggedIn && (
              <div className="px-6 mb-6">
                <Button
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                  onClick={() => {
                    setShowAddItemModal(true);
                    setIsOpen(false);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить
                </Button>
              </div>
            )}

            <Separator className="mx-6 mb-6" />

            {/* User Menu */}
            {isLoggedIn && (
              <div className="px-6 mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">МОЙ АККАУНТ</h3>
                <div className="space-y-1">
                  {userMenuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleNavigation(item.id)}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.label}
                      {item.badge && item.badge > 0 && (
                        <Badge variant="destructive" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Help & Info */}
            <div className="px-6 mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">ИНФОРМАЦИЯ</h3>
              <div className="space-y-1">
                {helpMenuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.id)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="mx-6 mb-6" />

            {/* Auth Actions */}
            <div className="px-6">
              {isLoggedIn ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Выйти
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleNavigation('login')}
                  >
                    Войти
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                    onClick={() => handleNavigation('register')}
                  >
                    Регистрация
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-muted/30 border-t">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                © 2024 EduRent
              </p>
              <p className="text-xs text-muted-foreground">
                Версия 1.0.0
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}