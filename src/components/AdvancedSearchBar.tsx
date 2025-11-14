import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Search, 
  SlidersHorizontal, 
  X,
  MapPin,
  DollarSign,
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface AdvancedSearchBarProps {
  onSearch: (query: string, filters: any) => void;
  placeholder?: string;
}

export function AdvancedSearchBar({ onSearch, placeholder = "Поиск..." }: AdvancedSearchBarProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    priceRange: [0, 10000],
    rating: 0,
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = [
    "Все категории",
    "Электроника",
    "Книги и учебники",
    "Канцелярия",
    "Музыкальные инструменты",
    "Спортивное оборудование"
  ];

  const locations = [
    "Все школы",
    "Binom 1 (BI-1)",
    "Binom 2 (BI-2)",
    "Binom 3 (BI-3)",
    "Binom 4 (BI-4)",
    "Binom 5 (BI-5)",
    "Binom 6 (BI-6)",
    "Binom 7 (BI-7)"
  ];

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update active filters
    const active: string[] = [];
    if (newFilters.category && newFilters.category !== "Все категории") {
      active.push(newFilters.category);
    }
    if (newFilters.location && newFilters.location !== "Все школы") {
      active.push(newFilters.location);
    }
    if (newFilters.rating > 0) {
      active.push(`${newFilters.rating}+ звезд`);
    }
    setActiveFilters(active);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      location: "",
      priceRange: [0, 10000],
      rating: 0,
    });
    setActiveFilters([]);
  };

  const removeFilter = (filter: string) => {
    const newFilters = { ...filters };
    if (categories.includes(filter)) {
      newFilters.category = "";
    } else if (locations.includes(filter)) {
      newFilters.location = "";
    } else if (filter.includes("звезд")) {
      newFilters.rating = 0;
    }
    setFilters(newFilters);
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="w-full space-y-3">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-12 pr-4 h-14 rounded-2xl border-2 bg-card focus:ring-2 focus:ring-primary/20 text-base"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
          
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className={`h-14 px-6 rounded-2xl border-2 ${
                  activeFilters.length > 0 ? "border-primary bg-primary/5" : ""
                }`}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Фильтры
                {activeFilters.length > 0 && (
                  <Badge className="ml-2 bg-primary">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-6" align="end">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Фильтры поиска</h3>
                  {activeFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Сбросить
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      Категория
                    </label>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => handleFilterChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-secondary" />
                      Школа
                    </label>
                    <Select
                      value={filters.location}
                      onValueChange={(value) => handleFilterChange("location", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите школу" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        Цена за день
                      </span>
                      <span className="text-muted-foreground">
                        {filters.priceRange[0]} - {filters.priceRange[1]} ₸
                      </span>
                    </label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => handleFilterChange("priceRange", value)}
                      min={0}
                      max={10000}
                      step={100}
                      className="py-4"
                    />
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Минимальный рейтинг</label>
                    <div className="flex gap-2">
                      {[0, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          variant={filters.rating === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleFilterChange("rating", rating)}
                          className="flex-1"
                        >
                          {rating === 0 ? "Все" : `${rating}+`}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    handleSearch();
                    setShowFilters(false);
                  }}
                  className="w-full mt-6 bg-gradient-to-r from-primary to-secondary"
                >
                  Применить фильтры
                </Button>
              </motion.div>
            </PopoverContent>
          </Popover>

          <Button
            onClick={handleSearch}
            size="lg"
            className="h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-secondary"
          >
            Найти
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {activeFilters.map((filter) => (
              <motion.div
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge
                  variant="secondary"
                  className="pl-3 pr-2 py-2 gap-2 cursor-pointer hover:bg-secondary/80"
                  onClick={() => removeFilter(filter)}
                >
                  {filter}
                  <X className="w-3 h-3" />
                </Badge>
              </motion.div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-auto py-1 text-xs"
            >
              Очистить все
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
