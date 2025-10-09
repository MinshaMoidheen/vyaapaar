'use client'

import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'

export default function PaymentOutDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id

  // In real app, fetch by id. Here we show a simple static layout.
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/purchase/payment-out')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold text-foreground">Payment-Out Details</h1>
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
                <Label className="text-sm md:text-base text-muted-foreground">Party</Label>
                <div className="text-sm md:text-lg text-foreground">ABC Suppliers</div>
              </div>
              <div>
                <Label className="text-sm md:text-base text-muted-foreground">Date</Label>
                <div className="text-sm md:text-lg text-foreground">2025-10-07</div>
              </div>
              <div>
                <Label className="text-sm md:text-base text-muted-foreground">Payment Type</Label>
                <div className="text-sm md:text-lg text-foreground">Bank Transfer</div>
              </div>
              <div>
                <Label className="text-sm md:text-base text-muted-foreground">Amount</Label>
                <div className="text-sm md:text-lg text-foreground">₹ 12,000.00</div>
              </div>
              <div>
                <Label className="text-sm md:text-base text-muted-foreground">Reference No.</Label>
                <div className="text-sm md:text-lg text-foreground">TXN123456</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


