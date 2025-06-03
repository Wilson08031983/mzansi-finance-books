import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Users, 
  FileText, 
  TrendingUp, 
  Plus, 
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';
import QuickActions from '@/components/QuickActions';
import RevenueChart from '@/components/RevenueChart';
import ExpenseBreakdown from '@/components/ExpenseBreakdown';
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

// Temporary placeholder for sidebarItems - will be connected later
const sidebarItems = [
  { title: 'Dashboard', active: true },
  { title: 'Invoices', active: false },
  { title: 'Clients', active: false },
  { title: 'Quotations', active: false },
  { title: 'Expenses', active: false },
  { title: 'Reports', active: false },
];

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
      
      // Set stats with real values
      setStats([
        { 
          name: 'Total Revenue', 
          value: formatCurrency(totalRevenue), 
          change: '+8.2%', 
          trend: 'up', 
          icon: DollarSign, 
          color: 'text-green-600' 
        },
        { 
          name: 'Active Clients', 
          value: formatNumber(clientCount), 
          change: '+12', 
          trend: 'up', 
          icon: Users, 
          color: 'text-blue-600' 
        },
        { 
          name: 'Pending Invoices', 
          value: formatNumber(invoices.filter(i => i.status === 'sent').length), 
          change: formatCurrency(invoices.filter(i => i.status === 'sent').reduce((sum, i) => sum + i.total, 0)), 
          trend: 'up', 
          icon: FileText, 
          color: 'text-orange-600' 
        },
        { 
          name: 'Monthly Growth', 
          value: '12.5%', 
          change: '+2.1%', 
          trend: 'up', 
          icon: TrendingUp, 
          color: 'text-purple-600' 
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">MOKMzansiBooks</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-700">
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700">
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-6 w-6 text-gray-400" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5 text-gray-400" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">W</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Message and Controls */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Wilson!</h2>
              <p className="text-gray-600">Here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="h-5 w-5 text-gray-400" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </Button>
                
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                          setNotificationsOpen(false);
                        }}
                      >
                        Mark all as read
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      {stat.change && (
                        <p className={`text-sm mt-1 flex items-center ${stat.color}`}>
                          {stat.trend === 'up' ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {stat.change}
                        </p>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-50`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <QuickActions />
          </div>

          {/* Charts and Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <RevenueChart data={revenueData} />
            </div>
            <div>
              <ExpenseBreakdown data={expensesByCategory} />
            </div>
          </div>

          {/* Recent Activity and Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No recent activity</p>
                    <p className="text-sm text-gray-400 mt-1">Your business activity will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          {activity.type === 'client' && <Users className="h-4 w-4 text-purple-600" />}
                          {activity.type === 'invoice' && <FileText className="h-4 w-4 text-purple-600" />}
                          {activity.type === 'quotation' && <Receipt className="h-4 w-4 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{activity.user}</span> {activity.action} {activity.subject}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Upcoming Tasks</span>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming tasks</p>
                    <p className="text-sm text-gray-400 mt-1">Your tasks will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className="p-3 rounded-lg border border-gray-200 hover:border-purple-300">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          Due: {task.dueDate}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
