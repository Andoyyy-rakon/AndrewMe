import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Ligtaspage from '../assets/images/LigtasThumbnail.jpeg';
import ZoqelleThumbnail from '../assets/images/ZoqelleThumbnail.jpg';
import ALResThumbnailNew from '../assets/images/ALResThumbnailNew.jpeg';
import ALearnThumbnailNew from '../assets/images/ALearnThumbnailNew.jpg';


import reactIcon from '../assets/images/LanguagesIcons/react-svgrepo-com.svg';
import nodeIcon from '../assets/images/LanguagesIcons/node-js-svgrepo-com.svg';
import expressIcon from '../assets/images/LanguagesIcons/express-svgrepo-com.svg';
import mongoIcon from '../assets/images/LanguagesIcons/mongo-svgrepo-com.svg';
import tailwindIcon from '../assets/images/LanguagesIcons/tailwind-svgrepo-com.svg';
import supabaseIcon from '../assets/images/LanguagesIcons/supabase-icon.svg';
import postgresqlIcon from '../assets/images/LanguagesIcons/postgresql-svgrepo-com.svg';
import typescriptIcon from '../assets/images/LanguagesIcons/typescript-icon-svgrepo-com.svg';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  media: { type: string; src: string; alt: string; title: string }[];
  sliderBg: string;
  visitLink?: string;
  codeLink?: string;
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
  if (lower.startsWith('supabase')) return 'Supabase';
  if (lower.startsWith('postgres')) return 'PostgreSQL';
  if (lower.includes('rf') || lower.includes('gnss')) return 'RF / GNSS';
  return name;
};

