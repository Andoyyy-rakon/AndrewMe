import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExpEduc from './components/ExpEduc';
import ProjectSection from './components/ProjectSection';
import Preloader from './components/Preloader';
import TechIconsOverlay from './components/TechIconsOverlay';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Final definitive freeze: Use native CSS sticky for 100% stability
  // The Journey section will pin to the top, and the Project section will slide over it.

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
          
          <div className="relative">
            {/* The "Under" Layer (Journey) - Truly sticky for absolute freeze */}
            <div className="sticky top-0 z-10 w-full overflow-hidden">
              <ExpEduc />
            </div>

            {/* The "Over" Layer (Projects) - High z-index to overlay background */}
            <div className="relative z-20 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.4)]">
              <ProjectSection />
            </div>
          </div>
        </div>
    </div>
  );
};

export default App;
