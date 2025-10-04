'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface ItemsHeaderProps {
  onAddItem: () => void
}

export function ItemsHeader({ onAddItem }: ItemsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="text-3xl font-bold tracking-tight">Items</h1>
      </div>
      <Button onClick={onAddItem} className="bg-red-600 hover:bg-red-700">
        <Plus className="mr-2 h-4 w-4" />
        Add Item
      </Button>
    </div>
  )
}
