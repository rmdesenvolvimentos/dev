import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Trophy, Users } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';

/**
 * A component that renders the hero section for the trading championship landing page.
 *
 * This component serves as the main entry point for visitors, featuring a prominent
 * headline, a brief description, primary call-to-action buttons ("Inscrever-se Agora"
 * and "Ver Regulamento"), and key statistics about the event. It manages the state
 * to open the authentication modal in registration mode when the main CTA is clicked.
 *
 * @returns {JSX.Element} The rendered hero section component.
 */
export function HeroSection() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const handleRegisterClick = () => {
    setAuthModalOpen(true);
  };

  return (
    <>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container relative mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Campeonato</span>
                  <br />
                  <span className="text-primary">Internacional</span>
                  <br />
                  <span className="text-accent">de Trading</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Compete com traders de todo o mundo e prove suas habilidades no mercado financeiro internacional.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold px-8"
                  onClick={handleRegisterClick}
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  Inscrever-se Agora
                </Button>
                <Button variant="outline" size="lg" className="font-semibold">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Ver Regulamento
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$50,000</div>
                  <div className="text-sm text-muted-foreground">Prêmio Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">2,500+</div>
                  <div className="text-sm text-muted-foreground">Participantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">30</div>
                  <div className="text-sm text-muted-foreground">Dias Restantes</div>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-gold/20 p-8">
                <div className="h-full rounded-2xl bg-card border border-border/50 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <TrendingUp className="h-16 w-16 text-primary mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">
                        Trading Profissional
                      </h3>
                      <p className="text-muted-foreground">
                        Plataforma FP Markets
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="register"
      />
    </>
  );
}