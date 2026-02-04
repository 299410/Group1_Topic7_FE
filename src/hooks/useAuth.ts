import { useAppStore } from '../app/store';
import { authService } from '../services/auth.service';

export const useAuth = () => {
    const { user, isAuthenticated, login, logout } = useAppStore();

    const handleLogin = async (email: string, pass: string) => {
        try {
            const { user, token } = await authService.login(email, pass);
            login(user, token);
            return true;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    };

    const handleLogout = async () => {
        await authService.logout();
        logout();
    };

    return {
        user,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
    };
};
