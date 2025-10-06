'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  MessageCircle,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Settings,
  Filter,
  Download,
  Printer,
  MessageSquare,
  Clock,
  Plus
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DeleteConfirmationDialog } from '@/components/ui/delete-confirmation-dialog'

interface Party {
  id: string
  name: string
  gstin?: string
  phone?: string
  email?: string
  balance: number
  type: 'customer' | 'supplier'
  status: 'active' | 'inactive'
}

interface Transaction {
  id: string
  type: 'sale' | 'purchase' | 'payment' | 'receipt'
  number: string
  date: string
  total: number
  balance: number
}

// Mock data - in real app this would come from API/database
const mockParties: Party[] = [
  {
    id: '1',
    name: 'Minsha Electronics',
    gstin: '29ABCDE1234F1Z5',
    phone: '+91 98765 43210',
    email: 'minsha@electronics.com',
    balance: 600.00,
    type: 'customer',
    status: 'active'
  },
  {
    id: '2',
    name: 'Tech Solutions Ltd',
    gstin: '27FGHIJ5678K9L2',
    phone: '+91 87654 32109',
    email: 'info@techsolutions.com',
    balance: -1200.50,
    type: 'supplier',
    status: 'active'
  },
  {
    id: '3',
    name: 'Global Trading Co',
    gstin: '33MNOPQ9012R3S4',
    phone: '+91 76543 21098',
    email: 'contact@globaltrading.com',
    balance: 0.00,
    type: 'customer',
    status: 'inactive'
  },
  {
    id: '4',
    name: 'Rajesh Kumar & Sons',
    gstin: '07ABCDE1234F1Z5',
    phone: '+91 91234 56789',
    email: 'rajesh@kumarsons.com',
    balance: 2500.75,
    type: 'customer',
    status: 'active'
  },
  {
    id: '5',
    name: 'Metro Hardware Store',
    gstin: '19FGHIJ5678K9L2',
    phone: '+91 98765 12345',
    email: 'metro@hardware.com',
    balance: -850.25,
    type: 'supplier',
    status: 'active'
  },
  {
    id: '6',
    name: 'Digital Marketing Agency',
    gstin: '33MNOPQ9012R3S4',
    phone: '+91 87654 98765',
    email: 'hello@digitalagency.com',
    balance: 15000.00,
    type: 'customer',
    status: 'active'
  },
  {
    id: '7',
    name: 'Office Supplies Inc',
    gstin: '12ABCDE1234F1Z5',
    phone: '+91 76543 21098',
    email: 'orders@officesupplies.com',
    balance: -3200.00,
    type: 'supplier',
    status: 'active'
  },
  {
    id: '8',
    name: 'Local Restaurant',
    gstin: '29FGHIJ5678K9L2',
    phone: '+91 91234 56789',
    email: 'orders@localrestaurant.com',
    balance: 450.50,
    type: 'customer',
    status: 'inactive'
  },
  {
    id: '9',
    name: 'Construction Materials Co',
    gstin: '07MNOPQ9012R3S4',
    phone: '+91 98765 43210',
    email: 'sales@constructionmaterials.com',
    balance: -5500.75,
    type: 'supplier',
    status: 'active'
  },
  {
    id: '10',
    name: 'Fashion Boutique',
    gstin: '19ABCDE1234F1Z5',
    phone: '+91 87654 32109',
    email: 'info@fashionboutique.com',
    balance: 1200.00,
    type: 'customer',
    status: 'active'
  },
  {
    id: '11',
    name: 'Medical Equipment Ltd',
    gstin: '33FGHIJ5678K9L2',
    phone: '+91 76543 21098',
    email: 'sales@medicalequipment.com',
    balance: -1800.25,
    type: 'supplier',
    status: 'active'
  },
  {
    id: '12',
    name: 'Book Store Chain',
    gstin: '12MNOPQ9012R3S4',
    phone: '+91 91234 56789',
    email: 'orders@bookstore.com',
    balance: 750.00,
    type: 'customer',
    status: 'inactive'
  }
]

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'sale',
    number: '1',
    date: '03/10/2025',
    total: 1000.00,
    balance: 600.00
  },
  {
    id: '2',
    type: 'purchase',
    number: '2',
    date: '02/10/2025',
    total: 500.00,
    balance: 100.00
  },
  
]

