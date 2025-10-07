'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
	 ArrowLeft,
	 Edit,
	 Share2,
	 Download,
	 Printer,
	 FileText,
	 Image,
	 Paperclip,
	 Calendar,
	 User,
	 Phone,
	 MapPin,
	 CheckCircle,
	 RotateCcw
} from 'lucide-react'

interface ReturnItem {
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

export default function SaleReturnDetailPage() {
	 const params = useParams()
	 const router = useRouter()
	 const returnId = params.id

	 const [returnData, setReturnData] = useState({
		 refNo: '',
		 returnDate: '',
		 dueDate: '',
		 customerName: '',
		 phoneNo: '',
		 stateOfSupply: '',
		 returnReason: '',
		 status: 'Open',
		 total: '0',
		 description: '',
		 items: [] as ReturnItem[],
		 hasImage: false,
		 hasDocument: false
	 })

	 // Load return data
	 useEffect(() => {
		 const loadReturnData = () => {
			 // In a real app, you would fetch this data from an API
			 setReturnData({
				 refNo: 'CN-001',
				 returnDate: '2024-01-15',
				 dueDate: '2024-01-30',
				 customerName: 'Minsha',
				 phoneNo: '+1 234 567 8900',
				 stateOfSupply: 'Same State',
				 returnReason: 'Defective Product',
				 status: 'Open',
				 total: '267.80',
				 description: 'Sample return description for demonstration purposes.',
				 items: [
					 { id: 1, item: 'Product A', qty: '2', unit: 'PCS', price: '100.00', discountPercent: '10', discountAmount: '20.00', taxPercent: '18', taxAmount: '28.80', amount: '208.80' },
					 { id: 2, item: 'Product B', qty: '1', unit: 'KG', price: '50.00', discountPercent: '0', discountAmount: '0.00', taxPercent: '18', taxAmount: '9.00', amount: '59.00' }
				 ],
				 hasImage: true,
				 hasDocument: false
			 })
		 }
		 
		 loadReturnData()
	 }, [returnId])

	 const getStatusColor = (status: string) => {
		 switch (status.toLowerCase()) {
			 case 'closed': return 'bg-green-100 text-green-800'
			 case 'open': return 'bg-orange-100 text-orange-800'
			 case 'partial': return 'bg-blue-100 text-blue-800'
			 default: return 'bg-gray-100 text-gray-800'
		 }
	 }

	 const calculateTotals = () => {
		 const totalQty = returnData.items.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0)
		 const totalDiscount = returnData.items.reduce((sum, item) => sum + (parseFloat(item.discountAmount) || 0), 0)
		 const totalTax = returnData.items.reduce((sum, item) => sum + (parseFloat(item.taxAmount) || 0), 0)
		 const totalAmount = returnData.items.reduce((sum, item) => sum + parseFloat(item.amount), 0)

		 return {
			 totalQty: totalQty.toFixed(0),
			 totalDiscount: totalDiscount.toFixed(2),
			 totalTax: totalTax.toFixed(2),
			 totalAmount: totalAmount.toFixed(2)
		 }
	 }

	 const totals = calculateTotals()

	 const handleEdit = () => {
		 router.push(`/sales/sale-return/edit/${returnId}`)
	 }

	 const handleBack = () => {
		 router.push('/sales/sale-return')
	 }

	 const handlePrint = () => {
		 window.print()
	 }

	 const handleDownload = () => {
		 // PDF download logic would go here
		 console.log('Downloading return as PDF...')
	 }

	 const handleShare = () => {
		 // Share logic would go here
		 console.log('Sharing return...')
	 }

