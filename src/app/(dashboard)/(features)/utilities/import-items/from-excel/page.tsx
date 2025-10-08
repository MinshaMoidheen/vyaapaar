'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft,
  Download,
  Upload,
  FileSpreadsheet,
  Plus,
  Settings
} from 'lucide-react'

export default function ImportItemsFromExcelPage() {
  const router = useRouter()
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log('File dropped:', e.dataTransfer.files[0])
    }
  }

  const sampleData = [
    { itemCode: 'a101', itemName: 'Item 1', hsn: 'H001', salePrice: 5, purchasePrice: 4, openingStock: 20, minStock: 5, location: 'Store 1', taxRate: 'IGST@0%', taxInclusive: 'N' },
    { itemCode: 'a102', itemName: 'Item 2', hsn: 'H002', salePrice: 10, purchasePrice: 8, openingStock: 40, minStock: 10, location: 'Store 2', taxRate: 'IGST@0%', taxInclusive: 'N' },
    { itemCode: 'a103', itemName: 'Item 3', hsn: 'H003', salePrice: 15, purchasePrice: 12, openingStock: 60, minStock: 15, location: 'Store 3', taxRate: 'IGST@0%', taxInclusive: 'N' },
    { itemCode: 'a104', itemName: 'Item 4', hsn: 'H004', salePrice: 20, purchasePrice: 16, openingStock: 80, minStock: 20, location: 'Store 4', taxRate: 'IGST@0%', taxInclusive: 'N' },
    { itemCode: 'a105', itemName: 'Item 5', hsn: 'H005', salePrice: 25, purchasePrice: 20, openingStock: 100, minStock: 25, location: 'Store 5', taxRate: 'IGST@0%', taxInclusive: 'N' },
    { itemCode: 'a106', itemName: 'Item 6', hsn: 'H006', salePrice: 30, purchasePrice: 24, openingStock: 120, minStock: 30, location: 'Store 6', taxRate: 'IGST@0%', taxInclusive: 'N' },
    { itemCode: 'a107', itemName: 'Item 7', hsn: 'H007', salePrice: 35, purchasePrice: 28, openingStock: 140, minStock: 35, location: 'Store 7', taxRate: 'IGST@0%', taxInclusive: 'N' },
  ]

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
              Import Items From Excel File
            </Button>
          </div>
          {/* <div className="flex items-center space-x-2">
            <Button 
              onClick={() => router.push('/sales/add-sale')}
              className="text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Sale
            </Button>
            <Button 
              onClick={() => router.push('/purchase/bills/add')}
              className="text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Purchase
            </Button>
           
          </div> */}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Steps */}
          <div className="space-y-6">
             <h2 className="text-2xl font-bold text-foreground mb-6">Steps to Import</h2>
            
            {/* Step 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">STEP 1:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <p className="text-muted-foreground">
                   Create an Excel file with the following format.
                 </p>
                <Button className="text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download Sample
                </Button>
                
                {/* Sample Excel Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                     <thead className="bg-muted">
                       <tr>
                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">Item Code</th>
                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">Item Name</th>
                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">HSN</th>
                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">Sale Price</th>
                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">Purchase Price</th>
                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">Opening Stock Quantity</th>
                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">Minimum Stock Quantity</th>
                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">Item Location</th>
                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">Tax Rate</th>
                         <th className="px-3 py-2 text-left font-medium text-muted-foreground">Tax Inclusive</th>
                       </tr>
                     </thead>
                     <tbody>
                       {sampleData.map((item, index) => (
                         <tr key={index} className="border-t border-border">
                           <td className="px-3 py-2 text-foreground">{item.itemCode}</td>
                           <td className="px-3 py-2 text-foreground">{item.itemName}</td>
                           <td className="px-3 py-2 text-foreground">{item.hsn}</td>
                           <td className="px-3 py-2 text-foreground">{item.salePrice}</td>
                           <td className="px-3 py-2 text-foreground">{item.purchasePrice}</td>
                           <td className="px-3 py-2 text-foreground">{item.openingStock}</td>
                           <td className="px-3 py-2 text-foreground">{item.minStock}</td>
                           <td className="px-3 py-2 text-foreground">{item.location}</td>
                           <td className="px-3 py-2 text-foreground">{item.taxRate}</td>
                           <td className="px-3 py-2 text-foreground">{item.taxInclusive}</td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">STEP 2:</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground mb-4">
                   Upload the file (xlsx or xls) by clicking on the Upload File button below.
                 </p>
                 <div className="flex items-center justify-center w-16 h-16 rounded-lg">
                   <Upload className="h-8 w-8 text-primary" />
                 </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">STEP 3:</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground">
                   Verify the items from the file & complete the import.
                 </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - File Upload */}
          <div className="space-y-6">
             <h3 className="text-lg font-semibold text-foreground">Upload your .xls/.xlsx (excel sheet)</h3>
            
            <div
               className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                 dragActive 
                   ? 'border-primary' 
                   : 'border-border hover:border-primary/50'
               }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
               <div className="flex flex-col items-center space-y-4">
                 <div className="w-16 h-16 rounded-full flex items-center justify-center">
                   <Upload className="h-8 w-8 text-primary" />
                 </div>
                 <div className="space-y-2">
                   <p className="text-lg font-medium text-foreground">Drag & Drop files here</p>
                   <p className="text-muted-foreground">or</p>
                 </div>
                <Button className="text-white px-6 py-2">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>
            </div>

            {/* File Requirements */}
             <Card>
               <CardHeader>
                 <CardTitle className="text-sm font-medium text-muted-foreground">File Requirements</CardTitle>
               </CardHeader>
               <CardContent className="text-sm text-muted-foreground space-y-1">
                 <p>• Supported formats: .xlsx, .xls</p>
                 <p>• Maximum file size: 10MB</p>
                 <p>• Maximum rows: 10,000</p>
                 <p>• First row should contain headers</p>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
