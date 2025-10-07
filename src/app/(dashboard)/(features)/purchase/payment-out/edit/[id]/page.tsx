'use client'

import { useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-react'

export default function EditPaymentOutPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id

  // Prefill with sample values; in real app, load from API by id
  const [partyName, setPartyName] = useState('ABC Suppliers')
  const [date, setDate] = useState('2025-10-07')
  const [amount, setAmount] = useState('12000')
  const [reference, setReference] = useState('TXN123456')

  const handleSave = () => {
    // Save changes then go back to list
    router.push('/purchase/payment-out')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/purchase/payment-out')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Edit Payment-Out</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Payment #{id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Party</Label>
                <Input value={partyName} onChange={(e) => setPartyName(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium">Date</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium">Amount</Label>
                <Input value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm font-medium">Reference No.</Label>
                <Input value={reference} onChange={(e) => setReference(e.target.value)} className="mt-1" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


