'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft,
  Save,
  X,
  Plus,
  Search,
  FileText,
  Image,
  Paperclip
} from 'lucide-react'

interface EstimateItem {
  id: number
  item: string
  qty: string
  unit: string
  price: string
  discount: string
  gst: string
  amount: string
}

export default function AddEstimatePage() {
  const router = useRouter()
  
  const [creditMode, setCreditMode] = useState(true)
  const [customerName, setCustomerName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [estimateNumber, setEstimateNumber] = useState('EST-004')
  const [estimateDate, setEstimateDate] = useState('2025-10-06')
  const [validUntil, setValidUntil] = useState('2025-10-16')
  const [stateOfSupply, setStateOfSupply] = useState('')
  const [roundOff, setRoundOff] = useState(true)
  const [roundOffValue, setRoundOffValue] = useState('0')
  const [total, setTotal] = useState('0')
  
  // Additional options state
  const [showDescription, setShowDescription] = useState(false)
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [items, setItems] = useState<EstimateItem[]>([
    { id: 1, item: '', qty: '', unit: 'NONE', price: '', discount: '', gst: 'Select', amount: '' }
  ])

  const addNewRow = () => {
    const newId = Math.max(...items.map(item => item.id)) + 1
    setItems([...items, {
      id: newId,
      item: '',
      qty: '',
      unit: 'NONE',
      price: '',
      discount: '',
      gst: 'Select',
      amount: ''
    }])
  }

  const removeRow = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: number, field: keyof EstimateItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const calculateAmount = (item: EstimateItem) => {
    const qty = parseFloat(item.qty) || 0
    const price = parseFloat(item.price) || 0
    const discount = parseFloat(item.discount) || 0
    const gst = parseFloat(item.gst) || 0
    
    const subtotal = qty * price
    const discountAmount = subtotal * (discount / 100)
    const afterDiscount = subtotal - discountAmount
    const gstAmount = afterDiscount * (gst / 100)
    const amount = afterDiscount + gstAmount
    
    return amount.toFixed(2)
  }

  const calculateTotals = () => {
    const totalQty = items.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0)
    const totalAmount = items.reduce((sum, item) => sum + parseFloat(calculateAmount(item)), 0)
    
    return {
      totalQty: totalQty.toFixed(0),
      totalAmount: totalAmount.toFixed(2)
    }
  }

  const totals = calculateTotals()

  const handleSave = () => {
    const estimateData = {
      customerName,
      phoneNo,
      estimateNumber,
      estimateDate,
      validUntil,
      stateOfSupply,
      items,
      totals,
      description,
      selectedImage: selectedImage?.name,
      roundOff,
      roundOffValue,
      total
    }
    
    // Store data in sessionStorage for invoice success page
    sessionStorage.setItem('estimateData', JSON.stringify(estimateData))
    
    // Navigate to invoice success page
    router.push('/sales/invoice-success')
  }

  const handleCancel = () => {
    router.push('/sales/estimates')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size <= 5 * 1024 * 1024) { // 5MB limit
          setSelectedImage(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            setImagePreview(e.target?.result as string)
          }
          reader.readAsDataURL(file)
        } else {
          alert('Image size should be less than 5MB')
        }
      } else {
        alert('Please select a valid image file')
      }
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold">Add Estimate</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Customer and Estimate Details */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Customer/Party Details</h3>
                <div>
                  <Label htmlFor="customerName" className="text-sm font-medium">
                    Search by Name/Phone *
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Search by name or phone"
                      className="pr-8 text-sm"
                    />
                    <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
               
              </div>

              {/* Estimate Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Estimate Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Ref Number</Label>
                    <Input
                      value={estimateNumber}
                      onChange={(e) => setEstimateNumber(e.target.value)}
                      placeholder="Enter estimate number"
                      className="mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Estimate Date</Label>
                    <Input
                      type="date"
                      value={estimateDate}
                      onChange={(e) => setEstimateDate(e.target.value)}
                      className="mt-1 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Valid Until</Label>
                    <Input
                      type="date"
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                      className="mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">State of supply</Label>
                    <Select value={stateOfSupply} onValueChange={setStateOfSupply}>
                      <SelectTrigger className="mt-1 text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="same">Same State</SelectItem>
                        <SelectItem value="different">Different State</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">ITEM</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNIT</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">PRICE/UNIT</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DISCOUNT</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMOUNT</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900">{index + 1}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Input
                          value={item.item}
                          onChange={(e) => updateItem(item.id, 'item', e.target.value)}
                          placeholder="Enter item name"
                          className="border-0 focus:ring-0 p-0 text-xs md:text-sm"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Input
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                          placeholder="0"
                          className="border-0 focus:ring-0 p-0 w-12 md:w-16 text-xs md:text-sm"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Select value={item.unit} onValueChange={(value) => updateItem(item.id, 'unit', value)}>
                          <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NONE">NONE</SelectItem>
                            <SelectItem value="PCS">PCS</SelectItem>
                            <SelectItem value="KG">KG</SelectItem>
                            <SelectItem value="LTR">LTR</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Input
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                          placeholder="0.00"
                          className="border-0 focus:ring-0 p-0 w-16 md:w-20 text-xs"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Input
                          value={item.discount}
                          onChange={(e) => updateItem(item.id, 'discount', e.target.value)}
                          placeholder="0"
                          className="border-0 focus:ring-0 p-0 w-12 md:w-16 text-xs"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Select value={item.gst} onValueChange={(value) => updateItem(item.id, 'gst', value)}>
                          <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs w-12 md:w-16">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Select">Select</SelectItem>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="12">12%</SelectItem>
                            <SelectItem value="18">18%</SelectItem>
                            <SelectItem value="28">28%</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Input
                          value={calculateAmount(item)}
                          readOnly
                          className="border-0 focus:ring-0 p-0 w-16 md:w-20 text-xs"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        {items.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRow(item.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot 
                >
                  <tr>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900">TOTAL</td>
                    <td className="px-2 md:px-4 py-2 md:py-3"></td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900">{totals.totalQty}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3"></td>
                    <td className="px-2 md:px-4 py-2 md:py-3"></td>
                    <td className="px-2 md:px-4 py-2 md:py-3"></td>
                    <td className="px-2 md:px-4 py-2 md:py-3"></td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900">{totals.totalAmount}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3">
                      <Button
                        onClick={addNewRow}
                        size="sm"
                        className="text-xs px-2 py-1"
                      >
                        ADD ROW
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-6 lg:space-y-0">
          {/* Additional Options */}
          <div className="flex flex-col space-y-3">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2 text-xs"
                onClick={() => setShowDescription(!showDescription)}
              >
                <FileText className="h-4 w-4" />
                <span>ADD DESCRIPTION</span>
              </Button>
              {showDescription && (
                <Textarea
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  placeholder="Enter description..."
                  className="w-full sm:w-64 text-sm"
                  rows={3}
                />
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-2 text-xs"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <Image className="h-4 w-4" />
                  <span>ADD IMAGE</span>
                </Button>
                {selectedImage && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={removeImage}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {imagePreview && (
                <div className="relative w-full sm:w-64">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded border"
                  />
                  <div className="absolute top-1 right-1">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={removeImage}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary and Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-0 lg:space-y-4 xl:space-y-0 xl:space-x-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="roundOff"
                  checked={roundOff}
                  onCheckedChange={(checked) => setRoundOff(checked === true)}
                />
                <Label htmlFor="roundOff" className="text-xs sm:text-sm">Round Off</Label>
                <Input
                  value={roundOffValue}
                  onChange={(e) => setRoundOffValue(e.target.value)}
                  className="w-16 h-8 text-xs"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-xs sm:text-sm font-medium">Total</Label>
                <Input
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  className="w-20 sm:w-24 h-8 text-xs"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <Button variant="outline" onClick={handleCancel} className="text-xs w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex items-center space-x-2 text-xs w-full sm:w-auto">
                <Save className="h-4 w-4" />
                <span>Save & View Estimate</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
