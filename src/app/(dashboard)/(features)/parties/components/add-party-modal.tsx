'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { X, Info, Calendar, Plus, Minus } from 'lucide-react'
import { addParty } from '../actions'

interface AddPartyModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onPartyAdded?: () => void
}

export function AddPartyModal({ isOpen, onOpenChange, onPartyAdded }: AddPartyModalProps) {
  const [activeTab, setActiveTab] = useState('gst-address')
  const [noLimit, setNoLimit] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showShippingAddress, setShowShippingAddress] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      const result = await addParty(formData)
      if (result.success) {
        onOpenChange(false)
        // Notify parent that a party was added
        if (onPartyAdded) {
          onPartyAdded()
        }
        // Reset form
        setActiveTab('gst-address')
        setNoLimit(true)
        setShowShippingAddress(false)
      } else {
        // Handle error
        console.error(result.error)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Add Party
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
              >
               
              </Button>
            </DialogTitle>
          </DialogHeader>

          <form action={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partyName">
                  Party Name <span className="text-red-500">*</span>
                </Label>
                <Input id="partyName" name="partyName" placeholder="Enter party name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstin" className="flex items-center gap-1">
                  GSTIN
                  <Info className="h-3 w-3 text-gray-400" />
                </Label>
                <Input id="gstin" name="gstin" placeholder="Enter GSTIN" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" name="phoneNumber" placeholder="Enter phone number" />
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="gst-address">GST & Address</TabsTrigger>
                <TabsTrigger value="credit-balance" className="flex items-center gap-2">
                  Credit & Balance
                  <Badge variant="destructive" className="text-xs">New</Badge>
                </TabsTrigger>
                <TabsTrigger value="additional-fields">Additional Fields</TabsTrigger>
              </TabsList>

              <TabsContent value="gst-address" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gstType">GST Type</Label>
                    <Select name="gstType">
                      <SelectTrigger>
                        <SelectValue placeholder="Select GST type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unregistered">Unregistered/Consumer</SelectItem>
                        <SelectItem value="registered">Registered</SelectItem>
                        <SelectItem value="composition">Composition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select name="state">
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email ID</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter email address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Textarea 
                    id="billingAddress" 
                    name="billingAddress"
                    placeholder="Enter billing address"
                    rows={4}
                  />
                </div>

                {/* Shipping Address Toggle */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Enable Shipping Address</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowShippingAddress(!showShippingAddress)}
                      className="flex items-center gap-2"
                    >
                      {showShippingAddress ? (
                        <>
                          <Minus className="h-4 w-4" />
                          Hide Shipping Address
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Add Shipping Address
                        </>
                      )}
                    </Button>
                  </div>

                  {showShippingAddress && (
                   
                     
                      
                        
                        
                      <div className="space-y-2">
                        <Textarea 
                          id="shippingAddress" 
                          name="shippingAddress"
                          placeholder="Enter shipping address"
                          rows={3}
                        />
                      </div>
                     
                   
                  )}
                </div>
              </TabsContent>

              <TabsContent value="credit-balance" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openingBalance">Opening Balance</Label>
                  <Input id="openingBalance" name="openingBalance" placeholder="Enter opening balance" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asOfDate">As Of Date</Label>
                  <div className="relative">
                    <Input 
                      id="asOfDate" 
                      name="asOfDate"
                      value="03-10-2025" 
                      readOnly
                      className="pr-8"
                    />
                    <Calendar className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="creditLimit" className="flex items-center gap-1">
                      Credit Limit
                      <Info className="h-3 w-3 text-gray-400" />
                    </Label>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="no-limit"
                        checked={noLimit}
                        onCheckedChange={setNoLimit}
                      />
                      <Label htmlFor="no-limit" className={noLimit ? "text-purple-600 font-medium" : "text-gray-500"}>
                        No Limit
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="custom-limit"
                        checked={!noLimit}
                        onCheckedChange={(checked) => setNoLimit(!checked)}
                      />
                      <Label htmlFor="custom-limit" className={!noLimit ? "text-purple-600 font-medium" : "text-gray-500"}>
                        Custom Limit
                      </Label>
                    </div>
                  </div>

                  {!noLimit && (
                    <div className="space-y-2">
                      <Label htmlFor="customLimitValue">Custom Limit Amount</Label>
                      <Input id="customLimitValue" name="customLimitValue" placeholder="Enter custom limit" />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="additional-fields" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="additionalField1">Additional Field 1</Label>
                  <Input id="additionalField1" name="additionalField1" placeholder="Enter additional field 1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalField2">Additional Field 2</Label>
                  <Input id="additionalField2" name="additionalField2" placeholder="Enter additional field 2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalField3">Additional Field 3</Label>
                  <Input id="additionalField3" name="additionalField3" placeholder="Enter additional field 3" />
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                className="text-purple-600 border-purple-600 hover:bg-purple-50"
                onClick={() => {
                  // Handle save and new logic
                  onOpenChange(false)
                  setTimeout(() => onOpenChange(true), 100)
                }}
              >
                Save & New
              </Button>
              <Button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  )
}
