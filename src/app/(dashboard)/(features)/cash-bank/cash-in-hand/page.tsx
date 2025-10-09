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
    <div className="min-h-screen bg-background">
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Cash In Hand - ₹{totalIncome.toLocaleString()}</h1>
          <Button onClick={handleAddEntry} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Cash Entry
          </Button>
        </div>

       

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search cash entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm md:text-base"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as "all" | "income" | "expense")}
            className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base bg-background text-foreground"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Cash Entries ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">Date</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">Description</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm hidden sm:table-cell">Type</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm hidden md:table-cell">Category</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">Amount</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm hidden lg:table-cell">Status</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((entry) => (
                    <tr key={entry.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 md:py-3 px-2 md:px-4 text-muted-foreground text-xs md:text-sm">{entry.date}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm">{entry.description}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 hidden sm:table-cell">
                        <Badge variant={entry.type === "income" ? "default" : "destructive"} className="text-xs">
                          {entry.type}
                        </Badge>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-muted-foreground text-xs md:text-sm hidden md:table-cell">{entry.category}</td>
                      <td className={`py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm ${entry.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {entry.type === "income" ? "+" : "-"}₹{entry.amount.toLocaleString()}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 hidden lg:table-cell">
                        <Badge variant={entry.status === "active" ? "default" : "secondary"} className="text-xs">
                          {entry.status}
                        </Badge>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(entry)}
                          className="h-7 w-7 md:h-8 md:w-8 p-0"
                        >
                          <Edit className="w-3 h-3 md:w-4 md:h-4" />
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

