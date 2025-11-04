import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  History,
  Filter,
  Download,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  Target,
  Award
} from 'lucide-react';
import { TradingLayout } from '@/components/layout/TradingLayout';

// Mock data for trading history
const mockTrades = [
  {
    id: 'T001',
    pair: 'EUR/USD',
    type: 'BUY',
    size: 0.1,
    openPrice: 1.2450,
    closePrice: 1.2485,
    openTime: '2024-01-15 09:15:30',
    closeTime: '2024-01-15 11:45:22',
    pnl: 35.00,
    points: 150,
    status: 'closed',
    duration: '2h 29m'
  },
  {
    id: 'T002',
    pair: 'GBP/USD',
    type: 'SELL',
    size: 0.05,
    openPrice: 1.3120,
    closePrice: 1.3095,
    openTime: '2024-01-15 08:30:15',
    closeTime: '2024-01-15 10:15:45',
    pnl: 12.50,
    points: 75,
    status: 'closed',
    duration: '1h 45m'
  },
  {
    id: 'T003',
    pair: 'USD/JPY',
    type: 'BUY',
    size: 0.08,
    openPrice: 149.25,
    closePrice: 148.95,
    openTime: '2024-01-15 13:20:10',
    closeTime: '2024-01-15 14:55:33',
    pnl: -24.00,
    points: -50,
    status: 'closed',
    duration: '1h 35m'
  },
  {
    id: 'T004',
    pair: 'EUR/USD',
    type: 'SELL',
    size: 0.12,
    openPrice: 1.2465,
    closePrice: 1.2425,
    openTime: '2024-01-15 15:10:25',
    closeTime: '2024-01-15 16:30:18',
    pnl: 48.00,
    points: 200,
    status: 'closed',
    duration: '1h 20m'
  },
  {
    id: 'T005',
    pair: 'AUD/USD',
    type: 'BUY',
    size: 0.06,
    openPrice: 0.6745,
    closePrice: 0.6765,
    openTime: '2024-01-15 16:45:12',
    closeTime: '2024-01-15 17:25:55',
    pnl: 12.00,
    points: 60,
    status: 'closed',
    duration: '40m'
  },
];

const mockStats = {
  totalTrades: 127,
  winningTrades: 89,
  losingTrades: 38,
  winRate: 70.08,
  totalPnL: 2847.50,
  totalPoints: 14250,
  averageWin: 45.20,
  averageLoss: -28.70,
  bestTrade: 156.30,
  worstTrade: -89.40,
  averageDuration: '1h 32m'
};

export default function TradingHistory() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  const filteredTrades = mockTrades.filter(trade => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'winning') return trade.pnl > 0;
    if (selectedFilter === 'losing') return trade.pnl < 0;
    return true;
  });

  return (
    <TradingLayout title="Histórico de Operações">
      <div className="container mx-auto p-4 space-y-6">
        {/* Performance Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{mockStats.totalTrades}</p>
            <p className="text-sm text-muted-foreground">Total Trades</p>
          </Card>
          
          <Card className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">{mockStats.winningTrades}</p>
            <p className="text-sm text-muted-foreground">Ganhadoras</p>
          </Card>
          
          <Card className="p-4 text-center">
            <TrendingDown className="w-8 h-8 text-danger mx-auto mb-2" />
            <p className="text-2xl font-bold text-danger">{mockStats.losingTrades}</p>
            <p className="text-sm text-muted-foreground">Perdedoras</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Target className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-accent">{mockStats.winRate}%</p>
            <p className="text-sm text-muted-foreground">Taxa Acerto</p>
          </Card>
          
          <Card className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">+${mockStats.totalPnL}</p>
            <p className="text-sm text-muted-foreground">P&L Total</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Award className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{mockStats.totalPoints.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Pontos</p>
          </Card>
        </div>

        {/* Filters and Tabs */}
        <Card className="p-4">
          <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="winning">Ganhadoras</TabsTrigger>
                <TabsTrigger value="losing">Perdedoras</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="bg-background border border-border rounded px-3 py-2 text-sm"
                >
                  <option value="today">Hoje</option>
                  <option value="week">Esta Semana</option>
                  <option value="month">Este Mês</option>
                  <option value="all">Todo Período</option>
                </select>
              </div>
            </div>

            <TabsContent value={selectedFilter}>
              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-1">Par</div>
                  <div className="col-span-1">Tipo</div>
                  <div className="col-span-1">Tamanho</div>
                  <div className="col-span-1">Entrada</div>
                  <div className="col-span-1">Saída</div>
                  <div className="col-span-2">Abertura</div>
                  <div className="col-span-2">Fechamento</div>
                  <div className="col-span-1">Duração</div>
                  <div className="col-span-1">P&L</div>
                </div>
                
                {filteredTrades.map((trade) => (
                  <div key={trade.id} className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="col-span-1">
                      <span className="text-sm font-mono">{trade.id}</span>
                    </div>
                    
                    <div className="col-span-1">
                      <span className="font-medium">{trade.pair}</span>
                    </div>
                    
                    <div className="col-span-1">
                      <Badge variant={trade.type === 'BUY' ? 'default' : 'secondary'} className="text-xs">
                        {trade.type}
                      </Badge>
                    </div>
                    
                    <div className="col-span-1">
                      <span className="text-sm">{trade.size}</span>
                    </div>
                    
                    <div className="col-span-1">
                      <span className="text-sm font-mono">{trade.openPrice}</span>
                    </div>
                    
                    <div className="col-span-1">
                      <span className="text-sm font-mono">{trade.closePrice}</span>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="text-sm">
                        <div>{trade.openTime.split(' ')[0]}</div>
                        <div className="text-muted-foreground text-xs">{trade.openTime.split(' ')[1]}</div>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="text-sm">
                        <div>{trade.closeTime.split(' ')[0]}</div>
                        <div className="text-muted-foreground text-xs">{trade.closeTime.split(' ')[1]}</div>
                      </div>
                    </div>
                    
                    <div className="col-span-1">
                      <div className="text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        {trade.duration}
                      </div>
                    </div>
                    
                    <div className="col-span-1">
                      <div className="text-right">
                        <div className={`font-bold ${trade.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                          {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                        </div>
                        <div className={`text-xs ${trade.points >= 0 ? 'text-success' : 'text-danger'}`}>
                          {trade.points >= 0 ? '+' : ''}{trade.points} pts
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Melhor Trade:</span>
                <span className="font-bold text-success">+${mockStats.bestTrade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pior Trade:</span>
                <span className="font-bold text-danger">${mockStats.worstTrade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ganho Médio:</span>
                <span className="font-bold text-success">+${mockStats.averageWin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Perda Média:</span>
                <span className="font-bold text-danger">${mockStats.averageLoss}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Tempo
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Duração Média:</span>
                <span className="font-bold">{mockStats.averageDuration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total de Horas:</span>
                <span className="font-bold">198h 45m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Trades/Dia:</span>
                <span className="font-bold">8.4</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              Ranking
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Posição Atual:</span>
                <span className="font-bold text-gold">#47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Melhor Posição:</span>
                <span className="font-bold text-primary">#23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pontos Totais:</span>
                <span className="font-bold">{mockStats.totalPoints.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </TradingLayout>
  );
}