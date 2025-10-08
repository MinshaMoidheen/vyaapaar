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
	 CreditCard,
	 CheckCircle
} from 'lucide-react'

interface OrderItem {
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

interface PaymentType {
	 id: string
	 type: string
	 amount: string
	 referenceNo: string
}

export default function SaleOrderDetailPage() {
	 const params = useParams()
	 const router = useRouter()
	 const orderId = params.id

	 const [orderData, setOrderData] = useState({
		 orderNo: '',
		 orderDate: '',
		 dueDate: '',
		 customerName: '',
		 phoneNo: '',
		 stateOfSupply: '',
		 status: 'Pending',
		 total: '0',
		 description: '',
		 items: [] as OrderItem[],
		 paymentTypes: [] as PaymentType[],
		 hasImage: false,
		 hasDocument: false
	 })

	 // Load order data
	 useEffect(() => {
		 const loadOrderData = () => {
			 // In a real app, you would fetch this data from an API
			 setOrderData({
				 orderNo: 'SO-001',
				 orderDate: '2024-01-15',
				 dueDate: '2024-01-30',
				 customerName: 'John Doe',
				 phoneNo: '+1 234 567 8900',
				 stateOfSupply: 'Same State',
				 status: 'Pending',
				 total: '1398.00',
				 description: 'Sample order description for demonstration purposes.',
				 items: [
					 { id: 1, item: 'Product A', qty: '2', unit: 'PCS', price: '500.00', discountPercent: '10', discountAmount: '100.00', taxPercent: '18', taxAmount: '144.00', amount: '1044.00' },
					 { id: 2, item: 'Product B', qty: '1', unit: 'KG', price: '300.00', discountPercent: '0', discountAmount: '0.00', taxPercent: '18', taxAmount: '54.00', amount: '354.00' }
				 ],
				 paymentTypes: [
					 { id: 'p1', type: 'Cash', amount: '1000.00', referenceNo: '' },
					 { id: 'p2', type: 'Bank Transfer', amount: '398.00', referenceNo: 'TXN123456' }
				 ],
				 hasImage: true,
				 hasDocument: false
			 })
		 }
		 
		 loadOrderData()
	 }, [orderId])

	 const getStatusColor = (status: string) => {
		 switch (status.toLowerCase()) {
			 case 'completed': return 'bg-green-100 text-green-800'
			 case 'pending': return 'bg-yellow-100 text-yellow-800'
			 case 'cancelled': return 'bg-red-100 text-red-800'
			 default: return 'bg-gray-100 text-gray-800'
		 }
	 }

	 const calculateTotals = () => {
		 const totalQty = orderData.items.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0)
		 const totalDiscount = orderData.items.reduce((sum, item) => sum + (parseFloat(item.discountAmount) || 0), 0)
		 const totalTax = orderData.items.reduce((sum, item) => sum + (parseFloat(item.taxAmount) || 0), 0)
		 const totalAmount = orderData.items.reduce((sum, item) => sum + parseFloat(item.amount), 0)
		 const totalPayment = orderData.paymentTypes.reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0)

