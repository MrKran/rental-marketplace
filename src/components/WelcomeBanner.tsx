import { Button } from "./ui/button";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface WelcomeBannerProps {
  isLoggedIn: boolean;
  setCurrentPage: (page: string) => void;
}

export function WelcomeBanner({ isLoggedIn, setCurrentPage }: WelcomeBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, показывали ли баннер ранее
    const bannerDismissed = localStorage.getItem('welcomeBannerDismissed');
    if (!bannerDismissed && !isLoggedIn) {
      setIsVisible(true);
    }
  }, [isLoggedIn]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('welcomeBannerDismissed', 'true');
  };

  if (isLoggedIn) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-primary via-purple-500 to-secondary text-white overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Добро пожаловать в Alash! 🎓
                  </h3>
                  <p className="text-sm text-white/90">
                    Платформа для аренды товаров и образовательных услуг в школах Binom. Присоединяйтесь сейчас!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  onClick={() => setCurrentPage('register')}
                  className="bg-white text-primary hover:bg-white/90 shadow-lg"
                >
                  <span className="hidden sm:inline">Начать</span>
                  <ArrowRight className="w-4 h-4 sm:ml-2" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDismiss}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
