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
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/purchase/payment-out')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold text-foreground">Edit Payment-Out</h1>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-foreground">Payment #{id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm md:text-base font-medium text-foreground">Party</Label>
                <Input value={partyName} onChange={(e) => setPartyName(e.target.value)} className="mt-1 text-sm bg-background text-foreground border-border" />
              </div>
              <div>
                <Label className="text-sm md:text-base font-medium text-foreground">Date</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 text-sm bg-background text-foreground border-border" />
              </div>
              <div>
                <Label className="text-sm md:text-base font-medium text-foreground">Amount</Label>
                <Input value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 text-sm bg-background text-foreground border-border" />
              </div>
              <div>
                <Label className="text-sm md:text-base font-medium text-foreground">Reference No.</Label>
                <Input value={reference} onChange={(e) => setReference(e.target.value)} className="mt-1 text-sm bg-background text-foreground border-border" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-xs md:text-sm">
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


