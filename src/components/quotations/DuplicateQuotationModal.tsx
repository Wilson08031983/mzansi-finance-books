
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Save, 
  Plus, 
  Trash2, 
  Search,
  Calendar,
  User,
  Building,
  AlertCircle,
  Loader2,
  X
} from 'lucide-react';

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  type: string;
}

interface DuplicateQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotation: any;
}

// Sample clients for the demo
const sampleClients: Client[] = [
  { id: '1', name: 'ABC Corporation', email: 'info@abccorp.co.za', address: '123 Main St, Johannesburg', type: 'company' },
  { id: '2', name: 'Department of Education', email: 'contact@education.gov.za', address: 'Government Boulevard, Pretoria', type: 'government' },
  { id: '3', name: 'Maria Mokoena', email: 'maria@example.com', address: '45 Oak Avenue, Cape Town', type: 'individual' },
  { id: '4', name: 'Save the Wildlife Foundation', email: 'info@savewildlife.org.za', address: '78 Park Road, Durban', type: 'non-profit' },
  { id: '5', name: 'Tech Solutions Ltd', email: 'hello@techsolutions.co.za', address: '90 Innovation Drive, Stellenbosch', type: 'company' }
];

// Generate a new quotation number
const generateQuotationNumber = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `QUO-${year}-${randomNum}`;
};

// Generate the current date in YYYY-MM-DD format
const getCurrentDate = (): string => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Generate expiry date (30 days from now) in YYYY-MM-DD format
const getExpiryDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
};

