'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  ArrowLeft,
  Building,
  Plus,
  Settings,
  Save,
  Check,
  Camera,
  FileText,
  ArrowRight,
  Info,
  PartyPopper
} from 'lucide-react'

export default function SetupBusinessPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState('tally')
  
  const [formData, setFormData] = useState({
    // Basic Business Details
    companyName: 'My Company',
    phoneNumber: '6235875797',
    businessCategory: 'Pharmacy/ Medical',
    drugLicenseNumber: '',
    fssaiNumber: '',
    
    // Additional Fields
    gstin: '',
    email: '',
    businessType: '',
    pincode: '',
    businessAddress: '',
    businessDescription: '',
    
    // Party Fields
    partyFields: {
      drugLicenseNo: true,
      ageGender: true,
      panNumber: true,
      drugLicenseExpDate: true
    },
    
    // Transaction Fields
    transactionFields: {
      doctorsName: true,
      salesmanName: true,
      diagnosis: true,
      additionalField4: false
    },
    
    // Item Fields
    itemFields: {
      batchNo: true,
      expDate: true,
      mfgDate: true,
      manufacturerName: true,
      dosage: true
    }
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFieldToggle = (section: string, field: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as Record<string, boolean>),
        [field]: checked
      }
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowSuccessModal(true)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Building className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Enter Business Details</h2>
      </div>

      {/* Company Logo */}
      <div className="space-y-2">
        <Label className="text-muted-foreground">Company Logo</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
          <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Click here to insert your Company Logo</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-muted-foreground">Company Name*</Label>
          <Input
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="Enter Company Name"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Phone Number*</Label>
          <Input
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Choose Business Category*</Label>
          <Select value={formData.businessCategory} onValueChange={(value) => handleInputChange('businessCategory', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Business Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pharmacy/ Medical">Pharmacy/ Medical</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Wholesale">Wholesale</SelectItem>
              <SelectItem value="Service">Service</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Drug License Number</Label>
          <Input
            value={formData.drugLicenseNumber}
            onChange={(e) => handleInputChange('drugLicenseNumber', e.target.value)}
            placeholder="Enter Drug License Number"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">FSSAI No.</Label>
          <Input
            value={formData.fssaiNumber}
            onChange={(e) => handleInputChange('fssaiNumber', e.target.value)}
            placeholder="Enter FSSAI Number"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">GSTIN</Label>
          <Input
            value={formData.gstin}
            onChange={(e) => handleInputChange('gstin', e.target.value)}
            placeholder="Enter GSTIN"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Email ID</Label>
          <Input
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Choose Business Type</Label>
          <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Proprietorship">Proprietorship</SelectItem>
              <SelectItem value="Partnership">Partnership</SelectItem>
              <SelectItem value="LLP">LLP</SelectItem>
              <SelectItem value="Private Limited">Private Limited</SelectItem>
              <SelectItem value="Public Limited">Public Limited</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Pincode</Label>
          <Input
            value={formData.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            placeholder="Enter Pincode"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Business Address</Label>
          <Textarea
            value={formData.businessAddress}
            onChange={(e) => handleInputChange('businessAddress', e.target.value)}
            placeholder="Enter Business Address"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Business Description</Label>
          <Textarea
            value={formData.businessDescription}
            onChange={(e) => handleInputChange('businessDescription', e.target.value)}
            placeholder="Enter Business Description"
            rows={3}
          />
        </div>
      </div>

      <Button className="text-sm text-primary hover:text-primary/80 p-0 h-auto">
        + See More Fields
      </Button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Set Up Party and Transaction fields</h2>
      
      {/* Party Fields */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-foreground">Party Fields</h3>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'drugLicenseNo', label: 'Drug License No' },
            { key: 'ageGender', label: 'Age/Gender' },
            { key: 'panNumber', label: 'PAN Number' },
            { key: 'drugLicenseExpDate', label: 'Drug License Exp. Date' }
          ].map((field, index) => (
            <div key={field.key} className="space-y-2">
              <Label className="text-muted-foreground">Additional Field {index + 1} Name</Label>
              <Input placeholder={`Enter Additional Field ${index + 1} Name`} />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.key}
                  checked={formData.partyFields[field.key as keyof typeof formData.partyFields]}
                  onCheckedChange={(checked) => handleFieldToggle('partyFields', field.key, checked as boolean)}
                />
                <Label htmlFor={field.key} className="text-sm text-foreground">{field.label}</Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Fields */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-foreground">Transaction Fields</h3>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'doctorsName', label: 'Doctor\'s Name' },
            { key: 'salesmanName', label: 'Salesman Name' },
            { key: 'diagnosis', label: 'Diagnosis' },
            { key: 'additionalField4', label: 'Enter Additional Field 4 Name' }
          ].map((field, index) => (
            <div key={field.key} className="space-y-2">
              <Label className="text-muted-foreground">Additional Field {index + 1} Name</Label>
              <Input placeholder={`Enter Additional Field ${index + 1} Name`} />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.key}
                  checked={formData.transactionFields[field.key as keyof typeof formData.transactionFields]}
                  onCheckedChange={(checked) => handleFieldToggle('transactionFields', field.key, checked as boolean)}
                />
                <Label htmlFor={field.key} className="text-sm text-foreground">{field.label}</Label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-semibold text-foreground">Set Up Item Fields</h2>
        <Info className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'batchNo', label: 'Batch No.' },
          { key: 'expDate', label: 'Exp. Date' },
          { key: 'mfgDate', label: 'Mfg. Date' },
          { key: 'manufacturerName', label: 'Manufacturer Name' },
          { key: 'dosage', label: 'Dosage' }
        ].map((field, index) => (
          <div key={field.key} className="space-y-2">
            <Label className="text-muted-foreground">Batch Field {index + 1} Name</Label>
            <Input value={field.label} readOnly />
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.key}
                checked={formData.itemFields[field.key as keyof typeof formData.itemFields]}
                onCheckedChange={(checked) => handleFieldToggle('itemFields', field.key, checked as boolean)}
              />
              <Label htmlFor={field.key} className="text-sm text-foreground">{field.label}</Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderInvoicePreview = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Sample Tax Invoice</h2>
      
      <Card className="border-2 border-primary/20">
        <CardContent className="p-4 text-sm">
          {/* Company, Invoice Details, and Bill To Section - Three Columns */}
      <div className="flex justify-between mb-4">
        {/* Left Column - My Company and Invoice Details */}
        <div className="flex-1">
          {/* My Company Section */}
          <div className="mb-4">
            <div className="font-bold text-lg text-foreground">{formData.companyName}</div>
            <p className="text-muted-foreground">Phone: {formData.phoneNumber}</p>
            {formData.fssaiNumber && <p className="text-muted-foreground">FSSAI No.: {formData.fssaiNumber}</p>}
            {formData.drugLicenseNumber && <p className="text-muted-foreground">Drug License Number: {formData.drugLicenseNumber}</p>}
          </div>

          {/* Invoice Details Section - Under My Company */}
          <div>
            <div className="font-semibold text-foreground">Invoice Details:</div>
            <p className="text-muted-foreground">No: Sample 01</p>
            <p className="text-muted-foreground">Date: 08/10/2025</p>
            {formData.transactionFields.doctorsName && <p className="text-muted-foreground">Doctor's Name: ****</p>}
            {formData.transactionFields.diagnosis && <p className="text-muted-foreground">Diagnosis: ****</p>}
            {formData.transactionFields.salesmanName && <p className="text-muted-foreground">Salesman Name: ****</p>}
          </div>
        </div>

        {/* Right Column - Bill To Section */}
        <div className="flex-1 text-right">
          <div className="font-semibold text-foreground">Bill To:</div>
          <p className="text-muted-foreground">Sample Party</p>
          <p className="text-muted-foreground">Sample Address</p>
          <p className="text-muted-foreground">Contact Number: 9333 911 911</p>
          {formData.partyFields.panNumber && <p className="text-muted-foreground">PAN Number: ****</p>}
          {formData.partyFields.drugLicenseExpDate && <p className="text-muted-foreground">Drug License Exp. Date: ****</p>}
          {formData.partyFields.drugLicenseNo && <p className="text-muted-foreground">Drug License No: ****</p>}
          {formData.partyFields.ageGender && <p className="text-muted-foreground">Age/Gender: ****</p>}
        </div>
      </div>

          {/* Sample Item Table */}
          <div className="mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-2 text-center">#</th>
                    <th className="border border-border p-2 text-left">Item Name</th>
                    <th className="border border-border p-2 text-center">HSN/SAC</th>
                    {formData.itemFields.batchNo && <th className="border border-border p-2 text-center">Batch No.</th>}
                    {formData.itemFields.expDate && <th className="border border-border p-2 text-center">Exp. Date</th>}
                    {formData.itemFields.mfgDate && <th className="border border-border p-2 text-center">Mfg. Date</th>}
                    {formData.itemFields.dosage && <th className="border border-border p-2 text-center">Dosage</th>}
                    <th className="border border-border p-2 text-center">Qty</th>
                    <th className="border border-border p-2 text-center">Unit</th>
                    <th className="border border-border p-2 text-right">Price/Unit(₹)</th>
                    <th className="border border-border p-2 text-right">GST(₹)</th>
                    <th className="border border-border p-2 text-right">Amount(₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2 text-center">1</td>
                    <td className="border border-border p-2 text-left">Sample Item{formData.itemFields.manufacturerName && ', Manufacturer Name: Cipla'}</td>
                    <td className="border border-border p-2 text-center">123456</td>
                    {formData.itemFields.batchNo && <td className="border border-border p-2 text-center">B1</td>}
                    {formData.itemFields.expDate && <td className="border border-border p-2 text-center">10/2026</td>}
                    {formData.itemFields.mfgDate && <td className="border border-border p-2 text-center">08/10/2024</td>}
                    {formData.itemFields.dosage && <td className="border border-border p-2 text-center">500mg</td>}
                    <td className="border border-border p-2 text-center">1</td>
                    <td className="border border-border p-2 text-center">STRP</td>
                    <td className="border border-border p-2 text-right">380.95</td>
                    <td className="border border-border p-2 text-right">19.05</td>
                    <td className="border border-border p-2 text-right">400</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

       
          
        </CardContent>
      </Card>

      
    </div>
  )

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
          
        </div>
      </div>

      <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">Set Up My Business on Vyapar</h1>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
              >
                Go Back
              </Button>
              <Button 
                onClick={handleNextStep}
                className="bg-primary text-primary-foreground"
              >
                {currentStep === 3 ? 'Finish Set Up' : `Step ${currentStep + 1}: ${currentStep === 1 ? 'Set Up Party & Transaction Fields' : 'Set Up Item Details'}`} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Preview Area - Increased Width */}
        <div className="w-2/5 p-6 border-l border-border bg-card">
          {renderInvoicePreview()}
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <PartyPopper className="h-6 w-6 text-yellow-500" />
              Your business has been set up 🎉
            </DialogTitle>
            <p className="text-muted-foreground">Take a look at how your invoice will look with the set up details!</p>
          </DialogHeader>
          
          <div className="mt-6">
            {renderInvoicePreview()}
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={() => setShowSuccessModal(false)} className="bg-primary text-primary-foreground">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
