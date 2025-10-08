"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Printer, BarChart3, FileText, Calendar, TrendingUp, Users, Scale, Receipt } from "lucide-react"

interface ReportItem {
  id: string
  title: string
  description: string
  icon: any
  url: string
  category: "transaction" | "party"
  badge?: string
}

const reportItems: ReportItem[] = [
  // Transaction Reports
  {
    id: "1",
    title: "Sale",
    description: "View all sales transactions and invoices",
    icon: Receipt,
    url: "/reports/sale",
    category: "transaction"
  },
  {
    id: "2",
    title: "Purchase",
    description: "View all purchase transactions and bills",
    icon: FileText,
    url: "/reports/purchase",
    category: "transaction"
  },
  {
    id: "3",
    title: "Day book",
    description: "Daily transaction summary",
    icon: Calendar,
    url: "/reports/day-book",
    category: "transaction"
  },
  {
    id: "4",
    title: "All Transactions",
    description: "Complete transaction history",
    icon: FileText,
    url: "/reports/all-transactions",
    category: "transaction"
  },
  {
    id: "5",
    title: "Profit And Loss",
    description: "Financial performance overview",
    icon: TrendingUp,
    url: "/reports/profit-loss",
    category: "transaction"
  },
  {
    id: "6",
    title: "Bill Wise Profit",
    description: "Profit analysis by individual bills",
    icon: Receipt,
    url: "/reports/bill-wise-profit",
    category: "transaction"
  },
  {
    id: "7",
    title: "Cash flow",
    description: "Cash inflow and outflow analysis",
    icon: FileText,
    url: "/reports/cash-flow",
    category: "transaction"
  },
  {
    id: "8",
    title: "Trial Balance Report",
    description: "Account balance verification",
    icon: Scale,
    url: "/reports/trial-balance",
    category: "transaction",
    badge: "•"
  },
  {
    id: "9",
    title: "Balance Sheet",
    description: "Financial position statement",
    icon: BarChart3,
    url: "/reports/balance-sheet",
    category: "transaction"
  },
  // Party Reports
  {
    id: "10",
    title: "Party Statement",
    description: "Individual party transaction summary",
    icon: Users,
    url: "/reports/party-statement",
    category: "party"
  },
  {
    id: "11",
    title: "Party wise Profit & Loss",
    description: "Profit analysis by party",
    icon: TrendingUp,
    url: "/reports/party-profit-loss",
    category: "party"
  },
  {
    id: "12",
    title: "All parties",
    description: "Complete party listing and details",
    icon: Users,
    url: "/reports/all-parties",
    category: "party"
  },
  {
    id: "13",
    title: "Party Report By Item",
    description: "Item-wise analysis by party",
    icon: FileText,
    url: "/reports/party-report-by-item",
    category: "party"
  },
  {
    id: "14",
    title: "Sale Purchase By Party",
    description: "Sales and purchase summary by party",
    icon: Users,
    url: "/reports/sale-purchase-by-party",
    category: "party"
  },
  {
    id: "15",
    title: "Sale Purchase By Party Group",
    description: "Group-wise sales and purchase analysis",
    icon: Users,
    url: "/reports/sale-purchase-by-party-group",
    category: "party"
  }
]

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"all" | "transaction" | "party">("all")

  const filteredReports = reportItems.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const transactionReports = filteredReports.filter(report => report.category === "transaction")
  const partyReports = filteredReports.filter(report => report.category === "party")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reports</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as "all" | "transaction" | "party")}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="transaction">Transaction Reports</SelectItem>
              <SelectItem value="party">Party Reports</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transaction Reports Section */}
        {selectedCategory === "all" || selectedCategory === "transaction" ? (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Transaction Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transactionReports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <report.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{report.title}</CardTitle>
                        </div>
                      </div>
                      {report.badge && (
                        <Badge variant="destructive" className="w-2 h-2 p-0 rounded-full">
                          {report.badge}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : null}

        {/* Party Reports Section */}
        {selectedCategory === "all" || selectedCategory === "party" ? (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Party Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partyReports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <report.icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{report.title}</CardTitle>
                        </div>
                      </div>
                      {report.badge && (
                        <Badge variant="destructive" className="w-2 h-2 p-0 rounded-full">
                          {report.badge}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : null}

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reports Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
