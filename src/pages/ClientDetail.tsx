
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  FileText, 
  Briefcase,
  Building,
  User,
  Clock,
  Plus,
  MoreHorizontal,
  Users,
  DollarSign,
  FileCheck,
  AlertCircle
} from 'lucide-react';

// Type definitions
type ClientType = 'individual' | 'company' | 'government' | 'non-profit';

type ClientTransaction = {
  id: string;
  type: 'invoice' | 'quotation' | 'payment';
  number: string;
  date: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'accepted' | 'declined';
};

type Client = {
  id: string;
  name: string;
  type: ClientType;
  email: string;
  phone: string;
  address: string;
  contactPerson?: string;
  position?: string;
  registrationNumber?: string;
  taxNumber?: string;
  industry?: string;
  website?: string;
  createdAt: string;
  logoUrl?: string;
  totalProjects: number;
  totalInvoices: number;
  status: 'active' | 'inactive';
  notes?: string;
};

// Sample client data for demonstration
const getSampleClient = (id: string): Client => {
  return {
    id,
    name: 'ABC Corporation',
    type: 'company',
    email: 'info@abccorp.co.za',
    phone: '011 123 4567',
    address: '123 Main Street, Johannesburg, 2000',
    contactPerson: 'John Smith',
    position: 'Chief Financial Officer',
    registrationNumber: '2020/123456/07',
    taxNumber: '9876543210',
    industry: 'Technology',
    website: 'https://www.abccorp.co.za',
    createdAt: '2023-01-15',
    logoUrl: '', // Would be a real URL in production
    totalProjects: 5,
    totalInvoices: 12,
    status: 'active',
    notes: 'ABC Corporation is a long-term client since 2023. They prefer detailed quotations and typically pay within 14 days.'
  };
};

