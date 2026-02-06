import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { type Material } from '../../services/mock/material.mock';

const materialSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    sku: z.string().min(1, 'SKU is required'),
    category: z.string().min(1, 'Category is required'),
    cost: z.number().min(0, 'Cost must be positive'),
    unit: z.string().min(1, 'Unit is required'),
    stock: z.number().min(0, 'Stock cannot be negative'),
    minStockLevel: z.number().min(0, 'Min stock cannot be negative'),
    supplier: z.string().min(1, 'Supplier is required'),
    expiryDate: z.string().optional(),
    status: z.enum(['active', 'archived'])
});

type MaterialFormData = z.infer<typeof materialSchema>;

interface MaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: MaterialFormData) => void;
    initialData?: Material | null;
    isLoading?: boolean;
}

export const MaterialModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }: MaterialModalProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<MaterialFormData>({
        resolver: zodResolver(materialSchema),
        defaultValues: {
            name: '',
            sku: '',
            category: '',
            cost: 0,
            unit: 'kg',
            stock: 0,
            minStockLevel: 10,
            supplier: '',
            status: 'active'
        }
    });

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                expiryDate: initialData.expiryDate || ''
            });
        } else {
            reset({
                name: '',
                sku: '',
                category: '',
                cost: 0,
                unit: 'kg',
                stock: 0,
                minStockLevel: 10,
                supplier: '',
                status: 'active'
            });
        }
    }, [initialData, reset, isOpen]);

    const onSubmitForm = (data: MaterialFormData) => {
        onSubmit(data);
    };

    const footer = (
        <>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
            </Button>
            <Button type="submit" form="material-form" disabled={isLoading}>
                {isLoading ? 'Saving...' : (initialData ? 'Update Material' : 'Create Material')}
            </Button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? 'Edit Material' : 'Add New Material'}
            size="lg"
            footer={footer}
        >
            <form id="material-form" onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Material Name</label>
                        <Input {...register('name')} placeholder="e.g. Raw Beef" />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">SKU</label>
                        <Input {...register('sku')} placeholder="e.g. RM-001" />
                        {errors.sku && <p className="text-red-500 text-xs">{errors.sku.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Input {...register('category')} placeholder="e.g. Meat" />
                        {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Supplier</label>
                        <Input {...register('supplier')} placeholder="e.g. Green Valley" />
                        {errors.supplier && <p className="text-red-500 text-xs">{errors.supplier.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cost Price</label>
                        <Input
                            type="number"
                            step="0.01"
                            {...register('cost', { valueAsNumber: true })}
                        />
                        {errors.cost && <p className="text-red-500 text-xs">{errors.cost.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Unit</label>
                        <select
                            {...register('unit')}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="kg">Kg</option>
                            <option value="g">Gram</option>
                            <option value="L">Liter</option>
                            <option value="ml">ml</option>
                            <option value="pcs">Pcs</option>
                            <option value="box">Box</option>
                        </select>
                        {errors.unit && <p className="text-red-500 text-xs">{errors.unit.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Min Stock Level</label>
                        <Input
                            type="number"
                            {...register('minStockLevel', { valueAsNumber: true })}
                        />
                        {errors.minStockLevel && <p className="text-red-500 text-xs">{errors.minStockLevel.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Current Stock</label>
                        <Input
                            type="number"
                            {...register('stock', { valueAsNumber: true })}
                        />
                        {errors.stock && <p className="text-red-500 text-xs">{errors.stock.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry Date (Optional)</label>
                        <Input
                            type="date"
                            {...register('expiryDate')}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-xs">{errors.expiryDate.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <div className="flex space-x-4">
                        {['active', 'archived'].map((status) => (
                            <label key={status} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value={status}
                                    {...register('status')}
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="capitalize text-sm">{status}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </form>
        </Modal>
    );
};
