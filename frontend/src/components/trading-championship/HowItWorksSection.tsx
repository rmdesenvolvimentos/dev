import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, TrendingUp, Trophy, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Registre-se',
    description: 'Crie sua conta e complete o processo de verificação para participar do campeonato.',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    icon: TrendingUp,
    title: 'Faça Trading',
    description: 'Negocie com capital virtual na plataforma FP Markets e maximize seus lucros.',
    color: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  {
    icon: Trophy,
    title: 'Ganhe Prêmios',
    description: 'Seja um dos melhores traders e ganhe prêmios em dinheiro real.',
    color: 'text-gold',
    bgColor: 'bg-gold/10'
  }
];

/**
 * A component that renders the "How It Works" section.
 *
 * This section visually explains the process of participating in the championship
 * in three simple steps: Register, Trade, and Win. It uses a card-based layout
 * with icons and connecting lines to guide the user through the process.
 * It also includes a subsection detailing the requirements for participation.
 *
 * @returns {JSX.Element} The rendered "How It Works" section.
 */
export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Como Funciona
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Três passos simples para começar sua jornada no campeonato
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary via-accent to-gold -translate-y-1/2" />
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-accent via-gold to-gold -translate-y-1/2" />

            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-8 pb-6">
                    <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-2xl font-bold text-muted-foreground mb-2">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div className="mt-16 bg-gradient-to-r from-primary/5 via-accent/5 to-gold/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Requisitos para Participar
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">Ser maior de 18 anos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-muted-foreground">Conta verificada na FP Markets</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  <span className="text-muted-foreground">Aceitar os termos do campeonato</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">Conhecimento básico em trading</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}