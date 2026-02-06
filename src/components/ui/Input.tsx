import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
    labelClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, icon, labelClassName = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className={`block text-sm font-medium mb-1 ${labelClassName || 'text-gray-700'}`}>
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
                            block w-full rounded-md border border-gray-300 bg-white
                            py-2 text-sm placeholder-gray-400
                            focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                            disabled:opacity-50
                            ${icon ? 'pl-10' : 'px-3'}
                            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                            ${className}
                        `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
