import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, ShoppingCart, Users, DollarSign, Package, AlertCircle, CheckCircle } from 'lucide-react';

const SALES_DATA = [
  { month: 'Jan', sales: 4000, orders: 240, users: 240, revenue: 12000 },
  { month: 'Feb', sales: 3000, orders: 221, users: 221, revenue: 15500 },
  { month: 'Mar', sales: 2000, orders: 229, users: 200, revenue: 14200 },
  { month: 'Apr', sales: 2780, orders: 200, users: 250, revenue: 18900 },
  { month: 'May', sales: 1890, orders: 348, users: 210, revenue: 16800 },
  { month: 'Jun', sales: 2390, orders: 320, users: 222, revenue: 19200 },
];

const CATEGORY_DATA = [
  { category: 'Building Materials', sales: 8500, value: 8500 },
  { category: 'Power Tools', sales: 6200, value: 6200 },
  { category: 'Hand Tools', sales: 5100, value: 5100 },
  { category: 'Plumbing', sales: 3800, value: 3800 },
  { category: 'Safety Gear', sales: 2400, value: 2400 },
];

const CUSTOMER_DATA = [
  { day: 'Mon', newCustomers: 45, returning: 120 },
  { day: 'Tue', newCustomers: 52, returning: 135 },
  { day: 'Wed', newCustomers: 38, returning: 110 },
  { day: 'Thu', newCustomers: 65, returning: 150 },
  { day: 'Fri', newCustomers: 78, returning: 165 },
  { day: 'Sat', newCustomers: 92, returning: 180 },
  { day: 'Sun', newCustomers: 38, returning: 95 },
];

const PRODUCT_PERFORMANCE = [
  { product: 'Cement Bags', sales: 450, rating: 4.8 },
  { product: 'Power Drill', sales: 320, rating: 4.6 },
  { product: 'Safety Helmet', sales: 280, rating: 4.5 },
  { product: 'PVC Pipes', sales: 240, rating: 4.7 },
  { product: 'Brick Trowel', sales: 190, rating: 4.4 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

const STAT_CARDS: StatCard[] = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    label: 'Total Revenue',
    value: '$42,580',
    change: '+12.5% from last month',
    trend: 'up',
    color: 'from-blue-600 to-blue-800',
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    label: 'Total Orders',
    value: '1,358',
    change: '+8.2% from last month',
    trend: 'up',
    color: 'from-green-600 to-green-800',
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: 'Total Customers',
    value: '2,847',
    change: '+5.3% from last month',
    trend: 'up',
    color: 'from-purple-600 to-purple-800',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    label: 'Average Order Value',
    value: '$31.40',
    change: '+2.1% from last month',
    trend: 'up',
    color: 'from-amber-600 to-amber-800',
  },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat) => (
          <Card key={stat.label} className={`bg-gradient-to-br ${stat.color} border-0`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-lg text-white">
                  {stat.icon}
                </div>
                <div className={`text-xs font-semibold ${stat.trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
                  {stat.change}
                </div>
              </div>
              <p className="text-white/80 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Trend & Customer Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  formatter={(value) => `$${value}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Monthly Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Customer Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CUSTOMER_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
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
                <Bar dataKey="newCustomers" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="New Customers" />
                <Bar dataKey="returning" fill="#06b6d4" radius={[8, 8, 0, 0]} name="Returning Customers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Sales & Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-400" />
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CATEGORY_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="category" type="category" width={120} stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '4px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                  formatter={(value) => `$${value}`}
                />
                <Bar dataKey="sales" fill="#f59e0b" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={PRODUCT_PERFORMANCE}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="product" stroke="#94a3b8" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '4px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution & Orders vs Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-pink-400" />
              Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, value }) => `${category}: $${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '4px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                  formatter={(value) => `$${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-red-400" />
              Orders vs Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
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
                  yAxisId="left"
                  type="monotone"
                  dataKey="orders"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  name="Orders"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', r: 4 }}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">4.2%</p>
                <p className="text-xs text-green-400 mt-2">↑ 0.5% from last month</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Cart Abandonment</p>
                <p className="text-2xl font-bold text-white">12.8%</p>
                <p className="text-xs text-red-400 mt-2">↑ 1.2% from last month</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Avg. Session Duration</p>
                <p className="text-2xl font-bold text-white">3m 24s</p>
                <p className="text-xs text-green-400 mt-2">↑ 18s from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
