import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  indicatorStatus: 'positive' | 'negative';
  iconColorClassName: string; // e.g. 'text-primary', 'text-accent'
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, indicatorStatus, iconColorClassName, className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium uppercase text-muted-foreground tracking-wider">{title}</CardTitle>
        <div className={cn(
          'h-2.5 w-2.5 rounded-full',
          indicatorStatus === 'positive' ? 'bg-green-500' : 'bg-red-500'
        )} />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3">
          <Icon className={cn("h-7 w-7", iconColorClassName)} />
          <div className="text-2xl font-semibold text-card-foreground">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
