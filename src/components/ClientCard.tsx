import React, { useState } from 'react';
import { Client, Payment } from '@/types/partner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { usePartners } from '@/contexts/PartnersContext';
import { Pencil, Trash, Plus, CreditCard } from 'lucide-react';

interface ClientCardProps {
  client: Client;
  onUpdate: (client: Client) => void;
  onDelete: (id: string) => void;
  onAddPayment?: (clientId: string, amount: number) => void;
}

const paymentSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Сумма должна быть больше 0" }),
});

const ClientCard: React.FC<ClientCardProps> = ({ client, onUpdate, onDelete }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const { toast } = useToast();
  const { addPayment } = usePartners();
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'd MMMM yyyy', { locale: ru });
    } catch (e) {
      return dateString;
    }
  };
  
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: 0,
    }
  });
  
  const handleAddPayment = async (data: z.infer<typeof paymentSchema>) => {
    try {
      await addPayment(client.id, {
        amount: data.amount,
        date: new Date().toISOString(),
        status: 'оплачено'
      });
      
      toast({
        title: "Платеж добавлен",
        description: `Платеж на сумму ${data.amount} ₽ успешно добавлен`,
      });
      
      setIsAddPaymentDialogOpen(false);
      paymentForm.reset();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить платеж",
        variant: "destructive"
      });
      console.error('Error adding payment:', error);
    }
  };

  const totalPaid = client.payments
    ? client.payments
        .filter(p => p.status === 'оплачено')
        .reduce((sum, p) => sum + Number(p.amount || p.amount), 0)
    : 0;
  
  const paymentsCount = client.payments
    ? client.payments.filter(p => p.status === 'оплачено').length
    : 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{client.name}</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setIsEditDialogOpen(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Email:</span>
            <span className="font-medium">{client.email}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Телефон:</span>
            <span className="font-medium">{client.phone || "—"}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Дата регистрации:</span>
            <span className="font-medium">
              {formatDate(client.registrationDate || client.registration_date || '')}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Оплаченных счетов:</span>
            <Badge variant="outline" className="font-medium">
              {paymentsCount}
            </Badge>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Общая сумма:</span>
            <span className="font-medium text-brand-dark">{totalPaid.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t">
        <Button 
          className="w-full"
          variant="outline" 
          onClick={() => setIsAddPaymentDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> 
          <CreditCard className="h-4 w-4 mr-2" />
          Добавить платеж
        </Button>
      </CardFooter>
      
      {/* Dialog для добавления платежа */}
      <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить платеж</DialogTitle>
            <DialogDescription>
              Укажите сумму платежа для клиента {client.name}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...paymentForm}>
            <form onSubmit={paymentForm.handleSubmit(handleAddPayment)} className="space-y-4">
              <FormField
                control={paymentForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сумма платежа (₽)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        placeholder="10000" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddPaymentDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">Добавить</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Диалоги редактирования и удаления */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать клиента</DialogTitle>
            <DialogDescription>
              Измените информацию о клиенте {client.name}
            </DialogDescription>
          </DialogHeader>
          
          {/* Форма редактирования клиента */}
          <Form>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя клиента</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    defaultValue={client.name}
                    onChange={(e) => client.name = e.target.value}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    defaultValue={client.email}
                    onChange={(e) => client.email = e.target.value}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input 
                    type="tel" 
                    id="phone" 
                    defaultValue={client.phone}
                    onChange={(e) => client.phone = e.target.value}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit" onClick={() => {
                  onUpdate(client);
                  setIsEditDialogOpen(false);
                }}>
                  Сохранить
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить клиента</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить клиента {client.name}?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button type="button" variant="destructive" onClick={() => {
              onDelete(client.id);
              setIsDeleteDialogOpen(false);
            }}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ClientCard;
