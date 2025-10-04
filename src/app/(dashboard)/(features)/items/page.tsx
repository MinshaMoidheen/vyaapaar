'use client'

import { useState } from 'react'
import { ItemsHeader } from './components/items-header'
import { ItemsContent } from './components/items-content'
import { ItemsList } from './components/items-list'
import { AddItemModal } from './components/add-item-modal'

export default function ItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasItems, setHasItems] = useState(true) // Start with false to show empty state

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <ItemsHeader onAddItem={() => setIsModalOpen(true)} />
      
      {hasItems ? (
        <ItemsList onAddItem={() => setIsModalOpen(true)} />
      ) : (
        <ItemsContent onAddItem={() => setIsModalOpen(true)} />
      )}
      
      <AddItemModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        onItemAdded={() => setHasItems(true)}
      />
    </div>
  )
}
