"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface BankAccount {
  id: string
  bankName: string
  accountNumber: string
  accountType: string
  ifscCode: string
  branchName: string
  openingBalance: number
  currentBalance: number
  status: "active" | "inactive"
  notes: string
  createdAt: string
  updatedAt: string
}

export default function BankAccountDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [account, setAccount] = useState<BankAccount | null>(null)

  useEffect(() => {
    // Here you would typically fetch the bank account data based on the ID
    // For now, we'll use dummy data
    const dummyData: BankAccount = {
      id: params.id,
      bankName: "State Bank of India",
      accountNumber: "1234567890",
      accountType: "Savings",
      ifscCode: "SBIN0001234",
      branchName: "Main Branch",
      openingBalance: 100000,
      currentBalance: 150000,
      status: "active",
      notes: "Primary business account for daily operations",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20"
    }
    setAccount(dummyData)
  }, [params.id])

  const handleEdit = () => {
    router.push(`/cash-bank/bank-accounts/edit/${params.id}`)
  }

  const handleBack = () => {
    router.push("/cash-bank/bank-accounts")
  }

  const handleDelete = () => {
    // Here you would typically delete the bank account
    console.log("Deleting bank account:", params.id)
    // For now, just navigate back to the list
    router.push("/cash-bank/bank-accounts")
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bank account details...</p>
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
          <h1 className="text-2xl font-bold">Bank Account Details</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{account.bankName}</CardTitle>
                  <p className="text-gray-600 mt-1">Account Number: {account.accountNumber}</p>
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
                    <h4 className="font-medium text-gray-900 mb-1">Account Type</h4>
                    <p className="text-gray-600">{account.accountType}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">IFSC Code</h4>
                    <p className="text-gray-600 font-mono">{account.ifscCode}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Branch Name</h4>
                    <p className="text-gray-600">{account.branchName}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Status</h4>
                    <Badge variant={account.status === "active" ? "default" : "secondary"}>
                      {account.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Opening Balance</h4>
                    <p className="text-gray-600">₹{account.openingBalance.toLocaleString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Current Balance</h4>
                    <p className="text-gray-600 font-semibold">₹{account.currentBalance.toLocaleString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Created At</h4>
                    <p className="text-gray-600">{new Date(account.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Last Updated</h4>
                    <p className="text-gray-600">{new Date(account.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {account.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{account.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

