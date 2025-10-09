'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { 
  ArrowLeft, 
  CalendarIcon
} from 'lucide-react'

export default function CloseFinancialYearPage() {
  const router = useRouter()
  const [closingDate, setClosingDate] = useState<Date | undefined>(new Date(2025, 8, 30)) // Sep 30, 2025
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPrefixFields, setShowPrefixFields] = useState(false)
  const [transactionPrefixes, setTransactionPrefixes] = useState({
    invoice: '',
    estimate: '',
    proformaInvoice: '',
    paymentIn: '',
    deliveryChallan: '',
    saleOrder: '',
    purchaseOrder: '',
    creditNote: ''
  })

  const handleChangePrefix = () => {
    setShowPrefixFields(!showPrefixFields)
  }

  const handleRestartTxnNumbers = () => {
    setIsProcessing(true)
    console.log('Restarting transaction numbers with prefixes:', transactionPrefixes)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      alert('Transaction numbers have been restarted with new prefixes!')
    }, 2000)
  }

  const handleStartFresh = () => {
    if (!closingDate) {
      alert('Please select a closing date.')
      return
    }
    
    setIsProcessing(true)
    console.log('Starting fresh with backup...', closingDate)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      alert(`Data backed up and company reset for fresh start from ${format(closingDate, 'dd/MM/yyyy')}!`)
    }, 3000)
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
            <h1 className="text-lg md:text-xl font-semibold">Close Financial Year</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Title and Instructions */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">CLOSE BOOKS</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            You can select one of the following ways to Close books.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          
          {/* Option 1: Restart Transaction Numbers */}
          <Card className="p-4 md:p-6">
            <CardContent className="p-0 space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                Restart Transaction Numbers
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Your data remains as it is in your company and only the invoice prefixes are reset for new Financial Year after closing date.
              </p>
              
              {/* Change Prefix Button */}
              <div className="flex justify-start">
                <Button
                  onClick={handleChangePrefix}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  {showPrefixFields ? 'Hide Prefix Fields' : 'Change Prefix'}
                </Button>
              </div>
              
              {/* Transaction Prefix Input Fields - Conditionally Rendered */}
              {showPrefixFields && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-foreground">Type</Label>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Invoice*</div>
                        <div className="text-sm text-muted-foreground">Estimate</div>
                        <div className="text-sm text-muted-foreground">Proforma Invoice</div>
                        <div className="text-sm text-muted-foreground">Payment-In</div>
                        <div className="text-sm text-muted-foreground">Delivery Challan</div>
                        <div className="text-sm text-muted-foreground">Sale Order</div>
                        <div className="text-sm text-muted-foreground">Purchase Order</div>
                        <div className="text-sm text-muted-foreground">Credit Note</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-foreground">Prefix</Label>
                      <div className="space-y-1">
                        <Input
                          value={transactionPrefixes.invoice}
                          onChange={(e) => setTransactionPrefixes(prev => ({ ...prev, invoice: e.target.value }))}
                          placeholder="Enter prefix"
                          className="text-sm h-8"
                        />
                        <Input
                          value={transactionPrefixes.estimate}
                          onChange={(e) => setTransactionPrefixes(prev => ({ ...prev, estimate: e.target.value }))}
                          placeholder="Enter prefix"
                          className="text-sm h-8"
                        />
                        <Input
                          value={transactionPrefixes.proformaInvoice}
                          onChange={(e) => setTransactionPrefixes(prev => ({ ...prev, proformaInvoice: e.target.value }))}
                          placeholder="Enter prefix"
                          className="text-sm h-8"
                        />
                        <Input
                          value={transactionPrefixes.paymentIn}
                          onChange={(e) => setTransactionPrefixes(prev => ({ ...prev, paymentIn: e.target.value }))}
                          placeholder="Enter prefix"
                          className="text-sm h-8"
                        />
                        <Input
                          value={transactionPrefixes.deliveryChallan}
                          onChange={(e) => setTransactionPrefixes(prev => ({ ...prev, deliveryChallan: e.target.value }))}
                          placeholder="Enter prefix"
                          className="text-sm h-8"
                        />
                        <Input
                          value={transactionPrefixes.saleOrder}
                          onChange={(e) => setTransactionPrefixes(prev => ({ ...prev, saleOrder: e.target.value }))}
                          placeholder="Enter prefix"
                          className="text-sm h-8"
                        />
                        <Input
                          value={transactionPrefixes.purchaseOrder}
                          onChange={(e) => setTransactionPrefixes(prev => ({ ...prev, purchaseOrder: e.target.value }))}
                          placeholder="Enter prefix"
                          className="text-sm h-8"
                        />
                        <Input
                          value={transactionPrefixes.creditNote}
                          onChange={(e) => setTransactionPrefixes(prev => ({ ...prev, creditNote: e.target.value }))}
                          placeholder="Enter prefix"
                          className="text-sm h-8"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowPrefixFields(false)
                        setTransactionPrefixes({
                          invoice: '',
                          estimate: '',
                          proformaInvoice: '',
                          paymentIn: '',
                          deliveryChallan: '',
                          saleOrder: '',
                          purchaseOrder: '',
                          creditNote: ''
                        })
                      }}
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      CANCEL
                    </Button>
                    <Button
                      onClick={handleRestartTxnNumbers}
                      disabled={isProcessing}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        'RESTART TXN NUMBER'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Option 2: Backup and Start Fresh */}
          <Card className="p-6 md:p-8">
            <CardContent className="p-0 space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                Backup all data and start fresh.
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                All the transaction data upto the closing date will be backed up and removed from company to start all fresh. You can always access your data from the backup.
              </p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="closing-date" className="text-sm md:text-base font-medium">
                    SELECT CLOSING DATE
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2",
                          !closingDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {closingDate ? format(closingDate, "dd/MM/yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={closingDate}
                        onSelect={setClosingDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleStartFresh}
                    disabled={!closingDate || isProcessing}
                    className="bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      'START FRESH'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}