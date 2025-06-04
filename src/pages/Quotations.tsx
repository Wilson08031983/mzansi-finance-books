
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  RefreshCw,
  Download,
  Upload,
  FileText,
  Eye,
  Edit,
  Copy,
  Mail,
  Receipt,
  Trash2,
  ArrowLeft,
  MoreHorizontal,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuotationsTable from '@/components/quotations/QuotationsTable';
import QuotationsGrid from '@/components/quotations/QuotationsGrid';
import CreateQuotationModal from '@/components/quotations/CreateQuotationModal';
import QuotationsStats from '@/components/quotations/QuotationsStats';

const Quotations = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isCreateQuotationModalOpen, setIsCreateQuotationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuotations, setSelectedQuotations] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    client: 'all',
    amountRange: 'all'
  });

  const mockQuotations = [
    {
      id: '1',
      number: 'QUO-2024-001',
      client: 'Tech Solutions Ltd',
      clientEmail: 'john@techsolutions.com',
      date: '2024-01-15',
      expiryDate: '2024-02-15',
      amount: 25000,
      status: 'sent',
      reference: 'PROJECT-ALPHA',
      salesperson: 'Sarah Johnson',
      currency: 'ZAR'
    },
    {
      id: '2',
      number: 'QUO-2024-002',
      client: 'Creative Agency',
      clientEmail: 'sarah@creative.com',
      date: '2024-01-14',
      expiryDate: '2024-02-14',
      amount: 18500,
      status: 'accepted',
      reference: 'DESIGN-WORK',
      salesperson: 'Michael Chen',
      currency: 'ZAR'
    },
    {
      id: '3',
      number: 'QUO-2024-003',
      client: 'Government Dept',
      clientEmail: 'emily@gov.za',
      date: '2024-01-12',
      expiryDate: '2024-01-20',
      amount: 45000,
      status: 'expired',
      reference: 'GOV-CONTRACT',
      salesperson: 'David Wilson',
      currency: 'ZAR'
    },
    {
      id: '4',
      number: 'QUO-2024-004',
      client: 'StartUp Inc',
      clientEmail: 'info@startup.com',
      date: '2024-01-16',
      expiryDate: '2024-02-16',
      amount: 12000,
      status: 'draft',
      reference: 'MVDEV-001',
      salesperson: 'Sarah Johnson',
      currency: 'ZAR'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'sent':
      case 'viewed':
        return <Eye className="h-4 w-4 text-blue-500" />;
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
        return 'bg-green-100 text-green-800';
      case 'sent':
      case 'viewed':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredQuotations = mockQuotations.filter(quotation => {
    const matchesSearch = quotation.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || quotation.status === filters.status;
    const matchesClient = filters.client === 'all' || quotation.client === filters.client;
    
    return matchesSearch && matchesStatus && matchesClient;
  });

  const handleSelectQuotation = (quotationId: string) => {
    setSelectedQuotations(prev => 
      prev.includes(quotationId) 
        ? prev.filter(id => id !== quotationId)
        : [...prev, quotationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedQuotations.length === filteredQuotations.length) {
      setSelectedQuotations([]);
    } else {
      setSelectedQuotations(filteredQuotations.map(quotation => quotation.id));
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({
      status: 'all',
      dateRange: 'all',
      client: 'all',
      amountRange: 'all'
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-sf-pro">Quotations</h1>
            <p className="text-slate-600 font-sf-pro">Create, manage, and track your quotations</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          
          <Button
            variant="outline"
            className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <div className="flex items-center border border-slate-300 rounded-xl p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="rounded-lg"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-lg"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            onClick={() => setIsCreateQuotationModalOpen(true)}
            className="bg-gradient-to-r from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 hover:from-mokm-orange-600 hover:via-mokm-pink-600 hover:to-mokm-purple-600 text-white font-sf-pro rounded-xl shadow-colored hover:shadow-colored-lg transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Quotation
          </Button>
        </div>
      </div>

      {/* Quotations Stats */}
      <QuotationsStats quotations={mockQuotations} />

      {/* Search and Filters */}
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search quotations by number, client, or reference"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              )}
            </div>
            
            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="viewed">Viewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
              
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions Bar */}
      {selectedQuotations.length > 0 && (
        <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700 font-sf-pro">
                  {selectedQuotations.length} quotation{selectedQuotations.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-sf-pro rounded-lg"
                  >
                    Change Status
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-sf-pro rounded-lg"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-sf-pro rounded-lg"
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    Convert to Invoice
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-sf-pro rounded-lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-sf-pro rounded-lg text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedQuotations([])}
                className="font-sf-pro"
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quotations List */}
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-slate-900 font-sf-pro text-xl">
            {filteredQuotations.length} Quotation{filteredQuotations.length !== 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <QuotationsTable 
              quotations={filteredQuotations}
              selectedQuotations={selectedQuotations}
              onSelectQuotation={handleSelectQuotation}
              onSelectAll={handleSelectAll}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          ) : (
            <QuotationsGrid 
              quotations={filteredQuotations}
              selectedQuotations={selectedQuotations}
              onSelectQuotation={handleSelectQuotation}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          )}
          
          {filteredQuotations.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-slate-900 font-semibold font-sf-pro mb-2">No quotations found</h3>
              <p className="text-slate-600 font-sf-pro text-sm mb-4">Try adjusting your search terms or filters</p>
              <Button
                onClick={() => setIsCreateQuotationModalOpen(true)}
                className="bg-gradient-to-r from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 hover:from-mokm-orange-600 hover:via-mokm-pink-600 hover:to-mokm-purple-600 text-white font-sf-pro rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Quotation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Quotation Modal */}
      <CreateQuotationModal 
        isOpen={isCreateQuotationModalOpen}
        onClose={() => setIsCreateQuotationModalOpen(false)}
      />
    </div>
  );
};

export default Quotations;
