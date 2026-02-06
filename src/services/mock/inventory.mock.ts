import { delay, mockResponse } from './index';

export interface InventoryItem {
    id: string;
    itemId: string; // reference to Product or Material ID
    itemName: string;
    type: 'product' | 'material';
    locationId: 'kitchen' | string; // 'kitchen' or Store ID
    quantity: number;
    unit: string;
    minStockLevel: number;
    lastUpdated: string;
}

const MOCK_INVENTORY: InventoryItem[] = [
    // Kitchen Inventory (Materials)
    { id: 'INV-001', itemId: '1', itemName: 'Raw Beef Sirloin', type: 'material', locationId: 'kitchen', quantity: 120, unit: 'kg', minStockLevel: 50, lastUpdated: '2023-10-26' },
    { id: 'INV-002', itemId: '2', itemName: 'Black Pepper', type: 'material', locationId: 'kitchen', quantity: 18, unit: 'kg', minStockLevel: 5, lastUpdated: '2023-10-25' },

    // Store 1 Inventory (Products & Materials if applicable)
    { id: 'INV-003', itemId: '1', itemName: 'Signature Coffee Blend', type: 'product', locationId: '1', quantity: 45, unit: 'bags', minStockLevel: 10, lastUpdated: '2023-10-26' },
    { id: 'INV-004', itemId: '4', itemName: 'Ceramic Mug', type: 'product', locationId: '1', quantity: 12, unit: 'pcs', minStockLevel: 5, lastUpdated: '2023-10-20' },

    // Store 2 Inventory
    { id: 'INV-005', itemId: '1', itemName: 'Signature Coffee Blend', type: 'product', locationId: '2', quantity: 20, unit: 'bags', minStockLevel: 10, lastUpdated: '2023-10-26' },
];

export const inventoryService = {
    getInventoryByLocation: async (locationId: string) => {
        await delay(500);
        return mockResponse(MOCK_INVENTORY.filter(i => i.locationId === locationId));
    },

    updateStock: async (id: string, quantity: number, _reason: string) => {
        await delay(600);
        const index = MOCK_INVENTORY.findIndex(i => i.id === id);
        if (index === -1) throw new Error('Inventory item not found');

        MOCK_INVENTORY[index] = {
            ...MOCK_INVENTORY[index],
            quantity,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        return mockResponse(MOCK_INVENTORY[index]);
    },

    // Helper to get low stock items
    getLowStockAlerts: async () => {
        await delay(400);
        return mockResponse(MOCK_INVENTORY.filter(i => i.quantity <= i.minStockLevel));
    }
};
