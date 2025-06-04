
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Shield, 
  Key, 
  Lock, 
  LogOut, 
  Smartphone, 
  Save, 
  Loader2, 
  Check 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SecuritySettingsTab = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    passwordExpiryDays: 90,
    sessionTimeoutMinutes: 30,
    requireStrongPasswords: true,
    loginNotifications: true,
    deviceManagement: true
  });
  
  // Password complexity settings
  const [passwordComplexity, setPasswordComplexity] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  });
  
  // Active devices
  const [activeDevices] = useState([
    { 
      id: '1', 
      name: 'MacBook Pro', 
      lastActive: '2025-06-02T10:30:00', 
      location: 'Johannesburg, South Africa', 
      browser: 'Chrome',
      current: true
    },
    { 
      id: '2', 
      name: 'iPhone 15', 
      lastActive: '2025-06-01T18:45:00', 
      location: 'Johannesburg, South Africa', 
      browser: 'Safari',
      current: false
    },
    { 
      id: '3', 
      name: 'iPad Pro', 
      lastActive: '2025-05-28T14:20:00', 
      location: 'Cape Town, South Africa', 
      browser: 'Safari',
      current: false
    }
  ]);

  // Handle form submission
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaveLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Security settings saved successfully",
        description: "Your security preferences have been updated.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeviceLogout = (deviceId: string) => {
    toast({
      title: "Device logged out",
      description: "The device has been successfully logged out.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass backdrop-blur-xl bg-white/80 border-white/20 shadow-business">
        <CardHeader>
          <CardTitle className="flex items-center font-sf-pro">
            <Shield className="h-5 w-5 mr-2" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSettings} className="space-y-6">
            {/* Password Security */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                <Key className="h-5 w-5 mr-2 text-mokm-orange-500" />
                Password Security
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Require Strong Passwords</Label>
                    <p className="text-sm text-gray-500">Enforce password complexity requirements</p>
                  </div>
                  <Switch
                    checked={securitySettings.requireStrongPasswords}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({...securitySettings, requireStrongPasswords: checked})
                    }
                  />
                </div>
                
                {securitySettings.requireStrongPasswords && (
                  <div className="pl-6 border-l-2 border-gray-100 space-y-3">
                    <Label className="text-sm font-medium">Password Requirements:</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="min-length"
                          checked={passwordComplexity.minLength >= 8}
                          onCheckedChange={(checked) => 
                            setPasswordComplexity({...passwordComplexity, minLength: checked ? 8 : 4})
                          }
                        />
                        <Label htmlFor="min-length" className="text-sm">
                          Minimum 8 characters
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="uppercase"
                          checked={passwordComplexity.requireUppercase}
                          onCheckedChange={(checked) => 
                            setPasswordComplexity({...passwordComplexity, requireUppercase: !!checked})
                          }
                        />
                        <Label htmlFor="uppercase" className="text-sm">
                          Uppercase letters (A-Z)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="lowercase"
                          checked={passwordComplexity.requireLowercase}
                          onCheckedChange={(checked) => 
                            setPasswordComplexity({...passwordComplexity, requireLowercase: !!checked})
                          }
                        />
                        <Label htmlFor="lowercase" className="text-sm">
                          Lowercase letters (a-z)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="numbers"
                          checked={passwordComplexity.requireNumbers}
                          onCheckedChange={(checked) => 
                            setPasswordComplexity({...passwordComplexity, requireNumbers: !!checked})
                          }
                        />
                        <Label htmlFor="numbers" className="text-sm">
                          Numbers (0-9)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="special"
                          checked={passwordComplexity.requireSpecialChars}
                          onCheckedChange={(checked) => 
                            setPasswordComplexity({...passwordComplexity, requireSpecialChars: !!checked})
                          }
                        />
                        <Label htmlFor="special" className="text-sm">
                          Special characters (!@#$%^&*)
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (Days)</Label>
                  <select
                    id="password-expiry"
                    value={securitySettings.passwordExpiryDays}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiryDays: parseInt(e.target.value)})}
                    className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">365 days</option>
                  </select>
                  <p className="text-xs text-gray-500">
                    Users will be required to change their password after this period
                  </p>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                <Smartphone className="h-5 w-5 mr-2 text-mokm-orange-500" />
                Two-Factor Authentication
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Require a verification code in addition to passwords for login</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({...securitySettings, twoFactorEnabled: checked})
                    }
                  />
                </div>
                
                {securitySettings.twoFactorEnabled && (
                  <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700">
                    Two-factor authentication is enabled. Users will be prompted to set up 2FA using an authenticator app when they next sign in.
                  </div>
                )}
              </div>
            </div>

            {/* Session Security */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                <Lock className="h-5 w-5 mr-2 text-mokm-orange-500" />
                Session Security
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (Minutes)</Label>
                  <select
                    id="session-timeout"
                    value={securitySettings.sessionTimeoutMinutes}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeoutMinutes: parseInt(e.target.value)})}
                    className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="240">4 hours</option>
                  </select>
                  <p className="text-xs text-gray-500">
                    Users will be automatically logged out after this period of inactivity
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Login Notifications</Label>
                    <p className="text-sm text-gray-500">Send email notifications for new logins</p>
                  </div>
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({...securitySettings, loginNotifications: checked})
                    }
                  />
                </div>
              </div>
            </div>

            {/* Device Management */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                <Smartphone className="h-5 w-5 mr-2 text-mokm-orange-500" />
                Active Devices
              </h3>
              
              <div className="space-y-3">
                {activeDevices.map(device => (
                  <div key={device.id} className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
                    <div className="flex items-start">
                      <div className="mr-3">
                        <Smartphone className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{device.name}</span>
                          {device.current && (
                            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {device.browser} • {new Date(device.lastActive).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {device.location}
                        </div>
                      </div>
                    </div>
                    {!device.current && (
                      <Button 
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeviceLogout(device.id)}
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t flex justify-end">
              <Button
                type="submit"
                disabled={saveLoading}
                className="bg-gradient-to-r from-mokm-orange-500 via-mokm-pink-500 to-mokm-purple-500 hover:from-mokm-orange-600 hover:via-mokm-pink-600 hover:to-mokm-purple-600"
              >
                {saveLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettingsTab;
