import React from 'react';

export interface ColumnDef<T> {
    header: string;
    accessorKey: keyof T;
    cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
}

export const DataTable = <T,>({ data, columns }: DataTableProps<T>) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={String(col.accessorKey)}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                            {columns.map((col) => (
                                <td key={String(col.accessorKey)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {col.cell ? col.cell(row) : String(row[col.accessorKey])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
