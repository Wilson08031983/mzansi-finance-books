
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Users, Plus, Receipt } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Create Invoice',
      icon: FileText,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => console.log('Navigate to create invoice')
    },
    {
      title: 'Add Client',
      icon: Users,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => console.log('Navigate to add client')
    },
    {
      title: 'New Quotation',
      icon: Plus,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => console.log('Navigate to create quotation')
    },
    {
      title: 'Record Expense',
      icon: Receipt,
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => console.log('Navigate to record expense')
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-24 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all duration-300"
          onClick={action.onClick}
        >
          <div className={`p-2 rounded-lg ${action.color}`}>
            <action.icon className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">{action.title}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
