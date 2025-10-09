'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
	 X,
	 Search,
	 FileText,
	 Image,
	 Paperclip,
	 Share2,
	 Save,
	 ArrowLeft,
	 Truck
} from 'lucide-react'

interface ChallanItemRow {
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

export default function AddDeliveryChallanPage() {
	 const router = useRouter()
	 const [customerName, setCustomerName] = useState('')
	 const [phoneNo, setPhoneNo] = useState('')
	 const [challanNo, setChallanNo] = useState('')
	 const [challanDate, setChallanDate] = useState<string>(new Date().toISOString().slice(0,10))
	 const [deliveryDate, setDeliveryDate] = useState<string>(new Date().toISOString().slice(0,10))
	 const [stateOfSupply, setStateOfSupply] = useState('')
	 const [vehicleNo, setVehicleNo] = useState('')
	 const [driverName, setDriverName] = useState('')
	 const [driverPhone, setDriverPhone] = useState('')
	 const [roundOff, setRoundOff] = useState(true)
	 const [roundOffValue, setRoundOffValue] = useState('0')
	 const [total, setTotal] = useState('0')

	 const [showDescription, setShowDescription] = useState(false)
	 const [description, setDescription] = useState('')
	 const [showImageInput, setShowImageInput] = useState(false)
	 const [showDocumentInput, setShowDocumentInput] = useState(false)
	 const [selectedImage, setSelectedImage] = useState<File | null>(null)
	 const [selectedDocument, setSelectedDocument] = useState<File | null>(null)
	 const [imagePreview, setImagePreview] = useState<string | null>(null)

	 const [items, setItems] = useState<ChallanItemRow[]>([
		 { id: 1, item: '', qty: '', unit: 'NONE', price: '', discountPercent: '', discountAmount: '', taxPercent: 'Select', taxAmount: '', amount: '' }
	 ])

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

	 const updateItem = (id: number, field: keyof ChallanItemRow, value: string) => {
		 setItems(items.map(item => 
			 item.id === id ? { ...item, [field]: value } : item
		 ))
	 }

	 const calculateAmount = (item: ChallanItemRow) => {
		 const qty = parseFloat(item.qty) || 0
		 const price = parseFloat(item.price) || 0
		 const discountAmount = parseFloat(item.discountAmount) || 0
		 const taxAmount = parseFloat(item.taxAmount) || 0

		 const amount = (qty * price) - discountAmount + taxAmount
		 return amount.toFixed(2)
	 }

	 const calculateTotals = () => {
		 const totalQty = items.reduce((sum, item) => sum + (parseFloat(item.qty) || 0), 0)
		 const totalDiscount = items.reduce((sum, item) => sum + (parseFloat(item.discountAmount) || 0), 0)
		 const totalTax = items.reduce((sum, item) => sum + (parseFloat(item.taxAmount) || 0), 0)
		 const totalAmount = items.reduce((sum, item) => sum + parseFloat(calculateAmount(item)), 0)

		 return {
			 totalQty: totalQty.toFixed(0),
			 totalDiscount: totalDiscount.toFixed(2),
			 totalTax: totalTax.toFixed(2),
			 totalAmount: totalAmount.toFixed(2)
		 }
	 }

	 const totals = calculateTotals()

	 const handleAddDescription = () => {
		 setShowDescription(!showDescription)
	 }

	 const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		 const file = event.target.files?.[0]
		 if (file) {
			 setSelectedImage(file)
			 const reader = new FileReader()
			 reader.onload = (e) => {
				 setImagePreview(e.target?.result as string)
			 }
			 reader.readAsDataURL(file)
		 }
	 }

