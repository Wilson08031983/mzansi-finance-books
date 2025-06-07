import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CreditCard, Users, FileText, PieChart, RefreshCw } from 'lucide-react';
import { format, formatDistance, isThisMonth, parseISO } from 'date-fns';

// Import dashboard components
import RevenueChart from '@/components/RevenueChart';
import ExpenseBreakdown from '@/components/ExpenseBreakdown';
import TaskList from '@/components/dashboard/TaskList';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import QuickActions from '@/components/QuickActions';
import { useDashboardData } from '@/hooks/useDashboardData';

// Define TypeScript interfaces for dashboard components
interface StatItem {
  title: string;
  value: string;
  changeText: string;
  trending: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  subject: string;
  timestamp: string;
  type: 'invoice' | 'client' | 'quote' | 'expense';
  link: string;
}

interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface ChartDataItem {
  label: string;
  value: number;
}

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
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button 
          onClick={handleRefresh} 
          className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow hover:bg-gray-50"
          disabled={loading || isRefreshing}
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          <span className="ml-2 text-lg text-gray-600">Loading dashboard data...</span>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow p-4 transition-transform hover:scale-[1.02] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-full ${
                    stat.trending === 'up' 
                      ? 'bg-green-50 text-green-500' 
                      : stat.trending === 'down' 
                        ? 'bg-red-50 text-red-500' 
                        : 'bg-gray-50 text-gray-500'
                  }`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-xs mt-2 text-gray-500">{stat.changeText}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Revenue Overview</h2>
                <button 
                  className="text-sm text-purple-600 hover:text-purple-800"
                  onClick={() => navigate('/reports/revenue')}
                >
                  View Full Report
                </button>
              </div>
              <div className="h-64">
                <RevenueChart data={revenueData} />
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Expense Breakdown</h2>
                <button 
                  className="text-sm text-purple-600 hover:text-purple-800"
                  onClick={() => navigate('/expenses')}
                >
                  View Details
                </button>
              </div>
              <div className="h-64">
                <ExpenseBreakdown data={expensesByCategory} />
              </div>
            </div>
          </div>

          {/* Activity and Tasks Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Activity Feed */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
              <ActivityFeed activities={activities} />
            </div>

            {/* Tasks List */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Upcoming Tasks</h2>
              <TaskList tasks={tasks} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <QuickActions onActionClick={handleQuickAction} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
