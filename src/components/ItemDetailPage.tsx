import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  Heart,
  Share2,
  MessageCircle,
  Phone,
  Calendar,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Package,
  Truck,
  CreditCard
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState } from "react";

interface ItemDetailPageProps {
  item: any;
  setCurrentPage: (page: string) => void;
  setSelectedItem: (item: any) => void;
}

export function ItemDetailPage({ item, setCurrentPage, setSelectedItem }: ItemDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const images = [
    "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwbGFwdG9wJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1OTY0ODk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rcyUyMHN0dWR5JTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc1OTY0ODk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1708165802530-ccf9ca6a8269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwaW5zdHJ1bWVudHMlMjBndWl0YXJ8ZW58MXx8fHwxNzU5NjAzOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  const reviews = [
    {
      id: 1,
      user: "Анна С.",
      rating: 5,
      comment: "Отличный товар! Все работает как заявлено. Владелец очень отзывчивый.",
      date: "2 дня назад",
      verified: true
    },
    {
      id: 2,
      user: "Максим К.",
      rating: 5,
      comment: "Быстрая передача, товар в идеальном состоянии. Рекомендую!",
      date: "1 неделю назад",
      verified: true
    },
    {
      id: 3,
      user: "Елена М.",
      rating: 4,
      comment: "Хороший товар за разумную цену. Небольшие царапины, но на функциональность не влияют.",
      date: "2 недели назад",
      verified: false
    }
  ];

  const handleRent = () => {
    setSelectedItem(item);
    setCurrentPage('payment');
  };

  const handleContact = () => {
    // Implement contact functionality
    console.log("Contact owner");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage('items')}
            className="group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Назад к товарам
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <ImageWithFallback
                  src={images[selectedImageIndex]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-transparent hover:border-muted-foreground/20'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Item Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title and Actions */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl mb-2">{item.title}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    <span>{item.rating}</span>
                    <span className="ml-1">(24 отзыва)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? 'text-red-500' : ''}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl text-primary">{item.price.toLocaleString()}</span>
                <span className="text-xl text-muted-foreground">₸ / день</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Минимальный срок аренды: 1 день
              </p>
            </div>

            {/* Owner Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" />
                    <AvatarFallback>{item.ownerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3>{item.ownerName}</h3>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>На платформе с 2023</span>
                      <span>98% положительных отзывов</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleContact}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Написать
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300"
                onClick={handleRent}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Арендовать сейчас
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" onClick={handleContact}>
                  <Phone className="w-4 h-4 mr-2" />
                  Связаться
                </Button>
                <Button variant="outline" size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Вопрос
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-xl">
                <Package className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm">Состояние</div>
                  <div className="text-xs text-muted-foreground">Отличное</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-xl">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm">Доставка</div>
                  <div className="text-xs text-muted-foreground">Возможна</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-xl">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm">Страховка</div>
                  <div className="text-xs text-muted-foreground">Включена</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-xl">
                <CreditCard className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm">Оплата</div>
                  <div className="text-xs text-muted-foreground">Безопасная</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Description and Reviews */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Описание</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Дополнительная информация: товар находится в отличном состоянии, 
                    регулярно проходит техническое обслуживание. Все аксессуары включены. 
                    Возможна доставка по городу за дополнительную плату.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Отзывы (24)</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{review.user}</span>
                              {review.verified && (
                                <CheckCircle className="w-3 h-3 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < review.rating 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-11">{review.comment}</p>
                      {review.id < reviews.length && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-6"
          >
            {/* Safety Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <Shield className="w-5 h-5 mr-2" />
                  Безопасность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Личность владельца подтверждена</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Платежи защищены системой</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Возможность возврата депозита</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Items */}
            <Card>
              <CardHeader>
                <CardTitle>Похожие товары</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex space-x-3">
                    <div className="w-16 h-16 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm line-clamp-2">Аналогичный товар {i}</h4>
                      <p className="text-xs text-muted-foreground">от 8,000 ₸/день</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}