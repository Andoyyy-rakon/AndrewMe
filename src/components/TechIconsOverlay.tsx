import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';

import jsIcon from '../assets/icons/javascript.png';
import javaIcon from '../assets/icons/java.png';
import cppIcon from '../assets/icons/c-plus-plus.png';
import pythonIcon from '../assets/icons/python.png';

interface TechIconsOverlayProps {
  isLoading?: boolean;
}

// ────────────────────────────────────────────────────────────────────────
// DESKTOP SUB-COMPONENT
// ────────────────────────────────────────────────────────────────────────
const DesktopTechIcons: React.FC<{ shouldAnimate: boolean }> = ({ shouldAnimate }) => {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const range: [number, number] = [0, 900];

  // JavaScript - Starts Top-Left of Photo -> Moves to Left Sidebar
  const jsX = useTransform(smoothY, range, ["60%", "2%"]);
  const jsY = useTransform(smoothY, range, ["30%", "25%"]);
  const jsScale = useTransform(smoothY, range, [1, 1.8]);
  const jsOpacity = useTransform(smoothY, range, [1, 0.4]);
  const jsRotate = useTransform(smoothY, range, [15, 0]);

  // Java - Starts Top-Right of Photo -> Moves to Right Sidebar
  const javaX = useTransform(smoothY, range, ["80%", "90%"]);
  const javaY = useTransform(smoothY, range, ["30%", "35%"]);
  const javaScale = useTransform(smoothY, range, [1, 1.8]);
  const javaOpacity = useTransform(smoothY, range, [1, 0.4]);
  const javaRotate = useTransform(smoothY, range, [-15, 0]);

  // C++ - Starts Bottom-Right of Photo -> Moves to Right Sidebar
  const cppX = useTransform(smoothY, range, ["85%", "92%"]);
  const cppY = useTransform(smoothY, range, ["65%", "75%"]);
  const cppScale = useTransform(smoothY, range, [1, 1.8]);
  const cppOpacity = useTransform(smoothY, range, [1, 0.4]);
  const cppRotate = useTransform(smoothY, range, [10, 0]);

  // Python - Starts Bottom-Left of Photo -> Moves to Left Sidebar
  const pythonX = useTransform(smoothY, range, ["55%", "3%"]);
  const pythonY = useTransform(smoothY, range, ["60%", "80%"]);
  const pythonScale = useTransform(smoothY, range, [1, 1.8]);
  const pythonOpacity = useTransform(smoothY, range, [1, 0.4]);
  const pythonRotate = useTransform(smoothY, range, [-10, 0]);

  // Entrance variants for desktop overlay
  const jsVariants: Variants = {
    hidden: { opacity: 0, x: -300, scale: 0.6 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }
    }
  };

  const javaVariants: Variants = {
    hidden: { opacity: 0, x: 300, scale: 0.6 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }
    }
  };

  const cppVariants: Variants = {
    hidden: { opacity: 0, x: 300, scale: 0.6 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }
    }
  };

  const pythonVariants: Variants = {
    hidden: { opacity: 0, x: -300, scale: 0.6 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }
    }
  };

  return (
    <>
      <motion.div 
        variants={jsVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ left: jsX, top: jsY, position: 'absolute' }}
      >
        <motion.img 
          src={jsIcon} 
          style={{ scale: jsScale, opacity: jsOpacity, rotate: jsRotate }}
          className="w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-2xl" 
          alt="JavaScript" 
        />
      </motion.div>
      
      <motion.div 
        variants={javaVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ left: javaX, top: javaY, position: 'absolute' }}
      >
        <motion.img 
          src={javaIcon} 
          style={{ scale: javaScale, opacity: javaOpacity, rotate: javaRotate }}
          className="w-24 h-24 md:w-28 md:h-28 object-contain filter drop-shadow-2xl" 
          alt="Java" 
        />
      </motion.div>
      
      <motion.div 
        variants={cppVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ left: cppX, top: cppY, position: 'absolute' }}
      >
        <motion.img 
          src={cppIcon} 
          style={{ scale: cppScale, opacity: cppOpacity, rotate: cppRotate }}
          className="w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-2xl" 
          alt="C++" 
        />
      </motion.div>
      
      <motion.div 
        variants={pythonVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ left: pythonX, top: pythonY, position: 'absolute' }}
      >
        <motion.img 
          src={pythonIcon} 
          style={{ scale: pythonScale, opacity: pythonOpacity, rotate: pythonRotate }}
          className="w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-2xl" 
          alt="Python" 
        />
      </motion.div>
    </>
  );
};

