import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../utils/classNames';
import {
    LayoutDashboard,
    Users,
    Store,
    ChefHat,
    Package,
    ShoppingCart,
    FileText,
    Truck,
    BarChart,
    LogOut
} from 'lucide-react';

export const MainLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navigation = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Users', href: '/users', icon: Users, roles: ['ADMIN'] },
        { name: 'Franchise Stores', href: '/stores', icon: Store, roles: ['ADMIN', 'MANAGER'] },
        { name: 'Central Kitchen', href: '/kitchen', icon: ChefHat, roles: ['ADMIN', 'KITCHEN_STAFF'] },
        { name: 'Products', href: '/products', icon: Package, roles: ['ADMIN', 'MANAGER', 'KITCHEN_STAFF'] },
        { name: 'Orders', href: '/orders', icon: ShoppingCart, roles: ['ADMIN', 'MANAGER', 'STORE_STAFF'] },
        { name: 'Billing', href: '/billing', icon: FileText, roles: ['ADMIN', 'MANAGER'] },
        { name: 'Shipment', href: '/shipment', icon: Truck, roles: ['ADMIN', 'SUPPLY_COORDINATOR'] },
        { name: 'Reports', href: '/reports', icon: BarChart, roles: ['ADMIN', 'MANAGER'] },
    ];

    const filteredNav = navigation.filter(item =>
        !item.roles || (user && item.roles.includes(user.role))
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg fixed h-full z-10 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b">
                    <span className="text-xl font-bold text-blue-600">FranchiseSys</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {filteredNav.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                                        isActive
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    )
                                }
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center mb-4 px-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                            {user?.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.role.replace('_', ' ')}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 border-b md:hidden">
                    <span className="text-lg font-bold text-blue-600">FranchiseSys</span>
                    {/* Mobile menu button could go here */}
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
