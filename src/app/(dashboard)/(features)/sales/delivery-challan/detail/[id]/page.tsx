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
	 Truck,
	 MapPin,
	 CheckCircle,
	 Package
} from 'lucide-react'

interface ChallanItem {
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

export default function DeliveryChallanDetailPage() {
	 const params = useParams()
	 const router = useRouter()
	 const challanId = params.id

	 const [challanData, setChallanData] = useState({
		 challanNo: '',
		 challanDate: '',
		 deliveryDate: '',
		 customerName: '',
		 phoneNo: '',
		 stateOfSupply: '',
		 status: 'Pending',
		 total: '0',
		 description: '',
		 vehicleNo: '',
		 driverName: '',
		 driverPhone: '',
		 specialInstructions: '',
		 items: [] as ChallanItem[],
		 hasImage: false,
		 hasDocument: false
	 })

	 // Load challan data
	 useEffect(() => {
		 const loadChallanData = () => {
			 // In a real app, you would fetch this data from an API
			 setChallanData({
				 challanNo: 'DC-001',
				 challanDate: '2024-01-15',
				 deliveryDate: '2024-01-16',
				 customerName: 'John Doe',
				 phoneNo: '+1 234 567 8900',
				 stateOfSupply: 'Same State',
				 status: 'Delivered',
				 total: '1398.00',
				 description: 'Sample delivery challan description for demonstration purposes.',
				 vehicleNo: 'MH-12-AB-1234',
				 driverName: 'Rajesh Kumar',
				 driverPhone: '+91 98765 43210',
				 specialInstructions: 'Handle with care. Fragile items included.',
				 items: [
					 { id: 1, item: 'Product A', qty: '2', unit: 'PCS', price: '500.00', discountPercent: '10', discountAmount: '100.00', taxPercent: '18', taxAmount: '144.00', amount: '1044.00' },
					 { id: 2, item: 'Product B', qty: '1', unit: 'KG', price: '300.00', discountPercent: '0', discountAmount: '0.00', taxPercent: '18', taxAmount: '54.00', amount: '354.00' }
				 ],
				 hasImage: true,
				 hasDocument: false
			 })
		 }
		 
		 loadChallanData()
	 }, [challanId])

	 const getStatusColor = (status: string) => {
		 switch (status.toLowerCase()) {
			 case 'delivered': return 'bg-green-100 text-green-800'
			 case 'pending': return 'bg-yellow-100 text-yellow-800'
			 case 'cancelled': return 'bg-red-100 text-red-800'
			 default: return 'bg-gray-100 text-gray-800'
		 }
	 }

	 const calculateTotals = () => {
		 const totalQty = challanData.items.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0)
		 const totalDiscount = challanData.items.reduce((sum, item) => sum + (parseFloat(item.discountAmount) || 0), 0)
		 const totalTax = challanData.items.reduce((sum, item) => sum + (parseFloat(item.taxAmount) || 0), 0)
		 const totalAmount = challanData.items.reduce((sum, item) => sum + parseFloat(item.amount), 0)

		 return {
			 totalQty: totalQty.toFixed(0),
			 totalDiscount: totalDiscount.toFixed(2),
			 totalTax: totalTax.toFixed(2),
			 totalAmount: totalAmount.toFixed(2)
		 }
	 }

	 const totals = calculateTotals()

	 const handleEdit = () => {
		 router.push(`/sales/delivery-challan/edit/${challanId}`)
	 }

	 const handleBack = () => {
		 router.push('/sales/delivery-challan')
	 }

	 const handlePrint = () => {
		 window.print()
	 }

	 const handleDownload = () => {
		 // PDF download logic would go here
		 console.log('Downloading delivery challan as PDF...')
	 }

	 const handleShare = () => {
		 // Share logic would go here
		 console.log('Sharing delivery challan...')
	 }

	 return (
		 <div className="min-h-screen bg-gray-50">
			 <div className="border-b border-gray-200 px-4 py-3">
				 <div className="flex items-center justify-between">
					 <div className="flex items-center space-x-4">
						 <Button variant="ghost" size="sm" onClick={handleBack} className="flex items-center space-x-2">
							 <ArrowLeft className="h-4 w-4" />
							 <span>Back</span>
						 </Button>
						 <div>
							 <h1 className="text-lg font-semibold">Delivery Challan Details</h1>
							 <p className="text-sm text-gray-600">Challan #{challanData.challanNo}</p>
						 </div>
					 </div>
					 <div className="flex items-center space-x-2">
						 <Badge className={getStatusColor(challanData.status)}>
							 {challanData.status}
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
					 {/* Challan Information */}
					 <div className="lg:col-span-2 space-y-6">
						 <Card>
							 <CardHeader>
								 <CardTitle className="text-lg">Challan Information</CardTitle>
							 </CardHeader>
							 <CardContent className="space-y-4">
								 <div className="grid grid-cols-2 gap-4">
									 <div>
										 <p className="text-sm font-medium text-gray-600">Challan Number</p>
										 <p className="text-lg">{challanData.challanNo}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">Invoice Date</p>
										 <p className="text-lg">{challanData.challanDate}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">Due Date</p>
										 <p className="text-lg">{challanData.deliveryDate}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">State of Supply</p>
										 <p className="text-lg">{challanData.stateOfSupply}</p>
									 </div>
								 </div>
							 </CardContent>
						 </Card>

							{/* Items Table */}
							<Card>
								<CardHeader>
								 <CardTitle className="text-lg">Delivery Items</CardTitle>
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
										 <tbody className="divide-y divide-gray-200">
											 {challanData.items.map((item, index) => (
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
							{challanData.description && (
								<Card>
									<CardHeader>
									 <CardTitle className="text-lg flex items-center space-x-2">
										 <FileText className="h-5 w-5" />
										 <span>Description</span>
									 </CardTitle>
									</CardHeader>
									<CardContent>
									 <p className="text-gray-700">{challanData.description}</p>
									</CardContent>
								</Card>
							)}

							{/* Attachments */}
							{(challanData.hasImage || challanData.hasDocument) && (
								<Card>
									<CardHeader>
									 <CardTitle className="text-lg">Attachments</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
									 {challanData.hasImage && (
										 <div className="flex items-center space-x-2 text-sm text-gray-600">
											 <Image className="h-4 w-4" />
											 <span>Image attached</span>
										 </div>
									 )}
									 {challanData.hasDocument && (
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
									 <span>Edit Challan</span>
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