const DuplicateQuotationModal: React.FC<DuplicateQuotationModalProps> = ({
  isOpen,
  onClose,
  quotation
}) => {
  // Form state
  const [quotationNumber, setQuotationNumber] = useState(generateQuotationNumber());
  const [selectedClientId, setSelectedClientId] = useState('');
  const [issueDate, setIssueDate] = useState(getCurrentDate());
  const [expiryDate, setExpiryDate] = useState(getExpiryDate());
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [terms, setTerms] = useState('');
  const [notes, setNotes] = useState('');
  
  // UI state
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form with quotation data
  useEffect(() => {
    if (quotation && isOpen) {
      setQuotationNumber(generateQuotationNumber());
      setSelectedClientId(quotation.clientId || '');
      setIssueDate(getCurrentDate());
      setExpiryDate(getExpiryDate());
      
      // Create new items with new IDs
      const duplicatedItems = quotation.items?.map((item: any) => ({
        id: Math.random().toString(36).substring(7),
        description: item.description || '',
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice || 0,
        taxRate: item.taxRate || 15,
        discount: item.discount || 0
      })) || [];
      
      setItems(duplicatedItems.length > 0 ? duplicatedItems : [{
        id: Math.random().toString(36).substring(7),
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 15,
        discount: 0
      }]);
      
      setTerms(quotation.terms || '');
      setNotes(quotation.notes || '');
      setError('');
    }
  }, [quotation, isOpen]);

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    let taxTotal = 0;
    let discountTotal = 0;
    
    items.forEach(item => {
      const itemSubtotal = item.quantity * item.unitPrice;
      const itemDiscount = item.discount;
      const itemTax = ((itemSubtotal - itemDiscount) * item.taxRate) / 100;
      
      subtotal += itemSubtotal;
      discountTotal += itemDiscount;
      taxTotal += itemTax;
    });
    
    const total = subtotal - discountTotal + taxTotal;
    
    return {
      subtotal,
      taxTotal,
      discountTotal,
      total
    };
  };

  const totals = calculateTotals();

  // Handle adding a new item
  const addItem = () => {
    setItems(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 15,
        discount: 0
      }
    ]);
  };

  // Handle removing an item
  const removeItem = (itemId: string) => {
    if (items.length === 1) return;
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Handle updating an item
  const updateItem = (itemId: string, field: keyof QuotationItem, value: string | number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  // Filter clients for the selector
  const filteredClients = sampleClients.filter(
    client =>
      client.name.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(clientSearchQuery.toLowerCase())
  );

  // Get the selected client
  const selectedClient = sampleClients.find(client => client.id === selectedClientId);

  // Form validation
  const validateForm = () => {
    if (!selectedClientId) {
      setError('Please select a client');
      return false;
    }
    
    if (!issueDate) {
      setError('Please set an issue date');
      return false;
    }
    
    if (!expiryDate) {
      setError('Please set an expiry date');
      return false;
    }
    
    const hasEmptyItems = items.some(item => !item.description || item.quantity <= 0);
    if (hasEmptyItems) {
      setError('Please fill in all item details and ensure quantities are greater than zero');
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Duplicating quotation:', {
        number: quotationNumber,
        clientId: selectedClientId,
        issueDate,
        expiryDate,
        items,
        terms,
        notes,
        totals
      });
      
      onClose();
    } catch (error) {
      console.error('Error duplicating quotation:', error);
      setError('Failed to duplicate quotation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-business max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 font-sf-pro">Duplicate Quotation</h2>
            <p className="text-sm text-slate-600 font-sf-pro">Create a new quotation based on {quotation?.number}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md flex items-start mb-6">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quotation Details */}
            <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20">
              <CardHeader>
                <CardTitle className="text-lg font-sf-pro">Quotation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quotationNumber" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                      Quotation Number
                    </label>
                    <input
                      id="quotationNumber"
                      type="text"
                      value={quotationNumber}
                      onChange={(e) => setQuotationNumber(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                      placeholder="QUO-2025-0001"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                      Client *
                    </label>
                    {selectedClient ? (
                      <div className="flex justify-between items-center p-3 border border-slate-300 rounded-lg bg-slate-50">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-mokm-purple-100 flex items-center justify-center text-mokm-purple-600">
                            {selectedClient.type === 'individual' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Building className="h-4 w-4" />
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-slate-900 font-sf-pro">{selectedClient.name}</p>
                            <p className="text-xs text-slate-500 font-sf-pro">{selectedClient.email}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowClientSelector(true)}
                          className="text-mokm-purple-600 hover:text-mokm-purple-700 font-sf-pro"
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowClientSelector(true)}
                        className="w-full justify-center font-sf-pro"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Select Client
                      </Button>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="issueDate" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                      Issue Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        id="issueDate"
                        type="date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                      Expiry Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        id="expiryDate"
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items Section */}
            <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-sf-pro">Quotation Items</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                    className="font-sf-pro"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-slate-900 font-sf-pro">Item {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className={items.length === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-red-600 hover:text-red-700'}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                          Description *
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                          placeholder="e.g. Website Design"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                          Quantity *
                        </label>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          required
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                          Unit Price (R) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          required
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                          Tax Rate (%)
                        </label>
                        <select
                          value={item.taxRate}
                          onChange={(e) => updateItem(item.id, 'taxRate', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                        >
                          <option value="0">0% - No Tax</option>
                          <option value="15">15% - Standard Rate</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                          Discount Amount (R)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.discount}
                          onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-lg mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 font-sf-pro">Item Total:</span>
                        <span className="font-medium font-sf-pro">
                          R {(
                            (item.quantity * item.unitPrice - item.discount) * 
                            (1 + item.taxRate / 100)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Totals */}
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-end">
                    <div className="w-full md:w-64">
                      <div className="flex justify-between py-2">
                        <span className="text-slate-600 font-sf-pro">Subtotal:</span>
                        <span className="font-sf-pro">R {totals.subtotal.toFixed(2)}</span>
                      </div>
                      {totals.discountTotal > 0 && (
                        <div className="flex justify-between py-2 text-slate-600">
                          <span className="font-sf-pro">Discount:</span>
                          <span className="font-sf-pro">- R {totals.discountTotal.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 text-slate-600">
                        <span className="font-sf-pro">Tax:</span>
                        <span className="font-sf-pro">R {totals.taxTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 font-bold text-lg border-t border-slate-200 mt-2 pt-2">
                        <span className="font-sf-pro">Total:</span>
                        <span className="font-sf-pro">R {totals.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Notes */}
            <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20">
              <CardHeader>
                <CardTitle className="text-lg font-sf-pro">Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="terms" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                      Terms and Conditions
                    </label>
                    <Textarea
                      id="terms"
                      rows={4}
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                      className="font-sf-pro"
                      placeholder="Payment terms, delivery conditions, etc."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                      Notes
                    </label>
                    <Textarea
                      id="notes"
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="font-sf-pro"
                      placeholder="Additional notes for the client..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-slate-200">
          <Button variant="outline" onClick={onClose} className="font-sf-pro">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 hover:from-mokm-orange-600 hover:via-mokm-pink-600 hover:to-mokm-purple-600 text-white font-sf-pro"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Quotation
              </>
            )}
          </Button>
        </div>

        {/* Client Selector Modal */}
        {showClientSelector && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <h3 className="text-lg font-medium text-slate-900 mb-4 font-sf-pro">Select Client</h3>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={clientSearchQuery}
                  onChange={(e) => setClientSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 gap-2">
                  {filteredClients.length > 0 ? (
                    filteredClients.map(client => (
                      <button
                        key={client.id}
                        type="button"
                        onClick={() => {
                          setSelectedClientId(client.id);
                          setShowClientSelector(false);
                        }}
                        className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-mokm-purple-100 flex items-center justify-center text-mokm-purple-600">
                          {client.type === 'individual' ? (
                            <User className="h-5 w-5" />
                          ) : (
                            <Building className="h-5 w-5" />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-slate-900 font-sf-pro">{client.name}</p>
                          <p className="text-xs text-slate-500 font-sf-pro">{client.email}</p>
                          <p className="text-xs text-slate-500 font-sf-pro">{client.address}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-500 font-sf-pro">
                      No clients found matching your search
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                <Button
                  variant="ghost"
                  className="text-mokm-purple-600 hover:text-mokm-purple-700 font-sf-pro"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Client
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setShowClientSelector(false)}
                  className="font-sf-pro"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DuplicateQuotationModal;
