import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  BookOpen,
  Laptop,
  Music,
  Calculator,
  X,
  TrendingUp,
  Calendar,
  Heart,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SearchPageProps {
  items: any[];
  services: any[];
  setCurrentPage: (page: string) => void;
  setSelectedItem: (item: any) => void;
  setSelectedService: (service: any) => void;
}

export function SearchPage({ 
  items, 
  services, 
  setCurrentPage, 
  setSelectedItem, 
  setSelectedService 
}: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<'all' | 'items' | 'services'>('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "electronics", label: "Электроника", icon: Laptop },
    { id: "books", label: "Книги", icon: BookOpen },
    { id: "music", label: "Музыка", icon: Music },
    { id: "math", label: "Математика", icon: Calculator },
    { id: "languages", label: "Языки", icon: BookOpen },
    { id: "programming", label: "Программирование", icon: Laptop }
  ];

  const locations = [
    { value: "all", label: "Весь Казахстан" },
    { value: "astana", label: "Астана" },
    { value: "almaty", label: "Алматы" },
    { value: "shymkent", label: "Шымкент" },
    { value: "aktobe", label: "Актобе" }
  ];

  const popularSearches = [
    "Python курс",
    "MacBook аренда", 
    "Математика репетитор",
    "Английский язык",
    "Учебники ЕГЭ",
    "Гитара",
    "Программирование",
    "Подготовка к экзаменам"
  ];

  // Search function
  const performSearch = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let combinedResults = [];
      
      if (searchType === 'all' || searchType === 'items') {
        const filteredItems = items
          .filter(item => {
            const matchesQuery = !searchQuery || 
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
            
            const matchesCategory = selectedCategories.length === 0 ||
              selectedCategories.includes(item.category);
            
            const matchesLocation = selectedLocation === 'all' ||
              item.location.toLowerCase().includes(selectedLocation);
            
            return matchesQuery && matchesPrice && matchesCategory && matchesLocation;
          })
          .map(item => ({ ...item, type: 'item' }));
        
        combinedResults.push(...filteredItems);
      }
      
      if (searchType === 'all' || searchType === 'services') {
        const filteredServices = services
          .filter(service => {
            const matchesQuery = !searchQuery || 
              service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              service.instructor.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
            
            return matchesQuery && matchesPrice;
          })
          .map(service => ({ ...service, type: 'service' }));
        
        combinedResults.push(...filteredServices);
      }
      
      // Sort results
      if (sortBy === 'price-asc') {
        combinedResults.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        combinedResults.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        combinedResults.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      }
      
      setResults(combinedResults);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    performSearch();
  }, [searchQuery, searchType, priceRange, selectedCategories, selectedLocation, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSearchType('all');
    setPriceRange([0, 100000]);
    setSelectedCategories([]);
    setSelectedLocation("all");
    setSortBy("relevance");
  };

  const handleResultClick = (result: any) => {
    if (result.type === 'item') {
      setSelectedItem(result);
      setCurrentPage('item-detail');
    } else {
      setSelectedService(result);
      setCurrentPage('service-detail');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Поиск по платформе</h1>
          <p className="text-muted-foreground">
            Найдите товары для аренды и образовательные услуги
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Что вы ищете?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={searchType} onValueChange={(value: any) => setSearchType(value)}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Тип поиска" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всё</SelectItem>
                  <SelectItem value="items">Товары</SelectItem>
                  <SelectItem value="services">Услуги</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full lg:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Фильтры
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="font-semibold mb-4">Популярные запросы:</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery(search)}
                className="text-sm"
              >
                {search}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Фильтры</span>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₸
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100000}
                      step={1000}
                      className="w-full"
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Категории</label>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center gap-2">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => toggleCategory(category.id)}
                          />
                          <label 
                            htmlFor={category.id}
                            className="text-sm flex items-center gap-2 cursor-pointer"
                          >
                            <category.icon className="w-4 h-4" />
                            {category.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Местоположение</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.value} value={location.value}>
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Results */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Результаты поиска
                  {searchQuery && <span className="text-muted-foreground"> для "{searchQuery}"</span>}
                </h2>
                <p className="text-muted-foreground">
                  Найдено {results.length} результатов
                </p>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">По релевантности</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="animate-pulse">
                      <div className="aspect-[4/3] bg-muted"></div>
                      <CardContent className="p-4">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded mb-4 w-2/3"></div>
                        <div className="h-6 bg-muted rounded w-1/3"></div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result, index) => (
                  <motion.div
                    key={`${result.type}-${result.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card 
                      className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnRzfGVufDF8fHx8MTc1OTY0ODk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt={result.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <Badge className="absolute top-3 left-3">
                          {result.type === 'item' ? 'Товар' : 'Услуга'}
                        </Badge>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                          {result.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {result.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                          {result.type === 'service' ? (
                            <>
                              <Users className="w-4 h-4" />
                              <span>{result.instructor}</span>
                            </>
                          ) : (
                            <>
                              <MapPin className="w-4 h-4" />
                              <span>{result.location}</span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{result.rating}</span>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              {result.price.toLocaleString()} ₸
                            </div>
                            {result.type === 'service' && (
                              <div className="text-xs text-muted-foreground">
                                за {result.duration}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
                <Button onClick={clearFilters}>
                  Сбросить фильтры
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}