	 const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		 const file = event.target.files?.[0]
		 if (file) {
			 setSelectedDocument(file)
		 }
	 }

	 const removeImage = () => {
		 setSelectedImage(null)
		 setImagePreview(null)
	 }

	 const removeDocument = () => {
		 setSelectedDocument(null)
	 }

	 const handleSave = () => {
		 // Prepare challan data for invoice success page
		 const challanData = {
			 challanNo,
			 challanDate,
			 deliveryDate,
			 customerName,
			 phoneNo,
			 stateOfSupply,
			 vehicleNo,
			 driverName,
			 driverPhone,
			 roundOff,
			 roundOffValue,
			 total,
			 items,
			 description,
			 selectedImage,
			 selectedDocument
		 }
		 
		 // Store data in sessionStorage for invoice success page
		 sessionStorage.setItem('challanData', JSON.stringify(challanData))
		 
		 // Navigate to invoice success page
		 router.push('/sales/invoice-success')
	 }

	 const handleBack = () => {
		 router.push('/sales/delivery-challan')
	 }

	 return (
		 <div className="min-h-screen bg-background text-foreground">
			 <div className="border-b border-border px-4 py-3">
			 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
				 <div className="flex items-center space-x-2 md:space-x-4">
					 <Button variant="ghost" size="sm" onClick={handleBack} className="flex items-center space-x-2">
						 <ArrowLeft className="h-4 w-4" />
						 <span className="text-xs md:text-sm">Back</span>
					 </Button>
					 <span className="text-sm md:text-base font-medium">Delivery Challan</span>
				 </div>
				 <div className="flex items-center space-x-2 md:space-x-4">
					 <Truck className="h-5 w-5 text-primary" />
				 </div>
			 </div>
			 </div>

		 <div className="p-4 md:p-6 space-y-4 md:space-y-6">
			 <Card>
				 <CardContent className="p-4 md:p-6">
					 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
						 <div className="space-y-4">
							 <h3 className="text-sm md:text-base font-medium text-foreground">Customer/Party Details</h3>
							 <div>
								 <Label htmlFor="customerName" className="text-sm md:text-base font-medium">
									 Search by Name/Phone *
								 </Label>
								 <div className="relative mt-1">
									 <Input
										 id="customerName"
										 value={customerName}
										 onChange={(e) => setCustomerName(e.target.value)}
										 placeholder="Search by name or phone"
										 className="pr-8 text-sm md:text-base"
									 />
									 <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
								 </div>
							 </div>
							 <div>
								 <Label htmlFor="phoneNo" className="text-sm md:text-base font-medium">Phone No.</Label>
								 <Input
									 id="phoneNo"
									 value={phoneNo}
									 onChange={(e) => setPhoneNo(e.target.value)}
									 placeholder="Enter phone number"
									 className="mt-1 text-sm md:text-base"
								 />
						 </div>
					 </div>

					 <div className="space-y-4">
							 <h3 className="text-sm md:text-base font-medium text-foreground">Challan Details</h3>
							 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
								 <div>
									 <Label className="text-sm md:text-base font-medium">Challan No.</Label>
									 <Input
										 value={challanNo}
										 onChange={(e) => setChallanNo(e.target.value)}
										 placeholder="Enter challan number"
										 className="mt-1 text-sm md:text-base"
									 />
								 </div>
								 <div>
									 <Label className="text-sm md:text-base font-medium">Challan Date</Label>
									 <Input
										 type="date"
										 value={challanDate}
										 onChange={(e) => setChallanDate(e.target.value)}
										 className="mt-1 text-sm md:text-base"
									 />
								 </div>
								 <div>
									 <Label className="text-sm md:text-base font-medium">Delivery Date</Label>
									 <Input
										 type="date"
										 value={deliveryDate}
										 onChange={(e) => setDeliveryDate(e.target.value)}
										 className="mt-1 text-sm md:text-base"
									 />
								 </div>
							 </div>
							 <div>
								 <Label className="text-sm md:text-base font-medium">State of supply</Label>
								 <Select value={stateOfSupply} onValueChange={setStateOfSupply}>
									 <SelectTrigger className="mt-1 text-sm md:text-base">
										 <SelectValue placeholder="Select" />
									 </SelectTrigger>
									 <SelectContent>
										 <SelectItem value="same">Same State</SelectItem>
										 <SelectItem value="different">Different State</SelectItem>
									 </SelectContent>
								 </Select>
							 </div>
						 </div>
							 </div>
				 </CardContent>
			 </Card>

			 <Card>
				 <CardContent className="p-4 md:p-6">
					 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
						 <div className="space-y-4">
							 <h3 className="text-sm md:text-base font-medium text-foreground">Vehicle Details</h3>
							 <div>
								 <Label className="text-sm md:text-base font-medium">Vehicle Number</Label>
								 <Input
									 value={vehicleNo}
									 onChange={(e) => setVehicleNo(e.target.value)}
									 placeholder="Enter vehicle number"
									 className="mt-1 text-sm md:text-base"
								 />
							 </div>
							 <div>
								 <Label className="text-sm md:text-base font-medium">Driver Name</Label>
								 <Input
									 value={driverName}
									 onChange={(e) => setDriverName(e.target.value)}
									 placeholder="Enter driver name"
									 className="mt-1 text-sm md:text-base"
								 />
							 </div>
							 <div>
								 <Label className="text-sm md:text-base font-medium">Driver Phone</Label>
								 <Input
									 value={driverPhone}
									 onChange={(e) => setDriverPhone(e.target.value)}
									 placeholder="Enter driver phone"
									 className="mt-1 text-sm md:text-base"
								 />
							 </div>
						 </div>
						 <div className="space-y-4">
							 <h3 className="text-sm md:text-base font-medium text-foreground">Delivery Instructions</h3>
							 <div>
								 <Label className="text-sm md:text-base font-medium">Special Instructions</Label>
								 <Textarea
									 placeholder="Enter any special delivery instructions..."
									 className="mt-1 text-sm md:text-base"
									 rows={4}
								 />
							 </div>
						 </div>
					 </div>
				 </CardContent>
			 </Card>

			 <Card>
				 <CardContent className="p-0">
					 <div className="overflow-x-auto">
						 <table className="w-full min-w-[800px]">
							 <thead className="bg-muted/50">
								 <tr>
									 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[40px]">#</th>
									 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[200px]">ITEM</th>
									 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[80px]">QTY</th>
									 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[80px]">UNIT</th>
									 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[120px]">
										 PRICE/UNIT
										 <div className="text-xs text-muted-foreground/70 font-normal">Without Tax</div>
									 </th>
									 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[140px]">
										 DISCOUNT
										 <div className="flex space-x-2">
											 <span className="text-xs text-muted-foreground/70 font-normal">%</span>
											 <span className="text-xs text-muted-foreground/70 font-normal">AMOUNT</span>
										 </div>
									 </th>
									 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[140px]">
										 TAX
										 <div className="flex space-x-2">
											 <span className="text-xs text-muted-foreground/70 font-normal">%</span>
											 <span className="text-xs text-muted-foreground/70 font-normal">AMOUNT</span>
										 </div>
									 </th>
									 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[100px]">AMOUNT</th>
									 <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[60px]"></th>
								 </tr>
							 </thead>
							 <tbody className="divide-y divide-border">
								 {items.map((item, index) => (
									 <tr key={item.id} className="hover:bg-muted/30">
										 <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{index + 1}</td>
										 <td className="px-2 md:px-4 py-2 md:py-3">
											 <Input
												 value={item.item}
												 onChange={(e) => updateItem(item.id, 'item', e.target.value)}
												 placeholder="Enter item name"
												 className="border-0 focus:ring-0 p-0 text-xs md:text-sm"
											 />
										 </td>
										 <td className="px-2 md:px-4 py-2 md:py-3">
											 <Input
												 value={item.qty}
												 onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
												 placeholder="0"
												 className="border-0 focus:ring-0 p-0 w-12 md:w-16 text-xs md:text-sm"
											 />
										 </td>
										 <td className="px-2 md:px-4 py-2 md:py-3">
											 <Select value={item.unit} onValueChange={(value) => updateItem(item.id, 'unit', value)}>
												 <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs">
													 <SelectValue />
												 </SelectTrigger>
												 <SelectContent>
													 <SelectItem value="NONE">NONE</SelectItem>
													 <SelectItem value="PCS">PCS</SelectItem>
													 <SelectItem value="KG">KG</SelectItem>
													 <SelectItem value="LTR">LTR</SelectItem>
												 </SelectContent>
											 </Select>
										 </td>
										 <td className="px-2 md:px-4 py-2 md:py-3">
											 <div className="flex flex-col space-y-1">
												 <Input
													 value={item.price}
													 onChange={(e) => updateItem(item.id, 'price', e.target.value)}
													 placeholder="0.00"
													 className="border-0 focus:ring-0 p-0 w-16 md:w-20 text-xs md:text-sm"
												 />
											 <Select>
												 <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs">
													 <SelectValue placeholder="Select" />
												 </SelectTrigger>
												 <SelectContent>
													 <SelectItem value="without-tax">Without Tax</SelectItem>
													 <SelectItem value="with-tax">With Tax</SelectItem>
												 </SelectContent>
											 </Select>
										 </div>
									 </td>
									 <td className="px-2 md:px-4 py-2 md:py-3">
										 <div className="flex space-x-1">
											 <Input
												 value={item.discountPercent}
												 onChange={(e) => updateItem(item.id, 'discountPercent', e.target.value)}
												 placeholder="0"
												 className="border-0 focus:ring-0 p-0 w-10 md:w-12 text-xs"
											 />
											 <Input
												 value={item.discountAmount}
												 onChange={(e) => updateItem(item.id, 'discountAmount', e.target.value)}
												 placeholder="0.00"
												 className="border-0 focus:ring-0 p-0 w-12 md:w-16 text-xs"
											 />
										 </div>
									 </td>
									 <td className="px-2 md:px-4 py-2 md:py-3">
										 <div className="flex space-x-1">
											 <Select value={item.taxPercent} onValueChange={(value) => updateItem(item.id, 'taxPercent', value)}>
												 <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs w-10 md:w-12">
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
											 <Input
												 value={item.taxAmount}
												 onChange={(e) => updateItem(item.id, 'taxAmount', e.target.value)}
												 placeholder="0.00"
												 className="border-0 focus:ring-0 p-0 w-12 md:w-16 text-xs"
											 />
									 </div>
								 </td>
								 <td className="px-2 md:px-4 py-2 md:py-3">
									 <Input
										 value={calculateAmount(item)}
										 readOnly
										 className="border-0 focus:ring-0 p-0 w-16 md:w-20 bg-muted/50 text-xs md:text-sm"
									 />
								 </td>
								 <td className="px-2 md:px-4 py-2 md:py-3">
									 {items.length > 1 && (
										 <Button
											 variant="ghost"
											 size="sm"
											 onClick={() => removeRow(item.id)}
											 className="h-6 w-6 md:h-7 md:w-7 p-0"
										 >
											 <X className="h-3 w-3 md:h-4 md:w-4" />
										 </Button>
									 )}
								 </td>
							 </tr>
							 ))}
						 </tbody>
						 <tfoot className="bg-muted/50">
							 <tr>
								 <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-foreground">TOTAL</td>
								 <td className="px-2 md:px-4 py-2 md:py-3"></td>
								 <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-foreground">{totals.totalQty}</td>
								 <td className="px-2 md:px-4 py-2 md:py-3"></td>
								 <td className="px-2 md:px-4 py-2 md:py-3"></td>
								 <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-foreground">{totals.totalDiscount}</td>
								 <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-foreground">{totals.totalTax}</td>
								 <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-foreground">{totals.totalAmount}</td>
								 <td className="px-2 md:px-4 py-2 md:py-3">
									 <Button
										 onClick={addNewRow}
										 size="sm"
										 className="bg-primary hover:bg-primary/90 text-xs md:text-sm"
									 >
										 <span className="hidden sm:inline">ADD ROW</span>
										 <span className="sm:hidden">ADD</span>
									 </Button>
								 </td>
							 </tr>
						 </tfoot>
					 </table>
				 </div>
			 </CardContent>
		 </Card>
		  </div>

		 <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-6 lg:space-y-0">
			 {/* Left Column - Additional Options */}
			 <div className="space-y-4">
				 <div className="space-y-2">
					 <Button 
						 variant="outline" 
						 size="sm" 
						 className="flex items-center space-x-2 text-xs md:text-sm"
						 onClick={handleAddDescription}
					 >
						 <FileText className="h-4 w-4" />
						 <span>ADD DESCRIPTION</span>
					 </Button>
					 {showDescription && (
						 <Textarea
							 value={description}
							 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
							 placeholder="Enter description..."
							 className="w-full text-sm"
							 rows={3}
						 />
					 )}
				 </div>

				 <div className="space-y-2">
					 <Button 
						 variant="outline" 
						 size="sm" 
						 className="flex items-center space-x-2 text-xs md:text-sm"
						 onClick={() => setShowImageInput(!showImageInput)}
					 >
						 <Image className="h-4 w-4" />
						 <span>ADD IMAGE</span>
					 </Button>
					 {showImageInput && (
						 <div className="w-full">
							 <Input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
							 {imagePreview && (
								 <div className="relative mt-2">
									 <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded border" />
									 <Button variant="destructive" size="sm" className="absolute top-1 right-1 h-6 w-6 p-0" onClick={removeImage}>
										 <X className="h-3 w-3" />
									 </Button>
								 </div>
							 )}
						 </div>
					 )}
				 </div>

				 <div className="space-y-2">
					 <Button 
						 variant="outline" 
						 size="sm" 
						 className="flex items-center space-x-2 text-xs md:text-sm"
						 onClick={() => setShowDocumentInput(!showDocumentInput)}
					 >
						 <Paperclip className="h-4 w-4" />
						 <span>ADD DOCUMENT</span>
					 </Button>
					 {showDocumentInput && (
						 <div className="w-full">
							 <Input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleDocumentUpload} className="text-sm" />
							 {selectedDocument && (
								 <div className="flex items-center space-x-2 mt-2">
									 <span className="text-xs md:text-sm text-muted-foreground truncate">{selectedDocument.name}</span>
									 <Button variant="destructive" size="sm" className="h-6 w-6 p-0" onClick={removeDocument}>
										 <X className="h-3 w-3" />
									 </Button>
								 </div>
							 )}
						 </div>
					 )}
				 </div>
			 </div>

			 {/* Right Column - Summary and Actions */}
			 <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-0 lg:space-y-4 xl:space-y-0 xl:space-x-6">
				 <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
					 <div className="flex items-center space-x-2">
						 <Checkbox
							 id="roundOff"
							 checked={roundOff}
							 onCheckedChange={(checked) => setRoundOff(checked === true)}
						 />
						 <Label htmlFor="roundOff" className="text-xs md:text-sm">Round Off</Label>
						 <Input
							 value={roundOffValue}
							 onChange={(e) => setRoundOffValue(e.target.value)}
							 className="w-16 h-8 text-xs"
						 />
					 </div>
					 <div className="flex items-center space-x-2">
						 <Label className="text-xs md:text-sm font-medium">Total</Label>
						 <Input
							 value={total}
							 onChange={(e) => setTotal(e.target.value)}
							 className="w-20 sm:w-24 h-8 text-xs"
						 />
					 </div>
				 </div>
				 <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
					 <Button variant="outline" className="flex items-center space-x-2 text-xs md:text-sm w-full sm:w-auto">
						 <Share2 className="h-4 w-4" />
						 <span>Share</span>
					 </Button>
					 <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 flex items-center space-x-2 text-xs md:text-sm w-full sm:w-auto">
						 <Save className="h-4 w-4" />
						 <span className="hidden sm:inline">Save & View Invoice</span>
						 <span className="sm:hidden">Save</span>
					 </Button>
				 </div>
			 </div>
		 </div>
	 </div>
	 
	 
	 )
}
