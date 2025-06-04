
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  User,
  CheckCircle,
  AlertCircle,
  Building
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
  const activeClients = clients.filter(c => c.status === 'active').length;
  const overdueClients = clients.filter(c => c.status === 'overdue').length;
  const totalValue = clients.reduce((sum, client) => sum + client.totalValue, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 rounded-2xl shadow-colored">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 font-sf-pro">{clients.length}</p>
              <p className="text-slate-600 font-sf-pro text-sm">Total Clients</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-colored">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 font-sf-pro">{activeClients}</p>
              <p className="text-slate-600 font-sf-pro text-sm">Active Clients</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-colored">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 font-sf-pro">{overdueClients}</p>
              <p className="text-slate-600 font-sf-pro text-sm">Overdue</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 rounded-2xl shadow-colored">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 font-sf-pro">
                R{totalValue.toLocaleString()}
              </p>
              <p className="text-slate-600 font-sf-pro text-sm">Total Value</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsStats;
