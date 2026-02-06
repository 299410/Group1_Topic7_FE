import { delay, mockResponse } from './index';

export interface Notification {
    id: string;
    title: string;
    description: string;
    type: 'info' | 'success' | 'warning' | 'error';
    category: 'system' | 'order' | 'inventory' | 'shipment';
    isRead: boolean;
    timestamp: string;
    link?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        title: 'New Order Received',
        description: 'Order #ORD-2024-001 has been placed by Downtown Coffee.',
        type: 'success',
        category: 'order',
        isRead: false,
        timestamp: '5 mins ago',
        link: '/orders' // Ideally /orders/ORD-2024-001 but list is safer for now
    },
    {
        id: '2',
        title: 'Low Inventory Warning',
        description: 'Coffee Beans stock is running low (below 10kg).',
        type: 'warning',
        category: 'inventory',
        isRead: false,
        timestamp: '1 hour ago',
        link: '/kitchen/inventory'
    },
    {
        id: '3',
        title: 'System Maintenance',
        description: 'Scheduled maintenance tonight at 2:00 AM.',
        type: 'info',
        category: 'system',
        isRead: true,
        timestamp: '2 hours ago'
    },
    {
        id: '4',
        title: 'Shipment Delayed',
        description: 'Shipment #SHP-8821 is delayed due to traffic.',
        type: 'error',
        category: 'shipment',
        isRead: true,
        timestamp: 'Yesterday',
        link: '/shipment'
    },
    {
        id: '5',
        title: 'New Product Added',
        description: 'Matcha Latte Powder has been added to the catalog.',
        type: 'info',
        category: 'inventory',
        isRead: true,
        timestamp: '2 days ago',
        link: '/products'
    }
];

export const notificationService = {
    getNotifications: async () => {
        await delay(600);
        return mockResponse(MOCK_NOTIFICATIONS);
    },
    markAsRead: async (id: string) => {
        await delay(300);
        return mockResponse({ success: true, id });
    },
    markAllAsRead: async () => {
        await delay(500);
        return mockResponse({ success: true });
    }
};
