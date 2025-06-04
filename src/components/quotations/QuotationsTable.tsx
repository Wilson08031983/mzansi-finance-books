
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
  Trash2
} from 'lucide-react';

interface QuotationsTableProps {
  quotations: any[];
  selectedQuotations: string[];
  onSelectQuotation: (id: string) => void;
  onSelectAll: () => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
}

const QuotationsTable: React.FC<QuotationsTableProps> = ({
  quotations,
  selectedQuotations,
  onSelectQuotation,
  onSelectAll,
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
            <TableHead className="font-sf-pro text-slate-700">Quotation #</TableHead>
            <TableHead className="font-sf-pro text-slate-700">Client</TableHead>
            <TableHead className="font-sf-pro text-slate-700">Date</TableHead>
            <TableHead className="font-sf-pro text-slate-700">Expiry</TableHead>
            <TableHead className="font-sf-pro text-slate-700">Amount</TableHead>
            <TableHead className="font-sf-pro text-slate-700">Status</TableHead>
            <TableHead className="font-sf-pro text-slate-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotations.map((quotation) => (
            <TableRow 
              key={quotation.id}
              className="hover:bg-white/50 transition-colors"
            >
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedQuotations.includes(quotation.id)}
                  onChange={() => onSelectQuotation(quotation.id)}
                  className="rounded border-slate-300 text-mokm-purple-600 focus:ring-mokm-purple-500"
                />
              </TableCell>
              <TableCell className="font-sf-pro font-medium text-slate-900">
                {quotation.number}
                {quotation.reference && (
                  <div className="text-xs text-slate-500">{quotation.reference}</div>
                )}
              </TableCell>
              <TableCell className="font-sf-pro">
                <div>
                  <div className="font-medium text-slate-900">{quotation.client}</div>
                  <div className="text-sm text-slate-500">{quotation.clientEmail}</div>
                </div>
              </TableCell>
              <TableCell className="font-sf-pro text-slate-700">
                {formatDate(quotation.date)}
              </TableCell>
              <TableCell className="font-sf-pro text-slate-700">
                <div className={`${
                  new Date(quotation.expiryDate) < new Date() ? 'text-red-600' : 'text-slate-700'
                }`}>
                  {formatDate(quotation.expiryDate)}
                </div>
              </TableCell>
              <TableCell className="font-sf-pro font-medium text-slate-900">
                {formatCurrency(quotation.amount, quotation.currency)}
              </TableCell>
              <TableCell>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quotation.status)}`}>
                  {getStatusIcon(quotation.status)}
                  <span className="ml-1 capitalize">{quotation.status}</span>
                </div>
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuotationsTable;