/* Tech icon mapping */
const techConfig: Record<string, { icon: React.ReactNode; bg: string; text: string }> = {
  'React.js': {
    icon: <img src={reactIcon} className="w-3.5 h-3.5 object-contain" alt="React.js" />,
    bg: 'bg-[#d6effe]',
    text: 'text-[#1a7abf]'
  },
  'Node.js': {
    icon: <img src={nodeIcon} className="w-3.5 h-3.5 object-contain" alt="Node.js" />,
    bg: 'bg-[#d4f5d4]',
    text: 'text-[#3d7a3d]'
  },
  'Express.js': {
    icon: <img src={expressIcon} className="w-3.5 h-3.5 object-contain" alt="Express.js" />,
    bg: 'bg-[#d1f0e0]',
    text: 'text-[#2d6a4f]'
  },
  'MongoDB': {
    icon: <img src={mongoIcon} className="w-3.5 h-3.5 object-contain" alt="MongoDB" />,
    bg: 'bg-[#d4ecd4]',
    text: 'text-[#2d7a2d]'
  },
  'WebSocket': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M5.22 14.78a.75.75 0 001.06 0L12 9.06l5.72 5.72a.75.75 0 101.06-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 000 1.06z"/><path d="M3 4.5A1.5 1.5 0 014.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-15z" fillOpacity="0.15"/></svg>,
    bg: 'bg-[#dbeafe]',
    text: 'text-[#2563eb]'
  },
  'Tailwind CSS': {
    icon: <img src={tailwindIcon} className="w-3.5 h-3.5 object-contain" alt="Tailwind CSS" />,
    bg: 'bg-[#ccf2fb]',
    text: 'text-[#0e7490]'
  },
  'Supabase': {
    icon: <img src={supabaseIcon} className="w-3.5 h-3.5 object-contain" alt="Supabase" />,
    bg: 'bg-[#d4f5e9]',
    text: 'text-[#3ecf8e]'
  },
  'PostgreSQL': {
    icon: <img src={postgresqlIcon} className="w-3.5 h-3.5 object-contain" alt="PostgreSQL" />,
    bg: 'bg-[#dce8f5]',
    text: 'text-[#336791]'
  },
  'RF / GNSS': {
    icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
    bg: 'bg-[#ede5fb]',
    text: 'text-[#7c3aed]'
  },
  'TypeScript': {
    icon: <img src={typescriptIcon} className="w-3.5 h-3.5 object-contain" alt="TypeScript" />,
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

const MediaSlider: React.FC<{ project: Project; currentSlide?: number; setCurrentSlide?: (i: number) => void }> = ({ project }) => {
  const mainMedia = project.media[0];

  return (
    <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-md mx-auto group border border-on-surface/10 dark:border-dark-on-surface-variant/20 transition-all duration-500">
      <img 
        src={mainMedia?.src} 
        alt={mainMedia?.alt} 
        className="w-full h-full object-cover select-none pointer-events-none rounded-2xl transition-transform duration-500 group-hover:scale-105" 
      />
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
      'Gemini AI & Groq Llama 3.1 8B Instant',
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
  zoqelle: {
    overview: 'Zoqelle is a full-stack, modern e-commerce web platform designed for a luxury boutique cake bakery. Built with an editorial aesthetic, high-craft typography, and a warm color palette, Zoqelle provides a premium shopping experience for customers and a full-featured management dashboard for store administrators.',
    whyIBuiltThis: 'Many small artisanal bakeries lack sophisticated digital storefronts that match the craftsmanship of their products. Existing e-commerce solutions often feel generic and fail to convey the luxury and care behind handcrafted cakes.\n\nI wanted to build a platform that bridges artisanal baking with a state-of-the-art digital storefront, providing both a premium customer shopping experience and a powerful admin management dashboard.',
    problem: 'Building a full e-commerce platform for a boutique bakery involves several challenges:',
    problemBullets: [
      'Creating a luxury editorial aesthetic that reflects artisanal craftsmanship',
      'Implementing real-time stock management and order lifecycle tracking',
      'Building secure role-based authentication for customers and administrators',
      'Designing a seamless checkout flow with address pre-filling and shipping calculation',
      'Managing two separate applications (storefront and admin) with a shared backend',
    ],
    solution: 'Zoqelle integrates Supabase as a Backend-as-a-Service for authentication, PostgreSQL database, and storage, while providing two polished React + TypeScript applications: a customer-facing storefront with editorial design and an admin dashboard for complete store management.',
    architecture: [
      'Customer Storefront (React + TypeScript)',
      'Admin Dashboard (React + TypeScript)',
      'Supabase Authentication (Email/Password + Google OAuth)',
      'PostgreSQL Database (Products, Orders, Profiles)',
      'Supabase Storage (Product Images)',
      'Row Level Security (RLS Policies)',
    ],
    techCategories: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { category: 'Backend', items: ['Supabase', 'PostgreSQL'] },
      { category: 'Services', items: ['Google OAuth'] },
    ],
    features: [
      'Editorial shop with category filtering',
      'Smart cart with free shipping tracker',
      'Real-time stock validation',
      'Order lifecycle tracking',
      'Role-based admin protection',
      'Product catalog management',
      'Revenue analytics dashboard',
      'Responsive luxury aesthetic',
      'Google OAuth authentication',
    ],
    challenges: 'One of the biggest challenges was managing two separate React applications (customer storefront and admin dashboard) that share the same Supabase backend while maintaining strict role-based access control. Another challenge was designing a consistent luxury aesthetic across both applications.',
    howISolvedThem: 'I implemented granular Row Level Security policies in Supabase to ensure customers only access their own data while admins have storewide permissions. For design consistency, I created a shared Tailwind CSS design system with custom typography (Fraunces, Playfair Display, Inter) and a warm color palette that both applications reference.',
    whatILearned: [
      'Supabase backend architecture',
      'PostgreSQL database design',
      'Row Level Security implementation',
      'TypeScript full-stack development',
      'Multi-application project management',
      'E-commerce checkout flows',
      'Editorial UI/UX design',
      'Role-based access control',
    ],
    futureImprovements: [
      'Payment gateway integration',
      'Customer review system',
      'Advanced analytics dashboard',
      'Email order notifications',
      'Wishlist functionality',
      'Custom cake order builder',
    ],
  },
};

/* Accent color config per project (Zoqelle soft luxury pastel rose theme) */
// const projectAccents: Record<string, { text: string; border: string; bg: string; bgLight: string }> = {
//   zoqelle: { text: 'text-[#9e3a53]', border: 'border-[#e8b4c0]', bg: 'bg-[#9e3a53]', bgLight: 'bg-[#fcf0f3]' },
//   alres:  { text: 'text-[#e11d48]', border: 'border-[#e11d48]', bg: 'bg-[#e11d48]', bgLight: 'bg-[#fff1f2]' },
//   ligtas: { text: 'text-[#2563eb]', border: 'border-[#2563eb]', bg: 'bg-[#2563eb]', bgLight: 'bg-[#eff6ff]' },
//   alearn: { text: 'text-[#7c3aed]', border: 'border-[#7c3aed]', bg: 'bg-[#7c3aed]', bgLight: 'bg-[#f5f3ff]' },
// };

const projectAccents: Record<
  string,
  { text: string; border: string; bg: string; bgLight: string }
> = {
  zoqelle: {
    text: 'text-[#7A2946]',
    border: 'border-[#C98A9F]',
    bg: 'bg-[#7A2946]',
    bgLight: 'bg-[#F8EEF2]',
  },

  alres: {
    text: 'text-[#2563A6]',
    border: 'border-[#8EB5D9]',
    bg: 'bg-[#2563A6]',
    bgLight: 'bg-[#EEF5FB]',
  },

  ligtas: {
    text: 'text-[#C76A2B]',
    border: 'border-[#E6AE82]',
    bg: 'bg-[#C76A2B]',
    bgLight: 'bg-[#FFF4EB]',
  },

  alearn: {
    text: 'text-[#A67C32]',
    border: 'border-[#D9BD7A]',
    bg: 'bg-[#A67C32]',
    bgLight: 'bg-[#FBF6E9]',
  },
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
    <h4 className="text-xl sm:text-2xl font-plus-jakarta font-bold text-on-surface dark:text-dark-on-surface">
      {title}
    </h4>
    <div className="text-[15px] sm:text-base text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed font-inter">
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

      {/* ── Hero Media (Photo Showcase) ── */}
      <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-md border border-on-surface/10 dark:border-dark-on-surface-variant/20">
        <div className="aspect-video overflow-hidden flex items-center justify-center">
          <img 
            src={project.media[0]?.src} 
            alt={project.media[0]?.alt} 
            className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2rem]" 
          />
        </div>
      </div>

      {/* ── Overview & Tech Stack (stacked) ── */}
      <div className="space-y-12">
        {/* Description */}
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-plus-jakarta font-bold text-on-surface dark:text-dark-on-surface">Description</h3>
          <p className="text-[15px] sm:text-base md:text-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed font-inter">
            {details.overview}
          </p>
        </div>

        {/* Tech Stack Grid (under description) */}
        <div className="space-y-5 pt-8 border-t border-on-surface/5 dark:border-[#3a3a55]/20">
          <h3 className="text-2xl sm:text-3xl font-plus-jakarta font-bold text-on-surface dark:text-dark-on-surface">Technologies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {details.techCategories.map((cat) => (
              <div key={cat.category} className="space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface/40 dark:text-dark-on-surface-variant font-inter">{cat.category}</span>
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
        <div className="relative mb-12 md:mb-16 overflow-hidden dark:overflow-visible">
          {/* Large watermark text */}
          <span 
            className="dark:text-[#27272A] absolute top-1/2 left-0 -translate-y-1/2 text-[60px] sm:text-[80px] md:text-[120px] font-plus-jakarta font-black uppercase tracking-tighter text-on-surface/[0.03] select-none pointer-events-none leading-none whitespace-nowrap"
          >
            INSIGHTS
          </span>
          {/* Foreground heading */}
          <div className="relative flex items-end gap-4">
            <span className={`text-5xl sm:text-6xl md:text-7xl font-plus-jakarta font-black ${accent.text} opacity-30 leading-none`}>01</span>
            <h3 className="text-3xl sm:text-4xl font-plus-jakarta font-bold text-on-surface dark:text-dark-on-surface italic leading-tight">Insights</h3>
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
                  <div className={`px-5 py-3 rounded-xl border font-medium text-sm font-inter ${accent.bgLight} ${accent.border} border-opacity-30 dark:bg-dark-surface-card dark:text-dark-on-surface`}>
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
      className="min-h-screen flex flex-col justify-center py-12 md:py-24 border-b border-on-surface/5 dark:border-[#3a3a55]/20 lg:border-none"
    >
      <motion.div 
        initial={{ opacity: 0.2 }}
        animate={{ opacity: isInView ? 1 : 0.2 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <div>
            {/* <span className="text-[10px] md:text-sm font-semibold uppercase tracking-[0.2em] text-primary/70 font-inter">Featured Project</span> */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-plus-jakarta font-bold text-on-surface dark:text-dark-on-surface tracking-tight mt-2">
              {project.title}
            </h3>
          </div>
          <p className="text-[15px] sm:text-base md:text-lg text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed font-inter opacity-90 max-w-2xl">
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
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-on-surface/50 dark:text-dark-on-surface-variant font-inter mb-4 block">Tech Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => <TechTag key={t} name={t} />)}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.visitLink && (
              <a 
                href={project.visitLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 sm:flex-none text-center px-6 sm:px-8 py-3 bg-[#131b2e] dark:bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm"
              >
                Visit Site
              </a>
            )}
            {project.codeLink && (
              <a 
                href={project.codeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 sm:flex-none text-center px-6 sm:px-8 py-3 border-2 border-on-surface/10 dark:border-dark-on-surface-variant/20 text-on-surface dark:text-dark-on-surface font-bold rounded-xl hover:bg-on-surface/5 dark:hover:bg-dark-on-surface-variant/10 active:scale-95 transition-all text-xs sm:text-sm"
              >
                Code
              </a>
            )}
            <button 
              onClick={() => isExpanded ? onCollapseExplore(project.id) : onToggleExplore(project.id)}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 font-bold rounded-xl shadow-lg active:scale-95 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 ${
                  isExpanded 
                    ? 'bg-on-surface/10 dark:bg-dark-on-surface-variant/15 text-on-surface dark:text-dark-on-surface shadow-none' 
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
  const [activeProjectId, setActiveProjectId] = useState('zoqelle');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);


  //ang gin panas koni nga slider 
  // const MediaSlider: React.FC<{ project: Project; currentSlide?: number; setCurrentSlide?: (i: number) => void }> = ({ project, currentSlide = 0 }) => {
  // // const containerRef = useRef<HTMLDivElement>(null);
  // const parentRef = useRef<HTMLDivElement>(null);
  // const [width, setWidth] = useState(0);
  // const controls = useAnimation();

  // useEffect(() => {
  //   if (parentRef.current) {
  //     setWidth(parentRef.current.offsetWidth);
  //   }
  //   const handleResize = () => {
  //     if (parentRef.current) {
  //       setWidth(parentRef.current.offsetWidth);
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // useEffect(() => {
  //   if (width > 0) {
  //     controls.start({ x: -currentSlide * width });
  //   }
  // }, [currentSlide, width, controls]);
  
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
 //color
  const projects: Project[] = [
    {
      id: 'zoqelle',
      title: 'Zoqelle | Luxury Artisanal Bakery E-Commerce',
      description: 'Built a full-stack luxury e-commerce platform for an artisanal bakery featuring a premium customer storefront and a comprehensive admin dashboard. The platform includes editorial shop browsing, smart cart with shipping tracking, order lifecycle management, catalog control, and revenue analytics — all powered by Supabase with PostgreSQL and Row Level Security.',
      tech: ['React.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
      sliderBg: 'bg-[#fbf0f2]',
      media: [
        { type: 'image', src: ZoqelleThumbnail, alt: 'Zoqelle Storefront Preview', title: 'Customer Storefront' },
      ],
      visitLink: 'https://zoqelle.vercel.app/',
      codeLink: 'https://github.com/Andoyyy-rakon/Zoqelle'
    },
    {
      id: 'alres',
      title: 'ALRes | AI-Powered Resume Builder',
      description: 'Developed a full-stack resume builder that leverages AI to help users create professional, ATS-friendly resumes through content generation, writing enhancement, personalized suggestions, and real-time resume previews. The platform includes secure authentication, cloud synchronization, and PDF export functionality.',
      tech: ['React.js','Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      sliderBg: 'bg-[#ffe4e6]',
      media: [
        { type: 'image', src: ALResThumbnailNew, alt: 'ALRes Project Showcase', title: 'Main Dashboard & Landing' },
      ],
      visitLink: 'https://alres-one.vercel.app/',
      codeLink: 'https://github.com/Andoyyy-rakon/ALRes'
    },
    {
      id: 'ligtas',
      title: 'LIGTAS',
      description: 'Engineered a full-stack emergency communication and monitoring platform designed to operate in disaster-prone areas where cellular networks are unavailable. The system enables users to send real-time distress alerts, share location data, and coordinate emergency responses through RF and GNSS technologies, providing a reliable communication solution even without mobile signal or internet connectivity.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSocket', 'Tailwind CSS', 'RF / GNSS'],
      sliderBg: 'bg-[#dbeafe]',
      media: [
        { type: 'image', src: Ligtaspage, alt: 'LIGTAS Home Page', title: 'Main Dashboard' },
      ],
      codeLink: 'https://github.com/Andoyyy-rakon/LIGTAS-DASHBOARD'
    },
    {
      id: 'alearn',
      title: 'ALearn | AI-Powered Study Platform',
      description: 'Built a full-stack AI-powered learning platform that transforms study topics into interactive flashcards and quizzes to promote active learning and long-term knowledge retention. The platform leverages AI to generate personalized study materials, provide detailed explanations, and deliver an engaging learning experience through a responsive and modern interface.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      sliderBg: 'bg-[#ede9fe]', 
      media: [
        { type: 'image', src: ALearnThumbnailNew, alt: 'ALearn Platform Preview', title: 'Interactive Learning' },
      ],
      visitLink: 'https://a-learn.vercel.app/',
      codeLink: 'https://github.com/Andoyyy-rakon/ALearn'
    }
  ];

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  return (
    <section 
      className=" border border-black dark:border-[#3a3a55] relative bg-white dark:bg-dark-surface transition-colors duration-500"
      id="projects"
    >
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
        
        {/* Section Heading with Watermark Background */}
        <div className="relative mb-12 md:mb-16 flex items-center justify-start py-8 select-none overflow-hidden">
          {/* Large watermark text */}
          <motion.span 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="dark:text-[#27272A] absolute left-[60px] sm:left-[80px] md:left-[100px] text-[70px] sm:text-[100px] md:text-[150px] font-plus-jakarta font-black uppercase tracking-tighter text-on-surface/[0.03] select-none pointer-events-none leading-none whitespace-nowrap"
          >
            PROJECTS
          </motion.span>
          {/* Foreground heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
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