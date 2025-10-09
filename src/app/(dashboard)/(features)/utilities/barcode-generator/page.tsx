'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Eye, 
  Trash2, 
  Info, 
  Printer,
  Download,
  Settings
} from 'lucide-react'

interface BarcodeItem {
  id: string
  itemName: string
  itemCode: string
  noOfLabels: number
  header: string
  line1: string
  line2: string
}

export default function BarcodeGeneratorPage() {
  const [formData, setFormData] = useState({
    itemName: '',
    itemCode: '',
    noOfLabels: 0,
    header: 'My Company',
    line1: '',
    line2: ''
  })
  
  const [barcodeItems, setBarcodeItems] = useState<BarcodeItem[]>([])
  const [selectedPrinter, setSelectedPrinter] = useState('Regular Printer')
  const [selectedSize, setSelectedSize] = useState('65 Labels (38 * 21mm)')

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddBarcode = () => {
    if (!formData.itemName || !formData.itemCode || formData.noOfLabels <= 0) {
      return
    }

    const newItem: BarcodeItem = {
      id: Date.now().toString(),
      ...formData
    }

    setBarcodeItems(prev => [...prev, newItem])
    setFormData({
      itemName: '',
      itemCode: '',
      noOfLabels: 0,
      header: 'My Company',
      line1: '',
      line2: ''
    })
  }

  const handleDeleteItem = (id: string) => {
    setBarcodeItems(prev => prev.filter(item => item.id !== id))
  }

  const totalLabels = barcodeItems.reduce((sum, item) => sum + item.noOfLabels, 0)
  const totalPages = Math.ceil(totalLabels / 65)

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Barcode Generator</h1>
          <Info className="h-5 w-5 text-muted-foreground" />
        </div>
        {/* <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div> */}
      </div>

      {/* Printer and Size Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="printer">Printer</Label>
          <Select value={selectedPrinter} onValueChange={setSelectedPrinter}>
            <SelectTrigger>
              <SelectValue placeholder="Select printer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Regular Printer">Regular Printer</SelectItem>
              <SelectItem value="Thermal Printer">Thermal Printer</SelectItem>
              <SelectItem value="Laser Printer">Laser Printer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="65 Labels (38 * 21mm)">65 Labels (38 * 21mm)</SelectItem>
              <SelectItem value="30 Labels (50 * 30mm)">30 Labels (50 * 30mm)</SelectItem>
              <SelectItem value="20 Labels (70 * 40mm)">20 Labels (70 * 40mm)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Barcode Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">
                  Item Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="itemName"
                  placeholder="Enter Item Name"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange('itemName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="itemCode">
                  Item Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="itemCode"
                  placeholder="Assign Code"
                  value={formData.itemCode}
                  onChange={(e) => handleInputChange('itemCode', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="noOfLabels">
                  No of Labels <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="noOfLabels"
                  type="number"
                  placeholder="0"
                  value={formData.noOfLabels}
                  onChange={(e) => handleInputChange('noOfLabels', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="header">Header</Label>
                <Input
                  id="header"
                  placeholder="Enter Header"
                  value={formData.header}
                  onChange={(e) => handleInputChange('header', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="line1">Line 1</Label>
                <Input
                  id="line1"
                  placeholder="Enter Line 1"
                  value={formData.line1}
                  onChange={(e) => handleInputChange('line1', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="line2">Line 2</Label>
                <Input
                  id="line2"
                  placeholder="Enter Line 2"
                  value={formData.line2}
                  onChange={(e) => handleInputChange('line2', e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={handleAddBarcode}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={!formData.itemName || !formData.itemCode || formData.noOfLabels <= 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add for Barcode
            </Button>
          </CardContent>
        </Card>

        {/* Barcode Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <div className="space-y-4">
                <div className="text-sm font-medium text-muted-foreground">
                  {formData.header || 'Header'}
                </div>
                
                {/* Barcode Placeholder */}
                <div className="bg-gray-100 h-16 flex items-center justify-center rounded">
                  <div className="text-xs text-muted-foreground">Barcode Preview</div>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="font-medium">{formData.itemCode || 'Itemcode'}</div>
                  <div>{formData.line1 || 'Line1'}</div>
                  <div>{formData.line2 || 'Line2'}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Items for Barcode Generation</CardTitle>
        </CardHeader>
        <CardContent>
          {barcodeItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-2">
                Added items for Barcode generation will appear here
              </div>
              <div className="text-xs text-muted-foreground">
                Add items using the form above to get started
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs md:text-sm">Item Name</TableHead>
                    <TableHead className="text-xs md:text-sm">No of Labels</TableHead>
                    <TableHead className="text-xs md:text-sm">Header</TableHead>
                    <TableHead className="text-xs md:text-sm">Line 1</TableHead>
                    <TableHead className="text-xs md:text-sm">Line 2</TableHead>
                    <TableHead className="text-xs md:text-sm text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barcodeItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-xs md:text-sm font-medium">
                        {item.itemName}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        <Badge variant="secondary">{item.noOfLabels}</Badge>
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">{item.header}</TableCell>
                      <TableCell className="text-xs md:text-sm">{item.line1}</TableCell>
                      <TableCell className="text-xs md:text-sm">{item.line2}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 bg-muted/50 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="text-sm text-muted-foreground">
            You will need <span className="font-semibold">{totalPages}</span> pages for printing
          </div>
          <div className="text-sm text-muted-foreground">
            Paper Size: A4
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
            <Printer className="w-4 h-4 mr-2" />
            Generate
          </Button>
        </div>
      </div>
    </div>
  )
}
