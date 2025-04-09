import React from 'react';
import { X } from 'lucide-react';

interface PlanModalProps {
  onClose: () => void;
}

const PlanModal: React.FC<PlanModalProps> = ({ onClose }) => {
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
          <h2 className="text-3xl font-bold text-center mb-4">PLANO DINÂMICO</h2>
          
          <div className="flex justify-center items-baseline gap-1 mb-12">
            <span className="text-blue-600 text-lg">R$</span>
            <span className="text-blue-600 text-5xl font-bold">199,90</span>
            <span className="text-gray-600">/mês</span>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">Valor escalonável</h3>
            <p className="text-gray-600 mb-4">
              O plano tem preço dinâmico, conforme o faturamento do mês anterior, da seguinte forma:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>- R$ 199,90 até R$ 9.999,99</li>
              <li>- R$ 239,90 entre R$ 10.000,00 a R$ 29.999,99</li>
              <li>- R$ 289,90 a partir de R$ 30.000,00</li>
            </ul>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>• Contabilidade completa</p>
            <p>• Atendimento via whatsapp, telefone e email</p>
            <p>• Assessoria contábil com equipe especializada</p>
            <p>• Emissão de notas fiscais</p>
            <p>• Gestão de serviços</p>
            <p>• Tributos</p>
            <p>• Cancele quando quiser</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;