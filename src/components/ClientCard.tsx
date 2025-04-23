
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Client } from '@/types/partner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import ClientForm from './ClientForm';

interface ClientCardProps {
  client: Client;
  onUpdate: (client: Client) => void;
  onDelete: (clientId: string) => void;
  onAddPayment: (clientId: string, amount: number) => void;
}

const ClientCard = ({ client, onUpdate, onDelete, onAddPayment }: ClientCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const { toast } = useToast();

  const totalPayments = client.payments.reduce((sum, payment) => {
    return payment.status === 'оплачено' ? sum + payment.amount : sum;
  }, 0);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd.MM.yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const handleAddPayment = () => {
    const amount = parseFloat(paymentAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Некорректная сумма",
        description: "Пожалуйста, введите положительную сумму.",
        variant: "destructive",
      });
      return;
    }
    
    onAddPayment(client.id, amount);
    setIsAddPaymentDialogOpen(false);
    setPaymentAmount('');
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg">{client.name}</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Email:</span> {client.email}</p>
            <p><span className="font-medium">Телефон:</span> {client.phone}</p>
            <p><span className="font-medium">Дата регистрации:</span> {formatDate(client.registrationDate)}</p>
            <div className="mt-4">
              <p className="font-medium mb-1">Платежи:</p>
              {client.payments.length > 0 ? (
                <div className="space-y-2">
                  {client.payments.map(payment => (
                    <div key={payment.id} className="flex justify-between items-center text-sm px-2 py-1 bg-gray-50 rounded">
                      <div>
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          payment.status === 'оплачено' ? 'bg-green-500' : 
                          payment.status === 'в ожидании' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        {formatDate(payment.date)}
                      </div>
                      <div className="font-medium">{payment.amount.toLocaleString('ru-RU')} ₽</div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center font-medium pt-2">
                    <span>Всего:</span>
                    <span>{totalPayments.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">Нет платежей</p>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t bg-gray-50 rounded-b-lg flex justify-between pt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-1" />
              Изменить
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="h-4 w-4 mr-1" />
              Удалить
            </Button>
          </div>
          
          <Button 
            size="sm"
            className="bg-certificate-blue hover:bg-certificate-darkBlue text-white"
            onClick={() => setIsAddPaymentDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Платеж
          </Button>
        </CardFooter>
      </Card>
      
      {/* Диалог редактирования клиента */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать клиента</DialogTitle>
            <DialogDescription>
              Обновите информацию о клиенте {client.name}
            </DialogDescription>
          </DialogHeader>
          
          <ClientForm 
            onSubmit={(updatedClient) => {
              onUpdate(updatedClient);
              setIsEditDialogOpen(false);
            }} 
            defaultValues={client}
            isEditing={true}
          />
        </DialogContent>
      </Dialog>
      
      {/* Диалог удаления клиента */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить клиента</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить клиента {client.name}? Это действие необратимо.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onDelete(client.id);
                setIsDeleteDialogOpen(false);
              }}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Диалог добавления платежа */}
      <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить платеж</DialogTitle>
            <DialogDescription>
              Добавьте информацию о новом платеже клиента {client.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Сумма платежа (₽):</label>
              <Input 
                type="number" 
                min="1"
                placeholder="10000"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPaymentDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddPayment}>
              Добавить платеж
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientCard;
