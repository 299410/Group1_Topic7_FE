import type { User } from '../types/user';

// Mock user data for dev
const MOCK_USER: User = {
    id: '1',
    name: 'Admin User',
    email: 'admin@franchise.com',
    role: 'ADMIN',
    avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User',
};

export const authService = {
    login: async (_email: string, _password: string): Promise<{ user: User; token: string }> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: MOCK_USER,
                    token: 'mock-jwt-token',
                });
            }, 500);
        });
    },

    logout: async () => {
        return Promise.resolve();
    }
};
