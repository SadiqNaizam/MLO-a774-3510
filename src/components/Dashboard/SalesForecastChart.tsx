import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SalesForecastChartProps {
  className?: string;
}

const salesData = [
  { name: 'Goal', value: 37000, fill: 'hsl(var(--primary))' }, // Blue
  { name: 'Pending Forecast', value: 12000, fill: 'hsl(var(--accent))' }, // Green
  { name: 'Revenue', value: 18000, fill: '#F7B84B' }, // Yellow/Orange
];

const SalesForecastChart: React.FC<SalesForecastChartProps> = ({ className }) => {
  const [sortBy, setSortBy] = React.useState<string>('nov_2021');

  // This data would change based on sortBy, but for now it's static
  const chartData = salesData;

  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${value / 1000}k`;
    return `$${value}`;
  };

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="grid gap-1.5">
            <CardTitle>Sales Forecast</CardTitle>
            <CardDescription>Total Forecasted Value</CardDescription>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov_2021">Nov 2021</SelectItem>
            <SelectItem value="oct_2021">Oct 2021</SelectItem>
            <SelectItem value="year_2021">Year 2021</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart layout="vertical" data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={formatCurrency} />
              <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend 
                formatter={(value, entry) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
              />
              <Bar dataKey="value" barSize={35} radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesForecastChart;
