import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.png';

const words = [
  "Hello", 
  "你好",  
  "こんにちは", 
  "مرحبا",  
  "Kamusta", 
];

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(onComplete, 500);
      return;
    }

    const timeout = setTimeout(() => {
      setIndex(prev => prev + 1);
    }, index === 0 ? 1000 : 150); // First word stays longer

    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface dark:bg-on-surface"
    >
      <div className="flex items-center gap-3">
        <motion.div
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-4xl md:text-6xl font-bold text-primary flex items-center gap-4"
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="w-10 h-10 md:w-14 md:h-14 object-contain"
          />
          {words[index]}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
