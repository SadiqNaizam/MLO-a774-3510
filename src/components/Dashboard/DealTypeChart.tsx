import React from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface DealTypeChartProps {
  className?: string;
}

const dealTypeData = [
  { subject: '2018', Pending: 75, Loss: 35, Won: 90, fullMark: 100 },
  { subject: '2019', Pending: 80, Loss: 50, Won: 65, fullMark: 100 },
  { subject: '2020', Pending: 55, Loss: 70, Won: 45, fullMark: 100 },
  { subject: '2021', Pending: 90, Loss: 25, Won: 85, fullMark: 100 },
  { subject: '2022', Pending: 65, Loss: 60, Won: 75, fullMark: 100 },
  { subject: '2023', Pending: 40, Loss: 45, Won: 80, fullMark: 100 },
];

const DealTypeChart: React.FC<DealTypeChartProps> = ({ className }) => {
  const [sortBy, setSortBy] = React.useState<string>('monthly');

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Deal Type</CardTitle>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dealTypeData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Tooltip />
              <Legend formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>} />
              <Radar name="Pending" dataKey="Pending" stroke="#F7B84B" fill="#F7B84B" fillOpacity={0.6} />
              <Radar name="Loss" dataKey="Loss" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.6} />
              <Radar name="Won" dataKey="Won" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealTypeChart;
