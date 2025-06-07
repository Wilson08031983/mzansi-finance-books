import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  Banknote, 
  BookOpen, 
  ChevronRight, 
  ClipboardCheck, 
  Clock, 
  Landmark, 
  Layers, 
  Loader2, 
  Plus, 
  RefreshCw, 
  Tags, 
  User, 
  Users, 
  FilePlus,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard, 
  PieChart
} from 'lucide-react';
import { format, formatDistance, isThisMonth, parseISO } from 'date-fns';

// Helper formatter functions
const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch (error) {
    return dateString;
  }
};

// Import dashboard components
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardSidebarOverlay from '@/components/dashboard/DashboardSidebarOverlay';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import RevenueChart from '@/components/RevenueChart';
import ExpenseBreakdown from '@/components/ExpenseBreakdown';
import TaskList from '@/components/dashboard/TaskList';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import QuickActions from '@/components/QuickActions';
import SubscriptionBanner from '@/components/subscription/SubscriptionBanner';
import { useDashboardData } from '@/hooks/useDashboardData';

// Define TypeScript types
type StatItem = {
  title: string;
  value: string;
  changeText?: string;
  trending?: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
};

type MockQuotation = {
  id: string;
  clientName: string;
  date: string;
  amount: number;
  isNew?: boolean;
  status: string;
};

type ActivityItem = {
  id: number | string;
  type: 'invoice' | 'client' | 'quote' | 'expense' | string;
  action: string;
  subject: string;
  user: string;
  timestamp?: string;
  date?: string;
  link?: string;
};

