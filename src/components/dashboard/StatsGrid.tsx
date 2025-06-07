
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

type StatItem = {
  name: string;
  value?: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  bgGradient: string;
};

interface StatsGridProps {
  stats: StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      {stats.map((stat, index) => (
        <Card key={index} className={`glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-500 hover-lift animate-fade-in delay-${index * 100} group overflow-hidden`}>
          <CardContent className="p-4 overflow-hidden">
            <div className="flex items-center justify-between" style={{ width: '100%' }}>
              <div style={{ width: 'calc(100% - 50px)' }}>
                <p className="text-sm font-medium text-slate-600 font-sf-pro">{stat.name}</p>
                <div className="mt-3">
                  <p className={`${stat.name === 'Total Revenue' ? 'text-xl' : 'text-2xl'} font-bold text-slate-900 font-sf-pro`}>
                    {stat.value}
                  </p>
                </div>
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
              <div className={`flex-shrink-0 rounded-xl bg-gradient-to-r ${stat.bgGradient} shadow-md`} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
