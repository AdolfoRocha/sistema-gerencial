import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface NewAccountFormProps {
  onClose: () => void;
  onSuccess: () => void;
  parentId?: string;
}

const NewAccountForm: React.FC<NewAccountFormProps> = ({ onClose, onSuccess, parentId }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'asset' // asset, liability, equity, revenue, expense
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('chart_of_accounts')
        .insert([{
          ...formData,
          parent_id: parentId || null,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (error) throw error;

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-50 rounded-full"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <h2 className="text-xl font-semibold mb-6">Nova Conta</h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="asset">Ativo</option>
              <option value="liability">Passivo</option>
              <option value="equity">Patrimônio Líquido</option>
              <option value="revenue">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gradient py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Conta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAccountForm