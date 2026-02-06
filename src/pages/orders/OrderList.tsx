import { useEffect, useState } from 'react';
import { Plus, AlertCircle, Search, Filter, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { orderService, type Order } from '../../services/mock/order.mock';
import { kitchenService } from '../../services/mock/kitchen.mock';
import { OrderDetailDrawer } from './OrderDetailDrawer';
import { useNavigate } from 'react-router-dom';

export const OrderList = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');

    // Drawer State
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const fetchData = () => {
        setIsLoading(true);
        orderService.getOrders()
            .then(res => {
                setOrders(res.data);
                setFilteredOrders(res.data);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let result = orders;

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(o =>
                o.id.toLowerCase().includes(lowerQuery) ||
                o.storeName.toLowerCase().includes(lowerQuery)
            );
        }

        if (statusFilter !== 'all') {
            result = result.filter(o => o.status === statusFilter);
        }

        setFilteredOrders(result);
    }, [orders, searchQuery, statusFilter]);

    const handleApproveOrder = async (orderId: string) => {
        if (!confirm('Approve this order and send to kitchen?')) return;
        setIsLoading(true);
        await orderService.updateStatus(orderId, 'approved');

        // Trigger kitchen task creation (Mocking items for now as they are not fully in mock DB)
        await kitchenService.createTaskFromOrder(orderId, [
            { name: 'Signature Coffee Blend', quantity: 20 },
            { name: 'Milk', quantity: 50 }
        ]);

        await orderService.updateStatus(orderId, 'scheduled');
        fetchData();

        // Update selected order if open
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(prev => prev ? { ...prev, status: 'scheduled' } : null);
        }
    };

    const handleStatusUpdate = async (orderId: string, status: string) => {
        // Generic status update wrapper for Drawer
        if (status === 'approved') {
            await handleApproveOrder(orderId);
        } else {
            setIsLoading(true);
            await orderService.updateStatus(orderId, status as any);
            fetchData();
            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder(prev => prev ? { ...prev, status: status as any } : null);
            }
        }
    };

    const columns: Column<Order>[] = [
        {
            header: 'Order ID',
            accessorKey: 'id',
            className: 'font-medium text-gray-900',
            cell: (order) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{order.id}</span>
        },
        {
            header: 'Store',
            accessorKey: 'storeName',
            cell: (order) => <span className="font-medium text-gray-800">{order.storeName}</span>
        },
        {
            header: 'Date',
            accessorKey: 'date',
            cell: (order) => <span className="text-gray-500 text-sm">{order.date}</span>
        },
        {
            header: 'Items',
            accessorKey: 'itemsCount',
            cell: (order) => <Badge variant="secondary" className="font-normal">{order.itemsCount} items</Badge>
        },
        {
            header: 'Total',
            accessorKey: 'totalAmount',
            className: 'font-bold',
            cell: (order) => <span className="text-gray-900">${order.totalAmount.toFixed(2)}</span>
        },
        {
            header: 'Priority',
            cell: (order) => {
                return (
                    order.priority === 'high' ?
                        <span className="flex items-center text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-2 py-1 rounded-full w-fit">
                            <AlertCircle size={12} className="mr-1" /> High
                        </span> :
                        <span className="text-gray-500 capitalize text-sm">{order.priority}</span>
                );
            }
        },
        {
            header: 'Status',
            cell: (order) => {
                const colors: Record<string, "default" | "primary" | "secondary" | "success" | "warning" | "info" | "danger"> = {
                    draft: 'default',
                    submitted: 'warning',
                    approved: 'info',
                    scheduled: 'info',
                    in_production: 'primary',
                    produced: 'success',
                    ready_for_delivery: 'secondary',
                    shipping: 'primary',
                    delivered: 'success',
                    completed: 'success',
                    cancelled: 'danger'
                };
                return <Badge variant={colors[order.status] || 'default'}>{order.status.replace('_', ' ').toUpperCase()}</Badge>;
            }
        },
        {
            header: 'Actions',
            cell: (order) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        <Eye size={16} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Order Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Track and manage store orders.</p>
                </div>
                <Button onClick={() => navigate('/orders/create')} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                    <Plus className="mr-2 h-4 w-4" /> Create Order
                </Button>
            </div>

            <Card className="border-0 shadow-sm ring-1 ring-gray-200">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-80">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search orders..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <Filter size={16} className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500 mr-2">Status:</span>
                        {['all', 'submitted', 'approved', 'in_production', 'completed'].map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status as any)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap
                                    ${statusFilter === status
                                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                            >
                                {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </button>
                        ))}
                    </div>
                </div>
                <DataTable
                    data={filteredOrders}
                    columns={columns}
                    keyExtractor={(order: Order) => order.id}
                    isLoading={isLoading}
                    onRowClick={(order) => setSelectedOrder(order)}
                />
            </Card>

            <OrderDetailDrawer
                order={selectedOrder}
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onStatusUpdate={handleStatusUpdate}
            />
        </div>
    );
};
