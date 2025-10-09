'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  Edit,
  Share2,
  Download,
  Printer,
  Eye,
  ShoppingCart
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

export default function PurchaseBillDetailPage() {
  const router = useRouter()
  const params = useParams()
  const billId = params.id

  const [billData, setBillData] = useState({
    id: '1',
    billNo: 'PB-001',
    date: '2025-01-07',
    party: 'ABC Suppliers',
    phoneNo: '+91 98765 43210',
    stateOfSupply: 'Delhi',
    paymentType: 'Cash',
    roundOff: false,
    roundOffValue: '0',
    total: '21820.00',
    status: 'Paid',
    items: [] as PurchaseItemRow[]
  })

  useEffect(() => {
    // Load bill data based on ID
    // In a real app, this would fetch from an API
    setBillData({
      id: '1',
      billNo: 'PB-001',
      date: '2025-01-07',
      party: 'ABC Suppliers',
      phoneNo: '+91 98765 43210',
      stateOfSupply: 'Delhi',
      paymentType: 'Cash',
      roundOff: false,
      roundOffValue: '0',
      total: '21820.00',
      status: 'Paid',
      items: [
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
      ]
    })
  }, [billId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateTotals = () => {
    const totalQty = billData.items.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0)
    const totalAmount = billData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
    const totalDiscount = billData.items.reduce((sum, item) => sum + (parseFloat(item.discountAmount) || 0), 0)
    const totalTax = billData.items.reduce((sum, item) => sum + (parseFloat(item.taxAmount) || 0), 0)
    
    return {
      totalQty: totalQty.toFixed(0),
      totalAmount: totalAmount.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      totalTax: totalTax.toFixed(2)
    }
  }

  const totals = calculateTotals()

  const handleBack = () => {
    router.push('/purchase/bills')
  }

  const handleEdit = () => {
    router.push(`/purchase/bills/edit/${billId}`)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Implement PDF download functionality
    console.log('Downloading PDF for bill:', billData.billNo)
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
              <h1 className="text-xl md:text-3xl font-bold text-foreground">Purchase Bill Details</h1>
              <p className="text-sm md:text-base text-muted-foreground">Bill #{billData.billNo}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={handleEdit} className="text-xs md:text-sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" onClick={handlePrint} className="text-xs md:text-sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownload} className="text-xs md:text-sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="text-xs md:text-sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">Bill Number</p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">{billData.billNo}</p>
                </div>
                <ShoppingCart className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">Total Amount</p>
                  <p className="text-lg md:text-2xl font-bold text-green-600">₹{billData.total}</p>
                </div>
                <div className="h-6 w-6 md:h-8 md:w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 md:h-4 md:w-4 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">Items</p>
                  <p className="text-lg md:text-2xl font-bold text-blue-600">{billData.items.length}</p>
                </div>
                <div className="h-6 w-6 md:h-8 md:w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 md:h-4 md:w-4 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className={`${getStatusColor(billData.status)} text-xs`}>
                    {billData.status}
                  </Badge>
                </div>
                <div className="h-6 w-6 md:h-8 md:w-8 bg-muted rounded-full flex items-center justify-center">
                  <Eye className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Bill Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm md:text-base">Bill Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label className="text-xs md:text-sm font-medium text-muted-foreground">Party</label>
                      <p className="text-sm md:text-lg font-semibold text-foreground">{billData.party}</p>
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium text-muted-foreground">Phone Number</label>
                      <p className="text-sm md:text-lg text-foreground">{billData.phoneNo}</p>
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label className="text-xs md:text-sm font-medium text-muted-foreground">Bill Number</label>
                      <p className="text-sm md:text-lg font-semibold text-foreground">{billData.billNo}</p>
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium text-muted-foreground">Bill Date</label>
                      <p className="text-sm md:text-lg text-foreground">{billData.date}</p>
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium text-muted-foreground">State of Supply</label>
                      <p className="text-sm md:text-lg text-foreground">{billData.stateOfSupply}</p>
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
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm text-muted-foreground w-[40px]">#</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm text-muted-foreground min-w-[150px]">Item</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm text-muted-foreground w-[80px]">Qty</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm text-muted-foreground w-[80px]">Unit</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm text-muted-foreground w-[100px]">Price/Unit</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm text-muted-foreground w-[100px]">Discount</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm text-muted-foreground w-[100px]">Tax</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm text-muted-foreground w-[100px]">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billData.items.map((item, index) => (
                        <tr key={item.id} className="border-b hover:bg-muted/30">
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">{index + 1}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm text-foreground">{item.item}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">{item.qty}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">{item.unit}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">₹{item.price}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">₹{item.discountAmount}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">₹{item.taxAmount}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 font-semibold text-xs md:text-sm text-foreground">₹{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted/50 font-semibold">
                        <td colSpan={2} className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">Total</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">{totals.totalQty}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4"></td>
                        <td className="py-2 md:py-3 px-2 md:px-4"></td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">₹{totals.totalDiscount}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">₹{totals.totalTax}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-foreground">₹{totals.totalAmount}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
        </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm md:text-base">Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div>
                  <label className="text-xs md:text-sm font-medium text-muted-foreground">Payment Type</label>
                  <p className="text-sm md:text-lg font-semibold text-foreground">{billData.paymentType}</p>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-medium text-muted-foreground">Round Off</label>
                  <p className="text-sm md:text-lg text-foreground">{billData.roundOff ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-medium text-muted-foreground">Round Off Value</label>
                  <p className="text-sm md:text-lg text-foreground">₹{billData.roundOffValue}</p>
                </div>
                <div className="border-t pt-3 md:pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-lg font-semibold text-foreground">Total Amount</span>
                    <span className="text-lg md:text-xl font-bold text-green-600">₹{billData.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm md:text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3">
                <Button onClick={handleEdit} className="w-full text-xs md:text-sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Bill
                </Button>
                <Button variant="outline" onClick={handlePrint} className="w-full text-xs md:text-sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Bill
                </Button>
                <Button variant="outline" onClick={handleDownload} className="w-full text-xs md:text-sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full text-xs md:text-sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Bill
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}



