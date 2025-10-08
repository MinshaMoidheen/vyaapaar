"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Printer, Filter, Calendar, Plus, Share, MoreVertical } from "lucide-react"

interface AllTransaction {
  id: string
  date: string
  refNo: string
  partyName: string
  category: string
  type: string
  total: number
  received: number
  balance: number
  status: "Paid" | "Partial" | "Unpaid" | "Unused" | "Used" | ""
}

const sampleTransactions: AllTransaction[] = [
  {
    id: "1",
    date: "03/10/2025",
    refNo: "1",
    partyName: "Minsha",
    category: "",
    type: "Sale",
    total: 1000,
    received: 400,
    balance: 600,
    status: "Partial",
  },
  {
    id: "2",
    date: "06/10/2025",
    refNo: "2",
    partyName: "New",
    category: "",
    type: "Sale",
    total: 100,
    received: 0,
    balance: 100,
    status: "Unpaid",
  },
  {
    id: "3",
    date: "07/10/2025",
    refNo: "1",
    partyName: "Minsha",
    category: "",
    type: "Estimate",
    total: 290,
    received: 0,
    balance: 0,
    status: "",
  },
  {
    id: "4",
    date: "07/10/2025",
    refNo: "1",
    partyName: "Minsha",
    category: "",
    type: "Payme...",
    total: 700,
    received: 700,
    balance: 0,
    status: "Unused",
  },
  {
    id: "5",
    date: "07/10/2025",
    refNo: "1",
    partyName: "Minsha",
    category: "",
    type: "Credit ...",
    total: 290,
    received: 0,
    balance: 290,
    status: "Unpaid",
  },
  {
    id: "6",
    date: "07/10/2025",
    refNo: "",
    partyName: "Minsha",
    category: "",
    type: "Purcha...",
    total: 333,
    received: 0,
    balance: 333,
    status: "Unpaid",
  },
  {
    id: "7",
    date: "07/10/2025",
    refNo: "",
    partyName: "Minsha",
    category: "",
    type: "Payme...",
    total: 0,
    received: 0,
    balance: 0,
    status: "Used",
  },
]

export default function AllTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMonth, setFilterMonth] = useState("this_month")
  const [filterFirm, setFilterFirm] = useState("all_firms")
  const [filterTransaction, setFilterTransaction] = useState("all_transaction")
  const [filterPayment, setFilterPayment] = useState("all_payment")

  const filteredTransactions = sampleTransactions.filter(
    (transaction) =>
      transaction.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Partial":
        return "bg-blue-100 text-blue-800"
      case "Unpaid":
        return "bg-blue-100 text-blue-800"
      case "Unused":
        return "bg-blue-100 text-blue-800"
      case "Used":
        return "bg-blue-100 text-blue-800"
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
            <h1 className="text-2xl font-bold">All Transactions</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
                <Download className="h-4 w-4" /> Excel Report
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
                <Printer className="h-4 w-4" /> Print
              </div>
            </div>
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

          <Select value={filterTransaction} onValueChange={setFilterTransaction}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Transaction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_transaction">All Transaction</SelectItem>
              <SelectItem value="sale">Sale</SelectItem>
              <SelectItem value="purchase">Purchase</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPayment} onValueChange={setFilterPayment}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_payment">All Payment</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="bank">Bank</SelectItem>
              <SelectItem value="credit">Credit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>
                    DATE <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead>
                    REF NO. <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead>
                    PARTY NAME <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead>
                    CATEGORY <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead>
                    TYPE <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-right">
                    TOTAL <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-right">
                    RECEIVED <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-right">
                    BALANCE <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-center">
                    STATUS <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-center">PRINT</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.refNo}</TableCell>
                      <TableCell>{transaction.partyName}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell className="text-right">₹ {transaction.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">₹ {transaction.received.toFixed(2)}</TableCell>
                      <TableCell className="text-right">₹ {transaction.balance.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        {transaction.status && (
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
