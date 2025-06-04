
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Eye,
  Edit,
  Copy,
  Mail,
  Receipt,
  Download,
  MoreHorizontal,
  Calendar,
  DollarSign
} from 'lucide-react';

interface QuotationsGridProps {
  quotations: any[];
  selectedQuotations: string[];
  onSelectQuotation: (id: string) => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
}

const QuotationsGrid: React.FC<QuotationsGridProps> = ({
  quotations,
  selectedQuotations,
  onSelectQuotation,
  getStatusIcon,
  getStatusColor
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string = 'ZAR') => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotations.map((quotation) => (
        <Card 
          key={quotation.id}
          className={`glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300 hover-lift ${
            selectedQuotations.includes(quotation.id) ? 'ring-2 ring-mokm-purple-500/50' : ''
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedQuotations.includes(quotation.id)}
                  onChange={() => onSelectQuotation(quotation.id)}
                  className="rounded border-slate-300 text-mokm-purple-600 focus:ring-mokm-purple-500"
                />
                <div className="w-12 h-12 bg-gradient-to-r from-mokm-orange-100 to-mokm-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-mokm-purple-700 font-semibold text-lg font-sf-pro">
                    {quotation.client.charAt(0)}
                  </span>
                </div>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quotation.status)}`}>
                {getStatusIcon(quotation.status)}
                <span className="ml-1 capitalize">{quotation.status}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-slate-900 font-sf-pro">
                  {quotation.number}
                </h3>
                {quotation.reference && (
                  <p className="text-sm text-slate-500 font-sf-pro">{quotation.reference}</p>
                )}
              </div>

              <div>
                <h4 className="font-medium text-slate-900 font-sf-pro">{quotation.client}</h4>
                <p className="text-sm text-slate-600 font-sf-pro">{quotation.clientEmail}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="font-sf-pro">{formatDate(quotation.date)}</span>
                </div>
                <div className="flex items-center text-slate-900 font-semibold">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="font-sf-pro">{formatCurrency(quotation.amount, quotation.currency)}</span>
                </div>
              </div>

              <div className="text-sm text-slate-600 font-sf-pro">
                <span>Expires: {formatDate(quotation.expiryDate)}</span>
                {new Date(quotation.expiryDate) < new Date() && (
                  <span className="text-red-600 ml-2">(Expired)</span>
                )}
              </div>

              <div className="text-sm text-slate-600 font-sf-pro">
                <span>Salesperson: {quotation.salesperson}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-purple-50 hover:text-purple-600"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-orange-50 hover:text-orange-600"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Receipt className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-slate-50 hover:text-slate-600"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-slate-50 hover:text-slate-600"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuotationsGrid;
