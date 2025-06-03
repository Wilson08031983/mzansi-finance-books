import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  FileText, 
  TrendingUp
} from 'lucide-react';
import QuickActions from '@/components/QuickActions';
import RevenueChart from '@/components/RevenueChart';
import ExpenseBreakdown from '@/components/ExpenseBreakdown';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsGrid from '@/components/dashboard/StatsGrid';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import TaskList from '@/components/dashboard/TaskList';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatCurrency, formatNumber, formatDate } from '@/utils/formatters';

// Define TypeScript types
type StatItem = {
  name: string;
  value?: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  bgGradient: string;
};

type ActivityItem = {
  id: number | string;
  type: 'client' | 'quotation' | 'invoice' | 'user';
  action: string;
  subject: string;
  date: string;
  user: string;
};

type TaskItem = {
  id: number | string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [period, setPeriod] = useState('month');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Get data from our custom hook
  const { invoices, expenses, clients, quotations, loading } = useDashboardData();

  // State for computed data
  const [stats, setStats] = useState<StatItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [revenueData, setRevenueData] = useState<{ label: string; value: number }[]>([]);
  const [expensesByCategory, setExpensesByCategory] = useState<{ label: string; value: number }[]>([]);
  const [notifications, setNotifications] = useState<{id: string; title: string; message: string; date: string; read: boolean}[]>([]);

  // Process data when dependencies change
  useEffect(() => {
    if (!loading) {
      // Calculate stats from real data
      const totalRevenue = invoices
        .filter(invoice => invoice.status === 'paid')
        .reduce((sum, invoice) => sum + invoice.total, 0);
        
      const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      const clientCount = clients.length;
      const quotationCount = quotations.length;
      
      // Set stats with real values and MOKMzansiBooks brand colors
      setStats([
        { 
          name: 'Total Revenue', 
          value: formatCurrency(totalRevenue), 
          change: '+8.2%', 
          trend: 'up', 
          icon: DollarSign, 
          color: 'text-mokm-orange-600',
          bgGradient: 'from-mokm-orange-500 to-mokm-pink-500'
        },
        { 
          name: 'Active Clients', 
          value: formatNumber(clientCount), 
          change: '+12', 
          trend: 'up', 
          icon: Users, 
          color: 'text-mokm-blue-600',
          bgGradient: 'from-mokm-blue-500 to-mokm-purple-500'
        },
        { 
          name: 'Pending Invoices', 
          value: formatNumber(invoices.filter(i => i.status === 'sent').length), 
          change: formatCurrency(invoices.filter(i => i.status === 'sent').reduce((sum, i) => sum + i.total, 0)), 
          trend: 'up', 
          icon: FileText, 
          color: 'text-mokm-purple-600',
          bgGradient: 'from-mokm-purple-500 to-mokm-pink-500'
        },
        { 
          name: 'Monthly Growth', 
          value: '12.5%', 
          change: '+2.1%', 
          trend: 'up', 
          icon: TrendingUp, 
          color: 'text-mokm-pink-600',
          bgGradient: 'from-mokm-pink-500 to-mokm-orange-500'
        }
      ]);

      // Generate recent activities
      const recentInvoices = invoices.slice(0, 2).map(invoice => ({
        id: invoice.id,
        type: 'invoice' as const,
        action: 'created invoice',
        subject: `${invoice.invoiceNumber} for ${invoice.clientName}`,
        date: formatDate(invoice.createdAt),
        user: 'You'
      }));
      
      const recentClients = clients.slice(0, 2).map(client => ({
        id: client.id,
        type: 'client' as const,
        action: 'added client',
        subject: client.name,
        date: formatDate(client.createdAt),
        user: 'You'
      }));
      
      setActivities([...recentInvoices, ...recentClients]);

      // Generate tasks from overdue invoices
      const overdueTasks = invoices
        .filter(invoice => invoice.status === 'sent')
        .map(invoice => ({
          id: invoice.id,
          title: `Follow up on ${invoice.invoiceNumber} - ${invoice.clientName}`,
          dueDate: formatDate(invoice.dueDate),
          priority: 'high' as const
        }));
        
      setTasks(overdueTasks);

      // Generate revenue chart data
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const revenueByMonth = months.map(month => ({
        label: month,
        value: Math.floor(Math.random() * 50000) + 10000
      }));
      setRevenueData(revenueByMonth);

      // Generate expense breakdown
      const categories = [
        { label: 'Office', value: 12000 },
        { label: 'Travel', value: 8500 },
        { label: 'Meals', value: 4200 },
        { label: 'Software', value: 6800 },
        { label: 'Other', value: 3500 }
      ];
      setExpensesByCategory(categories);

      // Generate notifications
      setNotifications([
        {
          id: '1',
          title: 'New invoice payment',
          message: 'Payment received for INV-001',
          date: formatDate(new Date().toISOString()),
          read: false
        },
        {
          id: '2',
          title: 'Quotation viewed',
          message: 'ABC Corp viewed your quotation',
          date: formatDate(new Date(Date.now() - 86400000).toISOString()),
          read: true
        }
      ]);
    }
  }, [loading, invoices, expenses, clients, quotations, period]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 mx-auto"></div>
            <div className="absolute inset-2 bg-white rounded-full"></div>
          </div>
          <p className="mt-6 text-slate-600 font-sf-pro text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex">
      {/* Sidebar */}
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <DashboardHeader 
          setSidebarOpen={setSidebarOpen}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          notifications={notifications}
          setNotifications={setNotifications}
        />

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Welcome Message and Controls */}
          <WelcomeSection period={period} setPeriod={setPeriod} />

          {/* Stats Grid */}
          <StatsGrid stats={stats} />

          {/* Quick Actions */}
          <div className="mb-10 animate-fade-in delay-400">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 font-sf-pro">Quick Actions</h3>
            <QuickActions />
          </div>

          {/* Charts and Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 animate-fade-in delay-500">
            <div className="lg:col-span-2">
              <RevenueChart data={revenueData} />
            </div>
            <div>
              <ExpenseBreakdown data={expensesByCategory} />
            </div>
          </div>

          {/* Recent Activity and Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in delay-600">
            <ActivityFeed activities={activities} />
            <TaskList tasks={tasks} />
          </div>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