// ────────────────────────────────────────────────────────────────────────
// TABLET/IPAD SUB-COMPONENT  (768px – 1024px)
// Adjust these coordinates to fine-tune icon positions on tablet screens
// ────────────────────────────────────────────────────────────────────────
const TabletTechIcons: React.FC<{ shouldAnimate: boolean }> = ({ shouldAnimate }) => {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const range: [number, number] = [0, 600];

  // JS – top-left of portrait
  const jsX = useTransform(smoothY, range, ["42%", "5%"]);
  const jsY = useTransform(smoothY, range, ["28%", "20%"]);
  const jsScale = useTransform(smoothY, range, [1, 0.6]);
  const jsOpacity = useTransform(smoothY, range, [1, 0]);
  const jsRotate = useTransform(smoothY, range, [15, -10]);

  // Java – top-right of portrait
  const javaX = useTransform(smoothY, range, ["68%", "88%"]);
  const javaY = useTransform(smoothY, range, ["26%", "18%"]);
  const javaScale = useTransform(smoothY, range, [1, 0.6]);
  const javaOpacity = useTransform(smoothY, range, [1, 0]);
  const javaRotate = useTransform(smoothY, range, [-15, 10]);

  // C++ – bottom-right of portrait
  const cppX = useTransform(smoothY, range, ["72%", "90%"]);
  const cppY = useTransform(smoothY, range, ["62%", "50%"]);
  const cppScale = useTransform(smoothY, range, [1, 0.6]);
  const cppOpacity = useTransform(smoothY, range, [1, 0]);
  const cppRotate = useTransform(smoothY, range, [10, -10]);

  // Python – bottom-left of portrait
  const pythonX = useTransform(smoothY, range, ["36%", "5%"]);
  const pythonY = useTransform(smoothY, range, ["64%", "52%"]);
  const pythonScale = useTransform(smoothY, range, [1, 0.6]);
  const pythonOpacity = useTransform(smoothY, range, [1, 0]);
  const pythonRotate = useTransform(smoothY, range, [-10, 10]);

  // Entrance variants: converge inward
  const jsVariants: Variants = {
    hidden: { opacity: 0, x: -200, scale: 0.6 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }
    }
  };
  const javaVariants: Variants = {
    hidden: { opacity: 0, x: 200, scale: 0.6 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }
    }
  };
  const cppVariants: Variants = {
    hidden: { opacity: 0, x: 200, scale: 0.6 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }
    }
  };
  const pythonVariants: Variants = {
    hidden: { opacity: 0, x: -200, scale: 0.6 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }
    }
  };

  return (
    <>
      <motion.div variants={jsVariants} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} style={{ left: jsX, top: jsY, position: 'absolute' }}>
        <motion.img src={jsIcon} style={{ scale: jsScale, opacity: jsOpacity, rotate: jsRotate }} className="w-16 h-16 object-contain filter drop-shadow-2xl" alt="JavaScript" />
      </motion.div>
      <motion.div variants={javaVariants} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} style={{ left: javaX, top: javaY, position: 'absolute' }}>
        <motion.img src={javaIcon} style={{ scale: javaScale, opacity: javaOpacity, rotate: javaRotate }} className="w-20 h-20 object-contain filter drop-shadow-2xl" alt="Java" />
      </motion.div>
      <motion.div variants={cppVariants} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} style={{ left: cppX, top: cppY, position: 'absolute' }}>
        <motion.img src={cppIcon} style={{ scale: cppScale, opacity: cppOpacity, rotate: cppRotate }} className="w-16 h-16 object-contain filter drop-shadow-2xl" alt="C++" />
      </motion.div>
      <motion.div variants={pythonVariants} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"} style={{ left: pythonX, top: pythonY, position: 'absolute' }}>
        <motion.img src={pythonIcon} style={{ scale: pythonScale, opacity: pythonOpacity, rotate: pythonRotate }} className="w-16 h-16 object-contain filter drop-shadow-2xl" alt="Python" />
      </motion.div>
    </>
  );
};

