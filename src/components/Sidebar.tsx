import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard,
  Receipt,
  Calculator,
  FileText,
  Files,
  LineChart,
  Wallet,
  HelpCircle,
  Key,
  LogOut
} from 'lucide-react';
import ChangePasswordModal from './Auth/ChangePasswordModal';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, userName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        // Force navigation even if there's an error
        window.location.href = '/';
        return;
      }

      // Use window.location.href for a full page refresh
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if there's an error
      // Force navigation even if there's an error
      window.location.href = '/';
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/dashboard' },
    { icon: Receipt, label: 'Notas Fiscais', id: 'invoices', path: '/invoices' },
    { icon: Wallet, label: 'Financ.', id: 'financial', path: '/financial' },
    { icon: Calculator, label: 'Impostos', id: 'taxes', path: '/taxes' },
    { icon: FileText, label: 'Faturas', id: 'bills', path: '/bills' },
    { icon: LineChart, label: 'Relatórios', id: 'reports', path: '/reports' },
    { icon: Files, label: 'Documentos', id: 'documents', path: '/documents' }
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-4">
        <img 
          src="https://i.imgur.com/0kkPClK.png" 
          alt="Expert Contábil" 
          className="w-40 mx-auto mb-8"
        />
        <p className="text-center text-gray-600 mb-4">
          Seja bem-vindo de volta,<br />
          <span className="font-semibold text-gray-800">{userName}</span>
        </p>
      </div>
      <nav className="px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onPageChange(item.id);
              navigate(item.path);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-0 w-64 p-4 border-t space-y-2">
        <button
          onClick={() => {
            onPageChange('help');
            navigate('/help');
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Ajuda</span>
        </button>
        <button
          onClick={() => setShowChangePassword(true)}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <Key className="w-5 h-5" />
          <span>Alterar Senha</span>
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
      
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default Sidebar;