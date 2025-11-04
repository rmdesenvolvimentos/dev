import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, User, Menu, X } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';

/**
 * A component that renders the main site header and navigation bar.
 *
 * This header is fixed to the top of the viewport and includes the site logo,
 * primary navigation links, and user action buttons (Login, Participate). It is
 * fully responsive, collapsing the navigation links into a hamburger menu on
 * smaller screens. It also manages the state for opening the `AuthModal` for
 * both login and registration flows.
 *
 * @returns {JSX.Element} The rendered header component.
 */
export function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /** Opens the authentication modal in 'login' mode. */
  const handleLoginClick = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  /** Opens the authentication modal in 'register' mode. */
  const handleRegisterClick = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  /** Toggles the visibility of the mobile navigation menu. */
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  /** The navigation items to be displayed in the header. */
  const menuItems = [
    { href: '#home', label: 'Início' },
    { href: '#ranking', label: 'Ranking' },
    { href: '/trading', label: 'Sala de Trading' },
    { href: '/history', label: 'Histórico' },
    { href: '/dashboard', label: 'Performance' },
    { href: '#about', label: 'Sobre' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Trading Championship
                </h1>
                <p className="text-xs text-muted-foreground">
                  Powered by FP Markets
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="text-foreground hover:text-primary transition-colors font-medium text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Section */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hidden md:flex" onClick={handleLoginClick}>
              <User className="h-4 w-4 mr-2" />
              Entrar
            </Button>
            <Button 
              className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold"
              onClick={handleRegisterClick}
            >
              Participar Agora
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border">
            <nav className="container mx-auto px-4 py-4 space-y-3">
              {menuItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 border-t border-border">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {
                    handleLoginClick();
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}