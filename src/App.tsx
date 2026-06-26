import React, { useState, useRef, useLayoutEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExpEduc from './components/ExpEduc';
import ProjectSection from './components/ProjectSection';
import Preloader from './components/Preloader';
import TechIconsOverlay from './components/TechIconsOverlay';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Refs for GSAP ScrollTrigger targeting
  const expEducWrapperRef = useRef<HTMLDivElement>(null);
  const projectWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Wait for preloader to finish before initializing GSAP
    if (isLoading) return;

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const expEducEl = expEducWrapperRef.current;
      const projectEl = projectWrapperRef.current;
      if (!expEducEl || !projectEl) return;

      ScrollTrigger.refresh();

      // ─── PIN: Freeze the Journey section at its FINAL state ───
      // The section scrolls NORMALLY until the user reaches the very bottom.
      // Once the bottom of ExpEduc hits the bottom of the viewport (all content read),
      // the section freezes in place. No extra scroll distance is added.
      ScrollTrigger.create({
        trigger: expEducEl,
        start: 'bottom bottom',  // Pin when bottom of section hits viewport bottom
        endTrigger: projectEl,   // End pin based on when Projects section moves past
        end: 'top top',          // Release when Projects reaches viewport top
        pin: true,               // Freeze the section
        pinSpacing: false,       // No extra scroll space — Projects immediately follows
      });

      // ─── OVERLAY: Projects section slides up smoothly ───
      // GSAP adds a smooth "rising" effect as Projects enters the viewport.
      gsap.fromTo(
        projectEl,
        { y: 60 },
        {
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectEl,
            start: 'top bottom',
            end: 'top 30%',
            scrub: 0.6,
          },
        }
      );
    }, 150);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isLoading]);

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
          
          {/* ─── Transition zone ─── */}
          <div className="relative" id="experience-education">
            {/* Journey — scrolls normally, then GSAP freezes at the bottom */}
            <div ref={expEducWrapperRef} className="relative z-10">
              <ExpEduc />
            </div>

            {/* Projects — slides smoothly over the frozen Journey */}
            <div
              ref={projectWrapperRef}
              className="relative z-20 bg-white shadow-[0_-40px_80px_-10px_rgba(0,0,0,0.35)]"
            >
              <ProjectSection />
            </div>
          </div>
        </div>
    </div>
  );
};

export default App;