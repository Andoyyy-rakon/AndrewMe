import React from 'react';
import { motion } from 'framer-motion';

import reactIcon from '../assets/images/LanguagesIcons/react-svgrepo-com.svg';
import jsIcon from '../assets/images/LanguagesIcons/javascript-svgrepo-com.svg';
import htmlIcon from '../assets/images/LanguagesIcons/html-5-svgrepo-com.svg';
import cssIcon from '../assets/images/LanguagesIcons/css-3-svgrepo-com.svg';
import tailwindIcon from '../assets/images/LanguagesIcons/tailwind-svgrepo-com.svg';
import nodeIcon from '../assets/images/LanguagesIcons/node-js-svgrepo-com.svg';
import expressIcon from '../assets/images/LanguagesIcons/express-svgrepo-com.svg';
import mongoIcon from '../assets/images/LanguagesIcons/mongo-svgrepo-com.svg';
import gitIcon from '../assets/images/LanguagesIcons/git-svgrepo-com.svg';
import githubIcon from '../assets/images/LanguagesIcons/github-svgrepo-com.svg';
import postmanIcon from '../assets/images/LanguagesIcons/postman-icon-svgrepo-com.svg';

const skillsData = [
  {
    category: "Frontend",
    items: [
      { 
        name: "React", 
        icon: <img src={reactIcon} className="w-5 h-5 object-contain" alt="React" />, 
        bgColor: "bg-[#d6effe]", 
        iconColor: "text-[#1a7abf]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "JavaScript", 
        icon: <img src={jsIcon} className="w-5 h-5 object-contain" alt="JavaScript" />, 
        bgColor: "bg-[#fef0d6]", 
        iconColor: "text-[#f7df1e]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "HTML5", 
        icon: <img src={htmlIcon} className="w-5 h-5 object-contain" alt="HTML5" />, 
        bgColor: "bg-[#ffdede]", 
        iconColor: "text-[#e34f26]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "CSS3", 
        icon: <img src={cssIcon} className="w-5 h-5 object-contain" alt="CSS3" />, 
        bgColor: "bg-[#d6effe]", 
        iconColor: "text-[#1572b6]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "Tailwind CSS", 
        icon: <img src={tailwindIcon} className="w-5 h-5 object-contain" alt="Tailwind CSS" />, 
        bgColor: "bg-[#ccf2fb]", 
        iconColor: "text-[#0e7490]",
        containerBg: "bg-surface-container-low"
      }
    ]
  },
  {
    category: "Backend",
    items: [
      { 
        name: "Node.js", 
        icon: <img src={nodeIcon} className="w-5 h-5 object-contain" alt="Node.js" />, 
        bgColor: "bg-[#d4f5d4]", 
        iconColor: "text-[#339933]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "Express.js", 
        icon: <img src={expressIcon} className="w-5 h-5 object-contain" alt="Express.js" />, 
        bgColor: "bg-[#e5e7eb]", 
        iconColor: "text-[#374151]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "MongoDB", 
        icon: <img src={mongoIcon} className="w-5 h-5 object-contain" alt="MongoDB" />, 
        bgColor: "bg-[#d4ecd4]", 
        iconColor: "text-[#2d7a2d]",
        containerBg: "bg-surface-container-low"
      }
    ]
  },
  {
    category: "Tools",
    items: [
      { 
        name: "Git", 
        icon: <img src={gitIcon} className="w-5 h-5 object-contain" alt="Git" />, 
        bgColor: "bg-[#ffe0d6]", 
        iconColor: "text-[#f05032]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "GitHub", 
        icon: <img src={githubIcon} className="w-5 h-5 object-contain" alt="GitHub" />, 
        bgColor: "bg-[#e5e7eb]", 
        iconColor: "text-[#181717]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "Postman", 
        icon: <img src={postmanIcon} className="w-5 h-5 object-contain" alt="Postman" />, 
        bgColor: "bg-[#ffe0d6]", 
        iconColor: "text-[#ff6c37]",
        containerBg: "bg-surface-container-low"
      }
    ]
  }
];

const SkillCard: React.FC<{
  name: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  containerBg: string;
  index: number;
}> = ({ name, icon, bgColor, iconColor, containerBg, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.06, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={`flex items-center gap-3 px-4 py-3 rounded-[0.85rem] border border-on-surface/5 dark:border-[#3a3a55]/20 ${containerBg} dark:bg-dark-surface-card hover:shadow-sm hover:scale-[1.02] active:scale-95 transition-all w-44 sm:w-48`}
  >
    <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg ${bgColor} ${iconColor}`}>
      {icon}
    </div>
    <span className="font-inter font-semibold text-sm text-on-surface dark:text-dark-on-surface whitespace-nowrap overflow-hidden text-ellipsis">
      {name}
    </span>
  </motion.div>
);

const Skills: React.FC = () => {
  return (
    <section 
      id="skills" 
      className="relative min-h-[50vh] bg-surface dark:bg-dark-surface net-box-grid transition-colors duration-500 py-16 md:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Section Heading with Watermark Background (matching ProjectSection design) */}
        <div className="relative mb-12 flex items-center justify-start py-8 select-none overflow-hidden">
          {/* Large watermark text */}
          <motion.span 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="dark:text-[#27272A] absolute left-[60px] sm:left-[80px] md:left-[100px] text-[70px] sm:text-[100px] md:text-[150px] font-plus-jakarta font-black uppercase tracking-tighter text-on-surface/[0.03] select-none pointer-events-none leading-none whitespace-nowrap"
          >
            SKILLS
          </motion.span>
          {/* Foreground heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-plus-jakarta font-extrabold text-primary tracking-tight"
          >
            Skills
          </motion.h2>
        </div>

        <div className="space-y-8">
          {skillsData.map((group, groupIndex) => (
            <motion.div 
              key={group.category} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: groupIndex * 0.1 }}
              className="space-y-6"
            >
              {/* Category Title */}
              <h3 className="text-xl sm:text-2xl font-plus-jakarta font-bold text-on-surface/80 dark:text-dark-on-surface/80 tracking-tight">
                {group.category}
              </h3>
              
              {/* Grid of Skill Cards */}
              <div className="flex flex-wrap gap-4 md:gap-5">
                {group.items.map((skill, index) => (
                  <SkillCard 
                    key={skill.name} 
                    {...skill} 
                    index={index} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
