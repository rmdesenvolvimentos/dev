import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Activity,
  Target,
  Trophy,
  Calendar,
  PieChart,
  LineChart,
  Users,
  Award,
  Percent,
  Clock
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';
import { TradingLayout } from '@/components/layout/TradingLayout';

// Mock data for performance
const performanceData = [
  { month: 'Jan', profit: 1200, trades: 45, winRate: 72 },
  { month: 'Fev', profit: 1850, trades: 52, winRate: 68 },
  { month: 'Mar', profit: 2340, trades: 48, winRate: 75 },
  { month: 'Abr', profit: 1920, trades: 41, winRate: 70 },
  { month: 'Mai', profit: 2680, trades: 55, winRate: 78 },
  { month: 'Jun', profit: 3150, trades: 60, winRate: 73 },
];

const tradingPairs = [
  { name: 'EUR/USD', value: 35, color: '#0088FE' },
  { name: 'GBP/USD', value: 25, color: '#00C49F' },
  { name: 'USD/JPY', value: 20, color: '#FFBB28' },
  { name: 'AUD/USD', value: 12, color: '#FF8042' },
  { name: 'USD/CAD', value: 8, color: '#8884d8' },
];

const weeklyPerformance = [
  { day: 'Seg', pnl: 120, trades: 8 },
  { day: 'Ter', pnl: 85, trades: 6 },
  { day: 'Qua', pnl: -45, trades: 5 },
  { day: 'Qui', pnl: 220, trades: 9 },
  { day: 'Sex', pnl: 180, trades: 7 },
  { day: 'Sáb', pnl: 95, trades: 4 },
  { day: 'Dom', pnl: 65, trades: 3 },
];

const mockStats = {
  totalProfit: 15450.75,
  totalTrades: 342,
  winRate: 72.8,
  currentRank: 47,
  bestRank: 23,
  totalPoints: 14250,
  avgTradeSize: 0.08,
  maxDrawdown: -8.5,
  profitFactor: 1.85,
  sharpeRatio: 1.42
};

export default function PerformanceDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');

  return (
    <TradingLayout title="Dashboard de Performance">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-background border border-border rounded px-3 py-2 text-sm"
            >
              <option value="1m">Último Mês</option>
              <option value="3m">3 Meses</option>
              <option value="6m">6 Meses</option>
              <option value="1y">1 Ano</option>
            </select>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">+${mockStats.totalProfit.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Lucro Total</p>
          </Card>
          
          <Card className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{mockStats.totalTrades}</p>
            <p className="text-sm text-muted-foreground">Total Trades</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Target className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-accent">{mockStats.winRate}%</p>
            <p className="text-sm text-muted-foreground">Taxa Acerto</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Trophy className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-gold">#{mockStats.currentRank}</p>
            <p className="text-sm text-muted-foreground">Ranking Atual</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Award className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{mockStats.totalPoints.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Pontos</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Percent className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">{mockStats.profitFactor}</p>
            <p className="text-sm text-muted-foreground">Profit Factor</p>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analysis">Análise</TabsTrigger>
            <TabsTrigger value="comparison">Comparação</TabsTrigger>
            <TabsTrigger value="goals">Metas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Performance Chart */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <LineChart className="w-5 h-5" />
                    Evolução do Lucro (6 meses)
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="month" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          formatter={(value, name) => [`$${value}`, 'Lucro']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="profit" 
                          stroke="hsl(var(--success))" 
                          fill="hsl(var(--success))" 
                          fillOpacity={0.2}
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Trading Pairs Distribution */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Distribuição por Par
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={tradingPairs}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {tradingPairs.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Weekly Performance */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Semanal
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="pnl" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-success" />
                  Métricas de Risco
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max Drawdown:</span>
                    <span className="font-bold text-danger">{mockStats.maxDrawdown}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sharpe Ratio:</span>
                    <span className="font-bold text-success">{mockStats.sharpeRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Profit Factor:</span>
                    <span className="font-bold text-primary">{mockStats.profitFactor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tamanho Médio:</span>
                    <span className="font-bold">{mockStats.avgTradeSize}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-gold" />
                  Evolução no Ranking
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Posição Atual:</span>
                    <span className="font-bold text-gold">#{mockStats.currentRank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Melhor Posição:</span>
                    <span className="font-bold text-primary">#{mockStats.bestRank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Progresso:</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="font-bold text-success">+24 posições</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Estatísticas de Tempo
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duração Média:</span>
                    <span className="font-bold">2h 15m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Trades/Dia:</span>
                    <span className="font-bold">6.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Melhor Horário:</span>
                    <span className="font-bold">14h - 16h</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Comparação com Outros Traders
              </h3>
              <p className="text-muted-foreground mb-4">Compare seu desempenho com traders do seu nível</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-success mb-2">Top 10%</div>
                  <div className="text-sm text-muted-foreground">Sua classificação</div>
                  <div className="text-xs text-muted-foreground mt-1">Entre todos os participantes</div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-2">+18.5%</div>
                  <div className="text-sm text-muted-foreground">Acima da Média</div>
                  <div className="text-xs text-muted-foreground mt-1">Performance vs competidores</div>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">2.1x</div>
                  <div className="text-sm text-muted-foreground">Fator de Lucro</div>
                  <div className="text-xs text-muted-foreground mt-1">Média do mercado: 1.4x</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Metas do Mês
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Lucro Meta: $5,000</span>
                      <span className="text-sm font-bold">78%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Meta Ranking: Top 30</span>
                      <span className="text-sm font-bold text-gold">Alcançado!</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gold h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Taxa de Acerto: 75%</span>
                      <span className="text-sm font-bold">97%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Conquistas
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                    <Trophy className="w-6 h-6 text-gold" />
                    <div>
                      <div className="font-medium">100 Trades Vencedores</div>
                      <div className="text-sm text-muted-foreground">Desbloqueado em 15/01</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <Target className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-medium">Streak de 10 Dias</div>
                      <div className="text-sm text-muted-foreground">Meta diária alcançada</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border opacity-50">
                    <Award className="w-6 h-6 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Top 20 Ranking</div>
                      <div className="text-sm text-muted-foreground">Próxima conquista</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TradingLayout>
  );
}