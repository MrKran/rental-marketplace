import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { ArrowLeft, CreditCard, Smartphone, Banknote } from "lucide-react";
import { toast } from "sonner";

interface PaymentPageProps {
  setCurrentPage: (page: string) => void;
  selectedItem?: any;
  selectedService?: any;
}

export function PaymentPage({ setCurrentPage, selectedItem, selectedService }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    phoneNumber: "",
    rentalDays: "1"
  });

  const item = selectedItem || selectedService;
  if (!item) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentPage('home')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>Ошибка</CardTitle>
              <CardDescription>Товар или услуга не найдены</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  const isService = !!selectedService;
  const basePrice = item.price;
  const days = parseInt(formData.rentalDays) || 1;
  const totalPrice = isService ? basePrice : basePrice * days;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Простая валидация
    if (paymentMethod === "card" && (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv)) {
      toast.error("Заполните все поля карты");
      return;
    }
    
    if (paymentMethod === "kaspi" && !formData.phoneNumber) {
      toast.error("Введите номер телефона");
      return;
    }

    // Имитация успешной оплаты
    toast.success("Оплата прошла успешно! Свяжемся с вами в ближайшее время.");
    setTimeout(() => {
      setCurrentPage('home');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentPage('home')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к каталогу
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Информация о товаре/услуге */}
          <Card>
            <CardHeader>
              <CardTitle>
                {isService ? "Детали услуги" : "Детали аренды"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                {!isService && (
                  <>
                    <div className="flex justify-between">
                      <span>Местоположение:</span>
                      <span>{item.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Цена за день:</span>
                      <span>{basePrice} ₸</span>
                    </div>
                  </>
                )}
                
                {isService ? (
                  <>
                    <div className="flex justify-between">
                      <span>Преподаватель:</span>
                      <span>{item.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Длительность:</span>
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Стоимость:</span>
                      <span>{basePrice} ₸</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="days">Количество дней:</Label>
                      <Input
                        id="days"
                        type="number"
                        min="1"
                        max="30"
                        value={formData.rentalDays}
                        onChange={(e) => handleInputChange('rentalDays', e.target.value)}
                        className="w-20"
                      />
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Итого к оплате:</span>
                  <span className="text-primary">{totalPrice} ₸</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Форма оплаты */}
          <Card>
            <CardHeader>
              <CardTitle>Способ оплаты</CardTitle>
              <CardDescription>
                Выберите удобный способ оплаты
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Банковская карта
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kaspi" id="kaspi" />
                    <Label htmlFor="kaspi" className="flex items-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Kaspi Pay
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center">
                      <Banknote className="w-4 h-4 mr-2" />
                      При получении (наличные)
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Номер карты</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Имя на карте</Label>
                      <Input
                        id="cardName"
                        placeholder="IVAN IVANOV"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Срок действия</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "kaspi" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Номер телефона</Label>
                      <Input
                        id="phoneNumber"
                        placeholder="+7 777 123 45 67"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Вам будет отправлена ссылка для оплаты через Kaspi Pay
                    </p>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      Оплата при получении товара или встрече с преподавателем. 
                      Мы свяжемся с вами для согласования деталей.
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  {paymentMethod === "cash" 
                    ? "Подтвердить заказ" 
                    : `Оплатить ${totalPrice} ₸`
                  }
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}