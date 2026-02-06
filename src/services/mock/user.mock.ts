import { delay, mockResponse } from './index';
import type { User } from '../../types/user';

const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@franchise.com',
        role: 'ADMIN',
        avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User',
        phone: '+1 (555) 123-4567',
        address: '123 Franchise Blvd, New York, NY 10001',
        bio: 'Senior Administrator with 10 years of experience in franchise management.',
        joinDate: '2021-01-15'
    },
    {
        id: '2',
        name: 'Store Manager',
        email: 'manager@store.com',
        role: 'MANAGER',
        avatarUrl: 'https://ui-avatars.com/api/?name=Store+Manager',
        phone: '+1 (555) 987-6543',
        address: '456 Market St, Brooklyn, NY 11201',
        joinDate: '2022-03-10'
    },
    {
        id: '3',
        name: 'Head Chef',
        email: 'chef@kitchen.com',
        role: 'KITCHEN_STAFF',
        avatarUrl: 'https://ui-avatars.com/api/?name=Head+Chef',
        phone: '+1 (555) 456-7890',
        address: '789 Culinary Way, Queens, NY 11101',
        joinDate: '2022-06-20'
    },
    {
        id: '4',
        name: 'Supply Coord',
        email: 'supply@logistics.com',
        role: 'SUPPLY_COORDINATOR',
        avatarUrl: 'https://ui-avatars.com/api/?name=Supply+Coord',
        phone: '+1 (555) 111-2222',
        address: '321 Warehouse Dr, Jersey City, NJ 07302',
        joinDate: '2021-11-05'
    },
    {
        id: '5',
        name: 'Staff Member',
        email: 'staff@store.com',
        role: 'STORE_STAFF',
        avatarUrl: 'https://ui-avatars.com/api/?name=Staff+Member',
        phone: '+1 (555) 333-4444',
        address: '654 Broadway, New York, NY 10012',
        joinDate: '2023-02-01'
    },
];

export const userService = {
    getUsers: async () => {
        await delay(600);
        return mockResponse([...MOCK_USERS]);
    },

    createUser: async (user: Omit<User, 'id'>) => {
        await delay(800);
        const newUser = { ...user, id: Math.random().toString(36).substr(2, 9) };
        MOCK_USERS.push(newUser);
        return mockResponse(newUser, 'User created successfully');
    },

    updateUser: async (id: string, updates: Partial<User>) => {
        await delay(800);
        const index = MOCK_USERS.findIndex(u => u.id === id);
        if (index !== -1) {
            MOCK_USERS[index] = { ...MOCK_USERS[index], ...updates };
            return mockResponse(MOCK_USERS[index], 'User updated successfully');
        }
        throw new Error('User not found');
    },

    deleteUser: async (id: string) => {
        await delay(600);
        const index = MOCK_USERS.findIndex(u => u.id === id);
        if (index !== -1) {
            MOCK_USERS.splice(index, 1);
            return mockResponse(true, 'User deleted successfully');
        }
        throw new Error('User not found');
    }
};
