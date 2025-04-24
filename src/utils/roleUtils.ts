
import { Badge } from "@/components/ui/badge";

export const getRoleBadge = (role: string) => {
  switch(role) {
    case 'admin':
      return <Badge className="bg-purple-600">Администратор</Badge>;
    case 'partner':
      return <Badge className="bg-blue-600">Партнер</Badge>;
    default:
      return <Badge className="bg-gray-600">Пользователь</Badge>;
  }
};
