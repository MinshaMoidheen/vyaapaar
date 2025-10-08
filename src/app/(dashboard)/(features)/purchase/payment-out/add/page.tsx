'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export default function AddPaymentOutPage() {
  const router = useRouter()
  const [partyName, setPartyName] = useState('')
  const [paymentNo, setPaymentNo] = useState('1')
  const [date, setDate] = useState('2025-10-06')
  const [paidAmount, setPaidAmount] = useState('')
  const [showDescription, setShowDescription] = useState(false)
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isBankModalOpen, setIsBankModalOpen] = useState(false)

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

  useEffect(() => {
    setPaidAmount(totalPayment.toString())
  }, [totalPayment])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleSave = () => {
    const paymentData = {
      partyName,
      paymentNo,
      date,
      paidAmount,
      paymentTypes,
      totalPayment,
      description,
      image: selectedImage?.name
    }
    console.log('Saving payment-out:', paymentData)
    router.push('/purchase/payment-out')
  }

  const handleBack = () => {
    router.push('/purchase/payment-out')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Payment-Out</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Calculator className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Party Selection */}
                <div>
                  <Label htmlFor="partyName" className="text-sm font-medium">Party *</Label>
                  <div className="relative mt-1">
                    <Input
                      id="partyName"
                      value={partyName}
                      onChange={(e) => setPartyName(e.target.value)}
                      placeholder="Search by Name/Phone"
                      className="pr-8"
                    />
                    <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Payment Types */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Payment Type</Label>
                  <div className="space-y-3">
                    {paymentTypes.map((payment, index) => (
                      <div key={payment.id} className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Select 
                            value={payment.type} 
                            onValueChange={(value) => {
                              if (value === '__add_bank__') { setIsBankModalOpen(true); return }
                              updatePaymentType(payment.id, 'type', value)
                            }}
                          >
                            <SelectTrigger className="w-32">
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
                          <Input
                            value={payment.amount}
                            onChange={(e) => updatePaymentType(payment.id, 'amount', e.target.value)}
                            placeholder="Amount"
                            className="flex-1"
                          />
                          {paymentTypes.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => removePaymentType(payment.id)} className="h-8 w-8 p-0 text-red-600">
                              <Trash2 className="h-4 w-4" />
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
                    <Button variant="outline" size="sm" onClick={addPaymentType} className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      + Add Payment type
                    </Button>
                  </div>
                </div>

                {/* Total Payment */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Total payment: ₹{totalPayment.toLocaleString()}</p>
                </div>

                {/* Additional Options */}
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={() => setShowDescription(!showDescription)}>
                    <FileText className="h-4 w-4" />
                    <span>+ ADD DESCRIPTION</span>
                  </Button>
                  {showDescription && (
                    <Textarea value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} placeholder="Enter description..." className="w-full" rows={3} />
                  )}

                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={() => document.getElementById('payment-image-upload')?.click()}>
                      <ImageIcon className="h-4 w-4" />
                      <span>Add Image</span>
                    </Button>
                    <input id="payment-image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    {imagePreview && (
                      <div className="relative w-full max-w-xs">
                        <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded border" />
                        <div className="absolute top-1 right-1">
                          <Button variant="destructive" size="sm" onClick={removeImage} className="h-6 w-6 p-0">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="paymentNo" className="text-sm font-medium">Payment No</Label>
                  <Input id="paymentNo" value={paymentNo} onChange={(e) => setPaymentNo(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="paidAmount" className="text-sm font-medium">Paid</Label>
                  <Input id="paidAmount" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} placeholder="Enter paid amount" className="mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <span>Cancel</span>
            <X className="h-4 w-4" />
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
        </div>
      </div>

      {/* Add Bank Account Modal */}
      {isBankModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="rounded-lg shadow-lg w-full max-w-4xl">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add Bank Account</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsBankModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Account Display Name</Label>
                  <Input placeholder="Enter Account Display Name" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Opening Balance</Label>
                  <Input placeholder="Enter Opening Balance" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">As of Date</Label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Account Number</Label>
                  <Input placeholder="Enter Account Number" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">IFSC Code</Label>
                  <Input placeholder="Enter IFSC" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">UPI ID for QR Code</Label>
                  <Input placeholder="Enter UPI ID" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Bank Name</Label>
                  <Input placeholder="Enter Bank Name" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Account Holder Name</Label>
                  <Input placeholder="Enter Account Holder Name" className="mt-1" />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsBankModalOpen(false)}>Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsBankModalOpen(false)}>Save Details</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