type TaskItem = {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

type ChartDataItem = {
  label: string;
  value: number;
};

interface ExpenseCategoryItem {
  label: string;
  value: number;
  color?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { invoices, expenses, clients, quotations, loading } = useDashboardData();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [revenueData, setRevenueData] = useState<ChartDataItem[]>([]);
  const [expensesByCategory, setExpensesByCategory] = useState<ExpenseCategoryItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [period, setPeriod] = useState('month');
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Notification state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Invoice Paid',
      message: 'Client XYZ has paid invoice #INV-001',
      date: '2025-06-05T14:30:00',
      read: false
    },
    {
      id: '2',
      title: 'Quotation Accepted',
      message: 'Client ABC accepted quotation #QT-056',
      date: '2025-06-05T09:15:00',
      read: true
    },
    {
      id: '3',
      title: 'Upcoming Payment Due',
      message: 'Invoice #INV-042 is due in 3 days',
      date: '2025-06-04T16:45:00',
      read: false
    }
  ]);

  // Generate dashboard metrics based on mock data
  useEffect(() => {
    if (!loading) {
      // Calculate dashboard metrics
      const calculateDashboardMetrics = () => {
        // Total revenue calculation (all paid invoices)
        const totalRevenue = invoices
          .filter(invoice => invoice.status === 'paid')
          .reduce((acc, invoice) => acc + invoice.total, 0);

        // Current month revenue
        const currentMonthRevenue = invoices
          .filter(invoice => 
            invoice.status === 'paid' && 
            isThisMonth(parseISO(invoice.createdAt))
          )
          .reduce((acc, invoice) => acc + invoice.total, 0);

        // Pending invoices amount
        const pendingAmount = invoices
          .filter(invoice => invoice.status === 'sent' || invoice.status === 'overdue')
          .reduce((acc, invoice) => acc + invoice.total, 0);
          
        // Count pending invoices
        const pendingInvoicesCount = invoices
          .filter(invoice => invoice.status === 'sent' || invoice.status === 'overdue')
          .length;

        // Count new clients this month
        const newClientsThisMonth = clients
          .filter(client => isThisMonth(parseISO(client.createdAt)))
          .length;

        // Calculate quotation success rate
        const totalQuotations = quotations.length;
        const successfulQuotations = quotations.filter(quote => quote.status === 'accepted').length;
        const quotationSuccessRate = totalQuotations > 0 
          ? Math.round((successfulQuotations / totalQuotations) * 100) 
          : 0;

        // Generate stats items
        setStats([
          {
            title: 'Monthly Revenue',
            value: `R ${currentMonthRevenue.toLocaleString()}`,
            changeText: '+12.5% from last month',
            trending: 'up',
            icon: CreditCard
          },
          {
            title: 'Active Clients',
            value: `${clients.length}`,
            changeText: `${newClientsThisMonth} new this month`,
            trending: 'up',
            icon: Users
          },
          {
            title: 'Pending Invoices',
            value: `R ${pendingAmount.toLocaleString()}`,
            changeText: `${pendingInvoicesCount} invoices awaiting payment`,
            trending: 'neutral',
            icon: FileText
          },
          {
            title: 'Quotation Success',
            value: `${quotationSuccessRate}%`,
            changeText: `${successfulQuotations} out of ${totalQuotations}`,
            trending: 'neutral',
            icon: PieChart
          }
        ]);

        // Generate revenue chart data (last 6 months)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        setRevenueData(months.map((month, index) => ({
          label: month,
          value: Math.floor(15000 + Math.random() * 30000) // Placeholder random values
        })));

        // Generate expense breakdown by category
        const categoryTotals: Record<string, number> = {};
        expenses.forEach(expense => {
          if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += expense.amount;
          } else {
            categoryTotals[expense.category] = expense.amount;
          }
        });

        // Set colors for expense categories
        const categoryColors: Record<string, string> = {
          'Office': '#4f46e5',
          'Travel': '#ec4899',
          'Software': '#06b6d4',
          'Connectivity': '#8b5cf6',
          'Tax': '#f59e0b',
          'Other': '#64748b'
        };

        setExpensesByCategory(Object.keys(categoryTotals).map(category => ({
          label: category,
          value: categoryTotals[category],
          color: categoryColors[category] || '#64748b' // Default gray for uncategorized
        })));

        // Generate recent activities
        const recentActivities: ActivityItem[] = [
          ...invoices.slice(0, 2).map(invoice => ({
            id: `invoice-${invoice.id}`,
            user: invoice.clientName,
            action: invoice.status === 'paid' ? 'paid' : 'received',
            subject: `Invoice #${invoice.invoiceNumber}`,
            timestamp: invoice.createdAt,
            date: formatDate(invoice.createdAt),
            type: 'invoice',
            link: `/invoices/${invoice.id}`
          })),
          ...clients.slice(0, 2).map(client => ({
            id: `client-${client.id}`,
            user: 'You',
            action: 'added',
            subject: client.name,
            timestamp: client.createdAt,
            type: 'client',
            link: `/clients/${client.id}`
          })),
          ...quotations.slice(0, 1).map(quote => ({
            id: `quote-${quote.id}`,
            user: 'You',
            action: 'sent quote to',
            subject: quote.clientName,
            timestamp: quote.createdAt,
            type: 'quote',
            link: `/quotations/${quote.id}`
          }))
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

        setActivities(recentActivities);

        // Generate upcoming tasks
        const upcomingTasks: TaskItem[] = [
          {
            id: '1',
            title: 'Follow up on overdue invoice from Woolworths SA',
            dueDate: new Date(Date.now() + 86400000).toISOString(),
            priority: 'high'
          },
          {
            id: '2',
            title: 'Prepare quotation for Nedbank Group',
            dueDate: new Date(Date.now() + 172800000).toISOString(),
            priority: 'medium'
          },
          {
            id: '3',
            title: 'Schedule meeting with Standard Bank for project review',
            dueDate: new Date(Date.now() + 345600000).toISOString(),
            priority: 'low'
          }
        ];

        setTasks(upcomingTasks);
      };

      calculateDashboardMetrics();
    }
  }, [loading, invoices, expenses, clients, quotations]);
  
  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Handle navigation for quick actions
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Create Invoice':
        navigate('/invoices/create');
        break;
      case 'Add Client':
        navigate('/clients/add');
        break;
      case 'New Quotation':
        navigate('/quotations/create');
        break;
      case 'Record Expense':
        navigate('/expenses/add');
        break;
      default:
        console.log(`Action not implemented: ${action}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex relative">
      {/* Sidebar */}
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 relative isolate overflow-auto">
        {/* Header - Fixed at top with high z-index */}
        <div className="sticky top-0 z-40 w-full">
          <DashboardHeader 
            setSidebarOpen={setSidebarOpen}
            notificationsOpen={notificationsOpen}
            setNotificationsOpen={setNotificationsOpen}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
        
        {/* Main Dashboard Container - Proper spacing to avoid overlapping */}
        <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
          {/* Subscription Banner - Shows trial status or payment issues */}
          <SubscriptionBanner />
          
          {/* Welcome and Refresh Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700">Welcome back, Wilson!</h1>
            <button 
              onClick={handleRefresh} 
              className="px-4 py-2 rounded-lg bg-white text-mokm-purple-600 border border-gray-200 hover:bg-mokm-purple-50 hover:border-mokm-purple-200 transition-all flex items-center gap-2 shadow-sm"
              disabled={isRefreshing}
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>

          {/* Stats Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={`stat-${index}`}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <h3 className="text-xl font-semibold text-gray-900">{stat.value}</h3>
                    {stat.changeText && (
                      <p className={`text-xs flex items-center mt-1 ${stat.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.trending === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        <span className="ml-1">{stat.changeText}</span>
                      </p>
                    )}
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100">
                    <stat.icon size={20} className="text-gray-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section - Revenue and Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Revenue Overview - 2/3 width */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full min-h-[400px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button 
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${period === 'week' ? 'bg-white text-mokm-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setPeriod('week')}
                    >
                      Week
                    </button>
                    <button 
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${period === 'month' ? 'bg-white text-mokm-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setPeriod('month')}
                    >
                      Month
                    </button>
                    <button 
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${period === 'year' ? 'bg-white text-mokm-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setPeriod('year')}
                    >
                      Year
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <RevenueChart data={revenueData} />
                </div>
              </div>
            </div>

            {/* Expense Breakdown - Takes 1/3 of the screen on large displays */}
            <div className="lg:col-span-1">
              <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full min-h-[400px] overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Expense Breakdown</h3>
                <div className="h-full">
                  <ExpenseBreakdown data={expensesByCategory} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Tasks and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Tasks List */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-semibold text-gray-800">Upcoming Tasks</h3>
                    <button className="text-mokm-purple-600 hover:text-mokm-purple-800 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <TaskList tasks={tasks} />
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                    <button className="text-mokm-purple-600 hover:text-mokm-purple-800 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <ActivityFeed activities={activities} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2">
                <FileText size={24} className="text-mokm-purple-600" />
                <span className="text-sm font-medium text-gray-700">New Invoice</span>
              </button>
              <button className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2">
                <Users size={24} className="text-mokm-blue-600" />
                <span className="text-sm font-medium text-gray-700">Add Client</span>
              </button>
              <button className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2">
                <FileText size={24} className="text-mokm-orange-600" />
                <span className="text-sm font-medium text-gray-700">New Quote</span>
              </button>
              <button className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2">
                <DollarSign size={24} className="text-mokm-pink-600" />
                <span className="text-sm font-medium text-gray-700">Record Expense</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <DashboardSidebarOverlay sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default Dashboard;
