"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface LoanAccount {
  id: string
  accountName: string
  accountNumber: string
  currentBalance: number
  loanReceivedIn: string
  interestRate: number
  processingFee: number
  description: string
  balanceAsOf: Date
  termDuration: number
  processingFeePaidFrom: string
}

interface AddLoanAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: LoanAccount) => void
  editingLoan?: LoanAccount | null
}

export function AddLoanAccountModal({ 
  isOpen, 
  onClose, 
  onSave, 
  editingLoan 
}: AddLoanAccountModalProps) {
  const [formData, setFormData] = useState<LoanAccount>({
    id: "",
    accountName: "",
    accountNumber: "",
    currentBalance: 0,
    loanReceivedIn: "Cash",
    interestRate: 0,
    processingFee: 0,
    description: "",
    balanceAsOf: new Date(),
    termDuration: 0,
    processingFeePaidFrom: "Cash"
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Effect to populate form when editing
  useEffect(() => {
    if (editingLoan) {
      setFormData(editingLoan)
    } else {
      // Reset form for new entry
      setFormData({
        id: "",
        accountName: "",
        accountNumber: "",
        currentBalance: 0,
        loanReceivedIn: "Cash",
        interestRate: 0,
        processingFee: 0,
        description: "",
        balanceAsOf: new Date(),
        termDuration: 0,
        processingFeePaidFrom: "Cash"
      })
    }
  }, [editingLoan])

  const handleInputChange = (field: keyof LoanAccount, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAmountChange = (field: keyof LoanAccount, value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0
    handleInputChange(field, numericValue)
  }

  const handleSave = () => {
    if (!formData.accountName.trim()) {
      alert("Please enter account name")
      return
    }
    
    if (formData.currentBalance <= 0) {
      alert("Please enter a valid current balance")
      return
    }
    
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingLoan ? "Edit Loan Account" : "Add Loan Account"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Name */}
            <div className="space-y-2">
              <Label htmlFor="accountName" className="text-sm font-medium">
                Account Name *
              </Label>
              <Input
                id="accountName"
                value={formData.accountName}
                onChange={(e) => handleInputChange("accountName", e.target.value)}
                placeholder="Lender Bank"
              />
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-sm font-medium">
                Account Number
              </Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                placeholder="Enter account number"
              />
            </div>

            {/* Current Balance */}
            <div className="space-y-2">
              <Label htmlFor="currentBalance" className="text-sm font-medium">
                Current Balance *
              </Label>
              <Input
                id="currentBalance"
                type="text"
                value={formData.currentBalance > 0 ? `₹ ${formData.currentBalance.toLocaleString()}` : "₹ 0"}
                onChange={(e) => handleAmountChange("currentBalance", e.target.value)}
                placeholder="₹ 0"
                className="text-lg"
              />
            </div>

            {/* Loan received In */}
            <div className="space-y-2">
              <Label htmlFor="loanReceivedIn" className="text-sm font-medium">
                Loan received In
              </Label>
              <Select value={formData.loanReceivedIn} onValueChange={(value) => handleInputChange("loanReceivedIn", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-sm font-medium">
                Interest Rate (% per annum)
              </Label>
              <Input
                id="interestRate"
                type="text"
                value={formData.interestRate > 0 ? `${formData.interestRate}%` : "0%"}
                onChange={(e) => handleAmountChange("interestRate", e.target.value)}
                placeholder="0%"
              />
            </div>

            {/* Processing Fee */}
            <div className="space-y-2">
              <Label htmlFor="processingFee" className="text-sm font-medium">
                Processing Fee
              </Label>
              <Input
                id="processingFee"
                type="text"
                value={formData.processingFee > 0 ? `₹ ${formData.processingFee.toLocaleString()}` : "₹ 0"}
                onChange={(e) => handleAmountChange("processingFee", e.target.value)}
                placeholder="₹ 0"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>

            {/* Balance as of */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Balance as of</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.balanceAsOf, "dd/MM/yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.balanceAsOf}
                    onSelect={(date) => {
                      if (date) {
                        handleInputChange("balanceAsOf", date)
                        setIsCalendarOpen(false)
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Term Duration */}
            <div className="space-y-2">
              <Label htmlFor="termDuration" className="text-sm font-medium">
                Term Duration (in Months)
              </Label>
              <Input
                id="termDuration"
                type="text"
                value={formData.termDuration > 0 ? `${formData.termDuration} months` : "0 months"}
                onChange={(e) => handleAmountChange("termDuration", e.target.value)}
                placeholder="0 months"
              />
            </div>

            {/* Processing Fee Paid from */}
            <div className="space-y-2">
              <Label htmlFor="processingFeePaidFrom" className="text-sm font-medium">
                Processing Fee Paid from
              </Label>
              <Select value={formData.processingFeePaidFrom} onValueChange={(value) => handleInputChange("processingFeePaidFrom", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
            SAVE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
