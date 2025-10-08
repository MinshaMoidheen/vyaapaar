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
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Import Items From Barcode
            </Button>
          </div>
          
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Page Title and Customize Table Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Add Items</h1>
        </div>

        {/* Search in sheet */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search in sheet"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-20"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xs">[Ctrl+F]</span>
        </div>

        {/* Items Table */}
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[50px] text-muted-foreground font-medium">#</TableHead>
                    <TableHead className="w-[150px] text-muted-foreground font-medium">ITEM CODE</TableHead>
                    <TableHead className="w-[250px] text-muted-foreground font-medium">ITEM NAME*</TableHead>
                    <TableHead className="w-[150px] text-muted-foreground font-medium">CATEGORY</TableHead>
                    <TableHead className="w-[100px] text-muted-foreground font-medium">HSN CODE</TableHead>
                    <TableHead className="w-[150px] text-muted-foreground font-medium">DEFAULT MRP(₹)</TableHead>
                    <TableHead className="w-[150px] text-muted-foreground font-medium">SALE PRICE(₹)</TableHead>
                    <TableHead className="w-[100px] text-muted-foreground font-medium">TAX(%)</TableHead>
                    <TableHead className="w-[100px] text-muted-foreground font-medium">BASE UNIT</TableHead>
                    <TableHead className="w-[150px] text-muted-foreground font-medium">OPENING STOCK</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-foreground">{index + 1}</TableCell>
                      <TableCell>
                        <div className="relative">
                          <Barcode className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={item.itemCode}
                            onChange={(e) => handleInputChange(item.id, 'itemCode', e.target.value)}
                            placeholder="Enter Barcode"
                            className="pl-8 h-8"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.itemName}
                          onChange={(e) => handleInputChange(item.id, 'itemName', e.target.value)}
                          placeholder="E.g. India Gate Basmati Rice, 10kg"
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.category}
                          onChange={(e) => handleInputChange(item.id, 'category', e.target.value)}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.hsnCode}
                          onChange={(e) => handleInputChange(item.id, 'hsnCode', e.target.value)}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.defaultMrp}
                          onChange={(e) => handleInputChange(item.id, 'defaultMrp', parseFloat(e.target.value) || '')}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.salePrice}
                          onChange={(e) => handleInputChange(item.id, 'salePrice', parseFloat(e.target.value) || '')}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.tax}
                          onChange={(e) => handleInputChange(item.id, 'tax', parseFloat(e.target.value) || '')}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.baseUnit}
                          onChange={(e) => handleInputChange(item.id, 'baseUnit', e.target.value)}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.openingStock}
                          onChange={(e) => handleInputChange(item.id, 'openingStock', parseFloat(e.target.value) || '')}
                          className="h-8"
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
          <Button variant="outline" onClick={handleAddItem} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Item Row
          </Button>
        </div>

        {/* Bottom instructional and action buttons */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span>Learn how to automatically add items using barcode</span>
            <Button variant="link" className="flex items-center gap-1 p-0 h-auto text-primary">
              <PlayCircle className="h-4 w-4" /> Watch Video
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleSaveAndNew}>
              Save & New <span className="ml-2 text-xs text-muted-foreground">[Ctrl+N]</span>
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">
              Save <span className="ml-2 text-xs text-primary-foreground">[Ctrl+S]</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
