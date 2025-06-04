
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  UserCheck,
  UserX,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  totalValue: number;
  lastActivity: string;
  status: string;
  type: string;
  avatar: string;
}

interface ClientsStatsProps {
  clients: Client[];
}

const ClientsStats = ({ clients }: ClientsStatsProps) => {
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.status === 'active').length;
  const inactiveClients = clients.filter(client => client.status === 'inactive').length;
  const overdueClients = clients.filter(client => client.status === 'overdue').length;
  const totalValue = clients.reduce((sum, client) => sum + client.totalValue, 0);

  const stats = [
    {
      title: 'Total Clients',
      value: totalClients,
      icon: Users,
      color: 'bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500',
      textColor: 'text-white'
    },
    {
      title: 'Active Clients',
      value: activeClients,
      icon: UserCheck,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      textColor: 'text-white'
    },
    {
      title: 'Inactive Clients',
      value: inactiveClients,
      icon: UserX,
      color: 'bg-gradient-to-r from-gray-500 to-slate-500',
      textColor: 'text-white'
    },
    {
      title: 'Overdue',
      value: overdueClients,
      icon: AlertTriangle,
      color: 'bg-gradient-to-r from-red-500 to-pink-500',
      textColor: 'text-white'
    },
    {
      title: 'Total Value',
      value: `R${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 animate-fade-in">
      {stats.map((stat, index) => (
        <Card 
          key={index}
          className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300 hover-lift"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-sf-pro mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 font-sf-pro">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center shadow-colored`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ClientsStats;
