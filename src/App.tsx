import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ProfilePage } from "./components/ProfilePage";
import { PaymentPage } from "./components/PaymentPage";
import { AddItemModal } from "./components/AddItemModal";
import { ItemsPage } from "./components/ItemsPage";
import { ItemDetailPage } from "./components/ItemDetailPage";
import { ServicesPage } from "./components/ServicesPage";
import { ServiceDetailPage } from "./components/ServiceDetailPage";
import { FavoritesPage } from "./components/FavoritesPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { MessagesPage } from "./components/MessagesPage";
import { ChatPage } from "./components/ChatPage";
import { AboutPage } from "./components/AboutPage";
import { SearchPage } from "./components/SearchPage";
import { HelpPage } from "./components/HelpPage";
import { ContactPage } from "./components/ContactPage";
import { HowItWorksPage } from "./components/HowItWorksPage";
import { RulesPage } from "./components/RulesPage";
import { TeachersPage } from "./components/TeachersPage";
import { StudentsPage } from "./components/StudentsPage";
import { TermsPage } from "./components/TermsPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { ReportPage } from "./components/ReportPage";
import { LicensesPage } from "./components/LicensesPage";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

const isDevelopment = true;


const initialItems = [
  {
    id: 1,
    title: "MacBook Pro 14\" M1",
    description: "Мощный ноутбук для учебы и работы. Идеально подходит для программирования, дизайна и видеомонтажа.",
    price: 5000,
    category: "Электроника",
    location: "Binom 1 (BI-1)",
    rating: 4.9,
    reviews: 45,
    image: null,
    owner: {
      id: 2,
      name: "Айжан Нурланова",
      type: "student"
    }
  },
  {
    id: 2,
    title: "Учебник по математике",
    description: "Математика для 10-11 классов. В отличном состоянии, все страницы целые.",
    price: 500,
    category: "Книги и учебники",
    location: "Binom 2 (BI-2)",
    rating: 4.7,
    reviews: 23,
    image: null,
    owner: {
      id: 3,
      name: "Ержан Касымов",
      type: "student"
    }
  },
  {
    id: 3,
    title: "Графический планшет Wacom",
    description: "Профессиональный планшет для цифрового рисования и дизайна.",
    price: 3000,
    category: "Электроника",
    location: "Binom 3 (BI-3)",
    rating: 4.8,
    reviews: 18,
    image: null,
    owner: {
      id: 4,
      name: "Дина Абдуллаева",
      type: "student"
    }
  },
  {
    id: 4,
    title: "Научный калькулятор Casio",
    description: "Инженерный калькулятор с множеством функций для математики и физики.",
    price: 800,
    category: "Канцелярия",
    location: "Binom 1 (BI-1)",
    rating: 5.0,
    reviews: 32,
    image: null,
    owner: {
      id: 5,
      name: "Алмаз Тулегенов",
      type: "student"
    }
  },
  {
    id: 5,
    title: "Комплект учебников по физике",
    description: "Полный комплект учебников по физике для подготовки к ЕНТ.",
    price: 1200,
    category: "Книги и учебники",
    location: "Binom 4 (BI-4)",
    rating: 4.6,
    reviews: 15,
    image: null,
    owner: {
      id: 6,
      name: "Сания Жакупова",
      type: "student"
    }
  },
  {
    id: 6,
    title: "iPad Pro с Apple Pencil",
    description: "Идеально для конспектирования и рисования. Включен Apple Pencil.",
    price: 4500,
    category: "Электроника",
    location: "Binom 5 (BI-5)",
    rating: 4.9,
    reviews: 28,
    image: null,
    owner: {
      id: 7,
      name: "Асель Омарова",
      type: "student"
    }
  }
];


