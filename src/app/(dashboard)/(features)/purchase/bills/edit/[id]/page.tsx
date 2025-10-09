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
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" onClick={handleBack} className="text-xs md:text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-foreground">Edit Purchase Bill</h1>
              <p className="text-sm md:text-base text-muted-foreground">Update purchase bill details</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Calculator className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Party and Bill Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm md:text-base">Party & Bill Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Party Details */}
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <Label htmlFor="party" className="text-sm md:text-base">Party *</Label>
                      <Select value={party} onValueChange={setParty}>
                        <SelectTrigger className="text-sm md:text-base">
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
                      <Label htmlFor="phoneNo" className="text-sm md:text-base">Phone No.</Label>
                      <Input
                        id="phoneNo"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        placeholder="Enter phone number"
                        className="text-sm md:text-base"
                      />
                    </div>
                  </div>

                  {/* Bill Details */}
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <Label htmlFor="billNumber" className="text-sm md:text-base">Bill Number</Label>
                      <Input
                        id="billNumber"
                        value={billNumber}
                        onChange={(e) => setBillNumber(e.target.value)}
                        placeholder="Enter bill number"
                        className="text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="billDate" className="text-sm md:text-base">Bill Date</Label>
                      <Input
                        id="billDate"
                        type="date"
                        value={billDate}
                        onChange={(e) => setBillDate(e.target.value)}
                        className="text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stateOfSupply" className="text-sm md:text-base">State of supply</Label>
                      <Select value={stateOfSupply} onValueChange={setStateOfSupply}>
                        <SelectTrigger className="text-sm md:text-base">
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
                <CardTitle className="text-sm md:text-base">Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-2 px-2 w-12 text-xs font-medium text-muted-foreground">#</th>
                        <th className="text-left py-2 px-2 min-w-[150px] text-xs font-medium text-muted-foreground">ITEM</th>
                        <th className="text-left py-2 px-2 w-20 text-xs font-medium text-muted-foreground">QTY</th>
                        <th className="text-left py-2 px-2 w-24 text-xs font-medium text-muted-foreground">UNIT</th>
                        <th className="text-left py-2 px-2 w-32 text-xs font-medium text-muted-foreground">PRICE/UNIT</th>
                        <th className="text-left py-2 px-2 w-24 text-xs font-medium text-muted-foreground">DISCOUNT (%)</th>
                        <th className="text-left py-2 px-2 w-28 text-xs font-medium text-muted-foreground">DISCOUNT (AMT)</th>
                        <th className="text-left py-2 px-2 w-24 text-xs font-medium text-muted-foreground">TAX (%)</th>
                        <th className="text-left py-2 px-2 w-24 text-xs font-medium text-muted-foreground">TAX (AMT)</th>
                        <th className="text-left py-2 px-2 w-24 text-xs font-medium text-muted-foreground">AMOUNT</th>
                        <th className="text-left py-2 px-2 w-12 text-xs font-medium text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={item.id} className="border-b hover:bg-muted/30">
                          <td className="py-2 px-2 text-xs md:text-sm text-foreground">{index + 1}</td>
                          <td className="py-2 px-2">
                            <Input
                              value={item.item}
                              onChange={(e) => updateItem(item.id, 'item', e.target.value)}
                              placeholder="Enter item name"
                              className="w-full text-xs md:text-sm"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              value={item.qty}
                              onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                              placeholder="0"
                              className="w-full text-xs md:text-sm"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Select value={item.unit} onValueChange={(value) => updateItem(item.id, 'unit', value)}>
                              <SelectTrigger className="text-xs">
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
                              className="w-full text-xs md:text-sm"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              value={item.discountPercent}
                              onChange={(e) => updateItem(item.id, 'discountPercent', e.target.value)}
                              placeholder="0"
                              className="w-full text-xs"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              value={item.discountAmount}
                              onChange={(e) => updateItem(item.id, 'discountAmount', e.target.value)}
                              placeholder="0.00"
                              className="w-full text-xs"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Select value={item.taxPercent} onValueChange={(value) => updateItem(item.id, 'taxPercent', value)}>
                              <SelectTrigger className="text-xs">
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
                              className="w-full text-xs bg-muted/50"
                              readOnly
                            />
                          </td>
                          <td className="py-2 px-2">
                            <Input
                              value={item.amount}
                              placeholder="0.00"
                              className="w-full text-xs bg-muted/50"
                              readOnly
                            />
                          </td>
                          <td className="py-2 px-2">
                            {items.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeRow(item.id)}
                                className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" onClick={addNewRow} className="w-full text-xs md:text-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">ADD ROW</span>
                    <span className="sm:hidden">ADD</span>
                  </Button>
                </div>

                {/* Total Row */}
                <div className="mt-4 border-t pt-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="flex flex-wrap gap-2 sm:gap-8 text-xs md:text-sm">
                      <span className="font-medium text-foreground">TOTAL</span>
                      <span className="text-muted-foreground">QTY: {totals.totalQty}</span>
                      <span className="text-muted-foreground">TAX: ₹{totals.totalTax}</span>
                      <span className="font-semibold text-foreground">AMOUNT: ₹{totals.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Payment and Totals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm md:text-base">Payment & Totals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div>
                  <Label htmlFor="paymentType" className="text-sm md:text-base">Payment Type</Label>
                  <Select value={paymentType} onValueChange={setPaymentType}>
                    <SelectTrigger className="text-sm md:text-base">
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
                
                <div className="text-xs md:text-sm text-primary hover:text-primary/80 cursor-pointer">
                  + Add Payment type
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="roundOff"
                    checked={roundOff}
                    onCheckedChange={(checked) => setRoundOff(checked === true)}
                  />
                  <Label htmlFor="roundOff" className="text-sm md:text-base">Round Off</Label>
                  <Input
                    value={roundOffValue}
                    onChange={(e) => setRoundOffValue(e.target.value)}
                    className="w-16 h-8 text-xs"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm md:text-lg font-semibold text-foreground">Total</Label>
                  <Input
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    className="w-20 md:w-24 h-8 text-xs"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  <Button variant="outline" className="w-full text-xs md:text-sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Bill
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button variant="outline" className="flex-1 text-xs md:text-sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90 text-xs md:text-sm">
                      <Save className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Save Changes</span>
                      <span className="sm:hidden">Save</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}



