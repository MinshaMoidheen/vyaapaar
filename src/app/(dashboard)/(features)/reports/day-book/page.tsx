"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Printer, Filter, Calendar, Plus, Share, MoreVertical } from "lucide-react"

interface DayBookTransaction {
  id: string
  name: string
  refNo: string
  type: string
  total: number
  moneyIn: number
  moneyOut: number
}

const sampleTransactions: DayBookTransaction[] = [
  {
    id: "1",
    name: "Cash Adjustment",
    refNo: "CA001",
    type: "Cash Increase",
    total: 600,
    moneyIn: 600,
    moneyOut: 0,
  },
  {
    id: "2",
    name: "Cash Adjustment",
    refNo: "CA002",
    type: "Cash Reduce",
    total: 500,
    moneyIn: 0,
    moneyOut: 500,
  },
]

export default function DayBookPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("08/10/2025")
  const [filterFirm, setFilterFirm] = useState("all_firms")

  const totalMoneyIn = sampleTransactions.reduce((sum, transaction) => sum + transaction.moneyIn, 0)
  const totalMoneyOut = sampleTransactions.reduce((sum, transaction) => sum + transaction.moneyOut, 0)
  const netAmount = totalMoneyIn - totalMoneyOut

  const filteredTransactions = sampleTransactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <h1 className="text-2xl font-bold">Day Book</h1>
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Date:</span>
            <Input
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-32"
            />
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
                  <TableHead>
                    NAME <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead>
                    REF NO. <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead>
                    TYPE <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-right">
                    TOTAL <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-right">
                    MONEY IN <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-right">
                    MONEY OUT <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-center">
                    PRINT / SHA... <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <TableRow 
                      key={transaction.id} 
                      className={index === 0 ? "bg-blue-50" : ""}
                    >
                      <TableCell className="font-medium">{transaction.name}</TableCell>
                      <TableCell>{transaction.refNo}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell className="text-right">₹ {transaction.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        {transaction.moneyIn > 0 ? `₹ ${transaction.moneyIn.toFixed(2)}` : ""}
                      </TableCell>
                      <TableCell className="text-right">
                        {transaction.moneyOut > 0 ? `₹ ${transaction.moneyOut.toFixed(2)}` : ""}
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
                    <TableCell colSpan={7} className="h-24 text-center">
                      No transactions found for this date.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Summary Footer */}
        <div className="mt-6 p-4 bg-white rounded-lg border">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className="text-green-600 font-semibold">
                Total Money-In: ₹ {totalMoneyIn.toFixed(2)}
              </div>
              <div className="text-red-600 font-semibold">
                Total Money-Out: ₹ {totalMoneyOut.toFixed(2)}
              </div>
            </div>
            <div className="text-blue-600 font-bold text-lg">
              Total Money In - Total Money Out: ₹{netAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
