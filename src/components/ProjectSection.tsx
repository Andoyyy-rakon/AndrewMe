import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Ligtaspage from '../assets/images/LigtasPicslides.png';
import Familylist from '../assets/images/Familylist.png';
import LigtasDemo from '../assets/images/LigtasVid.mp4';
import Alresgreenemojibg from '../assets/images/Alresgreenemoji-no-bg-no-bg.png';
import ALResDemo from '../assets/images/AlresVidd.mp4';
import Alearn1st from '../assets/images/Alearn1st.png';
import Alearn2nd from '../assets/images/Alearn2nd.png';
import AlearnVid from '../assets/images/Alearnvid.mp4';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  media: { type: string; src: string; alt: string; title: string }[];
  sliderBg: string;
}

const normalizeTechName = (name: string): string => {
  const lower = name.toLowerCase().trim();
  if (lower.startsWith('react')) return 'React.js';
  if (lower.startsWith('node')) return 'Node.js';
  if (lower.startsWith('express')) return 'Express.js';
  if (lower.startsWith('mongodb')) return 'MongoDB';
  if (lower.startsWith('websocket')) return 'WebSocket';
  if (lower.startsWith('tailwind')) return 'Tailwind CSS';
  if (lower === 'typescript') return 'TypeScript';
  if (lower.includes('rf') || lower.includes('gnss')) return 'RF / GNSS';
  return name;
};

/* Tech icon mapping */
const techConfig: Record<string, { icon: React.ReactNode; bg: string; text: string }> = {
  'React.js': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z"/></svg>,
    bg: 'bg-[#d6effe]',
    text: 'text-[#1a7abf]'
  },
  'Node.js': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.09-.21-.21-.21H8.22c-.12 0-.21.09-.21.21v8.06c0 .66-.68 1.31-1.77.76L4.16 16.2c-.07-.05-.12-.12-.12-.21V7.41c0-.09.05-.17.12-.21l7.44-4.3c.07-.04.16-.04.22 0l7.44 4.3c.07.04.12.12.12.21v8.58c0 .09-.05.17-.12.21l-7.44 4.3c-.06.04-.15.04-.22 0l-1.88-1.12c-.06-.03-.12-.04-.18-.01-.52.3-.62.34-1.12.51-.12.04-.31.11.07.32l2.48 1.47c.24.14.5.21.78.21s.54-.07.78-.21l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2z"/></svg>,
    bg: 'bg-[#d4f5d4]',
    text: 'text-[#3d7a3d]'
  },
  'Express.js': {
    icon: <span className="text-[10px] font-black tracking-tighter">ex</span>,
    bg: 'bg-[#d1f0e0]',
    text: 'text-[#2d6a4f]'
  },
  'MongoDB': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z"/></svg>,
    bg: 'bg-[#d4ecd4]',
    text: 'text-[#2d7a2d]'
  },
  'WebSocket': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M5.22 14.78a.75.75 0 001.06 0L12 9.06l5.72 5.72a.75.75 0 101.06-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 000 1.06z"/><path d="M3 4.5A1.5 1.5 0 014.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-15z" fillOpacity="0.15"/></svg>,
    bg: 'bg-[#dbeafe]',
    text: 'text-[#2563eb]'
  },
  'Tailwind CSS': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>,
    bg: 'bg-[#ccf2fb]',
    text: 'text-[#0e7490]'
  },
  'RF / GNSS': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
    bg: 'bg-[#ede5fb]',
    text: 'text-[#7c3aed]'
  },
  'TypeScript': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111v2.111c-.473-.074-1.015-.111-1.627-.111-1.259 0-2.167.315-2.722.944-.555.63-.833 1.574-.833 2.833V24h-2.111V9.75h2.111v1.111c.148-.37.407-.741.778-1.111s1.074-.759 2.111-.759zm-13.388 0c1.037 0 1.944.352 2.722 1.056L6.444 12.33c-.556-.481-1.074-.722-1.556-.722-.481 0-.889.185-1.222.556s-.5.852-.5 1.444c0 .593.167 1.074.5 1.444s.741.556 1.222.556c.481 0 1-.241 1.556-.722l1.389 1.528c-.778.704-1.685 1.056-2.722 1.056-1.185 0-2.185-.389-3-1.167S0 15.685 0 14.444c0-1.241.407-2.259 1.222-3.056s1.815-1.194 3-1.138z" transform="translate(4 4) scale(0.66)"/></svg>,
    bg: 'bg-[#e0f2fe]',
    text: 'text-[#0369a1]'
  },
  'Framer Motion': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 0H0v12h12L24 0zM0 12v12l12-12H0zM12 12v12h12L12 12z"/></svg>,
    bg: 'bg-[#fbe8f6]',
    text: 'text-[#d946ef]'
  },
  'Gemini AI': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z"/></svg>,
    bg: 'bg-[#ede9fe]',
    text: 'text-[#8b5cf6]'
  },
  'JWT Authentication': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>,
    bg: 'bg-[#fffbeb]',
    text: 'text-[#d97706]'
  },
  'Google OAuth': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.213 4.114-3.593 0-6.5-2.91-6.5-6.5s2.907-6.5 6.5-6.5c1.63 0 3.136.6 4.3 1.688l3.1-3.1C18.99 1.95 15.82 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.51 0 11.233-4.595 11.233-11.24 0-.682-.082-1.39-.233-2.075H12.24z"/></svg>,
    bg: 'bg-[#fef2f2]',
    text: 'text-[#ef4444]'
  },
  'Puppeteer': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-6.9 2.7l3 3c.6-.4 1.3-.7 1.9-.7a4 4 0 11-4 4c0-.6.3-1.3.7-1.9l-3-3A10 10 0 1012 2zm5 10a1 1 0 11-2 0 1 1 0 012 0z"/></svg>,
    bg: 'bg-[#ecfdf5]',
    text: 'text-[#10b981]'
  },
  'Mongoose': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4zm0 6c-3.87 0-7-1.12-7-2.5S8.13 4 12 4s7 1.12 7 2.5S15.87 9 12 9zm0 3c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4zm0 6c-3.87 0-7-1.12-7-2.5S8.13 13 12 13s7 1.12 7 2.5S15.87 18 12 18z"/></svg>,
    bg: 'bg-[#fff7ed]',
    text: 'text-[#ea580c]'
  }
};

