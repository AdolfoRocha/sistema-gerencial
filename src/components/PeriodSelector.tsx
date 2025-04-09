import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PeriodSelectorProps {
  onSelect: (month: number, year: number) => void;
  onClose: () => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ onSelect, onClose }) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const months = [
    'Jan.', 'Fev.', 'Mar.', 'Abr.',
    'Mai.', 'Jun.', 'Jul.', 'Ago.',
    'Set.', 'Out.', 'Nov.', 'Dez.'
  ];

  const handleSelect = () => {
    if (selectedMonth !== null) {
      onSelect(selectedMonth + 1, selectedYear);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4">
        <div className="flex">
          <div className="bg-blue-600 text-white p-8 rounded-l-2xl w-1/2">
            <h2 className="text-xl mb-4">Selecione o mês competência</h2>
            <div className="text-2xl mb-2">
              {selectedMonth !== null ? months[selectedMonth] : ''} de {selectedYear}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setSelectedYear(selectedYear - 1)}
                className="text-2xl"
              >
                ↑
              </button>
              <button 
                onClick={() => setSelectedYear(selectedYear + 1)}
                className="text-2xl"
              >
                ↓
              </button>
            </div>
          </div>

          <div className="p-8 w-1/2">
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 p-2 hover:bg-gray-50 rounded-full"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <div className="grid grid-cols-4 gap-4">
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(index)}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    selectedMonth === index
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSelect}
                disabled={selectedMonth === null}
                className="px-6 py-2 btn-gradient rounded-lg disabled:opacity-50"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodSelector