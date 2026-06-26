import React, { useRef, useState, useEffect } from 'react';
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
  }
};

const TechTag: React.FC<{ name: string }> = ({ name }) => {
  const config = techConfig[name] || { icon: null, bg: 'bg-[#1e293b]', text: 'text-slate-300' };
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

interface ProjectItemProps {
  project: Project;
  onInView: (id: string) => void;
  onExplore: (id: string) => void;
  currentSlide: number;
  setCurrentSlide: (i: number) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onInView, onExplore, currentSlide, setCurrentSlide }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    margin: "-48% 0px -48% 0px" // Trigger only when almost perfectly centered
  });

  useEffect(() => {
    if (isInView) {
      onInView(project.id);
    }
  }, [isInView, project.id, onInView]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col justify-center py-12 md:py-24 border-b border-on-surface/5 lg:border-none">
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
            <a href="#" className="flex-1 sm:flex-none text-center px-6 sm:px-8 py-3 bg-[#131b2e] text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm">
              Visit Site
            </a>
            <a href="#" className="flex-1 sm:flex-none text-center px-6 sm:px-8 py-3 border-2 border-on-surface/10 text-on-surface font-bold rounded-xl hover:bg-on-surface/5 active:scale-95 transition-all text-xs sm:text-sm">
              Code
            </a>
            <button 
              onClick={() => onExplore(project.id)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-container active:scale-95 transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              Explore
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectSection: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState('alres');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  // Reset slide index when project changes to prevent image/sync bugs
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeProjectId]);
 
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
      className="relative bg-white transition-colors duration-500"
      id="projects"
    >
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
        
        {/* Centered Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-plus-jakarta font-extrabold text-on-surface tracking-tighter"
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
                onExplore={() => setIsExploreOpen(true)}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
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

      {/* Explore Modal (Full Screen) */}
      <AnimatePresence>
        {isExploreOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-surface flex flex-col overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 w-full flex justify-between items-center p-6 bg-surface/80 backdrop-blur-md">
               <h2 className="text-xl font-plus-jakarta font-extrabold text-on-surface">{activeProject.title} Project</h2>
               <button 
                onClick={() => setIsExploreOpen(false)}
                className="p-3 rounded-full hover:bg-on-surface/5 transition-all text-on-surface"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            
            <div className="max-w-5xl mx-auto space-y-12 md:space-y-16 p-8 md:p-12 pt-0 pb-24">
              <div className={`relative ${activeProject.sliderBg} rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-2xl`}>
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  {/* Dynamic media logic based on active project's first video or main image */}
                  {activeProject.media.find(m => m.type === 'video') ? (
                    <video 
                      src={activeProject.media.find(m => m.type === 'video')?.src} 
                      autoPlay 
                      loop 
                      muted 
                      className="w-full h-full object-contain" 
                    />
                  ) : (
                    <img 
                      src={activeProject.media[0].src} 
                      alt={activeProject.media[0].alt} 
                      className="w-full h-full object-contain" 
                    />
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                <div className="md:col-span-2 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold font-plus-jakarta">Core Objective</h3>
                    <p className="text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed font-inter">
                      {activeProject.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold font-plus-jakarta">The Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tech.map(t => <TechTag key={t} name={t} />)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;
