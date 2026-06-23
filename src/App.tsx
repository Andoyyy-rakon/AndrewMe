import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExpEduc from './components/ExpEduc';
import Preloader from './components/Preloader';
import TechIconsOverlay from './components/TechIconsOverlay';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
        <div className="relative">
          <Navbar />
          <TechIconsOverlay />
          <Hero />
          <ExpEduc />
        </div>
    </div>
  );
};

export default App;
