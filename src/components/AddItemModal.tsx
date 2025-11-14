import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, Shield } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useFormSecurity, useDataValidation } from "../hooks/useSecurity";
import { 
  sanitizeHtml, 
  validatePrice, 
  validateText, 
  checkUserPermission, 
  logSuspiciousActivity,
  sanitizeObject
} from "../utils/security";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  items: any[];
  setItems: (items: any[]) => void;
  services: any[];
  setServices: (services: any[]) => void;
}

export function AddItemModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  items, 
  setItems, 
  services, 
  setServices 
}: AddItemModalProps) {
  const [type, setType] = useState<'item' | 'service'>('item');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    // For items
    category: "",
    customCategory: "",
    // For services
    serviceType: "",
    duration: "",
    maxStudents: ""
  });

  // Системы безопасности
  const { validateSubmission, isBlocked, remainingTime } = useFormSecurity('add-item');
  const { validateUserInput } = useDataValidation();

  const handleChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeHtml(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      toast.error(`Форма заблокирована. Попробуйте через ${remainingTime} секунд.`);
      return;
    }

    // Проверка прав пользователя
    const action = type === 'item' ? 'create_item' : 'create_service';
    if (!checkUserPermission(currentUser, action)) {
      toast.error("У вас нет прав для выполнения этого действия");
      logSuspiciousActivity('unauthorized_action_attempt', { action, user: currentUser });
      return;
    }

    // Валидация данных
    const validationRules = {
      title: { 
        required: true, 
        minLength: 3, 
        maxLength: 100,
        custom: (value: string) => validateText(value, 3, 100),
        customMessage: 'Название должно быть от 3 до 100 символов'
      },
      description: { 
        required: true, 
        minLength: 10, 
        maxLength: 1000,
        custom: (value: string) => validateText(value, 10, 1000),
        customMessage: 'Описание должно быть от 10 до 1000 символов'
      },
      price: { 
        required: true,
        custom: (value: string) => validatePrice(value),
        customMessage: 'Некорректная цена'
      }
    };

    if (type === 'item') {
      validationRules.location = { 
        required: true, 
        minLength: 3, 
        maxLength: 100,
        custom: (value: string) => validateText(value, 3, 100),
        customMessage: 'Укажите корректное местоположение'
      };
    } else {
      validationRules.duration = { 
        required: true, 
        minLength: 2, 
        maxLength: 50,
        custom: (value: string) => validateText(value, 2, 50),
        customMessage: 'Укажите длительность услуги'
      };
    }

    const validationResult = validateUserInput(formData, validationRules);
    if (!validationResult.isValid) {
      validationResult.errors.forEach(error => toast.error(error));
      return;
    }

    // Проверка системы безопасности
    const sanitizedData = sanitizeObject(formData);
    if (!validateSubmission(sanitizedData)) {
      return;
    }

    const baseData = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      price: parseInt(formData.price),
      rating: (4 + Math.random()).toFixed(1),
      createdAt: new Date().toISOString()
    };

    if (type === 'item') {
      const finalCategory = formData.category === 'other' && formData.customCategory 
        ? formData.customCategory 
        : formData.category || "Прочее";
        
      const newItem = {
        ...baseData,
        location: formData.location || "Астана",
        category: finalCategory,
        ownerId: currentUser.id,
        ownerName: currentUser.name
      };
      setItems([...items, newItem]);
      toast.success("Товар добавлен!");
    } else {
      const newService = {
        ...baseData,
        type: formData.serviceType || "Курс",
        duration: formData.duration || "1 час",
        maxStudents: parseInt(formData.maxStudents) || 10,
        instructor: currentUser.name,
        instructorId: currentUser.id
      };
      setServices([...services, newService]);
      toast.success("Услуга добавлена!");
    }

    // Reset form
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "",
      category: "",
      customCategory: "",
      serviceType: "",
      duration: "",
      maxStudents: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить новое предложение</DialogTitle>
          <DialogDescription>
            Создайте объявление для аренды товара или предложите образовательную услугу
          </DialogDescription>
        </DialogHeader>
        
        {/* Индикатор безопасности */}
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700">Защищено системой безопасности Alash</span>
        </div>

        {isBlocked && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Форма временно заблокирована из-за подозрительной активности. 
              Попробуйте через {remainingTime} секунд.
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div className="space-y-2">
            <Label>Что вы хотите добавить?</Label>
            <RadioGroup 
              value={type} 
              onValueChange={(value) => setType(value as 'item' | 'service')}
              disabled={isBlocked}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="item" id="item" />
                <Label htmlFor="item">Товар для аренды</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="service" id="service" />
                <Label htmlFor="service">Образовательная услуга</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder={type === 'item' ? "Например: Ноутбук MacBook Pro" : "Например: Курс по математике"}
                disabled={isBlocked}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">
                Цена * ({type === 'item' ? '₸/день' : '₸ за курс'})
              </Label>
              <Input
                id="price"
                type="number"
                min="1"
                max="10000000"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="1000"
                disabled={isBlocked}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Детальное описание товара или услуги"
              rows={4}
              disabled={isBlocked}
              required
            />
          </div>

          {/* Conditional Fields */}
          {type === 'item' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Местоположение *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="Астана, Есиль"
                    disabled={isBlocked}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Категория</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleChange('category', value)}
                    disabled={isBlocked}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Электроника</SelectItem>
                      <SelectItem value="books">Книги</SelectItem>
                      <SelectItem value="sports">Спорт</SelectItem>
                      <SelectItem value="music">Музыкальные инструменты</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {formData.category === 'other' && (
                <div className="space-y-2">
                  <Label htmlFor="customCategory">Укажите категорию</Label>
                  <Input
                    id="customCategory"
                    value={formData.customCategory}
                    onChange={(e) => handleChange('customCategory', e.target.value)}
                    placeholder="Название категории"
                    disabled={isBlocked}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Тип услуги</Label>
                  <Select 
                    value={formData.serviceType} 
                    onValueChange={(value) => handleChange('serviceType', value)}
                    disabled={isBlocked}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Курс">Курс</SelectItem>
                      <SelectItem value="Урок">Индивидуальный урок</SelectItem>
                      <SelectItem value="Секция">Секция/кружок</SelectItem>
                      <SelectItem value="Мастер-класс">Мастер-класс</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Длительность *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    placeholder="например: 2 часа, 8 недель"
                    disabled={isBlocked}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Максимальное количество учеников</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.maxStudents}
                  onChange={(e) => handleChange('maxStudents', e.target.value)}
                  placeholder="10"
                  disabled={isBlocked}
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button 
              type="submit" 
              disabled={isBlocked}
            >
              {isBlocked ? `Заблокировано (${remainingTime}с)` : `Добавить ${type === 'item' ? 'товар' : 'услугу'}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}