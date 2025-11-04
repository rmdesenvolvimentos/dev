import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, Mail, Shield, Globe, FileText, Phone } from 'lucide-react';

/**
 * A component that renders the main site footer.
 *
 * The footer is divided into several sections:
 * - A brand section with a short description of the championship.
 * - A newsletter signup form.
 * - A list of useful navigation links.
 * - A list of legal and informational links.
 * - A bottom bar with copyright information and security/regulatory badges.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Trading Championship
                </h3>
                <p className="text-sm text-muted-foreground">
                  Powered by FP Markets
                </p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-lg">
              O maior campeonato internacional de trading do mundo. 
              Compete com traders profissionais e prove suas habilidades 
              no mercado financeiro global com total segurança e transparência.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">
                Receba Atualizações
              </h4>
              <div className="flex gap-2">
                <Input 
                  placeholder="Seu e-mail" 
                  className="flex-1"
                />
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground">Links Úteis</h4>
            <ul className="space-y-3">
              <li>
                <a href="#ranking" className="text-muted-foreground hover:text-primary transition-colors">
                  Ranking Atual
                </a>
              </li>
              <li>
                <a href="#rules" className="text-muted-foreground hover:text-primary transition-colors">
                  Regulamento
                </a>
              </li>
              <li>
                <a href="#prizes" className="text-muted-foreground hover:text-primary transition-colors">
                  Premiação
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Suporte
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground">Informações</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FP Markets
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © 2024 Trading Championship. Todos os direitos reservados.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Em parceria com FP Markets - Regulamentado por ASIC, CySEC e FSCA
              </p>
            </div>
            
            {/* Security Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Regulamentado</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Licenciado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}