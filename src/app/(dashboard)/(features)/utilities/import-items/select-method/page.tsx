'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  Barcode,
  FileSpreadsheet,
  Plus,
  Settings
} from 'lucide-react'

export default function SelectImportMethodPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState('barcode')

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header Bar */}
      <div className="border-b border-border px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Import Items</span>
              {/* <span className="sm:hidden">Back</span> */}
            </Button>
          </div>
          {/* <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Button 
              onClick={() => router.push('/sales/add-sale')}
              className="text-white w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Sale</span>
              <span className="sm:hidden">Add Sale</span>
            </Button>
            <Button 
              onClick={() => router.push('/purchase/bills/add')}
              className="text-white w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Purchase</span>
              <span className="sm:hidden">Purchase</span>
            </Button>
          </div> */}
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Page Title */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-8">Select Import Method</h2>
        </div>

        {/* Import Method Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
            {/* Import From Barcode - Recommended */}
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                selectedMethod === 'barcode' 
                  ? 'ring-2 ring-blue-500 border-blue-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedMethod('barcode')}
            >
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={selectedMethod === 'barcode'}
                      onChange={() => setSelectedMethod('barcode')}
                      className="w-4 h-4 text-blue-600"
                    />
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    RECOMMENDED
                  </Badge>
                </div>
              </CardHeader>
               <CardContent className="text-center space-y-4">
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                   <Barcode className="h-10 w-10 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold text-foreground">Import From Barcode</h3>
                 <p className="text-muted-foreground text-sm leading-relaxed">
                   Import item details by scanning barcodes. Vyapar uses a library of 100 Mn+ standard barcodes to fetch all details of your items in seconds.
                 </p>
               </CardContent>
            </Card>

            {/* Import From Excel */}
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                selectedMethod === 'excel' 
                  ? 'ring-2 ring-blue-500 border-blue-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedMethod('excel')}
            >
              <CardHeader className="relative">
                <div className="flex items-center justify-end">
                  <input
                    type="radio"
                    checked={selectedMethod === 'excel'}
                    onChange={() => setSelectedMethod('excel')}
                    className="w-4 h-4 text-blue-600"
                  />
                </div>
              </CardHeader>
               <CardContent className="text-center space-y-4">
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                   <FileSpreadsheet className="h-10 w-10 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold text-foreground">Import From Excel</h3>
                 <p className="text-muted-foreground text-sm leading-relaxed">
                   Import item data from excel files in your system
                 </p>
               </CardContent>
            </Card>
          </div>

          {/* OR Divider */}
          {/* <div className="flex items-center justify-center mb-8">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-muted-foreground font-medium">OR</span>
            <div className="flex-1 border-t border-border"></div>
          </div> */}

          {/* Import From Vyapar Library */}
          {/* <div className="text-center">
            <p className="text-muted-foreground mb-4">Import From Vyapar Library</p>
          </div> */}

          {/* Continue Button */}
          <div className="flex justify-center sm:justify-end mt-6 md:mt-8">
            <Button 
              className="text-white px-6 md:px-8 py-2 w-full sm:w-auto"
               onClick={() => {
                 if (selectedMethod === 'barcode') {
                   router.push('/utilities/import-items/from-barcode')
                 } else if (selectedMethod === 'excel') {
                   router.push('/utilities/import-items/from-excel')
                 }
               }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
