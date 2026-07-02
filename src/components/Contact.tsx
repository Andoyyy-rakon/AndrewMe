import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import logo from '../assets/images/logo.png';

const Connect: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('polidarioandrewlloyd@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  };

  const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <>
      {/* ─── Connect Section ─── */}
      <section
        id="connect"
        className="relative z-20 bg-white dark:bg-dark-surface transition-colors duration-500 py-20 md:py-32"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px] mx-auto px-margin-mobile md:px-margin-desktop text-center"
        >

          {/* Heading */}
          <motion.h2
            variants={slideUpVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-plus-jakarta font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight mb-6"
          >
            Let's Connect
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={slideUpVariants}
            className="text-base sm:text-lg text-on-surface-variant dark:text-dark-on-surface-variant font-inter leading-relaxed mb-10"
          >
            I'm currently seeking opportunities as a Frontend Developer or Full-Stack Developer.
            If you think I'd be a great fit for your team, I'd love to hear from you.
          </motion.p>

          {/* Email with Copy Button */}
          <motion.div
            variants={slideUpVariants}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <span className="text-sm sm:text-base font-inter font-semibold text-on-surface dark:text-dark-on-surface">
              polidarioandrewlloyd@gmail.com
            </span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary/10 text-primary text-xs font-inter font-bold uppercase tracking-wider hover:bg-primary hover:text-white active:scale-95 transition-all duration-200"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            variants={slideUpVariants}
            className="flex items-center justify-center gap-4"
          >
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/andrew-lloyd-polidario"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-[#0077B5]/10 dark:bg-[#0077B5]/20 flex items-center justify-center text-[#0077B5] hover:bg-[#0077B5] hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Andoyyy-rakon"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-[#181717]/10 dark:bg-[#e8e8f0]/10 flex items-center justify-center text-[#181717] dark:text-dark-on-surface hover:bg-[#181717] dark:hover:bg-[#e8e8f0] hover:text-white dark:hover:text-dark-surface hover:scale-110 active:scale-95 transition-all duration-200"
              title="GitHub"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>

            {/* View Resume */}
            <a
              href="/PolidarioAndrewLloydResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-on-surface/5 dark:bg-dark-on-surface-variant/10 text-on-surface dark:text-dark-on-surface hover:bg-on-surface hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
              title="View Resume"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <span className="text-xs font-inter font-bold uppercase tracking-wider">View Resume</span>
            </a>
          </motion.div>

        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      {/* <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-20 bg-white border-t border-black py-6"
      > */}
      <div className='relative z-20 bg-white dark:bg-dark-surface border-t border-black dark:border-[#3a3a55] py-6'>
        <div className="max-w-[1440px] bg-white dark:bg-dark-surface mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-center gap-2">
          <span className="text-sm font-inter text-on-surface-variant dark:text-dark-on-surface-variant">
            Designed & Built by Andrew
          </span>
          <img src={logo} alt="Andrew Logo" className="h-5 w-auto object-contain" />
        </div>
      </div>
      {/* </motion.footer> */}
    </>
  );
};

export default Connect;
