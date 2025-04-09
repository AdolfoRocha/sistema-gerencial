import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';

interface TaxModalProps {
  tax: {
    type: string;
    period: string;
    dueDate: string;
    amount: number;
    status: string;
    details: {
      items: Array<{
        code: string;
        name: string;
        amount: number;
      }>;
      company: {
        name: string;
        cnpj: string;
        documentNumber: string;
      };
    };
  };
  onClose: () => void;
}

const TaxModal: React.FC<TaxModalProps> = ({ tax, onClose }) => {
  const [showPdf, setShowPdf] = useState(false);

  const handleViewPdf = () => {
    setShowPdf(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-50 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-8">Imposto</h2>

          <div className="bg-green-50 inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8">
            <X className="w-5 h-5 text-green-500" />
            <span className="text-green-700 font-medium">Pago</span>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-gray-600">Descrição</span>
              <p className="text-xl font-bold">{tax.type} {tax.period}</p>
            </div>

            <div className="space-y-2">
              <span className="text-gray-600">Valor</span>
              <p className="text-xl font-bold">R$ {tax.amount.toFixed(2)}</p>
            </div>

            <div className="space-y-2">
              <span className="text-gray-600">Vencimento</span>
              <p className="text-xl font-bold">{tax.dueDate}</p>
            </div>
          </div>

          <button
            onClick={handleViewPdf}
            className="w-full mt-8 flex items-center justify-center gap-2 btn-gradient py-4 rounded-lg"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Exibir Imposto</span>
          </button>
        </div>
      </div>

      {showPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative">
            <button 
              onClick={() => setShowPdf(false)}
              className="absolute right-4 top-4 p-2 hover:bg-gray-50 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="h-full p-8">
              <iframe
                src="data:text/html;charset=utf-8,
                  <style>
                    body { margin: 0; display: flex; justify-content: center; }
                    img { max-width: 100%; height: auto; }
                  </style>
                  <body>
                    <img src='https://raw.githubusercontent.com/your-username/expert-contabil/main/public/das-example.png' />
                  </body>
                "
                className="w-full h-full rounded-lg"
                title="Tax Document"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxModal;