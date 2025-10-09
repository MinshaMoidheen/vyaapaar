'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Download, FileSpreadsheet } from 'lucide-react'

interface ExportItem {
  id: string
  name: string
  category: string
  price: number
  stock: number
  unit: string
  gst: number
  hsn: string
}

const dummyItems: ExportItem[] = [
  { id: '1', name: 'Laptop', category: 'Electronics', price: 50000, stock: 10, unit: 'PCS', gst: 18, hsn: '8471' },
  { id: '2', name: 'Mouse', category: 'Electronics', price: 500, stock: 50, unit: 'PCS', gst: 18, hsn: '8471' },
  { id: '3', name: 'Keyboard', category: 'Electronics', price: 1500, stock: 25, unit: 'PCS', gst: 18, hsn: '8471' },
  { id: '4', name: 'Monitor', category: 'Electronics', price: 15000, stock: 15, unit: 'PCS', gst: 18, hsn: '8471' },
  { id: '5', name: 'Chair', category: 'Furniture', price: 5000, stock: 20, unit: 'PCS', gst: 12, hsn: '9401' },
  { id: '6', name: 'Table', category: 'Furniture', price: 8000, stock: 12, unit: 'PCS', gst: 12, hsn: '9401' },
  { id: '7', name: 'Pen', category: 'Stationery', price: 10, stock: 1000, unit: 'PCS', gst: 5, hsn: '9608' },
  { id: '8', name: 'Notebook', category: 'Stationery', price: 50, stock: 200, unit: 'PCS', gst: 5, hsn: '4820' },
]

export default function ExportItemsPage() {
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isExporting, setIsExporting] = useState(false)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(dummyItems.map(item => item.id))
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

  const exportToExcel = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to export.')
      return
    }

    setIsExporting(true)
    
    try {
      // Filter selected items
      const itemsToExport = dummyItems.filter(item => selectedItems.includes(item.id))
      
      // Create CSV content
      const headers = ['Item Name', 'Category', 'Price', 'Stock', 'Unit', 'GST %', 'HSN Code']
      const csvContent = [
        headers.join(','),
        ...itemsToExport.map(item => [
          `"${item.name}"`,
          `"${item.category}"`,
          item.price,
          item.stock,
          `"${item.unit}"`,
          item.gst,
          `"${item.hsn}"`
        ].join(','))
      ].join('\n')

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `items_export_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Reset selection
      setSelectedItems([])
    } catch (error) {
      console.error('Error exporting items:', error)
      alert('Error exporting items. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const isAllSelected = selectedItems.length === dummyItems.length
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < dummyItems.length

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold">Export Items</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={exportToExcel}
              disabled={selectedItems.length === 0 || isExporting}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm md:text-base flex items-center gap-2"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Export to Excel
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Instructions */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start space-x-3">
              <FileSpreadsheet className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm md:text-base font-medium text-foreground mb-2">
                  Export Items to Excel
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Select the items you want to export to an Excel file. The exported file will include item details like name, category, price, stock, unit, GST percentage, and HSN code.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selection Summary */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate
                  }}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="text-sm md:text-base font-medium">
                  Select All ({selectedItems.length} of {dummyItems.length} selected)
                </Label>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {selectedItems.length > 0 && `${selectedItems.length} items selected for export`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Items List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-12"></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Item Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Unit</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">GST %</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">HSN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {dummyItems.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Label htmlFor={`item-${item.id}`} className="text-sm md:text-base font-medium cursor-pointer">
                          {item.name}
                        </Label>
                      </td>
                      <td className="px-4 py-3 text-sm md:text-base text-muted-foreground">{item.category}</td>
                      <td className="px-4 py-3 text-right text-sm md:text-base text-foreground">
                        ₹{item.price.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-right text-sm md:text-base text-foreground">{item.stock}</td>
                      <td className="px-4 py-3 text-center text-sm md:text-base text-muted-foreground">{item.unit}</td>
                      <td className="px-4 py-3 text-center text-sm md:text-base text-muted-foreground">{item.gst}%</td>
                      <td className="px-4 py-3 text-center text-sm md:text-base text-muted-foreground">{item.hsn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Export Button (Bottom) */}
        <div className="flex justify-center">
          <Button
            onClick={exportToExcel}
            disabled={selectedItems.length === 0 || isExporting}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base md:text-lg flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Exporting Items...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Export {selectedItems.length > 0 ? `${selectedItems.length} ` : ''}Items to Excel
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
