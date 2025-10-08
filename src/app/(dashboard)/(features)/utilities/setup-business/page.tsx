'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  Building,
  Plus,
  Settings,
  Save,
  Check
} from 'lucide-react'

export default function SetupBusinessPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    gstNumber: '',
    panNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    description: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving business setup:', formData)
    // Handle save logic here
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header Bar */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Set Up My Business
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => router.push('/sales/add-sale')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Sale
            </Button>
            <Button 
              onClick={() => router.push('/purchase/bills/add')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Purchase
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Page Title */}
         <div className="flex items-center justify-between mb-6">
           <h1 className="text-3xl font-bold text-foreground">Set Up My Business</h1>
           <div className="flex items-center space-x-2">
             <div className="w-2 h-2 bg-red-500 rounded-full"></div>
             <span className="text-sm text-muted-foreground">Enter Business Name</span>
           </div>
         </div>

        {/* Business Setup Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proprietorship">Proprietorship</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="llp">Limited Liability Partnership</SelectItem>
                      <SelectItem value="private-limited">Private Limited</SelectItem>
                      <SelectItem value="public-limited">Public Limited</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tax Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    placeholder="Enter GST number"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number *</Label>
                  <Input
                    id="panNumber"
                    placeholder="Enter PAN number"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value)}
                  />
                </div>
              </div>

              {/* Address Information */}
               <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-foreground">Address Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your business address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
               <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      placeholder="Enter website URL"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your business"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                  <Save className="h-4 w-4 mr-2" />
                  Save Business Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
