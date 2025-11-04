import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, Medal, Crown } from 'lucide-react';

const mockRanking = [
  { position: 1, name: 'João Silva', country: 'BR', profit: '+285.7%', icon: Crown, color: 'text-gold' },
  { position: 2, name: 'Maria Santos', country: 'BR', profit: '+247.3%', icon: Trophy, color: 'text-muted-foreground' },
  { position: 3, name: 'Carlos Oliveira', country: 'BR', profit: '+198.1%', icon: Medal, color: 'text-orange-600' },
  { position: 4, name: 'Ana Costa', country: 'BR', profit: '+176.9%', icon: TrendingUp, color: 'text-primary' },
  { position: 5, name: 'Pedro Ferreira', country: 'BR', profit: '+154.2%', icon: TrendingUp, color: 'text-accent' },
];

/**
 * A component that displays the trading championship ranking section.
 *
 * This section is a key part of the landing page, designed to showcase the
 * top-performing traders and provide live statistics about the championship.
 * It features a list of the top 5 traders and summary cards for active traders,
 * volume traded, and participating countries.
 *
 * NOTE: This component currently uses a `mockRanking` object for demonstration
 * purposes. In a production environment, this would be replaced with a live
 * data fetch from the `championshipApi`.
 *
 * @returns {JSX.Element} The rendered ranking section.
 */
export function RankingSection() {
  return (
    <section id="ranking" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ranking Atual
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acompanhe a classificação dos melhores traders em tempo real
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Trophy className="h-6 w-6 text-gold mr-2" />
                  Top 5 Traders
                </span>
                <Button variant="outline" size="sm">
                  Ver Ranking Completo
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRanking.map((trader, index) => (
                <div 
                  key={trader.position}
                  className="flex items-center justify-between p-4 rounded-lg bg-card/50 hover:bg-card transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <trader.icon className={`h-5 w-5 ${trader.color}`} />
                      <span className="text-2xl font-bold text-muted-foreground">
                        #{trader.position}
                      </span>
                    </div>
                    <div className="font-semibold text-foreground flex items-center">
                      {trader.country && (
                        <ReactCountryFlag
                          countryCode={trader.country}
                          svg
                          style={{
                            width: '1.5em',
                            height: '1.5em',
                            marginRight: '8px',
                          }}
                          title={trader.country}
                        />
                      )}
                      {trader.name}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">
                      {trader.profit}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Lucro Total
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Live Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">2,547</div>
                <div className="text-muted-foreground">Traders Ativos</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent mb-2">$12.4M</div>
                <div className="text-muted-foreground">Volume Negociado</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-gold mb-2">72</div>
                <div className="text-muted-foreground">Países Participantes</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}