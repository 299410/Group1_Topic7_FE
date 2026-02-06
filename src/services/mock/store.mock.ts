import { delay, mockResponse } from './index';

export interface Store {
    id: string;
    name: string;
    location: string;
    manager: string;
    status: 'active' | 'inactive' | 'pending';
    revenue: number;
    inventoryStatus: 'good' | 'warning' | 'critical';
}

const MOCK_STORES: Store[] = [
    { id: '1', name: 'Downtown Store', location: '123 Main St, New York', manager: 'John Smith', status: 'active', revenue: 150000, inventoryStatus: 'good' },
    { id: '2', name: 'Uptown Branch', location: '456 High St, New York', manager: 'Sarah Connor', status: 'active', revenue: 120000, inventoryStatus: 'warning' },
    { id: '3', name: 'Brooklyn Hub', location: '789 Park Ave, Brooklyn', manager: 'Mike Ross', status: 'active', revenue: 135000, inventoryStatus: 'good' },
    { id: '4', name: 'Queens Outlet', location: '321 Queen Blvd, Queens', manager: 'Rachel Zane', status: 'pending', revenue: 0, inventoryStatus: 'good' },
    { id: '5', name: 'Jersey City', location: '555 River Rd, Jersey City', manager: 'Harvey Specter', status: 'inactive', revenue: 0, inventoryStatus: 'good' },
];

export const storeService = {
    getStores: async () => {
        await delay(600);
        return mockResponse([...MOCK_STORES]);
    },

    getStoreById: async (id: string) => {
        await delay(400);
        const store = MOCK_STORES.find(s => s.id === id);
        if (store) return mockResponse(store);
        throw new Error('Store not found');
    },

    createStore: async (store: Partial<Store>) => {
        await delay(800);
        const newStore = {
            ...store,
            id: String(MOCK_STORES.length + 1),
            stock: 0,
            revenue: 0,
            status: store.status || 'pending',
            inventoryStatus: 'good'
        } as Store;
        MOCK_STORES.push(newStore);
        return mockResponse(newStore);
    },

    updateStore: async (id: string, updates: Partial<Store>) => {
        await delay(600);
        const index = MOCK_STORES.findIndex(s => s.id === id);
        if (index === -1) throw new Error('Store not found');
        MOCK_STORES[index] = { ...MOCK_STORES[index], ...updates };
        return mockResponse(MOCK_STORES[index]);
    },

    deleteStore: async (id: string) => {
        await delay(400);
        const index = MOCK_STORES.findIndex(s => s.id === id);
        if (index !== -1) {
            MOCK_STORES.splice(index, 1);
        }
        return mockResponse({ success: true });
    }
};
