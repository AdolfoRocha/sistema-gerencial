import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Invoices from './components/Invoices';
import Taxes from './components/Taxes';
import Bills from './components/Bills';
import Documents from './components/Documents';
import Financial from './components/Financial';
import Reports from './components/Reports';
import Landing from './components/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { supabase } from './lib/supabase';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        setSession(session);
        if (session?.user?.id) {
          await fetchUserName(session.user.id);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthError(error instanceof Error ? error.message : 'Authentication error');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        setSession(session);
        
        if (session?.user?.id) {
          await fetchUserName(session.user.id);
        } else {
          setUserName('');
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setAuthError(error instanceof Error ? error.message : 'Authentication error');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserName = async (userId: string) => {
    const { data, error } = await supabase
      .from('business_profiles')
      .select('company_name')
      .eq('user_id', userId)
      .single();

    if (!error && data) {
      setUserName(data.company_name);
    }
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (authError) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      {session ? (
        <div className="min-h-screen bg-gray-100 flex">
          <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} userName={userName} />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/taxes" element={<Taxes />} />
              <Route path="/bills" element={<Bills />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Router>
  );
}
 
export default App;
