import React from 'react';
import StatCard, { StatCardProps } from './StatCard';
import { Send, CircleDollarSign, TrendingDown, Gauge, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardGridProps {
  className?: string;
}

const statsData: Omit<StatCardProps, 'className' | 'icon'> & { icon: React.ElementType }[] = [
  { title: 'Campaign Sent', value: '197', icon: Send, indicatorStatus: 'positive' as const, iconColorClassName: 'text-primary' },
  { title: 'Annual Profit', value: '$489.4k', icon: CircleDollarSign, indicatorStatus: 'positive' as const, iconColorClassName: 'text-accent' },
  { title: 'Lead Conversation', value: '32.89%', icon: TrendingDown, indicatorStatus: 'negative' as const, iconColorClassName: 'text-destructive' },
  { title: 'Daily Average Income', value: '$1,596.5', icon: Gauge, indicatorStatus: 'positive' as const, iconColorClassName: 'text-primary' },
  { title: 'Annual Deals', value: '2,659', icon: Heart, indicatorStatus: 'negative' as const, iconColorClassName: 'text-destructive' },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6', className)}>
      {statsData.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          indicatorStatus={stat.indicatorStatus}
          iconColorClassName={stat.iconColorClassName}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
