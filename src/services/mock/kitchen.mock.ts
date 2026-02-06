import { delay, mockResponse } from './index';
import { orderService } from './order.mock';

export interface ProductionTask {
    id: string;
    orderId?: string; // Link to order
    productName: string;
    quantity: number;
    unit: string;
    dueDate: string;
    dueTime?: string; // e.g. "14:30"
    status: 'pending' | 'in_progress' | 'completed';
    assignedTo: string;
}

export let PRODUCTION_TASKS: ProductionTask[] = [
    { id: '1', orderId: 'ORD-001', productName: 'Bê bò bistech đặc biệt', quantity: 50, unit: 'portion', dueDate: '2026-02-06', dueTime: '10:00', status: 'in_progress', assignedTo: 'Bếp Trưởng' },
    { id: '2', orderId: 'ORD-001', productName: 'Sốt tiêu đen', quantity: 10, unit: 'lit', dueDate: '2026-02-07', dueTime: '14:30', status: 'pending', assignedTo: 'Phụ Bếp A' },
    { id: '3', productName: 'Khoai tây cắt sợi', quantity: 50, unit: 'kg', dueDate: '2026-02-05', status: 'completed', assignedTo: 'Phụ Bếp B' },
    { id: '4', productName: 'Salad Dressing', quantity: 5, unit: 'lit', dueDate: '2026-02-08', dueTime: '09:00', status: 'pending', assignedTo: 'Bếp Lạnh' },
];

export const kitchenService = {
    getProductionSchedule: async () => {
        await delay(500);
        return mockResponse([...PRODUCTION_TASKS]);
    },

    createTaskFromOrder: async (orderId: string, items: any[]) => {
        await delay(600);
        const newTasks = items.map((item) => ({
            id: `TASK-${Math.floor(Math.random() * 10000)}`,
            orderId,
            productName: item.name || 'Unknown Product',
            quantity: item.quantity || 10,
            unit: 'units',
            dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // +2 days
            dueTime: '12:00',
            status: 'pending' as const,
            assignedTo: 'Unassigned'
        }));
        PRODUCTION_TASKS.push(...newTasks);
        return mockResponse(newTasks);
    },

    createTask: async (task: Omit<ProductionTask, 'id' | 'status' | 'orderId'>) => {
        await delay(600);
        const newTask: ProductionTask = {
            id: `TASK-${Math.floor(Math.random() * 10000)}`,
            status: 'pending',
            ...task
        };
        PRODUCTION_TASKS.push(newTask);
        return mockResponse(newTask);
    },

    updateTaskStatus: async (taskId: string, status: ProductionTask['status']) => {
        await delay(400);
        const taskIndex = PRODUCTION_TASKS.findIndex(t => t.id === taskId);
        if (taskIndex === -1) throw new Error('Task not found');

        PRODUCTION_TASKS[taskIndex] = { ...PRODUCTION_TASKS[taskIndex], status };

        // Auto-sync logic: If all tasks for an order are completed, update Order to 'produced'
        // If at least one is in_progress, update Order to 'in_production'
        const task = PRODUCTION_TASKS[taskIndex];
        if (task.orderId) {
            const orderTasks = PRODUCTION_TASKS.filter(t => t.orderId === task.orderId);
            const allCompleted = orderTasks.every(t => t.status === 'completed');
            const anyInProgress = orderTasks.some(t => t.status === 'in_progress' || t.status === 'completed');

            if (allCompleted) {
                await orderService.updateStatus(task.orderId, 'produced');
            } else if (anyInProgress) {
                await orderService.updateStatus(task.orderId, 'in_production');
            }
        }

        return mockResponse(PRODUCTION_TASKS[taskIndex]);
    }
};
