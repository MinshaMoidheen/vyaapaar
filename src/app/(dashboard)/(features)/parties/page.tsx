'use client'

import { useState } from 'react'
import { PartyDetailsHeader } from './components/party-details-header'
import { PartyDetailsContent } from './components/party-details-content'
import { PartyList } from './components/party-list'
import { AddPartyModal } from './components/add-party-modal'

export default function PartyDetailsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasParties, setHasParties] = useState(true) // Start with false to show empty state

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PartyDetailsHeader onAddParty={() => setIsModalOpen(true)} />
      
      {hasParties ? (
        <PartyList onAddParty={() => setIsModalOpen(true)} />
      ) : (
        <PartyDetailsContent onAddParty={() => setIsModalOpen(true)} />
      )}
      
      <AddPartyModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        onPartyAdded={() => setHasParties(true)}
      />
    </div>
  )
}
