"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, FileText } from "lucide-react"
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
  createdAt: string
}

const dummyData: Cheque[] = [
  {
    id: "1",
    chequeNumber: "CHQ001",
    bankName: "State Bank of India",
    accountNumber: "****1234",
    payeeName: "ABC Company",
    amount: 25000,
    date: "2024-01-15",
    status: "cleared",
    type: "received",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    chequeNumber: "CHQ002",
    bankName: "HDFC Bank",
    accountNumber: "****5678",
    payeeName: "XYZ Suppliers",
    amount: 15000,
    date: "2024-01-16",
    status: "pending",
    type: "issued",
    createdAt: "2024-01-16"
  },
  {
    id: "3",
    chequeNumber: "CHQ003",
    bankName: "ICICI Bank",
    accountNumber: "****9012",
    payeeName: "DEF Services",
    amount: 8000,
    date: "2024-01-17",
    status: "bounced",
    type: "received",
    createdAt: "2024-01-17"
  }
]

export default function ChequesPage() {
  const [hasCheques, setHasCheques] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "cleared" | "bounced" | "cancelled">("all")
  const [filterType, setFilterType] = useState<"all" | "received" | "issued">("all")
  const router = useRouter()

  const filteredData = dummyData.filter(cheque => {
    const matchesSearch = cheque.chequeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cheque.payeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cheque.bankName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || cheque.status === filterStatus
    const matchesType = filterType === "all" || cheque.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })


  const handleEdit = (id: string) => {
    router.push(`/cash-bank/cheques/edit/${id}`)
  }

  const handleView = (id: string) => {
    router.push(`/cash-bank/cheques/detail/${id}`)
  }

  if (!hasCheques) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Cheques</h1>
          </div>
          
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Cheques Yet</h3>
              <p className="text-gray-500 mb-6">No cheques available to display.</p>
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
          <h1 className="text-2xl font-bold">Cheques</h1>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search cheques..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "pending" | "cleared" | "bounced" | "cancelled")}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="cleared">Cleared</option>
            <option value="bounced">Bounced</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as "all" | "received" | "issued")}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="received">Received</option>
            <option value="issued">Issued</option>
          </select>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Cheques ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Cheque Number</th>
                    <th className="text-left py-3 px-4">Payee Name</th>
                    <th className="text-left py-3 px-4">Bank</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((cheque) => (
                    <tr key={cheque.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{cheque.chequeNumber}</td>
                      <td className="py-3 px-4 text-gray-600">{cheque.payeeName}</td>
                      <td className="py-3 px-4 text-gray-600">{cheque.bankName}</td>
                      <td className="py-3 px-4 font-medium">₹{cheque.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-600">{cheque.date}</td>
                      <td className="py-3 px-4">
                        <Badge variant={cheque.type === "received" ? "default" : "secondary"}>
                          {cheque.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={
                            cheque.status === "cleared" ? "default" :
                            cheque.status === "pending" ? "secondary" :
                            cheque.status === "bounced" ? "destructive" : "outline"
                          }
                        >
                          {cheque.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(cheque.id)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(cheque.id)}>
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
            onClick={() => setHasCheques(!hasCheques)}
          >
            {hasCheques ? "Show Empty State" : "Show Data"}
          </Button>
        </div>
      </div>
    </div>
  )
}

