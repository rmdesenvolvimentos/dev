import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Award, Handshake } from 'lucide-react';

/**
 * A component that renders the "About the Championship" section.
 *
 * This section provides key information and selling points about the event,
 * presented in a series of feature cards. It highlights the regulatory backing,
 * the attractive prize pool, and the official partnership with FP Markets.
 * It also includes a dedicated block to emphasize the benefits of the
 * partnership with FP Markets.
 *
 * @returns {JSX.Element} The rendered "About" section.
 */
export function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Sobre o Campeonato
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma competição global de trading que une profissionais e entusiastas do mercado financeiro em busca da excelência.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-xl">Regulamentado</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Competição oficial regulamentada pela FP Markets, garantindo transparência e segurança em todas as operações.
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 hover:border-accent/40 transition-colors">
            <CardHeader className="text-center">
              <Award className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle className="text-xl">Premiação Atrativa</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Mais de $50,000 em prêmios distribuídos entre os melhores traders, com categorias para diferentes níveis de experiência.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gold/20 hover:border-gold/40 transition-colors">
            <CardHeader className="text-center">
              <Handshake className="h-12 w-12 text-gold mx-auto mb-4" />
              <CardTitle className="text-xl">Parceria FP Markets</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Em parceria com a FP Markets, corretora líder mundial, oferecendo as melhores condições de trading e suporte.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Partnership Highlight */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-gold/10 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Por que FP Markets?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Mais de 15 anos de experiência no mercado financeiro global
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Regulamentação ASIC, CySEC e FSCA para máxima segurança
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Spreads ultra-baixos e execução instantânea de ordens
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-card rounded-xl p-8 border border-border/50">
                <h4 className="text-4xl font-bold text-primary mb-2">FP Markets</h4>
                <p className="text-muted-foreground mb-4">Parceiro Oficial</p>
                <div className="text-sm text-muted-foreground">
                  Powering Professional Trading
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}