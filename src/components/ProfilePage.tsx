import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { 
  User, 
  Package, 
  GraduationCap, 
  Star, 
  Edit,
  Trash2,
  MapPin,
  Clock,
  Users,
  Calendar,
  TrendingUp,
  Award,
  Eye,
  Heart,
  MessageCircle,
  Settings,
  Bell,
  Shield,
  Verified,
  Camera,
  Upload,
  Save,
  X,
  Plus,
  DollarSign,
  Activity,
  Target,
  Zap
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";

interface ProfilePageProps {
  currentUser: any;
  setCurrentUser: (user: any) => void;
  items: any[];
  services: any[];
  setItems: (items: any[]) => void;
  setServices: (services: any[]) => void;
}

export function ProfilePage({ 
  currentUser, 
  setCurrentUser, 
  items, 
  services,
  setItems,
  setServices 
}: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [editForm, setEditForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "+7 (777) 123-45-67",
    bio: currentUser?.bio || "Студент КазНУ, изучаю информатику",
    location: "Астана, Есиль район",
    university: "КазНУ им. аль-Фараби",
    course: "3 курс",
    specialization: "Информационные системы"
  });

  const userItems = items.filter(item => item.ownerId === currentUser?.id);
  const userServices = services.filter(service => service.instructorId === currentUser?.id);

  // Статистика пользователя
  const stats = {
    totalEarnings: 0,
    activeListings: userItems.length + userServices.length,
    totalViews: 0,
    rating: 0,
    completedDeals: 23,
    responseTime: "< 1 час",
    profileViews: 156,
    favoritesCount: 42
  };

  const achievements = [
    { id: 1, name: "Первая сделка", description: "Успешно завершили первую аренду", earned: true },
    { id: 2, name: "Надежный партнер", description: "10+ успешных сделок", earned: true },
    { id: 3, name: "Популярный арендодатель", description: "100+ просмотров профиля", earned: true },
    { id: 4, name: "Эксперт", description: "Рейтинг выше 4.5", earned: true },
    { id: 5, name: "Активный пользователь", description: "Более 50 сделок", earned: false },
    { id: 6, name: "Топ-преподаватель", description: "Рейтинг 5.0", earned: false }
  ];

  const recentActivity = [
    { id: 1, type: "view", item: "MacBook Pro 16\"", time: "2 часа назад", user: "Анна С." },
    { id: 2, type: "favorite", item: "Курс программирования", time: "5 часов назад", user: "Максим К." },
    { id: 3, type: "message", item: "Учебники математики", time: "1 день назад", user: "Елена М." },
    { id: 4, type: "booking", item: "Репетиторство английского", time: "2 дня назад", user: "Дмитрий П." }
  ];

  const handleSaveProfile = () => {
    setCurrentUser({
      ...currentUser,
      ...editForm
    });
    setIsEditing(false);
    toast.success("Профиль успешно обновлен!");
  };

  const handleDeleteItem = (itemId: number, type: 'item' | 'service') => {
    if (type === 'item') {
      setItems(items.filter(item => item.id !== itemId));
    } else {
      setServices(services.filter(service => service.id !== itemId));
    }
    toast.success("Объявление удалено");
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'view': return <Eye className="w-4 h-4 text-blue-500" />;
      case 'favorite': return <Heart className="w-4 h-4 text-red-500" />;
      case 'message': return <MessageCircle className="w-4 h-4 text-green-500" />;
      case 'booking': return <Calendar className="w-4 h-4 text-purple-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-primary to-secondary text-white relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 border-4 border-white/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl bg-white/20 text-white">
                        {currentUser?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-2xl">{currentUser?.name}</h1>
                      {currentUser?.type === 'teacher' && (
                        <Badge className="bg-white/20 text-white border-white/30">
                          <Verified className="w-3 h-3 mr-1" />
                          Проверенный преподаватель
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/80">{editForm.bio}</p>
                    <div className="flex items-center space-x-4 text-sm text-white/70">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {editForm.location}
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        {editForm.university}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6 lg:mt-0">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-xl">{stats.rating}</span>
                    <span className="text-white/70">({stats.completedDeals} отзывов)</span>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: "Общий доход", value: `${stats.totalEarnings.toLocaleString()} ₸`, icon: DollarSign, color: "text-green-500" },
            { label: "Активные объявления", value: stats.activeListings, icon: Package, color: "text-blue-500" },
            { label: "Просмотры", value: stats.totalViews, icon: Eye, color: "text-purple-500" },
            { label: "Время ответа", value: stats.responseTime, icon: Zap, color: "text-yellow-500" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="listings">Объявления</TabsTrigger>
              <TabsTrigger value="activity">Активность</TabsTrigger>
              <TabsTrigger value="achievements">Достижения</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Последняя активность
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>
                              {activity.type === 'view' && ' посмотрел '}
                              {activity.type === 'favorite' && ' добавил в избранное '}
                              {activity.type === 'message' && ' написал сообщение о '}
                              {activity.type === 'booking' && ' забронировал '}
                              <span className="text-primary">{activity.item}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-sm">Прогресс профиля</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Заполненность профиля</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Рейтинг</span>
                          <span>{stats.rating}/5.0</span>
                        </div>
                        <Progress value={stats.rating * 20} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-sm">Быстрые действия</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить товар
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Создать курс
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Сообщения
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Listings Tab */}
            <TabsContent value="listings" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Items */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Package className="w-5 h-5 mr-2" />
                        Мои товары ({userItems.length})
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userItems.length > 0 ? userItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-muted rounded-lg"></div>
                        <div className="flex-1">
                          <h4 className="line-clamp-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₸/день</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              {Math.floor(Math.random() * 100) + 20}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Heart className="w-3 h-3 mr-1" />
                              {Math.floor(Math.random() * 20) + 5}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteItem(item.id, 'item')}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>У вас пока нет товаров для аренды</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* User Services */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2" />
                        Мои услуги ({userServices.length})
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userServices.length > 0 ? userServices.map((service) => (
                      <div key={service.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-muted rounded-lg"></div>
                        <div className="flex-1">
                          <h4 className="line-clamp-1">{service.title}</h4>
                          <p className="text-sm text-muted-foreground">{service.price.toLocaleString()} ₸</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary" className="text-xs">{service.type}</Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Star className="w-3 h-3 mr-1 text-yellow-400" />
                              {service.rating}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteItem(service.id, 'service')}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>У вас пока нет образовательных услуг</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6 mt-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>История активности</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.concat([
                      { id: 5, type: "view", item: "Электрогитара Fender", time: "3 дня назад", user: "Алиса Р." },
                      { id: 6, type: "booking", item: "Курс дизайна", time: "5 дней назад", user: "Иван С." },
                      { id: 7, type: "message", item: "Планшет для рисования", time: "1 неделю назад", user: "Ольга К." }
                    ]).map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>
                            {activity.type === 'view' && ' посмотрел '}
                            {activity.type === 'favorite' && ' добавил в избранное '}
                            {activity.type === 'message' && ' написал сообщение о '}
                            {activity.type === 'booking' && ' забронировал '}
                            <span className="text-primary">{activity.item}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6 mt-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Достижения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`p-4 rounded-lg border-2 transition-all ${
                          achievement.earned 
                            ? 'border-primary bg-primary/5 shadow-lg' 
                            : 'border-muted bg-muted/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.earned ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          }`}>
                            <Award className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`text-sm ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                              {achievement.name}
                            </h4>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        {achievement.earned && (
                          <Badge className="mt-2 text-xs bg-primary/20 text-primary border-primary/30">
                            Получено
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Settings */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Профиль
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input
                            id="phone"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">О себе</Label>
                          <Textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveProfile} className="flex-1">
                            <Save className="w-4 h-4 mr-2" />
                            Сохранить
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm text-muted-foreground">Имя</Label>
                          <p>{editForm.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Email</Label>
                          <p>{editForm.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Телефон</Label>
                          <p>{editForm.phone}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">О себе</Label>
                          <p className="text-sm">{editForm.bio}</p>
                        </div>
                        <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                          <Edit className="w-4 h-4 mr-2" />
                          Редактировать профиль
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Уведомления
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { id: "new_messages", label: "Новые сообщения", enabled: true },
                      { id: "booking_updates", label: "Обновления бронирований", enabled: true },
                      { id: "price_alerts", label: "Уведомления о ценах", enabled: false },
                      { id: "marketing", label: "Маркетинговые уведомления", enabled: false }
                    ].map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between">
                        <Label htmlFor={setting.id} className="text-sm">
                          {setting.label}
                        </Label>
                        <Switch id={setting.id} checked={setting.enabled} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}