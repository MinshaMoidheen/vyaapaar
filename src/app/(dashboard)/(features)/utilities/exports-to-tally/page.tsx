'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { 
  ArrowLeft, 
  CalendarIcon, 
  Filter, 
  Search, 
  PlayCircle, 
  ChevronDown
} from 'lucide-react'

// Tally Logo Component
const TallyLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6ZM12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8Z" fill="currentColor"/>
  </svg>
)

interface Transaction {
  id: string
  date: string
  invoiceNo: string
  partyName: string
  transactionType: string
  paymentType: string
  amount: number
  balance: number
}

const dummyTransactions: Transaction[] = [
  { id: '1', date: '03/10/2025', invoiceNo: '1', partyName: 'Minsha', transactionType: 'Sale', paymentType: 'Cash', amount: 1000, balance: 600 },
  { id: '2', date: '06/10/2025', invoiceNo: '2', partyName: 'New', transactionType: 'Sale', paymentType: 'Cash', amount: 100, balance: 100 },
  { id: '3', date: '07/10/2025', invoiceNo: '1', partyName: 'Minsha', transactionType: 'Credit Note', paymentType: 'Cash', amount: 290, balance: 290 },
  { id: '4', date: '07/10/2025', invoiceNo: '', partyName: 'Minsha', transactionType: 'Purchase', paymentType: 'Cash', amount: 333, balance: 333 },
]

export default function ExportsToTallyPage() {
  const router = useRouter()
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date(2025, 9, 1)) // Oct 1, 2025
  const [toDate, setToDate] = useState<Date | undefined>(new Date(2025, 9, 31)) // Oct 31, 2025
  const [transactionFilters, setTransactionFilters] = useState({
    Sale: true,
    'Credit Note': true,
    Purchase: true,
    'Debit Note': true,
    'Sale[Cancelled]': true,
  })
  const [searchTerm, setSearchTerm] = useState('')

  const handleFilterChange = (type: string, checked: boolean) => {
    setTransactionFilters(prev => ({ ...prev, [type]: checked }))
  }

  const filteredTransactions = dummyTransactions.filter(transaction => {
    const matchesType = transactionFilters[transaction.transactionType as keyof typeof transactionFilters]
    const matchesSearch = searchTerm === '' ||
      transaction.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionType.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Basic date filtering
    const transactionDate = new Date(transaction.date.split('/').reverse().join('-'))
    const isWithinDateRange = (!fromDate || transactionDate >= fromDate) && (!toDate || transactionDate <= toDate)

    return matchesType && matchesSearch && isWithinDateRange
  })

  const handleExportToTally = () => {
    console.log('Exporting to Tally...', filteredTransactions)
    // Implement actual export logic here
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold">Exports To Tally</h1>
          </div>
          {/* <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex text-xs md:text-sm">
              + Add Sale
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex text-xs md:text-sm">
              + Add Purchase
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex text-xs md:text-sm">
              +
            </Button>
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
       

        {/* Date Filter and Export Button */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <Button variant="outline" className="w-full sm:w-32 justify-between text-xs md:text-sm">
              This Month <ChevronDown className="ml-2 h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto px-3 py-2 text-xs md:text-sm">
                Between
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-[120px] md:w-[140px] justify-start text-left font-normal text-xs md:text-sm",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    {fromDate ? format(fromDate, "dd/MM/yyyy") : "From"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <span className="text-muted-foreground text-xs md:text-sm">To</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-[120px] md:w-[140px] justify-start text-left font-normal text-xs md:text-sm",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    {toDate ? format(toDate, "dd/MM/yyyy") : "To"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button 
            onClick={handleExportToTally}
            className="text-white w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 text-sm md:text-base flex items-center justify-center gap-2"
          >
            <TallyLogo />
            Export To Tally
          </Button>
        </div>

        {/* Transactions Filter and Search */}
        <Card className="p-4 md:p-6">
          <CardContent className="p-0 space-y-4 md:space-y-6">
            <div className="flex flex-col space-y-4">
              <Label className="text-sm md:text-base font-medium">TRANSACTIONS</Label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm">
                {Object.keys(transactionFilters).map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={transactionFilters[type as keyof typeof transactionFilters]}
                      onCheckedChange={(checked) => handleFilterChange(type, checked as boolean)}
                    />
                    <label
                      htmlFor={type}
                      className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 w-full text-xs md:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">#</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        DATE <Filter className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        INVOICE NO. <Filter className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        PARTY NAME <Filter className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        TRANSACTION TYPE <Filter className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        PAYMENT TYPE <Filter className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center justify-end gap-1">
                        AMOUNT <Filter className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center justify-end gap-1">
                        BALANCE <Filter className="h-3 w-3" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-muted-foreground text-xs md:text-sm">
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((transaction, index) => (
                      <tr 
                        key={transaction.id} 
                        className={cn(
                          'hover:bg-muted/30 transition-colors',
                          index === 2 && 'bg-blue-50/20 hover:bg-blue-50/30' // Highlight Credit Note row
                        )}
                      >
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{index + 1}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{transaction.date}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{transaction.invoiceNo || '-'}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{transaction.partyName}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{transaction.transactionType}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground">{transaction.paymentType}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-right text-xs md:text-sm text-foreground">{transaction.amount.toLocaleString('en-IN')}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-right text-xs md:text-sm text-foreground">{transaction.balance.toLocaleString('en-IN')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

       
      </div>
    </div>
  )
}
