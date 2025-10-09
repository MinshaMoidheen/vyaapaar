'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Download, Upload, FileSpreadsheet } from 'lucide-react'

export default function ImportPartiesPage() {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleDownloadTemplate = () => {
    // Create a sample Excel file for download
    const sampleData = [
      ['Party Name', 'Phone', 'Email', 'Address', 'City', 'State', 'Pincode', 'GSTIN'],
      ['Sample Party 1', '9876543210', 'party1@example.com', '123 Main St', 'Mumbai', 'Maharashtra', '400001', '27ABCDE1234F1Z5'],
      ['Sample Party 2', '9876543211', 'party2@example.com', '456 Park Ave', 'Delhi', 'Delhi', '110001', '07FGHIJ5678K1L2']
    ]
    
    // Convert to CSV format
    const csvContent = sampleData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'parties_template.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        file.type === 'application/vnd.ms-excel' ||
        file.name.endsWith('.xlsx') || 
        file.name.endsWith('.xls')) {
      setUploadedFile(file)
      console.log('File uploaded:', file.name)
    } else {
      alert('Please upload a valid Excel file (.xls or .xlsx)')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleContinue = () => {
    if (uploadedFile) {
      // Process the uploaded file
      console.log('Processing file:', uploadedFile.name)
      // Navigate to next step or show success message
      alert('File uploaded successfully! Processing parties...')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold text-foreground">Import Parties</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            
            {/* Left Section - Download Template */}
            <Card className="p-6 md:p-8">
              <CardContent className="p-0 text-center">
                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
                  Download .xls/.xlsx (excel sheet) template file to enter Data
                </h2>
                
                {/* Excel Icon */}
                <div className="flex justify-center mb-6 md:mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-lg shadow-lg flex items-center justify-center transform rotate-3">
                      <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-500 rounded flex items-center justify-center">
                        <FileSpreadsheet className="h-12 w-12 md:h-16 md:w-16 text-white" />
                      </div>
                    </div>
                    {/* Folded corner effect */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-700 rounded-br-lg"></div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-800 rounded-br-lg transform rotate-45 origin-bottom-right"></div>
                  </div>
                </div>

                {/* Download Button */}
                <Button 
                  onClick={handleDownloadTemplate}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-sm md:text-base shadow-md"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>

            {/* Right Section - Upload File */}
            <Card className="p-6 md:p-8">
              <CardContent className="p-0">
                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6 text-center">
                  Upload your .xls/.xlsx (excel sheet)
                </h2>
                
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-colors duration-200 ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {/* Upload Icon */}
                  <div className="flex justify-center mb-6 md:mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-lg shadow-lg flex items-center justify-center transform rotate-3">
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-500 rounded flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 md:h-12 md:w-12 text-white mb-1" />
                          <div className="flex space-x-1">
                            <div className="w-1 h-2 bg-white rounded"></div>
                            <div className="w-1 h-2 bg-white rounded"></div>
                            <div className="w-1 h-2 bg-white rounded"></div>
                          </div>
                        </div>
                      </div>
                      {/* Folded corner effect */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-700 rounded-br-lg"></div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-800 rounded-br-lg transform rotate-45 origin-bottom-right"></div>
                    </div>
                  </div>

                  {/* Upload Instructions */}
                  <div className="space-y-2">
                    <p className="text-sm md:text-base text-muted-foreground">
                      Drag and drop or{' '}
                      <label htmlFor="file-upload" className="text-blue-600 underline cursor-pointer hover:text-blue-700">
                        Click here to Browse
                      </label>
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      formatted excel file to continue
                    </p>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {/* Uploaded File Display */}
                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 text-green-700">
                        <FileSpreadsheet className="h-4 w-4" />
                        <span className="text-sm font-medium">{uploadedFile.name}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Continue Button */}
                {uploadedFile && (
                  <div className="mt-6 text-center">
                    <Button
                      onClick={handleContinue}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-sm md:text-base"
                    >
                      Continue Import
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
