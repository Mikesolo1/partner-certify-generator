
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface BaseStatCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const BaseStatCard = ({ title, icon: Icon, children }: BaseStatCardProps) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2">
        <Icon className="h-8 w-8 text-brand opacity-15" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default BaseStatCard;
