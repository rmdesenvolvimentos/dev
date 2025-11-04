import React, { useState } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useToast } from '@/hooks/use-toast';

/**
 * Defines the props for the AuthModal component.
 * @interface
 */
interface AuthModalProps {
  /** Whether the modal is currently open. */
  isOpen: boolean;
  /** Function to call when the modal should be closed. */
  onClose: () => void;
  /** The initial view to display ('login' or 'register'). Defaults to 'login'. */
  initialMode?: 'login' | 'register';
}

/**
 * A modal component that houses the login and registration forms.
 *
 * It manages the state for switching between the login and register views,
 * handles the submission logic for both forms (including loading states and
 * user feedback via toasts), and controls the overall visibility of the modal.
 *
 * @param {AuthModalProps} props The component props.
 * @returns {JSX.Element} The rendered authentication modal.
 */
export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  /**
   * Handles the login form submission.
   * It sets the loading state, simulates an API call, and shows a toast message
   * on success or failure.
   * @param {any} data The form data submitted by the user.
   */
  const handleLogin = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Campeonato FP Markets",
      });
      
      console.log('Login data:', data);
      onClose();
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the registration form submission.
   * It sets the loading state, simulates an API call, and shows a toast message
   * on success or failure.
   * @param {any} data The form data submitted by the user.
   */
  const handleRegister = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu e-mail para ativar sua conta.",
      });
      
      console.log('Register data:', data);
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to reset the view to the initial mode when the modal is closed.
  React.useEffect(() => {
    if (!isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="max-w-fit p-0 bg-transparent border-none shadow-none overflow-hidden">
        <div className="animate-slide-up">
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
      </DialogContent>
    </Dialog>
  );
}