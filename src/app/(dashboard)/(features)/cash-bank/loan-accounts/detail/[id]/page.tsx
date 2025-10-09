"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface LoanAccount {
  id: string
  loanNumber: string
  lenderName: string
  loanType: string
  principalAmount: number
  outstandingAmount: number
  interestRate: number
  emiAmount: number
  status: "active" | "closed" | "overdue"
  startDate: string
  endDate: string
  notes: string
  createdAt: string
  updatedAt: string
}

export default function LoanAccountDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loan, setLoan] = useState<LoanAccount | null>(null)

  useEffect(() => {
    // Here you would typically fetch the loan account data based on the ID
    // For now, we'll use dummy data
    const dummyData: LoanAccount = {
      id: params.id,
      loanNumber: "LOAN001",
      lenderName: "State Bank of India",
      loanType: "Business Loan",
      principalAmount: 500000,
      outstandingAmount: 350000,
      interestRate: 12.5,
      emiAmount: 15000,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2026-01-01",
      notes: "Business expansion loan for new equipment",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-20"
    }
    setLoan(dummyData)
  }, [params.id])

  const handleEdit = () => {
    router.push(`/cash-bank/loan-accounts/edit/${params.id}`)
  }

  const handleBack = () => {
    router.push("/cash-bank/loan-accounts")
  }

  const handleDelete = () => {
    // Here you would typically delete the loan account
    console.log("Deleting loan account:", params.id)
    // For now, just navigate back to the list
    router.push("/cash-bank/loan-accounts")
  }

  if (!loan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading loan account details...</p>
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
          <h1 className="text-2xl font-bold">Loan Account Details</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{loan.loanNumber}</CardTitle>
                  <p className="text-gray-600 mt-1">Lender: {loan.lenderName}</p>
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
                    <h4 className="font-medium text-gray-900 mb-1">Loan Type</h4>
                    <p className="text-gray-600">{loan.loanType}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Principal Amount</h4>
                    <p className="text-gray-600 font-semibold">₹{loan.principalAmount.toLocaleString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Outstanding Amount</h4>
                    <p className="text-gray-600 font-semibold">₹{loan.outstandingAmount.toLocaleString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Interest Rate</h4>
                    <p className="text-gray-600">{loan.interestRate}%</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Status</h4>
                    <Badge 
                      variant={
                        loan.status === "active" ? "default" :
                        loan.status === "closed" ? "secondary" : "destructive"
                      }
                    >
                      {loan.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">EMI Amount</h4>
                    <p className="text-gray-600 font-semibold">₹{loan.emiAmount.toLocaleString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Start Date</h4>
                    <p className="text-gray-600">{new Date(loan.startDate).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">End Date</h4>
                    <p className="text-gray-600">{new Date(loan.endDate).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Created At</h4>
                    <p className="text-gray-600">{new Date(loan.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Last Updated</h4>
                    <p className="text-gray-600">{new Date(loan.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {loan.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{loan.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


