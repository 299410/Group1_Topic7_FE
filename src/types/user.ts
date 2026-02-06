export type UserRole = 'ADMIN' | 'MANAGER' | 'SUPPLY_COORDINATOR' | 'KITCHEN_STAFF' | 'STORE_STAFF';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
    phone?: string;
    address?: string;
    bio?: string;
    joinDate?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
}
