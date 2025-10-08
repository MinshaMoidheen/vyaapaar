'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Share2, 
  Download, 
  Printer,
  CreditCard,
  Calendar,
  FileSpreadsheet
} from 'lucide-react'

export default function PaymentOutPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [hasPayments, setHasPayments] = useState(true)
  
  // Filter states
  const [filterMonth, setFilterMonth] = useState('this_month')
  const [fromDate, setFromDate] = useState('01/10/2025')
  const [toDate, setToDate] = useState('31/10/2025')
  const [filterFirm, setFilterFirm] = useState('all_firms')
  const [filterUser, setFilterUser] = useState('all_users')
  const [filterTransactionType, setFilterTransactionType] = useState('payment_out')
  const [filterPayment, setFilterPayment] = useState('all_payment')

  // Dummy data for demonstration
  const payments = [
    {
      id: 1,
      paymentNo: 'PO-001',
      date: '2025-01-07',
      party: 'ABC Suppliers',
      phone: '+91 98765 43210',
      amount: 15000.00,
      paymentType: 'Bank Transfer',
      status: 'Completed',
      reference: 'TXN123456'
    },
    {
      id: 2,
      paymentNo: 'PO-002',
      date: '2025-01-06',
      party: 'XYZ Traders',
      phone: '+91 98765 43211',
      amount: 8500.00,
      paymentType: 'Cash',
      status: 'Pending',
      reference: 'CASH001'
    },
    {
      id: 3,
      paymentNo: 'PO-003',
      date: '2025-01-05',
      party: 'DEF Enterprises',
      phone: '+91 98765 43212',
      amount: 22000.00,
      paymentType: 'Cheque',
      status: 'Cleared',
      reference: 'CHQ789'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cleared':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.paymentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentType.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTransactionType = filterTransactionType === 'all_transaction' || 
      filterTransactionType === 'payment_out'
    
    const matchesPayment = filterPayment === 'all_payment' || 
      (filterPayment === 'unpaid_unused' && payment.status === 'Pending') ||
      (filterPayment === 'partial' && payment.status === 'Partial') ||
      (filterPayment === 'paid_used' && payment.status === 'Completed')
    
    return matchesSearch && matchesTransactionType && matchesPayment
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-900">Payment-Out</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!hasPayments ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment-Out Available</h3>
              <p className="text-gray-500 mb-6">Start by adding your first payment-out.</p>
              <Button 
                onClick={() => router.push('/purchase/payment-out/add')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payment-Out
              </Button>
            </div>
          </div>
        ) : (
          // Data State
          <div className="space-y-6">
            {/* Comprehensive Filter Bar */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {/* This Month Dropdown */}
                <Select value={filterMonth} onValueChange={setFilterMonth}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="This Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this_month">This Month</SelectItem>
                    <SelectItem value="last_month">Last Month</SelectItem>
                    <SelectItem value="this_year">This Year</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>

                {/* Date Range Picker */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Between</span>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {fromDate}
                  </Button>
                  <span className="text-sm text-gray-600">To</span>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {toDate}
                  </Button>
                </div>

                {/* ALL FIRMS Dropdown */}
                <Select value={filterFirm} onValueChange={setFilterFirm}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="ALL FIRMS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_firms">ALL FIRMS</SelectItem>
                    <SelectItem value="firm_1">Firm 1</SelectItem>
                    <SelectItem value="firm_2">Firm 2</SelectItem>
                  </SelectContent>
                </Select>

                {/* ALL USERS Dropdown */}
                <Select value={filterUser} onValueChange={setFilterUser}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="ALL USERS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_users">ALL USERS</SelectItem>
                    <SelectItem value="user_1">User 1</SelectItem>
                    <SelectItem value="user_2">User 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Second Row - Payment-Out and All Payment */}
              {/* <div className="flex items-center gap-4 mb-4">
           
                <Select value={filterTransactionType} onValueChange={setFilterTransactionType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Payment-Out" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_transaction">All Transaction</SelectItem>
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="payment_in">Payment-In</SelectItem>
                    <SelectItem value="payment_out">Payment-Out</SelectItem>
                    <SelectItem value="credit_note">Credit Note</SelectItem>
                    <SelectItem value="debit_note">Debit Note</SelectItem>
                    <SelectItem value="sale_order">Sale Order</SelectItem>
                    <SelectItem value="purchase_order">Purchase Order</SelectItem>
                    <SelectItem value="estimate">Estimate</SelectItem>
                    <SelectItem value="proforma_invoice">Proforma Invoice</SelectItem>
                    <SelectItem value="delivery_challan">Delivery Challan</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="party_to_party_received">Party to Party [Received]</SelectItem>
                    <SelectItem value="party_to_party_paid">Party to Party [Paid]</SelectItem>
                    <SelectItem value="manufacture">Manufacture</SelectItem>
                    <SelectItem value="sale_fa">Sale FA</SelectItem>
                    <SelectItem value="purchase_fa">Purchase FA</SelectItem>
                    <SelectItem value="sale_cancelled">Sale[Cancelled]</SelectItem>
                    <SelectItem value="journal_entry">Journal Entry</SelectItem>
                  </SelectContent>
                </Select>

               
                <Select value={filterPayment} onValueChange={setFilterPayment}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_payment">All Payment</SelectItem>
                    <SelectItem value="unpaid_unused">Unpaid/ Unused</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="paid_used">Paid/ Used</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              {/* Search Bar and Add Button Row */}
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    onClick={() => setHasPayments(!hasPayments)}
                    variant="outline"
                    size="sm"
                  >
                    {hasPayments ? 'Show Empty State' : 'Show With Data'}
                  </Button>
                  <Button 
                    onClick={() => router.push('/purchase/payment-out/add')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment-Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-1">
                            <span>#</span>
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-1">
                            <span>DATE</span>
                            <Filter className="h-3 w-3 text-gray-500" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-1">
                            <span>PAYMENT NO.</span>
                            <Filter className="h-3 w-3 text-gray-500" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-1">
                            <span>PARTY NAME</span>
                            <Filter className="h-3 w-3 text-gray-500" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-1">
                            <span>PAYMENT TYPE</span>
                            <Filter className="h-3 w-3 text-gray-500" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-1">
                            <span>AMOUNT</span>
                            <Filter className="h-3 w-3 text-gray-500" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-1">
                            <span>STATUS</span>
                            <Filter className="h-3 w-3 text-gray-500" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-1">
                            <span>ACTIONS</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPayments.map((payment, index) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{payment.date}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{payment.paymentNo}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{payment.party}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{payment.paymentType}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">₹ {payment.amount.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Printer className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}