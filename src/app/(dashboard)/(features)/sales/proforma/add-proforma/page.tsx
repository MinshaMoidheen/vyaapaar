'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, X, Plus, Search, FileText, Image as ImageIcon } from 'lucide-react'

interface ProformaItem {
  id: number
  item: string
  qty: string
  unit: string
  price: string
  discount: string
  gst: string
  amount: string
}

export default function AddProformaPage() {
  const router = useRouter()
  const [creditMode, setCreditMode] = useState(true)
  const [customerName, setCustomerName] = useState('')
  const [proformaNumber, setProformaNumber] = useState('PI-004')
  const [proformaDate, setProformaDate] = useState('2025-10-06')
  const [validUntil, setValidUntil] = useState('2025-10-16')
  const [stateOfSupply, setStateOfSupply] = useState('')
  const [roundOff, setRoundOff] = useState(true)
  const [roundOffValue, setRoundOffValue] = useState('0')
  const [total, setTotal] = useState('0')
  const [showDescription, setShowDescription] = useState(false)
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [items, setItems] = useState<ProformaItem[]>([
    { id: 1, item: '', qty: '', unit: 'NONE', price: '', discount: '', gst: 'Select', amount: '' }
  ])

  const addNewRow = () => {
    const newId = Math.max(...items.map(i => i.id)) + 1
    setItems([...items, { id: newId, item: '', qty: '', unit: 'NONE', price: '', discount: '', gst: 'Select', amount: '' }])
  }

  const removeRow = (id: number) => {
    if (items.length > 1) setItems(items.filter(i => i.id !== id))
  }

  const updateItem = (id: number, field: keyof ProformaItem, value: string) => {
    setItems(items.map(i => (i.id === id ? { ...i, [field]: value } : i)))
  }

  const calculateAmount = (row: ProformaItem) => {
    const qty = parseFloat(row.qty) || 0
    const price = parseFloat(row.price) || 0
    const discount = parseFloat(row.discount) || 0
    const gst = parseFloat(row.gst) || 0
    const subtotal = qty * price
    const discountAmount = subtotal * (discount / 100)
    const afterDiscount = subtotal - discountAmount
    const gstAmount = afterDiscount * (gst / 100)
    return (afterDiscount + gstAmount).toFixed(2)
  }

  const totals = {
    totalQty: items.reduce((s, r) => s + (parseFloat(r.qty) || 0), 0).toFixed(0),
    totalAmount: items.reduce((s, r) => s + parseFloat(calculateAmount(r)), 0).toFixed(2)
  }

  const handleSave = () => {
    const proformaData = { 
      customerName, 
      proformaNumber, 
      proformaDate, 
      validUntil, 
      stateOfSupply, 
      items, 
      totals, 
      description, 
      image: selectedImage?.name, 
      roundOff, 
      roundOffValue, 
      total 
    }
    
    // Store data in sessionStorage for invoice success page
    sessionStorage.setItem('proformaData', JSON.stringify(proformaData))
    
    // Navigate to invoice success page
    router.push('/sales/invoice-success')
  }

  const handleCancel = () => router.push('/sales/proforma')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return alert('Please select a valid image file')
    if (file.size > 5 * 1024 * 1024) return alert('Image size should be less than 5MB')
    setSelectedImage(file)
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const removeImage = () => { setSelectedImage(null); setImagePreview(null) }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold">Add Proforma</h1>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-sm md:text-base font-medium text-foreground">Customer/Party Details</h3>
                <div>
                  <Label htmlFor="customerName" className="text-sm font-medium">Search by Name/Phone *</Label>
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
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-sm md:text-base font-medium text-foreground">Proforma Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <Label className="text-sm font-medium">Ref Number</Label>
                    <Input 
                      value={proformaNumber} 
                      onChange={(e) => setProformaNumber(e.target.value)} 
                      placeholder="Enter proforma number" 
                      className="mt-1 text-sm md:text-base" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Date</Label>
                    <Input 
                      type="date" 
                      value={proformaDate} 
                      onChange={(e) => setProformaDate(e.target.value)} 
                      className="mt-1 text-sm md:text-base" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <Label className="text-sm font-medium">Valid Until</Label>
                    <Input 
                      type="date" 
                      value={validUntil} 
                      onChange={(e) => setValidUntil(e.target.value)} 
                      className="mt-1 text-sm md:text-base" 
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">State of supply</Label>
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
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[100px]">UNIT</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[120px]">PRICE/UNIT</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[100px]">DISCOUNT</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[100px]">GST</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[120px]">AMOUNT</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[60px]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((row, index) => (
                    <tr key={row.id} className="hover:bg-muted/30">
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{index + 1}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Input 
                          value={row.item} 
                          onChange={(e) => updateItem(row.id, 'item', e.target.value)} 
                          placeholder="Enter item name" 
                          className="border-0 focus:ring-0 p-0 text-xs md:text-sm" 
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Input 
                          value={row.qty} 
                          onChange={(e) => updateItem(row.id, 'qty', e.target.value)} 
                          placeholder="0" 
                          className="border-0 focus:ring-0 p-0 w-12 md:w-16 text-xs md:text-sm" 
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Select value={row.unit} onValueChange={(v) => updateItem(row.id, 'unit', v)}>
                          <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs md:text-sm">
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
                        <Input 
                          value={row.price} 
                          onChange={(e) => updateItem(row.id, 'price', e.target.value)} 
                          placeholder="0.00" 
                          className="border-0 focus:ring-0 p-0 w-16 md:w-20 text-xs md:text-sm" 
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Input 
                          value={row.discount} 
                          onChange={(e) => updateItem(row.id, 'discount', e.target.value)} 
                          placeholder="0" 
                          className="border-0 focus:ring-0 p-0 w-12 md:w-16 text-xs" 
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Select value={row.gst} onValueChange={(v) => updateItem(row.id, 'gst', v)}>
                          <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs w-12 md:w-16">
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
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <Input 
                          value={calculateAmount(row)} 
                          readOnly 
                          className="border-0 focus:ring-0 p-0 w-16 md:w-20 bg-muted/50 text-xs md:text-sm" 
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        {items.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeRow(row.id)} className="h-6 w-6 md:h-7 md:w-7 p-0">
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
                    <td className="px-2 md:px-4 py-2 md:py-3"></td>
                    <td className="px-2 md:px-4 py-2 md:py-3"></td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-foreground">{totals.totalAmount}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3">
                      <Button onClick={addNewRow} size="sm" className="bg-primary hover:bg-primary/90 text-xs md:text-sm">
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

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-6 lg:space-y-0">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2 text-xs md:text-sm" 
                onClick={() => setShowDescription(!showDescription)}
              >
                <FileText className="h-4 w-4" />
                <span>ADD DESCRIPTION</span>
              </Button>
              {showDescription && (
                <Textarea 
                  value={description} 
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} 
                  placeholder="Enter description..." 
                  className="w-full sm:w-64 text-sm" 
                  rows={3} 
                />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-2 text-xs md:text-sm" 
                  onClick={() => document.getElementById('proforma-image-upload')?.click()}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>ADD IMAGE</span>
                </Button>
                {selectedImage && (
                  <Button variant="ghost" size="sm" onClick={removeImage} className="text-red-600 hover:text-red-700">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <input id="proforma-image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {imagePreview && (
                <div className="relative w-full sm:w-64">
                  <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded border" />
                  <div className="absolute top-1 right-1">
                    <Button variant="destructive" size="sm" onClick={removeImage} className="h-6 w-6 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-0 lg:space-y-4 xl:space-y-0 xl:space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="roundOff" checked={roundOff} onCheckedChange={(c) => setRoundOff(c === true)} />
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
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="w-full sm:w-auto text-xs md:text-sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                className="bg-primary hover:bg-primary/90 flex items-center space-x-2 w-full sm:w-auto text-xs md:text-sm"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save & View Invoice</span>
                <span className="sm:hidden">Save</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


