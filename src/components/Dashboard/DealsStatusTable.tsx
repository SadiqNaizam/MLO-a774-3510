import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  representative: {
    name: string;
    avatarUrl?: string;
    initials: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'Negotiation' | 'New Lead';
  dealValue: string;
}

const dealsData: Deal[] = [
  { id: '1', name: 'Absternet LLC', lastContacted: 'Sep 20, 2021', representative: { name: 'Donald Risher', initials: 'DR' }, status: 'Deal Won' as const, dealValue: '$100.1K' },
  { id: '2', name: 'Raitech Soft', lastContacted: 'Sep 23, 2021', representative: { name: 'Sofia Cunha', initials: 'SC' }, status: 'Intro Call' as const, dealValue: '$150K' },
  { id: '3', name: 'William PVT', lastContacted: 'Sep 27, 2021', representative: { name: 'Luis Rocha', initials: 'LR' }, status: 'Stuck' as const, dealValue: '$78.18K' },
  { id: '4', name: 'Loiusee LLP', lastContacted: 'Sep 30, 2021', representative: { name: 'Vitoria Rodrigues', initials: 'VR' }, status: 'Deal Won' as const, dealValue: '$180K' },
  { id: '5', name: 'Tech Solutions Inc.', lastContacted: 'Oct 02, 2021', representative: { name: 'Michael Brown', initials: 'MB' }, status: 'Negotiation' as const, dealValue: '$220.5K' },
  { id: '6', name: 'Innovate Group', lastContacted: 'Oct 05, 2021', representative: { name: 'Jessica Lee', initials: 'JL' }, status: 'New Lead' as const, dealValue: '$95K' },
];

const getStatusBadgeClass = (status: Deal['status']): string => {
  switch (status) {
    case 'Deal Won': return 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200';
    case 'Intro Call': return 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200';
    case 'Stuck': return 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200';
    case 'Negotiation': return 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200';
    case 'New Lead': return 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200';
  }
};

interface DealsStatusTableProps {
  className?: string;
}

const DealsStatusTable: React.FC<DealsStatusTableProps> = ({ className }) => {
  const [dateRange, setDateRange] = React.useState<string>('nov_dec_2021');

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Deals Status</CardTitle>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[230px]">
            <SelectValue placeholder="Select Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov_dec_2021">02 Nov 2021 to 31 Dec 2021</SelectItem>
            <SelectItem value="oct_2021">October 2021</SelectItem>
            <SelectItem value="all_time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead>Sales Representative</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground">{deal.lastContacted}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      {deal.representative.avatarUrl && <AvatarImage src={deal.representative.avatarUrl} alt={deal.representative.name} />}
                      <AvatarFallback>{deal.representative.initials}</AvatarFallback>
                    </Avatar>
                    <span>{deal.representative.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("font-normal", getStatusBadgeClass(deal.status))}>
                    {deal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{deal.dealValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealsStatusTable;
