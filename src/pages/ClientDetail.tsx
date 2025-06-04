
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Save, 
  ArrowLeft, 
  Upload, 
  Building, 
  User, 
  Mail, 
  Phone,
  MapPin,
  FileText,
  Briefcase,
  AlertCircle,
  Loader2
} from 'lucide-react';

type ClientType = 'individual' | 'company' | 'government' | 'non-profit';

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
  notes?: string;
  logoUrl?: string;
  status: 'active' | 'inactive';
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
    notes: 'ABC Corporation is a long-term client since 2023. They prefer detailed quotations and typically pay within 14 days.',
    logoUrl: '', // Would be a real URL in production
    status: 'active'
  };
};

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const clientId = id || '';

  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [clientType, setClientType] = useState<ClientType>('company');
  
  // Form state
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
    position: '',
    registrationNumber: '',
    taxNumber: '',
    industry: '',
    website: '',
    notes: '',
    status: 'active' as 'active' | 'inactive'
  });

  // Logo file state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [originalLogoUrl, setOriginalLogoUrl] = useState('');

  useEffect(() => {
    // In a real app, fetch client data from API
    // For now, simulate an API call with a timeout
    const loadClient = async () => {
      setInitialLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get sample client data
        const client = getSampleClient(clientId);
        
        // Update state with client data
        setClientType(client.type);
        setClientData({
          name: client.name || '',
          email: client.email || '',
          phone: client.phone || '',
          address: client.address || '',
          contactPerson: client.contactPerson || '',
          position: client.position || '',
          registrationNumber: client.registrationNumber || '',
          taxNumber: client.taxNumber || '',
          industry: client.industry || '',
          website: client.website || '',
          notes: client.notes || '',
          status: client.status
        });
        
        if (client.logoUrl) {
          setOriginalLogoUrl(client.logoUrl);
          setLogoPreview(client.logoUrl);
        }
      } catch (err) {
        console.error('Error loading client:', err);
        setError('Failed to load client data');
      } finally {
        setInitialLoading(false);
      }
    };

    loadClient();
  }, [clientId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClientData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Update the file state
    setLogoFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (!clientData.name) {
      setError('Client name is required');
      return false;
    }
    
    if (!clientData.email) {
      setError('Email is required');
      return false;
    }
    
    if (!clientData.phone) {
      setError('Phone number is required');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      // In a real app, update client in database and handle logo upload
      // For now, simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Client updated successfully:', clientData);
      
      // Success! Navigate back to client details
      navigate(`/clients/${clientId}`);
    } catch (err) {
      console.error('Error updating client:', err);
      setError('Failed to update client. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-600 font-sf-pro">Loading client...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={`/clients/${clientId}`} className="p-2 rounded-full hover:bg-white/80 transition-colors">
              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-sf-pro">Edit Client</h1>
              <p className="text-slate-600 font-sf-pro">Update client information</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-sf-pro"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="glass backdrop-blur-sm bg-red-50/50 border border-red-200/20 shadow-business rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <span className="text-red-600 font-sf-pro">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Type Selection */}
          <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4 font-sf-pro">Client Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                type="button"
                onClick={() => setClientType('company')}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  clientType === 'company' 
                    ? 'border-blue-500 bg-blue-50/50' 
                    : 'border-white/20 hover:border-white/40 bg-white/30'
                } flex flex-col items-center text-center`}
              >
                <Building className={`h-8 w-8 mb-2 ${clientType === 'company' ? 'text-blue-600' : 'text-slate-500'}`} />
                <span className="text-sm font-medium font-sf-pro">Company</span>
                <span className="text-xs text-slate-500 mt-1 font-sf-pro">Business entities</span>
              </button>
              
              <button
                type="button"
                onClick={() => setClientType('individual')}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  clientType === 'individual' 
                    ? 'border-blue-500 bg-blue-50/50' 
                    : 'border-white/20 hover:border-white/40 bg-white/30'
                } flex flex-col items-center text-center`}
              >
                <User className={`h-8 w-8 mb-2 ${clientType === 'individual' ? 'text-blue-600' : 'text-slate-500'}`} />
                <span className="text-sm font-medium font-sf-pro">Individual</span>
                <span className="text-xs text-slate-500 mt-1 font-sf-pro">Personal clients</span>
              </button>
              
              <button
                type="button"
                onClick={() => setClientType('government')}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  clientType === 'government' 
                    ? 'border-blue-500 bg-blue-50/50' 
                    : 'border-white/20 hover:border-white/40 bg-white/30'
                } flex flex-col items-center text-center`}
              >
                <Building className={`h-8 w-8 mb-2 ${clientType === 'government' ? 'text-blue-600' : 'text-slate-500'}`} />
                <span className="text-sm font-medium font-sf-pro">Government</span>
                <span className="text-xs text-slate-500 mt-1 font-sf-pro">Public sector</span>
              </button>
              
              <button
                type="button"
                onClick={() => setClientType('non-profit')}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  clientType === 'non-profit' 
                    ? 'border-blue-500 bg-blue-50/50' 
                    : 'border-white/20 hover:border-white/40 bg-white/30'
                } flex flex-col items-center text-center`}
              >
                <Building className={`h-8 w-8 mb-2 ${clientType === 'non-profit' ? 'text-blue-600' : 'text-slate-500'}`} />
                <span className="text-sm font-medium font-sf-pro">Non-Profit</span>
                <span className="text-xs text-slate-500 mt-1 font-sf-pro">NGOs, charities</span>
              </button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4 font-sf-pro">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                    {clientType === 'individual' ? 'Full Name' : 'Organization Name'} *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={clientData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                    placeholder={clientType === 'individual' ? 'John Doe' : 'ABC Corporation'}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={clientData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                        placeholder="client@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={clientData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                        placeholder="+27 12 345 6789"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-2 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-slate-400" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={clientData.address}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                      placeholder="123 Business Street, Johannesburg, 2000, South Africa"
                    />
                  </div>
                </div>
                
                {clientType !== 'individual' && (
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                      Website
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={clientData.website}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                      placeholder="https://www.example.com"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">
                  Client Logo
                </label>
                <div className="flex flex-col items-center p-6 border-2 border-dashed border-white/20 rounded-lg bg-white/30">
                  {logoPreview ? (
                    <div className="relative w-40 h-40 mb-4">
                      <img
                        src={logoPreview}
                        alt="Client Logo Preview"
                        className="object-contain w-full h-full rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 flex items-center justify-center bg-white/50 rounded-lg mb-4">
                      <Building className="h-12 w-12 text-slate-400" />
                    </div>
                  )}
                  
                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="logo"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-white/20 rounded-lg hover:bg-white/90 transition-colors cursor-pointer font-sf-pro text-sm"
                  >
                    <Upload className="h-4 w-4" />
                    {logoPreview ? 'Change Logo' : 'Upload Logo'}
                  </label>
                  
                  <p className="text-xs text-slate-500 mt-2 text-center font-sf-pro">
                    PNG, JPG or GIF up to 2MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Client Status */}
          <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4 font-sf-pro">Status</h2>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer font-sf-pro">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={clientData.status === 'active'}
                  onChange={() => setClientData(prev => ({ ...prev, status: 'active' }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>Active</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer font-sf-pro">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={clientData.status === 'inactive'}
                  onChange={() => setClientData(prev => ({ ...prev, status: 'inactive' }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>Inactive</span>
              </label>
            </div>
          </div>

          {/* Additional Information */}
          <div className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business rounded-lg p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4 font-sf-pro">Additional Information</h2>
            
            <div className="space-y-4">
              {clientType !== 'individual' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactPerson" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                        Contact Person
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          id="contactPerson"
                          name="contactPerson"
                          type="text"
                          value={clientData.contactPerson}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                        Position
                      </label>
                      <input
                        id="position"
                        name="position"
                        type="text"
                        value={clientData.position}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                        placeholder="Chief Financial Officer"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="registrationNumber" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                        Registration Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          id="registrationNumber"
                          name="registrationNumber"
                          type="text"
                          value={clientData.registrationNumber}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                          placeholder="2023/123456/07"
                        />
                      </div>
                    </div>
                    
                    {(clientType === 'company' || clientType === 'non-profit') && (
                      <div>
                        <label htmlFor="taxNumber" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                          Tax Number
                        </label>
                        <input
                          id="taxNumber"
                          name="taxNumber"
                          type="text"
                          value={clientData.taxNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                          placeholder="9876543210"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                      Industry
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-4 w-4 text-slate-400" />
                      </div>
                      <select
                        id="industry"
                        name="industry"
                        value={clientData.industry}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                      >
                        <option value="">Select Industry</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Construction">Construction</option>
                        <option value="Education">Education</option>
                        <option value="Finance">Finance & Banking</option>
                        <option value="Government">Government</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Hospitality">Hospitality & Tourism</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Media">Media & Entertainment</option>
                        <option value="Mining">Mining</option>
                        <option value="Non-profit">Non-profit & Charity</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Retail">Retail</option>
                        <option value="Telecommunications">Telecommunications</option>
                        <option value="Transportation">Transportation & Logistics</option>
                        <option value="Utilities">Utilities & Energy</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1 font-sf-pro">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={clientData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 font-sf-pro"
                  placeholder="Additional notes about this client..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link 
              to={`/clients/${clientId}`} 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-white/20 rounded-lg hover:bg-white/90 transition-colors font-sf-pro"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-sf-pro"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientDetail;
