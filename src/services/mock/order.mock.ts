import { delay, mockResponse } from './index';

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    unit: string;
    price: number;
}

export interface Order {
    id: string;
    storeName: string;
    date: string;
    totalAmount: number;
    status: 'draft' | 'submitted' | 'approved' | 'scheduled' | 'in_production' | 'produced' | 'ready_for_delivery' | 'shipping' | 'delivered' | 'completed' | 'cancelled';
    itemsCount: number;
    priority: 'high' | 'normal' | 'low';
    items: OrderItem[];
}

// Make it a let so we can modify it in memory
export let ORDERS: Order[] = [
    {
        id: 'ORD-001',
        storeName: 'Downtown Store',
        date: '2023-10-25',
        totalAmount: 1250.00,
        status: 'submitted',
        itemsCount: 15,
        priority: 'high',
        items: [
            { productId: '1', productName: 'Bê bò bistech đặc biệt', quantity: 10, unit: 'portion', price: 150000 },
            { productId: '2', productName: 'Sốt tiêu đen', quantity: 5, unit: 'lit', price: 120000 }
        ]
    },
    // ... other orders can have empty items for now if lazy
];

export const orderService = {
    getOrders: async () => {
        await delay(500);
        return mockResponse([...ORDERS]);
    },

    getOrderById: async (id: string) => {
        await delay(300);
        const order = ORDERS.find(o => o.id === id);
        return mockResponse(order || null);
    },

    createOrder: async (order: Partial<Order>) => {
        await delay(800);
        const newOrder: Order = {
            id: `ORD-${Math.floor(Math.random() * 10000)}`,
            storeName: order.storeName || 'Unknown Store',
            date: new Date().toISOString().split('T')[0],
            totalAmount: order.totalAmount || 0,
            status: 'submitted', // Start as submitted for simplicity in this flow
            itemsCount: order.items?.length || 0,
            priority: order.priority || 'normal',
            items: order.items || []
        };
        ORDERS.unshift(newOrder);
        return mockResponse(newOrder);
    },

    updateStatus: async (id: string, status: Order['status']) => {
        await delay(400);
        const orderIndex = ORDERS.findIndex(o => o.id === id);
        if (orderIndex === -1) throw new Error('Order not found');

        ORDERS[orderIndex] = { ...ORDERS[orderIndex], status };
        return mockResponse(ORDERS[orderIndex]);
    },

    getOrdersByStatus: async (status: Order['status']) => {
        await delay(300);
        return mockResponse(ORDERS.filter(o => o.status === status));
    }
};
