"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Bell, CreditCard, Palette, Shield, Save, Upload, Clock } from "lucide-react"

export default function SettingsPage() {
  const [companyInfo, setCompanyInfo] = useState({
    name: "HealthLab Pro",
    email: "info@healthlabpro.com",
    phone: "+91 98765 43210",
    address: "123 Medical Center, Bangalore, Karnataka - 560001",
    website: "https://healthlabpro.com",
    description: "Leading diagnostic center providing accurate and timely medical test results",
  })

  const [businessSettings, setBusinessSettings] = useState({
    operatingHours: "8:00 AM - 8:00 PM",
    homeCollectionHours: "6:00 AM - 10:00 PM",
    reportDeliveryTime: "24-48 hours",
    emergencyContact: "+91 98765 43210",
    maxHomeCollectionDistance: "50",
    minOrderValue: "200",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    orderUpdates: true,
    reportReady: true,
    promotionalEmails: false,
    systemAlerts: true,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    razorpayEnabled: true,
    paytmEnabled: true,
    upiEnabled: true,
    codEnabled: true,
    razorpayKey: "rzp_test_xxxxxxxxxx",
    paytmMerchantId: "PAYTM_MERCHANT_ID",
  })

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    accentColor: "#10B981",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordPolicy: "strong",
    loginAttempts: "5",
  })

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings`)
    // Implement save functionality
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your application settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="companyEmail">Email Address</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="companyPhone">Phone Number</Label>
                  <Input
                    id="companyPhone"
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="companyWebsite">Website URL</Label>
                  <Input
                    id="companyWebsite"
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="companyAddress">Address</Label>
                <Textarea
                  id="companyAddress"
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="companyDescription">Description</Label>
                <Textarea
                  id="companyDescription"
                  value={companyInfo.description}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                  rows={3}
                />
              </div>
              <Button onClick={() => handleSave("company")}>
                <Save className="w-4 h-4 mr-2" />
                Save Company Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Business Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="operatingHours">Operating Hours</Label>
                  <Input
                    id="operatingHours"
                    value={businessSettings.operatingHours}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, operatingHours: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="homeCollectionHours">Home Collection Hours</Label>
                  <Input
                    id="homeCollectionHours"
                    value={businessSettings.homeCollectionHours}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, homeCollectionHours: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="reportDeliveryTime">Report Delivery Time</Label>
                  <Input
                    id="reportDeliveryTime"
                    value={businessSettings.reportDeliveryTime}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, reportDeliveryTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={businessSettings.emergencyContact}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, emergencyContact: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="maxDistance">Max Home Collection Distance (km)</Label>
                  <Input
                    id="maxDistance"
                    type="number"
                    value={businessSettings.maxHomeCollectionDistance}
                    onChange={(e) =>
                      setBusinessSettings({ ...businessSettings, maxHomeCollectionDistance: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="minOrderValue">Minimum Order Value (₹)</Label>
                  <Input
                    id="minOrderValue"
                    type="number"
                    value={businessSettings.minOrderValue}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, minOrderValue: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("business")}>
                <Save className="w-4 h-4 mr-2" />
                Save Business Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderUpdates">Order Updates</Label>
                    <p className="text-sm text-gray-500">Notifications for order status changes</p>
                  </div>
                  <Switch
                    id="orderUpdates"
                    checked={notificationSettings.orderUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, orderUpdates: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reportReady">Report Ready Alerts</Label>
                    <p className="text-sm text-gray-500">Notify when test reports are ready</p>
                  </div>
                  <Switch
                    id="reportReady"
                    checked={notificationSettings.reportReady}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, reportReady: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="promotionalEmails">Promotional Emails</Label>
                    <p className="text-sm text-gray-500">Marketing and promotional content</p>
                  </div>
                  <Switch
                    id="promotionalEmails"
                    checked={notificationSettings.promotionalEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, promotionalEmails: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemAlerts">System Alerts</Label>
                    <p className="text-sm text-gray-500">Important system notifications</p>
                  </div>
                  <Switch
                    id="systemAlerts"
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, systemAlerts: checked })
                    }
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("notifications")}>
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Gateway Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="razorpayEnabled">Razorpay</Label>
                    <p className="text-sm text-gray-500">Enable Razorpay payment gateway</p>
                  </div>
                  <Switch
                    id="razorpayEnabled"
                    checked={paymentSettings.razorpayEnabled}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, razorpayEnabled: checked })}
                  />
                </div>
                {paymentSettings.razorpayEnabled && (
                  <div>
                    <Label htmlFor="razorpayKey">Razorpay API Key</Label>
                    <Input
                      id="razorpayKey"
                      value={paymentSettings.razorpayKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKey: e.target.value })}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paytmEnabled">Paytm</Label>
                    <p className="text-sm text-gray-500">Enable Paytm payment gateway</p>
                  </div>
                  <Switch
                    id="paytmEnabled"
                    checked={paymentSettings.paytmEnabled}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, paytmEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="upiEnabled">UPI Payments</Label>
                    <p className="text-sm text-gray-500">Enable UPI payment options</p>
                  </div>
                  <Switch
                    id="upiEnabled"
                    checked={paymentSettings.upiEnabled}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, upiEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="codEnabled">Cash on Delivery</Label>
                    <p className="text-sm text-gray-500">Enable cash on delivery option</p>
                  </div>
                  <Switch
                    id="codEnabled"
                    checked={paymentSettings.codEnabled}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, codEnabled: checked })}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("payments")}>
                <Save className="w-4 h-4 mr-2" />
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Theme & Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={themeSettings.secondaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={themeSettings.secondaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={themeSettings.accentColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={themeSettings.accentColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logoUpload">Company Logo</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload logo (PNG, JPG)</p>
                    <Button variant="outline" className="mt-2 bg-transparent">
                      Choose File
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="faviconUpload">Favicon</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload favicon (ICO, PNG)</p>
                    <Button variant="outline" className="mt-2 bg-transparent">
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={() => handleSave("theme")}>
                <Save className="w-4 h-4 mr-2" />
                Save Theme Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Enable 2FA for admin accounts</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttempts: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select
                    value={securitySettings.passwordPolicy}
                    onValueChange={(value) => setSecuritySettings({ ...securitySettings, passwordPolicy: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weak">Weak (6+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ characters, mixed case)</SelectItem>
                      <SelectItem value="strong">Strong (12+ characters, mixed case, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => handleSave("security")}>
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
