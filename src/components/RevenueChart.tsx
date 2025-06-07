
import React, { useState, useEffect } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '@/hooks/useDashboardData';

interface RevenueChartProps {
  data: { label: string; value: number }[];
  onViewFullReport?: () => void;
}

const chartConfig = {
  value: {
    label: "Revenue",
    color: "#a855f7",
  },
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data, onViewFullReport }) => {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState<'revenue' | 'expenses'>('revenue');
  const [chartData, setChartData] = useState(data);
  const { invoices, expenses } = useDashboardData();
  
  useEffect(() => {
    if (chartType === 'revenue') {
      setChartData(data);
    } else {
      // Group expenses by month and calculate totals
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const expenseData = months.map(month => {
        // In a real app, we'd filter expenses by month
        // For now using sample data with decreasing values
        const monthIndex = months.indexOf(month);
        return {
          label: month,
          value: 85000 - (monthIndex * 8000) + Math.random() * 5000
        };
      });
      setChartData(expenseData);
    }
  }, [chartType, data, expenses]);
  
  const handleViewFullReport = () => {
    if (onViewFullReport) {
      onViewFullReport();
    } else {
      // Navigate to reports page if no callback provided
      navigate('/reports');
    }
  };
  return (
    <div className="h-full w-full">
      <div className="flex justify-end mb-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setChartType('revenue')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all font-sf-pro ${chartType === 'revenue' 
              ? 'bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 text-white shadow-sm' 
              : 'bg-white/50 text-slate-600 hover:bg-white/70 border border-white/20'}`}
          >
            Revenue
          </button>
          <button 
            onClick={() => setChartType('expenses')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all font-sf-pro ${chartType === 'expenses' 
              ? 'bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 text-white shadow-sm' 
              : 'bg-white/50 text-slate-600 hover:bg-white/70 border border-white/20'}`}
          >
            Expenses
          </button>
        </div>
      </div>
      
      <div className="h-[300px]">
        <ChartContainer config={chartConfig} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                {chartType === 'revenue' ? (
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                ) : (
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                )}
              </defs>
              <XAxis 
                dataKey="label" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'SF Pro Display' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'SF Pro Display' }}
                tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-300"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button 
          onClick={handleViewFullReport}
          className="px-4 py-2 text-xs font-medium rounded-lg text-mokm-purple-600 hover:text-mokm-purple-700 bg-mokm-purple-50 hover:bg-mokm-purple-100 transition-all font-sf-pro"
        >
          View Full Report
        </button>
      </div>
    </div>
  );
};

export default RevenueChart;
