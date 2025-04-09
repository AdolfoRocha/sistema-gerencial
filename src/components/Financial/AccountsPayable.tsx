import React, { useState, useEffect } from 'react';
import { Plus, Calendar, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AccountPayable {
  id: string;
  description: string;
  amount: number;
  due_date: string;
  paid_date: string | null;
  status: string;
}

const AccountsPayable: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountPayable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('accounts_payable')
        .select('*')
        .order('due_date');

      if (error) throw error;

      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching accounts payable:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Contas a Pagar</h2>
          <button className="btn-gradient px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Nova Conta</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <button className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg">
            <Calendar className="w-4 h-4" />
            <span>mar. de 2025</span>
          </button>
        </div>

        <div className="space-y-4">
          {accounts.map(account => (
            <div 
              key={account.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div>
                <p className="font-medium">{account.description}</p>
                <p className="text-sm text-gray-500">
                  Vencimento: {new Date(account.due_date).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-medium">
                    R$ {account.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className={`text-sm ${
                    account.status === 'paid' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {account.status === 'paid' ? 'Pago' : 'Pendente'}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsPayable;