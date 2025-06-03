
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

// Temporary placeholder for sidebarItems - will be connected later
const sidebarItems = [
  { title: 'Dashboard', active: true, icon: BarChart3 },
  { title: 'Invoices', active: false, icon: FileText },
  { title: 'Clients', active: false, icon: Users },
  { title: 'Quotations', active: false, icon: Receipt },
  { title: 'Expenses', active: false, icon: Wallet },
  { title: 'Reports', active: false, icon: PieChart },
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
      {/* Sidebar with Glass Effect */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 glass backdrop-blur-xl bg-white/80 border-r border-white/20 shadow-business-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 rounded-xl flex items-center justify-center shadow-colored-lg animate-float">
              <span className="text-white font-bold text-lg font-sf-pro">M</span>
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
            {sidebarItems.map((item, index) => (
              <li key={index} className={`animate-fade-in delay-${100 + index * 100}`}>
                <a
                  href="#"
                  className={`group flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-300 hover-lift ${
                    item.active 
                      ? 'bg-gradient-to-r from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 text-white shadow-colored-lg' 
                      : 'text-slate-700 hover:bg-white/50 hover:shadow-business'
                  }`}
                >
                  <item.icon className={`h-5 w-5 mr-4 ${item.active ? 'text-white' : 'text-slate-500 group-hover:text-mokm-purple-600'} transition-colors`} />
                  <span className="font-sf-pro">{item.title}</span>
                </a>
              </li>
            ))}
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

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header with Glass Effect */}
        <header className="glass backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-business animate-slide-up">
          <div className="flex items-center justify-between h-20 px-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Menu className="h-6 w-6 text-slate-600" />
              </button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-mokm-orange-600 via-mokm-pink-600 to-mokm-purple-600 bg-clip-text text-transparent font-sf-pro">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative hover:bg-white/20 transition-colors">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 rounded-full animate-pulse"></span>
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-mokm-purple-500 to-mokm-blue-500 rounded-full flex items-center justify-center shadow-colored animate-float">
                <span className="text-white font-semibold font-sf-pro">W</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Welcome Message and Controls */}
          <div className="flex items-center justify-between mb-10 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3 font-sf-pro">Welcome back, Wilson!</h2>
              <p className="text-slate-600 text-lg font-sf-pro">Here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center space-x-6">
              {/* Notifications with Glass Effect */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative glass backdrop-blur-sm bg-white/50 hover:bg-white/70 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300"
                >
                  <Bell className="h-5 w-5 text-slate-600" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </Button>
                
                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 glass backdrop-blur-xl bg-white/90 rounded-2xl shadow-business-xl border border-white/20 z-50 animate-scale-in">
                    <div className="p-6 border-b border-white/10">
                      <h3 className="font-bold text-slate-900 font-sf-pro">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-white/5 hover:bg-white/20 transition-colors ${!notification.read ? 'bg-gradient-to-r from-mokm-orange-50/50 to-mokm-pink-50/50' : ''}`}>
                          <p className="font-medium text-sm text-slate-900 font-sf-pro">{notification.title}</p>
                          <p className="text-sm text-slate-600 font-sf-pro">{notification.message}</p>
                          <p className="text-xs text-slate-500 mt-1 font-sf-pro">{notification.date}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 text-center border-t border-white/10">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                          setNotificationsOpen(false);
                        }}
                        className="text-mokm-purple-600 hover:bg-mokm-purple-50 font-sf-pro"
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
                className="px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 shadow-business hover:shadow-business-lg transition-all duration-300 font-sf-pro"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {/* Stats Grid with Glass Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {stats.map((stat, index) => (
              <Card key={index} className={`glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-500 hover-lift animate-fade-in delay-${index * 100} group`}>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 font-sf-pro">{stat.name}</p>
                      <p className="text-3xl font-bold text-slate-900 mt-3 font-sf-pro">{stat.value}</p>
                      {stat.change && (
                        <p className={`text-sm mt-2 flex items-center font-medium font-sf-pro ${stat.color}`}>
                          {stat.trend === 'up' ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {stat.change}
                        </p>
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.bgGradient} shadow-colored group-hover:shadow-colored-lg transition-all duration-300 group-hover:scale-110`}>
                      <stat.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
            {/* Recent Activity */}
            <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-slate-900 font-sf-pro">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-sf-pro text-lg">No recent activity</p>
                    <p className="text-sm text-slate-400 mt-2 font-sf-pro">Your business activity will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={activity.id} className={`flex items-start space-x-4 p-4 rounded-xl hover:bg-white/30 transition-all duration-300 animate-fade-in delay-${index * 100}`}>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                          activity.type === 'client' ? 'from-mokm-blue-500 to-mokm-purple-500' :
                          activity.type === 'invoice' ? 'from-mokm-orange-500 to-mokm-pink-500' :
                          'from-mokm-purple-500 to-mokm-pink-500'
                        } flex items-center justify-center shadow-colored`}>
                          {activity.type === 'client' && <Users className="h-5 w-5 text-white" />}
                          {activity.type === 'invoice' && <FileText className="h-5 w-5 text-white" />}
                          {activity.type === 'quotation' && <Receipt className="h-5 w-5 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900 font-sf-pro">
                            <span className="font-medium">{activity.user}</span> {activity.action} {activity.subject}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 font-sf-pro">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-slate-900 font-sf-pro">Upcoming Tasks</span>
                  <Button variant="ghost" size="sm" className="hover:bg-mokm-purple-100 hover:text-mokm-purple-600 transition-colors">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-sf-pro text-lg">No upcoming tasks</p>
                    <p className="text-sm text-slate-400 mt-2 font-sf-pro">Your tasks will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task, index) => (
                      <div key={task.id} className={`p-4 rounded-xl border border-white/20 hover:border-mokm-purple-300/50 hover:bg-white/20 transition-all duration-300 animate-fade-in delay-${index * 100}`}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-900 font-sf-pro">{task.title}</p>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            task.priority === 'high' ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-700' :
                            task.priority === 'medium' ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700' :
                            'bg-gradient-to-r from-green-100 to-green-200 text-green-700'
                          } font-sf-pro`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center mt-3 text-xs text-slate-500 font-sf-pro">
                          <Calendar className="h-3 w-3 mr-2" />
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
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
