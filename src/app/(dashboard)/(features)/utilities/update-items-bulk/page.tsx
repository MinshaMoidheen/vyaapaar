'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Search, 
  Filter, 
  Play, 
  ChevronDown,
  AlertTriangle,
  X
} from 'lucide-react'

interface BulkUpdateItem {
  id: string
  itemName: string
  category: string
  itemHsn: string
  itemCode: string
  purchasePrice: string
  purchaseTaxType: string
  salePrice: string
  saleTaxType: string
  discount: string
  discountType: string
  taxRate: string
  openingQuantity: string
  atPrice: string
  asOfDate: string
  minStock: string
  location: string
}

export default function UpdateItemsBulkPage() {
  const [activeTab, setActiveTab] = useState('pricing')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showAttentionModal, setShowAttentionModal] = useState(false)
  const [attentionOptions, setAttentionOptions] = useState({
    updateSalePrice: false,
    updateMRP: false,
    updateBatchMRPs: false,
    updatePurchasePrice: false
  })

  // Sample data
  const [items, setItems] = useState<BulkUpdateItem[]>([
    {
      id: '1',
      itemName: 'Coxineb 120mg Tablet',
      category: '--',
      itemHsn: '--',
      itemCode: '38643847857',
      purchasePrice: '--',
      purchaseTaxType: 'Included',
      salePrice: '116',
      saleTaxType: 'Included',
      discount: '--',
      discountType: 'Percentage',
      taxRate: 'None',
      openingQuantity: '3',
      atPrice: '--',
      asOfDate: '09/10/2025',
      minStock: '--',
      location: '0'
    },
    {
      id: '2',
      itemName: 'MAGGI H&S TCS Bottle 1kg',
      category: 'Food',
      itemHsn: '10006837',
      itemCode: '8901058895773',
      purchasePrice: '--',
      purchaseTaxType: 'Included',
      salePrice: '170',
      saleTaxType: 'Included',
      discount: '--',
      discountType: 'Percentage',
      taxRate: 'None',
      openingQuantity: '--',
      atPrice: '--',
      asOfDate: '09/10/2025',
      minStock: '--',
      location: '--'
    },
    {
      id: '3',
      itemName: 'dfghj',
      category: 'ff',
      itemHsn: '555',
      itemCode: '38642814358',
      purchasePrice: 'NA',
      purchaseTaxType: 'NA',
      salePrice: '',
      saleTaxType: 'Excluded',
      discount: '--',
      discountType: 'Percentage',
      taxRate: 'None',
      openingQuantity: 'NA',
      atPrice: 'NA',
      asOfDate: 'NA',
      minStock: 'NA',
      location: 'NA'
    },
    {
      id: '4',
      itemName: 'Sample Item',
      category: 'ff',
      itemHsn: '--',
      itemCode: '--',
      purchasePrice: '--',
      purchaseTaxType: 'Excluded',
      salePrice: '100',
      saleTaxType: 'Excluded',
      discount: '--',
      discountType: 'Percentage',
      taxRate: 'None',
      openingQuantity: '--',
      atPrice: '--',
      asOfDate: '09/10/2025',
      minStock: '--',
      location: '--'
    },
    {
      id: '5',
      itemName: 'dfdd',
      category: 'ff',
      itemHsn: '44',
      itemCode: '38677366752',
      purchasePrice: '333',
      purchaseTaxType: 'Excluded',
      salePrice: '433',
      saleTaxType: 'Excluded',
      discount: '33',
      discountType: 'Percentage',
      taxRate: 'None',
      openingQuantity: '--',
      atPrice: '--',
      asOfDate: '09/10/2025',
      minStock: '--',
      location: '--'
    }
  ])

  const filteredItems = items.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemHsn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId])
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId))
    }
  }

  const handleItemUpdate = (itemId: string, field: string, value: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, [field]: value } : item
    ))
  }

  const handleUpdateTaxSlab = () => {
    setShowAttentionModal(true)
  }

  const handleContinue = () => {
    setShowAttentionModal(false)
    // Handle the actual update logic here
    console.log('Updating items with options:', attentionOptions)
  }

  const getUpdateCounts = () => {
    const pricingUpdates = selectedItems.length
    const stockUpdates = selectedItems.filter(id => {
      const item = items.find(i => i.id === id)
      return item && (item.openingQuantity !== '--' || item.atPrice !== '--')
    }).length
    const itemInfoUpdates = selectedItems.filter(id => {
      const item = items.find(i => i.id === id)
      return item && (item.category !== '--' || item.itemHsn !== '--')
    }).length

    return { pricingUpdates, stockUpdates, itemInfoUpdates }
  }

  const { pricingUpdates, stockUpdates, itemInfoUpdates } = getUpdateCounts()

  const renderPricingTable = () => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-12">#</TableHead>
            <TableHead className="min-w-[200px]">
              <div className="flex items-center gap-1">
                ITEM NAME*
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[120px]">
              <div className="flex items-center gap-1">
                CATEGORY
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <div className="flex items-center gap-1">
                ITEM HSN
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[120px]">
              <div className="flex items-center gap-1">
                PURCHASE PRICE
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <div className="flex items-center gap-1">
                TAX TYPE
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[120px]">
              <div className="flex items-center gap-1">
                SALE PRICE
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <div className="flex items-center gap-1">
                TAX TYPE
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <div className="flex items-center gap-1">
                DISCOUNT
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[120px]">
              <div className="flex items-center gap-1">
                DISCOUNT TYPE
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <div className="flex items-center gap-1">
                TAX RATE
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                />
              </TableCell>
              <TableCell className="text-sm">{index + 1}</TableCell>
              <TableCell className="min-w-[200px]">
                <Input
                  value={item.itemName}
                  onChange={(e) => handleItemUpdate(item.id, 'itemName', e.target.value)}
                  className="text-sm"
                />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Select 
                  value={item.category} 
                  onValueChange={(value) => handleItemUpdate(item.id, 'category', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="--">--</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="ff">ff</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="min-w-[100px]">
                <Input
                  value={item.itemHsn}
                  onChange={(e) => handleItemUpdate(item.id, 'itemHsn', e.target.value)}
                  className="text-sm"
                />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Input
                  value={item.purchasePrice}
                  onChange={(e) => handleItemUpdate(item.id, 'purchasePrice', e.target.value)}
                  className="text-sm"
                  placeholder="₹---"
                />
              </TableCell>
              <TableCell className="min-w-[100px]">
                <Select 
                  value={item.purchaseTaxType} 
                  onValueChange={(value) => handleItemUpdate(item.id, 'purchaseTaxType', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Included">Included</SelectItem>
                    <SelectItem value="Excluded">Excluded</SelectItem>
                    <SelectItem value="NA">NA</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Input
                  value={item.salePrice}
                  onChange={(e) => handleItemUpdate(item.id, 'salePrice', e.target.value)}
                  className="text-sm"
                  placeholder="₹"
                />
              </TableCell>
              <TableCell className="min-w-[100px]">
                <Select 
                  value={item.saleTaxType} 
                  onValueChange={(value) => handleItemUpdate(item.id, 'saleTaxType', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Included">Included</SelectItem>
                    <SelectItem value="Excluded">Excluded</SelectItem>
                    <SelectItem value="NA">NA</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="min-w-[100px]">
                <Input
                  value={item.discount}
                  onChange={(e) => handleItemUpdate(item.id, 'discount', e.target.value)}
                  className="text-sm"
                  placeholder="--"
                />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Select 
                  value={item.discountType} 
                  onValueChange={(value) => handleItemUpdate(item.id, 'discountType', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                    <SelectItem value="Fixed">Fixed</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="min-w-[100px]">
                <Select 
                  value={item.taxRate} 
                  onValueChange={(value) => handleItemUpdate(item.id, 'taxRate', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="GST@0%">GST@0%</SelectItem>
                    <SelectItem value="GST@5%">GST@5%</SelectItem>
                    <SelectItem value="GST@12%">GST@12%</SelectItem>
                    <SelectItem value="GST@18%">GST@18%</SelectItem>
                    <SelectItem value="GST@28%">GST@28%</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  const renderStockTable = () => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-12">#</TableHead>
            <TableHead className="min-w-[200px]">
              <div className="flex items-center gap-1">
                ITEM NAME*
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[120px]">
              <div className="flex items-center gap-1">
                OPENING QUANT...
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <div className="flex items-center gap-1">
                AT PRICE
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[120px]">
              <div className="flex items-center gap-1">
                AS OF DATE
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[120px]">
              <div className="flex items-center gap-1">
                MIN. STOCK TO...
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <div className="flex items-center gap-1">
                LOCATION
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                />
              </TableCell>
              <TableCell className="text-sm">{index + 1}</TableCell>
              <TableCell className="min-w-[200px]">
                <Input
                  value={item.itemName}
                  onChange={(e) => handleItemUpdate(item.id, 'itemName', e.target.value)}
                  className="text-sm"
                />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Input
                  value={item.openingQuantity}
                  onChange={(e) => handleItemUpdate(item.id, 'openingQuantity', e.target.value)}
                  className="text-sm"
                  placeholder="--"
                />
              </TableCell>
              <TableCell className="min-w-[100px]">
                <Input
                  value={item.atPrice}
                  onChange={(e) => handleItemUpdate(item.id, 'atPrice', e.target.value)}
                  className="text-sm"
                  placeholder="₹---"
                />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Input
                  type="date"
                  value={item.asOfDate}
                  onChange={(e) => handleItemUpdate(item.id, 'asOfDate', e.target.value)}
                  className="text-sm"
                />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Input
                  value={item.minStock}
                  onChange={(e) => handleItemUpdate(item.id, 'minStock', e.target.value)}
                  className="text-sm"
                  placeholder="--"
                />
              </TableCell>
              <TableCell className="min-w-[100px]">
                <Input
                  value={item.location}
                  onChange={(e) => handleItemUpdate(item.id, 'location', e.target.value)}
                  className="text-sm"
                  placeholder="--"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  const renderItemInfoTable = () => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-12">#</TableHead>
            <TableHead className="min-w-[200px]">
              <div className="flex items-center gap-1">
                ITEM NAME*
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[120px]">
              <div className="flex items-center gap-1">
                CATEGORY
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <div className="flex items-center gap-1">
                ITEM HSN
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="min-w-[120px]">
              <div className="flex items-center gap-1">
                ITEM CODE
                <Filter className="h-3 w-3" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                />
              </TableCell>
              <TableCell className="text-sm">{index + 1}</TableCell>
              <TableCell className="min-w-[200px]">
                <Input
                  value={item.itemName}
                  onChange={(e) => handleItemUpdate(item.id, 'itemName', e.target.value)}
                  className="text-sm"
                />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Select 
                  value={item.category} 
                  onValueChange={(value) => handleItemUpdate(item.id, 'category', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="--">--</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="ff">ff</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="min-w-[100px]">
                <Input
                  value={item.itemHsn}
                  onChange={(e) => handleItemUpdate(item.id, 'itemHsn', e.target.value)}
                  className="text-sm"
                />
              </TableCell>
              <TableCell className="min-w-[120px]">
                <Input
                  value={item.itemCode}
                  onChange={(e) => handleItemUpdate(item.id, 'itemCode', e.target.value)}
                  className="text-sm"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Bulk Update Items</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedItems.length} items selected
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button 
            onClick={handleUpdateTaxSlab}
            className="w-full sm:w-auto text-white"
          >
            Update Tax Slab
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by item name / HSN Code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <RadioGroup value={activeTab} onValueChange={setActiveTab} className="flex flex-row">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pricing" id="pricing" />
              <Label htmlFor="pricing" className="text-sm">Pricing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stock" id="stock" />
              <Label htmlFor="stock" className="text-sm">Stock</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="item-info" id="item-info" />
              <Label htmlFor="item-info" className="text-sm">Item Information</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Table Content */}
      <Card>
        <CardContent className="p-0">
          {activeTab === 'pricing' && renderPricingTable()}
          {activeTab === 'stock' && renderStockTable()}
          {activeTab === 'item-info' && renderItemInfoTable()}
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 bg-muted/50 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="text-sm text-muted-foreground">
            Pricing - {pricingUpdates} Updates, Stock - {stockUpdates} Updates, Item Information - {itemInfoUpdates} Updates
          </div>
          <Button className="w-full sm:w-auto text-white">
            Update
          </Button>
        </div>
      </div>

      {/* Attention Modal */}
      <Dialog open={showAttentionModal} onOpenChange={setShowAttentionModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Attention!
            </DialogTitle>
            <DialogDescription className="text-base">
              Some of your items have sale/purchase price inclusive of tax. Please select carefully how do you want to handle updating these items.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Update Sale Price Option */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="update-sale-price"
                  checked={attentionOptions.updateSalePrice}
                  onCheckedChange={(checked) => 
                    setAttentionOptions(prev => ({ ...prev, updateSalePrice: checked as boolean }))
                  }
                />
                <Label htmlFor="update-sale-price" className="text-sm font-medium">
                  Update Sale price according to new tax rates
                </Label>
              </div>
              {attentionOptions.updateSalePrice && (
                <div className="ml-6 p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium mb-2">Sample Values:</div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div>Old tax rate: 28%</div>
                      <div>Old sale price (Tax Inclusive): 100</div>
                      <div>Old sale price (Tax Exclusive): 78.125</div>
                    </div>
                    <div>
                      <div>New tax rate: 18%</div>
                      <div>New sale price (Tax Inclusive): 92.187</div>
                      <div>New sale price (Tax Exclusive): 78.125</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Update MRP Option */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="update-mrp"
                  checked={attentionOptions.updateMRP}
                  onCheckedChange={(checked) => 
                    setAttentionOptions(prev => ({ ...prev, updateMRP: checked as boolean }))
                  }
                />
                <Label htmlFor="update-mrp" className="text-sm font-medium">
                  Update MRP according to new tax rates
                </Label>
              </div>
              {attentionOptions.updateMRP && (
                <div className="ml-6 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="update-batch-mrp"
                      checked={attentionOptions.updateBatchMRPs}
                      onCheckedChange={(checked) => 
                        setAttentionOptions(prev => ({ ...prev, updateBatchMRPs: checked as boolean }))
                      }
                    />
                    <Label htmlFor="update-batch-mrp" className="text-sm">
                      Also Update Batch MRPs
                    </Label>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium mb-2">Sample Values:</div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div>Old tax rate: 28%</div>
                        <div>Old MRP: 100</div>
                      </div>
                      <div>
                        <div>New tax rate: 18%</div>
                        <div>New MRP: 92.187</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Update Purchase Price Option */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="update-purchase-price"
                  checked={attentionOptions.updatePurchasePrice}
                  onCheckedChange={(checked) => 
                    setAttentionOptions(prev => ({ ...prev, updatePurchasePrice: checked as boolean }))
                  }
                />
                <Label htmlFor="update-purchase-price" className="text-sm font-medium">
                  Update Purchase Price according to new Tax rates
                </Label>
              </div>
              {attentionOptions.updatePurchasePrice && (
                <div className="ml-6 p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium mb-2">Sample Values:</div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div>Old tax rate: 28%</div>
                      <div>Old purchase price (Tax Inclusive): 100</div>
                      <div>Old purchase price (Tax Exclusive): 78.125</div>
                    </div>
                    <div>
                      <div>New tax rate: 18%</div>
                      <div>New purchase price (Tax Inclusive): 92.187</div>
                      <div>New purchase price (Tax Exclusive): 78.125</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAttentionModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleContinue} className="text-white">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
