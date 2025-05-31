import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface BalanceOverviewProps {
  className?: string;
}

const balanceData = [
  { month: 'Jan', revenue: 12000, expenses: 9000 },
  { month: 'Feb', revenue: 18000, expenses: 11000 },
  { month: 'Mar', revenue: 15000, expenses: 13000 },
  { month: 'Apr', revenue: 22000, expenses: 15000 },
  { month: 'May', revenue: 20000, expenses: 18000 },
  { month: 'Jun', revenue: 28000, expenses: 20000 },
  { month: 'Jul', revenue: 32000, expenses: 23000 },
  { month: 'Aug', revenue: 30000, expenses: 27000 },
  { month: 'Sep', revenue: 40000, expenses: 30000 },
  { month: 'Oct', revenue: 38000, expenses: 32000 },
  { month: 'Nov', revenue: 45000, expenses: 35000 },
  { month: 'Dec', revenue: 52000, expenses: 40000 },
];

const totalRevenue = balanceData.reduce((sum, item) => sum + item.revenue, 0);
const totalExpenses = balanceData.reduce((sum, item) => sum + item.expenses, 0);
const profitRatio = totalExpenses > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : (totalRevenue > 0 ? 100 : 0);

const formatCurrency = (value: number) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
};

const BalanceOverview: React.FC<BalanceOverviewProps> = ({ className }) => {
  const [sortBy, setSortBy] = React.useState<string>('current_year');

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="mb-2 sm:mb-0">Balance Overview</CardTitle>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <span className="font-semibold text-primary mr-1">{formatCurrency(totalRevenue)}</span>
              <span className="text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-destructive mr-1">{formatCurrency(totalExpenses)}</span>
              <span className="text-muted-foreground">Expenses</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-accent mr-1">{profitRatio.toFixed(1)}%</span>
              <span className="text-muted-foreground">Profit Ratio</span>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current_year">Current Year</SelectItem>
                <SelectItem value="last_year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <LineChart data={balanceData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}/>
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="expenses" name="Expenses" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceOverview;
