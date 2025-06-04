
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail,
  Receipt,
  Download,
  Trash2,
  Edit,
  Copy,
  Archive,
  Tag,
  Calendar,
  FileText
} from 'lucide-react';

interface QuotationsBulkActionsProps {
  selectedCount: number;
  selectedQuotations: string[];
  onClearSelection: () => void;
}

const QuotationsBulkActions: React.FC<QuotationsBulkActionsProps> = ({
  selectedCount,
  selectedQuotations,
  onClearSelection
}) => {
  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action}`, selectedQuotations);
    // Implement bulk actions here
  };

  return (
    <Card className="glass backdrop-blur-sm bg-mokm-purple-50/50 border border-mokm-purple-200 shadow-business">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-mokm-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700 font-sf-pro">
                {selectedCount} quotation{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Status Change */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('changeStatus')}
                  className="font-sf-pro rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Change Status
                </Button>
              </div>

              {/* Send Selected */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('send')}
                className="font-sf-pro rounded-lg hover:bg-green-50 hover:text-green-600 hover:border-green-300"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Selected
              </Button>

              {/* Convert to Invoice */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('convertToInvoice')}
                className="font-sf-pro rounded-lg hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Convert to Invoice
              </Button>

              {/* Duplicate */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('duplicate')}
                className="font-sf-pro rounded-lg hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>

              {/* Add Tags */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('addTags')}
                className="font-sf-pro rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300"
              >
                <Tag className="h-4 w-4 mr-2" />
                Add Tags
              </Button>

              {/* Download PDF */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('downloadPDF')}
                className="font-sf-pro rounded-lg hover:bg-slate-50 hover:text-slate-600 hover:border-slate-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>

              {/* Export */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('export')}
                  className="font-sf-pro rounded-lg hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-300"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Archive */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('archive')}
                className="font-sf-pro rounded-lg hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-300"
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>

              {/* Delete */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('delete')}
                className="font-sf-pro rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-xs text-slate-500 font-sf-pro">
              Select individual quotations or use "Select All" to manage multiple items
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="font-sf-pro text-slate-600 hover:text-slate-800"
            >
              Clear Selection
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuotationsBulkActions;
