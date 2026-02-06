import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
    return (
        <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/src/assets/steakhouse_bg.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 relative">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-serif font-extrabold text-white tracking-tight drop-shadow-xl">
                        Bistack Franchise
                    </h2>
                    <p className="mt-2 text-amber-500 text-lg font-medium drop-shadow-md tracking-wide uppercase text-xs">
                        Premium Management System
                    </p>
                </div>

                <div className="bg-black/60 backdrop-blur-xl py-8 px-4 shadow-2xl rounded-lg sm:px-10 border border-white/10">
                    <Outlet />
                </div>

                <p className="mt-6 text-center text-xs text-white/40">
                    &copy; {new Date().getFullYear()} Bistack Franchise System
                </p>
            </div>
        </div>
    );
};
