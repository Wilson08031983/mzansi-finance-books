
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  data: { label: string; value: number }[];
}

const chartConfig = {
  value: {
    label: "Revenue",
    color: "#6366f1",
  },
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Revenue Overview</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
              Revenue
            </button>
            <button className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
              Expenses
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="label" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
