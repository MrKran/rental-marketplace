import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  User, 
  LogOut, 
  Plus, 
  Shield, 
  Search, 
  Bell, 
  ShoppingBag,
  GraduationCap,
  Menu,
  Heart,
  Star,
  HelpCircle,
  X,
  MessageCircle
} from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "motion/react";
import { SupportModal } from "./SupportModal";
import { SidebarMenu } from "./SidebarMenu";
import { MobileNavigation } from "./MobileNavigation";
import { AlashLogo } from "./AlashLogo";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  currentUser: any;
  setShowAddItemModal: (value: boolean) => void;
}

export function Header({ 
  currentPage, 
  setCurrentPage, 
  isLoggedIn, 
  setIsLoggedIn, 
  currentUser,
  setShowAddItemModal 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3); // Mock notifications count
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };



  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query
      setCurrentPage('search');
      // In a real app, you would pass the search query as a parameter
      // For now, the SearchPage component will handle its own state
    }
  };

  const navItems = [
    { 
      id: 'home', 
      label: 'Главная', 
      icon: null 
    },
    { 
      id: 'items', 
      label: 'Товары', 
      icon: ShoppingBag 
    },
    { 
      id: 'services', 
      label: 'Услуги', 
      icon: GraduationCap 
    }
  ];

  return (
    <>
      {/* Sidebar Menu */}
      <SidebarMenu
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setShowAddItemModal={setShowAddItemModal}
        setShowSupportModal={setShowSupportModal}
      />

      <header className="bg-white/95 backdrop-blur-md border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Navigation */}
            <MobileNavigation
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              currentUser={currentUser}
              setShowAddItemModal={setShowAddItemModal}
              notifications={notifications}
            />

            {/* Logo */}
            <div 
              className="cursor-pointer ml-0 md:ml-16"
              onClick={() => setCurrentPage('home')}
            >
              <AlashLogo size="sm" />
            </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Поиск товаров и услуг..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-0 bg-muted/50 focus:bg-white focus:ring-2 focus:ring-primary/20 shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary to-secondary rounded-xl"
              >
                Найти
              </Button>
            </form>
          </div>

          {/* Online Status - Desktop */}
          <div className="hidden xl:flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Платформа онлайн</span>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Search Icon - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden rounded-xl"
              onClick={() => {
                // Implement mobile search modal
                console.log("Open mobile search");
              }}
            >
              <Search className="w-4 h-4" />
            </Button>

            {isLoggedIn ? (
              <>
                {/* Messages */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  onClick={() => setCurrentPage('chat')}
                  title="Сообщения"
                >
                  <MessageCircle className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center bg-secondary text-white text-xs">
                    2
                  </Badge>
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  onClick={() => setCurrentPage('notifications')}
                  title="Уведомления"
                >
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                {/* Add Item */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddItemModal(true)}
                  className="hidden sm:flex bg-gradient-to-r from-primary to-secondary text-white border-0 hover:shadow-lg transition-all duration-200 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить
                </Button>
                
                {/* User Profile */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage('profile')}
                  className={`flex items-center space-x-2 rounded-xl ${
                    currentPage === 'profile' ? 'bg-primary/10 text-primary' : ''
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium max-w-[100px] truncate">{currentUser?.name}</div>
                    {currentUser?.type === 'teacher' && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        <span>4.9</span>
                      </div>
                    )}
                  </div>
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={() => setCurrentPage('login')}
                  className="bg-gradient-to-r from-primary to-secondary text-white border-0 hover:shadow-lg transition-all duration-200 rounded-xl"
                >
                  Войти / Регистрация
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Support Modal */}
      <SupportModal 
        isOpen={showSupportModal} 
        onClose={() => setShowSupportModal(false)} 
      />
    </header>
    </>
  );
}