const initialServices = [
  {
    id: 1,
    title: "Подготовка к ЕНТ по математике",
    description: "Интенсивный курс подготовки к ЕНТ. Разбор всех типов задач, методы решения, пробные тесты.",
    price: 8000,
    serviceType: "Репетиторство",
    duration: "90 минут",
    maxStudents: 5,
    location: "Онлайн / Binom 1",
    rating: 5.0,
    reviews: 67,
    image: null,
    teacher: {
      id: 8,
      name: "Асхат Бекмуханов",
      type: "teacher",
      experience: "8 лет опыта"
    }
  },
  {
    id: 2,
    title: "Английский язык для начинающих",
    description: "Курс английского с нуля. Грамматика, разговорная практика, аудирование.",
    price: 6000,
    serviceType: "Курсы",
    duration: "60 минут",
    maxStudents: 8,
    location: "Онлайн",
    rating: 4.9,
    reviews: 53,
    image: null,
    teacher: {
      id: 9,
      name: "Мадина Султанова",
      type: "teacher",
      experience: "5 лет опыта"
    }
  },
  {
    id: 3,
    title: "Программирование на Python",
    description: "Изучение Python с нуля до продвинутого уровня. Практические проекты.",
    price: 10000,
    serviceType: "Курсы",
    duration: "120 минут",
    maxStudents: 6,
    location: "Binom 2 (BI-2)",
    rating: 5.0,
    reviews: 89,
    image: null,
    teacher: {
      id: 10,
      name: "Данияр Садыков",
      type: "teacher",
      experience: "10 лет опыта"
    }
  },
  {
    id: 4,
    title: "Шахматы для детей",
    description: "Обучение игре в шахматы от азов до турнирного уровня.",
    price: 4000,
    serviceType: "Секции",
    duration: "90 минут",
    maxStudents: 10,
    location: "Binom 3 (BI-3)",
    rating: 4.8,
    reviews: 42,
    image: null,
    teacher: {
      id: 11,
      name: "Куаныш Абдуллин",
      type: "teacher",
      experience: "6 лет опыта"
    }
  },
  {
    id: 5,
    title: "Физика: подготовка к олимпиадам",
    description: "Углубленное изучение физики для участия в олимпиадах.",
    price: 12000,
    serviceType: "Репетиторство",
    duration: "120 минут",
    maxStudents: 3,
    location: "Binom 1 (BI-1)",
    rating: 5.0,
    reviews: 34,
    image: null,
    teacher: {
      id: 12,
      name: "Нурлан Исмаилов",
      type: "teacher",
      experience: "12 лет опыта"
    }
  },
  {
    id: 6,
    title: "Дизайн в Figma",
    description: "Создание UI/UX дизайна в Figma. От основ до профессиональных проектов.",
    price: 9000,
    serviceType: "Курсы",
    duration: "90 минут",
    maxStudents: 8,
    location: "Онлайн",
    rating: 4.9,
    reviews: 56,
    image: null,
    teacher: {
      id: 13,
      name: "Айгерим Токтасынова",
      type: "teacher",
      experience: "4 года опыта"
    }
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [items, setItems] = useState(initialItems);
  const [services, setServices] = useState(initialServices);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  
  useEffect(() => {
    const demoUser = {
      id: 1,
      name: "Демо пользователь",
      email: "demo@example.com",
      type: "student",
      bio: "Студент, изучающий веб-разработку"
    };
    
    const adminUser = {
      id: 999,
      name: "Админ Alash",
      email: "admin@alash.kz",
      type: "admin",
      bio: "Администратор системы безопасности"
    };
    
   
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            items={items}
            services={services}
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
            setSelectedService={setSelectedService}
            isLoggedIn={isLoggedIn}
            setShowAddItemModal={setShowAddItemModal}
          />
        );
      case 'login':
        return (
          <LoginPage 
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        );
      case 'register':
        return (
          <RegisterPage 
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        );
      case 'profile':
        return isLoggedIn ? (
          <ProfilePage 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            items={items}
            services={services}
            setItems={setItems}
            setServices={setServices}
          />
        ) : (
          <LoginPage 
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        );
      case 'items':
        return (
          <ItemsPage 
            items={items}
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
          />
        );
      case 'item-detail':
        return selectedItem ? (
          <ItemDetailPage 
            item={selectedItem}
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
          />
        ) : (
          <HomePage 
            items={items}
            services={services}
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
            setSelectedService={setSelectedService}
            isLoggedIn={isLoggedIn}
            setShowAddItemModal={setShowAddItemModal}
          />
        );
      case 'services':
        return (
          <ServicesPage 
            services={services}
            setCurrentPage={setCurrentPage}
            setSelectedService={setSelectedService}
          />
        );
      case 'service-detail':
        return selectedService ? (
          <ServiceDetailPage 
            service={selectedService}
            setCurrentPage={setCurrentPage}
            setSelectedService={setSelectedService}
          />
        ) : (
          <HomePage 
            items={items}
            services={services}
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
            setSelectedService={setSelectedService}
            isLoggedIn={isLoggedIn}
            setShowAddItemModal={setShowAddItemModal}
          />
        );
      case 'payment':
        return (
          <PaymentPage 
            setCurrentPage={setCurrentPage}
            selectedItem={selectedItem}
            selectedService={selectedService}
          />
        );

      case 'favorites':
        return isLoggedIn ? (
          <FavoritesPage currentUser={currentUser} />
        ) : (
          <LoginPage 
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        );
      case 'notifications':
        return isLoggedIn ? (
          <NotificationsPage currentUser={currentUser} />
        ) : (
          <LoginPage 
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        );
      case 'messages':
        return isLoggedIn ? (
          <MessagesPage currentUser={currentUser} />
        ) : (
          <LoginPage 
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        );
      case 'chat':
        return isLoggedIn ? (
          <ChatPage 
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <LoginPage 
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        );
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'search':
        return (
          <SearchPage 
            items={items}
            services={services}
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
            setSelectedService={setSelectedService}
          />
        );
      case 'help':
      case 'faq':
        return <HelpPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />;
      case 'how-it-works':
        return <HowItWorksPage setCurrentPage={setCurrentPage} />;
      case 'rules':
        return <RulesPage setCurrentPage={setCurrentPage} />;
      case 'teachers':
        return <TeachersPage setCurrentPage={setCurrentPage} />;
      case 'students':
        return <StudentsPage setCurrentPage={setCurrentPage} />;
      case 'terms':
        return <TermsPage setCurrentPage={setCurrentPage} />;
      case 'privacy':
        return <PrivacyPage setCurrentPage={setCurrentPage} />;
      case 'report':
        return <ReportPage setCurrentPage={setCurrentPage} />;
      case 'licenses':
        return <LicensesPage setCurrentPage={setCurrentPage} />;
      default:
        return (
          <HomePage 
            items={items}
            services={services}
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
            setSelectedService={setSelectedService}
            isLoggedIn={isLoggedIn}
            setShowAddItemModal={setShowAddItemModal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setShowAddItemModal={setShowAddItemModal}
      />
      
      {renderCurrentPage()}

      <Footer setCurrentPage={setCurrentPage} />

      {isLoggedIn && (
        <AddItemModal
          isOpen={showAddItemModal}
          onClose={() => setShowAddItemModal(false)}
          currentUser={currentUser}
          items={items}
          setItems={setItems}
          services={services}
          setServices={setServices}
        />
      )}

      <Toaster />
    </div>
  );
}