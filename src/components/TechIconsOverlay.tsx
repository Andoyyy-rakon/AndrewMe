import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

import jsIcon from '../assets/icons/javascript.png';
import javaIcon from '../assets/icons/java.png';
import cppIcon from '../assets/icons/c-plus-plus.png';
import pythonIcon from '../assets/icons/python.png';

const TechIconsOverlay: React.FC = () => {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const range: [number, number] = [0, 900];

  /**
   * HERO CENTER POINT: Roughly 75% width (right column)
   * EDUCATION CENTER CARD: 50% width
   * LEFT SIDEBAR: ~10% width
   * RIGHT SIDEBAR: ~90% width
   */

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

  return (
    <div className="fixed inset-0 pointer-events-none z-0 max-w-[1440px] mx-auto overflow-hidden px-margin-mobile md:px-margin-desktop">
      {/* Container is now full width for better coordinate mapping */}
      <div className="absolute inset-0 w-full h-screen">
        <motion.img 
          src={jsIcon} 
          style={{ left: jsX, top: jsY, scale: jsScale, opacity: jsOpacity, rotate: jsRotate }}
          className="absolute w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-2xl" 
          alt="" 
        />
        <motion.img 
          src={javaIcon} 
          style={{ left: javaX, top: javaY, scale: javaScale, opacity: javaOpacity, rotate: javaRotate }}
          className="absolute w-24 h-24 md:w-28 md:h-28 object-contain filter drop-shadow-2xl" 
          alt="" 
        />
        <motion.img 
          src={cppIcon} 
          style={{ left: cppX, top: cppY, scale: cppScale, opacity: cppOpacity, rotate: cppRotate }}
          className="absolute w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-2xl" 
          alt="" 
        />
        <motion.img 
          src={pythonIcon} 
          style={{ left: pythonX, top: pythonY, scale: pythonScale, opacity: pythonOpacity, rotate: pythonRotate }}
          className="absolute w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-2xl" 
          alt="" 
        />
      </div>
    </div>
  );
};

export default TechIconsOverlay;
