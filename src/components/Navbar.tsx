
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Candidates', path: '/candidates' },
    { label: 'Guidelines', path: '/guidelines' },
    { 
      label: 'Information', 
      children: [
        { label: 'Voter Info', path: '/voter-info' },
        { label: 'Results', path: '/results' },
        { label: 'Complaints', path: '/complaints' }
      ]
    }
  ];

  return (
    <nav className="glossy sticky top-0 z-50 py-4 animate-fade-in">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-primary"></div>
          </div>
          <span className="font-bold text-xl">BlockVote</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => 
            !item.children ? (
              <Link 
                key={index} 
                to={item.path}
                className="font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground/80 hover:text-primary transition-colors">
                  {item.label} <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {item.children.map((child, childIndex) => (
                    <DropdownMenuItem key={childIndex} asChild>
                      <Link to={child.path} className="w-full">
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}
        </div>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link to="/login">
            <Button variant="default" size="sm">
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border animate-slide-up">
          <div className="container-custom py-4 flex flex-col gap-4">
            {navItems.map((item, index) => 
              !item.children ? (
                <Link 
                  key={index} 
                  to={item.path}
                  className="py-2 font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <div key={index} className="py-2">
                  <div className="font-medium mb-2">{item.label}</div>
                  <div className="pl-4 flex flex-col gap-2">
                    {item.children.map((child, childIndex) => (
                      <Link 
                        key={childIndex} 
                        to={child.path}
                        className="py-1 text-foreground/70 hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            )}
            <div className="border-t border-border my-2"></div>
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