interface PartyListProps {
  onAddParty: () => void
}

export function PartyList({ onAddParty }: PartyListProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [parties, setParties] = useState<Party[]>([]) // Start with empty array
  const [selectedParty, setSelectedParty] = useState<Party | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Add sample data when component mounts (for demo purposes)
  const addSampleData = () => {
    setParties(mockParties)
    setSelectedParty(mockParties[0]) // Select first party by default
  }

  // Add a new party (this would be called from the modal)
  const addNewParty = (newParty: Party) => {
    setParties(prev => [...prev, newParty])
  }

  const formatBalance = (balance: number) => {
    const formatted = Math.abs(balance).toFixed(2)
    return balance >= 0 ? `₹ ${formatted}` : `-₹ ${formatted}`
  }

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return 'text-green-600'
    if (balance < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  // Filter parties
  const filteredParties = useMemo(() => {
    return parties.filter(party => 
      party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.gstin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [parties, searchTerm])

  const handleDeleteParty = async (partyId: string) => {
    setDeletingId(partyId)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Remove party from state
      setParties(prev => prev.filter(party => party.id !== partyId))
      
      // Show success message (you can add a toast notification here)
      console.log('Party deleted successfully')
    } catch (error) {
      console.error('Error deleting party:', error)
      // Show error message (you can add a toast notification here)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="flex h-full">
      {/* Left Panel - Party List */}
      <div className="w-1/3 border-r bg-white">
        {/* Header */}
        <div className="p-4 border-b">
         
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search Party Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Party List */}
        <div className="flex-1 overflow-y-auto">
          {parties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No parties found</h3>
                <p className="text-gray-500 text-sm">Get started by adding your first party or loading sample data.</p>
                <div className="flex gap-2">
                  <Button onClick={addSampleData} variant="outline" size="sm">
                    Load Sample Data
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredParties.map((party) => (
                <div
                  key={party.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedParty?.id === party.id 
                      ? 'bg-blue-50 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedParty(party)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{party.name}</div>
                      <div className="text-sm text-gray-500">Amount: {formatBalance(party.balance)}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/parties/${party.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/parties/${party.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Party
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteParty(party.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Party Details */}
      <div className="flex-1 bg-white">
        {selectedParty ? (
          <>
            {/* Party Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{selectedParty.name}</h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Transactions Section */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium">Transactions</h4>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">
                      Type
                      <Filter className="h-3 w-3" />
                    </div>
                    <div className="flex items-center gap-1">
                      Number
                      <Filter className="h-3 w-3" />
                    </div>
                    <div className="flex items-center gap-1">
                      Date
                      <Filter className="h-3 w-3" />
                    </div>
                    <div className="flex items-center gap-1">
                      Total
                      <Filter className="h-3 w-3" />
                    </div>
                    <div className="flex items-center gap-1">
                      Balance
                      <Filter className="h-3 w-3" />
                    </div>
                  </div>
                </div>
                <div className="divide-y">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="px-4 py-3 hover:bg-gray-50">
                      <div className="grid grid-cols-5 gap-4 text-sm">
                        <div className="flex items-center">
                          <Badge 
                            variant={transaction.type === 'sale' ? 'default' : 'secondary'}
                            className="capitalize"
                          >
                            {transaction.type}
                          </Badge>
                        </div>
                        <div className="text-gray-900">{transaction.number}</div>
                        <div className="text-gray-600">{transaction.date}</div>
                        <div className="text-gray-900 font-medium">
                          ₹ {transaction.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${getBalanceColor(transaction.balance)}`}>
                            ₹ {transaction.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Select a party</h3>
              <p className="text-gray-500">Choose a party from the list to view details and transactions.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
