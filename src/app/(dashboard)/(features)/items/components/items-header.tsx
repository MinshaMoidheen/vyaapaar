'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface ItemsHeaderProps {
  onAddItem: () => void
}

export function ItemsHeader({ onAddItem }: ItemsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Items</h1>
        <p className="text-sm md:text-base text-muted-foreground">Manage your products and services</p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Button onClick={onAddItem} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  )
}
