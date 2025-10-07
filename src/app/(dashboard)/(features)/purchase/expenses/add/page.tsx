'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Save, X, FileText, Image as ImageIcon, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ExpenseItem {
  id: number
  item: string
  qty: string
  price: string
  discountPercent: string
  discountAmount: string
  taxPercent: string
  taxAmount: string
  amount: string
}

export default function AddExpensePage() {
  const router = useRouter()
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState<string[]>(['Petrol', 'Rent', 'Salary', 'Tea', 'Transport'])
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryType, setNewCategoryType] = useState<'Indirect Expense' | 'Direct Expense'>('Indirect Expense')
  const [expenseNo, setExpenseNo] = useState('1')
  const [billDate, setBillDate] = useState('2025-10-07')
  const [stateOfSupply, setStateOfSupply] = useState('Select')
  const [roundOff, setRoundOff] = useState(true)
  const [roundOffValue, setRoundOffValue] = useState('0')
  const [total, setTotal] = useState('0')
  const [showDescription, setShowDescription] = useState(false)
  const [description, setDescription] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null)
  const [partyName, setPartyName] = useState('')
  const [parties] = useState<string[]>(['Minsha', 'New'])

  const [items, setItems] = useState<ExpenseItem[]>([
    { id: 1, item: '', qty: '', price: '', discountPercent: '', discountAmount: '', taxPercent: 'Select', taxAmount: '', amount: '' }
  ])

  // GST toggle (like Add Sale page style)
  const [gstEnabled, setGstEnabled] = useState(false)
  const showGST = gstEnabled

  // Payment types (like Sale Order)
  type PaymentTypeRow = { id: string; type: string; amount: string; referenceNo: string }
  const [paymentTypes, setPaymentTypes] = useState<PaymentTypeRow[]>([
    { id: 'p1', type: 'Select Type', amount: '0', referenceNo: '' }
  ])
  const updatePaymentType = (id: string, field: keyof PaymentTypeRow, value: string) => {
    setPaymentTypes(prev => prev.map(p => (p.id === id ? { ...p, [field]: value } : p)))
  }
  const addPaymentType = () => {
    setPaymentTypes(prev => [...prev, { id: `p${Date.now()}`, type: 'Select Type', amount: '0', referenceNo: '' }])
  }
  const removePaymentType = (id: string) => {
    setPaymentTypes(prev => (prev.length > 1 ? prev.filter(p => p.id !== id) : prev))
  }
  const totalPayment = paymentTypes.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)

  const addNewRow = () => {
    const newId = Math.max(...items.map(i => i.id)) + 1
    setItems([...items, { id: newId, item: '', qty: '', price: '', discountPercent: '', discountAmount: '', taxPercent: 'Select', taxAmount: '', amount: '' }])
  }

  const removeRow = (id: number) => {
    if (items.length > 1) setItems(items.filter(i => i.id !== id))
  }

  const updateItem = (id: number, field: keyof ExpenseItem, value: string) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  const calculateAmount = (i: ExpenseItem) => {
    const qty = parseFloat(i.qty) || 0
    const price = parseFloat(i.price) || 0
    const discountAmount = parseFloat(i.discountAmount) || 0
    const taxAmount = parseFloat(i.taxAmount) || 0
    return ((qty * price) - discountAmount + taxAmount).toFixed(2)
  }

  const totals = (() => {
    const totalQty = items.reduce((s, i) => s + (parseFloat(i.qty) || 0), 0)
    const totalDiscount = items.reduce((s, i) => s + (parseFloat(i.discountAmount) || 0), 0)
    const totalTax = items.reduce((s, i) => s + (parseFloat(i.taxAmount) || 0), 0)
    const totalAmount = items.reduce((s, i) => s + parseFloat(calculateAmount(i)), 0)
    return { totalQty: totalQty.toFixed(0), totalDiscount: totalDiscount.toFixed(2), totalTax: totalTax.toFixed(2), totalAmount: totalAmount.toFixed(2) }
  })()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setSelectedDocument(file)
  }

  const removeDocument = () => setSelectedDocument(null)

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Page Header with GST Toggle (styled like Add Sale) */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Expense</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm">GST</span>
              <button
                onClick={() => setGstEnabled(!gstEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  gstEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    gstEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Party / Header inputs - visible only when GST is ON */}
        
        {/* Header-like details */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Expense Details</h3>
                <div>

                  {showGST && (
          <div>
            <Label className="text-sm font-medium">Party *</Label>
                    <Select
                      value={partyName}
                      onValueChange={(val) => {
                        if (val === '__add_party__') { router.push('/parties/add'); return }
                        setPartyName(val)
                      }}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Party" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__add_party__">+ Add Party</SelectItem>
                        {parties.map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
          </div>
        )}

        <br/>
                  <Label className="text-sm font-medium">Expense Category *</Label>
                  <Select 
                    value={category}
                    onValueChange={(val) => {
                      if (val === '__add_category__') { setIsAddCategoryOpen(true); return }
                      setCategory(val)
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__add_category__">+ Add Expense Category</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Expense No</Label>
                    <Input value={expenseNo} onChange={(e) => setExpenseNo(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Date</Label>
                    <Input type="date" value={billDate} onChange={(e) => setBillDate(e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">State of supply</Label>
                  <Select value={stateOfSupply} onValueChange={setStateOfSupply}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same">Same State</SelectItem>
                      <SelectItem value="different">Different State</SelectItem>
                      <SelectItem value="Select">Select</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITEM</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE/UNIT
                      <div className="text-xs text-gray-400 font-normal">Without Tax</div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DISCOUNT
                      <div className="flex space-x-2"><span className="text-xs text-gray-400 font-normal">%</span><span className="text-xs text-gray-400 font-normal">AMOUNT</span></div>
                    </th>
                    {showGST && (
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TAX
                        <div className="flex space-x-2"><span className="text-xs text-gray-400 font-normal">%</span><span className="text-xs text-gray-400 font-normal">AMOUNT</span></div>
                      </th>
                    )}
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMOUNT</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((it, idx) => (
                    <tr key={it.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{idx + 1}</td>
                      <td className="px-4 py-3"><Input value={it.item} onChange={(e) => updateItem(it.id, 'item', e.target.value)} placeholder="Enter item name" className="border-0 focus:ring-0 p-0" /></td>
                      <td className="px-4 py-3"><Input value={it.qty} onChange={(e) => updateItem(it.id, 'qty', e.target.value)} placeholder="0" className="border-0 focus:ring-0 p-0 w-16" /></td>
                      <td className="px-4 py-3"><Input value={it.price} onChange={(e) => updateItem(it.id, 'price', e.target.value)} placeholder="0.00" className="border-0 focus:ring-0 p-0 w-20" /></td>
                      <td className="px-4 py-3"><div className="flex space-x-1"><Input value={it.discountPercent} onChange={(e) => updateItem(it.id, 'discountPercent', e.target.value)} placeholder="0" className="border-0 focus:ring-0 p-0 w-12 text-xs" /><Input value={it.discountAmount} onChange={(e) => updateItem(it.id, 'discountAmount', e.target.value)} placeholder="0.00" className="border-0 focus:ring-0 p-0 w-16 text-xs" /></div></td>
                      {showGST && (
                        <td className="px-4 py-3"><div className="flex space-x-1"><Select value={it.taxPercent} onValueChange={(v) => updateItem(it.id, 'taxPercent', v)}><SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs w-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Select">Select</SelectItem><SelectItem value="0">0%</SelectItem><SelectItem value="5">5%</SelectItem><SelectItem value="12">12%</SelectItem><SelectItem value="18">18%</SelectItem><SelectItem value="28">28%</SelectItem></SelectContent></Select><Input value={it.taxAmount} onChange={(e) => updateItem(it.id, 'taxAmount', e.target.value)} placeholder="0.00" className="border-0 focus:ring-0 p-0 w-16 text-xs" /></div></td>
                      )}
                      <td className="px-4 py-3"><Input value={calculateAmount(it)} readOnly className="border-0 focus:ring-0 p-0 w-20 bg-gray-50" /></td>
                      <td className="px-4 py-3">{items.length > 1 && (<Button variant="ghost" size="sm" onClick={() => removeRow(it.id)} className="h-6 w-6 p-0"><X className="h-3 w-3" /></Button>)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">TOTAL</td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalQty}</td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalDiscount}</td>
                    {showGST && (
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalTax}</td>
                    )}
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalAmount}</td>
                    <td className="px-4 py-3"><Button onClick={addNewRow} size="sm" className="bg-blue-600 hover:bg-blue-700">ADD ROW</Button></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Bottom section: options + summary */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-3">
            {/* Payment Types */}
            <div className="space-y-4">
              {paymentTypes.map((payment, index) => (
                <div key={payment.id} className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Select value={payment.type} onValueChange={(value) => updatePaymentType(payment.id, 'type', value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="Select Type">Select Type</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={payment.amount}
                      onChange={(e) => updatePaymentType(payment.id, 'amount', e.target.value)}
                      placeholder="Amount"
                      className="flex-1"
                    />
                    {paymentTypes.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePaymentType(payment.id)}
                        className="h-8 w-8 p-0 text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {index > 0 && (
                    <div className="flex items-center space-x-3">
                      <Input
                        value={payment.referenceNo}
                        onChange={(e) => updatePaymentType(payment.id, 'referenceNo', e.target.value)}
                        placeholder="Reference No."
                        className="w-32"
                      />
                      <div className="flex-1"></div>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" onClick={addPaymentType} className="px-0 text-blue-600">+ Add Payment type</Button>
                <div className="text-sm font-medium">Total payment: {totalPayment}</div>
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={() => setShowDescription(!showDescription)}>
                <FileText className="h-4 w-4" />
                <span>ADD DESCRIPTION</span>
              </Button>
              {showDescription && (
                <Textarea value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} placeholder="Enter description..." className="w-64" rows={3} />
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="exp-image-upload">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 cursor-pointer" asChild>
                  <span><ImageIcon className="h-4 w-4" /><span>ADD IMAGE</span></span>
                </Button>
              </label>
              <input id="exp-image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {imagePreview && (
                <div className="relative w-64">
                  <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded border" />
                </div>
              )}
            </div>

            {/* Document Upload */}
            <div className="space-y-2">
              <label htmlFor="exp-doc-upload">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 cursor-pointer" asChild>
                  <span><FileText className="h-4 w-4" /><span>ADD DOCUMENT</span></span>
                </Button>
              </label>
              <input id="exp-doc-upload" type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleDocumentUpload} className="hidden" />
              {selectedDocument && (
                <div className="flex items-center space-x-2 w-64">
                  <span className="text-sm text-gray-600 truncate">{selectedDocument.name}</span>
                  <Button variant="destructive" size="sm" className="h-6 w-6 p-0" onClick={removeDocument}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Label className="text-sm">Round Off</Label>
              <Input value={roundOffValue} onChange={(e) => setRoundOffValue(e.target.value)} className="w-16 h-8" />
            </div>
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Total</Label>
              <Input value={total} onChange={(e) => setTotal(e.target.value)} className="w-24 h-8" />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Add Expense Category Modal */}
    <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Expense Category</Label>
            <Input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Enter category name" className="mt-1" />
          </div>
          <div>
            <Label className="text-sm font-medium">Expense Type</Label>
            <Select value={newCategoryType} onValueChange={(v) => setNewCategoryType(v as any)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Indirect Expense">Indirect Expense</SelectItem>
                <SelectItem value="Direct Expense">Direct Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              if (!newCategoryName.trim()) return
              // Add to list and select it
              setCategories((prev) => Array.from(new Set([newCategoryName.trim(), ...prev])))
              setCategory(newCategoryName.trim())
              setNewCategoryName('')
              setNewCategoryType('Indirect Expense')
              setIsAddCategoryOpen(false)
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}


