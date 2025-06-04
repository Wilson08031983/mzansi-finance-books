
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface QuotationsStatsProps {
  quotations: any[];
}

const QuotationsStats: React.FC<QuotationsStatsProps> = ({ quotations }) => {
  const totalQuotations = quotations.length;
  const totalValue = quotations.reduce((sum, quotation) => sum + quotation.amount, 0);
  const acceptedQuotations = quotations.filter(q => q.status === 'accepted').length;
  const pendingQuotations = quotations.filter(q => q.status === 'sent' || q.status === 'viewed').length;
  const expiredQuotations = quotations.filter(q => q.status === 'expired').length;
  const conversionRate = totalQuotations > 0 ? Math.round((acceptedQuotations / totalQuotations) * 100) : 0;

  const stats = [
    {
      title: 'Total Quotations',
      value: totalQuotations,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Value',
      value: `R ${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+8.5%',
      changeType: 'positive'
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+3.2%',
      changeType: 'positive'
    },
    {
      title: 'Pending',
      value: pendingQuotations,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: '-2%',
      changeType: 'negative'
    },
    {
      title: 'Accepted',
      value: acceptedQuotations,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Expired',
      value: expiredQuotations,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: '-5%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300 hover-lift"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium font-sf-pro mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 font-sf-pro">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuotationsStats;
