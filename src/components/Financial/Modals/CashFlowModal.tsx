import React, { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import NewCashFlowForm from './NewCashFlowForm';

interface CashFlowModalProps {
  onClose: () => void;
}

interface CashFlowData {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
}

const CashFlowModal: React.FC<CashFlowModalProps> = ({ onClose }) => {
  const [cashFlow, setCashFlow] = useState<CashFlowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewCashFlowForm, setShowNewCashFlowForm] = useState(false);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[80vh] relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-50 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Fluxo de Caixa</h2>
            <button 
              onClick={() => setShowNewCashFlowForm(true)}
              className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>mar. de 2025</span>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto h-[calc(80vh-80px)]">
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

        {showNewCashFlowForm && (
          <NewCashFlowForm
            onClose={() => setShowNewCashFlowForm(false)}
            onSuccess={fetchCashFlow}
          />
        )}
      </div>
    </div>
  );
};

export default CashFlowModal;