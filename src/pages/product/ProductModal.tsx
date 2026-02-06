import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Drawer } from '../../components/ui/Drawer';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { type Product } from '../../services/mock/product.mock';
import { Package, Tag, DollarSign, BarChart3, Image as ImageIcon } from 'lucide-react';

const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    sku: z.string().min(1, 'SKU is required'),
    category: z.string().min(1, 'Category is required'),
    price: z.number().min(0, 'Price must be positive'),
    cost: z.number().min(0, 'Cost must be positive'),
    unit: z.string().min(1, 'Unit is required'),
    stock: z.number().min(0, 'Stock cannot be negative'),
    image: z.string().url('Invalid image URL').optional().or(z.literal('')),
    status: z.enum(['active', 'draft', 'archived'])
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormData) => void;
    initialData?: Product | null;
    isLoading?: boolean;
}

export const ProductModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }: ProductModalProps) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            sku: '',
            category: '',
            price: 0,
            cost: 0,
            unit: 'pcs',
            stock: 0,
            image: '',
            status: 'active'
        }
    });

    const currentStatus = watch('status');

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                image: initialData.image || ''
            });
        } else {
            reset({
                name: '',
                sku: '',
                category: '',
                price: 0,
                cost: 0,
                unit: 'pcs',
                stock: 0,
                image: '',
                status: 'active'
            });
        }
    }, [initialData, reset, isOpen]);

    const onSubmitForm = (data: ProductFormData) => {
        onSubmit(data);
    };

    const footer = (
        <div className="flex justify-end gap-3 w-full">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
            </Button>
            <Button type="submit" form="product-form" disabled={isLoading} className="min-w-[120px]">
                {isLoading ? 'Saving...' : (initialData ? 'Update Product' : 'Create Product')}
            </Button>
        </div>
    );

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? 'Edit Product' : 'Add New Product'}
            description={initialData ? 'Update product information and inventory.' : 'Create a new product record.'}
            width="max-w-md"
            footer={footer}
        >
            <form id="product-form" onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">

                {/* Basic Info */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-800 font-medium pb-2 border-b border-gray-100">
                        <Package size={18} className="text-blue-600" />
                        <h3>Basic Information</h3>
                    </div>
                    <div className="space-y-4">
                        <Input
                            label="Product Name"
                            placeholder="e.g. Signature Coffee"
                            error={errors.name?.message}
                            {...register('name')}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="SKU"
                                placeholder="e.g. CF-001"
                                error={errors.sku?.message}
                                {...register('sku')}
                            />
                            <Input
                                label="Category"
                                placeholder="e.g. Coffee"
                                icon={<Tag size={16} className="text-gray-400" />}
                                error={errors.category?.message}
                                {...register('category')}
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing & Unit */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-800 font-medium pb-2 border-b border-gray-100">
                        <DollarSign size={18} className="text-green-600" />
                        <h3>Pricing & Unit</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Selling Price"
                            type="number"
                            step="0.01"
                            icon={<span className="text-gray-500 font-bold">$</span>}
                            error={errors.price?.message}
                            {...register('price', { valueAsNumber: true })}
                        />
                        <Input
                            label="Cost Price"
                            type="number"
                            step="0.01"
                            icon={<span className="text-gray-500 font-bold">$</span>}
                            error={errors.cost?.message}
                            {...register('cost', { valueAsNumber: true })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Unit Type</label>
                            <select
                                {...register('unit')}
                                className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="pcs">Pieces (pcs)</option>
                                <option value="kg">Kilograms (kg)</option>
                                <option value="g">Grams (g)</option>
                                <option value="L">Liters (L)</option>
                                <option value="ml">Milliliters (ml)</option>
                                <option value="portion">Portion</option>
                            </select>
                            {errors.unit && <p className="text-red-500 text-xs">{errors.unit.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Inventory Status */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-800 font-medium pb-2 border-b border-gray-100">
                        <BarChart3 size={18} className="text-purple-600" />
                        <h3>Inventory & Status</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Initial Stock"
                            type="number"
                            error={errors.stock?.message}
                            {...register('stock', { valueAsNumber: true })}
                        />
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">Status</label>
                            <div className="flex flex-wrap gap-2">
                                {['active', 'draft', 'archived'].map((status) => (
                                    <label key={status} className={`
                                        cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                                        ${currentStatus === status
                                            ? 'bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-100'
                                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                                    `}>
                                        <input
                                            type="radio"
                                            value={status}
                                            {...register('status')}
                                            className="sr-only"
                                        />
                                        <span className="capitalize">{status}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-800 font-medium pb-2 border-b border-gray-100">
                        <ImageIcon size={18} className="text-orange-600" />
                        <h3>Media</h3>
                    </div>
                    <Input
                        label="Image URL"
                        placeholder="https://example.com/image.jpg"
                        error={errors.image?.message}
                        {...register('image')}
                    />
                </div>

            </form>
        </Drawer>
    );
};
