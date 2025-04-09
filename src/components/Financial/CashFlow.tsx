import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CashFlowData {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
}

const CashFlow: React.FC = () => {
  const [cashFlow, setCashFlow] = useState<CashFlowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCashFlow();
  }, []);

  const fetchCashFlow = async () => {
    try {
      const { data, error } = await supabase
        .from('cash_flow')
        .select('*')
        .order('date');

      if (error) throw error;

      setCashFlow(data || []);
    } catch (error) {
      console.error('Error fetching cash flow:', error);
    } finally {
      setLoading(false);
    }
  };

  const processDataForChart = () => {
    const dailyBalance = new Map<string, number>();
    let runningBalance = 0;

    cashFlow.forEach(movement => {
      const date = new Date(movement.date).toLocaleDateString('pt-BR');
      runningBalance += movement.type === 'income' ? movement.amount : -movement.amount;
      dailyBalance.set(date, runningBalance);
    });

    return Array.from(dailyBalance.entries()).map(([date, balance]) => ({
      date,
      balance
    }));
  };

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  const chartData = processDataForChart();

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Fluxo de Caixa</h2>
          <button className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg">
            <Calendar className="w-4 h-4" />
            <span>mar. de 2025</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="h-80 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {cashFlow.map(movement => (
            <div 
              key={movement.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{movement.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(movement.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className={`font-medium ${
                movement.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {movement.type === 'income' ? '+' : '-'}
                R$ {movement.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CashFlow;