
import { Badge } from "@/components/ui/badge";

export const getRoleBadge = (role: string) => {
  switch(role) {
    case 'admin':
      return { 
        variant: "default", 
        className: "bg-purple-600", 
        children: "Администратор" 
      };
    case 'partner':
      return { 
        variant: "default", 
        className: "bg-blue-600", 
        children: "Партнер" 
      };
    default:
      return { 
        variant: "default", 
        className: "bg-gray-600", 
        children: "Пользователь" 
      };
  }
};
