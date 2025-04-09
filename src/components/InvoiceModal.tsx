import React from 'react';
import { X, Download } from 'lucide-react';

interface InvoiceModalProps {
  invoice: {
    number: string;
    value: number;
    client: string;
    description: string;
    date?: string;
    cnae?: string;
  };
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  const handleDownload = () => {
    // In a real application, this would make an API call to generate and download the PDF
    alert('Downloading NFSe PDF...');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-blue-50 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-blue-600" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-8">Nota Fiscal</h2>

          <div className="bg-red-50 inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8">
            <X className="w-5 h-5 text-red-500" />
            <span className="text-red-700 font-medium">Cancelada</span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">N° Nota</span>
              <span className="text-xl font-bold">{invoice.number}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valor</span>
              <span className="text-xl font-bold">R$ {invoice.value.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Data</span>
              <span className="text-xl font-bold">13 de mar. de 2025</span>
            </div>

            <div className="space-y-2">
              <span className="text-gray-600">Cliente</span>
              <p className="text-xl font-bold">{invoice.client}</p>
            </div>

            <div className="space-y-2">
              <span className="text-gray-600">Descrição</span>
              <p className="text-xl font-bold">{invoice.description}</p>
            </div>

            <div className="space-y-2">
              <span className="text-gray-600">CNAE</span>
              <p className="text-lg">
                Serviços combinados de escritório e apoio administrativo - Planejamento, coordenação, programação ou organização técnica, financeira ou administrativa.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full mt-8 flex items-center justify-center gap-2 btn-gradient py-4 rounded-lg"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">Download NFSe PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal