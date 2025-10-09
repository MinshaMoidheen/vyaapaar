"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Printer, BarChart3, Filter, Calendar, Plus } from "lucide-react"

interface SaleTransaction {
  id: string
  date: string
  invoiceNo: string
  partyName: string
  transaction: string
  payment: string
  amount: number
  balance: number
  status: "Paid" | "Partial" | "Unpaid"
}

const sampleTransactions: SaleTransaction[] = [
  {
    id: "1",
    date: "03/10/2025",
    invoiceNo: "1",
    partyName: "Minsha",
    transaction: "Sale",
    payment: "Cash",
    amount: 1000,
    balance: 600,
    status: "Partial"
  },
  {
    id: "2",
    date: "06/10/2025",
    invoiceNo: "2",
    partyName: "New",
    transaction: "Sale",
    payment: "Cash",
    amount: 100,
    balance: 100,
    status: "Unpaid"
  },
  {
    id: "3",
    date: "07/10/2025",
    invoiceNo: "1",
    partyName: "Minsha",
    transaction: "Credit Note",
    payment: "Cash",
    amount: 290,
    balance: 290,
    status: "Unpaid"
  }
]

export default function SaleReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState("Custom")
  const [firmFilter, setFirmFilter] = useState("All Firms")

  const totalSales = sampleTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const receivedAmount = sampleTransactions.reduce((sum, transaction) => sum + (transaction.amount - transaction.balance), 0)
  const balanceAmount = totalSales - receivedAmount

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Partial":
        return "bg-orange-100 text-orange-800"
      case "Unpaid":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Sale
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Purchase
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Sale Invoices</h1>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Sale
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter by :</span>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Custom">Custom</SelectItem>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm">01/10/2025 To 31/10/2025</span>
          </div>
          <Select value={firmFilter} onValueChange={setFirmFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Firms">All Firms</SelectItem>
              <SelectItem value="Firm 1">Firm 1</SelectItem>
              <SelectItem value="Firm 2">Firm 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Total Sales Amount ₹ {totalSales.toLocaleString()}</h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-sm text-gray-600">Received: ₹ {receivedAmount.toLocaleString()}</span>
                  <span className="text-sm text-gray-600">Balance: ₹ {balanceAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Transactions</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Chart
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Invoice no</TableHead>
                  <TableHead>Party Name</TableHead>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Payment...</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Stat...</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.invoiceNo}</TableCell>
                    <TableCell>{transaction.partyName}</TableCell>
                    <TableCell>{transaction.transaction}</TableCell>
                    <TableCell>{transaction.payment}</TableCell>
                    <TableCell>₹ {transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>₹ {transaction.balance.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Printer className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Filter className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
