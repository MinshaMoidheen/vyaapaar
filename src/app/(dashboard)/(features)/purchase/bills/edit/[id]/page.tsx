'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Plus, 
  X, 
  Upload, 
  Share2, 
  Save,
  ArrowLeft,
  Calculator,
  Settings
} from 'lucide-react'

interface PurchaseItemRow {
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

export default function EditPurchaseBillPage() {
  const router = useRouter()
  const params = useParams()
  const billId = params.id

  const [party, setParty] = useState('ABC Suppliers')
  const [phoneNo, setPhoneNo] = useState('+91 98765 43210')
  const [billNumber, setBillNumber] = useState('PB-001')
  const [billDate, setBillDate] = useState<string>('2025-01-07')
  const [stateOfSupply, setStateOfSupply] = useState('Delhi')
  const [paymentType, setPaymentType] = useState('Cash')
  const [roundOff, setRoundOff] = useState(false)
  const [roundOffValue, setRoundOffValue] = useState('0')
  const [total, setTotal] = useState('15000.00')

  const [items, setItems] = useState<PurchaseItemRow[]>([
    { 
      id: 1, 
      item: 'Office Supplies', 
      qty: '10', 
      unit: 'PCS', 
      price: '1000.00', 
      discountPercent: '10', 
      discountAmount: '1000.00', 
      taxPercent: '18', 
      taxAmount: '1620.00', 
      amount: '10620.00' 
    },
    { 
      id: 2, 
      item: 'Electronics', 
      qty: '5', 
      unit: 'PCS', 
      price: '2000.00', 
      discountPercent: '5', 
      discountAmount: '500.00', 
      taxPercent: '18', 
      taxAmount: '2700.00', 
      amount: '11200.00' 
    }
  ])

  useEffect(() => {
    // Load existing bill data based on ID
    // In a real app, this would fetch from an API
    console.log('Loading bill data for ID:', billId)
  }, [billId])

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

  const updateItem = (id: number, field: keyof PurchaseItemRow, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        
        // Calculate amount when price, qty, discount, or tax changes
        if (['price', 'qty', 'discountPercent', 'discountAmount', 'taxPercent'].includes(field)) {
          const price = parseFloat(updatedItem.price) || 0
          const qty = parseFloat(updatedItem.qty) || 0
          const discountPercent = parseFloat(updatedItem.discountPercent) || 0
          const discountAmount = parseFloat(updatedItem.discountAmount) || 0
          const taxPercent = parseFloat(updatedItem.taxPercent) || 0
          
          const subtotal = price * qty
          const finalDiscount = discountPercent > 0 ? (subtotal * discountPercent / 100) : discountAmount
          const afterDiscount = subtotal - finalDiscount
          const taxAmount = afterDiscount * (taxPercent / 100)
          const finalAmount = afterDiscount + taxAmount
          
          updatedItem.amount = finalAmount.toFixed(2)
          updatedItem.discountAmount = finalDiscount.toFixed(2)
          updatedItem.taxAmount = taxAmount.toFixed(2)
        }
        
        return updatedItem
      }
      return item
    }))
  }

  const calculateTotals = () => {
    const totalQty = items.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0)
    const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
    const totalDiscount = items.reduce((sum, item) => sum + (parseFloat(item.discountAmount) || 0), 0)
    const totalTax = items.reduce((sum, item) => sum + (parseFloat(item.taxAmount) || 0), 0)
    
    return {
      totalQty: totalQty.toFixed(0),
      totalAmount: totalAmount.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      totalTax: totalTax.toFixed(2)
    }
  }

  const totals = calculateTotals()

  const handleSave = () => {
    const purchaseData = {
      id: billId,
      party,
      phoneNo,
      billNumber,
      billDate,
      stateOfSupply,
      paymentType,
      roundOff,
      roundOffValue,
      total: totals.totalAmount,
      items,
      totals
    }
    
    // Store data in sessionStorage for invoice success page
    sessionStorage.setItem('purchaseData', JSON.stringify(purchaseData))
    
    // Navigate to invoice success page
    router.push('/sales/invoice-success')
  }

  const handleBack = () => {
    router.push('/purchase/bills')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Purchase Bill</h1>
            <p className="text-gray-600">Update purchase bill details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Calculator className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Party and Bill Details */}
          <Card>
            <CardHeader>
              <CardTitle>Party & Bill Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Party Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="party">Party *</Label>
                    <Select value={party} onValueChange={setParty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Party" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abc-suppliers">ABC Suppliers</SelectItem>
                        <SelectItem value="xyz-traders">XYZ Traders</SelectItem>
                        <SelectItem value="def-enterprises">DEF Enterprises</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phoneNo">Phone No.</Label>
                    <Input
                      id="phoneNo"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Bill Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="billNumber">Bill Number</Label>
                    <Input
                      id="billNumber"
                      value={billNumber}
                      onChange={(e) => setBillNumber(e.target.value)}
                      placeholder="Enter bill number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billDate">Bill Date</Label>
                    <Input
                      id="billDate"
                      type="date"
                      value={billDate}
                      onChange={(e) => setBillDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stateOfSupply">State of supply</Label>
                    <Select value={stateOfSupply} onValueChange={setStateOfSupply}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items Table */}
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2 w-12">#</th>
                      <th className="text-left py-2 px-2">ITEM</th>
                      <th className="text-left py-2 px-2 w-20">QTY</th>
                      <th className="text-left py-2 px-2 w-24">UNIT</th>
                      <th className="text-left py-2 px-2 w-32">PRICE/UNIT (Without Tax)</th>
                      <th className="text-left py-2 px-2 w-24">DISCOUNT (%)</th>
                      <th className="text-left py-2 px-2 w-28">DISCOUNT (AMOUNT)</th>
                      <th className="text-left py-2 px-2 w-24">TAX (%)</th>
                      <th className="text-left py-2 px-2 w-24">TAX (AMOUNT)</th>
                      <th className="text-left py-2 px-2 w-24">AMOUNT</th>
                      <th className="text-left py-2 px-2 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2 px-2">{index + 1}</td>
                        <td className="py-2 px-2">
                          <Input
                            value={item.item}
                            onChange={(e) => updateItem(item.id, 'item', e.target.value)}
                            placeholder="Enter item name"
                            className="w-full"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <Input
                            value={item.qty}
                            onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                            placeholder="0"
                            className="w-full"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <Select value={item.unit} onValueChange={(value) => updateItem(item.id, 'unit', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="NONE">NONE</SelectItem>
                              <SelectItem value="PCS">PCS</SelectItem>
                              <SelectItem value="KG">KG</SelectItem>
                              <SelectItem value="LTR">LTR</SelectItem>
                              <SelectItem value="MTR">MTR</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-2 px-2">
                          <Input
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                            placeholder="0.00"
                            className="w-full"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <Input
                            value={item.discountPercent}
                            onChange={(e) => updateItem(item.id, 'discountPercent', e.target.value)}
                            placeholder="0"
                            className="w-full"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <Input
                            value={item.discountAmount}
                            onChange={(e) => updateItem(item.id, 'discountAmount', e.target.value)}
                            placeholder="0.00"
                            className="w-full"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <Select value={item.taxPercent} onValueChange={(value) => updateItem(item.id, 'taxPercent', value)}>
                            <SelectTrigger>
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
                        <td className="py-2 px-2">
                          <Input
                            value={item.taxAmount}
                            placeholder="0.00"
                            className="w-full"
                            readOnly
                          />
                        </td>
                        <td className="py-2 px-2">
                          <Input
                            value={item.amount}
                            placeholder="0.00"
                            className="w-full"
                            readOnly
                          />
                        </td>
                        <td className="py-2 px-2">
                          {items.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRow(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" onClick={addNewRow} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  ADD ROW
                </Button>
              </div>

              {/* Total Row */}
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-8">
                    <span className="font-medium">TOTAL</span>
                    <span>QTY: {totals.totalQty}</span>
                    <span>TAX (AMOUNT): ₹{totals.totalTax}</span>
                    <span>AMOUNT: ₹{totals.totalAmount}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment and Totals */}
          <Card>
            <CardHeader>
              <CardTitle>Payment & Totals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="paymentType">Payment Type</Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                + Add Payment type
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="roundOff"
                  checked={roundOff}
                  onCheckedChange={(checked) => setRoundOff(checked === true)}
                />
                <Label htmlFor="roundOff">Round Off</Label>
                <Input
                  value={roundOffValue}
                  onChange={(e) => setRoundOffValue(e.target.value)}
                  className="w-20 h-8"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Total</Label>
                <Input
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  className="w-24 h-8"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Bill
                </Button>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}



