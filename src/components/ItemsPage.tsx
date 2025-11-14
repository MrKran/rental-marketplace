import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { 
  Star, 
  MapPin, 
  Heart,
  Search,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  Laptop,
  BookOpen,
  Music,
  Car,
  Camera,
  Gamepad2,
  ArrowUpDown,
  Eye
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState } from "react";

interface ItemsPageProps {
  items: any[];
  setCurrentPage: (page: string) => void;
  setSelectedItem: (item: any) => void;
}

export function ItemsPage({ items, setCurrentPage, setSelectedItem }: ItemsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: "all", name: "Все категории", icon: Grid3X3, count: items.length },
    { id: "electronics", name: "Электроника", icon: Laptop, count: 48 },
    { id: "books", name: "Учебные материалы", icon: BookOpen, count: 32 },
    { id: "music", name: "Музыкальные инструменты", icon: Music, count: 15 },
    { id: "transport", name: "Транспорт", icon: Car, count: 8 },
    { id: "photo", name: "Фото/Видео", icon: Camera, count: 12 },
    { id: "games", name: "Игры и развлечения", icon: Gamepad2, count: 6 }
  ];

  const locations = [
    "Все районы",
    "Есиль",
    "Алматы", 
    "Сарыарка",
    "Байконыр"
  ];

  const sortOptions = [
    { value: "rating", label: "По рейтингу" },
    { value: "price_low", label: "Цена: по возрастанию" },
    { value: "price_high", label: "Цена: по убыванию" },
    { value: "newest", label: "Сначала новые" },
    { value: "popular", label: "Популярные" }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
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

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setCurrentPage('item-detail');
  };

  const itemImages = [
    "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwbGFwdG9wJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1OTY0ODk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rcyUyMHN0dWR5JTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc1OTY0ODk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1708165802530-ccf9ca6a8269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwaW5zdHJ1bWVudHMlMjBndWl0YXJ8ZW58MXx8fHwxNzU5NjAzOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl mb-2">Товары для аренды</h1>
                <p className="text-muted-foreground">
                  Найдено {sortedItems.length} товаров
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
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center space-x-2">
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
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
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
                  Категории
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
                <CardTitle>Цена за день</CardTitle>
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

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Район</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {locations.map(location => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox id={location} />
                    <label htmlFor={location} className="text-sm cursor-pointer">
                      {location}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Condition */}
            <Card>
              <CardHeader>
                <CardTitle>Состояние</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Новое", "Отличное", "Хорошее", "Удовлетворительное"].map(condition => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox id={condition} />
                    <label htmlFor={condition} className="text-sm cursor-pointer">
                      {condition}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Items Grid/List */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg cursor-pointer">
                      <div 
                        className="aspect-[4/3] relative overflow-hidden"
                        onClick={() => handleItemClick(item)}
                      >
                        <ImageWithFallback
                          src={itemImages[index % itemImages.length]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white border-0 shadow-lg">
                          {item.price.toLocaleString()} ₸/день
                        </Badge>
                        <Button
                          size="sm"
                          className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary hover:bg-white/90"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Подробнее
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm hover:bg-white/30 ${
                            favorites.includes(item.id) ? 'text-red-500' : 'text-white'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      <CardHeader className="pb-3" onClick={() => handleItemClick(item)}>
                        <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{item.title}</CardTitle>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0" onClick={() => handleItemClick(item)}>
                        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{item.rating}</span>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            от {item.ownerName}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex" onClick={() => handleItemClick(item)}>
                        <div className="w-48 h-32 relative overflow-hidden">
                          <ImageWithFallback
                            src={itemImages[index % itemImages.length]}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg mb-2 hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                              <div className="flex items-center text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{item.location}</span>
                              </div>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                {item.description}
                              </p>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                  <span className="text-sm">{item.rating}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  от {item.ownerName}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl text-primary mb-2">
                                {item.price.toLocaleString()} ₸
                              </div>
                              <div className="text-sm text-muted-foreground mb-4">
                                за день
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className={`${
                                  favorites.includes(item.id) ? 'text-red-500' : ''
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(item.id);
                                }}
                              >
                                <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {sortedItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2">Товары не найдены</h3>
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