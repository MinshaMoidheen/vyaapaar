'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
	 Search,
	 Plus,
	 MoreHorizontal,
	 Eye,
	 Edit,
	 Trash2,
	 Share2,
	 Download,
	 Printer,
	 ChevronDown,
	 ArrowUpDown,
	 FileText,
	 FileSpreadsheet
} from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface SaleReturn {
	 id: string
	 date: string
	 refNo: string
	 partyName: string
	 category: string
	 type: string
	 total: string
	 received: string
	 balance: string
	 status: 'Open' | 'Closed' | 'Partial'
}

export default function SaleReturnPage() {
	 const router = useRouter()
	 const [searchTerm, setSearchTerm] = useState('')
	 const [hasReturns, setHasReturns] = useState(true)

	 // Dummy data for demonstration
	 const dummyReturns: SaleReturn[] = [
		 {
			 id: '1',
			 date: '07/10/2025',
			 refNo: 'CN-001',
			 partyName: 'Minsha',
			 category: 'Sales Return',
			 type: 'Credit Note',
			 total: '290.00',
			 received: '0.00',
			 balance: '290.00',
			 status: 'Open'
		 },
		 {
			 id: '2',
			 date: '06/10/2025',
			 refNo: 'CN-002',
			 partyName: 'John Smith',
			 category: 'Sales Return',
			 type: 'Credit Note',
			 total: '1,500.00',
			 received: '500.00',
			 balance: '1,000.00',
			 status: 'Partial'
		 },
		 {
			 id: '3',
			 date: '05/10/2025',
			 refNo: 'CN-003',
			 partyName: 'Mike Johnson',
			 category: 'Sales Return',
			 type: 'Credit Note',
			 total: '2,200.00',
			 received: '2,200.00',
			 balance: '0.00',
			 status: 'Closed'
		 }
	 ]

	 const [returns, setReturns] = useState<SaleReturn[]>([])

	 const handleAddReturn = () => {
		 router.push('/sales/sale-return/add')
	 }

	 const handleView = (id: string) => {
		 router.push(`/sales/sale-return/detail/${id}`)
	 }

	 const handleEdit = (id: string) => {
		 router.push(`/sales/sale-return/edit/${id}`)
	 }

	 const handleDelete = (id: string) => {
		 setReturns(prev => prev.filter(returnItem => returnItem.id !== id))
	 }

	 const handleShare = (id: string) => {
		 console.log('Sharing return:', id)
	 }

	 const handleDownload = (id: string) => {
		 console.log('Downloading return:', id)
	 }

	 const handlePrint = (id: string) => {
		 console.log('Printing return:', id)
	 }

	 const getStatusColor = (status: string) => {
		 switch (status) {
			 case 'Closed': return 'text-green-600'
			 case 'Open': return 'text-orange-600'
			 case 'Partial': return 'text-blue-600'
			 default: return 'text-gray-600'
		 }
	 }

	 const filteredReturns = returns.filter(returnItem =>
		 returnItem.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
		 returnItem.refNo.toLowerCase().includes(searchTerm.toLowerCase())
	 )

	 const loadDummyData = () => {
		 setReturns(dummyReturns)
		 setHasReturns(true)
	 }

	 const clearData = () => {
		 setReturns([])
		 setHasReturns(false)
	 }

	 const totalAmount = returns.reduce((sum, r) => sum + parseFloat(r.total.replace(/,/g, '')), 0)
	 const totalBalance = returns.reduce((sum, r) => sum + parseFloat(r.balance.replace(/,/g, '')), 0)

	 return (
		 <div className="min-h-screen bg-gray-50">
			 <div className="bg-white border-b border-gray-200 px-6 py-4">
				 <div className="flex items-center justify-between">
					 <div className="flex items-center space-x-4">
						 <h1 className="text-xl font-semibold text-gray-900">Sale Return/ Credit Note</h1>
					 </div>
					 <Button onClick={handleAddReturn} className="bg-blue-600 hover:bg-blue-700 text-white">
						 <Plus className="h-4 w-4 mr-2" />
						 Add Credit Note
					 </Button>
				 </div>
			 </div>

			 <div className="p-6">
				 {!hasReturns ? (
					 // Empty State
					 <div className="flex flex-col items-center justify-center py-12">
						 <div className="text-center">
							 <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
								 <FileText className="h-12 w-12 text-gray-400" />
							 </div>
							 <h3 className="text-lg font-medium text-gray-900 mb-2">No data is available for Credit Note</h3>
							 <p className="text-gray-500 mb-6">Please try again after making relevant changes.</p>
							 <Button onClick={handleAddReturn} className="bg-blue-600 hover:bg-blue-700 text-white">
								 <Plus className="h-4 w-4 mr-2" />
								 Add Credit Note
							 </Button>
						 </div>
					 </div>
				 ) : (
					 // Data State
					 <div className="space-y-6">
						 {/* Filter Bar */}
						 <div className="flex items-center space-x-4">
							 <h2 className="text-lg font-semibold text-gray-900">This Month</h2>
							 <ChevronDown className="h-4 w-4 text-gray-500" />
							 <div className="flex items-center space-x-2 text-sm text-gray-600">
								 <span>Between</span>
								 <span>01/10/2025</span>
								 <span>To</span>
								 <span>31/10/2025</span>
							 </div>
							 {/* <Select defaultValue="all-firms">
								 <SelectTrigger className="w-32">
									 <SelectValue />
								 </SelectTrigger>
								 <SelectContent>
									 <SelectItem value="all-firms">ALL FIRMS</SelectItem>
									 <SelectItem value="firm-1">Firm 1</SelectItem>
									 <SelectItem value="firm-2">Firm 2</SelectItem>
								 </SelectContent>
							 </Select> */}
							 <Select defaultValue="credit-note">
								 <SelectTrigger className="w-32">
									 <SelectValue />
								 </SelectTrigger>
								 <SelectContent>
									 <SelectItem value="credit-note">Credit Note</SelectItem>
									 <SelectItem value="debit-note">Debit Note</SelectItem>
								 </SelectContent>
							 </Select>
							 <Select defaultValue="all-payment">
								 <SelectTrigger className="w-32">
									 <SelectValue />
								 </SelectTrigger>
								 <SelectContent>
									 <SelectItem value="all-payment">All Payment</SelectItem>
									 <SelectItem value="paid">Paid</SelectItem>
									 <SelectItem value="unpaid">Unpaid</SelectItem>
								 </SelectContent>
							 </Select>
							 <div className="flex-1"></div>
							 <div className="flex items-center space-x-2">
								 <Button variant="outline" size="sm" onClick={loadDummyData}>
									 Load Dummy Data
								 </Button>
								 <Button variant="outline" size="sm" onClick={clearData}>
									 Clear Data
								 </Button>
								 <Button variant="outline" size="sm">
									 <FileSpreadsheet className="h-4 w-4" />
								 </Button>
								 <Button variant="outline" size="sm">
									 <Printer className="h-4 w-4" />
								 </Button>
								 <Button variant="ghost" size="sm">
									 <Search className="h-4 w-4" />
								 </Button>
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
														
													 </div>
												 </th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													 <div className="flex items-center space-x-1">
														 <span>REF NO.</span>
														
													 </div>
												 </th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													 <div className="flex items-center space-x-1">
														 <span>PARTY NAME</span>
														 
													 </div>
												 </th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													 <div className="flex items-center space-x-1">
														 <span>CATEGORY</span>
														
													 </div>
												 </th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													 <div className="flex items-center space-x-1">
														 <span>TYPE</span>
														
													 </div>
												 </th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													 <div className="flex items-center space-x-1">
														 <span>TOTAL</span>
														 
													 </div>
												 </th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													 <div className="flex items-center space-x-1">
														 <span>RECEIVED</span>
														
													 </div>
												 </th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													 <div className="flex items-center space-x-1">
														 <span>BALANCE</span>
													
													 </div>
												 </th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													 <div className="flex items-center space-x-1">
														 <span>STATUS</span>
														
													 </div>
												 </th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													 <div className="flex items-center space-x-1">
														 <span>PRINT/...</span>
														
													 </div>
												 </th>
											 </tr>
										 </thead>
										 <tbody className="bg-white divide-y divide-gray-200">
											 {filteredReturns.map((returnItem, index) => (
												 <tr key={returnItem.id} className="hover:bg-gray-50">
													 <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">{returnItem.date}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">{returnItem.refNo}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">{returnItem.partyName}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">{returnItem.category}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">{returnItem.type}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">₹ {returnItem.total}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">₹ {returnItem.received}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">₹ {returnItem.balance}</td>
													 <td className="px-4 py-3">
														 <span className={`text-sm font-medium ${getStatusColor(returnItem.status)}`}>
															 {returnItem.status}
														 </span>
													 </td>
													 <td className="px-4 py-3">
														 <DropdownMenu>
															 <DropdownMenuTrigger asChild>
																 <Button variant="ghost" size="sm">
																	 <MoreHorizontal className="h-4 w-4" />
																 </Button>
															 </DropdownMenuTrigger>
															 <DropdownMenuContent align="end">
																 <DropdownMenuItem onClick={() => handleView(returnItem.id)}>
																	 <Eye className="h-4 w-4 mr-2" />
																	 View
																 </DropdownMenuItem>
																 <DropdownMenuItem onClick={() => handleEdit(returnItem.id)}>
																	 <Edit className="h-4 w-4 mr-2" />
																	 Edit
																 </DropdownMenuItem>
																 <DropdownMenuItem onClick={() => handleShare(returnItem.id)}>
																	 <Share2 className="h-4 w-4 mr-2" />
																	 Share
																 </DropdownMenuItem>
																 <DropdownMenuItem onClick={() => handleDownload(returnItem.id)}>
																	 <Download className="h-4 w-4 mr-2" />
																	 Download
																 </DropdownMenuItem>
																 <DropdownMenuItem onClick={() => handlePrint(returnItem.id)}>
																	 <Printer className="h-4 w-4 mr-2" />
																	 Print
																 </DropdownMenuItem>
																 <DropdownMenuItem 
																	 onClick={() => handleDelete(returnItem.id)}
																	 className="text-red-600"
																 >
																	 <Trash2 className="h-4 w-4 mr-2" />
																	 Delete
																 </DropdownMenuItem>
															 </DropdownMenuContent>
														 </DropdownMenu>
													 </td>
												 </tr>
											 ))}
										 </tbody>
									 </table>
								 </div>
							 </CardContent>
						 </Card>

						 {/* Summary Bar */}
						 <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-md">
							 <div className="flex items-center space-x-6">
								 <span className="text-sm font-medium text-gray-700">Total Amount: ₹{totalAmount.toFixed(2)}</span>
							 </div>
							 <div className="flex items-center space-x-6">
								 <span className="text-sm font-medium text-gray-700">Balance: ₹{totalBalance.toFixed(2)}</span>
							 </div>
						 </div>
					 </div>
				 )}
			 </div>
		 </div>
	 )
}
