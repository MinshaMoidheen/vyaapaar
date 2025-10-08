"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Printer, Filter, Calendar, Upload, Plus, Share, MoreVertical } from "lucide-react"

interface PurchaseTransaction {
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

const sampleTransactions: PurchaseTransaction[] = [
  {
    id: "1",
    date: "07/10/2025",
    invoiceNo: "INV-001",
    partyName: "Minsha",
    transaction: "Purchase",
    payment: "Cash",
    amount: 333,
    balance: 333,
    status: "Unpaid",
  },
]

export default function PurchaseBillsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMonth, setFilterMonth] = useState("this_month")
  const [filterFirm, setFilterFirm] = useState("all_firms")

  const paidAmount = 0
  const unpaidAmount = 333
  const totalAmount = paidAmount + unpaidAmount

  const filteredTransactions = sampleTransactions.filter(
    (transaction) =>
      transaction.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Purchase Bills</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600">
              <Upload className="mr-2 h-4 w-4" /> Upload Bill
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="mr-2 h-4 w-4" /> Add Purchase
            </Button>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex justify-end items-center gap-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
            <Download className="h-4 w-4" /> Excel Report
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
            <Printer className="h-4 w-4" /> Print
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Between</span>
            <Button variant="outline" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> 01/10/2025
            </Button>
            <span className="text-sm text-gray-600">To</span>
            <Button variant="outline" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> 31/10/2025
            </Button>
          </div>

          <Select value={filterFirm} onValueChange={setFilterFirm}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="ALL FIRMS" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_firms">ALL FIRMS</SelectItem>
              <SelectItem value="firm_a">Firm A</SelectItem>
              <SelectItem value="firm_b">Firm B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-600 mb-1">Paid</p>
              <p className="text-2xl font-bold text-green-700">₹ {paidAmount.toFixed(2)}</p>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center text-3xl font-bold text-gray-500">+</div>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-600 mb-1">Unpaid</p>
              <p className="text-2xl font-bold text-blue-700">₹ {unpaidAmount.toFixed(2)}</p>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center text-3xl font-bold text-gray-500">=</div>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-600 mb-1">Total</p>
              <p className="text-2xl font-bold text-orange-700">₹ {totalAmount.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">TRANSACTIONS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center py-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">
                      DATE <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                    </TableHead>
                    <TableHead>
                      INVOICE... <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                    </TableHead>
                    <TableHead>
                      PARTY NAME <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                    </TableHead>
                    <TableHead>
                      TRANSA... <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                    </TableHead>
                    <TableHead>
                      PAYMENT... <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                    </TableHead>
                    <TableHead className="text-right">
                      AMOUNT <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                    </TableHead>
                    <TableHead className="text-right">
                      BALANC... <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                    </TableHead>
                    <TableHead className="text-center">
                      STATUS <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                    </TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.date}</TableCell>
                        <TableCell>{transaction.invoiceNo}</TableCell>
                        <TableCell>{transaction.partyName}</TableCell>
                        <TableCell>{transaction.transaction}</TableCell>
                        <TableCell>{transaction.payment}</TableCell>
                        <TableCell className="text-right">₹ {transaction.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-right">₹ {transaction.balance.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={transaction.status === "Unpaid" ? "destructive" : transaction.status === "Paid" ? "default" : "secondary"}
                            className="bg-blue-100 text-blue-800"
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No purchase transactions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
