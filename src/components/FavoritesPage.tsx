import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Search, Filter, SortAsc, Star, MapPin, Calendar, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface FavoritesPageProps {
  currentUser: any;
}

const mockFavorites = [
  {
    id: 1,
    title: "MacBook Pro 16\" M2",
    description: "Мощный ноутбук для работы и учебы",
    price: 95000,
    location: "Астана, Есиль",
    category: "electronics",
    rating: "4.9",
    ownerId: 2,
    ownerName: "Алексей",
    type: "item",
    addedDate: "2024-01-15",
    image: null
  },
  {
    id: 2,
    title: "Курс программирования на Python",
    description: "Изучите основы программирования с нуля",
    price: 75000,
    type: "service",
    duration: "8 недель",
    rating: "4.9",
    instructor: "Иван Петров",
    instructorId: 5,
    addedDate: "2024-01-10"
  },
  {
    id: 3,
    title: "Электрогитара Fender",
    description: "Классическая электрогитара в отличном состоянии",
    price: 45000,
    location: "Астана, Сарыарка",
    category: "other",
    rating: "4.8",
    ownerId: 4,
    ownerName: "Дмитрий",
    type: "item",
    addedDate: "2024-01-12"
  }
];

export function FavoritesPage({ currentUser }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const sortedFavorites = filteredFavorites.sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      case "price":
        return b.price - a.price;
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      default:
        return 0;
    }
  });

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Избранное
              </h1>
              <p className="text-muted-foreground">
                {favorites.length} {favorites.length === 1 ? 'элемент' : 'элементов'} в избранном
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск в избранном..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-0 bg-muted/50"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                className="rounded-xl"
              >
                <Filter className="w-4 h-4 mr-2" />
                Все
              </Button>
              <Button
                variant={filterType === "item" ? "default" : "outline"}
                onClick={() => setFilterType("item")}
                className="rounded-xl"
              >
                Товары
              </Button>
              <Button
                variant={filterType === "service" ? "default" : "outline"}
                onClick={() => setFilterType("service")}
                className="rounded-xl"
              >
                Услуги
              </Button>
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSortBy(sortBy === "date" ? "price" : sortBy === "price" ? "rating" : "date")}
                className="rounded-xl"
              >
                <SortAsc className="w-4 h-4 mr-2" />
                {sortBy === "date" ? "По дате" : sortBy === "price" ? "По цене" : "По рейтингу"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Favorites Grid */}
        {sortedFavorites.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {sortedFavorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-md">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      {item.type === "item" ? (
                        <div className="text-6xl opacity-30">📦</div>
                      ) : (
                        <div className="text-6xl opacity-30">🎓</div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFavorite(item.id)}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full shadow-md"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary to-secondary text-white border-0">
                      {item.type === "item" ? "Товар" : "Услуга"}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      {/* Price */}
                      <div className="text-2xl font-bold text-primary">
                        {item.price.toLocaleString()} ₸
                        {item.type === "service" && item.duration && (
                          <span className="text-sm text-muted-foreground ml-1">/ {item.duration}</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-2">
                        {item.location && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2" />
                            {item.location}
                          </div>
                        )}
                        
                        {item.rating && (
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                            <span className="font-medium">{item.rating}</span>
                            <span className="text-muted-foreground ml-1">рейтинг</span>
                          </div>
                        )}

                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          Доблено {new Date(item.addedDate).toLocaleDateString('ru-RU')}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-primary to-secondary text-white rounded-xl"
                          size="sm"
                        >
                          {item.type === "item" ? "Арендовать" : "Записаться"}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="rounded-xl"
                        >
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Избранное пусто</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || filterType !== "all" 
                ? "По вашему запросу ничего не найдено"
                : "Добавляйте товары и услуги в избранное, чтобы быстро находить их"
              }
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setFilterType("all");
              }}
              className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl"
            >
              Очистить фильтры
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}