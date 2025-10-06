'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PartyDetailsHeader } from './components/party-details-header'
import { PartyDetailsContent } from './components/party-details-content'
import { PartyList } from './components/party-list'

export default function PartyDetailsPage() {
  const router = useRouter()
  const [hasParties, setHasParties] = useState(true) // Start with false to show empty state

  const handleAddParty = () => {
    router.push('/parties/add')
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PartyDetailsHeader onAddParty={handleAddParty} />
      
      {hasParties ? (
        <PartyList onAddParty={handleAddParty} />
      ) : (
        <PartyDetailsContent onAddParty={handleAddParty} />
      )}
    </div>
  )
}
