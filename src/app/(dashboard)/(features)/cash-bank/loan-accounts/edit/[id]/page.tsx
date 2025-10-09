"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EditLoanAccountPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    loanNumber: "",
    lenderName: "",
    loanType: "",
    principalAmount: "",
    interestRate: "",
    emiAmount: "",
    startDate: "",
    endDate: "",
    status: "active",
    notes: ""
  })

  useEffect(() => {
    // Here you would typically fetch the loan account data based on the ID
    // For now, we'll use dummy data
    const dummyData = {
      loanNumber: "LOAN001",
      lenderName: "State Bank of India",
      loanType: "business",
      principalAmount: "500000",
      interestRate: "12.5",
      emiAmount: "15000",
      startDate: "2024-01-01",
      endDate: "2026-01-01",
      status: "active",
      notes: "Business expansion loan"
    }
    setFormData(dummyData)
  }, [params.id])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Here you would typically update the data in your backend
    console.log("Updating loan account:", formData)
    // For now, just navigate back to the list
    router.push("/cash-bank/loan-accounts")
  }

  const handleBack = () => {
    router.push("/cash-bank/loan-accounts")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Edit Loan Account</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Loan Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="loanNumber">Loan Number *</Label>
                  <Input
                    id="loanNumber"
                    value={formData.loanNumber}
                    onChange={(e) => handleInputChange("loanNumber", e.target.value)}
                    placeholder="Enter loan number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lenderName">Lender Name *</Label>
                  <Input
                    id="lenderName"
                    value={formData.lenderName}
                    onChange={(e) => handleInputChange("lenderName", e.target.value)}
                    placeholder="Enter lender name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanType">Loan Type *</Label>
                  <Select value={formData.loanType} onValueChange={(value) => handleInputChange("loanType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business Loan</SelectItem>
                      <SelectItem value="equipment">Equipment Loan</SelectItem>
                      <SelectItem value="personal">Personal Loan</SelectItem>
                      <SelectItem value="home">Home Loan</SelectItem>
                      <SelectItem value="vehicle">Vehicle Loan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="principalAmount">Principal Amount *</Label>
                  <Input
                    id="principalAmount"
                    type="number"
                    value={formData.principalAmount}
                    onChange={(e) => handleInputChange("principalAmount", e.target.value)}
                    placeholder="Enter principal amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%) *</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={formData.interestRate}
                    onChange={(e) => handleInputChange("interestRate", e.target.value)}
                    placeholder="Enter interest rate"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emiAmount">EMI Amount *</Label>
                  <Input
                    id="emiAmount"
                    type="number"
                    value={formData.emiAmount}
                    onChange={(e) => handleInputChange("emiAmount", e.target.value)}
                    placeholder="Enter EMI amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Enter any additional notes"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button variant="outline" onClick={handleBack}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Update Loan Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


