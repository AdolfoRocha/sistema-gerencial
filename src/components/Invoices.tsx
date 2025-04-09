import React, { useState } from 'react';
import { Plus, Calendar, ChevronRight, XCircle } from 'lucide-react';
import InvoiceModal from './InvoiceModal';
import NewInvoiceForm from './NewInvoiceForm';

const mockInvoices = [
  { number: '188', value: 0.02, client: 'Pedro Lucas Mourao', description: 'aa' },
  { number: '187', value: 0.01, client: 'Pedro Lucas Mourao', description: 'teste' },
  { number: '186', value: 0.12, client: 'Pedro Lucas Mourao', description: 'teste' },
  { number: '184', value: 0.02, client: 'Pedro Lucas Mourao', description: 'teste' },
];

const Invoices: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof mockInvoices[0] | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Notas Fiscais
      </h1>

      <button 
        onClick={() => setIsCreating(true)}
        className="flex items-center gap-2 btn-gradient px-6 py-3 rounded-lg mb-12 shadow-sm"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Gerar Nota</span>
      </button>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Notas Geradas</h2>
        <div className="flex items-center gap-2 mb-6">
          <button className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg">
            <Calendar className="w-4 h-4" />
            <span>mar. de 2025</span>
          </button>
        </div>

        <p className="text-gray-500 mb-4">13 de mar.</p>

        <div className="space-y-4">
          {mockInvoices.map((invoice) => (
            <div 
              key={invoice.number}
              onClick={() => setSelectedInvoice(invoice)}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-50 p-2 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">N° Nota: {invoice.number}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Valor: R$ {invoice.value.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <p className="font-medium">{invoice.client}</p>
                  <p className="text-sm text-gray-500">{invoice.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
      
      {isCreating && (
        <NewInvoiceForm onClose={() => setIsCreating(false)} />
      )}
    </div>
  );
};

export default Invoices;