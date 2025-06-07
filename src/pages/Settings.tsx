
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Settings as SettingsIcon, 
  Building2, 
  Users, 
  DollarSign, 
  Cog, 
  FileText, 
  Shield, 
  Bell, 
  Palette, 
  Database,
  Smartphone,
  CreditCard,
  HelpCircle,
  Info,
  Zap,
  User,
  Calendar,
  BarChart3,
  Lock,
  Monitor,
  ArrowLeft,
  PackageOpen
} from 'lucide-react';
import GeneralSettingsTab from '@/components/settings/GeneralSettingsTab';
import InventorySettingsTab from '@/components/settings/InventorySettingsTab';
import UserManagementTab from '@/components/settings/UserManagementTab';
import FinancialSettingsTab from '@/components/settings/FinancialSettingsTab';
import SystemConfigurationTab from '@/components/settings/SystemConfigurationTab';
import DocumentManagementTab from '@/components/settings/DocumentManagementTab';
import SecuritySettingsTab from '@/components/settings/SecuritySettingsTab';
import NotificationSettingsTab from '@/components/settings/NotificationSettingsTab';
import CustomizationTab from '@/components/settings/CustomizationTab';
import DataManagementTab from '@/components/settings/DataManagementTab';
import MobileSettingsTab from '@/components/settings/MobileSettingsTab';
import BillingSubscriptionTab from '@/components/settings/BillingSubscriptionTab';
import HelpSupportTab from '@/components/settings/HelpSupportTab';
import AboutTab from '@/components/settings/AboutTab';
import AdvancedSettingsTab from '@/components/settings/AdvancedSettingsTab';
import UserPreferencesTab from '@/components/settings/UserPreferencesTab';
import IntegrationSettingsTab from '@/components/settings/IntegrationSettingsTab';
import ReportSettingsTab from '@/components/settings/ReportSettingsTab';
import DataSecurityTab from '@/components/settings/DataSecurityTab';
import SystemMaintenanceTab from '@/components/settings/SystemMaintenanceTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const settingsTabs = [
    { id: 'general', label: 'General', icon: SettingsIcon, component: GeneralSettingsTab },
    { id: 'users', label: 'Users', icon: Users, component: UserManagementTab },
    { id: 'financial', label: 'Financial', icon: DollarSign, component: FinancialSettingsTab },
    { id: 'system', label: 'System', icon: Cog, component: SystemConfigurationTab },
    { id: 'documents', label: 'Documents', icon: FileText, component: DocumentManagementTab },
    { id: 'security', label: 'Security', icon: Shield, component: SecuritySettingsTab },
    { id: 'notifications', label: 'Notifications', icon: Bell, component: NotificationSettingsTab },
    { id: 'customization', label: 'Customization', icon: Palette, component: CustomizationTab },
    { id: 'data', label: 'Data', icon: Database, component: DataManagementTab },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, component: MobileSettingsTab },
    { id: 'billing', label: 'Billing', icon: CreditCard, component: BillingSubscriptionTab },
    { id: 'help', label: 'Help', icon: HelpCircle, component: HelpSupportTab },
    { id: 'about', label: 'About', icon: Info, component: AboutTab },
    { id: 'advanced', label: 'Advanced', icon: Zap, component: AdvancedSettingsTab },
    { id: 'preferences', label: 'Preferences', icon: User, component: UserPreferencesTab },
    { id: 'integrations', label: 'Integrations', icon: Calendar, component: IntegrationSettingsTab },
    { id: 'reports', label: 'Reports', icon: BarChart3, component: ReportSettingsTab },
    { id: 'dataSecurity', label: 'Data Security', icon: Lock, component: DataSecurityTab },
    { id: 'maintenance', label: 'Maintenance', icon: Monitor, component: SystemMaintenanceTab }
  ];

  return (
    <div className="min-h-screen sequoia-bg relative overflow-hidden">
      {/* Background gradient orbs for glass effect */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-20 w-60 h-60 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="container mx-auto p-8 relative z-10">
        <div className="mb-8 sequoia-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-mokm-orange-600 via-mokm-pink-600 to-mokm-purple-600 bg-clip-text text-transparent mb-4 font-sf-pro">
                Settings
              </h1>
              <p className="text-xl text-slate-600 font-sf-pro">
                Configure your MOKMzansiBooks application settings
              </p>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" className="flex items-center gap-2 glass-button hover-scale sequoia-press sequoia-shadow-sm transition-all duration-300">
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="sequoia-fade-in">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="glass-header sequoia-shadow border-white/20 rounded-xl p-4 overflow-x-auto">
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-2 h-auto bg-transparent p-0 min-w-max">
                {settingsTabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="glass-button data-[state=active]:bg-gradient-to-r data-[state=active]:from-mokm-orange-500 data-[state=active]:via-mokm-pink-500 data-[state=active]:to-mokm-purple-500 data-[state=active]:text-white flex flex-col items-center justify-center px-3 py-4 h-auto min-h-[80px] font-sf-pro text-xs hover-scale sequoia-press"
                    >
                      <IconComponent className="h-5 w-5 mb-1" />
                      <span className="text-center leading-tight">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {settingsTabs.map((tab) => {
              const ComponentToRender = tab.component;
              return (
                <TabsContent key={tab.id} value={tab.id} className="space-y-6 sequoia-fade-in">
                  <ComponentToRender />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
