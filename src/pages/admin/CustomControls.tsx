import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save, RefreshCw } from "lucide-react";

const CustomControls = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Kashmir Valley Stories",
    siteDescription: "Discover the beauty of Kashmir with our premium travel packages and services.",
    contactEmail: "info@kashmirvalleystories.com",
    contactPhone: "+91-1234567890",
    maintenanceMode: false,
    allowNewBookings: true,
    emailNotifications: true,
    smsNotifications: false,
    currency: "INR",
    taxRate: 18,
    bookingDeadline: 24, // hours before booking
    maxTravelers: 20,
    minBookingAmount: 1000,
  });

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    // Load settings from localStorage or API
    loadSettings();
  }, [navigate]);

  const loadSettings = () => {
    // In a real app, this would fetch from an API
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) });
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      // In a real app, this would save to an API
      localStorage.setItem('adminSettings', JSON.stringify(settings));

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetSettings = () => {
    setSettings({
      siteName: "Kashmir Valley Stories",
      siteDescription: "Discover the beauty of Kashmir with our premium travel packages and services.",
      contactEmail: "info@kashmirvalleystories.com",
      contactPhone: "+91-1234567890",
      maintenanceMode: false,
      allowNewBookings: true,
      emailNotifications: true,
      smsNotifications: false,
      currency: "INR",
      taxRate: 18,
      bookingDeadline: 24,
      maxTravelers: 20,
      minBookingAmount: 1000,
    });
    toast({
      title: "Settings Reset",
      description: "Settings have been reset to defaults",
    });
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Custom Controls</h1>
          <p className="text-muted-foreground mt-2">
            Configure system settings and preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Site Information */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Site Information
              </CardTitle>
              <CardDescription>
                Basic information about your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Control system behavior and features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the site in maintenance mode
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow New Bookings</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable/disable new booking requests
                  </p>
                </div>
                <Switch
                  checked={settings.allowNewBookings}
                  onCheckedChange={(checked) => handleInputChange('allowNewBookings', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for bookings
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send SMS notifications for bookings
                  </p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Rules */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Business Rules</CardTitle>
              <CardDescription>
                Configure booking and pricing rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={settings.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bookingDeadline">Booking Deadline (hours)</Label>
                  <Input
                    id="bookingDeadline"
                    type="number"
                    value={settings.bookingDeadline}
                    onChange={(e) => handleInputChange('bookingDeadline', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxTravelers">Max Travelers per Booking</Label>
                  <Input
                    id="maxTravelers"
                    type="number"
                    value={settings.maxTravelers}
                    onChange={(e) => handleInputChange('maxTravelers', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minBookingAmount">Min Booking Amount</Label>
                  <Input
                    id="minBookingAmount"
                    type="number"
                    value={settings.minBookingAmount}
                    onChange={(e) => handleInputChange('minBookingAmount', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={saveSettings} disabled={loading} className="flex items-center gap-2">
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
            <Button variant="outline" onClick={resetSettings}>
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CustomControls;