// ────────────────────────────────────────────────────────────────────────
// MOBILE SUB-COMPONENT  (<768px)
// ────────────────────────────────────────────────────────────────────────
const MobileTechIcons: React.FC<{ shouldAnimate: boolean }> = ({ shouldAnimate }) => {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const range: [number, number] = [0, 400]; // Fades out cleanly on scroll

  // Clusters close to portrait center (X=50%, Y=73%), flies outward and shrinks on scroll
  const jsX = useTransform(smoothY, range, ["32%", "10%"]);
  const jsY = useTransform(smoothY, range, ["65%", "45%"]);
  const jsScale = useTransform(smoothY, range, [1, 0.5]);
  const jsOpacity = useTransform(smoothY, range, [1, 0]);
  const jsRotate = useTransform(smoothY, range, [15, -15]);

  const javaX = useTransform(smoothY, range, ["68%", "90%"]);
  const javaY = useTransform(smoothY, range, ["65%", "43%"]);
  const javaScale = useTransform(smoothY, range, [1.5, 0.5]);
  const javaOpacity = useTransform(smoothY, range, [1, 0]);
  const javaRotate = useTransform(smoothY, range, [-15, 15]);

  const cppX = useTransform(smoothY, range, ["74%", "94%"]);
  const cppY = useTransform(smoothY, range, ["80%", "60%"]);
  const cppScale = useTransform(smoothY, range, [1, 0.5]);
  const cppOpacity = useTransform(smoothY, range, [1, 0]);
  const cppRotate = useTransform(smoothY, range, [10, -10]);

  const pythonX = useTransform(smoothY, range, ["21%", "6%"]);
  const pythonY = useTransform(smoothY, range, ["80%", "58%"]);
  const pythonScale = useTransform(smoothY, range, [1, 0.5]);
  const pythonOpacity = useTransform(smoothY, range, [1, 0]);
  const pythonRotate = useTransform(smoothY, range, [-10, 10]);

  // Entrance variants: converge in from screen borders
  const jsVariants: Variants = {
    hidden: { opacity: 0, x: -150, scale: 0.6 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }
    }
  };

  const javaVariants: Variants = {
    hidden: { opacity: 0, x: 150, scale: 0.6 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }
    }
  };

  const cppVariants: Variants = {
    hidden: { opacity: 0, x: 150, scale: 0.6 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }
    }
  };

  const pythonVariants: Variants = {
    hidden: { opacity: 0, x: -150, scale: 0.6 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }
    }
  };

  return (
    <>
      <motion.div 
        variants={jsVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ left: jsX, top: jsY, position: 'absolute' }}
      >
        <motion.img 
          src={jsIcon} 
          style={{ scale: jsScale, opacity: jsOpacity, rotate: jsRotate }}
          className="w-14 h-14 object-contain filter drop-shadow-2xl" 
          alt="JavaScript" 
        />
      </motion.div>
      
      <motion.div 
        variants={javaVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ left: javaX, top: javaY, position: 'absolute' }}
      >
        <motion.img 
          src={javaIcon} 
          style={{ scale: javaScale, opacity: javaOpacity, rotate: javaRotate }}
          className="w-16 h-16 object-contain filter drop-shadow-2xl" 
          alt="Java" 
        />
      </motion.div>
      
      <motion.div 
        variants={cppVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ left: cppX, top: cppY, position: 'absolute' }}
      >
        <motion.img 
          src={cppIcon} 
          style={{ scale: cppScale, opacity: cppOpacity, rotate: cppRotate }}
          className="w-14 h-14 object-contain filter drop-shadow-2xl" 
          alt="C++" 
        />
      </motion.div>
      
      <motion.div 
        variants={pythonVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ left: pythonX, top: pythonY, position: 'absolute' }}
      >
        <motion.img 
          src={pythonIcon} 
          style={{ scale: pythonScale, opacity: pythonOpacity, rotate: pythonRotate }}
          className="w-14 h-14 object-contain filter drop-shadow-2xl" 
          alt="Python" 
        />
      </motion.div>
    </>
  );
};

// ────────────────────────────────────────────────────────────────────────
// MAIN ROUTING / GATEWAY COMPONENT
// Breakpoints:  mobile < 768  |  tablet 768–1024  |  desktop > 1024
// ────────────────────────────────────────────────────────────────────────
type ViewportTier = 'mobile' | 'tablet' | 'desktop';

const TechIconsOverlay: React.FC<TechIconsOverlayProps> = ({ isLoading = false }) => {
  const [tier, setTier] = useState<ViewportTier | null>(null);
  const shouldAnimate = !isLoading;

  useEffect(() => {
    const checkTier = () => {
      const w = window.innerWidth;
      if (w < 768) setTier('mobile');
      else if (w <= 1024) setTier('tablet');
      else setTier('desktop');
    };
    checkTier();
    window.addEventListener('resize', checkTier);
    return () => window.removeEventListener('resize', checkTier);
  }, []);

  if (tier === null) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 max-w-[1440px] mx-auto overflow-hidden px-margin-mobile md:px-margin-desktop">
      <div className="absolute inset-0 w-full h-screen">
        {tier === 'mobile' && <MobileTechIcons shouldAnimate={shouldAnimate} />}
        {tier === 'tablet' && <TabletTechIcons shouldAnimate={shouldAnimate} />}
        {tier === 'desktop' && <DesktopTechIcons shouldAnimate={shouldAnimate} />}
      </div>
    </div>
  );
};

export default TechIconsOverlay;
