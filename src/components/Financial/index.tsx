import React, { useState, useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle, DollarSign, FileText, CreditCard, Wallet, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ChartOfAccountsModal from './Modals/ChartOfAccountsModal.tsx';
import AccountsPayableModal from './Modals/AccountsPayableModal.tsx';
import AccountsReceivableModal from './Modals/AccountsReceivableModal.tsx';
import CashFlowModal from './Modals/CashFlowModal';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Financial: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0
  });
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  const fetchMonthlyData = async () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Fetch revenue
    const { data: receivables } = await supabase
      .from('accounts_receivable')
      .select('amount')
      .gte('received_date', firstDayOfMonth.toISOString())
      .lte('received_date', lastDayOfMonth.toISOString())
      .eq('status', 'received');

    // Fetch expenses
    const { data: payables } = await supabase
      .from('accounts_payable')
      .select('amount')
      .gte('paid_date', firstDayOfMonth.toISOString())
      .lte('paid_date', lastDayOfMonth.toISOString())
      .eq('status', 'paid');

    const totalRevenue = receivables?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
    const totalExpenses = payables?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;

    setMonthlyData({
      revenue: totalRevenue,
      expenses: totalExpenses,
      profit: totalRevenue - totalExpenses
    });
  };

  const generateDRE = async () => {
    const doc = new jsPDF();
    
    // Add Expert Contábil logo
    const logoUrl = 'https://i.imgur.com/0kkPClK.png';
    const logoWidth = 60;
    const logoHeight = 22;
    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - logoWidth) / 2;
    doc.addImage(logoUrl, 'PNG', x, 20, logoWidth, logoHeight);
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(0);
    doc.text('DEMONSTRAÇÃO DO RESULTADO DO EXERCÍCIO (DRE)', 105, 70, { align: 'center' });
    
    // Company info
    doc.setFontSize(12);
    doc.text('Empresa: Expert Contábil', 20, 90);
    doc.text('CNPJ: 00.000.000/0001-00', 20, 100);
    doc.text('Período: Março/2025', 20, 110);
    
    // DRE data
    const dreData = [
      ['RECEITA OPERACIONAL BRUTA', `R$ ${monthlyData.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
      ['(-) DEDUÇÕES DA RECEITA BRUTA', `R$ ${(monthlyData.revenue * 0.0925).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
      ['RECEITA OPERACIONAL LÍQUIDA', `R$ ${(monthlyData.revenue * 0.9075).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
      ['(-) CUSTOS OPERACIONAIS', `R$ ${monthlyData.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
      ['RESULTADO OPERACIONAL BRUTO', `R$ ${monthlyData.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
      ['(-) DESPESAS OPERACIONAIS', `R$ ${(monthlyData.expenses * 0.15).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
      ['RESULTADO ANTES DO IR/CSLL', `R$ ${(monthlyData.profit * 0.85).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
      ['(-) PROVISÃO PARA IR/CSLL', `R$ ${(monthlyData.profit * 0.85 * 0.15).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
      ['RESULTADO LÍQUIDO DO EXERCÍCIO', `R$ ${(monthlyData.profit * 0.85 * 0.85).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
    ];
    
    (doc as any).autoTable({
      body: dreData,
      startY: 120,
      theme: 'plain',
      styles: { fontSize: 12, cellPadding: 5 },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { halign: 'right' },
      },
    });
    
    // Open PDF in new tab
    window.open(URL.createObjectURL(doc.output('blob')));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Financeiro
      </h1>
      <p className="text-gray-600 mb-8">Gestão financeira completa</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <ArrowUpCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <span className="text-sm text-gray-500">Receitas do Mês</span>
          <p className="text-2xl font-bold text-gray-800">
            R$ {monthlyData.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <ArrowDownCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <span className="text-sm text-gray-500">Despesas do Mês</span>
          <p className="text-2xl font-bold text-gray-800">
            R$ {monthlyData.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <span className="text-sm text-gray-500">Lucro do Mês</span>
          <p className="text-2xl font-bold text-gray-800">
            R$ {monthlyData.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div 
          onClick={() => setSelectedSection('chart-of-accounts')}
          className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Plano de Contas</h3>
              <p className="text-sm text-gray-500">
                Estrutura hierárquica para classificação e organização das contas contábeis
              </p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setSelectedSection('accounts-payable')}
          className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Contas a Pagar</h3>
              <p className="text-sm text-gray-500">
                Gestão completa das obrigações financeiras
              </p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setSelectedSection('accounts-receivable')}
          className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Contas a Receber</h3>
              <p className="text-sm text-gray-500">
                Controle de recebimentos e cobranças
              </p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setSelectedSection('cash-flow')}
          className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Fluxo de Caixa</h3>
              <p className="text-sm text-gray-500">
                Análise e projeção do fluxo financeiro
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-purple-100 p-3 rounded-lg">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-xl">Demonstrativos Financeiros</h3>
            <p className="text-gray-600">DRE e Balanço Patrimonial</p>
          </div>
          <button
            onClick={generateDRE}
            className="btn-gradient px-6 py-2 rounded-lg flex items-center gap-2"
          >
            Emitir DRE
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Receita Bruta (Mês)</span>
            <span className="text-xl font-medium">R$ {monthlyData.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Despesas Totais</span>
            <span className="text-xl font-medium">R$ {monthlyData.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center text-green-600">
            <span className="font-medium">Lucro Líquido</span>
            <span className="text-xl font-medium">R$ {monthlyData.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {selectedSection === 'chart-of-accounts' && (
        <ChartOfAccountsModal 
          onClose={() => setSelectedSection(null)} 
        />
      )}

      {selectedSection === 'accounts-payable' && (
        <AccountsPayableModal 
          onClose={() => setSelectedSection(null)} 
        />
      )}

      {selectedSection === 'accounts-receivable' && (
        <AccountsReceivableModal 
          onClose={() => setSelectedSection(null)} 
        />
      )}

      {selectedSection === 'cash-flow' && (
        <CashFlowModal onClose={() => setSelectedSection(null)} />
      )}
    </div>
  );
};

export default Financial;