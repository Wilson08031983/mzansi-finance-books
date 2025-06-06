
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Save, X } from 'lucide-react';
import CompanyInformationForm from './CompanyInformationForm';
import ContactPersonForm from './ContactPersonForm';
import CompanyAddressForm from './CompanyAddressForm';
import CompanyNumbersForm from './CompanyNumbersForm';
import CompanyAssetsUpload from './CompanyAssetsUpload';

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
          <CompanyInformationForm 
            companyData={companyData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
          
          {/* Contact Person Details */}
          <ContactPersonForm
            companyData={companyData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />

          {/* Address Fields */}
          <CompanyAddressForm
            companyData={companyData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />

          <CompanyNumbersForm
            companyData={companyData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        </CardContent>
      </Card>

      {/* Company Assets */}
      <CompanyAssetsUpload />
    </div>
  );
};

export default CompanyDetails;
