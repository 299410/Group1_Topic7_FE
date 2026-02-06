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
    login: async (username: string, _password: string): Promise<{ user: User; token: string; refreshToken: string }> => {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        ...MOCK_USER,
                        name: username // Use the entered username
                    },
                    token: 'mock-jwt-token',
                    refreshToken: 'mock-refresh-token'
                });
            }, 500);
        });
    },

    logout: async () => {
        return Promise.resolve();
    }
};
