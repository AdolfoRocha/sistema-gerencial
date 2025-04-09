import React, { useState, useEffect } from 'react';
import { Plus, Calendar, ChevronRight, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import NewReceivableForm from './NewReceivableForm';

interface AccountsReceivableModalProps {
  onClose: () => void;
}

interface AccountReceivable {
  id: string;
  description: string;
  amount: number;
  due_date: string;
  received_date: string | null;
  status: string;
}

const AccountsReceivableModal: React.FC<AccountsReceivableModalProps> = ({ onClose }) => {
  const [accounts, setAccounts] = useState<AccountReceivable[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewReceivableForm, setShowNewReceivableForm] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('accounts_receivable')
        .select('*')
        .order('due_date');

      if (error) throw error;

      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching accounts receivable:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

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
            <h2 className="text-xl font-semibold">Contas a Receber</h2>
            <button 
              onClick={() => setShowNewReceivableForm(true)}
              className="btn-gradient px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Conta</span>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto h-[calc(80vh-80px)]">
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
                      account.status === 'received' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {account.status === 'received' ? 'Recebido' : 'Pendente'}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {showNewReceivableForm && (
          <NewReceivableForm
            onClose={() => setShowNewReceivableForm(false)}
            onSuccess={fetchAccounts}
          />
        )}
      </div>
    </div>
  );
};

export default AccountsReceivableModal;