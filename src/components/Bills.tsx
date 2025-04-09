import React, { useState } from 'react';
import { Receipt, CheckCircle2 } from 'lucide-react';
import PlanModal from './PlanModal';

const mockBills = [
  { id: '3-2025', period: '3/2025', dueDate: '06/03/2025', amount: 199.90, status: 'paid' },
  { id: '2-2025', period: '2/2025', dueDate: '06/02/2025', amount: 199.90, status: 'paid' },
  { id: '1-2025', period: '1/2025', dueDate: '14/01/2025', amount: 199.90, status: 'paid' },
  { id: '12-2024', period: '12/2024', dueDate: '27/12/2024', amount: 199.90, status: 'paid' },
  { id: '11-2024', period: '11/2024', dueDate: '14/11/2024', amount: 149.90, status: 'paid' },
];

const Bills: React.FC = () => {
  const [showPlanDetails, setShowPlanDetails] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Plano contratado
      </h1>

      <div className="bg-blue-50 p-6 rounded-xl mb-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-bold mb-2">PLANO DINÂMICO</h2>
            <p className="text-gray-600 text-sm">a partir de</p>
            <div className="flex items-baseline gap-1">
              <span className="text-blue-600 text-sm">R$</span>
              <span className="text-blue-600 text-4xl font-bold">199,90</span>
              <span className="text-gray-600 text-sm">/mês</span>
            </div>
          </div>
          <div className="space-y-2 text-gray-700">
            <p>• Contabilidade completa</p>
            <p>• Atendimento via whatsapp, telefone e email</p>
            <p>• Assessoria contábil com equipe especializada</p>
            <p>• Emissão de notas fiscais</p>
          </div>
        </div>
        <button 
          onClick={() => setShowPlanDetails(true)}
          className="btn-gradient px-6 py-3 rounded-lg"
        >
          Ver detalhes
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Faturas do sistema
        </h2>

        <div className="space-y-4">
          {mockBills.map((bill) => (
            <div 
              key={bill.id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <Receipt className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Plano Dinâmico - {bill.period}</p>
                  <p className="text-sm text-gray-500">
                    Vencimento - {bill.dueDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-medium">R$ {bill.amount.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 flex items-center gap-2 px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Pago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPlanDetails && (
        <PlanModal onClose={() => setShowPlanDetails(false)} />
      )}
    </div>
  );
};

export default Bills;