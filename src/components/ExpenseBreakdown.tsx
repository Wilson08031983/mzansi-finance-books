
import React, { useState, useEffect } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '@/hooks/useDashboardData';

interface ExpenseBreakdownProps {
  data: { label: string; value: number }[];
  onViewDetails?: () => void;
}

const MOKM_COLORS = [
  '#f97316', // mokm-orange-500
  '#e879f9', // mokm-pink-400
  '#a855f7', // mokm-purple-500
  '#3b82f6', // mokm-blue-500
  '#06b6d4'  // cyan-500
];

const chartConfig = {
  office: { label: "Office", color: "#f97316" },
  travel: { label: "Travel", color: "#e879f9" },
  meals: { label: "Meals", color: "#a855f7" },
  software: { label: "Software", color: "#3b82f6" },
  other: { label: "Other", color: "#06b6d4" },
};

const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ data, onViewDetails }) => {
  const navigate = useNavigate();
  const { expenses } = useDashboardData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [categoryData, setCategoryData] = useState(data);
  const [periodFilter, setPeriodFilter] = useState('month');
  
  // Calculate total from active data
  const total = categoryData.reduce((sum, item) => sum + item.value, 0);
  
  useEffect(() => {
    // In a real app, we would filter expenses by period and process them
    // For now, just use the data prop but simulate filtering
    if (periodFilter === 'month') {
      setCategoryData(data);
    } else if (periodFilter === 'quarter') {
      // Simulate quarterly data by increasing values
      setCategoryData(data.map(item => ({
        label: item.label,
        value: item.value * 3 + (Math.random() * 5000)
      })));
    } else {
      // Simulate yearly data
      setCategoryData(data.map(item => ({
        label: item.label,
        value: item.value * 12 + (Math.random() * 15000)
      })));
    }
  }, [data, periodFilter, expenses]);
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      navigate('/accounting/expenses');
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-end mb-3">
        <div className="flex space-x-2">
          <button 
            onClick={() => setPeriodFilter('month')} 
            className={`px-3 py-1 text-xs rounded-full transition-all ${periodFilter === 'month' 
              ? 'bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 text-white' 
              : 'bg-white/50 text-slate-600'}`}
          >
            Month
          </button>
          <button 
            onClick={() => setPeriodFilter('quarter')} 
            className={`px-3 py-1 text-xs rounded-full transition-all ${periodFilter === 'quarter' 
              ? 'bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 text-white' 
              : 'bg-white/50 text-slate-600'}`}
          >
            Quarter
          </button>
          <button 
            onClick={() => setPeriodFilter('year')} 
            className={`px-3 py-1 text-xs rounded-full transition-all ${periodFilter === 'year' 
              ? 'bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 text-white' 
              : 'bg-white/50 text-slate-600'}`}
          >
            Year
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <defs>
                  {MOKM_COLORS.map((color, index) => (
                    <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={color} />
                      <stop offset="100%" stopColor={`${color}80`} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={30}
                  dataKey="value"
                  className="focus:outline-none"
                  onClick={(data) => handleCategoryClick(data.payload.label)}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#gradient${index})`}
                      className={`transition-opacity duration-300 cursor-pointer ${selectedCategory === entry.label ? 'opacity-100 stroke-2' : 'hover:opacity-80'}`}
                      stroke={selectedCategory === entry.label ? "white" : "rgba(255,255,255,0.2)"}
                      strokeWidth={selectedCategory === entry.label ? 3 : 2}
                    />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      const value = Number(data.value) || 0;
                      const percentage = ((value / total) * 100).toFixed(1);
                      return (
                        <div className="glass backdrop-blur-xl bg-white/90 border border-white/20 rounded-xl shadow-business p-3">
                          <p className="font-medium text-slate-900 font-sf-pro">{data.payload.label}</p>
                          <p className="text-sm text-slate-600 font-sf-pro">
                            R {value.toLocaleString()} ({percentage}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {categoryData.map((category, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between text-sm rounded-lg p-2 transition-all duration-300 cursor-pointer
                  ${index === activeIndex ? 'bg-white/30' : 'bg-white/20 hover:bg-white/30'}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2 transition-transform duration-300 "
                    style={{ backgroundColor: MOKM_COLORS[index % MOKM_COLORS.length] }}
                  ></div>
                  <span className="font-medium text-xs text-slate-700">{category.label}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-xs text-slate-800">R {category.value.toLocaleString()}</span>
                  <span className="text-xs text-slate-500">{((category.value / total) * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleViewDetails}
              className="px-4 py-2 text-xs font-medium rounded-lg text-mokm-orange-600 hover:text-mokm-orange-700 hover:scale-105 bg-mokm-orange-50 hover:bg-mokm-orange-100 transition-all duration-300 font-sf-pro"
            >
              View Expense Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;
