import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, ShoppingCart, Users, DollarSign } from 'lucide-react';

const SALES_DATA = [
  { month: 'Jan', sales: 4000, orders: 240, users: 240 },
  { month: 'Feb', sales: 3000, orders: 221, users: 221 },
  { month: 'Mar', sales: 2000, orders: 229, users: 200 },
  { month: 'Apr', sales: 2780, orders: 200, users: 250 },
  { month: 'May', sales: 1890, orders: 348, users: 210 },
  { month: 'Jun', sales: 2390, orders: 320, users: 222 },
];

const CATEGORY_DATA = [
  { category: 'Electronics', sales: 8500 },
  { category: 'Accessories', sales: 6200 },
  { category: 'Clothing', sales: 5100 },
  { category: 'Books', sales: 3800 },
  { category: 'Others', sales: 2400 },
];

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}

const STAT_CARDS: StatCard[] = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    label: 'Total Revenue',
    value: '$42,580',
    change: '+12.5% from last month',
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    label: 'Total Orders',
    value: '1,358',
    change: '+8.2% from last month',
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: 'Total Customers',
    value: '2,847',
    change: '+5.3% from last month',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    label: 'Average Order Value',
    value: '$31.40',
    change: '+2.1% from last month',
  },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat) => (
          <Card key={stat.label} className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-900 rounded-lg text-blue-200">
                  {stat.icon}
                </div>
              </div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              <p className="text-xs text-green-400 mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '4px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CATEGORY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '4px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
