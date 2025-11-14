import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  Home, 
  ShoppingBag, 
  GraduationCap, 
  User, 
  Heart, 
  Bell, 
  Plus, 
  HelpCircle, 
  LogOut,
  Star,
  Search,
  MessageCircle,
  Calendar
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SidebarMenuProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  currentUser: any;
  setShowAddItemModal: (value: boolean) => void;
  setShowSupportModal: (value: boolean) => void;
}

interface MenuItemProps {
  icon: any;
  label: string;
  id: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
  delay?: number;
}

const MenuItem = ({ icon: Icon, label, isActive, onClick, badge, delay = 0 }: MenuItemProps) => (
  <motion.button
    className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 group ${
      isActive 
        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
    }`}
    onClick={onClick}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className={`p-2 rounded-lg transition-all duration-300 ${
      isActive 
        ? 'bg-white/20' 
        : 'bg-muted/30 group-hover:bg-primary/10'
    }`}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="font-medium flex-1 text-left">{label}</span>
    {badge && badge > 0 && (
      <Badge className="bg-primary text-primary-foreground rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs">
        {badge > 99 ? '99+' : badge}
      </Badge>
    )}
  </motion.button>
);

export function SidebarMenu({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  setShowAddItemModal,
  setShowSupportModal
}: SidebarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState(3);

  const mainMenuItems = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'items', label: 'Товары', icon: ShoppingBag },
    { id: 'services', label: 'Услуги', icon: GraduationCap },
  ];

  const userMenuItems = isLoggedIn ? [
    { id: 'profile', label: 'Профиль', icon: User },
    { id: 'favorites', label: 'Избранное', icon: Heart },
    { id: 'notifications', label: 'Уведомления', icon: Bell, badge: notifications },
    { id: 'messages', label: 'Сообщения', icon: MessageCircle },
    { id: 'bookings', label: 'Мои заказы', icon: Calendar },
  ] : [];

  const adminMenuItems = [];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
    setIsOpen(false);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-md shadow-lg border hover:bg-white hover:shadow-xl transition-all duration-300"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="w-5 h-5 text-primary" />
        </motion.div>
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-60 border-r"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Alash
                    </h2>
                    <p className="text-xs text-muted-foreground">Образовательная платформа</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg hover:bg-primary/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* User Profile Section */}
              {isLoggedIn && currentUser && (
                <motion.div 
                  className="p-6 border-b bg-gradient-to-br from-primary/5 to-secondary/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                        {currentUser.name?.charAt(0) || 'У'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{currentUser.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{currentUser.type}</p>
                      {currentUser.type === 'teacher' && (
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          <span className="text-xs text-muted-foreground">4.9 рейтинг</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Main Navigation */}
                <div>
                  <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-3 px-2">
                    Навигация
                  </h3>
                  <div className="space-y-1">
                    {mainMenuItems.map((item, index) => (
                      <MenuItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        id={item.id}
                        isActive={currentPage === item.id}
                        onClick={() => handleNavigation(item.id)}
                        delay={index * 0.05}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                {isLoggedIn && (
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-3 px-2">
                      Быстрые действия
                    </h3>
                    <div className="space-y-1">
                      <motion.button
                        className="w-full flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => {
                          setShowAddItemModal(true);
                          setIsOpen(false);
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="p-2 rounded-lg bg-white/20">
                          <Plus className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Добавить объявление</span>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* User Menu */}
                {isLoggedIn && userMenuItems.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-3 px-2">
                      Личный кабинет
                    </h3>
                    <div className="space-y-1">
                      {userMenuItems.map((item, index) => (
                        <MenuItem
                          key={item.id}
                          icon={item.icon}
                          label={item.label}
                          id={item.id}
                          isActive={currentPage === item.id}
                          onClick={() => handleNavigation(item.id)}
                          badge={item.badge}
                          delay={(index + 3) * 0.05}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin Menu */}
                {adminMenuItems.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-3 px-2">
                      Администрирование
                    </h3>
                    <div className="space-y-1">
                      {adminMenuItems.map((item, index) => (
                        <MenuItem
                          key={item.id}
                          icon={item.icon}
                          label={item.label}
                          id={item.id}
                          isActive={currentPage === item.id}
                          onClick={() => handleNavigation(item.id)}
                          delay={(index + 10) * 0.05}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Support & Settings */}
                <div>
                  <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-3 px-2">
                    Помощь
                  </h3>
                  <div className="space-y-1">
                    <MenuItem
                      icon={HelpCircle}
                      label="Поддержка"
                      id="support"
                      isActive={false}
                      onClick={() => {
                        setShowSupportModal(true);
                        setIsOpen(false);
                      }}
                      delay={0.6}
                    />
                    <MenuItem
                      icon={Search}
                      label="Поиск"
                      id="search"
                      isActive={false}
                      onClick={() => handleNavigation('search')}
                      delay={0.65}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t bg-muted/30">
                {isLoggedIn ? (
                  <motion.button
                    className="w-full flex items-center space-x-3 p-4 rounded-xl text-destructive hover:bg-destructive/10 transition-all duration-300"
                    onClick={handleLogout}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Выйти</span>
                  </motion.button>
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
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                      onClick={() => handleNavigation('register')}
                    >
                      Регистрация
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}