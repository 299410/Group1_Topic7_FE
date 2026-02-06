import { delay, mockResponse } from './index';

export interface Material {
    id: string;
    sku: string;
    name: string;
    category: string; // e.g., Meat, Spices, Packaging
    cost: number;
    unit: string;
    stock: number;
    minStockLevel: number; // For alerts
    supplier: string;
    expiryDate?: string;
    status: 'active' | 'archived';
}

const MOCK_MATERIALS: Material[] = [
    { id: '1', sku: 'RM-001', name: 'Raw Beef Sirloin', category: 'Meat', cost: 12.00, unit: 'kg', stock: 150, minStockLevel: 50, supplier: 'Green Valley Farm', status: 'active', expiryDate: '2023-11-20' },
    { id: '2', sku: 'RM-002', name: 'Black Pepper', category: 'Spices', cost: 25.00, unit: 'kg', stock: 20, minStockLevel: 5, supplier: 'Spice World', status: 'active' },
    { id: '3', sku: 'PK-001', name: 'Vacuum Bags (Large)', category: 'Packaging', cost: 0.10, unit: 'pcs', stock: 5000, minStockLevel: 1000, supplier: 'PackIt All', status: 'active' },
    { id: '4', sku: 'RM-003', name: 'Olive Oil', category: 'Condiments', cost: 8.50, unit: 'L', stock: 40, minStockLevel: 10, supplier: 'Global Foods', status: 'active', expiryDate: '2024-05-15' },
];

export const materialService = {
    getMaterials: async () => {
        await delay(500);
        return mockResponse([...MOCK_MATERIALS]);
    },

    getMaterialById: async (id: string) => {
        await delay(300);
        const material = MOCK_MATERIALS.find(m => m.id === id);
        if (material) return mockResponse(material);
        throw new Error('Material not found');
    },

    createMaterial: async (material: Partial<Material>) => {
        await delay(800);
        const newMaterial = {
            ...material,
            id: String(MOCK_MATERIALS.length + 1),
            stock: material.stock || 0,
            status: material.status || 'active'
        } as Material;
        MOCK_MATERIALS.push(newMaterial);
        return mockResponse(newMaterial);
    },

    updateMaterial: async (id: string, updates: Partial<Material>) => {
        await delay(600);
        const index = MOCK_MATERIALS.findIndex(m => m.id === id);
        if (index === -1) throw new Error('Material not found');
        MOCK_MATERIALS[index] = { ...MOCK_MATERIALS[index], ...updates };
        return mockResponse(MOCK_MATERIALS[index]);
    },

    deleteMaterial: async (id: string) => {
        await delay(400);
        const index = MOCK_MATERIALS.findIndex(m => m.id === id);
        if (index !== -1) {
            MOCK_MATERIALS.splice(index, 1);
        }
        return mockResponse({ success: true });
    }
};