// Sample transactions for demonstration
const getSampleTransactions = (): ClientTransaction[] => {
  return [
    {
      id: '1',
      type: 'invoice',
      number: 'INV-2025-001',
      date: '2025-05-15',
      amount: 12500.00,
      status: 'paid',
    },
    {
      id: '2',
      type: 'quotation',
      number: 'QUO-2025-003',
      date: '2025-05-28',
      amount: 18750.00,
      status: 'sent',
    },
    {
      id: '3',
      type: 'payment',
      number: 'PMT-2025-001',
      date: '2025-05-20',
      amount: 12500.00,
      status: 'paid',
    },
    {
      id: '4',
      type: 'invoice',
      number: 'INV-2025-002',
      date: '2025-06-01',
      amount: 4320.00,
      status: 'draft',
    },
    {
      id: '5',
      type: 'quotation',
      number: 'QUO-2025-002',
      date: '2025-04-10',
      amount: 9600.00,
      status: 'accepted',
    },
  ];
};

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const clientId = id || '';
  
  const [client, setClient] = useState<Client | null>(null);
  const [transactions, setTransactions] = useState<ClientTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // In a real app, fetch client data from API
    // For now, simulate an API call with a timeout
    setLoading(true);
    
    setTimeout(() => {
      try {
        const clientData = getSampleClient(clientId);
        const transactionsData = getSampleTransactions();
        
        setClient(clientData);
        setTransactions(transactionsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load client details');
        setLoading(false);
      }
    }, 800);
  }, [clientId]);

  const handleDeleteClient = async () => {
    setLoading(true);
    
    try {
      // In a real app, delete client from API
      // For now, simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowDeleteModal(false);
      navigate('/clients');
    } catch (err) {
      setError('Failed to delete client');
      setLoading(false);
    }
  };

  const getClientTypeIcon = (type: ClientType) => {
    switch (type) {
      case 'company':
        return <Building className="h-5 w-5" />;
      case 'government':
        return <Building className="h-5 w-5" />;
      case 'non-profit':
        return <Building className="h-5 w-5" />;
      case 'individual':
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: ClientTransaction['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionIcon = (type: ClientTransaction['type']) => {
    switch (type) {
      case 'invoice':
        return <FileText className="h-4 w-4" />;
      case 'quotation':
        return <FileCheck className="h-4 w-4" />;
      case 'payment':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (loading && !client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-600 font-sf-pro">Loading client...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="p-6 glass backdrop-blur-sm bg-red-50/50 border border-red-200/20 shadow-business rounded-lg text-red-600 flex items-center">
          <AlertCircle className="h-6 w-6 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="p-6 glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg text-slate-600">
          Client not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Link to="/clients" className="p-2 rounded-full hover:bg-white/80 transition-colors">
              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-sf-pro">{client.name}</h1>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 font-sf-pro ${
                  client.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </span>
                <span className="text-slate-600 flex items-center font-sf-pro">
                  <Clock className="h-4 w-4 mr-1" />
                  Client since {new Date(client.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link to={`/clients/${client.id}/edit`} className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-white/20 rounded-lg hover:bg-white/90 transition-colors font-sf-pro">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Link>

            <button 
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-sf-pro"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>

            <div className="relative group">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-white/20 rounded-lg hover:bg-white/90 transition-colors font-sf-pro">
                <MoreHorizontal className="h-5 w-5" />
              </button>
              <div className="absolute right-0 mt-2 w-48 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg shadow-business py-1 z-10 hidden group-hover:block">
                <Link to={`/quotations/create?client=${client.id}`} className="block px-4 py-2 text-sm text-slate-700 hover:bg-white/50 font-sf-pro">
                  Create Quotation
                </Link>
                <Link to={`/invoices/create?client=${client.id}`} className="block px-4 py-2 text-sm text-slate-700 hover:bg-white/50 font-sf-pro">
                  Create Invoice
                </Link>
                <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-white/50 font-sf-pro">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 mr-2">
                  {getClientTypeIcon(client.type)}
                </div>
                <h2 className="text-lg font-medium font-sf-pro">Client Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1 font-sf-pro">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-slate-400 mr-2 mt-0.5" />
                      <div>
                        <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline font-sf-pro">
                          {client.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-slate-400 mr-2 mt-0.5" />
                      <div>
                        <a href={`tel:${client.phone}`} className="text-blue-600 hover:underline font-sf-pro">
                          {client.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-slate-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-slate-700 font-sf-pro">{client.address}</p>
                      </div>
                    </div>
                    
                    {client.website && (
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 text-slate-400 mr-2 mt-0.5" />
                        <div>
                          <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-sf-pro">
                            {client.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1 font-sf-pro">Business Details</h3>
                  <div className="space-y-3">
                    {client.type !== 'individual' && client.contactPerson && (
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-slate-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-slate-700 font-sf-pro">{client.contactPerson}</p>
                          {client.position && (
                            <p className="text-sm text-slate-500 font-sf-pro">{client.position}</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {client.registrationNumber && (
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-slate-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500 font-sf-pro">Registration Number</p>
                          <p className="text-slate-700 font-sf-pro">{client.registrationNumber}</p>
                        </div>
                      </div>
                    )}
                    
                    {client.taxNumber && (
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-slate-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500 font-sf-pro">Tax Number</p>
                          <p className="text-slate-700 font-sf-pro">{client.taxNumber}</p>
                        </div>
                      </div>
                    )}
                    
                    {client.industry && (
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 text-slate-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500 font-sf-pro">Industry</p>
                          <p className="text-slate-700 font-sf-pro">{client.industry}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {client.notes && (
              <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6">
                <h2 className="text-lg font-medium mb-3 font-sf-pro">Notes</h2>
                <p className="text-slate-700 font-sf-pro">{client.notes}</p>
              </div>
            )}

            {/* Transactions */}
            <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium font-sf-pro">Recent Transactions</h2>
                <Link to={`/clients/${client.id}/transactions`} className="text-sm text-blue-600 hover:underline font-sf-pro">
                  View All
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/20">
                  <thead className="bg-white/30">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider font-sf-pro">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider font-sf-pro">
                        Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider font-sf-pro">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider font-sf-pro">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider font-sf-pro">
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/20 divide-y divide-white/20">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-white/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                              transaction.type === 'invoice' 
                                ? 'bg-blue-100 text-blue-600' 
                                : transaction.type === 'quotation'
                                  ? 'bg-purple-100 text-purple-600'
                                  : 'bg-green-100 text-green-600'
                            }`}>
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div className="ml-2">
                              <div className="text-sm font-medium text-slate-900 font-sf-pro">
                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900 font-sf-pro">{transaction.number}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900 font-sf-pro">{transaction.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900 font-sf-pro">
                            R {transaction.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sf-pro ${getStatusColor(transaction.status)}`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link 
                            to={`/${transaction.type}s/${transaction.id}`} 
                            className="text-blue-600 hover:text-blue-900 font-sf-pro"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {transactions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-500 font-sf-pro">No transactions found</p>
                  <div className="mt-4 flex justify-center space-x-3">
                    <Link to={`/quotations/create?client=${client.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-white/20 rounded-lg hover:bg-white/90 transition-colors font-sf-pro">
                      <Plus className="h-4 w-4" />
                      <span>Create Quotation</span>
                    </Link>
                    <Link to={`/invoices/create?client=${client.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-white/20 rounded-lg hover:bg-white/90 transition-colors font-sf-pro">
                      <Plus className="h-4 w-4" />
                      <span>Create Invoice</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Logo */}
            <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6 flex flex-col items-center">
              {client.logoUrl ? (
                <div className="w-32 h-32 rounded-lg border overflow-hidden bg-white mb-3">
                  <img 
                    src={client.logoUrl} 
                    alt={`${client.name} Logo`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-lg border flex items-center justify-center bg-white/50 mb-3">
                  <div className="text-3xl font-bold text-blue-600 font-sf-pro">
                    {client.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                  </div>
                </div>
              )}
              <span className="text-sm text-slate-500 font-sf-pro">{client.type.charAt(0).toUpperCase() + client.type.slice(1)}</span>
            </div>

            {/* Stats */}
            <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 font-sf-pro">Client Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2 text-blue-600">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 mb-1 font-sf-pro">{client.totalProjects}</div>
                    <div className="text-sm text-slate-500 font-sf-pro">Projects</div>
                  </div>
                </div>
                
                <div className="bg-white/50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2 text-blue-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 mb-1 font-sf-pro">{client.totalInvoices}</div>
                    <div className="text-sm text-slate-500 font-sf-pro">Invoices</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3 font-sf-pro">Quick Actions</h3>
              <div className="space-y-2">
                <Link 
                  to={`/quotations/create?client=${client.id}`}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-sf-pro"
                >
                  <FileCheck className="h-4 w-4" />
                  <span>Create Quotation</span>
                </Link>
                <Link 
                  to={`/invoices/create?client=${client.id}`}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-sf-pro"
                >
                  <FileText className="h-4 w-4" />
                  <span>Create Invoice</span>
                </Link>
                <Link 
                  to={`/clients/${client.id}/projects/create`}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-sf-pro"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Create Project</span>
                </Link>
              </div>
            </div>

            {/* Team */}
            {client.type !== 'individual' && (
              <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium font-sf-pro">Team Contacts</h3>
                  <button className="text-sm text-blue-600 hover:underline font-sf-pro">Add</button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-white/50 rounded-lg">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-sf-pro">
                      JS
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-900 font-sf-pro">John Smith</p>
                      <p className="text-xs text-slate-500 font-sf-pro">Chief Financial Officer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/50 rounded-lg">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-sf-pro">
                      SD
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-900 font-sf-pro">Sarah Davis</p>
                      <p className="text-xs text-slate-500 font-sf-pro">HR Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="glass backdrop-blur-sm bg-white/90 border border-white/20 shadow-business rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-red-600 mb-4 font-sf-pro">Delete Client</h3>
              <p className="text-slate-700 mb-4 font-sf-pro">
                Are you sure you want to delete <span className="font-medium">{client.name}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-white/20 rounded-lg hover:bg-white/90 transition-colors font-sf-pro"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteClient}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-sf-pro"
                >
                  {loading ? 'Deleting...' : 'Delete Client'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetail;
