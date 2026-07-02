import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description?: string[];
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, subtitle, date, location, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative pl-10 pb-12 group"
    >
      {/* Timeline Line Track */}
      <div className="absolute left-[4.5px] top-[14px] bottom-0 w-[2px] bg-on-surface/10 dark:bg-dark-on-surface-variant/20 overflow-hidden">
        {/* Dynamic Bouncing Pulse */}
        <motion.div 
          initial={{ top: "-40px" }}
          animate={{ 
            top: ["-40px", "100%", "-40px"] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'linear-gradient(to bottom, transparent, #4648d4, transparent)',
          }}
          className="absolute left-0 w-full h-10 pointer-events-none"
        />
      </div>
      
      {/* Timeline Dot (Solid black) */}
      <div className="absolute left-0 top-[6px]  w-[11px] h-[11px] rounded-full bg-[#131b2e] dark:bg-dark-on-surface-variant z-10 transition-transform duration-300 "></div>

      <div className="space-y-1">
        <h3 className="font-plus-jakarta text-[20px] md:text-[24px] font-bold text-on-surface dark:text-dark-on-surface leading-tight">
          {title}
        </h3>
        
        <div className="space-y-0.5">
          <h4 className="font-plus-jakarta text-[16px] md:text-[18px] font-semibold text-primary">
            {subtitle}
          </h4>
          <div className="flex flex-col gap-0.5 text-[14px] font-inter text-on-surface-variant/70 dark:text-dark-on-surface-variant/70">
            <span>{date}</span>
            <span>{location}</span>
          </div>
        </div>

        {description && (
          <ul className="space-y-2 mt-4">
            {description.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-2 text-on-surface-variant dark:text-dark-on-surface-variant text-[15px] leading-relaxed font-inter"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#131b2e] dark:bg-dark-on-surface-variant mt-2 shrink-0"></div>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

const ExpEduc: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const sectionRef = useRef<HTMLElement>(null);

  const experienceData = [
    {
      title: "OJT Trainee (Full-Stack Development)",
      subtitle: "IReply Back Office Services, Inc.",
      date: "February 2026 – April 2026",
      location: "Philippines",
      description: [
        "Collaborated in project planning and requirement gathering.",
        "Designed and implemented front-end using React and Tailwind CSS.",
        "Developed and integrated backend services and APIs using Node.js and Express.",
        "Managed and optimized databases for performance and reliability.",
        "Implemented secure user authentication and authorization.",
        "Facilitated continuous integration and deployment (CI/CD) pipelines.",
        "Deployed and managed applications on Raspberry Pi for edge computing solutions.",
        "Conducted comprehensive testing and debugging to ensure high software quality."
      ]
    }
  ];

  const educationData = [
    {
      title: "Bachelor of Science in Computer Engineering",
      subtitle: "Carlos Hilado Memorial State University, Bacolod City",
      date: "2022 - 2026",
      location: "Philippines"
    },
    // {
    //   title: "Senior High School",
    //   subtitle: "Gil Montilla National High School, Sipalay City",
    //   date: "2020 - 2022",
    //   location: "Philippines"
    // },
    // {
    //   title: "Junior High School",
    //   subtitle: "Gil Montilla National High School",
    //   date: "2016 - 2020",
    //   location: "Philippines"
    // },
    // {
    //   title: "Elementary Education",
    //   subtitle: "Barangay 5 Elementary School",
    //   date: "2010 - 2016",
    //   location: "Philippines"
    // }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 net-box-grid transition-colors duration-500" 
    >
      <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-surface/90 dark:bg-dark-surface-card/90 backdrop-blur-md border border-on-surface/5 dark:border-[#3a3a55]/20 rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-2xl relative"
        >
          <div className="text-center mb-10 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-plus-jakarta font-bold text-on-surface dark:text-dark-on-surface mb-4 md:mb-6 tracking-tight"
            >
              My Journey
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-on-surface-variant dark:text-dark-on-surface-variant font-inter italic opacity-80 max-w-2xl mx-auto"
            >
              From student to aspiring full-stack developer.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col items-center mb-10"
          >
            <div className="inline-flex items-center p-1 bg-on-surface/5 dark:bg-dark-on-surface-variant/10 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-on-surface/5 dark:border-[#3a3a55]/20">
               <button
                onClick={() => setActiveTab('experience')}
                className={`px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-plus-jakarta font-bold text-[13px] sm:text-[15px] transition-all duration-300 relative ${
                  activeTab === 'experience' 
                    ? 'text-white' 
                    : 'text-on-surface-variant dark:text-dark-on-surface-variant hover:text-on-surface dark:hover:text-dark-on-surface'
                }`}
              >
                {activeTab === 'experience' && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#131b2e] dark:bg-primary rounded-lg sm:rounded-xl shadow-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                Experience
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-plus-jakarta font-bold text-[13px] sm:text-[15px] transition-all duration-300 relative ${
                  activeTab === 'education' 
                    ? 'text-white' 
                    : 'text-on-surface-variant dark:text-dark-on-surface-variant hover:text-on-surface dark:hover:text-dark-on-surface'
                }`}
              >
                {activeTab === 'education' && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#131b2e] rounded-lg sm:rounded-xl shadow-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                Education
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto overflow-hidden"
            initial={false}
            animate={{ height: "auto" }}
            transition={{ 
              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3 }
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {activeTab === 'experience' ? (
                  <div className="space-y-2">
                    {experienceData.map((item, index) => (
                      <TimelineItem 
                        key={index}
                        {...item}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {educationData.map((item, index) => (
                      <TimelineItem 
                        key={index}
                        {...item}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpEduc;