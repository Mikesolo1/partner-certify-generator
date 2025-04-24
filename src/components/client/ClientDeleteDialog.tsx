
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ClientDeleteDialogProps {
  clientName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

export const ClientDeleteDialog = ({ clientName, isOpen, onOpenChange, onDelete }: ClientDeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить клиента</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить клиента {clientName}?
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button type="button" variant="destructive" onClick={() => {
            onDelete();
            onOpenChange(false);
          }}>
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
