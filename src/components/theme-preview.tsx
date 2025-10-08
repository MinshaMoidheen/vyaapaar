'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ThemePreview() {
  return (
    <div className="p-8 space-y-6 bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Theme Preview</h1>
        <p className="text-muted-foreground">New theme color: #8A1538</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Primary Button */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Button</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Primary Action</Button>
          </CardContent>
        </Card>

        {/* Chart Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Chart Colors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-chart-1"></div>
              <span className="text-sm">Chart 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-chart-2"></div>
              <span className="text-sm">Chart 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-chart-3"></div>
              <span className="text-sm">Chart 3</span>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge className="bg-primary text-primary-foreground">Primary Badge</Badge>
            <Badge variant="secondary">Secondary Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
          </CardContent>
        </Card>

        {/* Revenue Card */}
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$15,231.89</div>
            <p className="text-sm text-muted-foreground">+20.1% from last month</p>
            <div className="mt-4 h-20 bg-gradient-to-r from-chart-1 to-chart-2 rounded"></div>
          </CardContent>
        </Card>

        {/* Subscriptions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">+2,350</div>
            <p className="text-sm text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-primary"></div>
              <span className="text-sm">Primary (#8A1538)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-secondary"></div>
              <span className="text-sm">Secondary</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-muted"></div>
              <span className="text-sm">Muted</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
