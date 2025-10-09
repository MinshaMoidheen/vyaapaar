'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  ArrowLeft,
  Search,
  Settings,
  Barcode,
  Plus,
  PlayCircle,
  Wifi,
  X
} from 'lucide-react'

interface Item {
  id: number
  itemCode: string
  itemName: string
  category: string
  hsnCode: string
  defaultMrp: number | string
  salePrice: number | string
  tax: number | string
  baseUnit: string
  openingStock: number | string
}

export default function ImportItemsFromBarcodePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      itemCode: '',
      itemName: '',
      category: '',
      hsnCode: '',
      defaultMrp: '',
      salePrice: '',
      tax: '',
      baseUnit: '',
      openingStock: '',
    },
  ])

  const handleInputChange = (id: number, field: keyof Item, value: string | number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length + 1,
        itemCode: '',
        itemName: '',
        category: '',
        hsnCode: '',
        defaultMrp: '',
        salePrice: '',
        tax: '',
        baseUnit: '',
        openingStock: '',
      },
    ])
  }

  const handleSave = () => {
    console.log('Saving items:', items)
    // Logic to save items
  }

  const handleSaveAndNew = () => {
    console.log('Saving items and adding new:', items)
    setItems([
      {
        id: 1,
        itemCode: '',
        itemName: '',
        category: '',
        hsnCode: '',
        defaultMrp: '',
        salePrice: '',
        tax: '',
        baseUnit: '',
        openingStock: '',
      },
    ])
    // Logic to save items and reset form
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header Bar */}
      <div className="border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Import Items From Barcode</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Page Title and Customize Table Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Add Items</h1>
        </div>

        {/* Search in sheet */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search in sheet"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-16 md:pr-20"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xs hidden sm:inline">[Ctrl+F]</span>
        </div>

        {/* Items Table */}
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[40px] md:w-[50px] text-muted-foreground font-medium text-xs md:text-sm">#</TableHead>
                    <TableHead className="w-[120px] md:w-[150px] text-muted-foreground font-medium text-xs md:text-sm">ITEM CODE</TableHead>
                    <TableHead className="w-[200px] md:w-[250px] text-muted-foreground font-medium text-xs md:text-sm">ITEM NAME*</TableHead>
                    <TableHead className="w-[120px] md:w-[150px] text-muted-foreground font-medium text-xs md:text-sm hidden sm:table-cell">CATEGORY</TableHead>
                    <TableHead className="w-[80px] md:w-[100px] text-muted-foreground font-medium text-xs md:text-sm hidden md:table-cell">HSN CODE</TableHead>
                    <TableHead className="w-[120px] md:w-[150px] text-muted-foreground font-medium text-xs md:text-sm hidden lg:table-cell">DEFAULT MRP(₹)</TableHead>
                    <TableHead className="w-[120px] md:w-[150px] text-muted-foreground font-medium text-xs md:text-sm">SALE PRICE(₹)</TableHead>
                    <TableHead className="w-[80px] md:w-[100px] text-muted-foreground font-medium text-xs md:text-sm hidden sm:table-cell">TAX(%)</TableHead>
                    <TableHead className="w-[80px] md:w-[100px] text-muted-foreground font-medium text-xs md:text-sm hidden md:table-cell">BASE UNIT</TableHead>
                    <TableHead className="w-[120px] md:w-[150px] text-muted-foreground font-medium text-xs md:text-sm hidden lg:table-cell">OPENING STOCK</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-foreground text-xs md:text-sm">{index + 1}</TableCell>
                      <TableCell>
                        <div className="relative">
                          <Barcode className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                          <Input
                            value={item.itemCode}
                            onChange={(e) => handleInputChange(item.id, 'itemCode', e.target.value)}
                            placeholder="Enter Barcode"
                            className="pl-6 md:pl-8 h-7 md:h-8 text-xs md:text-sm"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.itemName}
                          onChange={(e) => handleInputChange(item.id, 'itemName', e.target.value)}
                          placeholder="E.g. India Gate Basmati Rice, 10kg"
                          className="h-7 md:h-8 text-xs md:text-sm"
                        />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Input
                          value={item.category}
                          onChange={(e) => handleInputChange(item.id, 'category', e.target.value)}
                          className="h-7 md:h-8 text-xs md:text-sm"
                        />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Input
                          value={item.hsnCode}
                          onChange={(e) => handleInputChange(item.id, 'hsnCode', e.target.value)}
                          className="h-7 md:h-8 text-xs md:text-sm"
                        />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Input
                          type="number"
                          value={item.defaultMrp}
                          onChange={(e) => handleInputChange(item.id, 'defaultMrp', parseFloat(e.target.value) || '')}
                          className="h-7 md:h-8 text-xs md:text-sm"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.salePrice}
                          onChange={(e) => handleInputChange(item.id, 'salePrice', parseFloat(e.target.value) || '')}
                          className="h-7 md:h-8 text-xs md:text-sm"
                        />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Input
                          type="number"
                          value={item.tax}
                          onChange={(e) => handleInputChange(item.id, 'tax', parseFloat(e.target.value) || '')}
                          className="h-7 md:h-8 text-xs md:text-sm"
                        />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Input
                          value={item.baseUnit}
                          onChange={(e) => handleInputChange(item.id, 'baseUnit', e.target.value)}
                          className="h-7 md:h-8 text-xs md:text-sm"
                        />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Input
                          type="number"
                          value={item.openingStock}
                          onChange={(e) => handleInputChange(item.id, 'openingStock', parseFloat(e.target.value) || '')}
                          className="h-7 md:h-8 text-xs md:text-sm"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add Item Row Button */}
        <div className="flex justify-start">
          <Button variant="outline" onClick={handleAddItem} className="flex items-center gap-2 text-sm md:text-base">
            <Plus className="h-4 w-4" /> Add Item Row
          </Button>
        </div>

        {/* Bottom instructional and action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 md:mt-8 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 text-muted-foreground">
            <span className="text-sm md:text-base">Learn how to automatically add items using barcode</span>
            <Button variant="link" className="flex items-center gap-1 p-0 h-auto text-primary text-sm md:text-base">
              <PlayCircle className="h-4 w-4" /> Watch Video
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button variant="outline" onClick={handleSaveAndNew} className="w-full sm:w-auto text-sm md:text-base">
              Save & New <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">[Ctrl+N]</span>
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground w-full sm:w-auto text-sm md:text-base">
              Save <span className="ml-2 text-xs text-primary-foreground hidden sm:inline">[Ctrl+S]</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
