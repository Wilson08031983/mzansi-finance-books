
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
  ArrowLeft,
  MoreHorizontal,
  ChevronDown,
  Settings,
  Save,
  Calendar,
  DollarSign,
  Users,
  Tag,
  SortAsc,
  SortDesc,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuotationsTable from '@/components/quotations/QuotationsTable';
import QuotationsGrid from '@/components/quotations/QuotationsGrid';
import CreateQuotationModal from '@/components/quotations/CreateQuotationModal';
import QuotationsStats from '@/components/quotations/QuotationsStats';
import QuotationsAdvancedFilters from '@/components/quotations/QuotationsAdvancedFilters';
import QuotationsBulkActions from '@/components/quotations/QuotationsBulkActions';
import QuotationsPagination from '@/components/quotations/QuotationsPagination';

const Quotations = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isCreateQuotationModalOpen, setIsCreateQuotationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuotations, setSelectedQuotations] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [savedFilters, setSavedFilters] = useState<any[]>([]);
  
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    dateType: 'created', // created, expiry, modified
    client: 'all',
    amountMin: '',
    amountMax: '',
    salesperson: 'all',
    tags: [],
    customFields: {}
  });

  // Enhanced mock data with more comprehensive fields
  const mockQuotations = [
    {
      id: '1',
      number: 'QUO-2024-001',
      reference: 'PROJECT-ALPHA',
      client: 'Tech Solutions Ltd',
      clientId: 'client-1',
      clientEmail: 'john@techsolutions.com',
      clientContact: 'John Smith',
      clientLogo: '',
      date: '2024-01-15',
      expiryDate: '2024-02-15',
      lastModified: '2024-01-16',
      amount: 25000,
      currency: 'ZAR',
      language: 'en',
      status: 'sent',
      salesperson: 'Sarah Johnson',
      salespersonId: 'user-1',
      project: 'Alpha Development',
      tags: ['urgent', 'development'],
      priority: 'high',
      customFields: {
        department: 'IT',
        region: 'Western Cape'
      },
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
        }
      ],
      subtotal: 20000,
      taxAmount: 3000,
      discount: 0,
      totalAmount: 25000,
      terms: 'Payment due within 30 days',
      notes: 'Initial development phase',
      attachments: [],
      revisionHistory: [],
      viewedAt: '2024-01-16T10:30:00Z',
      sentAt: '2024-01-15T14:20:00Z'
    },
    {
      id: '2',
      number: 'QUO-2024-002',
      reference: 'DESIGN-WORK',
      client: 'Creative Agency',
      clientId: 'client-2',
      clientEmail: 'sarah@creative.com',
      clientContact: 'Sarah Davis',
      clientLogo: '',
      date: '2024-01-14',
      expiryDate: '2024-02-14',
      lastModified: '2024-01-17',
      amount: 18500,
      currency: 'ZAR',
      language: 'en',
      status: 'accepted',
      salesperson: 'Michael Chen',
      salespersonId: 'user-2',
      project: 'Brand Redesign',
      tags: ['design', 'branding'],
      priority: 'medium',
      customFields: {
        department: 'Marketing',
        region: 'Gauteng'
      },
      items: [
        {
          id: 'item-2',
          description: 'Brand Design Package',
          quantity: 1,
          unit: 'package',
          rate: 15000,
          taxRate: 15,
          discount: 500,
          amount: 14500
        }
      ],
      subtotal: 14500,
      taxAmount: 2175,
      discount: 500,
      totalAmount: 18500,
      terms: 'Payment due within 15 days',
      notes: 'Brand guidelines included',
      attachments: [],
      revisionHistory: [],
      viewedAt: '2024-01-16T09:15:00Z',
      sentAt: '2024-01-14T11:30:00Z',
      acceptedAt: '2024-01-17T16:45:00Z'
    },
    {
      id: '3',
      number: 'QUO-2024-003',
      reference: 'GOV-CONTRACT',
      client: 'Government Dept',
      clientId: 'client-3',
      clientEmail: 'emily@gov.za',
      clientContact: 'Emily Johnson',
      clientLogo: '',
      date: '2024-01-12',
      expiryDate: '2024-01-20',
      lastModified: '2024-01-20',
      amount: 45000,
      currency: 'ZAR',
      language: 'en',
      status: 'expired',
      salesperson: 'David Wilson',
      salespersonId: 'user-3',
      project: 'Government Portal',
      tags: ['government', 'portal'],
      priority: 'high',
      customFields: {
        department: 'Public Sector',
        region: 'Western Cape'
      },
      items: [
        {
          id: 'item-3',
          description: 'Portal Development',
          quantity: 1,
          unit: 'project',
          rate: 40000,
          taxRate: 15,
          discount: 1000,
          amount: 39000
        }
      ],
      subtotal: 39000,
      taxAmount: 5850,
      discount: 1000,
      totalAmount: 45000,
      terms: 'Payment due within 45 days',
      notes: 'Government compliance required',
      attachments: [],
      revisionHistory: [],
      viewedAt: null,
      sentAt: '2024-01-12T08:00:00Z'
    },
    {
      id: '4',
      number: 'QUO-2024-004',
      reference: 'MVDEV-001',
      client: 'StartUp Inc',
      clientId: 'client-4',
      clientEmail: 'info@startup.com',
      clientContact: 'Alex Brown',
      clientLogo: '',
      date: '2024-01-16',
      expiryDate: '2024-02-16',
      lastModified: '2024-01-16',
      amount: 12000,
      currency: 'ZAR',
      language: 'en',
      status: 'draft',
      salesperson: 'Sarah Johnson',
      salespersonId: 'user-1',
      project: 'MVP Development',
      tags: ['startup', 'mvp'],
      priority: 'low',
      customFields: {
        department: 'Technology',
        region: 'Gauteng'
      },
      items: [
        {
          id: 'item-4',
          description: 'MVP Development',
          quantity: 1,
          unit: 'project',
          rate: 10000,
          taxRate: 15,
          discount: 0,
          amount: 10000
        }
      ],
      subtotal: 10000,
      taxAmount: 1500,
      discount: 0,
      totalAmount: 12000,
      terms: 'Payment due within 30 days',
      notes: 'Startup discount applied',
      attachments: [],
      revisionHistory: [],
      viewedAt: null,
      sentAt: null
    }
  ];

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

  const filteredQuotations = mockQuotations.filter(quotation => {
    const matchesSearch = quotation.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || quotation.status === filters.status;
    const matchesClient = filters.client === 'all' || quotation.clientId === filters.client;
    const matchesSalesperson = filters.salesperson === 'all' || quotation.salespersonId === filters.salesperson;
    
    const matchesAmountRange = 
      (!filters.amountMin || quotation.amount >= parseFloat(filters.amountMin)) &&
      (!filters.amountMax || quotation.amount <= parseFloat(filters.amountMax));
    
    const matchesTags = filters.tags.length === 0 || 
      filters.tags.some(tag => quotation.tags.includes(tag));
    
    return matchesSearch && matchesStatus && matchesClient && matchesSalesperson && 
           matchesAmountRange && matchesTags;
  });

  const sortedQuotations = [...filteredQuotations].sort((a, b) => {
    let aValue = a[sortColumn as keyof typeof a];
    let bValue = b[sortColumn as keyof typeof b];
    
    if (sortColumn === 'amount') {
      aValue = a.amount;
      bValue = b.amount;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const totalPages = Math.ceil(sortedQuotations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuotations = sortedQuotations.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectQuotation = (quotationId: string) => {
    setSelectedQuotations(prev => 
      prev.includes(quotationId) 
        ? prev.filter(id => id !== quotationId)
        : [...prev, quotationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedQuotations.length === paginatedQuotations.length) {
      setSelectedQuotations([]);
    } else {
      setSelectedQuotations(paginatedQuotations.map(quotation => quotation.id));
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)]);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({
      status: 'all',
      dateRange: 'all',
      dateType: 'created',
      client: 'all',
      amountMin: '',
      amountMax: '',
      salesperson: 'all',
      tags: [],
      customFields: {}
    });
  };

  const handleSaveFilter = () => {
    const filterName = prompt('Enter filter name:');
    if (filterName) {
      setSavedFilters(prev => [...prev, {
        id: Date.now().toString(),
        name: filterName,
        filters: { ...filters },
        searchTerm
      }]);
    }
  };

  const clients = Array.from(new Set(mockQuotations.map(q => ({ id: q.clientId, name: q.client }))));
  const salespersons = Array.from(new Set(mockQuotations.map(q => ({ id: q.salespersonId, name: q.salesperson }))));
  const allTags = Array.from(new Set(mockQuotations.flatMap(q => q.tags)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
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
        
        <div className="flex items-center space-x-3">
          {/* Import/Export Actions */}
          <div className="relative">
            <Button
              variant="outline"
              className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="relative">
            <Button
              variant="outline"
              className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          {/* View Toggle */}
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
          
          {/* Settings */}
          <Button
            variant="outline"
            className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
          >
            <Settings className="h-4 w-4" />
          </Button>
          
          {/* Create Quotation */}
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

      {/* Search and Filters Section */}
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Main Search Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search quotations by number, client, or reference"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
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
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className={`border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300 ${
                    showAdvancedFilters ? 'bg-mokm-purple-50 border-mokm-purple-300' : ''
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleSaveFilter}
                  className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Filter
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
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
                className="px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              
              <select
                value={filters.client}
                onChange={(e) => setFilters(prev => ({ ...prev, client: e.target.value }))}
                className="px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
              >
                <option value="all">All Clients</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
              
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-lg transition-all duration-300"
              >
                Clear Filters
              </Button>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600 font-sf-pro">Recent:</span>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchTerm(search)}
                      className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors font-sf-pro"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <QuotationsAdvancedFilters
          filters={filters}
          setFilters={setFilters}
          clients={clients}
          salespersons={salespersons}
          allTags={allTags}
        />
      )}

      {/* Bulk Actions Bar */}
      {selectedQuotations.length > 0 && (
        <QuotationsBulkActions
          selectedCount={selectedQuotations.length}
          selectedQuotations={selectedQuotations}
          onClearSelection={() => setSelectedQuotations([])}
        />
      )}

      {/* Quotations List */}
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-900 font-sf-pro text-xl">
              {sortedQuotations.length} Quotation{sortedQuotations.length !== 1 ? 's' : ''}
              {selectedQuotations.length > 0 && (
                <span className="text-sm font-normal text-slate-600 ml-2">
                  ({selectedQuotations.length} selected)
                </span>
              )}
            </CardTitle>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <span>Sort by:</span>
                <button
                  onClick={() => handleSort('date')}
                  className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-slate-100 ${
                    sortColumn === 'date' ? 'text-mokm-purple-600' : ''
                  }`}
                >
                  <span>Date</span>
                  {sortColumn === 'date' && (
                    sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => handleSort('amount')}
                  className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-slate-100 ${
                    sortColumn === 'amount' ? 'text-mokm-purple-600' : ''
                  }`}
                >
                  <span>Amount</span>
                  {sortColumn === 'amount' && (
                    sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => handleSort('client')}
                  className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-slate-100 ${
                    sortColumn === 'client' ? 'text-mokm-purple-600' : ''
                  }`}
                >
                  <span>Client</span>
                  {sortColumn === 'client' && (
                    sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <QuotationsTable 
              quotations={paginatedQuotations}
              selectedQuotations={selectedQuotations}
              onSelectQuotation={handleSelectQuotation}
              onSelectAll={handleSelectAll}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          ) : (
            <QuotationsGrid 
              quotations={paginatedQuotations}
              selectedQuotations={selectedQuotations}
              onSelectQuotation={handleSelectQuotation}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          )}
          
          {sortedQuotations.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-slate-900 font-semibold font-sf-pro mb-2">No quotations found</h3>
              <p className="text-slate-600 font-sf-pro text-sm mb-4">
                {searchTerm || Object.values(filters).some(f => f !== 'all' && f !== '' && (Array.isArray(f) ? f.length > 0 : true))
                  ? 'Try adjusting your search terms or filters'
                  : 'Get started by creating your first quotation'
                }
              </p>
              <div className="flex items-center justify-center space-x-3">
                {(searchTerm || Object.values(filters).some(f => f !== 'all' && f !== '' && (Array.isArray(f) ? f.length > 0 : true))) && (
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="font-sf-pro rounded-xl"
                  >
                    Clear Filters
                  </Button>
                )}
                <Button
                  onClick={() => setIsCreateQuotationModalOpen(true)}
                  className="bg-gradient-to-r from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 hover:from-mokm-orange-600 hover:via-mokm-pink-600 hover:to-mokm-purple-600 text-white font-sf-pro rounded-xl"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Quotation
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {sortedQuotations.length > 0 && (
        <QuotationsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={sortedQuotations.length}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
          }}
          startIndex={startIndex}
          endIndex={Math.min(startIndex + itemsPerPage, sortedQuotations.length)}
        />
      )}

      {/* Create Quotation Modal */}
      <CreateQuotationModal 
        isOpen={isCreateQuotationModalOpen}
        onClose={() => setIsCreateQuotationModalOpen(false)}
      />
    </div>
  );
};

export default Quotations;
