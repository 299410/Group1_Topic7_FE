import { delay, mockResponse } from './index';

export interface Product {
    id: string;
    sku: string;
    name: string;
    category: string;
    price: number;
    cost: number;
    unit: string;
    stock: number;
    image: string;
    status: 'active' | 'draft' | 'archived';
}

const MOCK_PRODUCTS: Product[] = [
    { id: '1', sku: 'BS-001', name: 'Bê bò bistech đặc biệt', category: 'Main Course', price: 150000, cost: 70000, unit: 'portion', stock: 50, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=200', status: 'active' },
    { id: '2', sku: 'BS-002', name: 'Bê bò bistech sốt tiêu', category: 'Main Course', price: 135000, cost: 65000, unit: 'portion', stock: 45, image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&q=80&w=200', status: 'active' },
    { id: '3', sku: 'SD-001', name: 'Khoai tây chiên', category: 'Side Dish', price: 45000, cost: 15000, unit: 'portion', stock: 200, image: 'https://images.unsplash.com/photo-1573080496987-aeb4d9170d5c?auto=format&fit=crop&q=80&w=200', status: 'active' },
    { id: '4', sku: 'SD-002', name: 'Salad trộn', category: 'Side Dish', price: 35000, cost: 12000, unit: 'portion', stock: 150, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200', status: 'active' },
    { id: '5', sku: 'DR-001', name: 'Rượu vang đỏ', category: 'Drinks', price: 85000, cost: 40000, unit: 'glass', stock: 30, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=200', status: 'active' },
];

export const productService = {
    getProducts: async () => {
        await delay(500);
        return mockResponse([...MOCK_PRODUCTS]);
    },

    getProductById: async (id: string) => {
        await delay(300);
        const product = MOCK_PRODUCTS.find(p => p.id === id);
        if (product) return mockResponse(product);
        throw new Error('Product not found');
    },

    createProduct: async (product: Partial<Product>) => {
        await delay(800);
        const newProduct = {
            ...product,
            id: String(MOCK_PRODUCTS.length + 1),
            stock: product.stock || 0,
            image: product.image || 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=200'
        } as Product;
        MOCK_PRODUCTS.push(newProduct);
        return mockResponse(newProduct);
    },

    updateProduct: async (id: string, updates: Partial<Product>) => {
        await delay(600);
        const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Product not found');
        MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...updates };
        return mockResponse(MOCK_PRODUCTS[index]);
    },

    deleteProduct: async (id: string) => {
        await delay(400);
        const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
        if (index !== -1) {
            MOCK_PRODUCTS.splice(index, 1);
        }
        return mockResponse({ success: true });
    }
};