const TechTag: React.FC<{ name: string }> = ({ name }) => {
  const norm = normalizeTechName(name);
  const config = techConfig[norm] || techConfig[name] || { icon: null, bg: 'bg-[#1e293b]', text: 'text-slate-300' };
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] md:text-[12px] font-semibold uppercase tracking-wider rounded-md ${config.bg} ${config.text}`}>
      {config.icon}
      {name}
    </span>
  );
};

const MediaSlider: React.FC<{ project: Project; currentSlide: number; setCurrentSlide: (i: number) => void }> = ({ project, currentSlide, setCurrentSlide }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className={`relative w-full max-w-lg ${project.sliderBg} rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm group mx-auto transition-colors duration-500`}>
      <div className="relative overflow-hidden aspect-[4/3] flex flex-col">
        <motion.div 
          ref={containerRef}
          drag="x"
          dragConstraints={{ 
            left: -((project.media.length - 1) * 100), 
            right: 0 
          }}
          dragElastic={0.1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipeThreshold = 50;
            if (Math.abs(velocity.x) > 300 || Math.abs(offset.x) > swipeThreshold) {
                if (offset.x < 0 && currentSlide < project.media.length - 1) {
                    setCurrentSlide(currentSlide + 1);
                } else if (offset.x > 0 && currentSlide > 0) {
                    setCurrentSlide(currentSlide - 1);
                }
            }
          }}
          className="flex absolute h-full w-full"
          animate={{ x: `-${currentSlide * 100}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 20, mass: 1 }}
          style={{ cursor: 'grab' }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {project.media.map((item, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 flex flex-col px-1">
              {/* Synchronized Title */}
              <div className="mb-4 h-8 md:h-10 flex items-center">
                <span className="text-base md:text-xl font-plus-jakarta font-bold text-on-surface leading-tight px-1">
                  {item.title}
                </span>
              </div>
              
              {/* Media */}
              <div className="flex-1 rounded-xl overflow-hidden flex items-center justify-center">
                {item.type === 'image' ? (
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-contain select-none pointer-events-none rounded-xl" 
                  />
                ) : (
                  <video 
                    src={item.src} 
                    className="w-full h-full object-fit pointer-events-none rounded-xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Slider Indicators */}
      <div className="mt-6 md:mt-8 flex justify-center gap-1.5">
        {project.media.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-700 ${
              currentSlide === i 
                ? 'w-6 bg-on-surface' 
                : 'w-1.5 bg-on-surface/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};


/* ================================================================
   PROJECT DETAIL CONTENT DATA
   ================================================================ */

interface ProjectDetail {
  overview: string;
  whyIBuiltThis: string;
  problem: string;
  problemBullets?: string[];
  solution: string;
  architecture: string[];
  techCategories: { category: string; items: string[] }[];
  features: string[];
  challenges: string;
  howISolvedThem: string;
  whatILearned: string[];
  futureImprovements: string[];
}

const projectDetails: Record<string, ProjectDetail> = {
  alres: {
    overview: 'ALRes is a full-stack AI-powered resume builder designed to help users create professional, ATS-friendly resumes with ease. The platform combines AI-assisted writing, grammar enhancement, personalized resume suggestions, and real-time editing into a single modern workspace. Users can securely manage their resumes, synchronize their work across devices, and export polished PDF documents ready for job applications.',
    whyIBuiltThis: 'Many job seekers struggle to create professional resumes, especially when writing summaries or describing work experience. Existing resume builders often focus only on templates and formatting while offering limited assistance with the actual writing process.\n\nI wanted to build a platform that not only creates resumes but also acts as an intelligent writing assistant capable of helping users write stronger, more professional resume content.',
    problem: 'Creating a resume involves much more than selecting a template. Users often struggle with:',
    problemBullets: [
      'Writing compelling professional summaries',
      'Describing work experience effectively',
      'Maintaining proper grammar and tone',
      'Producing ATS-friendly documents',
      'Managing resumes across multiple devices',
    ],
    solution: 'ALRes integrates multiple AI services into a single workflow that assists users throughout the resume creation process. The application provides intelligent content generation, writing enhancement, personalized suggestions, real-time previews, cloud synchronization, and PDF export while maintaining a clean and responsive user experience.',
    architecture: [
      'Frontend (React)',
      'REST API (Express.js)',
      'Authentication (JWT & Google OAuth)',
      'MongoDB Database',
      'Gemini AI & Groq AI Services',
      'Puppeteer PDF Generation',
    ],
    techCategories: [
      { category: 'Frontend', items: ['React', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB'] },
      { category: 'Services', items: ['Gemini AI', 'JWT Authentication', 'Google OAuth', 'Puppeteer'] },
    ],
    features: [
      'AI-generated resume content',
      'Grammar and writing enhancement',
      'Personalized resume suggestions',
      'ATS-friendly PDF export',
      'Real-time resume preview',
      'Google OAuth authentication',
      'Cloud Sync & Local Mode',
      'Responsive interface',
      'Multi-language support',
    ],
    challenges: 'One of the biggest challenges was integrating multiple AI providers while maintaining a consistent user experience. Another challenge involved generating professional PDF documents that preserved formatting across different resume layouts.',
    howISolvedThem: 'I designed modular backend services that separate AI providers from the application\'s business logic, making future integrations easier. For PDF generation, I used Puppeteer to render HTML templates into consistent ATS-friendly documents while optimizing layouts for different content lengths.',
    whatILearned: [
      'Designing scalable MERN applications',
      'Integrating multiple AI APIs',
      'Secure authentication using JWT and OAuth',
      'PDF generation with Puppeteer',
      'Structuring reusable React components',
      'Managing complex application state',
      'Building responsive user interfaces',
    ],
    futureImprovements: [
      'Resume scoring system',
      'AI interview preparation',
      'Multiple premium templates',
      'Resume version history',
      'Team collaboration',
      'Cover letter generation',
      'AI career recommendations',
    ],
  },
  ligtas: {
    overview: 'LIGTAS is a disaster communication and monitoring platform designed to operate even when traditional cellular networks are unavailable. By integrating RF and GNSS technologies, the system enables users to send distress alerts, transmit location data, and coordinate emergency response efforts through a centralized web dashboard.',
    whyIBuiltThis: 'Natural disasters frequently disrupt cellular infrastructure, leaving affected communities without reliable communication when it is needed most. I wanted to explore how alternative communication technologies could help maintain emergency coordination during these situations.',
    problem: 'Most emergency communication systems depend on mobile networks or internet connectivity. During disasters, these services can become unavailable, making it difficult for victims to request assistance and for responders to monitor affected areas.',
    solution: 'LIGTAS provides an alternative communication system that does not rely on cellular networks. Using RF for message transmission and GNSS for location tracking, the platform enables emergency communication and monitoring even when conventional infrastructure is unavailable.',
    architecture: [
      'RF Device + GNSS',
      'Receiver Station',
      'Node.js Backend',
      'MongoDB Database',
      'React Monitoring Dashboard',
    ],
    techCategories: [
      { category: 'Frontend', items: ['React', 'Tailwind CSS'] },
      { category: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB'] },
      { category: 'Communication', items: ['WebSocket', 'RF Module', 'GNSS'] },
    ],
    features: [
      'Emergency distress alerts',
      'Real-time location tracking',
      'Disaster monitoring dashboard',
      'Incident management',
      'Live communication updates',
      'WebSocket synchronization',
      'Responsive interface',
    ],
    challenges: 'The primary challenge was designing a communication system that remains functional even when cellular and internet connectivity are unavailable. Integrating hardware communication with a web-based monitoring platform also required careful synchronization between different technologies.',
    howISolvedThem: 'I implemented RF-based communication for message transmission and GNSS for accurate location tracking while using WebSockets to provide real-time updates on the monitoring dashboard. This architecture allowed emergency information to remain accessible through the centralized web interface without depending on traditional mobile networks.',
    whatILearned: [
      'Real-time communication systems',
      'Hardware and software integration',
      'WebSocket implementation',
      'Location-based applications',
      'Full-stack application architecture',
      'Team collaboration',
      'System design for disaster response',
    ],
    futureImprovements: [
      'Offline map support',
      'Mesh networking',
      'SMS gateway fallback',
      'Emergency broadcast system',
      'Incident analytics dashboard',
    ],
  },
  alearn: {
    overview: 'ALearn is a full-stack AI-powered learning platform that transforms study topics into interactive flashcards and quizzes. Instead of passively reading notes, students actively engage with AI-generated learning materials that improve understanding and long-term retention.',
    whyIBuiltThis: 'Students often spend significant time organizing notes before they can begin studying. I wanted to reduce that preparation time by allowing AI to generate structured study materials while still giving users the flexibility to customize their learning experience.',
    problem: 'Traditional studying is often repetitive and passive. Students struggle to:',
    problemBullets: [
      'Organize study materials',
      'Create effective flashcards',
      'Build quizzes manually',
      'Understand difficult concepts',
      'Stay engaged during study sessions',
    ],
    solution: 'ALearn automatically converts study topics into AI-generated flashcards and quizzes while providing explanations for incorrect answers. This creates a more interactive learning experience that encourages active recall and continuous improvement.',
    architecture: [
      'Frontend (React)',
      'REST API (Express.js)',
      'Google OAuth Authentication',
      'MongoDB Database',
      'Gemini AI',
    ],
    techCategories: [
      { category: 'Frontend', items: ['React 19', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose'] },
    ],
    features: [
      'AI-generated flashcards',
      'AI-generated quizzes',
      'AI explanations',
      'Personal study decks',
      'Google authentication',
      'Interactive flashcard animations',
      'Responsive UI',
      'Light & Dark mode',
    ],
    challenges: 'Generating consistent educational content required careful prompt engineering to produce accurate, well-balanced flashcards and quizzes. Another challenge was creating an engaging study interface without overwhelming users.',
    howISolvedThem: 'I refined AI prompts to improve content quality and designed a clean interface with smooth animations that keeps the focus on learning while making interactions intuitive and enjoyable.',
    whatILearned: [
      'AI prompt engineering',
      'Educational content generation',
      'Interactive UI design',
      'Authentication workflows',
      'REST API development',
      'Component architecture',
      'State management',
    ],
    futureImprovements: [
      'Spaced repetition algorithm',
      'Learning analytics dashboard',
      'Progress tracking',
      'Shared study decks',
      'Voice-based learning',
      'Mobile application',
    ],
  },
};

/* Accent color config per project */
const projectAccents: Record<string, { text: string; border: string; bg: string; bgLight: string }> = {
  alres:  { text: 'text-[#e11d48]', border: 'border-[#e11d48]', bg: 'bg-[#e11d48]', bgLight: 'bg-[#fff1f2]' },
  ligtas: { text: 'text-[#2563eb]', border: 'border-[#2563eb]', bg: 'bg-[#2563eb]', bgLight: 'bg-[#eff6ff]' },
  alearn: { text: 'text-[#7c3aed]', border: 'border-[#7c3aed]', bg: 'bg-[#7c3aed]', bgLight: 'bg-[#f5f3ff]' },
};


/* ================================================================
   EXPLORE CONTENT COMPONENT (inline expandable)
   ================================================================ */

interface InsightSectionProps {
  title: string;
  children: React.ReactNode;
  index: number;
}

const InsightSection: React.FC<InsightSectionProps> = ({ title, children, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    className="space-y-4"
  >
    <h4 className="text-xl sm:text-2xl font-plus-jakarta font-bold text-on-surface">
      {title}
    </h4>
    <div className="text-[15px] sm:text-base text-on-surface-variant leading-relaxed font-inter">
      {children}
    </div>
  </motion.div>
);

const ProjectExploreContent: React.FC<{
  project: Project;
  details: ProjectDetail;
  onCollapse: () => void;
}> = ({ project, details, onCollapse }) => {
  const accent = projectAccents[project.id] || projectAccents.alres;

  return (
    <div className="pt-12 pb-8 space-y-16 md:space-y-20">

      {/* ── Hero Title ── */}
      <div className="text-center space-y-2">
        <span className={`text-sm font-semibold uppercase tracking-[0.2em] ${accent.text} font-inter`}>Case Study</span>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-plus-jakarta font-extrabold tracking-tight ${accent.text}`}>
          {project.title}
        </h2>
      </div>

      {/* ── Hero Media ── */}
      <div className={`relative rounded-[1.5rem] md:rounded-[2rem] p-5 sm:p-8 md:p-10`}>
        <div className="aspect-video overflow-hidden">
          {project.media.find(m => m.type === 'video') ? (
            <video 
              src={project.media.find(m => m.type === 'video')?.src} 
              autoPlay loop muted playsInline
              className="w-full h-full object-contain " 
            />
          ) : (
            <img 
              src={project.media[0].src} 
              alt={project.media[0].alt} 
              className="w-full h-full object-contain" 
            />
          )}
        </div>
      </div>

      {/* ── Overview & Tech Stack (stacked) ── */}
      <div className="space-y-12">
        {/* Description */}
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-plus-jakarta font-bold text-on-surface">Description</h3>
          <p className="text-[15px] sm:text-base md:text-lg text-on-surface-variant leading-relaxed font-inter">
            {details.overview}
          </p>
        </div>

        {/* Tech Stack Grid (under description) */}
        <div className="space-y-5 pt-8 border-t border-on-surface/5">
          <h3 className="text-2xl sm:text-3xl font-plus-jakarta font-bold text-on-surface">Technologies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {details.techCategories.map((cat) => (
              <div key={cat.category} className="space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface/40 font-inter">{cat.category}</span>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <TechTag key={item} name={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INSIGHTS Section ── */}
      <div className="relative">
        {/* Section Divider with watermark */}
        <div className="relative mb-12 md:mb-16">
          {/* Large watermark text */}
          <span 
            className="absolute top-1/2 left-0 -translate-y-1/2 text-[60px] sm:text-[80px] md:text-[120px] font-plus-jakarta font-black uppercase tracking-tighter text-on-surface/[0.03] select-none pointer-events-none leading-none whitespace-nowrap"
          >
            INSIGHTS
          </span>
          {/* Foreground heading */}
          <div className="relative flex items-end gap-4">
            <span className={`text-5xl sm:text-6xl md:text-7xl font-plus-jakarta font-black ${accent.text} opacity-30 leading-none`}>01</span>
            <h3 className="text-3xl sm:text-4xl font-plus-jakarta font-bold text-on-surface italic leading-tight">Insights</h3>
          </div>
        </div>

        {/* Insight Content Sections */}
        <div className="space-y-12 md:space-y-16 max-w-3xl">
          
          <InsightSection title="Why I Built This" index={0}>
            {details.whyIBuiltThis.split('\n\n').map((p, i) => (
              <p key={i} className={i > 0 ? 'mt-4' : ''}>{p}</p>
            ))}
          </InsightSection>

          <InsightSection title="Problem" index={1}>
            <p>{details.problem}</p>
            {details.problemBullets && (
              <ul className="mt-4 space-y-2">
                {details.problemBullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.bg}`} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </InsightSection>

          <InsightSection title="Solution" index={2}>
            <p>{details.solution}</p>
          </InsightSection>

          {/* Architecture Flow */}
          <InsightSection title="Architecture" index={3}>
            <div className="flex flex-col items-start gap-0 pt-2">
              {details.architecture.map((step, i) => (
                <React.Fragment key={i}>
                  <div className={`px-5 py-3 rounded-xl border font-medium text-sm font-inter ${accent.bgLight} ${accent.border} border-opacity-30`}>
                    {step}
                  </div>
                  {i < details.architecture.length - 1 && (
                    <div className="ml-6 flex flex-col items-center">
                      <div className={`w-0.5 h-5 ${accent.bg} opacity-30`} />
                      <span className={`text-xs ${accent.text} opacity-60`}>↓</span>
                      <div className={`w-0.5 h-2 ${accent.bg} opacity-30`} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </InsightSection>

          {/* Features */}
          <InsightSection title="Features" index={4}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {details.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.bg}`} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </InsightSection>

          <InsightSection title="Challenges" index={5}>
            <p>{details.challenges}</p>
          </InsightSection>

          <InsightSection title="How I Solved Them" index={6}>
            <p>{details.howISolvedThem}</p>
          </InsightSection>

          <InsightSection title="What I Learned" index={7}>
            <ul className="space-y-2">
              {details.whatILearned.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.bg}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </InsightSection>

          <InsightSection title="Future Improvements" index={8}>
            <ul className="space-y-2">
              {details.futureImprovements.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.bg}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </InsightSection>
        </div>
      </div>

      {/* ── Collapse Button ── */}
      <div className="flex justify-center pt-4 pb-4">
        <button
          onClick={onCollapse}
          className={`group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl border-2 ${accent.border} ${accent.text} font-bold text-sm font-inter hover:shadow-lg active:scale-95 transition-all duration-300`}
        >
          <span>Show Less</span>
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-y-0.5 transition-transform">keyboard_arrow_up</span>
        </button>
      </div>
    </div>
  );
};


/* ================================================================
   PROJECT ITEM COMPONENT (with inline expandable explore)
   ================================================================ */

interface ProjectItemProps {
  project: Project;
  onInView: (id: string) => void;
  isExpanded: boolean;
  onToggleExplore: (id: string) => void;
  onCollapseExplore: (id: string) => void;
  currentSlide: number;
  setCurrentSlide: (i: number) => void;
  domRef?: React.Ref<HTMLDivElement>;
  exploreRef?: React.Ref<HTMLDivElement>;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onInView, isExpanded, onToggleExplore, onCollapseExplore, currentSlide, setCurrentSlide, domRef, exploreRef }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    margin: "-48% 0px -48% 0px" // Trigger only when almost perfectly centered
  });

  useEffect(() => {
    if (isInView) {
      onInView(project.id);
    }
  }, [isInView, project.id, onInView]);

  const details = projectDetails[project.id];

  return (
    <div 
      ref={(el) => {
        (ref as any).current = el;
        if (typeof domRef === 'function') {
          domRef(el);
        } else if (domRef && 'current' in domRef) {
          (domRef as any).current = el;
        }
      }} 
      className="min-h-screen flex flex-col justify-center py-12 md:py-24 border-b border-on-surface/5 lg:border-none"
    >
      <motion.div 
        initial={{ opacity: 0.2 }}
        animate={{ opacity: isInView ? 1 : 0.2 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <div>
            <span className="text-[10px] md:text-sm font-semibold uppercase tracking-[0.2em] text-primary/70 font-inter">Featured Project</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-plus-jakarta font-bold text-on-surface tracking-tight mt-2">
              {project.title}
            </h3>
          </div>
          <p className="text-[15px] sm:text-base md:text-lg text-on-surface-variant leading-relaxed font-inter opacity-90 max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Mobile Media Slider (Inline) */}
        <div className="lg:hidden w-full">
           <MediaSlider 
            project={project} 
            currentSlide={currentSlide} 
            setCurrentSlide={setCurrentSlide} 
          />
        </div>
        
        <div className="space-y-8 pt-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-on-surface/50 font-inter mb-4 block">Tech Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => <TechTag key={t} name={t} />)}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.id !== 'ligtas' && (
              <a href="#" className="flex-1 sm:flex-none text-center px-6 sm:px-8 py-3 bg-[#131b2e] text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm">
                Visit Site
              </a>
            )}
            <a href="#" className="flex-1 sm:flex-none text-center px-6 sm:px-8 py-3 border-2 border-on-surface/10 text-on-surface font-bold rounded-xl hover:bg-on-surface/5 active:scale-95 transition-all text-xs sm:text-sm">
              Code
            </a>
            <button 
              onClick={() => isExpanded ? onCollapseExplore(project.id) : onToggleExplore(project.id)}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 font-bold rounded-xl shadow-lg active:scale-95 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 ${
                isExpanded 
                  ? 'bg-on-surface/10 text-on-surface shadow-none' 
                  : 'bg-primary text-white hover:bg-primary-container'
              }`}
            >
              {isExpanded ? 'Close' : 'Explore'}
              <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                {isExpanded ? 'keyboard_arrow_up' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Inline Expandable Explore Content ── */}
      <AnimatePresence initial={false}>
        {isExpanded && details && (
          <motion.div
            ref={exploreRef as React.Ref<HTMLDivElement>}
            key={`explore-${project.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.2, delay: 0.05 }
            }}
            style={{ overflow: 'hidden' }}
          >
            <ProjectExploreContent 
              project={project} 
              details={details} 
              onCollapse={() => onCollapseExplore(project.id)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


/* ================================================================
   PROJECT SECTION (main)
   ================================================================ */

const ProjectSection: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState('alres');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  
  // Track DOM element references for each project card and its explore content
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const exploreRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Reset slide index when project changes to prevent image/sync bugs
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeProjectId]);

  // Expand: scroll to the explore content area after it opens
  const handleToggleExplore = useCallback((id: string) => {
    setExpandedProjectId(prev => {
      if (prev === id) return prev; // already open, do nothing
      return id;
    });
    // Wait for the expand animation to start, then scroll to explore content
    setTimeout(() => {
      const exploreEl = exploreRefs.current[id];
      if (exploreEl) {
        const rect = exploreEl.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 80;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }, 50); // minimal delay to let DOM update
  }, []);

  // Collapse: scroll back to the project card top
  const handleCollapseExplore = useCallback((id: string) => {
    setExpandedProjectId(null);
    setTimeout(() => {
      const targetEl = projectRefs.current[id];
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 80;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }, 100);
  }, []);
 
  const projects: Project[] = [
    {
      id: 'alres',
      title: 'ALRes | AI-Powered Resume Builder',
      description: 'Developed a full-stack resume builder that leverages AI to help users create professional, ATS-friendly resumes through content generation, writing enhancement, personalized suggestions, and real-time resume previews. The platform includes secure authentication, cloud synchronization, and PDF export functionality.',
      tech: ['React.js','Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      sliderBg: 'bg-[#ffe4e6]',
      media: [
        { type: 'image', src: Alresgreenemojibg, alt: 'ALRes Project Showcase', title: 'Main Dashboard & Landing' },
        { type: 'video', src: ALResDemo, alt: 'ALRes Demo Video', title: 'Feature Walkthrough' },
      ]
    },
    {
      id: 'ligtas',
      title: 'LIGTAS',
      description: 'Engineered a full-stack emergency communication and monitoring platform designed to operate in disaster-prone areas where cellular networks are unavailable. The system enables users to send real-time distress alerts, share location data, and coordinate emergency responses through RF and GNSS technologies, providing a reliable communication solution even without mobile signal or internet connectivity.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSocket', 'Tailwind CSS', 'RF / GNSS'],
      sliderBg: 'bg-[#dbeafe]',
      media: [
        { type: 'image', src: Ligtaspage, alt: 'LIGTAS Home Page', title: 'Main Dashboard' },
        { type: 'image', src: Familylist, alt: 'LIGTAS Family List', title: 'Family Census Records' },
        { type: 'video', src: LigtasDemo, alt: 'LIGTAS Demo Video', title: 'Interactive Demo' },
      ]
    },
    {
      id: 'alearn',
      title: 'ALearn | AI-Powered Study Platform',
      description: 'Built a full-stack AI-powered learning platform that transforms study topics into interactive flashcards and quizzes to promote active learning and long-term knowledge retention. The platform leverages AI to generate personalized study materials, provide detailed explanations, and deliver an engaging learning experience through a responsive and modern interface.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      sliderBg: 'bg-[#ede9fe]',
      media: [
        { type: 'image', src: Alearn1st, alt: 'ALearn Platform Preview', title: 'Interactive Learning' },
        { type: 'image', src: Alearn2nd, alt: 'ALearn Study Interface', title: 'Personalized Study' },
        { type: 'video', src: AlearnVid, alt: 'ALearn Demo Video', title: 'Platform Walkthrough' },
      ]
    }
  ];

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  return (
    <section 
      className=" border border-black relative bg-white transition-colors duration-500"
      id="projects"
    >
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
        
        {/* Section Heading with Watermark Background */}
        <div className="relative mb-12 md:mb-16 flex items-center justify-start py-8 select-none">
          {/* Large watermark text */}
          <span 
            className="absolute left-[60px] sm:left-[80px] md:left-[100px] text-[70px] sm:text-[100px] md:text-[150px] font-plus-jakarta font-black uppercase tracking-tighter text-on-surface/[0.03] select-none pointer-events-none leading-none whitespace-nowrap"
          >
            PROJECTS
          </span>
          {/* Foreground heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-plus-jakarta font-extrabold text-primary tracking-tight"
          >
            Projects
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative focus:outline-none">
          
          {/* Left Side: Scrollable Description Area */}
          <div className="space-y-0">
            {projects.map((project) => (
              <ProjectItem 
                key={project.id} 
                project={project} 
                onInView={setActiveProjectId}
                isExpanded={expandedProjectId === project.id}
                onToggleExplore={handleToggleExplore}
                onCollapseExplore={handleCollapseExplore}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                domRef={(el) => { projectRefs.current[project.id] = el; }}
                exploreRef={(el) => { exploreRefs.current[project.id] = el; }}
              />
            ))}
          </div>

          {/* Right Side: Sticky Media Slider Area (Desktop Only) */}
          <div className="hidden lg:block relative h-full">
            <div className="sticky top-0 h-screen flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeProjectId}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.16, 1, 0.3, 1] // Custom spring-like easing
                }}
                className="w-full"
              >
                <MediaSlider 
                  project={activeProject} 
                  currentSlide={currentSlide} 
                  setCurrentSlide={setCurrentSlide} 
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default ProjectSection;