"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Download, Printer, Filter, Calendar, Plus, ArrowUpDown, ExternalLink } from "lucide-react"

interface BillWiseProfit {
  id: string
  date: string
  invoiceNo: string
  party: string
  totalSaleAmount: number
  profitLoss: number
}

const sampleData: BillWiseProfit[] = [
  {
    id: "1",
    date: "03/10/2025",
    invoiceNo: "1",
    party: "Minsha",
    totalSaleAmount: 1000,
    profitLoss: 1000,
  },
  {
    id: "2",
    date: "06/10/2025",
    invoiceNo: "2",
    party: "New",
    totalSaleAmount: 100,
    profitLoss: 100,
  },
]

export default function BillWiseProfitPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [fromDate, setFromDate] = useState("01/10/2025")
  const [toDate, setToDate] = useState("08/10/2025")
  const [partyFilter, setPartyFilter] = useState("")

  const totalSaleAmount = sampleData.reduce((sum, item) => sum + item.totalSaleAmount, 0)
  const totalProfitLoss = sampleData.reduce((sum, item) => sum + item.profitLoss, 0)

  const filteredData = sampleData.filter(
    (item) =>
      item.party.toLowerCase().includes(partyFilter.toLowerCase()) ||
      item.invoiceNo.toLowerCase().includes(partyFilter.toLowerCase())
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
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Report Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">PROFIT ON SALE INVOICES</h1>
          
          {/* Date Range */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">From</span>
              <Button variant="outline" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {fromDate}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">To</span>
              <Button variant="outline" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {toDate}
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">FILTERS</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Party filter:</label>
                <Input
                  placeholder="Filter by party..."
                  value={partyFilter}
                  onChange={(e) => setPartyFilter(e.target.value)}
                  className="w-48"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Report Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">PROFIT ON SALE INVOICES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">
                      <div className="flex items-center gap-1">
                        DATE = <ArrowUpDown className="h-3 w-3 text-gray-500" />
                      </div>
                    </TableHead>
                    <TableHead className="w-[120px]">
                      <div className="flex items-center gap-1">
                        INVOICE NO = <ArrowUpDown className="h-3 w-3 text-gray-500" />
                      </div>
                    </TableHead>
                    <TableHead>PARTY</TableHead>
                    <TableHead className="text-right">TOTAL SALE AMOUNT</TableHead>
                    <TableHead className="text-right">
                      <div className="flex items-center gap-1">
                        PROFIT (+) / LOSS... <ArrowUpDown className="h-3 w-3 text-gray-500" />
                      </div>
                    </TableHead>
                    <TableHead className="text-center">DETAILS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.date}</TableCell>
                        <TableCell>{item.invoiceNo}</TableCell>
                        <TableCell>{item.party}</TableCell>
                        <TableCell className="text-right">₹ {item.totalSaleAmount.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-green-600 font-semibold">
                          ₹ {item.profitLoss.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="link" className="text-blue-600 p-0 h-auto">
                            Show <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No data found for the selected filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Sale Amount:</span>
                <span className="font-semibold">₹ {totalSaleAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Profit(+)/Loss(-):</span>
                <span className="font-semibold text-green-600">₹ {totalProfitLoss.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
