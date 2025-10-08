"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Cheque {
  id: string
  chequeNumber: string
  bankName: string
  accountNumber: string
  payeeName: string
  amount: number
  date: string
  status: "pending" | "cleared" | "bounced" | "cancelled"
  type: "received" | "issued"
  notes: string
  createdAt: string
  updatedAt: string
}

export default function ChequeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [cheque, setCheque] = useState<Cheque | null>(null)

  useEffect(() => {
    // Here you would typically fetch the cheque data based on the ID
    // For now, we'll use dummy data
    const dummyData: Cheque = {
      id: params.id,
      chequeNumber: "CHQ001",
      bankName: "State Bank of India",
      accountNumber: "1234567890",
      payeeName: "ABC Company",
      amount: 25000,
      date: "2024-01-15",
      status: "cleared",
      type: "received",
      notes: "Payment for invoice #INV-001",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20"
    }
    setCheque(dummyData)
  }, [params.id])

  const handleEdit = () => {
    router.push(`/cash-bank/cheques/edit/${params.id}`)
  }

  const handleBack = () => {
    router.push("/cash-bank/cheques")
  }

  const handleDelete = () => {
    // Here you would typically delete the cheque
    console.log("Deleting cheque:", params.id)
    // For now, just navigate back to the list
    router.push("/cash-bank/cheques")
  }

  if (!cheque) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cheque details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Cheque Details</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{cheque.chequeNumber}</CardTitle>
                  <p className="text-gray-600 mt-1">Payee: {cheque.payeeName}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" onClick={handleDelete}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Type</h4>
                    <Badge variant={cheque.type === "received" ? "default" : "secondary"}>
                      {cheque.type}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Bank Name</h4>
                    <p className="text-gray-600">{cheque.bankName}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Account Number</h4>
                    <p className="text-gray-600 font-mono">{cheque.accountNumber}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Status</h4>
                    <Badge 
                      variant={
                        cheque.status === "cleared" ? "default" :
                        cheque.status === "pending" ? "secondary" :
                        cheque.status === "bounced" ? "destructive" : "outline"
                      }
                    >
                      {cheque.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Amount</h4>
                    <p className="text-2xl font-bold text-gray-900">₹{cheque.amount.toLocaleString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Date</h4>
                    <p className="text-gray-600">{new Date(cheque.date).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Created At</h4>
                    <p className="text-gray-600">{new Date(cheque.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Last Updated</h4>
                    <p className="text-gray-600">{new Date(cheque.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {cheque.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{cheque.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

