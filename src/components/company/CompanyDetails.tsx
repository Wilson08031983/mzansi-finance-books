
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Save, X, Upload, Trash2 } from 'lucide-react';

const CompanyDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: 'MOK Mzansi Books',
    contactName: '',
    contactSurname: '',
    position: '',
    email: 'info@mokmzansibooks.com',
    phone: '+27 11 123 4567',
    website: 'www.mokmzansibooks.com',
    addressLine1: '123 Business Street',
    addressLine2: '',
    addressLine3: '',
    addressLine4: 'Johannesburg, 2000',
    regNumber: '2024/123456/07',
    vatNumber: '4123456789',
    taxNumber: 'TAX123456789',
    maaarNumber: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving company data:', companyData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Company Information */}
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-slate-900 font-sf-pro text-xl">Company Information</CardTitle>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 hover:from-mokm-orange-600 hover:to-mokm-pink-600 text-white font-sf-pro rounded-xl shadow-colored hover:shadow-colored-lg transition-all duration-300"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-sf-pro rounded-xl transition-all duration-300"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-slate-300 hover:bg-slate-50 font-sf-pro rounded-xl transition-all duration-300"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">Company Name</label>
            {isEditing ? (
              <input
                type="text"
                value={companyData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
              />
            ) : (
              <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.name}</p>
            )}
          </div>
          
          {/* Contact Person Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={companyData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.contactName || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">Surname</label>
              {isEditing ? (
                <input
                  type="text"
                  value={companyData.contactSurname}
                  onChange={(e) => handleInputChange('contactSurname', e.target.value)}
                  className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.contactSurname || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">Position</label>
              {isEditing ? (
                <Select value={companyData.position} onValueChange={(value) => handleInputChange('position', value)}>
                  <SelectTrigger className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent className="glass backdrop-blur-sm bg-white/95 border border-white/20 rounded-xl">
                    <SelectItem value="CEO">CEO</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Bookkeeper">Bookkeeper</SelectItem>
                    <SelectItem value="Director">Director</SelectItem>
                    <SelectItem value="Founder">Founder</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.position || 'Not specified'}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={companyData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={companyData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">Website</label>
              {isEditing ? (
                <input
                  type="url"
                  value={companyData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.website}</p>
              )}
            </div>
          </div>

          {/* Address Fields - Updated to 4 separate lines */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">Address</label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1 font-sf-pro">Address Line 1</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={companyData.addressLine1}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    placeholder="Street number and name"
                    className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.addressLine1 || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1 font-sf-pro">Address Line 2</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={companyData.addressLine2}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    placeholder="Apartment, suite, building (optional)"
                    className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.addressLine2 || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1 font-sf-pro">Address Line 3</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={companyData.addressLine3}
                    onChange={(e) => handleInputChange('addressLine3', e.target.value)}
                    placeholder="District, suburb (optional)"
                    className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.addressLine3 || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1 font-sf-pro">Address Line 4</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={companyData.addressLine4}
                    onChange={(e) => handleInputChange('addressLine4', e.target.value)}
                    placeholder="City, postal code"
                    className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.addressLine4 || 'Not specified'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">Registration Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={companyData.regNumber}
                  onChange={(e) => handleInputChange('regNumber', e.target.value)}
                  className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.regNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">VAT Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={companyData.vatNumber}
                  onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                  className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.vatNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">Tax Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={companyData.taxNumber}
                  onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                  className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.taxNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 font-sf-pro">MAAA Registration Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={companyData.maaarNumber}
                  onChange={(e) => handleInputChange('maaarNumber', e.target.value)}
                  className="w-full px-4 py-3 glass backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl focus:ring-2 focus:ring-mokm-purple-500/50 focus:border-mokm-purple-500/50 transition-all duration-300 font-sf-pro"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl font-sf-pro text-slate-900">{companyData.maaarNumber || 'Not specified'}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Assets */}
      <Card className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business hover:shadow-business-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-slate-900 font-sf-pro text-xl">Company Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Logo', 'Stamp', 'Signature'].map((asset) => (
              <div key={asset} className="text-center">
                <label className="block text-sm font-medium text-slate-700 mb-4 font-sf-pro">{asset}</label>
                <div className="glass backdrop-blur-sm bg-white/30 border-2 border-dashed border-white/40 rounded-2xl p-8 hover:bg-white/40 transition-all duration-300 group cursor-pointer">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4 group-hover:text-mokm-purple-500 transition-colors" />
                  <p className="text-slate-600 font-sf-pro text-sm">Click to upload {asset.toLowerCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetails;
