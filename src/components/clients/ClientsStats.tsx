
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX, AlertTriangle } from 'lucide-react';

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
  const averageValue = totalClients > 0 ? totalValue / totalClients : 0;

  const stats = [
    {
      title: 'Total Clients',
      value: totalClients.toString(),
      icon: Users,
      color: 'from-mokm-blue-500 to-mokm-purple-500'
    },
    {
      title: 'Active Clients',
      value: activeClients.toString(),
      icon: UserCheck,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Inactive Clients',
      value: inactiveClients.toString(),
      icon: UserX,
      color: 'from-gray-500 to-gray-600'
    },
    {
      title: 'Overdue Clients',
      value: overdueClients.toString(),
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 font-sf-pro">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 font-sf-pro">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ClientsStats;
