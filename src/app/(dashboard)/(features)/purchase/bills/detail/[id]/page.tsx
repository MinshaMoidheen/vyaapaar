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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Purchase Bill Details</h1>
            <p className="text-gray-600">Bill #{billData.billNo}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bill Number</p>
                <p className="text-2xl font-bold text-gray-900">{billData.billNo}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">₹{billData.total}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Items</p>
                <p className="text-2xl font-bold text-blue-600">{billData.items.length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <Badge className={getStatusColor(billData.status)}>
                  {billData.status}
                </Badge>
              </div>
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bill Information */}
          <Card>
            <CardHeader>
              <CardTitle>Bill Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Party</label>
                    <p className="text-lg font-semibold text-gray-900">{billData.party}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone Number</label>
                    <p className="text-lg text-gray-900">{billData.phoneNo}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Bill Number</label>
                    <p className="text-lg font-semibold text-gray-900">{billData.billNo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Bill Date</label>
                    <p className="text-lg text-gray-900">{billData.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">State of Supply</label>
                    <p className="text-lg text-gray-900">{billData.stateOfSupply}</p>
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
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">#</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Item</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Qty</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Unit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Price/Unit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Discount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Tax</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billData.items.map((item, index) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4 font-medium">{item.item}</td>
                        <td className="py-3 px-4">{item.qty}</td>
                        <td className="py-3 px-4">{item.unit}</td>
                        <td className="py-3 px-4">₹{item.price}</td>
                        <td className="py-3 px-4">₹{item.discountAmount}</td>
                        <td className="py-3 px-4">₹{item.taxAmount}</td>
                        <td className="py-3 px-4 font-semibold">₹{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-semibold">
                      <td colSpan={2} className="py-3 px-4">Total</td>
                      <td className="py-3 px-4">{totals.totalQty}</td>
                      <td className="py-3 px-4"></td>
                      <td className="py-3 px-4"></td>
                      <td className="py-3 px-4">₹{totals.totalDiscount}</td>
                      <td className="py-3 px-4">₹{totals.totalTax}</td>
                      <td className="py-3 px-4">₹{totals.totalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Payment Type</label>
                <p className="text-lg font-semibold text-gray-900">{billData.paymentType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Round Off</label>
                <p className="text-lg text-gray-900">{billData.roundOff ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Round Off Value</label>
                <p className="text-lg text-gray-900">₹{billData.roundOffValue}</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-xl font-bold text-green-600">₹{billData.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleEdit} className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Edit Bill
              </Button>
              <Button variant="outline" onClick={handlePrint} className="w-full">
                <Printer className="mr-2 h-4 w-4" />
                Print Bill
              </Button>
              <Button variant="outline" onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share Bill
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}



