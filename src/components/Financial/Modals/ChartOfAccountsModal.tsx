import React, { useState, useEffect } from 'react';
import { Plus, ChevronRight, ChevronDown, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import NewAccountForm from './NewAccountForm';

interface ChartOfAccountsModalProps {
  onClose: () => void;
}

interface Account {
  id: string;
  code: string;
  name: string;
  type: string;
  parent_id: string | null;
  children?: Account[];
}

const ChartOfAccountsModal: React.FC<ChartOfAccountsModalProps> = ({ onClose }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showNewAccountForm, setShowNewAccountForm] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('chart_of_accounts')
        .select('*')
        .order('code');

      if (error) throw error;

      const accountsTree = buildAccountsTree(data || []);
      setAccounts(accountsTree);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const buildAccountsTree = (flatAccounts: Account[]): Account[] => {
    const accountsMap = new Map<string, Account>();
    const rootAccounts: Account[] = [];

    flatAccounts.forEach(account => {
      accountsMap.set(account.id, { ...account, children: [] });
    });

    flatAccounts.forEach(account => {
      const currentAccount = accountsMap.get(account.id)!;
      if (account.parent_id) {
        const parentAccount = accountsMap.get(account.parent_id);
        if (parentAccount) {
          parentAccount.children = parentAccount.children || [];
          parentAccount.children.push(currentAccount);
        }
      } else {
        rootAccounts.push(currentAccount);
      }
    });

    return rootAccounts;
  };

  const toggleAccount = (accountId: string) => {
    setExpandedAccounts(prev => {
      const next = new Set(prev);
      if (next.has(accountId)) {
        next.delete(accountId);
      } else {
        next.add(accountId);
      }
      return next;
    });
  };

  const renderAccount = (account: Account, level: number = 0) => {
    const isExpanded = expandedAccounts.has(account.id);
    const hasChildren = account.children && account.children.length > 0;

    return (
      <div key={account.id}>
        <div 
          className="flex items-center py-2 px-4 hover:bg-gray-50 cursor-pointer"
          style={{ paddingLeft: `${level * 24 + 16}px` }}
          onClick={() => toggleAccount(account.id)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400 mr-2" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
            )
          ) : (
            <div className="w-4 mr-2" />
          )}
          <span className="text-gray-500 mr-4">{account.code}</span>
          <span className="flex-1">{account.name}</span>
          <span className="text-gray-500">{account.type}</span>
        </div>
        {isExpanded && hasChildren && (
          <div>
            {account.children!.map(child => renderAccount(child, level + 1))}
          </div>
        )}
      </div>
    );
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
            <h2 className="text-xl font-semibold">Plano de Contas</h2>
            <button 
              onClick={() => setShowNewAccountForm(true)}
              className="btn-gradient px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Conta</span>
            </button>
          </div>
        </div>

        <div className="overflow-auto h-[calc(80vh-80px)]">
          <div className="divide-y">
            {accounts.map(account => renderAccount(account))}
          </div>
        </div>

        {showNewAccountForm && (
          <NewAccountForm
            onClose={() => setShowNewAccountForm(false)}
            onSuccess={fetchAccounts}
          />
        )}
      </div>
    </div>
  );
};

export default ChartOfAccountsModal;