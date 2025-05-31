import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Gauge, BarChart3, Users, ShoppingCart, Bitcoin, AppWindow, Image as ImageIcon, Briefcase, Newspaper,
  LayoutGrid, Lock, FileStack, Rocket, ComponentIcon as Component, Box, ToyBrick, ClipboardList,
  ChevronDown, ChevronRight, Circle, Layers
} from 'lucide-react';

interface NavItemProps {
  item: NavItemConfig;
  activePath: string;
  onToggle?: (key: string) => void;
  isOpen?: boolean;
  isChild?: boolean;
}

interface NavItemConfig {
  key: string;
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: { text: string; type: 'new' | 'hot' };
  children?: NavItemConfig[];
}

interface NavSectionConfig {
  type: 'groupLabel' | 'itemsList';
  label?: string; // For groupLabel
  items?: NavItemConfig[]; // For itemsList
}

const NavItem: React.FC<NavItemProps> = ({ item, activePath, onToggle, isOpen, isChild = false }) => {
  const isActive = activePath === item.href || (activePath.startsWith(item.href) && item.href !== '/');
  const hasChildren = item.children && item.children.length > 0;

  const linkClasses = cn(
    'flex items-center justify-between w-full text-sm px-4 py-2.5 rounded-md',
    'hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground',
    isActive && !hasChildren ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' : 'text-sidebar-foreground/80',
    isActive && hasChildren ? 'text-sidebar-foreground font-medium' : '',
    isChild ? 'pl-10 pr-2 py-2' : 'px-3.5 py-2.5'
  );

  const content = (
    <>
      <div className="flex items-center space-x-3">
        <item.icon className={cn('h-5 w-5', isActive && !hasChildren ? 'text-primary-foreground' : (isActive && hasChildren ? 'text-primary' : ''))} />
        <span className="flex-grow whitespace-nowrap">{item.label}</span>
      </div>
      <div className="flex items-center space-x-2">
        {item.badge && (
          <Badge
            variant="default"
            className={cn(
              'h-5 px-1.5 text-xs font-semibold',
              item.badge.type === 'new' ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground'
            )}
          >
            {item.badge.text}
          </Badge>
        )}
        {hasChildren && (isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
      </div>
    </>
  );

  if (hasChildren) {
    return (
      <div>
        <button type="button" className={linkClasses} onClick={() => onToggle?.(item.key)}>
          {content}
        </button>
        {isOpen && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => (
              <NavItem key={child.key} item={child} activePath={activePath} onToggle={onToggle} isOpen={isOpen} isChild />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link to={item.href} className={linkClasses}>
      {content}
    </Link>
  );
};

const navigationConfig: NavSectionConfig[] = [
  {
    type: 'itemsList',
    items: [
      {
        key: 'dashboards',
        label: 'Dashboards',
        icon: Gauge,
        href: '#!', // Parent items don't navigate directly usually
        children: [
          { key: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
          { key: 'crm', label: 'CRM', icon: Users, href: '/crm' },
          { key: 'ecommerce', label: 'Ecommerce', icon: ShoppingCart, href: '/ecommerce' },
          { key: 'crypto', label: 'Crypto', icon: Bitcoin, href: '/crypto' },
          { key: 'projects', label: 'Projects', icon: AppWindow, href: '/projects' },
          { key: 'nft', label: 'NFT', icon: ImageIcon, href: '/nft' },
          { key: 'job', label: 'Job', icon: Briefcase, href: '/job' },
          { key: 'blog_nav', label: 'Blog', icon: Newspaper, href: '/blog', badge: { text: 'New', type: 'new' } }, 
        ],
      },
      { key: 'apps', label: 'Apps', icon: AppWindow, href: '/apps', children: [] }, // Example, make collapsible if needed
      { key: 'layouts', label: 'Layouts', icon: LayoutGrid, href: '/layouts', badge: { text: 'Hot', type: 'hot' }, children: [] }, // Example
    ],
  },
  { type: 'groupLabel', label: 'PAGES' },
  {
    type: 'itemsList',
    items: [
      { key: 'authentication', label: 'Authentication', icon: Lock, href: '/auth', children: [] },
      { key: 'pages_examples', label: 'Pages', icon: FileStack, href: '/pages', children: [] },
      { key: 'landing', label: 'Landing', icon: Rocket, href: '/landing', children: [] },
    ],
  },
  { type: 'groupLabel', label: 'COMPONENTS' },
  {
    type: 'itemsList',
    items: [
      { key: 'base_ui', label: 'Base UI', icon: Component, href: '/base-ui', children: [] },
      { key: 'advance_ui', label: 'Advance UI', icon: Box, href: '/advance-ui', children: [] },
      { key: 'widgets', label: 'Widgets', icon: ToyBrick, href: '/widgets', children: [] },
      { key: 'forms', label: 'Forms', icon: ClipboardList, href: '/forms', children: [] },
    ],
  },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const location = useLocation();
  const activePath = location.pathname; // In a real app, this would come from router
  
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const initialOpen: Record<string, boolean> = {};
    // Find initially open parent based on activePath, e.g., 'dashboards' for '/crm'
    navigationConfig.forEach(section => {
      if (section.items) {
        section.items.forEach(item => {
          if (item.children && item.children.some(child => activePath.startsWith(child.href))) {
            initialOpen[item.key] = true;
          }
          // Default open 'dashboards' if CRM is active
          if(item.key === 'dashboards' && activePath.startsWith('/crm')) {
            initialOpen[item.key] = true;
          }
        });
      }
    });
    if (!initialOpen['dashboards'] && activePath.startsWith('/crm')) {
        initialOpen['dashboards'] = true; // Ensure Dashboards is open for CRM
    }
    return initialOpen;
  });

  const handleToggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className={cn("w-64 bg-sidebar text-sidebar-foreground fixed top-0 left-0 h-screen flex flex-col z-20", className)}>
      <div className="h-[70px] flex items-center px-6 border-b border-sidebar-foreground/10">
        <Link to="/" className="flex items-center space-x-2">
          <Layers className="h-7 w-7 text-primary" />
          <span className="font-semibold text-xl text-sidebar-foreground">VELZON</span>
        </Link>
      </div>

      <div className="p-4 border-b border-sidebar-foreground/10">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="Anna Adame" />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">Anna Adame</p>
            <div className="flex items-center space-x-1.5">
              <Circle className="h-2 w-2 fill-accent text-accent" />
              <p className="text-xs text-sidebar-foreground/70">Online</p>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1.5">
          {navigationConfig.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`}>
              {section.type === 'groupLabel' && section.label && (
                <p className="px-4 pt-3 pb-1.5 text-xs font-semibold uppercase text-sidebar-foreground/50 tracking-wider">
                  {section.label}
                </p>
              )}
              {section.type === 'itemsList' && section.items && section.items.map(item => (
                <NavItem
                  key={item.key}
                  item={item}
                  activePath={activePath}
                  onToggle={handleToggle}
                  isOpen={!!openItems[item.key]}
                />
              ))}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default SidebarNav;
