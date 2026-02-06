import type { ReactNode } from 'react';

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string | number;
    isLoading?: boolean;
    emptyMessage?: string;
    onRowClick?: (item: T) => void;
}

export function DataTable<T>({
    data,
    columns,
    keyExtractor,
    isLoading = false,
    emptyMessage = 'No data available',
    onRowClick,
}: DataTableProps<T>) {
    if (isLoading) {
        return (
            <div className="w-full h-48 flex items-center justify-center text-gray-500">
                Loading...
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="w-full h-48 flex items-center justify-center text-gray-500 border rounded-lg bg-gray-50">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="relative overflow-x-auto shadow-sm rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} scope="col" className={`px-6 py-3 ${col.className || ''}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            key={keyExtractor(item)}
                            className={`bg-white border-b hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                            onClick={() => onRowClick && onRowClick(item)}
                        >
                            {columns.map((col, index) => (
                                <td key={index} className={`px-6 py-4 ${col.className || ''}`}>
                                    {col.cell
                                        ? col.cell(item)
                                        : col.accessorKey
                                            ? String(item[col.accessorKey])
                                            : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
