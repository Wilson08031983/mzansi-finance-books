
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  Calendar,
  DollarSign,
  User
} from 'lucide-react';
import ConvertToInvoiceModal from './ConvertToInvoiceModal';
import DuplicateQuotationModal from './DuplicateQuotationModal';

interface QuotationsGridProps {
  quotations: any[];
  selectedQuotations: string[];
  onSelectQuotation: (quotationId: string) => void;
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
  const [convertModalOpen, setConvertModalOpen] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [selectedQuotationForAction, setSelectedQuotationForAction] = useState<any>(null);

  const handleConvertToInvoice = (quotation: any) => {
    setSelectedQuotationForAction(quotation);
    setConvertModalOpen(true);
  };

  const handleDuplicate = (quotation: any) => {
    setSelectedQuotationForAction(quotation);
    setDuplicateModalOpen(true);
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
        handleDuplicate(quotation);
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {quotations.map((quotation) => (
          <Card 
            key={quotation.id} 
            className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300 hover-lift group"
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
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 font-sf-pro">{quotation.number}</h3>
                    <p className="text-sm text-slate-500 font-sf-pro">{quotation.reference}</p>
                  </div>
                </div>
                <div className="relative group/menu">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200">
                    <button
                      onClick={() => handleQuotationAction('view', quotation)}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-sf-pro"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </button>
                    <button
                      onClick={() => handleQuotationAction('edit', quotation)}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-sf-pro"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </button>
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

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(quotation.status)} font-sf-pro`}>
                    {getStatusIcon(quotation.status)}
                    <span className="ml-1 capitalize">{quotation.status}</span>
                  </span>
                  <span className="text-lg font-bold text-slate-900 font-sf-pro">
                    R {quotation.amount.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-600">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-sf-pro">{quotation.client}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-sf-pro">{new Date(quotation.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-sf-pro">Expires: {new Date(quotation.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuotationAction('view', quotation)}
                    className="flex-1 font-sf-pro"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuotationAction('edit', quotation)}
                    className="flex-1 font-sf-pro"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuotationAction('duplicate', quotation)}
                    className="flex-1 text-blue-600 hover:text-blue-700 hover:border-blue-300 font-sf-pro"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  {quotation.status === 'accepted' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuotationAction('convertToInvoice', quotation)}
                      className="flex-1 text-green-600 hover:text-green-700 hover:border-green-300 font-sf-pro"
                    >
                      <Receipt className="h-4 w-4 mr-1" />
                      Invoice
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConvertToInvoiceModal
        isOpen={convertModalOpen}
        onClose={() => setConvertModalOpen(false)}
        quotation={selectedQuotationForAction}
      />

      <DuplicateQuotationModal
        isOpen={duplicateModalOpen}
        onClose={() => setDuplicateModalOpen(false)}
        quotation={selectedQuotationForAction}
      />
    </>
  );
};

export default QuotationsGrid;
