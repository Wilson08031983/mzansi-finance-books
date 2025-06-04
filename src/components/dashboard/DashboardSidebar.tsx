import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { 
  Settings,
  LogOut,
  X,
  BarChart3,
  FileText,
  Users,
  Receipt,
  Wallet,
  PieChart,
  Building2,
  UserCheck,
  Calculator
} from 'lucide-react';

const sidebarItems = [
  { title: 'Dashboard', icon: BarChart3, href: '/dashboard' },
  { title: 'My Company', icon: Building2, href: '/company' },
  { title: 'Clients', icon: Users, href: '/clients' },
  { title: 'HR Management', icon: UserCheck, href: '/hr-management' },
  { title: 'Invoices', icon: FileText, href: '/invoices' },
  { title: 'Quotations', icon: Receipt, href: '/quotations' },
  { title: 'Accounting', icon: Calculator, href: '/accounting' },
  { title: 'Expenses', icon: Wallet, href: '/expenses' },
  { title: 'Reports', icon: PieChart, href: '/reports' },
];

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-72 glass backdrop-blur-xl bg-white/80 border-r border-white/20 shadow-business-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
        <div className="flex items-center space-x-3 animate-fade-in">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-float overflow-hidden">
            <img 
              src="/lovable-uploads/8021eb93-6e6a-421e-a8ff-bed101269a7c.png" 
              alt="MOKMzansiBooks Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-mokm-orange-600 via-mokm-pink-600 to-mokm-purple-600 bg-clip-text text-transparent font-sf-pro">
            MOKMzansiBooks
          </span>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="h-6 w-6 text-slate-600" />
        </button>
      </div>

      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={index} className={`animate-fade-in delay-${100 + index * 100}`}>
                <Link
                  to={item.href}
                  className={`group flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-300 hover-lift ${
                    isActive 
                      ? 'bg-gradient-to-r from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 text-white shadow-colored-lg' 
                      : 'text-slate-700 hover:bg-white/50 hover:shadow-business'
                  }`}
                >
                  <item.icon className={`h-5 w-5 mr-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-mokm-purple-600'} transition-colors`} />
                  <span className="font-sf-pro">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-6 left-4 right-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-slate-700 hover:bg-white/50 hover:text-mokm-purple-600 transition-all duration-300 font-sf-pro">
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-slate-700 hover:bg-white/50 hover:text-mokm-orange-600 transition-all duration-300 font-sf-pro">
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
