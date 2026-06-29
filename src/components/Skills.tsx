import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "Frontend",
    items: [
      { 
        name: "React", 
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z"/></svg>, 
        bgColor: "bg-[#d6effe]", 
        iconColor: "text-[#1a7abf]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "JavaScript", 
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>, 
        bgColor: "bg-[#fef0d6]", 
        iconColor: "text-[#f7df1e]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "HTML5", 
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.56L11.93 24l-8.65-2.43L1.5 0zm7.09 9.87L8.28 5.33h-4.5L5 19.17l6.93 1.92 6.93-1.92 1.22-13.84h-4.5l-.31 3.54H8.59z M8.9 12.41h3.03l-.2 2.33-2.83.78v2.61l5.18-1.44.72-8.13H8.59l.31 3.85z"/></svg>, 
        bgColor: "bg-[#ffdede]", 
        iconColor: "text-[#e34f26]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "CSS3", 
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.56L11.93 24l-8.65-2.43L1.5 0zm17.09 4.49H5.65l.27 3.03h12.32l-.73 8.13-5.58 1.55-5.53-1.55-.38-4.27h2.97l.2 2.2 2.76.75 2.74-.75.29-3.2H5.35L4.64 4.49h14.95z"/></svg>, 
        bgColor: "bg-[#d6effe]", 
        iconColor: "text-[#1572b6]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "Tailwind CSS", 
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>, 
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
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 00.272 0l8.795-5.076a.277.277 0 00.134-.238V6.921a.28.28 0 00-.137-.242L12.135 1.6a.27.27 0 00-.27 0L3.072 6.68a.28.28 0 00-.139.24v10.15a.27.27 0 00.138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675A1.857 1.857 0 011.36 17.07V6.921c0-.645.344-1.248.92-1.572l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.577.324.922.927.922 1.572v10.15c0 .645-.345 1.245-.922 1.57l-8.795 5.082c-.28.163-.6.247-.924.247z"/></svg>, 
        bgColor: "bg-[#d4f5d4]", 
        iconColor: "text-[#339933]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "Express.js", 
        icon: <span className="text-[14px] font-black tracking-tighter leading-none">ex</span>, 
        bgColor: "bg-[#e5e7eb]", 
        iconColor: "text-[#374151]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "MongoDB", 
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z"/></svg>, 
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
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.645-.222 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.72.719-1.886.719-2.604 0-.538-.536-.67-1.32-.4-1.978l-2.48-2.48v6.53c.175.087.34.202.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.18-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>, 
        bgColor: "bg-[#ffe0d6]", 
        iconColor: "text-[#f05032]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "GitHub", 
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>, 
        bgColor: "bg-[#e5e7eb]", 
        iconColor: "text-[#181717]",
        containerBg: "bg-surface-container-low"
      },
      { 
        name: "Postman", 
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 01-.593.25.856.856 0 01-.604-.247l-4.44 4.44a.722.722 0 01-.003.264l-2.37 2.37a.858.858 0 01-1.213 0 .858.858 0 010-1.213l2.37-2.37a.716.716 0 01.263-.003l4.44-4.44a.857.857 0 01.247-.605.855.855 0 011.213 0 .855.855 0 01-.31 1.554zm5.49 4.25c-.483 3.77-3.76 6.434-7.529 5.952-3.77-.483-6.434-3.76-5.952-7.53.483-3.77 3.76-6.434 7.53-5.951 3.77.483 6.434 3.76 5.95 7.53z"/></svg>, 
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
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
    className={`flex items-center gap-3 px-4 py-3 rounded-[0.85rem] border border-on-surface/5 ${containerBg} hover:shadow-sm hover:scale-[1.02] active:scale-95 transition-all w-44 sm:w-48`}
  >
    <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg ${bgColor} ${iconColor}`}>
      {icon}
    </div>
    <span className="font-inter font-semibold text-sm text-on-surface whitespace-nowrap overflow-hidden text-ellipsis">
      {name}
    </span>
  </motion.div>
);

const Skills: React.FC = () => {
  return (
    <section 
      id="skills" 
      className="relative min-h-[50vh] bg-surface net-box-grid transition-colors duration-500 py-16 md:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Section Heading with Watermark Background (matching ProjectSection design) */}
        <div className="relative mb-12 flex items-center justify-start py-8 select-none">
          {/* Large watermark text */}
          <span 
            className="absolute left-[60px] sm:left-[80px] md:left-[100px] text-[70px] sm:text-[100px] md:text-[150px] font-plus-jakarta font-black uppercase tracking-tighter text-on-surface/[0.03] select-none pointer-events-none leading-none whitespace-nowrap"
          >
            SKILLS
          </span>
          {/* Foreground heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-plus-jakarta font-extrabold text-primary tracking-tight"
          >
            Skills
          </motion.h2>
        </div>

        <div className="space-y-8">
          {skillsData.map((group, groupIdx) => (
            <div key={group.category} className="space-y-6">
              {/* Category Title */}
              <h3 className="text-xl sm:text-2xl font-plus-jakarta font-bold text-on-surface/80 tracking-tight">
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
