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
  Package,
  DollarSign,
  Hash,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DeleteConfirmationDialog } from '@/components/ui/delete-confirmation-dialog'

interface Item {
  id: string
  name: string
  sku?: string
  price: number
  cost: number
  stock: number
  category: string
  status: 'active' | 'inactive'
  type: 'product' | 'service'
}

// Mock data - in real app this would come from API/database
const mockItems: Item[] = [
  {
    id: '1',
    name: 'Dell Laptop XPS 13',
    sku: 'LAP-001',
    price: 85000.00,
    cost: 65000.00,
    stock: 15,
    category: 'Electronics',
    status: 'active',
    type: 'product'
  },
  {
    id: '2',
    name: 'Web Development Service',
    sku: 'SVC-001',
    price: 25000.00,
    cost: 12000.00,
    stock: 0,
    category: 'Services',
    status: 'active',
    type: 'service'
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    sku: 'FUR-001',
    price: 12000.00,
    cost: 7500.00,
    stock: 8,
    category: 'Furniture',
    status: 'active',
    type: 'product'
  },
  {
    id: '4',
    name: 'iPhone 15 Pro',
    sku: 'PHN-001',
    price: 120000.00,
    cost: 95000.00,
    stock: 5,
    category: 'Electronics',
    status: 'active',
    type: 'product'
  },
  {
    id: '5',
    name: 'Digital Marketing Service',
    sku: 'SVC-002',
    price: 18000.00,
    cost: 10000.00,
    stock: 0,
    category: 'Services',
    status: 'active',
    type: 'service'
  },
  {
    id: '6',
    name: 'Office Desk - Mahogany',
    sku: 'FUR-002',
    price: 25000.00,
    cost: 15000.00,
    stock: 3,
    category: 'Furniture',
    status: 'active',
    type: 'product'
  },
  {
    id: '7',
    name: 'Samsung 4K Monitor',
    sku: 'MON-001',
    price: 35000.00,
    cost: 25000.00,
    stock: 12,
    category: 'Electronics',
    status: 'active',
    type: 'product'
  },
  {
    id: '8',
    name: 'Graphic Design Service',
    sku: 'SVC-003',
    price: 8000.00,
    cost: 4000.00,
    stock: 0,
    category: 'Services',
    status: 'active',
    type: 'service'
  },
  {
    id: '9',
    name: 'Wireless Keyboard & Mouse',
    sku: 'ACC-001',
    price: 3500.00,
    cost: 2000.00,
    stock: 0,
    category: 'Electronics',
    status: 'inactive',
    type: 'product'
  },
  {
    id: '10',
    name: 'Conference Table',
    sku: 'FUR-003',
    price: 45000.00,
    cost: 30000.00,
    stock: 2,
    category: 'Furniture',
    status: 'active',
    type: 'product'
  },
  {
    id: '11',
    name: 'Consulting Service',
    sku: 'SVC-004',
    price: 5000.00,
    cost: 2000.00,
    stock: 0,
    category: 'Services',
    status: 'active',
    type: 'service'
  },
  {
    id: '12',
    name: 'Gaming Headset',
    sku: 'GAM-001',
    price: 8000.00,
    cost: 5000.00,
    stock: 20,
    category: 'Electronics',
    status: 'active',
    type: 'product'
  },
  {
    id: '13',
    name: 'Bookshelf Unit',
    sku: 'FUR-004',
    price: 15000.00,
    cost: 9000.00,
    stock: 6,
    category: 'Furniture',
    status: 'active',
    type: 'product'
  },
  {
    id: '14',
    name: 'SEO Optimization Service',
    sku: 'SVC-005',
    price: 12000.00,
    cost: 6000.00,
    stock: 0,
    category: 'Services',
    status: 'active',
    type: 'service'
  },
  {
    id: '15',
    name: 'Portable Hard Drive 1TB',
    sku: 'STG-001',
    price: 6000.00,
    cost: 3500.00,
    stock: 25,
    category: 'Electronics',
    status: 'active',
    type: 'product'
  }
]

