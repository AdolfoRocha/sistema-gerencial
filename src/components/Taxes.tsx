import React, { useState } from 'react';
import { Calendar, DollarSign, CheckCircle2 } from 'lucide-react';
import TaxModal from './TaxModal';

const mockTaxes = [
  {
    id: 'das-1-2025',
    type: 'DAS',
    period: '1/2025',
    dueDate: '20/02/2025',
    amount: 96.00,
    status: 'paid',
    details: {
      items: [
        { code: '1001', name: 'IRPJ - SIMPLES NACIONAL', amount: 3.84 },
        { code: '1002', name: 'CSLL - SIMPLES NACIONAL', amount: 3.36 },
        { code: '1004', name: 'COFINS - SIMPLES NACIONAL', amount: 12.31 },
        { code: '1005', name: 'PIS - SIMPLES NACIONAL', amount: 2.67 },
        { code: '1006', name: 'INSS - SIMPLES NACIONAL', amount: 41.66 },
        { code: '1010', name: 'ISS - SIMPLES NACIONAL', amount: 32.16 }
      ],
      company: {
        name: 'ALBUQUERQUE OFFICE SERVICOS LTDA',
        cnpj: '49.655.421/0001-40',
        documentNumber: '07.20.25050.6052444-8'
      }
    }
  }
];

const Taxes: React.FC = () => {
  const [selectedTax, setSelectedTax] = useState<typeof mockTaxes[0] | null>(null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Impostos
      </h1>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Referente ao mês</h2>
          <button className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg">
            <Calendar className="w-4 h-4" />
            <span>fev. de 2025</span>
          </button>
        </div>

        <div className="space-y-4">
          {mockTaxes.map((tax) => (
            <div 
              key={tax.id}
              onClick={() => setSelectedTax(tax)}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <DollarSign className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{tax.type} {tax.period}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Vencimento - {tax.dueDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-medium">R$ {tax.amount.toFixed(2)}</p>
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

      {selectedTax && (
        <TaxModal
          tax={selectedTax}
          onClose={() => setSelectedTax(null)}
        />
      )}
    </div>
  );
};

export default Taxes;