import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';

import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

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
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-primary/5 transition-all text-on-surface-variant dark:text-surface-variant"
          >
            <span className="material-symbols-outlined">
              {isDark ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
