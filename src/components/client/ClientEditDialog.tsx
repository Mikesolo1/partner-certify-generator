
import { Client } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ClientEditDialogProps {
  client: Client;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (client: Client) => void;
}

export const ClientEditDialog = ({ client, isOpen, onOpenChange, onUpdate }: ClientEditDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать клиента</DialogTitle>
          <DialogDescription>
            Измените информацию о клиенте {client.name}
          </DialogDescription>
        </DialogHeader>
        
        <div>
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
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
              <Button type="submit" onClick={() => {
                onUpdate(client);
                onOpenChange(false);
              }}>
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
