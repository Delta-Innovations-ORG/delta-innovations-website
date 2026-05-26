import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '../../content/siteConfig';
import { Button } from '../ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link-hover text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-brand-cyan active' : 'text-brand-muted hover:text-brand-cyan'
    }`;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-navy/90 backdrop-blur-xl shadow-card border-b border-brand-cyan/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <img
            src={siteConfig.logo}
            alt={siteConfig.name}
            className={`transition-all duration-300 w-auto object-contain group-hover:scale-105 ${scrolled ? 'h-9' : 'h-11'}`}
          />
          <div className="hidden sm:block leading-tight">
            <span className="block font-display font-bold text-brand-light text-base lg:text-lg tracking-tight">
              Delta
            </span>
            <span className="block font-display font-bold text-gradient-brand text-base lg:text-lg tracking-tight -mt-0.5">
              Innovations
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={navClass}>
              {link.name}
            </NavLink>
          ))}
          <Button to="/contact" size="sm">
            Start Your Project
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-brand-light hover:text-brand-cyan transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-brand-navy/95 backdrop-blur-xl border-t border-brand-cyan/10"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              <p className="sm:hidden font-display font-bold text-lg mb-2">
                <span className="text-brand-light">Delta </span>
                <span className="text-gradient-brand">Innovations</span>
              </p>
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} className={navClass}>
                  {link.name}
                </NavLink>
              ))}
              <Button to="/contact" size="sm" className="mt-2 w-full">
                Start Your Project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
