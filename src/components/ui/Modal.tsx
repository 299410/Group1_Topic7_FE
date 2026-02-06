import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) => {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 backdrop-blur-sm p-4 md:inset-0 md:h-full">
            <div className={`relative w-full ${sizes[size]} max-h-full rounded-lg bg-white shadow-xl`}>
                {/* Header */}
                {title && (
                    <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            type="button"
                            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                        >
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};
