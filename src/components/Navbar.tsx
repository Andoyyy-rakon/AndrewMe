import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';

import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Journey', href: '#experience-education' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 w-full z-50 bg-surface/80 dark:bg-on-surface/80 backdrop-blur-md border-b border-outline-variant/10"
    >
      <div className="flex justify-between items-center px-margin-mobile py-4 max-w-[1440px] mx-auto md:px-margin-desktop">
        <div className="flex items-center gap-2">
          <a href="#hero" className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-bold font-plus-jakarta text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-primary/5 transition-all text-on-surface-variant dark:text-surface-variant"
          >
            <span className="material-symbols-outlined">
              {isDark ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden rounded-full hover:bg-primary/5 transition-all text-on-surface-variant"
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-surface border-b border-outline-variant/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-bold font-plus-jakarta text-on-surface-variant hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
