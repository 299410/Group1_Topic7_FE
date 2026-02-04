import React from 'react';
import { LineChart } from '../../components/chart/LineChart';
import { DataTable, ColumnDef } from '../../components/table/DataTable';
import { useAuth } from '../../hooks/useAuth';
import { TrendingUp, Users, DollarSign, Store } from 'lucide-react';

const MOCK_CHART_DATA = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
];

interface RecentOrder {
    id: string;
    customer: string;
    amount: string;
    status: string;
}

const RECENT_ORDERS: RecentOrder[] = [
    { id: 'ORD-001', customer: 'Store A', amount: '$1,200', status: 'Completed' },
    { id: 'ORD-002', customer: 'Store B', amount: '$850', status: 'Processing' },
    { id: 'ORD-003', customer: 'Store C', amount: '$2,300', status: 'Completed' },
    { id: 'ORD-004', customer: 'Store A', amount: '$450', status: 'Pending' },
];

const columns: ColumnDef<RecentOrder>[] = [
    { header: 'Order ID', accessorKey: 'id' },
    { header: 'Customer', accessorKey: 'customer' },
    { header: 'Amount', accessorKey: 'amount' },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: (row) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    row.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                }`}>
                {row.status}
            </span>
        )
    },
];

const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <Icon className="h-6 w-6" />
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                {trend}
            </span>
            <span className="text-gray-500 ml-2">vs last month</span>
        </div>
    </div>
);

export const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Welcome back, {user?.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="$45,231" icon={DollarSign} trend="+20.1%" />
                <StatCard title="Active Stores" value="12" icon={Store} trend="+2" />
                <StatCard title="Total Users" value="2,300" icon={Users} trend="+180" />
                <StatCard title="Active Orders" value="573" icon={TrendingUp} trend="+201" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
                    <div className="h-80">
                        <LineChart data={MOCK_CHART_DATA} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
                    <DataTable data={RECENT_ORDERS} columns={columns} />
                </div>
            </div>
        </div>
    );
};
