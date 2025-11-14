import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Star, 
  MapPin, 
  Clock, 
  User, 
  Heart, 
  Share2, 
  MessageCircle,
  Calendar,
  Shield,
  TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Separator } from "./ui/separator";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  onRent: () => void;
}

export function QuickViewModal({ isOpen, onClose, item, onRent }: QuickViewModalProps) {
  if (!item) return null;

  const itemImages = [
    "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwbGFwdG9wJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1OTY0ODk2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rcyUyMHN0dWR5JTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc1OTY0ODk2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1708165802530-ccf9ca6a8269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwaW5zdHJ1bWVudHMlMjBndWl0YXJ8ZW58MXx8fHwxNzU5NjAzOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative bg-muted">
                  <div className="aspect-square relative overflow-hidden">
                    <ImageWithFallback
                      src={itemImages[item.id % itemImages.length]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Badges */}
                    <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white border-0">
                      {item.price.toLocaleString()} ₸/день
                    </Badge>
                    
                    {/* Quick Actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-0"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        В избранное
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-0"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col">
                  <DialogHeader className="mb-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <DialogTitle className="text-2xl leading-tight">{item.title}</DialogTitle>
                      <Badge variant="outline" className="flex-shrink-0">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium text-foreground">{item.rating}</span>
                        <span>({item.reviews} отзывов)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </DialogHeader>

                  <Separator className="mb-4" />

                  {/* Description */}
                  <div className="mb-6 flex-1">
                    <h4 className="font-medium mb-2">Описание</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">Проверено</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-muted-foreground">Популярно</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">Доступно</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-muted-foreground">Быстро</span>
                    </div>
                  </div>

                  <Separator className="mb-4" />

                  {/* Owner Info */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.owner.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.owner.type === "student" ? "Студент" : "Преподаватель"}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Написать
                    </Button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button 
                      onClick={onRent}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      size="lg"
                    >
                      Арендовать сейчас
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