		 return {
			 totalQty: totalQty.toFixed(0),
			 totalDiscount: totalDiscount.toFixed(2),
			 totalTax: totalTax.toFixed(2),
			 totalAmount: totalAmount.toFixed(2),
			 totalPayment: totalPayment.toFixed(2)
		 }
	 }

	 const totals = calculateTotals()

	 const handleEdit = () => {
		 router.push(`/sales/order/edit/${orderId}`)
	 }

	 const handleBack = () => {
		 router.push('/sales/order')
	 }

	 const handlePrint = () => {
		 window.print()
	 }

	 const handleDownload = () => {
		 // PDF download logic would go here
		 console.log('Downloading order as PDF...')
	 }

	 const handleShare = () => {
		 // Share logic would go here
		 console.log('Sharing order...')
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
							 <h1 className="text-lg font-semibold">Sale Order Details</h1>
							 <p className="text-sm text-gray-600">Order #{orderData.orderNo}</p>
						 </div>
					 </div>
					 <div className="flex items-center space-x-2">
						 <Badge className={getStatusColor(orderData.status)}>
							 {orderData.status}
						 </Badge>
						 <Button variant="outline" size="sm" onClick={handleEdit} className="flex items-center space-x-2">
							 <Edit className="h-4 w-4" />
							 <span>Edit</span>
						 </Button>
					 </div>
				 </div>
			 </div>

			 <div className="p-6 space-y-6">
				 {/* Summary Cards */}
				 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					 <Card>
						 <CardContent className="p-4">
							 <div className="flex items-center space-x-2">
								 <Calendar className="h-5 w-5 text-blue-600" />
								 <div>
									 <p className="text-sm font-medium text-gray-600">Order Date</p>
									 <p className="text-lg font-semibold">{orderData.orderDate}</p>
								 </div>
							 </div>
						 </CardContent>
					 </Card>
					 <Card>
						 <CardContent className="p-4">
							 <div className="flex items-center space-x-2">
								 <User className="h-5 w-5 text-green-600" />
								 <div>
									 <p className="text-sm font-medium text-gray-600">Customer</p>
									 <p className="text-lg font-semibold">{orderData.customerName}</p>
								 </div>
							 </div>
						 </CardContent>
					 </Card>
					 <Card>
						 <CardContent className="p-4">
							 <div className="flex items-center space-x-2">
								 <CreditCard className="h-5 w-5 text-purple-600" />
								 <div>
									 <p className="text-sm font-medium text-gray-600">Total Amount</p>
									 <p className="text-lg font-semibold">₹{orderData.total}</p>
								 </div>
							 </div>
						 </CardContent>
					 </Card>
					 <Card>
						 <CardContent className="p-4">
							 <div className="flex items-center space-x-2">
								 <CheckCircle className="h-5 w-5 text-orange-600" />
								 <div>
									 <p className="text-sm font-medium text-gray-600">Items</p>
									 <p className="text-lg font-semibold">{orderData.items.length}</p>
								 </div>
							 </div>
						 </CardContent>
					 </Card>
				 </div>

				 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					 {/* Order Information */}
					 <div className="lg:col-span-2 space-y-6">
						 <Card>
							 <CardHeader>
								 <CardTitle className="text-lg">Order Information</CardTitle>
							 </CardHeader>
							 <CardContent className="space-y-4">
								 <div className="grid grid-cols-2 gap-4">
									 <div>
										 <p className="text-sm font-medium text-gray-600">Order Number</p>
										 <p className="text-lg">{orderData.orderNo}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">Order Date</p>
										 <p className="text-lg">{orderData.orderDate}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">Due Date</p>
										 <p className="text-lg">{orderData.dueDate}</p>
									 </div>
									 <div>
										 <p className="text-sm font-medium text-gray-600">State of Supply</p>
										 <p className="text-lg">{orderData.stateOfSupply}</p>
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
											<p className="text-lg">{orderData.customerName}</p>
										</div>
										<div>
											<p className="text-sm font-medium text-gray-600">Phone Number</p>
											<p className="text-lg">{orderData.phoneNo}</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Items Table */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Order Items</CardTitle>
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
												{orderData.items.map((item, index) => (
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

							{/* Payment Information */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Payment Details</CardTitle>
								</CardHeader>
								<CardContent className="p-0">
									<div className="overflow-x-auto">
										<table className="w-full">
											<thead className="bg-gray-50">
												<tr>
													<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
													<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
													<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference No.</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200">
												{orderData.paymentTypes.map((payment) => (
													<tr key={payment.id}>
														<td className="px-4 py-3 text-sm text-gray-900">{payment.type}</td>
														<td className="px-4 py-3 text-sm text-gray-900">₹{payment.amount}</td>
														<td className="px-4 py-3 text-sm text-gray-900">{payment.referenceNo || '-'}</td>
													</tr>
												))}
											</tbody>
											<tfoot className="bg-gray-50">
												<tr>
													<td className="px-4 py-3 text-sm font-medium text-gray-900">TOTAL PAYMENT</td>
													<td className="px-4 py-3 text-sm font-medium text-gray-900">₹{totals.totalPayment}</td>
													<td className="px-4 py-3"></td>
												</tr>
											</tfoot>
										</table>
									</div>
								</CardContent>
							</Card>

							{/* Description */}
							{orderData.description && (
								<Card>
									<CardHeader>
										<CardTitle className="text-lg flex items-center space-x-2">
											<FileText className="h-5 w-5" />
											<span>Description</span>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-gray-700">{orderData.description}</p>
									</CardContent>
								</Card>
							)}

							{/* Attachments */}
							{(orderData.hasImage || orderData.hasDocument) && (
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Attachments</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										{orderData.hasImage && (
											<div className="flex items-center space-x-2 text-sm text-gray-600">
												<Image className="h-4 w-4" />
												<span>Image attached</span>
											</div>
										)}
										{orderData.hasDocument && (
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
										<span>Edit Order</span>
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
