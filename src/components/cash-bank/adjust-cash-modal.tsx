"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface AdjustCashModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CashAdjustmentData) => void
  currentCash: number
  editingEntry?: any | null
}

interface CashAdjustmentData {
  type: "add" | "reduce"
  amount: number
  date: Date
  description: string
}

export function AdjustCashModal({ isOpen, onClose, onSave, currentCash, editingEntry }: AdjustCashModalProps) {
  const [formData, setFormData] = useState<CashAdjustmentData>({
    type: "add",
    amount: 0,
    date: new Date(),
    description: ""
  })

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Effect to populate form when editing
  useEffect(() => {
    if (editingEntry) {
      setFormData({
        type: editingEntry.type === "income" ? "add" : "reduce",
        amount: editingEntry.amount,
        date: new Date(editingEntry.date),
        description: editingEntry.description
      })
    } else {
      // Reset form for new entry
      setFormData({
        type: "add",
        amount: 0,
        date: new Date(),
        description: ""
      })
    }
  }, [editingEntry])

  const handleInputChange = (field: keyof CashAdjustmentData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAmountChange = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0
    handleInputChange("amount", numericValue)
  }

  const handleSave = () => {
    if (formData.amount <= 0) {
      alert("Please enter a valid amount")
      return
    }
    
    onSave(formData)
    // Reset form
    setFormData({
      type: "add",
      amount: 0,
      date: new Date(),
      description: ""
    })
    onClose()
  }

  const calculateUpdatedCash = () => {
    if (formData.type === "add") {
      return currentCash + formData.amount
    } else {
      return currentCash - formData.amount
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingEntry ? "Edit Cash Entry" : "Adjust Cash"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Cash Adjustment Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Cash Adjustment Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleInputChange("type", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add" id="add" />
                <Label htmlFor="add">Add Cash</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reduce" id="reduce" />
                <Label htmlFor="reduce">Reduce Cash</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Enter Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              Enter Amount *
            </Label>
            <Input
              id="amount"
              type="text"
              value={formData.amount > 0 ? `₹ ${formData.amount}` : "₹ 0"}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="₹ 0"
              className="text-lg"
            />
          </div>

          {/* Updated Cash Display */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">
              Updated Cash: ₹ {calculateUpdatedCash().toLocaleString()}
            </Label>
          </div>

          {/* Adjustment Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Adjustment Date</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(formData.date, "dd/MM/yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => {
                    if (date) {
                      handleInputChange("date", date)
                      setIsCalendarOpen(false)
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
