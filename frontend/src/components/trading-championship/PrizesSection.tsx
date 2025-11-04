import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy, Medal, Gift, Star } from 'lucide-react';

const prizes = [
  {
    position: '1º Lugar',
    amount: '$20,000',
    icon: Crown,
    color: 'text-gold',
    bgColor: 'bg-gold/10',
    borderColor: 'border-gold/30',
    badge: 'Campeão',
    badgeColor: 'bg-gold text-gold-foreground'
  },
  {
    position: '2º Lugar',
    amount: '$12,000',
    icon: Trophy,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/20',
    borderColor: 'border-muted/40',
    badge: 'Vice-Campeão',
    badgeColor: 'bg-muted text-muted-foreground'
  },
  {
    position: '3º Lugar',
    amount: '$8,000',
    icon: Medal,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800/40',
    badge: '3º Lugar',
    badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'
  }
];

const additionalPrizes = [
  { category: '4º - 10º Lugar', amount: '$1,500', description: 'Para cada posição' },
  { category: '11º - 25º Lugar', amount: '$500', description: 'Para cada posição' },
  { category: 'Prêmio Novato', amount: '$2,000', description: 'Melhor trader estreante' },
];

/**
 * A component that renders the "Prizes" section of the landing page.
 *
 * This section is designed to attract participants by showcasing the prize
 * money available. It uses a card-based layout to highlight the main prizes
 * for the top three places, as well as additional prizes for other ranking
 * tiers and special categories.
 *
 * @returns {JSX.Element} The rendered prizes section.
 */
export function PrizesSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Premiação
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mais de $50,000 em prêmios para os melhores traders do mundo
          </p>
        </div>

        {/* Main Prizes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {prizes.map((prize, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${prize.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              <CardHeader className="text-center">
                <Badge className={`${prize.badgeColor} mb-4 w-fit mx-auto`}>
                  {prize.badge}
                </Badge>
                <div className={`w-20 h-20 ${prize.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <prize.icon className={`h-10 w-10 ${prize.color}`} />
                </div>
                <CardTitle className="text-xl text-foreground">
                  {prize.position}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {prize.amount}
                </div>
                <div className="text-muted-foreground">
                  Prêmio em Dinheiro
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Prizes */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Premiação Adicional
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalPrizes.map((prize, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Gift className="h-8 w-8 text-accent mx-auto mb-4" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      {prize.category}
                    </h4>
                    <div className="text-2xl font-bold text-primary">
                      {prize.amount}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {prize.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Prize Distribution */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-accent/10 to-gold/10 rounded-2xl p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              Distribuição Total de Prêmios
            </h3>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <Star className="h-12 w-12 text-gold mx-auto mb-2" />
                <div className="text-4xl font-bold text-gold">$50,000+</div>
                <div className="text-muted-foreground">Prêmio Total</div>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-primary">Top 3</div>
                <div className="text-muted-foreground">$40,000</div>
              </div>
              <div>
                <div className="text-xl font-bold text-accent">Top 25</div>
                <div className="text-muted-foreground">$18,000</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gold">Novatos</div>
                <div className="text-muted-foreground">$2,000</div>
              </div>
              <div>
                <div className="text-xl font-bold text-success">Bônus</div>
                <div className="text-muted-foreground">Surpresas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}