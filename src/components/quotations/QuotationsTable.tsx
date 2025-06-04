
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Eye,
  Edit,
  Copy,
  Mail,
  Receipt,
  Download,
  MoreHorizontal,
  Trash2,
  FileText,
  Send,
  Archive,
  Star,
  Clock,
  Calendar,
  DollarSign,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface QuotationsTableProps {
  quotations: any[];
  selectedQuotations: string[];
  onSelectQuotation: (id: string) => void;
  onSelectAll: () => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
}

const QuotationsTable: React.FC<QuotationsTableProps> = ({
  quotations,
  selectedQuotations,
  onSelectQuotation,
  onSelectAll,
  getStatusIcon,
  getStatusColor,
  sortColumn,
  sortDirection,
  onSort
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

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-ZA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 text-slate-400" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-mokm-purple-600" />
      : <ArrowDown className="h-4 w-4 text-mokm-purple-600" />;
  };

  const handleAction = (action: string, quotationId: string) => {
    console.log(`Action: ${action} on quotation: ${quotationId}`);
    // Implement actions here
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/70">
            <TableHead className="w-12">
              <input
                type="checkbox"
                checked={selectedQuotations.length === quotations.length && quotations.length > 0}
                onChange={onSelectAll}
                className="rounded border-slate-300 text-mokm-purple-600 focus:ring-mokm-purple-500"
              />
            </TableHead>
            
            <TableHead 
              className="font-sf-pro text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
              onClick={() => onSort('number')}
            >
              <div className="flex items-center space-x-2">
                <span>Quotation #</span>
                {getSortIcon('number')}
              </div>
            </TableHead>
            
            <TableHead 
              className="font-sf-pro text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
              onClick={() => onSort('client')}
            >
              <div className="flex items-center space-x-2">
                <span>Client</span>
                {getSortIcon('client')}
              </div>
            </TableHead>
            
            <TableHead 
              className="font-sf-pro text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
              onClick={() => onSort('date')}
            >
              <div className="flex items-center space-x-2">
                <span>Date</span>
                {getSortIcon('date')}
              </div>
            </TableHead>
            
            <TableHead 
              className="font-sf-pro text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
              onClick={() => onSort('expiryDate')}
            >
              <div className="flex items-center space-x-2">
                <span>Expiry</span>
                {getSortIcon('expiryDate')}
              </div>
            </TableHead>
            
            <TableHead 
              className="font-sf-pro text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors"
              onClick={() => onSort('amount')}
            >
              <div className="flex items-center space-x-2">
                <span>Amount</span>
                {getSortIcon('amount')}
              </div>
            </TableHead>
            
            <TableHead className="font-sf-pro text-slate-700">Status</TableHead>
            <TableHead className="font-sf-pro text-slate-700">Project</TableHead>
            <TableHead className="font-sf-pro text-slate-700">Last Activity</TableHead>
            <TableHead className="font-sf-pro text-slate-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotations.map((quotation) => (
            <TableRow 
              key={quotation.id}
              className="hover:bg-white/50 transition-colors group"
            >
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedQuotations.includes(quotation.id)}
                  onChange={() => onSelectQuotation(quotation.id)}
                  className="rounded border-slate-300 text-mokm-purple-600 focus:ring-mokm-purple-500"
                />
              </TableCell>
              
              <TableCell className="font-sf-pro">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{quotation.number}</span>
                    {quotation.reference && (
                      <span className="text-xs text-slate-500">{quotation.reference}</span>
                    )}
                  </div>
                  {quotation.priority === 'high' && (
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                  )}
                </div>
              </TableCell>
              
              <TableCell className="font-sf-pro">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-mokm-orange-100 to-mokm-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-mokm-purple-700 font-semibold text-sm">
                      {quotation.client.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{quotation.client}</div>
                    <div className="text-sm text-slate-500">{quotation.clientContact}</div>
                  </div>
                </div>
              </TableCell>
              
              <TableCell className="font-sf-pro text-slate-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>{formatDate(quotation.date)}</span>
                </div>
              </TableCell>
              
              <TableCell className="font-sf-pro">
                <div className={`flex items-center space-x-2 ${
                  new Date(quotation.expiryDate) < new Date() ? 'text-red-600' : 'text-slate-700'
                }`}>
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(quotation.expiryDate)}</span>
                  {new Date(quotation.expiryDate) < new Date() && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      Expired
                    </span>
                  )}
                </div>
              </TableCell>
              
              <TableCell className="font-sf-pro">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-slate-400" />
                  <span className="font-medium text-slate-900">
                    {formatCurrency(quotation.amount, quotation.currency)}
                  </span>
                </div>
              </TableCell>
              
              <TableCell>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(quotation.status)}`}>
                  {getStatusIcon(quotation.status)}
                  <span className="ml-1 capitalize">{quotation.status}</span>
                </div>
              </TableCell>
              
              <TableCell className="font-sf-pro">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">{quotation.project}</span>
                  <span className="text-xs text-slate-500">{quotation.salesperson}</span>
                </div>
              </TableCell>
              
              <TableCell className="font-sf-pro text-slate-600 text-sm">
                {quotation.status === 'accepted' && quotation.acceptedAt 
                  ? `Accepted ${formatTime(quotation.acceptedAt)}`
                  : quotation.status === 'viewed' && quotation.viewedAt
                  ? `Viewed ${formatTime(quotation.viewedAt)}`
                  : quotation.status === 'sent' && quotation.sentAt
                  ? `Sent ${formatTime(quotation.sentAt)}`
                  : `Modified ${formatTime(quotation.lastModified)}`
                }
              </TableCell>
              
              <TableCell>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAction('view', quotation.id)}
                    className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                    title="View Quotation"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAction('edit', quotation.id)}
                    className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                    title="Edit Quotation"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAction('duplicate', quotation.id)}
                    className="h-8 w-8 p-0 hover:bg-purple-50 hover:text-purple-600"
                    title="Duplicate Quotation"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  
                  {quotation.status === 'draft' ? (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAction('send', quotation.id)}
                      className="h-8 w-8 p-0 hover:bg-orange-50 hover:text-orange-600"
                      title="Send Quotation"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAction('resend', quotation.id)}
                      className="h-8 w-8 p-0 hover:bg-orange-50 hover:text-orange-600"
                      title="Resend Quotation"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                  
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
                    title="Download PDF"
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuotationsTable;
