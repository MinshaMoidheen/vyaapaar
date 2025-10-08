"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Banknote, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { AdjustCashModal } from "@/components/cash-bank/adjust-cash-modal"

interface CashEntry {
  id: string
  date: string
  description: string
  type: "income" | "expense"
  amount: number
  category: string
  status: "active" | "inactive"
  createdAt: string
}

const dummyData: CashEntry[] = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Cash received from customer",
    type: "income",
    amount: 5000,
    category: "Sales",
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    date: "2024-01-16",
    description: "Office supplies purchase",
    type: "expense",
    amount: 1200,
    category: "Office Expenses",
    status: "active",
    createdAt: "2024-01-16"
  },
  {
    id: "3",
    date: "2024-01-17",
    description: "Petty cash for travel",
    type: "expense",
    amount: 800,
    category: "Travel",
    status: "active",
    createdAt: "2024-01-17"
  }
]

export default function CashInHandPage() {
  const [hasEntries, setHasEntries] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<CashEntry | null>(null)
  const router = useRouter()

  const filteredData = dummyData.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || entry.type === filterType
    return matchesSearch && matchesType
  })

  const totalIncome = filteredData
    .filter(entry => entry.type === "income")
    .reduce((sum, entry) => sum + entry.amount, 0)

  const totalExpense = filteredData
    .filter(entry => entry.type === "expense")
    .reduce((sum, entry) => sum + entry.amount, 0)

  const netBalance = totalIncome - totalExpense

  const handleAddEntry = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingEntry(null)
  }

  const handleCashAdjustment = (data: any) => {
    // Here you would typically save the data to your backend
    console.log("Saving cash adjustment:", data)
    // For now, just close the modal
    // In a real app, you'd update the local state or refetch data
    setEditingEntry(null)
  }

  const handleEdit = (entry: CashEntry) => {
    setEditingEntry(entry)
    setIsModalOpen(true)
  }


  if (!hasEntries) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Cash In Hand </h1>
            <Button onClick={handleAddEntry}>
              <Plus className="w-4 h-4 mr-2" />
              Add Cash Entry
            </Button>
          </div>
          
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Banknote className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Cash Entries Yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first cash entry to track your cash flow.</p>
              <Button onClick={handleAddEntry} size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Cash Entry
              </Button>
            </div>
          </div>

          {/* Adjust Cash Modal */}
          <AdjustCashModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSave={handleCashAdjustment}
            currentCash={0}
            editingEntry={editingEntry}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Cash In Hand - ₹{totalIncome.toLocaleString()}</h1>
          <Button onClick={handleAddEntry}>
            <Plus className="w-4 h-4 mr-2" />
            Add Cash Entry
          </Button>
        </div>

       

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search cash entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as "all" | "income" | "expense")}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Entries ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Description</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600">{entry.date}</td>
                      <td className="py-3 px-4 font-medium">{entry.description}</td>
                      <td className="py-3 px-4">
                        <Badge variant={entry.type === "income" ? "default" : "destructive"}>
                          {entry.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{entry.category}</td>
                      <td className={`py-3 px-4 font-medium ${entry.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {entry.type === "income" ? "+" : "-"}₹{entry.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={entry.status === "active" ? "default" : "secondary"}>
                          {entry.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(entry)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
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
            onClick={() => setHasEntries(!hasEntries)}
          >
            {hasEntries ? "Show Empty State" : "Show Data"}
          </Button>
        </div>

        {/* Adjust Cash Modal */}
        <AdjustCashModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleCashAdjustment}
          currentCash={netBalance}
          editingEntry={editingEntry}
        />
      </div>
    </div>
  )
}

