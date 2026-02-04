import { create } from 'zustand';
import type { AuthState, User } from '../types/user';

interface AppStore extends AuthState {
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
    user: null, // Initial state: not logged in
    isAuthenticated: false,
    token: null,

    login: (user: User, token: string) => set({ user, isAuthenticated: true, token }),
    logout: () => set({ user: null, isAuthenticated: false, token: null }),
}));
