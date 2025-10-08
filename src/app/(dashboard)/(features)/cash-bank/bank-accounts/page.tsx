"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface BankAccount {
  id: string
  bankName: string
  accountNumber: string
  accountType: string
  balance: number
  status: "active" | "inactive"
  createdAt: string
}

const dummyData: BankAccount[] = [
  {
    id: "1",
    bankName: "State Bank of India",
    accountNumber: "****1234",
    accountType: "Savings",
    balance: 150000,
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    bankName: "HDFC Bank",
    accountNumber: "****5678",
    accountType: "Current",
    balance: 250000,
    status: "active",
    createdAt: "2024-01-20"
  },
  {
    id: "3",
    bankName: "ICICI Bank",
    accountNumber: "****9012",
    accountType: "Savings",
    balance: 75000,
    status: "inactive",
    createdAt: "2024-02-01"
  }
]

export default function BankAccountsPage() {
  const [hasAccounts, setHasAccounts] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all")
  const router = useRouter()

  const filteredData = dummyData.filter(account => {
    const matchesSearch = account.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.accountNumber.includes(searchTerm)
    const matchesStatus = filterStatus === "all" || account.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleAddAccount = () => {
    router.push("/cash-bank/bank-accounts/add")
  }

  const handleEdit = (id: string) => {
    router.push(`/cash-bank/bank-accounts/edit/${id}`)
  }

  const handleView = (id: string) => {
    router.push(`/cash-bank/bank-accounts/detail/${id}`)
  }

  if (!hasAccounts) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Bank Accounts</h1>
            <Button onClick={handleAddAccount}>
              <Plus className="w-4 h-4 mr-2" />
              Add Bank Account
            </Button>
          </div>
          
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bank Accounts Yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first bank account to manage your finances.</p>
              <Button onClick={handleAddAccount} size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Bank Account
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
          <h1 className="text-2xl font-bold">Bank Accounts</h1>
          <Button onClick={handleAddAccount}>
            <Plus className="w-4 h-4 mr-2" />
            Add Bank Account
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search bank accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Accounts ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Bank Name</th>
                    <th className="text-left py-3 px-4">Account Number</th>
                    <th className="text-left py-3 px-4">Account Type</th>
                    <th className="text-left py-3 px-4">Balance</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Created</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((account) => (
                    <tr key={account.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{account.bankName}</td>
                      <td className="py-3 px-4 text-gray-600">{account.accountNumber}</td>
                      <td className="py-3 px-4 text-gray-600">{account.accountType}</td>
                      <td className="py-3 px-4 font-medium">₹{account.balance.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Badge variant={account.status === "active" ? "default" : "secondary"}>
                          {account.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{account.createdAt}</td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(account.id)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(account.id)}>
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
            onClick={() => setHasAccounts(!hasAccounts)}
          >
            {hasAccounts ? "Show Empty State" : "Show Data"}
          </Button>
        </div>
      </div>
    </div>
  )
}

