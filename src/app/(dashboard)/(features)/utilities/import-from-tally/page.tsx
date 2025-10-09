'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Wifi, 
  Monitor, 
  Cloud,
  Loader2,
  CheckCircle
} from 'lucide-react'

export default function ImportFromTallyPage() {
  const router = useRouter()
  const [businessName, setBusinessName] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('tally-pc')
  const [isCheckingTally, setIsCheckingTally] = useState(true)
  const [tallyStatus, setTallyStatus] = useState<'checking' | 'found' | 'not-found'>('checking')

  // Simulate checking Tally status
  useState(() => {
    const timer = setTimeout(() => {
      setIsCheckingTally(false)
      setTallyStatus('found') // Simulate finding Tally
    }, 3000)

    return () => clearTimeout(timer)
  })

  const handleContinue = () => {
    if (selectedMethod === 'tally-pc' && tallyStatus === 'found') {
      // Navigate to next step
      console.log('Proceeding to select company...')
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
            <h1 className="text-lg md:text-xl font-semibold text-foreground">Import from Tally</h1>
          </div>
        </div>
      </div>

     
      {/* Main Content */}
      <div className="p-4 md:p-6">
        {/* Steps Indicator */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm md:text-base font-medium text-primary">Connect to Tally</span>
            </div>
            <div className="w-8 h-0.5 bg-muted"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm md:text-base font-medium text-muted-foreground">Select Company</span>
            </div>
            <div className="w-8 h-0.5 bg-muted"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm md:text-base font-medium text-muted-foreground">Import Data</span>
            </div>
          </div>
        </div>

        {/* Import Method Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6 md:mb-8">
            Choose how you want to import from Tally
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Tally on PC Card */}
            <Card className={`relative cursor-pointer transition-all duration-200 ${
              selectedMethod === 'tally-pc' 
                ? 'ring-2 ring-primary border-primary' 
                : 'border-border hover:border-primary/50'
            }`}>
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Monitor className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                      Tally on PC
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Tally is locally installed on the same device as Vyapar.
                    </p>
                  </div>
                  <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tally-pc" id="tally-pc" />
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Tally on Browser Card */}
            <Card className={`relative cursor-pointer transition-all duration-200 ${
              selectedMethod === 'tally-browser' 
                ? 'ring-2 ring-primary border-primary' 
                : 'border-border hover:border-primary/50'
            }`}>
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Cloud className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                      Tally on browser
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Tally is being used on a browser on the same device as Vyapar.
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                      COMING SOON
                    </Badge>
                    <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="tally-browser" 
                          id="tally-browser" 
                          disabled 
                          className="opacity-50"
                        />
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Message */}
          <div className="text-center mb-6 md:mb-8">
            {isCheckingTally ? (
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm md:text-base">
                  Please wait, checking if Tally is running in your system...
                </span>
              </div>
            ) : tallyStatus === 'found' ? (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm md:text-base">
                  Tally is running and ready for import!
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-red-600">
                <span className="text-sm md:text-base">
                  Tally is not running. Please start Tally and try again.
                </span>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={selectedMethod !== 'tally-pc' || tallyStatus !== 'found'}
              className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>

      {/* Wi-Fi Icon */}
      <div className="fixed top-4 right-4 text-muted-foreground">
        <Wifi className="h-5 w-5" />
      </div>
    </div>
  )
}
