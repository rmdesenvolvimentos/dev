import React, { useState, useEffect } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { registerUser as apiRegister } from '@/api/authApi';

/**
 * A page component dedicated to user authentication.
 *
 * This page serves as the main entry point for users to either log in or
 * register. It manages the view state to switch between the `LoginForm` and
 * `RegisterForm` components. It handles the submission logic for both forms,
 * communicates with the authentication API, provides user feedback via toasts,
 * and redirects the user to the main application upon successful login.
 *
 * It also protects against authenticated users re-visiting the page by
 * redirecting them to the trading dashboard if a session is already active.
 *
 * @returns {JSX.Element} The rendered authentication page.
 */
export default function Auth() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // If the user is already authenticated, redirect them away from the auth page
    if (isAuthenticated) {
      navigate('/trading');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    try {
      await login(data);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Campeonato.",
      });
      navigate('/trading'); // Redirect on successful login
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: any) => {
    setIsLoading(true);
    try {
      await apiRegister(data);
      toast({
        title: "Conta criada com sucesso!",
        description: "Você já pode fazer o login.",
      });
      setMode('login'); // Switch to login form after successful registration
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message || "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col">
      <header className="p-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao site
        </Button>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-xl font-semibold text-foreground mb-2">
              Campeonato Internacional de Trading
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login' 
                ? 'Entre na sua conta para acessar o campeonato' 
                : 'Crie sua conta e participe da competição'
              }
            </p>
          </div>

          {mode === 'login' ? (
            <LoginForm
              onSubmit={handleLogin}
              onSwitchToRegister={() => setMode('register')}
              isLoading={isLoading}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegister}
              onSwitchToLogin={() => setMode('login')}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
