'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  ShoppingCart,
  Calendar,
  FileSpreadsheet
} from 'lucide-react'

export default function PurchaseBillsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [hasBills, setHasBills] = useState(true)
  
  // Filter states
  const [filterMonth, setFilterMonth] = useState('this_month')
  const [fromDate, setFromDate] = useState('01/10/2025')
  const [toDate, setToDate] = useState('31/10/2025')
  const [filterFirm, setFilterFirm] = useState('all_firms')
  const [filterUser, setFilterUser] = useState('all_users')
  const [filterTransactionType, setFilterTransactionType] = useState('purchase')
  const [filterPayment, setFilterPayment] = useState('all_payment')

  // Dummy data for demonstration
  const purchaseBills = [
    {
      id: 1,
      billNo: 'PB-001',
      date: '2025-01-07',
      party: 'ABC Suppliers',
      phone: '+91 98765 43210',
      total: 15000.00,
      status: 'Paid',
      items: 3
    },
    {
      id: 2,
      billNo: 'PB-002',
      date: '2025-01-06',
      party: 'XYZ Traders',
      phone: '+91 98765 43211',
      total: 8500.00,
      status: 'Pending',
      items: 2
    },
    {
      id: 3,
      billNo: 'PB-003',
      date: '2025-01-05',
      party: 'DEF Enterprises',
      phone: '+91 98765 43212',
      total: 22000.00,
      status: 'Overdue',
      items: 5
    }
  ]

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

  const filteredBills = purchaseBills.filter(bill => {
    const matchesSearch = bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.party.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTransactionType = filterTransactionType === 'all_transaction' || 
      filterTransactionType === 'purchase'
    
    const matchesPayment = filterPayment === 'all_payment' || 
      (filterPayment === 'unpaid_unused' && bill.status === 'Pending') ||
      (filterPayment === 'partial' && bill.status === 'Partial') ||
      (filterPayment === 'paid_used' && bill.status === 'Paid')
    
    return matchesSearch && matchesTransactionType && matchesPayment
  })

  const handleViewBill = (billId: number) => {
    router.push(`/purchase/bills/detail/${billId}`)
  }

  const handleEditBill = (billId: number) => {
    router.push(`/purchase/bills/edit/${billId}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header Bar */}
      <div className="border-b border-border px-4 py-3 md:px-6 md:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg md:text-xl font-semibold text-foreground">Purchase Bills</h1>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {!hasBills ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-8 md:py-12">
            <div className="text-center">
              <div className="mx-auto h-20 w-20 md:h-24 md:w-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-foreground mb-2">No Purchase Bills Available</h3>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">Start by adding your first purchase bill.</p>
              <Button 
                onClick={() => router.push('/purchase/bills/add')}
                className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Purchase Bill
              </Button>
            </div>
          </div>
        ) : (
          // Data State
          <div className="space-y-4 md:space-y-6">
            {/* Comprehensive Filter Bar */}
            <div className="p-3 md:p-4 rounded-lg border border-border">
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-4">
                {/* This Month Dropdown */}
                <Select value={filterMonth} onValueChange={setFilterMonth}>
                  <SelectTrigger className="w-full sm:w-32 text-xs md:text-sm">
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
                  {/* <span className="text-xs md:text-sm text-muted-foreground">Between</span> */}
                  <Button variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" /> {fromDate}
                  </Button>
                  <span className="text-xs md:text-sm text-muted-foreground">To</span>
                  <Button variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" /> {toDate}
                  </Button>
                </div>

                {/* ALL FIRMS Dropdown */}
                <Select value={filterFirm} onValueChange={setFilterFirm}>
                  <SelectTrigger className="w-full sm:w-32 text-xs md:text-sm">
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
                  <SelectTrigger className="w-full sm:w-32 text-xs md:text-sm">
                    <SelectValue placeholder="ALL USERS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_users">ALL USERS</SelectItem>
                    <SelectItem value="user_1">User 1</SelectItem>
                    <SelectItem value="user_2">User 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Bar and Add Button Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1 max-w-sm w-full">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 text-sm md:text-base"
                  />
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Button 
                    onClick={() => setHasBills(!hasBills)}
                    variant="outline"
                    size="sm"
                    className="text-xs md:text-sm w-full sm:w-auto"
                  >
                    {hasBills ? 'Show Empty State' : 'Show With Data'}
                  </Button>
                  <Button 
                    onClick={() => router.push('/purchase/bills/add')}
                    className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Add Purchase Bill</span>
                    <span className="sm:hidden">Add Bill</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[40px]">
                          <div className="flex items-center space-x-1">
                            <span>#</span>
                          </div>
                        </th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[100px]">
                          <div className="flex items-center space-x-1">
                            <span>DATE</span>
                            <Filter className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[120px]">
                          <div className="flex items-center space-x-1">
                            <span>BILL NO.</span>
                            <Filter className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[150px]">
                          <div className="flex items-center space-x-1">
                            <span>PARTY NAME</span>
                            <Filter className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[100px]">
                          <div className="flex items-center space-x-1">
                            <span>TOTAL</span>
                            <Filter className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[100px]">
                          <div className="flex items-center space-x-1">
                            <span>STATUS</span>
                            <Filter className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[120px]">
                          <div className="flex items-center space-x-1">
                            <span>ACTIONS</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredBills.map((bill, index) => (
                        <tr key={bill.id} className="hover:bg-muted/30">
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{index + 1}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{bill.date}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{bill.billNo}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{bill.party}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">₹ {bill.total.toFixed(2)}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3">
                            <Badge className={`${getStatusColor(bill.status)} text-xs`}>
                              {bill.status}
                            </Badge>
                          </td>
                          <td className="px-2 md:px-4 py-2 md:py-3">
                            <div className="flex items-center space-x-1 md:space-x-2">
                              <Button variant="ghost" size="sm" className="h-7 w-7 md:h-8 md:w-8 p-0">
                                <Printer className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 md:h-8 md:w-8 p-0">
                                <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 md:h-8 md:w-8 p-0">
                                    <MoreHorizontal className="h-3 w-3 md:h-4 md:w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem 
                                    className="text-xs md:text-sm cursor-pointer"
                                    onClick={() => handleViewBill(bill.id)}
                                  >
                                    <Eye className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-xs md:text-sm cursor-pointer"
                                    onClick={() => handleEditBill(bill.id)}
                                  >
                                    <Edit className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-xs md:text-sm">
                                    <Download className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600 text-xs md:text-sm">
                                    <Trash2 className="h-3 w-3 md:h-4 md:w-4 mr-2" />
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