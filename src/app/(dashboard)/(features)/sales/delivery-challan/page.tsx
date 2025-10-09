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
	 Filter,
	 ArrowUpDown
} from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DeliveryChallan {
	 id: string
	 challanNo: string
	 date: string
	 customerName: string
	 phone: string
	 items: number
	 totalAmount: string
	 status: 'Pending' | 'Delivered' | 'Cancelled'
	 vehicleNo?: string
	 driverName?: string
}

export default function DeliveryChallanPage() {
	 const router = useRouter()
	 const [searchTerm, setSearchTerm] = useState('')
	 const [hasChallans, setHasChallans] = useState(true)

	 // Dummy data for demonstration
	 const dummyChallans: DeliveryChallan[] = [
		 {
			 id: '1',
			 challanNo: 'DC-001',
			 date: '07/10/2025',
			 customerName: 'Minsha',
			 phone: '+1 234 567 8900',
			 items: 3,
			 totalAmount: '290.00',
			 status: 'Delivered',
			 vehicleNo: 'MH-12-AB-1234',
			 driverName: 'Rajesh Kumar'
		 },
		 {
			 id: '2',
			 challanNo: 'DC-002',
			 date: '06/10/2025',
			 customerName: 'John Smith',
			 phone: '+1 234 567 8901',
			 items: 2,
			 totalAmount: '1,800.00',
			 status: 'Pending',
			 vehicleNo: 'MH-12-CD-5678',
			 driverName: 'Amit Singh'
		 },
		 {
			 id: '3',
			 challanNo: 'DC-003',
			 date: '05/10/2025',
			 customerName: 'Mike Johnson',
			 phone: '+1 234 567 8902',
			 items: 5,
			 totalAmount: '4,200.00',
			 status: 'Delivered',
			 vehicleNo: 'MH-12-EF-9012',
			 driverName: 'Vikram Patel'
		 }
	 ]

	 const [challans, setChallans] = useState<DeliveryChallan[]>([])

	 const handleAddChallan = () => {
		 router.push('/sales/delivery-challan/add')
	 }

	 const handleView = (id: string) => {
		 router.push(`/sales/delivery-challan/detail/${id}`)
	 }

	 const handleEdit = (id: string) => {
		 router.push(`/sales/delivery-challan/edit/${id}`)
	 }

	 const handleDelete = (id: string) => {
		 setChallans(prev => prev.filter(challan => challan.id !== id))
	 }

	 const handleShare = (id: string) => {
		 console.log('Sharing challan:', id)
	 }

	 const handleDownload = (id: string) => {
		 console.log('Downloading challan:', id)
	 }

	 const handlePrint = (id: string) => {
		 console.log('Printing challan:', id)
	 }

	 const getStatusColor = (status: string) => {
		 switch (status) {
			 case 'Delivered': return 'text-green-600'
			 case 'Pending': return 'text-orange-600'
			 case 'Cancelled': return 'text-red-600'
			 default: return 'text-gray-600'
		 }
	 }

	 const filteredChallans = challans.filter(challan =>
		 challan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
		 challan.challanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
		 challan.phone.includes(searchTerm)
	 )

	 const loadDummyData = () => {
		 setChallans(dummyChallans)
		 setHasChallans(true)
	 }

	 const clearData = () => {
		 setChallans([])
		 setHasChallans(false)
	 }

	 const totalAmount = challans.reduce((sum, c) => sum + parseFloat(c.totalAmount.replace(/,/g, '')), 0)
	 const deliveredAmount = challans.filter(c => c.status === 'Delivered').reduce((sum, c) => sum + parseFloat(c.totalAmount.replace(/,/g, '')), 0)
	 const pendingAmount = challans.filter(c => c.status === 'Pending').reduce((sum, c) => sum + parseFloat(c.totalAmount.replace(/,/g, '')), 0)

	 return (
		 <div className="min-h-screen">
			 <div className="border-b border-gray-200 px-6 py-4">
				 <div className="flex items-center justify-between">
					 <div className="flex items-center space-x-4">
						 <h1 className="text-xl font-semibold text-gray-900">Delivery Challan</h1>
						
					 </div>
					 <Button onClick={handleAddChallan} className="text-white">
						 <Plus className="h-4 w-4 mr-2" />
						 Add Delivery Challan
					 </Button>
				 </div>
			 </div>

			 <div className="p-6">
				 {!hasChallans ? (
					 // Empty State
					 <div className="flex flex-col items-center justify-center py-12">
						 <div className="text-center">
							 <div className="mx-auto h-24 w-24 rounded-full flex items-center justify-center mb-4">
								 <Printer className="h-12 w-12 text-gray-400" />
							 </div>
							 <h3 className="text-lg font-medium text-gray-900 mb-2">No Delivery Challans</h3>
							 <p className="text-gray-500 mb-6">Get started by creating your first delivery challan.</p>
							 <Button onClick={handleAddChallan} className="bg-red-600 hover:bg-red-700 text-white">
								 <Plus className="h-4 w-4 mr-2" />
								 Create Delivery Challan
							 </Button>
						 </div>
					 </div>
				 ) : (
					 // Data State
					 <div className="space-y-6">
						 {/* Filter Bar */}
						 <div className="flex items-center space-x-4">
							 <span className="text-sm font-medium text-gray-700">Filter by:</span>
							 <Select defaultValue="this-month">
								 <SelectTrigger className="w-32">
									 <SelectValue />
								 </SelectTrigger>
								 <SelectContent>
									 <SelectItem value="this-month">This Month</SelectItem>
									 <SelectItem value="last-month">Last Month</SelectItem>
									 <SelectItem value="this-year">This Year</SelectItem>
									 <SelectItem value="custom">Custom</SelectItem>
								 </SelectContent>
							 </Select>
							 <div className="flex items-center space-x-2 text-sm text-gray-600">
								 <span>01/10/2025</span>
								 <span>To</span>
								 <span>31/10/2025</span>
							 </div>
							 <Select defaultValue="all-firms">
								 <SelectTrigger className="w-32">
									 <SelectValue />
								 </SelectTrigger>
								 <SelectContent>
									 <SelectItem value="all-firms">All Firms</SelectItem>
									 <SelectItem value="firm-1">Firm 1</SelectItem>
									 <SelectItem value="firm-2">Firm 2</SelectItem>
								 </SelectContent>
							 </Select>
						 </div>

						 {/* Summary Card */}
						 <Card >
							 <CardContent className="p-6">
								 <div className="flex items-center justify-between">
									 <div>
										 <h3 className="text-lg font-semibold text-gray-900">Total Challans</h3>
										 <p className="text-3xl font-bold text-gray-900">₹ {totalAmount.toFixed(2)}</p>
										 <div className="flex items-center space-x-4 mt-2 text-sm">
											 <span className="text-green-600">100% ↑ vs last month</span>
										 </div>
										 <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600">
											 <span>Delivered: ₹ {deliveredAmount.toFixed(2)}</span>
											 <span>Pending: ₹ {pendingAmount.toFixed(2)}</span>
										 </div>
									 </div>
								 </div>
							 </CardContent>
						 </Card>

						 {/* Transactions Section */}
						 <div className="space-y-4">
							 <div className="flex items-center justify-between">
								 <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
								 <div className="flex items-center space-x-2">
									 <Button variant="outline" size="sm" onClick={loadDummyData}>
										 Load Dummy Data
									 </Button>
									 <Button variant="outline" size="sm" onClick={clearData}>
										 Clear Data
									 </Button>
									 <Button variant="ghost" size="sm">
										 <Search className="h-4 w-4" />
									 </Button>
								 </div>
							 </div>

							 <Card>
								 <CardContent className="p-0">
									 <div className="overflow-x-auto">
										 <table className="w-full">
											 <thead>
												 <tr>
													 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														 <div className="flex items-center space-x-1">
															 <span>Date</span>
															 <ArrowUpDown className="h-3 w-3" />
														 </div>
													 </th>
													 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														 <div className="flex items-center space-x-1">
															 <span>Reference no</span>
															 <ArrowUpDown className="h-3 w-3" />
														 </div>
													 </th>
													 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														 <div className="flex items-center space-x-1">
															 <span>Party Name</span>
															 <ArrowUpDown className="h-3 w-3" />
														 </div>
													 </th>
													 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														 <div className="flex items-center space-x-1">
															 <span>Amount</span>
															 <ArrowUpDown className="h-3 w-3" />
														 </div>
													 </th>
													 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														 <div className="flex items-center space-x-1">
															 <span>Balance</span>
															 <ArrowUpDown className="h-3 w-3" />
														 </div>
													 </th>
													 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														 <div className="flex items-center space-x-1">
															 <span>Status</span>
															 <ArrowUpDown className="h-3 w-3" />
														 </div>
													 </th>
													 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
												 </tr>
											 </thead>
											 <tbody className="divide-y divide-gray-200">
												 {filteredChallans.map((challan) => (
													 <tr key={challan.id}>
														 <td className="px-4 py-3 text-sm text-gray-900">{challan.date}</td>
														 <td className="px-4 py-3 text-sm text-gray-900">{challan.challanNo}</td>
														 <td className="px-4 py-3 text-sm text-gray-900">{challan.customerName}</td>
														 <td className="px-4 py-3 text-sm text-gray-900">₹ {challan.totalAmount}</td>
														 <td className="px-4 py-3 text-sm text-gray-900">₹ {challan.totalAmount}</td>
														 <td className="px-4 py-3">
															 <span className={`text-sm font-medium ${getStatusColor(challan.status)}`}>
																 {challan.status}
															 </span>
														 </td>
														 <td className="px-4 py-3">
															 <div className="flex items-center space-x-2">
																 <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
																	 Convert
																	 <ChevronDown className="h-3 w-3 ml-1" />
																 </Button>
																 <DropdownMenu>
																	 <DropdownMenuTrigger asChild>
																		 <Button variant="ghost" size="sm">
																			 <MoreHorizontal className="h-4 w-4" />
																		 </Button>
																	 </DropdownMenuTrigger>
																	 <DropdownMenuContent align="end">
																		 <DropdownMenuItem onClick={() => handleView(challan.id)}>
																			 <Eye className="h-4 w-4 mr-2" />
																			 View
																		 </DropdownMenuItem>
																		 <DropdownMenuItem onClick={() => handleEdit(challan.id)}>
																			 <Edit className="h-4 w-4 mr-2" />
																			 Edit
																		 </DropdownMenuItem>
																		 <DropdownMenuItem onClick={() => handleShare(challan.id)}>
																			 <Share2 className="h-4 w-4 mr-2" />
																			 Share
																		 </DropdownMenuItem>
																		 <DropdownMenuItem onClick={() => handleDownload(challan.id)}>
																			 <Download className="h-4 w-4 mr-2" />
																			 Download
																		 </DropdownMenuItem>
																		 <DropdownMenuItem onClick={() => handlePrint(challan.id)}>
																			 <Printer className="h-4 w-4 mr-2" />
																			 Print
																		 </DropdownMenuItem>
																		 <DropdownMenuItem 
																			 onClick={() => handleDelete(challan.id)}
																			 className="text-red-600"
																		 >
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
					 </div>
				 )}
			 </div>
		 </div>
	 )
}
