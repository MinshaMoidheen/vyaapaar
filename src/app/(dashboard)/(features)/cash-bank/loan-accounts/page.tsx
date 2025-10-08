"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, CreditCard, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { AddLoanAccountModal } from "@/components/cash-bank/add-loan-account-modal"

interface LoanAccount {
  id: string
  accountName: string
  accountNumber: string
  currentBalance: number
  loanReceivedIn: string
  interestRate: number
  processingFee: number
  description: string
  balanceAsOf: Date
  termDuration: number
  processingFeePaidFrom: string
  status: "active" | "closed" | "overdue"
  createdAt: string
}

const dummyData: LoanAccount[] = [
  {
    id: "1",
    accountName: "State Bank of India",
    accountNumber: "1234567890",
    currentBalance: 350000,
    loanReceivedIn: "Bank",
    interestRate: 12.5,
    processingFee: 5000,
    description: "Business expansion loan",
    balanceAsOf: new Date("2024-01-01"),
    termDuration: 24,
    processingFeePaidFrom: "Bank",
    status: "active",
    createdAt: "2024-01-01"
  },
  {
    id: "2",
    accountName: "HDFC Bank",
    accountNumber: "9876543210",
    currentBalance: 120000,
    loanReceivedIn: "Cash",
    interestRate: 15.0,
    processingFee: 3000,
    description: "Personal loan for equipment",
    balanceAsOf: new Date("2024-02-01"),
    termDuration: 12,
    processingFeePaidFrom: "Cash",
    status: "active",
    createdAt: "2024-02-01"
  },
  {
    id: "3",
    accountName: "ICICI Bank",
    accountNumber: "5555666677",
    currentBalance: 800000,
    loanReceivedIn: "Cheque",
    interestRate: 9.5,
    processingFee: 10000,
    description: "Home loan for property purchase",
    balanceAsOf: new Date("2023-06-01"),
    termDuration: 120,
    processingFeePaidFrom: "Bank",
    status: "overdue",
    createdAt: "2023-06-01"
  }
]

export default function LoanAccountsPage() {
  const [hasLoans, setHasLoans] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "closed" | "overdue">("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLoan, setEditingLoan] = useState<LoanAccount | null>(null)
  const router = useRouter()

  const filteredData = dummyData.filter(loan => {
    const matchesSearch = loan.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || loan.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalOutstanding = filteredData
    .filter(loan => loan.status === "active")
    .reduce((sum, loan) => sum + loan.currentBalance, 0)

  const handleAddLoan = () => {
    setEditingLoan(null)
    setIsModalOpen(true)
  }

  const handleEdit = (loan: LoanAccount) => {
    setEditingLoan(loan)
    setIsModalOpen(true)
  }

  const handleView = (id: string) => {
    router.push(`/cash-bank/loan-accounts/detail/${id}`)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingLoan(null)
  }

  const handleLoanSave = (data: LoanAccount) => {
    // Here you would typically save the data to your backend
    console.log("Saving loan account:", data)
    // In a real app, you'd update the local state or refetch data
  }

  if (!hasLoans) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Loan Accounts</h1>
            <Button onClick={handleAddLoan}>
              <Plus className="w-4 h-4 mr-2" />
              Add Loan Account
            </Button>
          </div>
          
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Loan Accounts Yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first loan account to track your borrowings.</p>
              <Button onClick={handleAddLoan} size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Loan Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Loan Accounts</h1>
          <Button onClick={handleAddLoan}>
            <Plus className="w-4 h-4 mr-2" />
            Add Loan Account
          </Button>
        </div>

        {/* Summary Card */}
        <div className="mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
                  <p className="text-2xl font-bold text-red-600">₹{totalOutstanding.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search loan accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "closed" | "overdue")}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Accounts ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Account Name</th>
                    <th className="text-left py-3 px-4">Account Number</th>
                    <th className="text-left py-3 px-4">Current Balance</th>
                    <th className="text-left py-3 px-4">Interest Rate</th>
                    <th className="text-left py-3 px-4">Term Duration</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((loan) => (
                    <tr key={loan.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{loan.accountName}</td>
                      <td className="py-3 px-4 text-gray-600">{loan.accountNumber}</td>
                      <td className="py-3 px-4 font-medium">₹{loan.currentBalance.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-600">{loan.interestRate}%</td>
                      <td className="py-3 px-4 text-gray-600">{loan.termDuration} months</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={
                            loan.status === "active" ? "default" :
                            loan.status === "closed" ? "secondary" : "destructive"
                          }
                        >
                          {loan.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEdit(loan)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleView(loan.id)}>
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Toggle for testing */}
        <div className="mt-6">
          <Button 
            variant="outline" 
            onClick={() => setHasLoans(!hasLoans)}
          >
            {hasLoans ? "Show Empty State" : "Show Data"}
          </Button>
        </div>

        {/* Add/Edit Loan Account Modal */}
        <AddLoanAccountModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleLoanSave}
          editingLoan={editingLoan}
        />
      </div>
    </div>
  )
}

