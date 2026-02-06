import { useAppStore } from '../app/store';
import { authService } from '../services/auth.service';

export const useAuth = () => {
    const { user, isAuthenticated, login, logout } = useAppStore();

    const handleLogin = async (email: string, pass: string): Promise<string | null> => {
        try {
            const { user, token, refreshToken } = await authService.login(email, pass);
            // Save to localStorage
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', refreshToken);
            // Update store
            login(user, token);
            return null; // Success, no error
        } catch (error: any) {
            console.error('Login failed', error);
            // Return specific error message from backend if available
            if (error.response && error.response.data) {
                // Assuming standard Spring Boot error structure or custom message
                // Try to find a message field
                const msg = error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
                return msg;
            }
            return error.message || 'Login failed';
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error', error);
        } finally {
            // Include cleanup even if API call fails
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            logout();
        }
    };

    return {
        user,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
    };
};