interface ItemsListProps {
  onAddItem: () => void
}

export function ItemsList({ onAddItem }: ItemsListProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [items, setItems] = useState<Item[]>([]) // Start with empty array
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortField, setSortField] = useState<keyof Item>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Add sample data when component mounts (for demo purposes)
  const addSampleData = () => {
    setItems(mockItems)
  }

  // Add a new item (this would be called from the modal)
  const addNewItem = (newItem: Item) => {
    setItems(prev => [...prev, newItem])
  }

  const formatPrice = (price: number) => {
    return `₹ ${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
  }

  const getStockColor = (stock: number, type: string) => {
    if (type === 'service') return 'text-gray-600'
    if (stock === 0) return 'text-red-600'
    if (stock < 10) return 'text-yellow-600'
    return 'text-green-600'
  }

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      const aValue = a[sortField] || ''
      const bValue = b[sortField] || ''
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [items, searchTerm, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredAndSortedItems.slice(startIndex, endIndex)

  const handleSort = (field: keyof Item) => {
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

  const handleDeleteItem = async (itemId: string) => {
    setDeletingId(itemId)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Remove item from state
      setItems(prev => prev.filter(item => item.id !== itemId))
      
      // Show success message (you can add a toast notification here)
      console.log('Item deleted successfully')
    } catch (error) {
      console.error('Error deleting item:', error)
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
            placeholder="Search item name, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {/* <div className="flex gap-2">
          <Button onClick={addSampleData} variant="outline">
            Load Sample Data
          </Button>
          <Button onClick={onAddItem} className="bg-purple-600 hover:bg-purple-700">
            Add Item
          </Button>
        </div> */}
      </div>

      {/* Table */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-gray-50">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No items found</h3>
            <p className="text-gray-500">Get started by adding your first item or loading sample data.</p>
            <div className="flex gap-2">
              <Button onClick={addSampleData} variant="outline">
                Load Sample Data
              </Button>
              <Button onClick={onAddItem} className="bg-purple-600 hover:bg-purple-700">
                Add Item
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
                    Item Name
                    {sortField === 'name' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-2">
                    Category
                    {sortField === 'category' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center gap-2">
                    Price
                    {sortField === 'price' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center gap-2">
                    Stock
                    {sortField === 'stock' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
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
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">SKU: {item.sku || 'N/A'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getStockColor(item.stock, item.type)}`}>
                        {item.type === 'service' ? 'N/A' : item.stock}
                      </span>
                      {item.type === 'product' && item.stock === 0 && (
                        <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={item.type === 'product' ? 'default' : 'secondary'}
                      className={item.type === 'product' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={item.status === 'active' ? 'default' : 'secondary'}
                      className={item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {item.status}
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
                          <DropdownMenuItem onClick={() => router.push(`/items/${item.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/items/${item.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Item
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="mr-2 h-4 w-4" />
                            Manage Stock
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DeleteConfirmationDialog
                        title="Delete Item"
                        description="Are you sure you want to delete this item?"
                        itemName={item.name}
                        onConfirm={() => handleDeleteItem(item.id)}
                        isLoading={deletingId === item.id}
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
      {items.length > 0 && (
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedItems.length)} of {filteredAndSortedItems.length} entries
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
                    className={currentPage === pageNum ? "bg-purple-600 hover:bg-purple-700" : ""}
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
          Total Items: {items.length}
        </div>
        <div className="flex gap-4">
          <div>
            Total Value: <span className="font-medium text-green-600">₹ {items.filter(item => item.type === 'product').reduce((sum, item) => sum + (item.price * item.stock), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div>
            Low Stock: <span className="font-medium text-yellow-600">{items.filter(item => item.type === 'product' && item.stock > 0 && item.stock < 10).length} items</span>
          </div>
        </div>
      </div>
    </div>
  )
}
