import { delay, mockResponse } from './index';

export interface DashboardStats {
    totalRevenue: number;
    activeStores: number;
    pendingOrders: number;
    activeUsers: number;
}

export interface RecentActivity {
    id: string;
    action: string;
    user: string;
    time: string;
    status: 'success' | 'warning' | 'error';
}

const MOCK_STATS: DashboardStats = {
    totalRevenue: 1250000,
    activeStores: 45,
    pendingOrders: 12,
    activeUsers: 128,
};

const MOCK_ACTIVITY: RecentActivity[] = [
    { id: '1', action: 'New Franchise Store Registered', user: 'John Doe', time: '2 mins ago', status: 'success' },
    { id: '2', action: 'Large Order #1234 Placed', user: 'Store #05', time: '15 mins ago', status: 'warning' },
    { id: '3', action: 'Inventory Alert: Coffee Beans', user: 'System', time: '1 hour ago', status: 'error' },
    { id: '4', action: 'New User Added', user: 'Admin', time: '2 hours ago', status: 'success' },
];

export const dashboardService = {
    getStats: async (role: string = 'ADMIN') => {
        await delay(500);

        const baseStats = { ...MOCK_STATS };

        if (role === 'MANAGER') {
            return mockResponse({
                totalRevenue: 45000,
                activeStores: 1, // Specific store
                pendingOrders: 5,
                activeUsers: 8 // Staff in store
            });
        }

        if (role === 'KITCHEN_STAFF') {
            return mockResponse({
                totalRevenue: 0, // Irrelevant
                activeStores: 45, // Servicing all
                pendingOrders: 25, // Production tasks
                activeUsers: 15 // Kitchen crew
            });
        }

        return mockResponse(baseStats);
    },
    getRecentActivity: async () => {
        await delay(600);
        return mockResponse(MOCK_ACTIVITY);
    }
};
