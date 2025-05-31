import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, className }) => {
  // Example: state for toggling sidebar on mobile, can be passed to TopHeader and SidebarNav if needed
  // const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <SidebarNav />
      {/* The SidebarNav is fixed positioned, so this div effectively starts after it for flow content if SidebarNav wasn't fixed. */}
      {/* With fixed SidebarNav, main content needs ml-64 to not be overlapped. */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        <TopHeader /> {/* TopHeader is fixed, its left offset is managed via 'md:left-64' class */} 
        <main className="flex-grow p-6 mt-[70px] min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
