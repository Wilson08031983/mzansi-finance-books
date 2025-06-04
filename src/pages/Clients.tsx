
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Grid3X3, 
  List, 
  RefreshCw, 
  Download,
  Upload,
  Eye,
  Edit,
  Mail,
  FileText,
  Receipt,
  User,
  Building,
  Phone,
  Globe,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import ClientsTable from '@/components/clients/ClientsTable';
import ClientsGrid from '@/components/clients/ClientsGrid';
import AddClientModal from '@/components/clients/AddClientModal';
import ClientFilters from '@/components/clients/ClientFilters';
import BulkActionsBar from '@/components/clients/BulkActionsBar';

const Clients = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    clientType: 'all',
    dateRange: 'all'
  });

  const mockClients = [
    {
      id: '1',
      name: 'John Smith',
      company: 'Tech Solutions Ltd',
      email: 'john@techsolutions.com',
      phone: '+27 11 123 4567',
      totalValue: 45000,
      lastActivity: '2024-01-15',
      status: 'active',
      type: 'business',
      avatar: 'JS'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'Creative Agency',
      email: 'sarah@creative.com',
      phone: '+27 21 987 6543',
      totalValue: 32000,
      lastActivity: '2024-01-14',
      status: 'active',
      type: 'business',
      avatar: 'SJ'
    },
    {
      id: '3',
      name: 'Michael Chen',
      company: 'Individual',
      email: 'michael@email.com',
      phone: '+27 31 555 0123',
      totalValue: 15000,
      lastActivity: '2024-01-10',
      status: 'overdue',
      type: 'individual',
      avatar: 'MC'
    },
    {
      id: '4',
      name: 'Emily Brown',
      company: 'Government Dept',
      email: 'emily@gov.za',
      phone: '+27 12 444 5555',
      totalValue: 78000,
      lastActivity: '2024-01-08',
      status: 'inactive',
      type: 'government',
      avatar: 'EB'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || client.status === filters.status;
    const matchesType = filters.clientType === 'all' || client.type === filters.clientType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(client => client.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-start space-x-4">
            <Link to="/dashboard" className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 font-sf-pro">Clients</h1>
              <p className="text-slate-600 font-sf-pro">Manage your business clients and their information</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
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
              className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            
            <Button 
              onClick={() => setIsAddClientModalOpen(true)}
              className="bg-gradient-to-r from-mokm-purple-500 to-mokm-blue-500 hover:from-mokm-purple-600 hover:to-mokm-blue-600 text-white font-sf-pro rounded-xl shadow-colored hover:shadow-colored-lg transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Client Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-mokm-blue-500 to-mokm-purple-500 rounded-2xl shadow-colored">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 font-sf-pro">{mockClients.length}</p>
                  <p className="text-slate-600 font-sf-pro text-sm">Total Clients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-colored">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 font-sf-pro">
                    {mockClients.filter(c => c.status === 'active').length}
                  </p>
                  <p className="text-slate-600 font-sf-pro text-sm">Active Clients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-colored">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 font-sf-pro">
                    {mockClients.filter(c => c.status === 'overdue').length}
                  </p>
                  <p className="text-slate-600 font-sf-pro text-sm">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 rounded-2xl shadow-colored">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 font-sf-pro">
                    R{mockClients.reduce((sum, client) => sum + client.totalValue, 0).toLocaleString()}
                  </p>
                  <p className="text-slate-600 font-sf-pro text-sm">Total Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search clients by name, email, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              </div>
              
              <ClientFilters filters={filters} onFiltersChange={setFilters} />
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="rounded-xl"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-xl"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions Bar */}
        {selectedClients.length > 0 && (
          <BulkActionsBar 
            selectedCount={selectedClients.length}
            onClearSelection={() => setSelectedClients([])}
          />
        )}

        {/* Clients List */}
        <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-slate-900 font-sf-pro text-xl">
              {filteredClients.length} Client{filteredClients.length !== 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === 'table' ? (
              <ClientsTable 
                clients={filteredClients}
                selectedClients={selectedClients}
                onSelectClient={handleSelectClient}
                onSelectAll={handleSelectAll}
                getStatusIcon={getStatusIcon}
                getStatusColor={getStatusColor}
              />
            ) : (
              <ClientsGrid 
                clients={filteredClients}
                selectedClients={selectedClients}
                onSelectClient={handleSelectClient}
                getStatusIcon={getStatusIcon}
                getStatusColor={getStatusColor}
              />
            )}
          </CardContent>
        </Card>

        {/* Add Client Modal */}
        <AddClientModal 
          isOpen={isAddClientModalOpen}
          onClose={() => setIsAddClientModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Clients;
