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
    <div className="min-h-screen bg-background">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Purchase Bills</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto">
              <Upload className="mr-2 h-4 w-4" /> 
              <span className="hidden sm:inline">Upload Bill</span>
              <span className="sm:hidden">Upload</span>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> 
              <span className="hidden sm:inline">Add Purchase</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex justify-center sm:justify-end items-center gap-3 md:gap-4 mb-4 md:mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
            <Download className="h-4 w-4" /> 
            <span className="hidden sm:inline">Excel Report</span>
            <span className="sm:hidden">Excel</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
            <Printer className="h-4 w-4" /> Print
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-sm text-muted-foreground">Between</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                <Calendar className="h-3 w-3 md:h-4 md:w-4" /> 
                <span className="hidden sm:inline">01/10/2025</span>
                <span className="sm:hidden">01/10</span>
              </Button>
              <span className="text-sm text-muted-foreground">To</span>
              <Button variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                <Calendar className="h-3 w-3 md:h-4 md:w-4" /> 
                <span className="hidden sm:inline">31/10/2025</span>
                <span className="sm:hidden">31/10</span>
              </Button>
            </div>
          </div>

          <Select value={filterFirm} onValueChange={setFilterFirm}>
            <SelectTrigger className="w-full sm:w-32">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Paid</p>
              <p className="text-lg md:text-2xl font-bold text-green-700">₹ {paidAmount.toFixed(2)}</p>
            </CardContent>
          </Card>
          <div className="hidden sm:flex items-center justify-center text-2xl md:text-3xl font-bold text-muted-foreground">+</div>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Unpaid</p>
              <p className="text-lg md:text-2xl font-bold text-blue-700">₹ {unpaidAmount.toFixed(2)}</p>
            </CardContent>
          </Card>
          <div className="hidden sm:flex items-center justify-center text-2xl md:text-3xl font-bold text-muted-foreground">=</div>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Total</p>
              <p className="text-lg md:text-2xl font-bold text-orange-700">₹ {totalAmount.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">TRANSACTIONS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center py-3 md:py-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 text-sm md:text-base"
                />
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] md:w-[120px] text-xs md:text-sm">
                      DATE <Filter className="inline-block h-3 w-3 ml-1 text-muted-foreground" />
                    </TableHead>
                    <TableHead className="hidden sm:table-cell text-xs md:text-sm">
                      INVOICE... <Filter className="inline-block h-3 w-3 ml-1 text-muted-foreground" />
                    </TableHead>
                    <TableHead className="text-xs md:text-sm">
                      PARTY NAME <Filter className="inline-block h-3 w-3 ml-1 text-muted-foreground" />
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-xs md:text-sm">
                      TRANSA... <Filter className="inline-block h-3 w-3 ml-1 text-muted-foreground" />
                    </TableHead>
                    <TableHead className="hidden lg:table-cell text-xs md:text-sm">
                      PAYMENT... <Filter className="inline-block h-3 w-3 ml-1 text-muted-foreground" />
                    </TableHead>
                    <TableHead className="text-right text-xs md:text-sm">
                      AMOUNT <Filter className="inline-block h-3 w-3 ml-1 text-muted-foreground" />
                    </TableHead>
                    <TableHead className="hidden sm:table-cell text-right text-xs md:text-sm">
                      BALANC... <Filter className="inline-block h-3 w-3 ml-1 text-muted-foreground" />
                    </TableHead>
                    <TableHead className="text-center text-xs md:text-sm">
                      STATUS <Filter className="inline-block h-3 w-3 ml-1 text-muted-foreground" />
                    </TableHead>
                    <TableHead className="text-center text-xs md:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium text-xs md:text-sm">{transaction.date}</TableCell>
                        <TableCell className="hidden sm:table-cell text-xs md:text-sm">{transaction.invoiceNo}</TableCell>
                        <TableCell className="text-xs md:text-sm">{transaction.partyName}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs md:text-sm">{transaction.transaction}</TableCell>
                        <TableCell className="hidden lg:table-cell text-xs md:text-sm">{transaction.payment}</TableCell>
                        <TableCell className="text-right text-xs md:text-sm">₹ {transaction.amount.toFixed(2)}</TableCell>
                        <TableCell className="hidden sm:table-cell text-right text-xs md:text-sm">₹ {transaction.balance.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={transaction.status === "Unpaid" ? "destructive" : transaction.status === "Paid" ? "default" : "secondary"}
                            className="bg-blue-100 text-blue-800 text-xs"
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 md:gap-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 md:h-8 md:w-8 p-0">
                              <Printer className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 md:h-8 md:w-8 p-0">
                              <Share className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 md:h-8 md:w-8 p-0">
                              <MoreVertical className="h-3 w-3 md:h-4 md:w-4" />
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
