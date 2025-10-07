'use client'

import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Plus, Eye, Edit, Trash2, Share2 } from 'lucide-react'
import { useMemo, useState } from 'react'

type SaleOrder = {
	 id: string
	 orderNo: string
	 customer: string
	 orderDate: string
	 dueDate: string
	 total: number
	 status: 'Draft' | 'Sent' | 'Converted' | 'Cancelled'
}

const mockOrders: SaleOrder[] = [
	 { id: '1', orderNo: 'SO-1001', customer: 'Acme Corp', orderDate: '2025-10-01', dueDate: '2025-10-10', total: 12500, status: 'Draft' },
	 { id: '2', orderNo: 'SO-1002', customer: 'Globex', orderDate: '2025-10-02', dueDate: '2025-10-12', total: 8900, status: 'Sent' },
	 { id: '3', orderNo: 'SO-1003', customer: 'Soylent', orderDate: '2025-10-03', dueDate: '2025-10-15', total: 21999, status: 'Converted' },
]

export default function SaleOrdersPage() {
	 const router = useRouter()
	 const [search, setSearch] = useState('')
	 const filtered = useMemo(() => {
		 return mockOrders.filter(o =>
			 [o.orderNo, o.customer].some(v => v.toLowerCase().includes(search.toLowerCase()))
		 )
	 }, [search])

	 return (
		 <div className="space-y-6">
			 <div className="flex items-center justify-between">
				 <div className="space-y-1">
					 <h2 className="text-2xl font-semibold tracking-tight">Sale Orders</h2>
					 <p className="text-sm text-muted-foreground">Make and share sale orders & convert them to invoices.</p>
				 </div>
				 <Button onClick={() => router.push('/sales/order/add')}> <Plus className="mr-2 h-4 w-4"/> Add Sale Order</Button>
			 </div>

			 <Tabs defaultValue="sale" className="w-full">
				 <TabsList>
					 <TabsTrigger value="sale">Sale Orders</TabsTrigger>
					 <TabsTrigger value="online">Online Orders</TabsTrigger>
				 </TabsList>

				 <TabsContent value="sale" className="mt-4 space-y-4">
					 <div className="flex items-center gap-3">
						 <div className="w-64">
							 <Label htmlFor="search">Search</Label>
							 <Input id="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order no. or customer" />
						 </div>
					 </div>

					 <Card>
						 <CardContent className="p-0">
							 <div className="w-full overflow-x-auto">
								 <table className="w-full text-sm">
									 <thead className="bg-muted/50">
										 <tr>
											 <th className="px-4 py-2 text-left">Order No.</th>
											 <th className="px-4 py-2 text-left">Customer</th>
											 <th className="px-4 py-2 text-left">Order Date</th>
											 <th className="px-4 py-2 text-left">Due Date</th>
											 <th className="px-4 py-2 text-right">Total</th>
											 <th className="px-4 py-2 text-left">Status</th>
											 <th className="px-4 py-2 text-right">Actions</th>
										 </tr>
									 </thead>
									 <tbody>
										 {filtered.map(order => (
											 <tr key={order.id} className="border-b last:border-0">
												 <td className="px-4 py-2 font-medium">{order.orderNo}</td>
												 <td className="px-4 py-2">{order.customer}</td>
												 <td className="px-4 py-2">{order.orderDate}</td>
												 <td className="px-4 py-2">{order.dueDate}</td>
												 <td className="px-4 py-2 text-right">{order.total.toLocaleString()}</td>
												 <td className="px-4 py-2">{order.status}</td>
												 <td className="px-4 py-2 text-right">
													 <DropdownMenu>
														 <DropdownMenuTrigger asChild>
															 <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
														 </DropdownMenuTrigger>
														 <DropdownMenuContent align="end">
															 <DropdownMenuItem onClick={() => router.push(`/sales/order/detail/${order.id}`)}><Eye className="mr-2 h-4 w-4"/> View</DropdownMenuItem>
															 <DropdownMenuItem onClick={() => router.push(`/sales/order/edit/${order.id}`)}><Edit className="mr-2 h-4 w-4"/> Edit</DropdownMenuItem>
															 <DropdownMenuItem><Share2 className="mr-2 h-4 w-4"/> Share</DropdownMenuItem>
															 <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
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
				 </TabsContent>

				 <TabsContent value="online" className="mt-8">
					 <div className="flex items-center justify-center py-16 text-center">
						 <div className="space-y-3">
							 <h3 className="text-lg font-semibold">Online Orders</h3>
							 <p className="text-sm text-muted-foreground max-w-md">Collect orders online and manage them here. This is a placeholder view.</p>
						 </div>
					 </div>
				 </TabsContent>
			 </Tabs>
		 </div>
	 )
}


