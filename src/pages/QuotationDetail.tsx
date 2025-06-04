
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Building,
  Calendar,
  Clock,
  Download,
  Edit,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Printer,
  Send,
  Trash2,
  User,
  CheckCircle,
  XCircle,
  FilePlus,
  FileText,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface QuotationDetailProps {
  quotation: any;
}

const QuotationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quotation, setQuotation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  // Mock quotation data - in real app, fetch from Supabase
  const mockQuotation = {
    id: id,
    number: 'QUO-2024-001',
    reference: 'PROJECT-ALPHA',
    client: 'Tech Solutions Ltd',
    clientId: 'client-1',
    clientEmail: 'john@techsolutions.com',
    clientContact: 'John Smith',
    clientPhone: '+27 11 123 4567',
    clientAddress: '123 Business Avenue, Sandton, 2196',
    date: '2024-01-15',
    expiryDate: '2024-02-15',
    lastModified: '2024-01-16',
    amount: 25000,
    currency: 'ZAR',
    status: 'sent',
    salesperson: 'Sarah Johnson',
    project: 'Alpha Development',
    items: [
      {
        id: 'item-1',
        description: 'Web Development Services',
        quantity: 1,
        unit: 'project',
        rate: 20000,
        taxRate: 15,
        discount: 0,
        amount: 20000
      },
      {
        id: 'item-2',
        description: 'UI/UX Design',
        quantity: 1,
        unit: 'project',
        rate: 8000,
        taxRate: 15,
        discount: 1000,
        amount: 7000
      }
    ],
    subtotal: 27000,
    taxAmount: 4050,
    discount: 1000,
    totalAmount: 25000,
    terms: 'Payment due within 30 days of invoice date.',
    notes: 'Initial development phase for Alpha project.'
  };

  useEffect(() => {
    const fetchQuotation = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setQuotation(mockQuotation);
      } catch (error) {
        console.error('Error fetching quotation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotation();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!quotation) return;
    
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setQuotation({ ...quotation, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendEmail = async () => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (quotation?.status === 'draft') {
        setQuotation({ ...quotation, status: 'sent' });
      }
      alert('Quotation sent successfully!');
    } catch (error) {
      console.error('Error sending quotation:', error);
      alert('Failed to send quotation');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowDeleteModal(false);
      navigate('/quotations');
    } catch (error) {
      console.error('Error deleting quotation:', error);
      alert('Failed to delete quotation');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulate PDF download
      const element = document.createElement('a');
      element.setAttribute('href', 'data:application/pdf;charset=utf-8,' + encodeURIComponent('Simulated PDF'));
      element.setAttribute('download', `quotation-${quotation?.number}.pdf`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'sent':
      case 'viewed':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'draft':
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'sent':
      case 'viewed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-mokm-purple-600" />
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/quotations')}
            className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quotations
          </Button>
        </div>
        <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
          <CardContent className="p-6">
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-slate-900 font-semibold font-sf-pro mb-2">Quotation not found</h3>
              <p className="text-slate-600 font-sf-pro">The quotation you're looking for doesn't exist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/quotations')}
            className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quotations
          </Button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-slate-900 font-sf-pro">{quotation.number}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(quotation.status)} font-sf-pro`}>
                {getStatusIcon(quotation.status)}
                <span className="ml-1 capitalize">{quotation.status}</span>
              </span>
            </div>
            <p className="text-slate-600 font-sf-pro">Created on {formatDate(quotation.date)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {quotation.status === 'draft' && (
            <Button
              onClick={handleSendEmail}
              disabled={actionLoading}
              className="bg-gradient-to-r from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 hover:from-mokm-orange-600 hover:via-mokm-pink-600 hover:to-mokm-purple-600 text-white font-sf-pro rounded-xl"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Quotation
            </Button>
          )}

          {quotation.status === 'sent' && (
            <>
              <Button
                onClick={() => handleStatusUpdate('accepted')}
                disabled={actionLoading}
                className="bg-green-600 hover:bg-green-700 text-white font-sf-pro rounded-xl"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Accepted
              </Button>
              
              <Button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={actionLoading}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-sf-pro rounded-xl"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Mark as Rejected
              </Button>
            </>
          )}

          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
            
            {showActionsMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
                <button
                  onClick={() => navigate(`/quotations/${quotation.id}/edit`)}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-sf-pro"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-sf-pro"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-sf-pro"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
                <div className="border-t border-slate-200 my-1"></div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 font-sf-pro"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quotation Header */}
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-sf-pro">Quotation</h2>
                  <p className="text-slate-600 font-sf-pro">{quotation.number}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium font-sf-pro">Date: {formatDate(quotation.date)}</p>
                  <p className="text-slate-600 font-sf-pro">Expiry: {formatDate(quotation.expiryDate)}</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 font-sf-pro">From</h3>
                    <div className="space-y-1">
                      <p className="font-medium font-sf-pro">Your Company Name</p>
                      <p className="text-slate-600 font-sf-pro">123 Business Avenue</p>
                      <p className="text-slate-600 font-sf-pro">Pretoria, 0001</p>
                      <p className="text-slate-600 font-sf-pro">South Africa</p>
                      <p className="text-slate-600 font-sf-pro mt-2">VAT: 4230142398</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 font-sf-pro">To</h3>
                    <div className="space-y-2">
                      <p className="font-medium flex items-center font-sf-pro">
                        <Building className="h-4 w-4 text-slate-400 mr-2" />
                        {quotation.client}
                      </p>
                      <p className="flex items-center text-slate-600 font-sf-pro">
                        <Mail className="h-4 w-4 text-slate-400 mr-2" />
                        {quotation.clientEmail}
                      </p>
                      <p className="flex items-center text-slate-600 font-sf-pro">
                        <Phone className="h-4 w-4 text-slate-400 mr-2" />
                        {quotation.clientPhone}
                      </p>
                      <p className="flex items-start text-slate-600 font-sf-pro">
                        <MapPin className="h-4 w-4 text-slate-400 mr-2 mt-0.5" />
                        <span>{quotation.clientAddress}</span>
                      </p>
                      {quotation.clientContact && (
                        <p className="flex items-center text-slate-600 font-sf-pro">
                          <User className="h-4 w-4 text-slate-400 mr-2" />
                          Contact: {quotation.clientContact}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quotation Items */}
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
            <CardHeader>
              <CardTitle className="text-slate-900 font-sf-pro">Quotation Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-600 font-sf-pro">Description</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600 font-sf-pro">Qty</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600 font-sf-pro">Rate</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600 font-sf-pro">Discount</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600 font-sf-pro">Tax</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-600 font-sf-pro">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotation.items.map((item: any) => (
                      <tr key={item.id} className="border-b border-slate-100">
                        <td className="py-4 px-4 font-sf-pro">{item.description}</td>
                        <td className="py-4 px-4 text-right font-sf-pro">{item.quantity}</td>
                        <td className="py-4 px-4 text-right font-sf-pro">{formatCurrency(item.rate)}</td>
                        <td className="py-4 px-4 text-right font-sf-pro">
                          {item.discount > 0 ? formatCurrency(item.discount) : '-'}
                        </td>
                        <td className="py-4 px-4 text-right font-sf-pro">{item.taxRate}%</td>
                        <td className="py-4 px-4 text-right font-medium font-sf-pro">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <div className="flex justify-end">
                  <div className="w-full md:w-64 space-y-2">
                    <div className="flex justify-between py-1 font-sf-pro">
                      <span className="text-slate-600">Subtotal:</span>
                      <span>{formatCurrency(quotation.subtotal)}</span>
                    </div>
                    {quotation.discount > 0 && (
                      <div className="flex justify-between py-1 text-slate-600 font-sf-pro">
                        <span>Discount:</span>
                        <span>- {formatCurrency(quotation.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 text-slate-600 font-sf-pro">
                      <span>Tax (15%):</span>
                      <span>{formatCurrency(quotation.taxAmount)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold text-lg border-t border-slate-200 mt-2 pt-2 font-sf-pro">
                      <span>Total:</span>
                      <span>{formatCurrency(quotation.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Notes */}
          {(quotation.terms || quotation.notes) && (
            <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quotation.terms && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-2 font-sf-pro">Terms and Conditions</h3>
                      <p className="text-slate-700 font-sf-pro">{quotation.terms}</p>
                    </div>
                  )}
                  
                  {quotation.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-2 font-sf-pro">Notes</h3>
                      <p className="text-slate-700 font-sf-pro">{quotation.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
            <CardHeader>
              <CardTitle className="text-slate-900 font-sf-pro">Quotation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-sf-pro">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(quotation.status)} font-sf-pro`}>
                    {getStatusIcon(quotation.status)}
                    <span className="ml-1 capitalize">{quotation.status}</span>
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-slate-600 font-sf-pro">Created</span>
                  <span className="font-sf-pro">{formatDate(quotation.date)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-slate-600 font-sf-pro">Expires</span>
                  <span className="font-sf-pro">{formatDate(quotation.expiryDate)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-slate-600 font-sf-pro">Total</span>
                  <span className="font-medium font-sf-pro">{formatCurrency(quotation.totalAmount)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-slate-600 font-sf-pro">Items</span>
                  <span className="font-sf-pro">{quotation.items.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
            <CardHeader>
              <CardTitle className="text-slate-900 font-sf-pro">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  onClick={handleSendEmail}
                  disabled={actionLoading}
                  className="w-full bg-gradient-to-r from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 hover:from-mokm-orange-600 hover:via-mokm-pink-600 hover:to-mokm-purple-600 text-white font-sf-pro rounded-xl"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send to Client
                </Button>
                
                <Button
                  onClick={handleDownloadPDF}
                  disabled={actionLoading}
                  variant="outline"
                  className="w-full border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                
                <Button
                  onClick={() => navigate(`/quotations/${quotation.id}/edit`)}
                  variant="outline"
                  className="w-full border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Quotation
                </Button>
                
                {quotation.status === 'accepted' && (
                  <Button
                    onClick={() => navigate(`/invoices/create?quotation=${quotation.id}`)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-sf-pro rounded-xl"
                  >
                    <FilePlus className="h-4 w-4 mr-2" />
                    Convert to Invoice
                  </Button>
                )}
                
                <Button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={actionLoading}
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-sf-pro rounded-xl"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Quotation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Card className="max-w-md w-full mx-4">
            <CardHeader>
              <CardTitle className="text-slate-900 font-sf-pro">Delete Quotation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6 font-sf-pro">
                Are you sure you want to delete this quotation? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  onClick={() => setShowDeleteModal(false)}
                  variant="outline"
                  className="font-sf-pro rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="bg-red-600 hover:bg-red-700 text-white font-sf-pro rounded-xl"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QuotationDetail;
