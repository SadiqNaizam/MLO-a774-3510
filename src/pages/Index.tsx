import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import SalesForecastChart from '@/components/Dashboard/SalesForecastChart';
import DealTypeChart from '@/components/Dashboard/DealTypeChart';
import BalanceOverview from '@/components/Dashboard/BalanceOverview';
import DealsStatusTable from '@/components/Dashboard/DealsStatusTable';
import TasksWidget from '@/components/Dashboard/TasksWidget';
import { ChevronRight } from 'lucide-react';

const CrmDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      {/* Page Header & Breadcrumbs */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-semibold text-foreground">CRM Dashboard</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Dashboards</span>
          <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
          <span className="text-foreground">CRM</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Stats Cards Grid */}
        <StatsCardGrid />

        {/* Sales Forecast & Deal Type Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesForecastChart />
          <DealTypeChart />
        </div>

        {/* Balance Overview Chart */}
        <BalanceOverview />

        {/* Deals Status Table & Tasks Widget */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <DealsStatusTable className="xl:col-span-2" />
          <TasksWidget className="xl:col-span-1" />
        </div>
      </div>
    </AdminLayout>
  );
};

export default CrmDashboardPage;
