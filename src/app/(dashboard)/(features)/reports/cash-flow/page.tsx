"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Download, Printer, Filter, Calendar, Plus, Share, MoreVertical } from "lucide-react"

interface CashFlowTransaction {
  id: string
  date: string
  refNo: string
  name: string
  category: string
  type: string
  cashIn: number
  cashOut: number
  runningBalance: number
}

const sampleData: CashFlowTransaction[] = [
  {
    id: "1",
    date: "03/10/2025",
    refNo: "1",
    name: "Minsha",
    category: "",
    type: "Sale",
    cashIn: 400,
    cashOut: 0,
    runningBalance: 400,
  },
  {
    id: "2",
    date: "07/10/2025",
    refNo: "1",
    name: "Minsha",
    category: "",
    type: "Payment-In",
    cashIn: 700,
    cashOut: 0,
    runningBalance: 1100,
  },
  {
    id: "3",
    date: "08/10/2025",
    refNo: "",
    name: "Cash adjustment",
    category: "",
    type: "Cash Incre...",
    cashIn: 600,
    cashOut: 0,
    runningBalance: 1700,
  },
  {
    id: "4",
    date: "08/10/2025",
    refNo: "",
    name: "Cash adjustment",
    category: "",
    type: "Cash Red...",
    cashIn: 0,
    cashOut: 500,
    runningBalance: 1200,
  },
]

export default function CashFlowPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMonth, setFilterMonth] = useState("this_month")
  const [filterFirm, setFilterFirm] = useState("all_firms")
  const [showZeroAmount, setShowZeroAmount] = useState(false)

  const openingCash = 0
  const totalCashIn = sampleData.reduce((sum, item) => sum + item.cashIn, 0)
  const totalCashOut = sampleData.reduce((sum, item) => sum + item.cashOut, 0)
  const closingCash = openingCash + totalCashIn - totalCashOut

  const filteredData = sampleData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">• Enter Business Name</span>
          </div>
          <div className="flex items-center gap-2">
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

        {/* Report Title and Filters */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Cash flow</h1>
          
          {/* Filters */}
          <div className="flex gap-4 mb-4">
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

          {/* Opening Cash and Checkbox */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-green-600 font-semibold">
              Opening Cash-in Hand: ₹ {openingCash.toFixed(2)}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="show-zero" 
                checked={showZeroAmount}
                // onCheckedChange={setShowZeroAmount}
              />
              <label htmlFor="show-zero" className="text-sm text-gray-600">
                Show zero amount transaction
              </label>
            </div>
          </div>
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

        {/* Report Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">
                    DATE <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="w-[100px]">
                    REF NO. <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead>
                    NAME <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead>
                    CATEGORY <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead>
                    TYPE <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-right">
                    CASH IN <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-right">
                    CASH O... <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-right">
                    RUNNIN... <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                  <TableHead className="text-center">
                    PRINT /... <Filter className="inline-block h-3 w-3 ml-1 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.date}</TableCell>
                      <TableCell>{item.refNo}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell className="text-right">
                        {item.cashIn > 0 ? `₹ ${item.cashIn.toFixed(2)}` : ""}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.cashOut > 0 ? `₹ ${item.cashOut.toFixed(2)}` : ""}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹ {item.runningBalance.toFixed(2)}
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
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Summary Footer */}
        <div className="mt-6 p-4 rounded-lg border">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className="text-green-600 font-semibold">
                Total Cash-in: ₹ {totalCashIn.toFixed(2)}
              </div>
              <div className="text-red-600 font-semibold">
                Total Cash-out: ₹ {totalCashOut.toFixed(2)}
              </div>
            </div>
            <div className="text-green-600 font-bold text-lg">
              Closing Cash-in Hand: ₹ {closingCash.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
