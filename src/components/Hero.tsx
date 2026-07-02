import React, { useEffect, useState } from 'react';
import { Mail, FileText } from 'lucide-react';
import andrewPhoto from '../assets/images/andrew-photo.png';
import linkedinIcon from '../assets/icons/linkedin.png';

import { motion, type Variants, AnimatePresence } from 'framer-motion';

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
  title?: string;
  tooltipColor?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ href, icon, label, className, title, tooltipColor = "bg-primary" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.8 }}
            animate={{ opacity: 1, y: -50, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute left-1/2 px-3 py-1.5 ${tooltipColor} text-surface text-[12px] font-bold rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-50`}
          >
            {label}
            {/* Tooltip Arrow */}
            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${tooltipColor} rotate-45`}></div>
          </motion.div>
        )}
      </AnimatePresence>
      <a
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`transition-all duration-300 hover:scale-125 active:scale-95 ${className}`}
        title={title}
        target={href.startsWith('http') || href.endsWith('.pdf') ? "_blank" : undefined}
        rel={href.startsWith('http') || href.endsWith('.pdf') ? "noopener noreferrer" : undefined}
      >
        {icon}
      </a>
    </div>
  );
};

interface HeroProps {
  isLoading?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isLoading = false }) => {
  const [, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth cascade entrance — only triggers after preloader ends
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4,
      }
    }
  };

  const slideLeftInVariants: Variants = {
    hidden: { opacity: 0, x: -300, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, x: 300, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }
    }
  };

  const shouldAnimate = !isLoading;

  return (
    <main id="hero" className="relative min-h-[calc(100vh-72px)] net-box-grid overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        className="max-w-[1440px] mx-auto px-margin-mobile pt-10 pb-20 flex flex-col md:flex-row md:items-center md:px-margin-desktop md:pt-10 gap-12"
      >
        {/* Left Column: Identity */}
        <div className="flex-1 z-10 space-y-6 text-center md:text-left">
          <div className="space-y-4">
            <motion.div variants={slideLeftInVariants} className="flex items-center justify-center md:justify-start gap-1.5 text-on-surface-variant/70 dark:text-dark-on-surface-variant/70">
              <span className="material-symbols-outlined text-[16px] leading-none">location_on</span>
              <span className="font-geist-mono text-[13px] md:text-[14px] leading-none">Sipalay City Negros Occidental Philippines</span>
            </motion.div>
            <motion.h1 variants={slideLeftInVariants} className="font-plus-jakarta text-[42px] sm:text-[56px] md:text-[72px] font-extrabold text-primary leading-[1.1] tracking-tighter">
              Andrew Lloyd E. Polidario
            </motion.h1>
            <motion.p variants={slideLeftInVariants} className="font-plus-jakarta text-[24px] sm:text-[32px] md:text-[40px] text-on-surface dark:text-dark-on-surface font-bold">
              Full-Stack Developer
            </motion.p>
            <motion.div variants={slideLeftInVariants} className="w-16 h-1 bg-primary rounded-full mx-auto md:mx-0"></motion.div>
          </div>
          <motion.p variants={slideLeftInVariants} className="text-on-surface-variant dark:text-dark-on-surface-variant max-w-md mx-auto md:mx-0 leading-relaxed text-[16px] md:text-[18px]">
            I am a passionate web developer dedicated to building modern, responsive, and user-friendly web applications. I continuously expand my knowledge and skills to create impactful digital solutions that deliver exceptional user experiences. 
          </motion.p>
          
          {/* Actions */}
          <motion.div variants={slideLeftInVariants} className="flex items-center justify-center md:justify-start gap-6 md:gap-8 pt-6">
            <SocialButton 
              href="https://www.linkedin.com/in/andrew-lloyd-polidario" 
              icon={<img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8 md:w-10 md:h-10 object-contain" />} 
              label="LinkedIn"
              title="LinkedIn"
              tooltipColor="bg-blue-600"
            />
            <SocialButton 
              href="https://github.com/Andoyyy-rakon" 
              icon={<svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>} 
              label="GitHub"
              title="GitHub"
              className="text-[#181717] dark:text-dark-on-surface"
              tooltipColor="bg-zinc-900"
            />
            <SocialButton 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=polidarioandrewlloyd@gmail.com&su=Job Opportunity" 
              icon={<Mail className="w-8 h-8 md:w-10 md:h-10" />} 
              label="Gmail"
              title="Gmail"
              className="text-red-600"
              tooltipColor="bg-red-600"
            />
            <SocialButton 
              href="/PolidarioAndrewLloydResume.pdf" 
              icon={<FileText className="w-8 h-8 md:w-10 md:h-10" />} 
              label="Resume"
              title="Resume"
              className="text-[#E91E63]"
              tooltipColor="bg-pink-600"
            />
          </motion.div>
        </div>

        {/* Right Column: Visual Hero */}
        <motion.div 
          variants={imageVariants}
          className="flex-1 relative min-h-[350px] sm:min-h-[450px] flex items-center justify-center md:min-h-[600px]"
        >
          {/* Background Glowing Orbs */}
          {/* <div 
            className="absolute top-12  -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-primary/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse-glow"
            style={{ transform: `translate(calc(-50% + ${mousePos.x * 0.5}px), calc(-50% + ${mousePos.y * 0.5}px))` }}
          ></div>
          <div 
            className="absolute top-12 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 bg-secondary/20 rounded-full blur-[60px] md:blur-[80px] animate-pulse-glow"
            style={{ 
              animationDelay: '1.5s',
              transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))` 
            }}
          ></div> */}

          {/* Hero Image Container */}
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[450px] z-10 group flex items-center justify-center">
            {/* Main Portrait */}
            <div className="relative z-20 w-full drop-shadow-2xl transition-all duration-700 grayscale hover:grayscale-0">
              <img src={andrewPhoto} alt="Andrew Lloyd E. Polidario" className="w-full h-auto object-cover rounded-2xl" />
            </div>

            {/* Orbiting Icons - REMOVED, now in TechIconsOverlay */}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Hero;
