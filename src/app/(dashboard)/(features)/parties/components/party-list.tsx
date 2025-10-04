'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
  ChevronRight
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

interface PartyListProps {
  onAddParty: () => void
}

export function PartyList({ onAddParty }: PartyListProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [parties, setParties] = useState<Party[]>([]) // Start with empty array
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortField, setSortField] = useState<keyof Party>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Add sample data when component mounts (for demo purposes)
  const addSampleData = () => {
    setParties(mockParties)
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

  // Filter and sort parties
  const filteredAndSortedParties = useMemo(() => {
    let filtered = parties.filter(party => 
      party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.gstin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      const aValue = a[sortField] || ''
      const bValue = b[sortField] || ''
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [parties, searchTerm, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedParties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentParties = filteredAndSortedParties.slice(startIndex, endIndex)

  const handleSort = (field: keyof Party) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

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
    <div className="space-y-6 min-h-0">
      {/* Search and Actions */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search party name, GSTIN, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {/* <div className="flex gap-2">
          <Button onClick={addSampleData} variant="outline">
            Load Sample Data
          </Button>
          <Button onClick={onAddParty} className="bg-red-600 hover:bg-red-700">
            Add Party
          </Button>
        </div> */}
      </div>

      {/* Table */}
      {parties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-gray-50">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No parties found</h3>
            <p className="text-gray-500">Get started by adding your first party or loading sample data.</p>
            <div className="flex gap-2">
              <Button onClick={addSampleData} variant="outline">
                Load Sample Data
              </Button>
              <Button onClick={onAddParty} className="bg-red-600 hover:bg-red-700">
                Add Party
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Party Name
                    {sortField === 'name' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('gstin')}
                >
                  <div className="flex items-center gap-2">
                    GSTIN
                    {sortField === 'gstin' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead>Contact</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center gap-2">
                    Type
                    {sortField === 'type' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('balance')}
                >
                  <div className="flex items-center gap-2">
                    Balance
                    {sortField === 'balance' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {sortField === 'status' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentParties.map((party) => (
                <TableRow key={party.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="font-semibold text-gray-900">{party.name}</div>
                      <div className="text-sm text-gray-500">ID: {party.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {party.gstin || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {party.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-gray-400" />
                          {party.phone}
                        </div>
                      )}
                      {party.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-gray-400" />
                          {party.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={party.type === 'customer' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {party.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getBalanceColor(party.balance)}`}>
                      {formatBalance(party.balance)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={party.status === 'active' ? 'default' : 'secondary'}
                      className={party.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {party.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
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
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DeleteConfirmationDialog
                        title="Delete Party"
                        description="Are you sure you want to delete this party?"
                        itemName={party.name}
                        onConfirm={() => handleDeleteParty(party.id)}
                        isLoading={deletingId === party.id}
                        trigger={
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {parties.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedParties.length)} of {filteredAndSortedParties.length} entries
            </span>
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={currentPage === pageNum ? "bg-red-600 hover:bg-red-700" : ""}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          Total Parties: {parties.length}
        </div>
        <div className="flex gap-4">
          <div>
            Total Receivables: <span className="font-medium text-green-600">₹ {parties.filter(p => p.balance > 0).reduce((sum, p) => sum + p.balance, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div>
            Total Payables: <span className="font-medium text-red-600">₹ {Math.abs(parties.filter(p => p.balance < 0).reduce((sum, p) => sum + p.balance, 0)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
