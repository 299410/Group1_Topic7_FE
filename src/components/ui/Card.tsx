import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    action?: ReactNode;
    onClick?: () => void;
}

export const Card = ({ children, className = '', title, action, onClick }: CardProps) => {
    return (
        <div
            className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className} ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            {(title || action) && (
                <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                    {title && <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
