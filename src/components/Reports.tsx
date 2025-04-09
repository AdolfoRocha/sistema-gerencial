import React, { useState } from 'react';
import { FileText, ChevronRight, X } from 'lucide-react';
import PeriodSelector from './PeriodSelector';
import { createClient } from '@supabase/supabase-js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Report {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  type: 'billing' | 'dre';
}

const mockReports: Report[] = [
  {
    id: 'billing-declaration',
    title: 'Declaração de faturamento 12 meses',
    description: 'Documento que informa o total das receitas brutas de uma empresa ao longo de um período contínuo de 12 meses.',
    updatedAt: '02/10/2024',
    type: 'billing'
  },
  {
    id: 'dre',
    title: 'Demonstrativo de Resultado (DRE)',
    description: 'Relatório contábil que resume as operações financeiras de uma empresa em um determinado período. Ele apresenta as receitas, custos e despesas, evidenciando o lucro ou prejuízo líquido.',
    updatedAt: '13/03/2025',
    type: 'dre'
  }
];

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);

  const generatePDF = async (report: Report, month?: number, year?: number) => {
    const doc = new jsPDF();
    
    // Add Expert Contábil logo with proper spacing and proportions
    const logoUrl = 'https://i.imgur.com/0kkPClK.png';
    const logoWidth = 60;
    const logoHeight = 22; // Fixed height to maintain proper proportions
    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - logoWidth) / 2;
    doc.addImage(logoUrl, 'PNG', x, 20, logoWidth, logoHeight);
    
    if (report.type === 'billing') {
      // Title
      doc.setFontSize(18);
      doc.setTextColor(0);
      doc.text('DECLARAÇÃO DE FATURAMENTO', 105, 70, { align: 'center' });
      
      // Company info
      doc.setFontSize(12);
      doc.text('Empresa:', 20, 90);
      doc.text('Albuquerque Office', 40, 90);
      doc.text('CNPJ:', 20, 100);
      doc.text('49.655.421/0001-40', 40, 100);
      doc.text('Endereço:', 20, 110);
      doc.text('Rua Doutor Atualpa Barbosa Lima, 840, Meireles, Fortaleza, CE, CEP 60115-015', 40, 110);
      
      doc.text('Declaro para os devidos fins que as informações de faturamento abaixo são verídicas:', 20, 130);
      
      // Table data
      const tableData = [
        ['03/2024', 'R$ 62000.00'],
        ['04/2024', 'R$ 0.00'],
        ['05/2024', 'R$ 100.00'],
        ['06/2024', 'R$ 100.00'],
        ['07/2024', 'R$ 542.00'],
        ['08/2024', 'R$ 0.00'],
        ['09/2024', 'R$ 0.00'],
        ['10/2024', 'R$ 0.00'],
        ['11/2024', 'R$ 0.00'],
        ['12/2024', 'R$ 1600.00'],
        ['01/2025', 'R$ 1600.00'],
        ['02/2025', 'R$ 0.00'],
      ];
      
      (doc as any).autoTable({
        head: [['Mês/Ano', 'Faturamento']],
        body: tableData,
        startY: 140,
        theme: 'grid',
        styles: { fontSize: 12, cellPadding: 5 },
        headStyles: { fillColor: [243, 244, 246], textColor: [0, 0, 0] },
      });
      
      // Signature
      doc.text('Fortaleza, 13 de março de 2025', 105, 230, { align: 'center' });
      doc.text('Mateus Albuquerque Mourão', 105, 260, { align: 'center' });
      doc.text('Contador', 105, 270, { align: 'center' });
      doc.text('CRC: 23.550/CE', 105, 280, { align: 'center' });
      
    } else {
      // Title
      doc.setFontSize(18);
      doc.setTextColor(0);
      doc.text('DEMONSTRAÇÃO DO RESULTADO DO EXERCÍCIO (DRE)', 105, 70, { align: 'center' });
      
      // Company info
      doc.setFontSize(12);
      doc.text('Empresa: Albuquerque Office', 20, 90);
      doc.text('CNPJ: 49.655.421/0001-40', 20, 100);
      doc.text(`Período: ${month}/${year}`, 20, 110);
      
      // DRE data
      const dreData = [
        ['RECEITA OPERACIONAL BRUTA', 'R$ 62.000,00'],
        ['Prestação de Serviços - Mercado Interno', 'R$ 62.000,00'],
        ['Prestação de Serviços - Mercado Externo', 'R$ 0,00'],
        ['DEDUÇÕES DA RECEITA BRUTA', '-R$ 8.680,00'],
        ['(-) Impostos', '-R$ 8.680,00'],
        ['RECEITA OPERACIONAL LÍQUIDA', 'R$ 53.320,00'],
        ['(-) DESPESAS', '-R$ 12.000,00'],
        ['DESPESAS OPERACIONAIS', '-R$ 7.000,00'],
        ['Encargos Sociais - Previdência Social INSS', '-R$ 7.000,00'],
        ['DESPESAS ADMINISTRATIVAS', '-R$ 5.000,00'],
        ['Pró-labore aos sócios', '-R$ 3.000,00'],
        ['Serviços Contábeis', '-R$ 2.000,00'],
        ['IMPOSTOS SOBRE O LUCRO', '-R$ 6.198,00'],
        ['Provisão para Imposto de Renda', '-R$ 6.198,00'],
        ['RESULTADO LÍQUIDO DO EXERCÍCIO', 'R$ 35.122,00'],
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
    }

    // Open PDF in new tab
    window.open(URL.createObjectURL(doc.output('blob')));
  };

  const handleReportClick = async (report: Report) => {
    if (report.type === 'dre') {
      setSelectedReport(report);
      setShowPeriodSelector(true);
    } else {
      await generatePDF(report);
    }
  };

  const handlePeriodSelect = async (month: number, year: number) => {
    setShowPeriodSelector(false);
    if (selectedReport) {
      await generatePDF(selectedReport, month, year);
      setSelectedReport(null);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Relatórios contábeis
      </h1>

      <div className="space-y-4">
        {mockReports.map((report) => (
          <div 
            key={report.id}
            onClick={() => handleReportClick(report)}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-2 rounded-lg mt-1">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1">{report.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Atualizado em {report.updatedAt}
                  </p>
                  <p className="text-gray-600">{report.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {showPeriodSelector && (
        <PeriodSelector
          onSelect={handlePeriodSelect}
          onClose={() => setShowPeriodSelector(false)}
        />
      )}
    </div>
  );
};

export default Reports