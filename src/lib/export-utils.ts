// Utility functions for exporting data

export interface ExportItem {
  id: string
  name: string
  category: string
  price: number
  stock: number
  unit: string
  gst: number
  hsn: string
}

// Sample data for export
export const getSampleItems = (): ExportItem[] => [
  { id: '1', name: 'Laptop', category: 'Electronics', price: 50000, stock: 10, unit: 'PCS', gst: 18, hsn: '8471' },
  { id: '2', name: 'Mouse', category: 'Electronics', price: 500, stock: 50, unit: 'PCS', gst: 18, hsn: '8471' },
  { id: '3', name: 'Keyboard', category: 'Electronics', price: 1500, stock: 25, unit: 'PCS', gst: 18, hsn: '8471' },
  { id: '4', name: 'Monitor', category: 'Electronics', price: 15000, stock: 15, unit: 'PCS', gst: 18, hsn: '8471' },
  { id: '5', name: 'Chair', category: 'Furniture', price: 5000, stock: 20, unit: 'PCS', gst: 12, hsn: '9401' },
  { id: '6', name: 'Table', category: 'Furniture', price: 8000, stock: 12, unit: 'PCS', gst: 12, hsn: '9401' },
  { id: '7', name: 'Pen', category: 'Stationery', price: 10, stock: 1000, unit: 'PCS', gst: 5, hsn: '9608' },
  { id: '8', name: 'Notebook', category: 'Stationery', price: 50, stock: 200, unit: 'PCS', gst: 5, hsn: '4820' },
  { id: '9', name: 'Printer', category: 'Electronics', price: 12000, stock: 8, unit: 'PCS', gst: 18, hsn: '8443' },
  { id: '10', name: 'Desk Lamp', category: 'Furniture', price: 2500, stock: 30, unit: 'PCS', gst: 12, hsn: '9405' },
]

export const exportItemsToExcel = (items: ExportItem[] = getSampleItems()) => {
  try {
    // Create CSV content
    const headers = ['Item Name', 'Category', 'Price', 'Stock', 'Unit', 'GST %', 'HSN Code']
    const csvContent = [
      headers.join(','),
      ...items.map(item => [
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
    
    return true
  } catch (error) {
    console.error('Error exporting items:', error)
    return false
  }
}
