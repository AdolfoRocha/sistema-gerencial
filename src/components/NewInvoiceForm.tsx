import React, { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';

interface NewInvoiceFormProps {
  onClose: () => void;
}

const NewInvoiceForm: React.FC<NewInvoiceFormProps> = ({ onClose }) => {
  const [step, setStep] = useState<'client-selection' | 'client-form' | 'service-details'>('client-selection');
  
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 mb-8 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Nova NFSe</span>
        </button>

        {step === 'client-selection' && (
          <>
            <h2 className="text-2xl font-bold mb-8">Dados do Cliente</h2>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Cliente Tomador</label>
              <div className="relative">
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none pr-10">
                  <option>Selecione uma opção</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep('client-form')}
                className="px-6 py-3 btn-gradient rounded-lg"
              >
                Novo Cliente
              </button>
              <button className="px-6 py-3 btn-gradient rounded-lg">
                Não informar cliente tomador
              </button>
            </div>
          </>
        )}

        {step === 'client-form' && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Dados do Cliente</h2>
              <p className="text-gray-600">
                Confira os dados do cliente selecionado ou{' '}
                <button className="text-blue-600 hover:underline">adicione um novo cliente</button>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm text-gray-600 mb-2">CPF</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Nome</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">E-mail</label>
                <input 
                  type="email" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Telefone</label>
                <input 
                  type="tel" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <h3 className="text-xl font-bold mb-6">Endereço</h3>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3">
                <label className="block text-sm text-gray-600 mb-2">CEP</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  placeholder="00000-000"
                />
              </div>
              <div className="col-span-6">
                <label className="block text-sm text-gray-600 mb-2">Logradouro</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-sm text-gray-600 mb-2">Número</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="col-span-12">
                <label className="block text-sm text-gray-600 mb-2">Complemento</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  placeholder="Sobrado, casa, apartamento..."
                />
              </div>
              <div className="col-span-4">
                <label className="block text-sm text-gray-600 mb-2">Bairro</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="col-span-4">
                <label className="block text-sm text-gray-600 mb-2">Estado</label>
                <div className="relative">
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none pr-10">
                    <option>CE</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <label className="block text-sm text-gray-600 mb-2">Município</label>
                <div className="relative">
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none pr-10">
                    <option>Fortaleza</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep('service-details')}
              className="mt-8 px-8 py-4 btn-gradient rounded-lg"
            >
              Continuar
            </button>
          </>
        )}

        {step === 'service-details' && (
          <>
            <h2 className="text-2xl font-bold mb-8">Dados do Serviço</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Data da prestação do serviço</label>
                <input 
                  type="date" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  value="2025-03-14"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Natureza da operação</label>
                <div className="relative">
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none pr-10">
                    <option>Selecione uma opção</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm text-gray-600 mb-2">Atividade</label>
              <div className="relative">
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none pr-10">
                  <option>Selecione uma opção</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-blue-600 mt-2">
                Conforme Lei 12.741/2012, o percentual total de impostos incidentes neste serviço prestado é de aproximadamente 13,83%
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-sm text-gray-600 mb-2">Descrição do serviço e formas de pagamento</label>
              <textarea 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-32 resize-none"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm text-gray-600 mb-2">Valor do serviço</label>
              <input 
                type="text" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                placeholder="R$ 0,00"
              />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-bold mb-6">Detalhes da Nota</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Alíquota ISS (%)
                    <button className="ml-2 text-blue-600">
                      <Info className="w-4 h-4" />
                    </button>
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg"
                    value="2%"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Base de cálculo
                    <button className="ml-2 text-blue-600">
                      <Info className="w-4 h-4" />
                    </button>
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg"
                    value="R$ 0,00"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Valor do imposto municipal</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg"
                    value="R$ 0,00"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-8 py-4 btn-gradient rounded-lg">
                Emitir Nota
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewInvoiceForm;