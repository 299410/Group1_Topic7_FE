export interface Invoice {
    id: string;
    storeName: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue' | 'cancelled';
    date: string;
    dueDate: string;
    items: InvoiceItem[];
}

export interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
}

export const FINANCE_STATS = {
    totalRevenue: 1250500,
    outstanding: 45200,
    marketingFund: 125000,
    royalties: 250000
};

export const INVOICES: Invoice[] = [
    {
        id: 'INV-2024-001',
        storeName: 'Downtown Coffee',
        amount: 5000.00,
        status: 'paid',
        date: '2024-01-15',
        dueDate: '2024-01-30',
        items: [
            { description: 'Franchise Fee (Jan)', quantity: 1, price: 2000 },
            { description: 'Royalties (5%)', quantity: 1, price: 1500 },
            { description: 'Marketing Fund (2%)', quantity: 1, price: 600 },
            { description: 'Ingredient Supply', quantity: 1, price: 900 }
        ]
    },
    {
        id: 'INV-2024-002',
        storeName: 'Uptown Bakery',
        amount: 3200.50,
        status: 'pending',
        date: '2024-02-01',
        dueDate: '2024-02-15',
        items: [
            { description: 'Royalties (5%)', quantity: 1, price: 2500 },
            { description: 'Marketing Fund (2%)', quantity: 1, price: 700.50 }
        ]
    },
    {
        id: 'INV-2024-003',
        storeName: 'Westside Express',
        amount: 8500.00,
        status: 'overdue',
        date: '2024-01-20',
        dueDate: '2024-02-05',
        items: [
            { description: 'Equipment Leasing', quantity: 1, price: 8500 }
        ]
    },
    {
        id: 'INV-2024-004',
        storeName: 'Airport Kiosk',
        amount: 2100.00,
        status: 'paid',
        date: '2024-02-05',
        dueDate: '2024-02-20',
        items: [
            { description: 'Ingredient Supply', quantity: 1, price: 2100 }
        ]
    },
    {
        id: 'INV-2024-005',
        storeName: 'Downtown Coffee',
        amount: 1500.00,
        status: 'pending',
        date: '2024-02-10',
        dueDate: '2024-02-25',
        items: [
            { description: 'Marketing Material Design', quantity: 1, price: 1500 }
        ]
    }
];

export const financeService = {
    getStats: async () => {
        return new Promise<{ data: typeof FINANCE_STATS }>((resolve) => {
            setTimeout(() => resolve({ data: FINANCE_STATS }), 500);
        });
    },
    getInvoices: async () => {
        return new Promise<{ data: Invoice[] }>((resolve) => {
            setTimeout(() => resolve({ data: INVOICES }), 600);
        });
    },
    updateInvoiceStatus: async (id: string, status: Invoice['status']) => {
        return new Promise<void>((resolve) => {
            const invoice = INVOICES.find(i => i.id === id);
            if (invoice) invoice.status = status;
            setTimeout(() => resolve(), 400);
        });
    }
};
