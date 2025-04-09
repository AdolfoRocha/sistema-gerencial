import React from 'react';
import { Wallet, Receipt, Calculator, TrendingUp, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const mockData = {
  monthlyRevenue: [
    { month: 'Jan', amount: 15000, expenses: 12000 },
    { month: 'Fev', amount: 18000, expenses: 13500 },
    { month: 'Mar', amount: 22000, expenses: 15000 },
    { month: 'Abr', amount: 20000, expenses: 14000 },
    { month: 'Mai', amount: 25000, expenses: 16000 }
  ],
  pendingInvoices: 12,
  totalRevenue: 25000,
  taxesDue: 3500,
  expenseBreakdown: [
    { name: 'Operacional', value: 8000, color: '#3B82F6' },
    { name: 'Marketing', value: 3000, color: '#10B981' },
    { name: 'Impostos', value: 3500, color: '#F59E0B' },
    { name: 'Outros', value: 1500, color: '#6366F1' }
  ],
  metrics: {
    profitMargin: 28,
    revenueGrowth: 12,
    cashFlow: -5
  }
};

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Bem-vindo ao Expert Contábil
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Última atualização:</span>
          <span className="font-medium">13 de março, 2025 às 15:30</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">+12%</span>
            </div>
          </div>
          <span className="text-sm text-gray-500">Receita Mensal</span>
          <p className="text-2xl font-bold text-gray-800">
            R$ {mockData.totalRevenue.toLocaleString('pt-BR')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600">+28%</span>
            </div>
          </div>
          <span className="text-sm text-gray-500">Margem de Lucro</span>
          <p className="text-2xl font-bold text-gray-800">{mockData.metrics.profitMargin}%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Calculator className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex items-center gap-2">
              <ArrowDownRight className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-600">-5%</span>
            </div>
          </div>
          <span className="text-sm text-gray-500">Fluxo de Caixa</span>
          <p className="text-2xl font-bold text-gray-800">
            {mockData.metrics.cashFlow}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Receipt className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-600">{mockData.pendingInvoices}</span>
            </div>
          </div>
          <span className="text-sm text-gray-500">Notas Pendentes</span>
          <p className="text-2xl font-bold text-gray-800">
            {mockData.pendingInvoices}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Receita vs Despesas</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Receita</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Despesas</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockData.monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Distribuição de Despesas</h2>
            <div className="bg-blue-100 p-2 rounded-lg">
              <PieChart className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={mockData.expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {mockData.expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {mockData.expenseBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium">
                  R$ {item.value.toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;