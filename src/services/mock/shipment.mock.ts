import { delay, mockResponse } from './index';
import { orderService } from './order.mock';

export interface TrackingUpdate {
    timestamp: string;
    location: string;
    details: string;
    status: Shipment['status'];
}

export interface Shipment {
    id: string;
    orderIds: string[]; // Linked orders
    origin: string;
    destination: string;
    status: 'scheduled' | 'in_transit' | 'delivered' | 'delayed';
    eta: string;
    driver: string;
    vehicle: string;
    updates: TrackingUpdate[];
}

export let SHIPMENTS: Shipment[] = [
    {
        id: 'SHP-8842',
        orderIds: ['ORD-003'],
        origin: 'Central Kitchen',
        destination: 'Downtown Store',
        status: 'in_transit',
        eta: '2023-10-25 14:30',
        driver: 'Mike T.',
        vehicle: 'Truck-01',
        updates: [
            { timestamp: '2023-10-25 08:00', location: 'Central Kitchen', details: 'Shipment created and scheduled', status: 'scheduled' },
            { timestamp: '2023-10-25 09:15', location: 'Central Kitchen', details: 'Loaded onto vehicle Truck-01', status: 'scheduled' },
            { timestamp: '2023-10-25 09:30', location: 'Central Kitchen', details: 'Departed from origin', status: 'in_transit' },
            { timestamp: '2023-10-25 10:45', location: 'Highway 405', details: 'En route, on schedule', status: 'in_transit' }
        ]
    },
    {
        id: 'SHP-9921',
        orderIds: [],
        origin: 'Central Kitchen',
        destination: 'Brooklyn Hub',
        status: 'delivered',
        eta: '2023-10-24 10:15',
        driver: 'John D.',
        vehicle: 'Van-05',
        updates: [
            { timestamp: '2023-10-24 07:00', location: 'Central Kitchen', details: 'Shipment scheduled', status: 'scheduled' },
            { timestamp: '2023-10-24 08:30', location: 'Central Kitchen', details: 'Departed', status: 'in_transit' },
            { timestamp: '2023-10-24 10:15', location: 'Brooklyn Hub', details: 'Arrived at destination', status: 'delivered' }
        ]
    },
    {
        id: 'SHP-7735',
        orderIds: [],
        origin: 'Central Kitchen',
        destination: 'Queens Outlet',
        status: 'scheduled',
        eta: '2023-10-26 09:00',
        driver: 'Sarah L.',
        vehicle: 'Truck-02',
        updates: [
            { timestamp: '2023-10-25 14:00', location: 'Central Kitchen', details: 'Order processing complete, scheduled for pickup', status: 'scheduled' }
        ]
    },
    {
        id: 'SHP-6529',
        orderIds: [],
        origin: 'Supplier A',
        destination: 'Central Kitchen',
        status: 'delayed',
        eta: '2023-10-25 18:00',
        driver: 'FedEx',
        vehicle: '-',
        updates: [
            { timestamp: '2023-10-24 16:00', location: 'Supplier A', details: 'Package ready for pickup', status: 'scheduled' },
            { timestamp: '2023-10-25 09:00', location: 'Distributor Center', details: 'Delay reported due to traffic', status: 'delayed' }
        ]
    },
];

export const shipmentService = {
    getShipments: async () => {
        await delay(600);
        return mockResponse([...SHIPMENTS]);
    },

    createShipment: async (orderIds: string[], driver: string, vehicle: string, destination: string) => {
        await delay(800);
        const newShipment: Shipment = {
            id: `SHP-${Math.floor(Math.random() * 10000)}`,
            orderIds,
            origin: 'Central Kitchen',
            destination,
            status: 'scheduled',
            eta: new Date(Date.now() + 86400000).toLocaleString(), // Tomorrow
            driver,
            vehicle,
            updates: [
                { timestamp: new Date().toLocaleString(), location: 'Central Kitchen', details: 'Shipment created', status: 'scheduled' }
            ]
        };
        SHIPMENTS.unshift(newShipment);

        // Update all linked orders to 'shipping'
        for (const orderId of orderIds) {
            await orderService.updateStatus(orderId, 'shipping');
        }

        return mockResponse(newShipment);
    },

    updateStatus: async (id: string, status: Shipment['status'], location: string = 'In Transit', details: string = 'Status updated') => {
        await delay(400);
        const index = SHIPMENTS.findIndex(s => s.id === id);
        if (index === -1) throw new Error('Shipment not found');

        const newUpdate: TrackingUpdate = {
            timestamp: new Date().toLocaleString(),
            location,
            details,
            status
        };

        SHIPMENTS[index] = {
            ...SHIPMENTS[index],
            status,
            updates: [newUpdate, ...SHIPMENTS[index].updates] // Prepend new update
        };

        if (status === 'delivered') {
            for (const orderId of SHIPMENTS[index].orderIds) {
                await orderService.updateStatus(orderId, 'delivered');
            }
        }

        return mockResponse(SHIPMENTS[index]);
    }
};
