
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle
} from 'lucide-react';
import ClientsTable from '@/components/clients/ClientsTable';
import ClientsGrid from '@/components/clients/ClientsGrid';
import AddClientModal from '@/components/clients/AddClientModal';
import BulkActionsBar from '@/components/clients/BulkActionsBar';
import ClientsStats from '@/components/clients/ClientsStats';
import ClientsSearchAndFilters from '@/components/clients/ClientsSearchAndFilters';

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
    <div className="space-y-8">
      {/* Client Stats */}
      <ClientsStats clients={mockClients} />

      {/* Search and Filters */}
      <ClientsSearchAndFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddClientClick={() => setIsAddClientModalOpen(true)}
      />

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
  );
};

export default Clients;
