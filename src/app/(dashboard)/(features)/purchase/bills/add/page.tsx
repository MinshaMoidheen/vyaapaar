'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Plus, 
  X, 
  Search, 
  FileText, 
  Image, 
  Paperclip,
  Share2,
  Save
} from 'lucide-react'

interface PurchaseItem {
  id: number
  item: string
  qty: string
  unit: string
  price: string
  discountPercent: string
  discountAmount: string
  taxPercent: string
  taxAmount: string
  amount: string
}

type PaymentTypeRow = { id: string; type: string; amount: string; referenceNo: string }

export default function AddPurchaseBillPage() {
  const router = useRouter()
  const [creditMode, setCreditMode] = useState(true)
  const [supplierName, setSupplierName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [billNumber, setBillNumber] = useState('1')
  const [billDate, setBillDate] = useState('2025-01-15')
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
  
  // PDF generation state
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const invoiceRef = useRef<HTMLDivElement>(null)

  const [items, setItems] = useState<PurchaseItem[]>([
    { id: 1, item: '', qty: '', unit: 'NONE', price: '', discountPercent: '', discountAmount: '', taxPercent: 'Select', taxAmount: '', amount: '' }
  ])

  // Payment types (mirrors Payment-Out behavior)
  const [paymentTypes, setPaymentTypes] = useState<PaymentTypeRow[]>([
    { id: 'p1', type: 'Select Type', amount: '0', referenceNo: '' }
  ])

  const addNewRow = () => {
    const newId = Math.max(...items.map(item => item.id)) + 1
    setItems([...items, {
      id: newId,
      item: '',
      qty: '',
      unit: 'NONE',
      price: '',
      discountPercent: '',
      discountAmount: '',
      taxPercent: 'Select',
      taxAmount: '',
      amount: ''
    }])
  }

  const removeRow = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: number, field: keyof PurchaseItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const calculateAmount = (item: PurchaseItem) => {
    const qty = parseFloat(item.qty) || 0
    const price = parseFloat(item.price) || 0
    const discountAmount = parseFloat(item.discountAmount) || 0
    const taxAmount = parseFloat(item.taxAmount) || 0
    
    const amount = (qty * price) - discountAmount + taxAmount
    return amount.toFixed(2)
  }

  const calculateTotals = () => {
    const totalQty = items.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0)
    const totalDiscount = items.reduce((sum, item) => sum + (parseFloat(item.discountAmount) || 0), 0)
    const totalTax = items.reduce((sum, item) => sum + (parseFloat(item.taxAmount) || 0), 0)
    const totalAmount = items.reduce((sum, item) => sum + parseFloat(calculateAmount(item)), 0)
    
    return {
      totalQty: totalQty.toFixed(0),
      totalDiscount: totalDiscount.toFixed(2),
      totalTax: totalTax.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    }
  }

  const totals = calculateTotals()

  // Payment type functions
  const updatePaymentType = (id: string, field: keyof PaymentTypeRow, value: string) => {
    setPaymentTypes(prev => prev.map(p => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addPaymentType = () => {
    setPaymentTypes(prev => [...prev, { id: `p${Date.now()}`, type: 'Select Type', amount: '0', referenceNo: '' }])
  }

  const removePaymentType = (id: string) => {
    setPaymentTypes(prev => (prev.length > 1 ? prev.filter(p => p.id !== id) : prev))
  }

  const calculateTotalPayment = () => paymentTypes.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)
  const totalPayment = calculateTotalPayment()

  // Additional options handlers
  const handleAddDescription = () => {
    setShowDescription(!showDescription)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedDocument(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const removeDocument = () => {
    setSelectedDocument(null)
  }

  // PDF generation functions
  const generatePDF = async () => {
    if (!invoiceRef.current) return

    setIsGeneratingPDF(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default

      // Create a temporary visible element for rendering
      const tempDiv = document.createElement('div')
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.top = '0'
      tempDiv.style.width = '800px'
      tempDiv.style.backgroundColor = '#ffffff'
      tempDiv.style.padding = '32px'
      tempDiv.style.fontFamily = 'Arial, sans-serif'
      tempDiv.style.color = '#000000'
      
      // Clone the invoice content
      tempDiv.innerHTML = invoiceRef.current.innerHTML
      document.body.appendChild(tempDiv)

      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 200))

      const canvas = await html2canvas(tempDiv, {
        useCORS: true,
        allowTaint: true,
        background: '#ffffff',
        logging: false
      })

      // Clean up
      document.body.removeChild(tempDiv)

      // Check if canvas has valid data
      console.log('Canvas dimensions:', canvas.width, 'x', canvas.height)
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas rendering failed')
      }

      const imgData = canvas.toDataURL('image/jpeg', 0.95)
      console.log('Image data length:', imgData.length)
      
      // Validate the data URL
      if (!imgData || imgData === 'data:,') {
        throw new Error('Invalid image data generated')
      }

      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`purchase-bill-${billNumber}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleSave = () => {
    // Prepare purchase data
    const purchaseData = {
      billNo: billNumber,
      date: billDate,
      supplierName: supplierName || 'ABC Suppliers',
      phoneNo: phoneNo || '9876543210',
      stateOfSupply,
      items: items.filter(item => item.item.trim() !== '').map(item => ({
        id: item.id,
        name: item.item,
        hsn: '44',
        qty: parseFloat(item.qty) || 1,
        unit: item.unit,
        price: parseFloat(item.price) || 0,
        discountPercent: parseFloat(item.discountPercent) || 0,
        discountAmount: parseFloat(item.discountAmount) || 0,
        taxPercent: parseFloat(item.taxPercent) || 0,
        taxAmount: parseFloat(item.taxAmount) || 0,
        amount: parseFloat(calculateAmount(item))
      })),
      description,
      total: parseFloat(totals.totalAmount),
      totalDiscount: parseFloat(totals.totalDiscount),
      totalTax: parseFloat(totals.totalTax),
      roundOff: roundOff,
      roundOffValue: parseFloat(roundOffValue),
      creditMode,
      paymentTypes,
      totalPayment
    }

    // Save data to sessionStorage for the invoice success page
    sessionStorage.setItem('purchaseData', JSON.stringify(purchaseData))
    
    // Navigate to invoice success page
    window.location.href = '/sales/invoice-success'
  }

  // Convert number to words (simplified version)
  const numberToWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
    
    if (num === 0) return 'Zero'
    if (num < 10) return ones[num]
    if (num < 20) return teens[num - 10]
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '')
    if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + numberToWords(num % 100) : '')
    
    return 'Amount in words'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Purchase</span>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Supplier and Bill Details */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Supplier Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Supplier/Party Details</h3>
                <div>
                  <Label htmlFor="supplierName" className="text-sm font-medium">
                    Search by Name/Phone *
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="supplierName"
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                      placeholder="Search by name or phone"
                      className="pr-8"
                    />
                    <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phoneNo" className="text-sm font-medium">Phone No.</Label>
                  <Input
                    id="phoneNo"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="Enter phone number"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Bill Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Bill Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Bill Number</Label>
                    <Input
                      value={billNumber}
                      onChange={(e) => setBillNumber(e.target.value)}
                      placeholder="Enter bill number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Bill Date</Label>
                    <Input
                      type="date"
                      value={billDate}
                      onChange={(e) => setBillDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">State of supply</Label>
                  <Select value={stateOfSupply} onValueChange={setStateOfSupply}>
                    <SelectTrigger className="mt-1">
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
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITEM</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNIT</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PRICE/UNIT
                      <div className="text-xs text-gray-400 font-normal">Without Tax</div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DISCOUNT
                      <div className="flex space-x-2">
                        <span className="text-xs text-gray-400 font-normal">%</span>
                        <span className="text-xs text-gray-400 font-normal">AMOUNT</span>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TAX
                      <div className="flex space-x-2">
                        <span className="text-xs text-gray-400 font-normal">%</span>
                        <span className="text-xs text-gray-400 font-normal">AMOUNT</span>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMOUNT</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3">
                        <Input
                          value={item.item}
                          onChange={(e) => updateItem(item.id, 'item', e.target.value)}
                          placeholder="Enter item name"
                          className="border-0 focus:ring-0 p-0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                          placeholder="0"
                          className="border-0 focus:ring-0 p-0 w-16"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Select value={item.unit} onValueChange={(value) => updateItem(item.id, 'unit', value)}>
                          <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto">
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
                      <td className="px-4 py-3">
                        <div className="flex flex-col space-y-1">
                          <Input
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                            placeholder="0.00"
                            className="border-0 focus:ring-0 p-0 w-20"
                          />
                          <Select>
                            <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="without-tax">Without Tax</SelectItem>
                              <SelectItem value="with-tax">With Tax</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-1">
                          <Input
                            value={item.discountPercent}
                            onChange={(e) => updateItem(item.id, 'discountPercent', e.target.value)}
                            placeholder="0"
                            className="border-0 focus:ring-0 p-0 w-12 text-xs"
                          />
                          <Input
                            value={item.discountAmount}
                            onChange={(e) => updateItem(item.id, 'discountAmount', e.target.value)}
                            placeholder="0.00"
                            className="border-0 focus:ring-0 p-0 w-16 text-xs"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-1">
                          <Select value={item.taxPercent} onValueChange={(value) => updateItem(item.id, 'taxPercent', value)}>
                            <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs w-12">
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
                          <Input
                            value={item.taxAmount}
                            onChange={(e) => updateItem(item.id, 'taxAmount', e.target.value)}
                            placeholder="0.00"
                            className="border-0 focus:ring-0 p-0 w-16 text-xs"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={calculateAmount(item)}
                          readOnly
                          className="border-0 focus:ring-0 p-0 w-20 bg-gray-50"
                        />
                      </td>
                      <td className="px-4 py-3">
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
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">TOTAL</td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalQty}</td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalDiscount}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalTax}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalAmount}</td>
                    <td className="px-4 py-3">
                      <Button
                        onClick={addNewRow}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
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
        <div className="flex justify-between items-start">
          {/* Additional Options */}
          <div className="flex flex-col space-y-3">
            {/* Payment Types */}
            <div className="space-y-4">
              {paymentTypes.map((payment, index) => (
                <div key={payment.id} className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Select value={payment.type} onValueChange={(value) => updatePaymentType(payment.id, 'type', value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="Select Type">Select Type</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={payment.amount}
                      onChange={(e) => updatePaymentType(payment.id, 'amount', e.target.value)}
                      placeholder="Amount"
                      className="flex-1"
                    />
                    {paymentTypes.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePaymentType(payment.id)}
                        className="h-8 w-8 p-0 text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {index > 0 && (
                    <div className="flex items-center space-x-3">
                      <Input
                        value={payment.referenceNo}
                        onChange={(e) => updatePaymentType(payment.id, 'referenceNo', e.target.value)}
                        placeholder="Reference No."
                        className="w-32"
                      />
                      <div className="flex-1"></div>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" onClick={addPaymentType} className="px-0 text-blue-600">+ Add Payment type</Button>
                <div className="text-sm font-medium">Total payment: {totalPayment}</div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={handleAddDescription}
              >
                <FileText className="h-4 w-4" />
                <span>ADD DESCRIPTION</span>
              </Button>
              {showDescription && (
                <Textarea
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  placeholder="Enter description..."
                  className="w-64"
                  rows={3}
                />
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label htmlFor="image-upload">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-2 cursor-pointer"
                  asChild
                >
                  <span>
                    <Image className="h-4 w-4" />
                    <span>ADD IMAGE</span>
                  </span>
                </Button>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {imagePreview && (
                <div className="relative w-64">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* Document Upload */}
            <div className="space-y-2">
              <label htmlFor="document-upload">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-2 cursor-pointer"
                  asChild
                >
                  <span>
                    <Paperclip className="h-4 w-4" />
                    <span>ADD DOCUMENT</span>
                  </span>
                </Button>
              </label>
              <input
                id="document-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleDocumentUpload}
                className="hidden"
              />
              {selectedDocument && (
                <div className="flex items-center space-x-2 w-64">
                  <span className="text-sm text-gray-600 truncate">
                    {selectedDocument.name}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={removeDocument}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Summary and Actions */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
               <Checkbox
                 id="roundOff"
                 checked={roundOff}
                 onCheckedChange={(checked) => setRoundOff(checked === true)}
               />
              <Label htmlFor="roundOff" className="text-sm">Round Off</Label>
              <Input
                value={roundOffValue}
                onChange={(e) => setRoundOffValue(e.target.value)}
                className="w-16 h-8"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Total</Label>
              <Input
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-24 h-8"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isGeneratingPDF}
                className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save & View Invoice</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Invoice Template for PDF Generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden' }}>
        <div ref={invoiceRef} className="bg-white p-8 w-[800px] text-black flex flex-col" style={{ fontFamily: 'Arial, sans-serif', minHeight: '800px' }}>
          <div className="flex-1">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Company</h1>
              <p className="text-gray-600">Phone no.: {phoneNo || '9876543210'}</p>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-sm">
                LOGO
              </div>
            </div>
          </div>
          
          {/* Purple line separator */}
          <div className="w-full h-1 bg-purple-600 mb-6"></div>
          
          {/* Invoice Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">Purchase Bill</h2>
          </div>
          
          {/* Bill To and Bill Details */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bill To</h3>
              <p className="text-gray-700">{supplierName || 'ABC Suppliers'}</p>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bill Details</h3>
              <p className="text-gray-700">Bill No. #{billNumber}</p>
              <p className="text-gray-700">Date: {billDate}</p>
            </div>
          </div>
          
          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">#</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Item name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">HSN/ SAC</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Quantity</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Unit</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Price/ Unit</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Discount</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.filter(item => item.item.trim() !== '').length > 0 ? (
                  items.filter(item => item.item.trim() !== '').map((item, index) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-3">{item.item}</td>
                      <td className="border border-gray-300 px-4 py-3">44</td>
                      <td className="border border-gray-300 px-4 py-3">{item.qty || '1'}</td>
                      <td className="border border-gray-300 px-4 py-3">{item.unit}</td>
                      <td className="border border-gray-300 px-4 py-3">₹ {parseFloat(item.price || '0').toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-3">
                        ₹ {parseFloat(item.discountAmount || '0').toFixed(2)} ({item.discountPercent || '0'}%)
                      </td>
                      <td className="border border-gray-300 px-4 py-3">₹ {calculateAmount(item)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">1</td>
                    <td className="border border-gray-300 px-4 py-3">Sample Item</td>
                    <td className="border border-gray-300 px-4 py-3">44</td>
                    <td className="border border-gray-300 px-4 py-3">1</td>
                    <td className="border border-gray-300 px-4 py-3">PCS</td>
                    <td className="border border-gray-300 px-4 py-3">₹ 433.00</td>
                    <td className="border border-gray-300 px-4 py-3">₹ 142.89 (33%)</td>
                    <td className="border border-gray-300 px-4 py-3">₹ 290.11</td>
                  </tr>
                )}
                {/* Total Row */}
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Total</td>
                  <td className="border border-gray-300 px-4 py-3"></td>
                  <td className="border border-gray-300 px-4 py-3"></td>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">{totals.totalQty}</td>
                  <td className="border border-gray-300 px-4 py-3"></td>
                  <td className="border border-gray-300 px-4 py-3"></td>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">₹ {totals.totalDiscount}</td>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">₹ {totals.totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Amount Summary */}
          <div className="flex justify-between items-start">
            <div className="w-1/2">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Amount in words</h3>
              <p className="text-gray-700">{numberToWords(Math.floor(parseFloat(totals.totalAmount)))} Rupees only</p>
            </div>
            <div className="w-1/2 text-right">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Sub Total:</span>
                  <span className="text-gray-900">₹ {totals.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Discount:</span>
                  <span className="text-gray-900">₹ {totals.totalDiscount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Round off:</span>
                  <span className="text-gray-900">- ₹ {roundOffValue}</span>
                </div>
                <div className="flex justify-between bg-purple-100 px-2 py-1 rounded">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-semibold text-gray-900">₹ {totals.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Paid:</span>
                  <span className="text-gray-900">₹ 0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Balance:</span>
                  <span className="text-gray-900">₹ {totals.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">You Saved:</span>
                  <span className="text-gray-900">₹ {totals.totalDiscount}</span>
                </div>
              </div>
              <div className="mt-4 text-right">
                <p className="text-gray-700">For : My Company</p>
              </div>
            </div>
          </div>
          </div>

          {/* Terms and Signature */}
          <div className="flex justify-between items-end mt-auto pt-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
              <p className="text-sm text-gray-600">Payment due within 30 days</p>
            </div>
            <div className="w-32 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs text-gray-500">Authorized Signatory</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


