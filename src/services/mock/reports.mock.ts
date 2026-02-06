export interface SalesData {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

export interface StorePerformance {
    storeName: string;
    revenue: number;
    orders: number;
    rating: number;
}

export interface ProductPerformance {
    name: string;
    sales: number;
    growth: number;
}

export const SALES_DATA: SalesData[] = [
    { month: 'Jan', revenue: 65000, expenses: 40000, profit: 25000 },
    { month: 'Feb', revenue: 72000, expenses: 45000, profit: 27000 },
    { month: 'Mar', revenue: 85000, expenses: 48000, profit: 37000 },
    { month: 'Apr', revenue: 81000, expenses: 47000, profit: 34000 },
    { month: 'May', revenue: 95000, expenses: 52000, profit: 43000 },
    { month: 'Jun', revenue: 110000, expenses: 60000, profit: 50000 }
];

export const TOP_STORES: StorePerformance[] = [
    { storeName: 'Downtown Coffee', revenue: 450000, orders: 3200, rating: 4.8 },
    { storeName: 'Uptown Bakery', revenue: 380000, orders: 2800, rating: 4.6 },
    { storeName: 'Westside Express', revenue: 290000, orders: 2100, rating: 4.5 },
    { storeName: 'Airport Kiosk', revenue: 180000, orders: 4500, rating: 4.2 },
    { storeName: 'Mall Plaza', revenue: 150000, orders: 1200, rating: 4.0 }
];

export const TOP_PRODUCTS: ProductPerformance[] = [
    { name: 'Signature Espresso', sales: 15000, growth: 12.5 },
    { name: 'Croissant Box', sales: 8500, growth: 8.2 },
    { name: 'Cold Brew', sales: 12000, growth: 15.0 },
    { name: 'Avocado Toast', sales: 6000, growth: -2.4 },
    { name: 'Berry Smoothie', sales: 5500, growth: 5.1 }
];

export const reportService = {
    getSalesOverview: async () => {
        return new Promise<{ data: SalesData[] }>((resolve) => {
            setTimeout(() => resolve({ data: SALES_DATA }), 800);
        });
    },
    getTopStores: async () => {
        return new Promise<{ data: StorePerformance[] }>((resolve) => {
            setTimeout(() => resolve({ data: TOP_STORES }), 600);
        });
    },
    getTopProducts: async () => {
        return new Promise<{ data: ProductPerformance[] }>((resolve) => {
            setTimeout(() => resolve({ data: TOP_PRODUCTS }), 700);
        });
    }
};
