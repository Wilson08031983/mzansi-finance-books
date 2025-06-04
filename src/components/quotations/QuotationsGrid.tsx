
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
  DollarSign,
  Clock,
  Star,
  Tag,
  User,
  Send,
  FileText
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

  const handleAction = (action: string, quotationId: string) => {
    console.log(`Action: ${action} on quotation: ${quotationId}`);
    // Implement actions here
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotations.map((quotation) => (
        <Card 
          key={quotation.id}
          className={`glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300 hover-lift group ${
            selectedQuotations.includes(quotation.id) ? 'ring-2 ring-mokm-purple-500/50 bg-mokm-purple-50/30' : ''
          }`}
        >
          <CardContent className="p-6">
            {/* Header with checkbox and status */}
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
                {quotation.priority === 'high' && (
                  <Star className="h-5 w-5 text-amber-500 fill-current" />
                )}
              </div>
              
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(quotation.status)}`}>
                {getStatusIcon(quotation.status)}
                <span className="ml-1 capitalize">{quotation.status}</span>
              </div>
            </div>

            {/* Quotation Details */}
            <div className="space-y-4">
              {/* Quotation Number and Reference */}
              <div>
                <h3 className="font-semibold text-slate-900 font-sf-pro text-lg">
                  {quotation.number}
                </h3>
                {quotation.reference && (
                  <p className="text-sm text-slate-500 font-sf-pro">{quotation.reference}</p>
                )}
              </div>

              {/* Client Information */}
              <div>
                <h4 className="font-medium text-slate-900 font-sf-pro">{quotation.client}</h4>
                <p className="text-sm text-slate-600 font-sf-pro">{quotation.clientContact}</p>
                <p className="text-xs text-slate-500 font-sf-pro">{quotation.clientEmail}</p>
              </div>

              {/* Project and Salesperson */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-900 font-sf-pro">{quotation.project}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 font-sf-pro">{quotation.salesperson}</span>
                </div>
              </div>

              {/* Tags */}
              {quotation.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {quotation.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full font-sf-pro"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Dates and Amount */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center text-slate-600 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="font-sf-pro">Created</span>
                  </div>
                  <span className="font-sf-pro text-slate-900">{formatDate(quotation.date)}</span>
                </div>
                
                <div>
                  <div className="flex items-center text-slate-600 mb-1">
                    <Clock className={`h-4 w-4 mr-1 ${
                      new Date(quotation.expiryDate) < new Date() ? 'text-red-500' : ''
                    }`} />
                    <span className="font-sf-pro">Expires</span>
                  </div>
                  <span className={`font-sf-pro ${
                    new Date(quotation.expiryDate) < new Date() ? 'text-red-600' : 'text-slate-900'
                  }`}>
                    {formatDate(quotation.expiryDate)}
                  </span>
                  {new Date(quotation.expiryDate) < new Date() && (
                    <div className="text-xs text-red-600 font-sf-pro mt-1">Expired</div>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="bg-slate-50/50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-slate-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="text-sm font-sf-pro">Total Amount</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900 font-sf-pro">
                    {formatCurrency(quotation.amount, quotation.currency)}
                  </span>
                </div>
              </div>

              {/* Progress Indicator for certain statuses */}
              {quotation.status === 'sent' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-700 font-sf-pro">
                      Awaiting client response
                    </span>
                  </div>
                </div>
              )}

              {quotation.status === 'viewed' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-orange-700 font-sf-pro">
                      Viewed by client
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleAction('view', quotation.id)}
                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleAction('edit', quotation.id)}
                  className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleAction('duplicate', quotation.id)}
                  className="h-8 w-8 p-0 hover:bg-purple-50 hover:text-purple-600"
                  title="Duplicate"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                
                {quotation.status === 'draft' ? (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAction('send', quotation.id)}
                    className="h-8 w-8 p-0 hover:bg-orange-50 hover:text-orange-600"
                    title="Send"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAction('resend', quotation.id)}
                    className="h-8 w-8 p-0 hover:bg-orange-50 hover:text-orange-600"
                    title="Resend"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                {quotation.status === 'accepted' && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAction('convertToInvoice', quotation.id)}
                    className="h-8 w-8 p-0 hover:bg-indigo-50 hover:text-indigo-600"
                    title="Convert to Invoice"
                  >
                    <Receipt className="h-4 w-4" />
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleAction('download', quotation.id)}
                  className="h-8 w-8 p-0 hover:bg-slate-50 hover:text-slate-600"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </Button>
                
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-slate-50 hover:text-slate-600"
                    title="More Actions"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuotationsGrid;
