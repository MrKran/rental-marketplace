import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Star, 
  MapPin, 
  Heart,
  Search,
  Filter,
  Grid3X3,
  List,
  Users,
  Clock,
  GraduationCap,
  BookOpen,
  Calculator,
  Globe,
  Music,
  Palette,
  Code,
  ArrowUpDown,
  Eye,
  PlayCircle,
  Calendar,
  CheckCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState } from "react";

interface ServicesPageProps {
  services: any[];
  setCurrentPage: (page: string) => void;
  setSelectedService: (service: any) => void;
}

export function ServicesPage({ services, setCurrentPage, setSelectedService }: ServicesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: "all", name: "Все предметы", icon: GraduationCap, count: services.length },
    { id: "programming", name: "Программирование", icon: Code, count: 12 },
    { id: "math", name: "Математика", icon: Calculator, count: 18 },
    { id: "languages", name: "Языки", icon: Globe, count: 15 },
    { id: "music", name: "Музыка", icon: Music, count: 8 },
    { id: "art", name: "Искусство", icon: Palette, count: 6 },
    { id: "science", name: "Естественные науки", icon: BookOpen, count: 10 }
  ];

  const serviceTypes = [
    { value: "all", label: "Все типы" },
    { value: "Курс", label: "Курсы" },
    { value: "Урок", label: "Индивидуальные уроки" },
    { value: "Секция", label: "Групповые секции" },
    { value: "Мастер-класс", label: "Мастер-классы" }
  ];

  const levels = [
    "Начинающий",
    "Средний", 
    "Продвинутый",
    "Эксперт"
  ];

  const durations = [
    "До 1 часа",
    "1-2 часа",
    "2-4 часа",
    "Более 4 часов"
  ];

  const sortOptions = [
    { value: "rating", label: "По рейтингу" },
    { value: "price_low", label: "Цена: по возрастанию" },
    { value: "price_high", label: "Цена: по убыванию" },
    { value: "newest", label: "Сначала новые" },
    { value: "popular", label: "Популярные" }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all";
    const matchesType = selectedType === "all" || service.type === selectedType;
    const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesType && matchesPrice;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "newest":
      case "popular":
      default:
        return 0;
    }
  });

  const toggleFavorite = (serviceId: number) => {
    setFavorites(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setCurrentPage('service-detail');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl mb-2">Образовательные услуги</h1>
                <p className="text-muted-foreground">
                  Найдено {sortedServices.length} услуг от проверенных преподавателей
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск услуг, преподавателей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Предметы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card>
              <CardHeader>
                <CardTitle>Цена</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0].toLocaleString()} ₸</span>
                  <span>{priceRange[1].toLocaleString()} ₸</span>
                </div>
              </CardContent>
            </Card>

            {/* Level */}
            <Card>
              <CardHeader>
                <CardTitle>Уровень сложности</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {levels.map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox id={level} />
                    <label htmlFor={level} className="text-sm cursor-pointer">
                      {level}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Duration */}
            <Card>
              <CardHeader>
                <CardTitle>Длительность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {durations.map(duration => (
                  <div key={duration} className="flex items-center space-x-2">
                    <Checkbox id={duration} />
                    <label htmlFor={duration} className="text-sm cursor-pointer">
                      {duration}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Особенности</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Сертификат", "Домашние задания", "Поддержка 24/7", "Материалы включены"].map(feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox id={feature} />
                    <label htmlFor={feature} className="text-sm cursor-pointer">
                      {feature}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Services Grid/List */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg cursor-pointer h-full">
                      <div 
                        className="aspect-[4/3] relative overflow-hidden"
                        onClick={() => handleServiceClick(service)}
                      >
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnRzfGVufDF8fHx8MTc1OTY0ODk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Badge className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm border-0 shadow-lg">
                          {service.type}
                        </Badge>
                        <Button
                          size="sm"
                          className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary hover:bg-white/90"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm hover:bg-white/30 ${
                            favorites.includes(service.id) ? 'text-red-500' : 'text-white'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(service.id);
                          }}
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(service.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      
                      <CardContent className="p-6 flex-1 flex flex-col" onClick={() => handleServiceClick(service)}>
                        <div className="flex-1">
                          <h3 className="mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        
                        {/* Instructor */}
                        <div className="flex items-center space-x-3 mb-4">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-gradient-to-r from-primary to-secondary text-white">
                              {service.instructor.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm truncate">{service.instructor}</span>
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                <span>{service.rating}</span>
                              </div>
                              <span>•</span>
                              <span>24 отзыва</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{service.duration}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Users className="w-4 h-4 mr-1" />
                              <span>
                                {service.maxStudents === 1 ? 'Индивидуально' : `До ${service.maxStudents} чел.`}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg text-primary">{service.price.toLocaleString()} ₸</span>
                              <span className="text-sm text-muted-foreground ml-1">
                                /{service.type === 'Курс' ? 'курс' : service.type === 'Урок' ? 'урок' : 'занятие'}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              Начинающий
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServiceClick(service);
                          }}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Записаться
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex" onClick={() => handleServiceClick(service)}>
                        <div className="w-48 h-32 relative overflow-hidden">
                          <ImageWithFallback
                            src="https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnRzfGVufDF8fHx8MTc1OTY0ODk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2 bg-secondary/90 backdrop-blur-sm border-0 text-xs">
                            {service.type}
                          </Badge>
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg mb-2 hover:text-primary transition-colors">
                                {service.title}
                              </h3>
                              
                              <div className="flex items-center space-x-3 mb-3">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs bg-gradient-to-r from-primary to-secondary text-white">
                                    {service.instructor.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex items-center space-x-1">
                                  <span className="text-sm">{service.instructor}</span>
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                </div>
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                  <span className="text-xs">{service.rating}</span>
                                </div>
                              </div>
                              
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                {service.description}
                              </p>
                              
                              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{service.duration}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  <span>
                                    {service.maxStudents === 1 ? 'Индивидуально' : `До ${service.maxStudents} чел.`}
                                  </span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  Начинающий
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="text-right ml-6">
                              <div className="text-2xl text-primary mb-1">
                                {service.price.toLocaleString()} ₸
                              </div>
                              <div className="text-sm text-muted-foreground mb-4">
                                за {service.type.toLowerCase()}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className={`${
                                    favorites.includes(service.id) ? 'text-red-500' : ''
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(service.id);
                                  }}
                                >
                                  <Heart className={`w-4 h-4 ${favorites.includes(service.id) ? 'fill-current' : ''}`} />
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-primary to-secondary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleServiceClick(service);
                                  }}
                                >
                                  Записаться
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {sortedServices.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2">Услуги не найдены</h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}