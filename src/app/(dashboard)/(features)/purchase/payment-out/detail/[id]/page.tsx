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
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/purchase/payment-out')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Payment-Out Details</h1>
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
                <Label className="text-sm text-gray-600">Party</Label>
                <div className="text-gray-900">ABC Suppliers</div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Date</Label>
                <div className="text-gray-900">2025-10-07</div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Payment Type</Label>
                <div className="text-gray-900">Bank Transfer</div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Amount</Label>
                <div className="text-gray-900">₹ 12,000.00</div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Reference No.</Label>
                <div className="text-gray-900">TXN123456</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


