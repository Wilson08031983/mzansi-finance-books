
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Mail,
  Download,
  Trash2,
  Receipt,
  SortAsc,
  SortDesc
} from 'lucide-react';
import ConvertToInvoiceModal from './ConvertToInvoiceModal';

interface QuotationsTableProps {
  quotations: any[];
  selectedQuotations: string[];
  onSelectQuotation: (quotationId: string) => void;
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
  const [convertModalOpen, setConvertModalOpen] = useState(false);
  const [selectedQuotationForConvert, setSelectedQuotationForConvert] = useState<any>(null);

  const handleConvertToInvoice = (quotation: any) => {
    setSelectedQuotationForConvert(quotation);
    setConvertModalOpen(true);
  };

  const handleQuotationAction = (action: string, quotation: any) => {
    console.log(`Action: ${action}`, quotation);
    
    switch (action) {
      case 'view':
        // Navigate to quotation view
        break;
      case 'edit':
        // Navigate to quotation edit
        break;
      case 'duplicate':
        // Duplicate quotation
        break;
      case 'send':
        // Send quotation
        break;
      case 'convertToInvoice':
        handleConvertToInvoice(quotation);
        break;
      case 'download':
        // Download PDF
        break;
      case 'delete':
        // Delete quotation with confirmation
        break;
      default:
        break;
    }
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? 
      <SortAsc className="h-4 w-4 ml-1" /> : 
      <SortDesc className="h-4 w-4 ml-1" />;
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedQuotations.length === quotations.length && quotations.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-slate-300 text-mokm-purple-600 focus:ring-mokm-purple-500"
                />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 font-sf-pro"
                onClick={() => onSort('number')}
              >
                <div className="flex items-center">
                  Quotation Number
                  {getSortIcon('number')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 font-sf-pro"
                onClick={() => onSort('client')}
              >
                <div className="flex items-center">
                  Client
                  {getSortIcon('client')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 font-sf-pro"
                onClick={() => onSort('date')}
              >
                <div className="flex items-center">
                  Date
                  {getSortIcon('date')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 font-sf-pro"
                onClick={() => onSort('expiryDate')}
              >
                <div className="flex items-center">
                  Expiry Date
                  {getSortIcon('expiryDate')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 font-sf-pro"
                onClick={() => onSort('amount')}
              >
                <div className="flex items-center justify-end">
                  Amount
                  {getSortIcon('amount')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider font-sf-pro">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider font-sf-pro">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {quotations.map((quotation) => (
              <tr key={quotation.id} className="hover:bg-slate-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedQuotations.includes(quotation.id)}
                    onChange={() => onSelectQuotation(quotation.id)}
                    className="rounded border-slate-300 text-mokm-purple-600 focus:ring-mokm-purple-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900 font-sf-pro">{quotation.number}</div>
                  <div className="text-sm text-slate-500 font-sf-pro">{quotation.reference}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900 font-sf-pro">{quotation.client}</div>
                  <div className="text-sm text-slate-500 font-sf-pro">{quotation.clientContact}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-sf-pro">
                  {new Date(quotation.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-sf-pro">
                  {new Date(quotation.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-900 font-sf-pro">
                  R {quotation.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(quotation.status)} font-sf-pro`}>
                    {getStatusIcon(quotation.status)}
                    <span className="ml-1 capitalize">{quotation.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuotationAction('view', quotation)}
                      className="text-slate-600 hover:text-slate-900 font-sf-pro"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuotationAction('edit', quotation)}
                      className="text-slate-600 hover:text-slate-900 font-sf-pro"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {quotation.status === 'accepted' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuotationAction('convertToInvoice', quotation)}
                        className="text-green-600 hover:text-green-700 font-sf-pro"
                        title="Convert to Invoice"
                      >
                        <Receipt className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-600 hover:text-slate-900 font-sf-pro"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <button
                          onClick={() => handleQuotationAction('duplicate', quotation)}
                          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-sf-pro"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </button>
                        <button
                          onClick={() => handleQuotationAction('send', quotation)}
                          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-sf-pro"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send
                        </button>
                        {quotation.status === 'accepted' && (
                          <button
                            onClick={() => handleQuotationAction('convertToInvoice', quotation)}
                            className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50 font-sf-pro"
                          >
                            <Receipt className="h-4 w-4 mr-2" />
                            Convert to Invoice
                          </button>
                        )}
                        <button
                          onClick={() => handleQuotationAction('download', quotation)}
                          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-sf-pro"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </button>
                        <div className="border-t border-slate-200 my-1"></div>
                        <button
                          onClick={() => handleQuotationAction('delete', quotation)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 font-sf-pro"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConvertToInvoiceModal
        isOpen={convertModalOpen}
        onClose={() => setConvertModalOpen(false)}
        quotation={selectedQuotationForConvert}
      />
    </>
  );
};

export default QuotationsTable;
