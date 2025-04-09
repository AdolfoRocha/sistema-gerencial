import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Calculator, 
  BarChart3, 
  Receipt, 
  DollarSign, 
  CheckCircle, 
  PlayCircle,
  ChevronRight,
  ChevronDown,
  X
} from 'lucide-react';

const Landing = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: FileText,
      title: 'Contabilidade Digital',
      description: 'Gestão contábil completa e automatizada para sua empresa'
    },
    {
      icon: Calculator,
      title: 'Gestão Fiscal',
      description: 'Cálculo e gestão de impostos de forma simplificada'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Gerenciais',
      description: 'Insights valiosos para tomada de decisões estratégicas'
    },
    {
      icon: Receipt,
      title: 'Notas Fiscais',
      description: 'Emissão e gestão de notas fiscais em um só lugar'
    }
  ];

  const testimonials = [
    {
      name: 'João Silva',
      company: 'Tech Solutions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      text: 'O Expert Contábil revolucionou nossa gestão financeira. Agora temos total controle e visibilidade dos nossos números.'
    },
    {
      name: 'Maria Santos',
      company: 'Design Studio',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      text: 'Excelente plataforma! Simplificou muito nossa rotina contábil e fiscal.'
    },
    {
      name: 'Pedro Costa',
      company: 'Retail Store',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      text: 'O melhor investimento que fizemos. O suporte é incrível e a plataforma é muito intuitiva.'
    }
  ];

  const faqs = [
    {
      question: 'Como funciona o período de teste?',
      answer: 'Oferecemos 14 dias de teste gratuito com acesso completo a todas as funcionalidades da plataforma. Não é necessário cartão de crédito e você pode cancelar quando quiser durante o período de teste.'
    },
    {
      question: 'Preciso instalar algum software?',
      answer: 'Não, o Expert Contábil é uma solução 100% web-based. Você só precisa de um navegador moderno e conexão com a internet para acessar todas as funcionalidades da plataforma de qualquer lugar.'
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Sim, você tem total flexibilidade para cancelar sua assinatura quando desejar, sem multas, taxas adicionais ou burocracia. Seus dados ficam disponíveis para download por 30 dias após o cancelamento.'
    },
    {
      question: 'O sistema é seguro?',
      answer: 'Sim, utilizamos as mais avançadas tecnologias de criptografia e segurança para proteger seus dados. Nossos servidores são certificados e seguem rigorosos padrões de segurança internacionais.'
    },
    {
      question: 'Como funciona o suporte técnico?',
      answer: 'Oferecemos suporte técnico especializado via chat, email e telefone em horário comercial. Nosso tempo médio de resposta é de menos de 2 horas para todos os planos.'
    },
    {
      question: 'É possível migrar dados de outro sistema?',
      answer: 'Sim, nossa equipe oferece suporte completo para migração de dados de outros sistemas contábeis. O processo é feito de forma segura e assistida para garantir a integridade das informações.'
    },
    {
      question: 'Quais relatórios estão disponíveis?',
      answer: 'Oferecemos uma ampla gama de relatórios gerenciais, financeiros e contábeis, incluindo DRE, Balanço Patrimonial, Fluxo de Caixa, entre outros. Todos os relatórios podem ser exportados em diversos formatos.'
    },
    {
      question: 'O sistema está adequado à LGPD?',
      answer: 'Sim, nosso sistema está totalmente adequado à Lei Geral de Proteção de Dados (LGPD). Implementamos todas as medidas necessárias para garantir a privacidade e segurança dos dados dos nossos clientes.'
    }
  ];

  const plans = [
    {
      name: 'Contabilidade Digital',
      price: '250,00',
      features: [
        'Contabilidade completa',
        'Emissão de notas fiscais',
        'Relatórios básicos',
        'Suporte por email'
      ]
    },
    {
      name: 'Cont. Digital + Financeiro',
      price: '300,00',
      features: [
        'Tudo do plano anterior',
        'Gestão financeira completa',
        'Relatórios avançados',
        'Suporte prioritário'
      ]
    },
    {
      name: 'Customizado',
      price: 'Sob consulta',
      features: [
        'Solução personalizada',
        'Funcionalidades específicas',
        'Atendimento dedicado',
        'Integração com outros sistemas'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <img 
              src="https://i.imgur.com/0kkPClK.png" 
              alt="Expert Contábil" 
              className="h-12 sm:h-16 md:h-20 mb-4"
            />
            <div className="flex gap-2 sm:gap-4">
              <Link 
                to="/login"
                className="px-3 sm:px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-white/90 transition-colors font-medium flex items-center gap-2 text-sm sm:text-base"
              >
                <ChevronRight className="w-4 h-4" />
                Acessar Sistema
              </Link>
              <Link 
                to="/register"
                className="px-3 sm:px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-white/90 transition-colors text-sm sm:text-base"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="w-full lg:flex-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                    Contabilidade Digital Inteligente para sua Empresa
                  </h1>
                  <p className="text-lg sm:text-xl mb-8 text-white/80">
                    Simplifique sua gestão contábil e financeira com nossa plataforma completa e intuitiva.
                  </p>
                  <div className="flex gap-4">
                    <Link 
                      to="/register"
                      className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-white/90 transition-colors font-medium text-center"
                    >
                      Teste Grátis por 14 Dias
                    </Link>
                  </div>
                </div>
                <div className="w-full lg:w-[500px] xl:w-[600px] relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center rounded-lg"
                    style={{ 
                      backgroundImage: 'url(https://i.imgur.com/BZMsEM5.png)',
                      filter: 'brightness(0.7)'
                    }}
                  />
                  <div className="relative rounded-lg overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                    <iframe 
                      src="https://www.youtube.com/embed/2fXJy_Uodm8?rel=0&modestbranding=1" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      title="Expert Contábil - Apresentação"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-12 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Tudo que você precisa em um só lugar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            O que nossos clientes dizem
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-24 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Perguntas Frequentes
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-xl font-medium">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`px-6 transition-all duration-200 ease-in-out ${
                    openFaq === index ? 'pb-6 max-h-40' : 'max-h-0 overflow-hidden'
                  }`}
                >
                  <p className="text-white/80">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Planos e Preços
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-sm text-gray-600">R$</span>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Sob consulta' && <span className="text-gray-600">/mês</span>}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className="block w-full py-3 text-center btn-gradient rounded-lg font-medium"
                >
                  Começar Agora
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
            <div>
              <img 
                src="https://i.imgur.com/0kkPClK.png" 
                alt="Expert Contábil" 
                className="h-6 sm:h-8 mb-4"
              />
              <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
                © 2025 Expert Soluções Empresariais. Todos os direitos reservados.
              </p>
            </div>
            <div className="text-gray-400 text-sm sm:text-base">
              Desenvolvido por:{' '}
              <a 
                href="https://arxdigital.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                ARX Digital
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;