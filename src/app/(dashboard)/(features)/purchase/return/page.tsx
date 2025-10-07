'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Share2, Download, Printer, ClipboardList } from 'lucide-react'

export default function PurchaseReturnListPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [hasData, setHasData] = useState(false)

  const rows = [
    { id: 1, returnNo: 'PR-001', billNo: 'B-101', billDate: '2025-10-05', date: '2025-10-07', party: 'ABC Suppliers', amount: 2500, status: 'Open' },
    { id: 2, returnNo: 'PR-002', billNo: 'B-102', billDate: '2025-10-04', date: '2025-10-06', party: 'XYZ Traders', amount: 980, status: 'Closed' },
  ]
  const filtered = rows.filter(r =>
    r.returnNo.toLowerCase().includes(searchTerm.toLowerCase()) || r.party.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const statusColor = (s: string) => (s === 'Closed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase Return / Debit Notes</h1>
          <p className="text-gray-600">Manage your purchase returns</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setHasData(!hasData)} variant="outline" size="sm">{hasData ? 'Show Empty State' : 'Show With Data'}</Button>
          <Button onClick={() => router.push('/purchase/return/add')} className="bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" />Add Purchase Return</Button>
        </div>
      </div>

      {!hasData ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ClipboardList className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No purchase returns yet</h3>
          <p className="text-gray-500 mb-6">Create your first purchase return.</p>
          <Button onClick={() => router.push('/purchase/return/add')} className="bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" />Create Purchase Return</Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search by number or party..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center space-x-2"><Filter className="h-4 w-4" /><span>Filter</span></Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return No.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill No.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filtered.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.returnNo}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{r.billNo}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{r.billDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{r.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{r.party}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">₹ {r.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap"><Badge className={statusColor(r.status)}>{r.status}</Badge></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`/purchase/return/detail/${r.id}`)}><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => router.push(`/purchase/return/edit/${r.id}`)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                              <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" />Share</DropdownMenuItem>
                              <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                              <DropdownMenuItem><Printer className="mr-2 h-4 w-4" />Print</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}