	 return (
		 <div className="min-h-screen bg-gray-50">
			 <div className="bg-white border-b border-gray-200 px-4 py-3">
				 <div className="flex items-center justify-between">
					 <div className="flex items-center space-x-4">
						 <Button variant="ghost" size="sm" onClick={handleBack} className="flex items-center space-x-2">
							 <ArrowLeft className="h-4 w-4" />
							 <span>Back</span>
						 </Button>
						 <div>
							 <h1 className="text-lg font-semibold">Sale Return Details</h1>
							 <p className="text-sm text-gray-600">Reference #{returnData.refNo}</p>
						 </div>
					 </div>
					 <div className="flex items-center space-x-2">
						 <Badge className={getStatusColor(returnData.status)}>
							 {returnData.status}
						 </Badge>
						 <Button variant="outline" size="sm" onClick={handleEdit} className="flex items-center space-x-2">
							 <Edit className="h-4 w-4" />
							 <span>Edit</span>
						 </Button>
					 </div>
				 </div>
			 </div>

			 <div className="p-6 space-y-6">
				
				 

				 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					 {/* Return Information */}
					 <div className="lg:col-span-2 space-y-6">
						 <Card>
							 <CardHeader>
								 <CardTitle className="text-lg">Return Information</CardTitle>
							 </CardHeader>
							 <CardContent className="space-y-4">
								 <div className="grid grid-cols-2 gap-4">
									 <div>
										 <p className="text-sm font-medium text-gray-600">Reference Number</p>
										 <p className="text-lg">{returnData.refNo}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">Return Date</p>
										 <p className="text-lg">{returnData.returnDate}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">Due Date</p>
										 <p className="text-lg">{returnData.dueDate}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">State of Supply</p>
										 <p className="text-lg">{returnData.stateOfSupply}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">Return Reason</p>
										 <p className="text-lg">{returnData.returnReason}</p>
									 </div>
								 </div>
							 </CardContent>
						 </Card>

							{/* Customer Information */}
							<Card>
								<CardHeader>
								 <CardTitle className="text-lg">Customer Details</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
								 <div className="grid grid-cols-2 gap-4">
									 <div>
										 <p className="text-sm font-medium text-gray-600">Customer Name</p>
										 <p className="text-lg">{returnData.customerName}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">Phone Number</p>
										 <p className="text-lg">{returnData.phoneNo}</p>
									 </div>
								 </div>
								</CardContent>
							</Card>

							{/* Items Table */}
							<Card>
								<CardHeader>
								 <CardTitle className="text-lg">Return Items</CardTitle>
								</CardHeader>
								<CardContent className="p-0">
								 <div className="overflow-x-auto">
									 <table className="w-full">
										 <thead className="bg-gray-50">
											 <tr>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITEM</th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNIT</th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE</th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DISCOUNT</th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TAX</th>
												 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMOUNT</th>
											 </tr>
										 </thead>
										 <tbody className="bg-white divide-y divide-gray-200">
											 {returnData.items.map((item, index) => (
												 <tr key={item.id}>
													 <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">{item.item}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">{item.qty}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">{item.unit}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">₹{item.price}</td>
													 <td className="px-4 py-3 text-sm text-gray-900">
														 {item.discountPercent}% / ₹{item.discountAmount}
													 </td>
													 <td className="px-4 py-3 text-sm text-gray-900">
														 {item.taxPercent}% / ₹{item.taxAmount}
													 </td>
													 <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{item.amount}</td>
												 </tr>
											 ))}
										 </tbody>
										 <tfoot className="bg-gray-50">
											 <tr>
												 <td className="px-4 py-3 text-sm font-medium text-gray-900">TOTAL</td>
												 <td className="px-4 py-3"></td>
												 <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalQty}</td>
												 <td className="px-4 py-3"></td>
												 <td className="px-4 py-3"></td>
												 <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{totals.totalDiscount}</td>
												 <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{totals.totalTax}</td>
												 <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{totals.totalAmount}</td>
											 </tr>
										 </tfoot>
									 </table>
								 </div>
								</CardContent>
							</Card>

							{/* Description */}
							{returnData.description && (
								<Card>
									<CardHeader>
									 <CardTitle className="text-lg flex items-center space-x-2">
										 <FileText className="h-5 w-5" />
										 <span>Description</span>
									 </CardTitle>
									</CardHeader>
									<CardContent>
									 <p className="text-gray-700">{returnData.description}</p>
									</CardContent>
								</Card>
							)}

							{/* Attachments */}
							{(returnData.hasImage || returnData.hasDocument) && (
								<Card>
									<CardHeader>
									 <CardTitle className="text-lg">Attachments</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
									 {returnData.hasImage && (
										 <div className="flex items-center space-x-2 text-sm text-gray-600">
											 <Image className="h-4 w-4" />
											 <span>Image attached</span>
										 </div>
									 )}
									 {returnData.hasDocument && (
										 <div className="flex items-center space-x-2 text-sm text-gray-600">
											 <Paperclip className="h-4 w-4" />
											 <span>Document attached</span>
										 </div>
									 )}
									</CardContent>
								</Card>
							)}
						</div>

						{/* Action Buttons */}
						<div className="space-y-4">
							<Card>
								<CardHeader>
								 <CardTitle className="text-lg">Actions</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
								 <Button onClick={handleEdit} className="w-full flex items-center justify-center space-x-2">
									 <Edit className="h-4 w-4" />
									 <span>Edit Return</span>
								 </Button>
								 <Button variant="outline" onClick={handleShare} className="w-full flex items-center justify-center space-x-2">
									 <Share2 className="h-4 w-4" />
									 <span>Share</span>
								 </Button>
								 <Button variant="outline" onClick={handleDownload} className="w-full flex items-center justify-center space-x-2">
									 <Download className="h-4 w-4" />
									 <span>Download PDF</span>
								 </Button>
								 <Button variant="outline" onClick={handlePrint} className="w-full flex items-center justify-center space-x-2">
									 <Printer className="h-4 w-4" />
									 <span>Print</span>
								 </Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
	 )
}
