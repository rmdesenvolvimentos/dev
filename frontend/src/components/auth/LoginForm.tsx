import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

/**
 * Defines the validation schema for the login form using Zod.
 * This ensures that the email is a valid format and the password meets
 * the minimum length requirement before submission.
 */
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().optional()
});

/**
 * Infers the TypeScript type from the `loginSchema`.
 * This provides strong typing for the form data object.
 */
type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Defines the props for the LoginForm component.
 * @interface
 */
interface LoginFormProps {
  /** The function to call when the form is successfully submitted. */
  onSubmit: (data: LoginFormData) => void;
  /** The function to call to switch the view to the registration form. */
  onSwitchToRegister: () => void;
  /** An optional boolean to indicate if a submission is in progress. */
  isLoading?: boolean;
}

/**
 * A component that renders the user login form.
 *
 * This component uses `react-hook-form` for state management and `zod` for
 * validation. It includes fields for email and password, a "remember me"
 * checkbox, a password visibility toggle, and handles the disabled state
 * during submission.
 *
 * @param {LoginFormProps} props The component props.
 * @returns {JSX.Element} The rendered login form.
 */
export function LoginForm({ onSubmit, onSwitchToRegister, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Entrar</h2>
        <p className="text-muted-foreground">
          Acesse sua conta no Campeonato FP Markets
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      className="pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="rounded border-border"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <Label className="text-sm cursor-pointer">Lembrar-me</Label>
                </FormItem>
              )}
            />
            
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 underline"
              disabled={isLoading}
            >
              Esqueci minha senha
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Form>

      <div className="text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">ou</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Ainda não tem uma conta?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary hover:text-primary/80 underline font-medium"
            disabled={isLoading}
          >
            Cadastre-se gratuitamente
          </button>
        </p>
      </div>
    </Card>
  );
}