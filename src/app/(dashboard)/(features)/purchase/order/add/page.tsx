'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Save, X, FileText, Image as ImageIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

interface Row { id: number; item: string; qty: string; unit: string; price: string; discountPercent: string; discountAmount: string; taxPercent: string; taxAmount: string; amount: string }

export default function AddPurchaseOrderPage() {
  const router = useRouter()
  const [party, setParty] = useState('')
  const [orderNo, setOrderNo] = useState('1')
  const [orderDate, setOrderDate] = useState('2025-10-07')
  const [dueDate, setDueDate] = useState('2025-10-10')
  const [stateOfSupply, setStateOfSupply] = useState('Select')
  const [rows, setRows] = useState<Row[]>([{ id: 1, item: '', qty: '', unit: 'NONE', price: '', discountPercent: '', discountAmount: '', taxPercent: 'Select', taxAmount: '', amount: '' }])
  const [showDescription, setShowDescription] = useState(false)
  const [description, setDescription] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [roundOff, setRoundOff] = useState(true)
  const [roundOffValue, setRoundOffValue] = useState('0')

  // Payment types (mirror Expenses Add page)
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

  const handleSave = () => {
    const data = {
      type: 'purchase-order',
      party,
      orderNo,
      orderDate,
      dueDate,
      stateOfSupply,
      items: rows.filter(r => r.item.trim() !== '').map(r => ({
        id: r.id,
        name: r.item,
        qty: parseFloat(r.qty) || 0,
        unit: r.unit,
        price: parseFloat(r.price) || 0,
        discountPercent: parseFloat(r.discountPercent) || 0,
        discountAmount: parseFloat(r.discountAmount) || 0,
        taxPercent: parseFloat(r.taxPercent) || 0,
        taxAmount: parseFloat(r.taxAmount) || 0,
        amount: parseFloat(calcAmount(r)) || 0,
      })),
      totals,
      description,
      roundOff,
      roundOffValue: parseFloat(roundOffValue) || 0,
      paymentTypes,
      totalPayment,
    }
    try {
      sessionStorage.setItem('purchaseOrderData', JSON.stringify(data))
      // also store under generic key for invoice-success compatibility
      sessionStorage.setItem('purchaseData', JSON.stringify(data))
    } catch {}
    window.location.href = '/sales/invoice-success'
  }

  const addRow = () => {
    const newId = Math.max(...rows.map(r => r.id)) + 1
    setRows([...rows, { id: newId, item: '', qty: '', unit: 'NONE', price: '', discountPercent: '', discountAmount: '', taxPercent: 'Select', taxAmount: '', amount: '' }])
  }
  const removeRow = (id: number) => { if (rows.length > 1) setRows(rows.filter(r => r.id !== id)) }
  const updateRow = (id: number, field: keyof Row, value: string) => setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r))
  const calcAmount = (r: Row) => {
    const qty = parseFloat(r.qty) || 0; const price = parseFloat(r.price) || 0; const dAmt = parseFloat(r.discountAmount) || 0; const tAmt = parseFloat(r.taxAmount) || 0
    return ((qty * price) - dAmt + tAmt).toFixed(2)
  }
  const totals = (() => {
    const totalQty = rows.reduce((s, r) => s + (parseFloat(r.qty) || 0), 0)
    const totalDiscount = rows.reduce((s, r) => s + (parseFloat(r.discountAmount) || 0), 0)
    const totalTax = rows.reduce((s, r) => s + (parseFloat(r.taxAmount) || 0), 0)
    const totalAmount = rows.reduce((s, r) => s + parseFloat(calcAmount(r)), 0)
    return { totalQty: totalQty.toFixed(0), totalDiscount: totalDiscount.toFixed(2), totalTax: totalTax.toFixed(2), totalAmount: totalAmount.toFixed(2) }
  })()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader(); reader.onload = (ev) => setImagePreview(ev.target?.result as string); reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-sm font-medium">Party *</Label>
                <Select value={party} onValueChange={setParty}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Search by Name/Phone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__add_party__">+ Add Party</SelectItem>
                    <SelectItem value="ABC Suppliers">ABC Suppliers</SelectItem>
                    <SelectItem value="XYZ Traders">XYZ Traders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Order No</Label>
                    <Input value={orderNo} onChange={(e) => setOrderNo(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Order Date</Label>
                    <Input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Due Date</Label>
                    <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">State of supply</Label>
                    <Select value={stateOfSupply} onValueChange={setStateOfSupply}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="same">Same State</SelectItem>
                        <SelectItem value="different">Different State</SelectItem>
                        <SelectItem value="Select">Select</SelectItem>
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
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITEM</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNIT</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE/UNIT<div className="text-xs text-gray-400 font-normal">Without Tax</div></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DISCOUNT<div className="flex space-x-2"><span className="text-xs text-gray-400 font-normal">%</span><span className="text-xs text-gray-400 font-normal">AMOUNT</span></div></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TAX<div className="flex space-x-2"><span className="text-xs text-gray-400 font-normal">%</span><span className="text-xs text-gray-400 font-normal">AMOUNT</span></div></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMOUNT</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rows.map((r, idx) => (
                    <tr key={r.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{idx + 1}</td>
                      <td className="px-4 py-3"><Input value={r.item} onChange={(e) => updateRow(r.id, 'item', e.target.value)} placeholder="Enter item name" className="border-0 focus:ring-0 p-0" /></td>
                      <td className="px-4 py-3"><Input value={r.qty} onChange={(e) => updateRow(r.id, 'qty', e.target.value)} placeholder="0" className="border-0 focus:ring-0 p-0 w-16" /></td>
                      <td className="px-4 py-3"><Select value={r.unit} onValueChange={(v) => updateRow(r.id, 'unit', v)}><SelectTrigger className="border-0 focus:ring-0 p-0 h-auto"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="NONE">NONE</SelectItem><SelectItem value="PCS">PCS</SelectItem><SelectItem value="KG">KG</SelectItem><SelectItem value="LTR">LTR</SelectItem></SelectContent></Select></td>
                      <td className="px-4 py-3"><div className="flex flex-col space-y-1"><Input value={r.price} onChange={(e) => updateRow(r.id, 'price', e.target.value)} placeholder="0.00" className="border-0 focus:ring-0 p-0 w-20" /><Select><SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="without-tax">Without Tax</SelectItem><SelectItem value="with-tax">With Tax</SelectItem></SelectContent></Select></div></td>
                      <td className="px-4 py-3"><div className="flex space-x-1"><Input value={r.discountPercent} onChange={(e) => updateRow(r.id, 'discountPercent', e.target.value)} placeholder="0" className="border-0 focus:ring-0 p-0 w-12 text-xs" /><Input value={r.discountAmount} onChange={(e) => updateRow(r.id, 'discountAmount', e.target.value)} placeholder="0.00" className="border-0 focus:ring-0 p-0 w-16 text-xs" /></div></td>
                      <td className="px-4 py-3"><div className="flex space-x-1"><Select value={r.taxPercent} onValueChange={(v) => updateRow(r.id, 'taxPercent', v)}><SelectTrigger className="border-0 focus:ring-0 p-0 h-auto text-xs w-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Select">Select</SelectItem><SelectItem value="0">0%</SelectItem><SelectItem value="5">5%</SelectItem><SelectItem value="12">12%</SelectItem><SelectItem value="18">18%</SelectItem><SelectItem value="28">28%</SelectItem></SelectContent></Select><Input value={r.taxAmount} onChange={(e) => updateRow(r.id, 'taxAmount', e.target.value)} placeholder="0.00" className="border-0 focus:ring-0 p-0 w-16 text-xs" /></div></td>
                      <td className="px-4 py-3"><Input value={calcAmount(r)} readOnly className="border-0 focus:ring-0 p-0 w-20 bg-gray-50" /></td>
                      <td className="px-4 py-3">{rows.length > 1 && (<Button variant="ghost" size="sm" onClick={() => removeRow(r.id)} className="h-6 w-6 p-0"><X className="h-3 w-3" /></Button>)}</td>
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
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalDiscount}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalTax}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{totals.totalAmount}</td>
                    <td className="px-4 py-3"><Button onClick={addRow} size="sm" className="bg-blue-600 hover:bg-blue-700">ADD ROW</Button></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

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
              {showDescription && (<Textarea value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} placeholder="Enter description..." className="w-64" rows={3} />)}
            </div>
            <div className="space-y-2">
              <label htmlFor="po-image-upload">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 cursor-pointer" asChild>
                  <span><ImageIcon className="h-4 w-4" /><span>ADD IMAGE</span></span>
                </Button>
              </label>
              <input id="po-image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {imagePreview && (<div className="relative w-64"><img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded border" /></div>)}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="round-off" 
                checked={roundOff} 
                onCheckedChange={(checked) => setRoundOff(checked as boolean)} 
              />
              <Label htmlFor="round-off" className="text-sm">Round Off</Label>
              <Input 
                value={roundOffValue} 
                onChange={(e) => setRoundOffValue(e.target.value)} 
                className="w-16 h-8" 
                disabled={!roundOff}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Total</Label>
              <Input value={totals.totalAmount} readOnly className="w-24 h-8" />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => router.push('/purchase/order')}>Cancel</Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"><Save className="h-4 w-4" /><span>Save & View Invoice</span></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



