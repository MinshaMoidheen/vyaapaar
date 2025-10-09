'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft, 
  Save, 
  X, 
  Plus, 
  Search, 
  FileText, 
  Image as ImageIcon,
  Calculator,
  Settings,
  Trash2
} from 'lucide-react'

interface PaymentType {
  id: number
  type: string
  amount: string
  referenceNo: string
}

export default function AddPaymentPage() {
  const router = useRouter()
  const [partyName, setPartyName] = useState('')
  const [receiptNo, setReceiptNo] = useState('1')
  const [date, setDate] = useState('2025-10-06')
  const [receivedAmount, setReceivedAmount] = useState('')
  const [showDescription, setShowDescription] = useState(false)
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isBankModalOpen, setIsBankModalOpen] = useState(false)

  // Add Bank A/C form state
  const [bankForm, setBankForm] = useState({
    accountDisplayName: '',
    openingBalance: '',
    asOfDate: '2025-10-06',
    accountNumber: '',
    ifsc: '',
    bankName: '',
    accountHolderName: '',
    upiId: '',
    printUpiOnInvoice: false,
    printBankOnInvoice: false,
  })
  
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([
    { id: 1, type: 'Cash', amount: '0', referenceNo: '' },
    { id: 2, type: 'Select Type', amount: '0', referenceNo: '' }
  ])

  const addPaymentType = () => {
    const newId = Math.max(...paymentTypes.map(p => p.id)) + 1
    setPaymentTypes([...paymentTypes, { id: newId, type: 'Select Type', amount: '0', referenceNo: '' }])
  }

  const removePaymentType = (id: number) => {
    if (paymentTypes.length > 1) {
      setPaymentTypes(paymentTypes.filter(p => p.id !== id))
    }
  }

  const updatePaymentType = (id: number, field: 'type' | 'amount' | 'referenceNo', value: string) => {
    setPaymentTypes(paymentTypes.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  const calculateTotalPayment = () => {
    return paymentTypes.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)
  }

  const totalPayment = calculateTotalPayment()

  // Auto-fill received amount with total payment
  useEffect(() => {
    setReceivedAmount(totalPayment.toString())
  }, [totalPayment])

  const handleSave = () => {
    const paymentData = {
      partyName,
      receiptNo,
      date,
      receivedAmount,
      paymentTypes,
      totalPayment,
      description,
      image: selectedImage?.name
    }
    console.log('Saving payment:', paymentData)
    router.push('/sales/payment-in')
  }

  const handleCancel = () => router.push('/sales/payment-in')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return alert('Please select a valid image file')
    if (file.size > 5 * 1024 * 1024) return alert('Image size should be less than 5MB')
    setSelectedImage(file)
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const removeImage = () => { 
    setSelectedImage(null)
    setImagePreview(null)
  }

  const saveBankAccount = () => {
    // In a real app, save bank account via API
    setIsBankModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold">Payment-In</h1>
          </div>
          
          {/* <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Calculator className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
              {/* Left Column */}
              <div className="space-y-4 md:space-y-6">
                {/* Party Selection */}
                <div>
                  <Label htmlFor="partyName" className="text-sm md:text-base font-medium">
                    Party *
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="partyName"
                      value={partyName}
                      onChange={(e) => setPartyName(e.target.value)}
                      placeholder="Search by Name/Phone"
                      className="pr-8 text-sm md:text-base"
                    />
                    <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Payment Types */}
                <div>
                  <Label className="text-sm md:text-base font-medium mb-3 block">Payment Type</Label>
                  <div className="space-y-3">
                    {paymentTypes.map((payment, index) => (
                      <div key={payment.id} className="space-y-2">
                        {/* First row: Payment Type and Amount */}
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                          <Select 
                            value={payment.type} 
                            onValueChange={(value) => {
                              if (value === '__add_bank__') {
                                setIsBankModalOpen(true)
                                return
                              }
                              updatePaymentType(payment.id, 'type', value)
                            }}
                          >
                            <SelectTrigger className="w-full sm:w-32 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__add_bank__">+ Add Bank A/C</SelectItem>
                              <SelectItem value="Cash">Cash</SelectItem>
                              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                              <SelectItem value="Cheque">Cheque</SelectItem>
                              <SelectItem value="UPI">UPI</SelectItem>
                              <SelectItem value="Card">Card</SelectItem>
                              <SelectItem value="Select Type">Select Type</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center space-x-2">
                            <Input
                              value={payment.amount}
                              onChange={(e) => updatePaymentType(payment.id, 'amount', e.target.value)}
                              placeholder="Amount"
                              className="flex-1 text-sm"
                            />
                            {paymentTypes.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removePaymentType(payment.id)}
                                className="h-8 w-8 p-0 text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        {/* Second row: Reference No (only for second payment type onward) */}
                        {index > 0 && (
                          <div className="flex items-center space-x-2">
                            <Input
                              value={payment.referenceNo}
                              onChange={(e) => updatePaymentType(payment.id, 'referenceNo', e.target.value)}
                              placeholder="Reference No."
                              className="w-full sm:w-32 text-sm"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addPaymentType}
                      className="text-primary border-primary hover:bg-primary/10 text-xs md:text-sm"
                    >
                      + Add Payment type
                    </Button>
                  </div>
                </div>


                {/* Total Payment Display */}
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm md:text-base font-medium text-foreground">
                    Total payment: ₹{totalPayment.toLocaleString()}
                  </p>
                </div>

                {/* Additional Options */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center space-x-2 text-xs md:text-sm"
                    onClick={() => setShowDescription(!showDescription)}
                  >
                    <FileText className="h-4 w-4" />
                    <span>+ ADD DESCRIPTION</span>
                  </Button>
                  {showDescription && (
                    <Textarea
                      value={description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                      placeholder="Enter description..."
                      className="w-full text-sm"
                      rows={3}
                    />
                  )}
                  
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center space-x-2 text-xs md:text-sm"
                      onClick={() => document.getElementById('payment-image-upload')?.click()}
                    >
                      <ImageIcon className="h-4 w-4" />
                      <span>Add Image</span>
                    </Button>
                    <input
                      id="payment-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {imagePreview && (
                      <div className="relative w-full max-w-xs">
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
              </div>

              {/* Right Column */}
              <div className="space-y-4 md:space-y-6">
                {/* Receipt Number */}
                <div>
                  <Label htmlFor="receiptNo" className="text-sm md:text-base font-medium">
                    Receipt No
                  </Label>
                  <Input
                    id="receiptNo"
                    value={receiptNo}
                    onChange={(e) => setReceiptNo(e.target.value)}
                    className="mt-1 text-sm md:text-base"
                  />
                </div>

                {/* Date */}
                <div>
                  <Label htmlFor="date" className="text-sm md:text-base font-medium">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 text-sm md:text-base"
                  />
                </div>

                {/* Received Amount */}
                <div>
                  <Label htmlFor="receivedAmount" className="text-sm md:text-base font-medium">
                    Received
                  </Label>
                  <Input
                    id="receivedAmount"
                    value={receivedAmount}
                    onChange={(e) => setReceivedAmount(e.target.value)}
                    placeholder="Enter received amount"
                    className="mt-1 text-sm md:text-base"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Button variant="outline" className="flex items-center space-x-2 text-xs md:text-sm w-full sm:w-auto">
            <span>Share</span>
            <X className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 flex items-center space-x-2 text-xs md:text-sm w-full sm:w-auto"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
        </div>
      </div>

      {/* Add Bank Account Modal (simple inline) */}
      {isBankModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
            <div className="border-b border-border px-4 md:px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-semibold text-foreground">Add Bank Account</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsBankModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Account Display Name</Label>
                  <Input 
                    value={bankForm.accountDisplayName} 
                    onChange={(e) => setBankForm({ ...bankForm, accountDisplayName: e.target.value })} 
                    placeholder="Enter Account Display Name" 
                    className="mt-1 text-sm" 
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Opening Balance</Label>
                  <Input 
                    value={bankForm.openingBalance} 
                    onChange={(e) => setBankForm({ ...bankForm, openingBalance: e.target.value })} 
                    placeholder="Enter Opening Balance" 
                    className="mt-1 text-sm" 
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">As of Date</Label>
                  <Input 
                    type="date" 
                    value={bankForm.asOfDate} 
                    onChange={(e) => setBankForm({ ...bankForm, asOfDate: e.target.value })} 
                    className="mt-1 text-sm" 
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Account Number</Label>
                  <Input 
                    value={bankForm.accountNumber} 
                    onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })} 
                    placeholder="Enter Account Number" 
                    className="mt-1 text-sm" 
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">IFSC Code</Label>
                  <Input 
                    value={bankForm.ifsc} 
                    onChange={(e) => setBankForm({ ...bankForm, ifsc: e.target.value })} 
                    placeholder="Enter IFSC" 
                    className="mt-1 text-sm" 
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">UPI ID for QR Code</Label>
                  <Input 
                    value={bankForm.upiId} 
                    onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })} 
                    placeholder="Enter UPI ID" 
                    className="mt-1 text-sm" 
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Bank Name</Label>
                  <Input 
                    value={bankForm.bankName} 
                    onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })} 
                    placeholder="Enter Bank Name" 
                    className="mt-1 text-sm" 
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Account Holder Name</Label>
                  <Input 
                    value={bankForm.accountHolderName} 
                    onChange={(e) => setBankForm({ ...bankForm, accountHolderName: e.target.value })} 
                    placeholder="Enter Account Holder Name" 
                    className="mt-1 text-sm" 
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsBankModalOpen(false)}
                  className="w-full sm:w-auto text-xs md:text-sm"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-xs md:text-sm w-full sm:w-auto" 
                  onClick={saveBankAccount}
                >
                  Save Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
