
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Mail, Smartphone, Shield, FileText, ClipboardList, CalendarClock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
}

const NotificationSettingsTab = () => {
  const { toast } = useToast();
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      enabled: true,
      icon: <Mail className="h-4 w-4" />
    },
    {
      id: 'appNotifications',
      title: 'App Notifications',
      description: 'Receive in-app notifications',
      enabled: true,
      icon: <Smartphone className="h-4 w-4" />
    },
    {
      id: 'settingsChangeAlert',
      title: 'Settings Change Alerts',
      description: 'Be notified when other users change settings',
      enabled: true,
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: 'invoiceReminders',
      title: 'Invoice Reminders',
      description: 'Receive reminders about due and overdue invoices',
      enabled: true,
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: 'quotationUpdates',
      title: 'Quotation Updates',
      description: 'Be notified about quotation status changes',
      enabled: true,
      icon: <ClipboardList className="h-4 w-4" />
    },
    {
      id: 'appointmentReminders',
      title: 'Appointment Reminders',
      description: 'Get reminders about upcoming appointments and meetings',
      enabled: true,
      icon: <CalendarClock className="h-4 w-4" />
    }
  ]);

  const handleToggle = (id: string) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const saveSettings = () => {
    // Here you would typically save to backend/database
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass backdrop-blur-xl bg-white/80 border-white/20 shadow-business">
        <CardHeader>
          <CardTitle className="flex items-center font-sf-pro">
            <Bell className="h-5 w-5 mr-2" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {notificationSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 bg-mokm-orange-50/20 p-2 rounded-full">
                    {setting.icon}
                  </div>
                  <div>
                    <Label 
                      htmlFor={setting.id}
                      className="font-medium text-sm"
                    >
                      {setting.title}
                    </Label>
                    <p className="text-sm text-slate-500">{setting.description}</p>
                  </div>
                </div>
                <Switch
                  id={setting.id}
                  checked={setting.enabled}
                  onCheckedChange={() => handleToggle(setting.id)}
                />
              </div>
            ))}
            
            <div className="pt-4 mt-6 border-t border-slate-200">
              <Button 
                onClick={saveSettings}
                className="w-full sm:w-auto"
              >
                Save Notification Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettingsTab;
