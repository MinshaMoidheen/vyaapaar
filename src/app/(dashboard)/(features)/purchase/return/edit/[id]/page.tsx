'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-react'

export default function EditPurchaseReturnPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [party, setParty] = useState('ABC Suppliers')
  const [billNo, setBillNo] = useState('B-101')
  const [billDate, setBillDate] = useState('2025-10-07')
  const [date, setDate] = useState('2025-10-07')
  const [amount, setAmount] = useState('2500')

  const handleSave = () => router.push('/purchase/return')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.push('/purchase/return')}><ArrowLeft className="h-4 w-4" /></Button>
          <h1 className="text-lg font-semibold">Edit Purchase Return</h1>
        </div>
      </div>
      <div className="p-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader><CardTitle>Return #{id}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-sm font-medium">Party</Label><Input value={party} onChange={(e) => setParty(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-sm font-medium">Bill Number</Label><Input value={billNo} onChange={(e) => setBillNo(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-sm font-medium">Bill Date</Label><Input type="date" value={billDate} onChange={(e) => setBillDate(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-sm font-medium">Date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" /></div>
              <div><Label className="text-sm font-medium">Amount</Label><Input value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" /></div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700"><Save className="h-4 w-4 mr-2" />Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


