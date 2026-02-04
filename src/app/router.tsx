import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../pages/auth/Login';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { ComingSoon } from '../components/ComingSoon';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types/user';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: UserRole[] }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Unauthorized Access</h2>
                <p className="text-gray-500">You do not have permission to view this page.</p>
            </div>
        );
    }

    return <Outlet />;
};

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <AuthLayout />,
        children: [
            { path: '', element: <Login /> }
        ]
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    { index: true, element: <Dashboard /> },

                    // Users Module (Admin Only)
                    {
                        path: 'users',
                        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
                        children: [
                            { index: true, element: <ComingSoon /> },
                            { path: 'roles', element: <ComingSoon /> }
                        ]
                    },

                    // Franchise Store Module (Admin, Manager)
                    {
                        path: 'stores',
                        element: <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']} />,
                        children: [
                            { index: true, element: <ComingSoon /> },
                            { path: 'inventory', element: <ComingSoon /> },
                            { path: 'orders', element: <ComingSoon /> }
                        ]
                    },

                    // Central Kitchen Module (Admin, Kitchen Staff)
                    {
                        path: 'kitchen',
                        element: <ProtectedRoute allowedRoles={['ADMIN', 'KITCHEN_STAFF']} />,
                        children: [
                            { index: true, element: <ComingSoon /> },
                            { path: 'production', element: <ComingSoon /> }
                        ]
                    },

                    // Products Module (Admin, Manager, Kitchen Staff)
                    {
                        path: 'products',
                        element: <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER', 'KITCHEN_STAFF']} />,
                        children: [
                            { index: true, element: <ComingSoon /> },
                            { path: 'categories', element: <ComingSoon /> },
                            { path: 'recipes', element: <ComingSoon /> }
                        ]
                    },

                    // Orders Module (Admin, Manager, Store Staff)
                    {
                        path: 'orders',
                        element: <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER', 'STORE_STAFF']} />,
                        children: [
                            { index: true, element: <ComingSoon /> },
                            { path: 'create', element: <ComingSoon /> },
                            { path: ':id', element: <ComingSoon /> }
                        ]
                    },

                    // Billing Module (Admin, Manager)
                    {
                        path: 'billing',
                        element: <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']} />,
                        children: [
                            { index: true, element: <ComingSoon /> },
                            { path: 'invoices', element: <ComingSoon /> }
                        ]
                    },

                    // Shipment Module (Admin, Supply Coordinator)
                    {
                        path: 'shipment',
                        element: <ProtectedRoute allowedRoles={['ADMIN', 'SUPPLY_COORDINATOR']} />,
                        children: [
                            { index: true, element: <ComingSoon /> }
                        ]
                    },

                    // Reports Module (Admin, Manager)
                    {
                        path: 'reports',
                        element: <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']} />,
                        children: [
                            { index: true, element: <ComingSoon /> }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }
]);
