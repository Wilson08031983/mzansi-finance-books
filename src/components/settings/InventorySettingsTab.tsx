import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { PackageOpen, Save, RotateCcw, AlertTriangle, Scan, Camera, Smartphone } from 'lucide-react';

const InventorySettingsTab = () => {
  const [generalSettings, setGeneralSettings] = useState({
    lowStockThreshold: 10,
    autoReorderPoint: 5,
    defaultLocation: 'Warehouse A',
    defaultCategory: 'Office Supplies',
    enableBarcodeScanning: true,
    enableExpiredItemAlerts: true,
    enableLowStockAlerts: true,
    enableInventoryReports: true,
    defaultMarkupPercentage: 20,
  });
  
  const [scannerSettings, setScannerSettings] = useState({
    preferredScanMethod: 'camera',
    defaultCameraFacing: 'environment',
    enableContinuousScan: true,
    saveBarcodeScanHistory: true,
    beepOnSuccessfulScan: true,
    vibrateOnSuccessfulScan: true
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    linkWithAccounting: true,
    linkWithInvoices: true,
    linkWithQuotations: true,
    linkWithReports: true
  });

  const handleGeneralChange = (field: string, value: string | number | boolean) => {
    setGeneralSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScannerChange = (field: string, value: string | boolean) => {
    setScannerSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIntegrationChange = (field: string, value: boolean) => {
    setIntegrationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    // In a real application, this would save settings to the database
    console.log('Saving inventory settings:', {
      generalSettings,
      scannerSettings,
      integrationSettings
    });
    
    // Show a success message or notification
    alert('Inventory settings saved successfully!');
  };

  const handleResetSettings = () => {
    // Reset to default settings
    setGeneralSettings({
      lowStockThreshold: 10,
      autoReorderPoint: 5,
      defaultLocation: 'Warehouse A',
      defaultCategory: 'Office Supplies',
      enableBarcodeScanning: true,
      enableExpiredItemAlerts: true,
      enableLowStockAlerts: true,
      enableInventoryReports: true,
      defaultMarkupPercentage: 20,
    });
    
    setScannerSettings({
      preferredScanMethod: 'camera',
      defaultCameraFacing: 'environment',
      enableContinuousScan: true,
      saveBarcodeScanHistory: true,
      beepOnSuccessfulScan: true,
      vibrateOnSuccessfulScan: true
    });
    
    setIntegrationSettings({
      linkWithAccounting: true,
      linkWithInvoices: true,
      linkWithQuotations: true,
      linkWithReports: true
    });
  };

  return (
    <div className="space-y-8">
      <Card className="glass-card sequoia-shadow-sm hover-scale transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackageOpen className="h-5 w-5" /> Inventory Management Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 glass-header sequoia-shadow-sm rounded-lg">
              <TabsTrigger value="general" className="hover-scale">General</TabsTrigger>
              <TabsTrigger value="scanner" className="hover-scale">Barcode Scanner</TabsTrigger>
              <TabsTrigger value="integrations" className="hover-scale">Integrations</TabsTrigger>
            </TabsList>
            
            {/* General Settings */}
            <TabsContent value="general" className="space-y-6 sequoia-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Stock Thresholds</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                    <Input className="glass-input hover-scale"
                      id="lowStockThreshold"
                      type="number"
                      min="0"
                      value={generalSettings.lowStockThreshold}
                      onChange={(e) => handleGeneralChange('lowStockThreshold', parseInt(e.target.value))}
                    />
                    <p className="text-xs text-slate-500">
                      Items with stock level below this threshold will be marked as "Low Stock"
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="autoReorderPoint">Auto Reorder Point</Label>
                    <Input className="glass-input hover-scale"
                      id="autoReorderPoint"
                      type="number"
                      min="0"
                      value={generalSettings.autoReorderPoint}
                      onChange={(e) => handleGeneralChange('autoReorderPoint', parseInt(e.target.value))}
                    />
                    <p className="text-xs text-slate-500">
                      System will suggest reordering when stock falls below this level
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultMarkupPercentage">Default Markup (%)</Label>
                    <Input className="glass-input hover-scale"
                      id="defaultMarkupPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={generalSettings.defaultMarkupPercentage}
                      onChange={(e) => handleGeneralChange('defaultMarkupPercentage', parseInt(e.target.value))}
                    />
                    <p className="text-xs text-slate-500">
                      Default markup percentage for new inventory items
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Default Values</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultLocation">Default Location</Label>
                    <Select 
                      value={generalSettings.defaultLocation} 
                      onValueChange={(value) => handleGeneralChange('defaultLocation', value)}
                    >
                      <SelectTrigger id="defaultLocation" className="glass-input hover-scale">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                        <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                        <SelectItem value="Store Room">Store Room</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="Display Area">Display Area</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultCategory">Default Category</Label>
                    <Select 
                      value={generalSettings.defaultCategory} 
                      onValueChange={(value) => handleGeneralChange('defaultCategory', value)}
                    >
                      <SelectTrigger id="defaultCategory" className="glass-input hover-scale">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Stationery">Stationery</SelectItem>
                        <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                        <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notifications & Features</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableBarcodeScanning" className="font-medium">Barcode Scanning</Label>
                      <p className="text-sm text-slate-500">Enable barcode scanning functionality</p>
                    </div>
                    <Switch 
                      id="enableBarcodeScanning" 
                      checked={generalSettings.enableBarcodeScanning}
                      onCheckedChange={(checked) => handleGeneralChange('enableBarcodeScanning', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableLowStockAlerts" className="font-medium">Low Stock Alerts</Label>
                      <p className="text-sm text-slate-500">Receive notifications for low stock</p>
                    </div>
                    <Switch 
                      id="enableLowStockAlerts" 
                      checked={generalSettings.enableLowStockAlerts}
                      onCheckedChange={(checked) => handleGeneralChange('enableLowStockAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableExpiredItemAlerts" className="font-medium">Expiry Alerts</Label>
                      <p className="text-sm text-slate-500">Receive alerts for items nearing expiration</p>
                    </div>
                    <Switch 
                      id="enableExpiredItemAlerts" 
                      checked={generalSettings.enableExpiredItemAlerts}
                      onCheckedChange={(checked) => handleGeneralChange('enableExpiredItemAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableInventoryReports" className="font-medium">Inventory Reports</Label>
                      <p className="text-sm text-slate-500">Generate periodic inventory reports</p>
                    </div>
                    <Switch 
                      id="enableInventoryReports" 
                      checked={generalSettings.enableInventoryReports}
                      onCheckedChange={(checked) => handleGeneralChange('enableInventoryReports', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Scanner Settings */}
            <TabsContent value="scanner" className="space-y-6 sequoia-fade-in">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredScanMethod">Preferred Scan Method</Label>
                  <Select 
                    value={scannerSettings.preferredScanMethod} 
                    onValueChange={(value) => handleScannerChange('preferredScanMethod', value)}
                  >
                    <SelectTrigger id="preferredScanMethod" className="flex items-center glass-input hover-scale">
                      <SelectValue placeholder="Select scan method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="camera">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4" /> Camera
                        </div>
                      </SelectItem>
                      <SelectItem value="hardware">
                        <div className="flex items-center gap-2">
                          <Scan className="h-4 w-4" /> Hardware Scanner
                        </div>
                      </SelectItem>
                      <SelectItem value="mobile">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" /> Mobile App
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultCameraFacing">Default Camera</Label>
                  <Select 
                    value={scannerSettings.defaultCameraFacing} 
                    onValueChange={(value) => handleScannerChange('defaultCameraFacing', value)}
                    disabled={scannerSettings.preferredScanMethod !== 'camera'}
                  >
                    <SelectTrigger id="defaultCameraFacing" className="glass-input hover-scale">
                      <SelectValue placeholder="Select camera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="environment">Back Camera (Default)</SelectItem>
                      <SelectItem value="user">Front Camera</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableContinuousScan" className="font-medium">Continuous Scanning</Label>
                      <p className="text-sm text-slate-500">Automatically scan multiple items in succession</p>
                    </div>
                    <Switch 
                      id="enableContinuousScan" 
                      checked={scannerSettings.enableContinuousScan}
                      onCheckedChange={(checked) => handleScannerChange('enableContinuousScan', checked)}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="saveBarcodeScanHistory" className="font-medium">Save Scan History</Label>
                      <p className="text-sm text-slate-500">Keep a record of all barcode scans</p>
                    </div>
                    <Switch 
                      id="saveBarcodeScanHistory" 
                      checked={scannerSettings.saveBarcodeScanHistory}
                      onCheckedChange={(checked) => handleScannerChange('saveBarcodeScanHistory', checked)}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="beepOnSuccessfulScan" className="font-medium">Sound Notification</Label>
                      <p className="text-sm text-slate-500">Play sound on successful scan</p>
                    </div>
                    <Switch 
                      id="beepOnSuccessfulScan" 
                      checked={scannerSettings.beepOnSuccessfulScan}
                      onCheckedChange={(checked) => handleScannerChange('beepOnSuccessfulScan', checked)}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="vibrateOnSuccessfulScan" className="font-medium">Vibration Feedback</Label>
                      <p className="text-sm text-slate-500">Vibrate device on successful scan</p>
                    </div>
                    <Switch 
                      id="vibrateOnSuccessfulScan" 
                      checked={scannerSettings.vibrateOnSuccessfulScan}
                      onCheckedChange={(checked) => handleScannerChange('vibrateOnSuccessfulScan', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Integration Settings */}
            <TabsContent value="integrations" className="space-y-6 sequoia-fade-in">
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Connect your inventory management with other modules in MOKMzansiBooks for seamless data flow.
                </p>
                
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="linkWithAccounting" className="font-medium">Link with Accounting</Label>
                      <p className="text-sm text-slate-500">
                        Automatically update accounting records when inventory changes
                      </p>
                    </div>
                    <Switch 
                      id="linkWithAccounting" 
                      checked={integrationSettings.linkWithAccounting}
                      onCheckedChange={(checked) => handleIntegrationChange('linkWithAccounting', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="linkWithInvoices" className="font-medium">Link with Invoices</Label>
                      <p className="text-sm text-slate-500">
                        Allow inventory items to be added to invoices with barcode scanning
                      </p>
                    </div>
                    <Switch 
                      id="linkWithInvoices" 
                      checked={integrationSettings.linkWithInvoices}
                      onCheckedChange={(checked) => handleIntegrationChange('linkWithInvoices', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="linkWithQuotations" className="font-medium">Link with Quotations</Label>
                      <p className="text-sm text-slate-500">
                        Allow inventory items to be added to quotations with barcode scanning
                      </p>
                    </div>
                    <Switch 
                      id="linkWithQuotations" 
                      checked={integrationSettings.linkWithQuotations}
                      onCheckedChange={(checked) => handleIntegrationChange('linkWithQuotations', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="linkWithReports" className="font-medium">Link with Reports</Label>
                      <p className="text-sm text-slate-500">
                        Include inventory data in financial and business reports
                      </p>
                    </div>
                    <Switch 
                      id="linkWithReports" 
                      checked={integrationSettings.linkWithReports}
                      onCheckedChange={(checked) => handleIntegrationChange('linkWithReports', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleResetSettings}
            className="flex items-center gap-2 glass-button sequoia-press hover-scale"
          >
            <RotateCcw className="h-4 w-4" /> Reset to Defaults
          </Button>
          <span className="text-xs text-amber-600 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" /> Use with caution
          </span>
        </div>
        
        <Button 
          type="button"
          onClick={handleSaveSettings}
          className="flex items-center gap-2 glass-button sequoia-press hover-scale sequoia-shadow-sm bg-gradient-to-r from-mokm-orange-500 to-mokm-pink-500 text-white"
        >
          <Save className="h-4 w-4" /> Save Settings
        </Button>
      </div>
    </div>
  );
};

export default InventorySettingsTab;
