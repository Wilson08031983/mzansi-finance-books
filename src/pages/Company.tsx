
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CompanyDetails from '@/components/company/CompanyDetails';
import TeamManagement from '@/components/company/TeamManagement';
import ActivityLog from '@/components/company/ActivityLog';

const Company = () => {
  const [activeTab, setActiveTab] = useState('company-details');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="p-8">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-mokm-orange-600 via-mokm-pink-600 to-mokm-purple-600 bg-clip-text text-transparent font-sf-pro mb-3">
            My Company
          </h1>
          <p className="text-slate-600 text-lg font-sf-pro">
            Manage your company details, team, and view activity logs
          </p>
        </div>

        {/* Tabs */}
        <Tabs 
          defaultValue="company-details" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full animate-fade-in delay-200"
        >
          <TabsList className="glass backdrop-blur-sm bg-white/50 border border-white/20 shadow-business mb-8 p-2 rounded-2xl">
            <TabsTrigger 
              value="company-details"
              className="font-sf-pro data-[state=active]:bg-gradient-to-r data-[state=active]:from-mokm-orange-500 data-[state=active]:to-mokm-pink-500 data-[state=active]:text-white data-[state=active]:shadow-colored rounded-xl transition-all duration-300"
            >
              Company Details
            </TabsTrigger>
            <TabsTrigger 
              value="team-management"
              className="font-sf-pro data-[state=active]:bg-gradient-to-r data-[state=active]:from-mokm-purple-500 data-[state=active]:to-mokm-blue-500 data-[state=active]:text-white data-[state=active]:shadow-colored rounded-xl transition-all duration-300"
            >
              Team Management
            </TabsTrigger>
            <TabsTrigger 
              value="activity-log"
              className="font-sf-pro data-[state=active]:bg-gradient-to-r data-[state=active]:from-mokm-pink-500 data-[state=active]:to-mokm-orange-500 data-[state=active]:text-white data-[state=active]:shadow-colored rounded-xl transition-all duration-300"
            >
              Activity Log
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="company-details" className="animate-fade-in">
            <CompanyDetails />
          </TabsContent>
          
          <TabsContent value="team-management" className="animate-fade-in">
            <TeamManagement />
          </TabsContent>
          
          <TabsContent value="activity-log" className="animate-fade-in">
            <ActivityLog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Company;
