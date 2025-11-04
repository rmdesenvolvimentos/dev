import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  User, 
  BarChart3, 
  History, 
  Trophy,
  ArrowLeft,
  Settings,
  LogOut
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * @interface TradingLayoutProps
 * Defines the props for the TradingLayout component.
 */
interface TradingLayoutProps {
  /** The content of the page to be rendered within the layout. */
  children: React.ReactNode;
  /** The title to be displayed in the header for the specific page. */
  title: string;
}

/**
 * A layout component that provides a consistent wrapper for authenticated trading pages.
 *
 * This component creates the main structure for views like the Trading Room,
 * History, and Performance Dashboard. It includes a sticky header with the
 * page title, user information (name, rank), and tab-based navigation to
 * switch between the different trading-related sections.
 *
 * @param {TradingLayoutProps} props The component props.
 * @returns {JSX.Element} The rendered layout with the page content.
 */
export function TradingLayout({ children, title }: TradingLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { path: '/trading', label: 'Sala de Trading', icon: TrendingUp },
    { path: '/history', label: 'Histórico', icon: History },
    { path: '/dashboard', label: 'Performance', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Campeonato
              </Button>
              
              <div className="flex items-center gap-2 border-l pl-4 border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">FP</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">{title}</h1>
                    <p className="text-xs text-muted-foreground">Trading Championship</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="font-semibold">Carlos Oliveira</span>
                <Badge variant="secondary">Trader ID: #12345</Badge>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Ranking</p>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-gold" />
                  <span className="font-bold text-gold">#47</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 mt-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}