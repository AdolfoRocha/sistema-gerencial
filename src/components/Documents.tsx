import React, { useState } from 'react';
import { FileText, ChevronRight, X } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  file?: File;
}

const mockDocuments: Document[] = [
  {
    id: 'inscricao-municipal',
    title: 'Inscrição Municipal',
    description: 'Documento de registro obrigatório de uma empresa na prefeitura do município onde atua. Ela autoriza o funcionamento do negócio e é necessária para a emissão de notas fiscais e o recolhimento de tributos municipais, como o ISS.',
    updatedAt: '03/10/2024'
  },
  {
    id: 'contrato-social',
    title: 'Contrato Social',
    description: 'Documento que formaliza a criação de uma empresa, definindo sua estrutura, atividades, responsabilidades dos sócios, capital social e regras de administração.',
    updatedAt: '21/12/2024'
  },
  {
    id: 'cartao-cnpj',
    title: 'Cartão CNPJ',
    description: 'Documento que identifica oficialmente uma empresa junto à Receita Federal. Ele contém informações como nome, número do CNPJ, endereço, atividade econômica e situação cadastral da empresa.',
    updatedAt: '03/02/2025'
  }
];

const Documents: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileUpload = async (doc: Document, file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Por favor, selecione um arquivo PDF');
      return;
    }

    // In a real application, you would upload the file to a server here
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedDoc({ ...doc, file });
  };

  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedDoc(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Documentos e serviços
      </h1>
      <p className="text-gray-600 mb-8">
        Aqui você poderá acessar os documentos e relatórios contábeis, além de contratar serviços extras.
      </p>

      <div className="space-y-4">
        {mockDocuments.map((doc) => (
          <div 
            key={doc.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-2 rounded-lg mt-1">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1">{doc.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Atualizado em {doc.updatedAt}
                  </p>
                  <p className="text-gray-600">{doc.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="btn-gradient px-4 py-2 rounded-lg cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(doc, file);
                    }}
                  />
                  Anexar Arquivo
                </label>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDoc && previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative">
            <div className="absolute right-4 top-4 z-10 flex gap-4">
              <a 
                href={previewUrl}
                download={`${selectedDoc.title}.pdf`}
                className="btn-gradient px-4 py-2 rounded-lg"
              >
                Download
              </a>
              <button 
                onClick={closePreview}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="h-full p-8">
              <iframe
                src={previewUrl}
                className="w-full h-full rounded-lg"
                title="Document Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;