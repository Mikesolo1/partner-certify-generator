
import { Badge } from "@/components/ui/badge";
import { BadgeProps } from "@/components/ui/badge";

export const getRoleBadge = (role: string): BadgeProps => {
  switch(role) {
    case 'admin':
      return { 
        variant: "default" as const, 
        className: "bg-purple-600", 
        children: "Администратор" 
      };
    case 'partner':
      return { 
        variant: "default" as const, 
        className: "bg-blue-600", 
        children: "Партнер" 
      };
    default:
      return { 
        variant: "default" as const, 
        className: "bg-gray-600", 
        children: "Пользователь" 
      };
  }
};
