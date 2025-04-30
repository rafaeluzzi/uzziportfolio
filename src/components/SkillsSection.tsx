import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

interface Skill {
  name: string;
  level: number;
  color: string;
}

const SkillsSection = () => {
  const controls = useAnimation();
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    if (!bubbleRef.current || !inView) return;

    const bubbles = bubbleRef.current.querySelectorAll('.skill-bubble');
    
    gsap.to(bubbles, {
      duration: 1,
      scale: 1,
      opacity: 1,
      stagger: 0.1,
      ease: "elastic.out(1, 0.5)",
    });

    // Random floating animation for bubbles
    bubbles.forEach((bubble) => {
      gsap.to(bubble, {
        y: gsap.utils.random(-15, 15),
        x: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 2),
      });
    });

  }, [inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const frontendSkills: Skill[] = [
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'Vue.js', level: 80, color: '#4FC08D' },
    { name: 'Angular', level: 70, color: '#DD0031' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'Next.js', level: 85, color: '#000000' },
    { name: 'HTML5', level: 95, color: '#E34F26' },
    { name: 'CSS3', level: 90, color: '#1572B6' },
    { name: 'Tailwind', level: 90, color: '#38B2AC' },
    { name: 'GSAP', level: 80, color: '#88CE02' },
  ];

  const backendSkills: Skill[] = [
    { name: 'Node.js', level: 90, color: '#339933' },
    { name: 'Express', level: 85, color: '#000000' },
    { name: 'Python', level: 75, color: '#3776AB' },
    { name: 'Django', level: 70, color: '#092E20' },
    { name: 'MongoDB', level: 80, color: '#47A248' },
    { name: 'PostgreSQL', level: 85, color: '#336791' },
    { name: 'GraphQL', level: 80, color: '#E10098' },
    { name: 'Docker', level: 75, color: '#2496ED' },
    { name: 'AWS', level: 70, color: '#FF9900' },
  ];

  const mobileSkills: Skill[] = [
    { name: 'React Native', level: 90, color: '#61DAFB' },
    { name: 'Swift', level: 70, color: '#FA7343' },
    { name: 'Kotlin', level: 65, color: '#7F52FF' },
    { name: 'Flutter', level: 75, color: '#02569B' },
  ];

  const allSkills = [...frontendSkills, ...backendSkills, ...mobileSkills];

  const getSize = (level: number) => {
    // Map the level (0-100) to a size range (40-100)
    return 40 + (level * 0.6);
  };

  return (
    <section id="skills" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full dots-bg opacity-30"></div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-primary-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/3 w-80 h-80 bg-secondary-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.span 
            className="text-sm uppercase font-medium text-primary-400 tracking-wider"
            variants={itemVariants}
          >
            My Expertise
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-gradient"
            variants={itemVariants}
          >
            Technical Skills
          </motion.h2>
          <motion.p 
            className="text-lg text-light-300 leading-relaxed"
            variants={itemVariants}
          >
            I've developed expertise across the entire development stack, from creating
            captivating user interfaces to building robust backend systems and deploying
            to production environments.
          </motion.p>
        </motion.div>

        <div className="mb-16">
          <div ref={bubbleRef} className="relative h-[400px] sm:h-[500px]">
            {allSkills.map((skill, index) => {
              const size = getSize(skill.level);
              // Random positions within the container
              const top = Math.random() * 70 + 10; // 10-80%
              const left = Math.random() * 80 + 10; // 10-90%

              return (
                <div
                  key={index}
                  className="skill-bubble absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full cursor-pointer opacity-0 scale-0"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: `${skill.color}20`,
                    border: `2px solid ${skill.color}40`,
                    zIndex: Math.floor(skill.level / 10),
                  }}
                >
                  <span className="text-xs sm:text-sm font-medium" style={{ color: skill.color }}>
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.3 }}
          >
            <motion.h3 
              className="text-2xl font-semibold mb-6 text-primary-400"
              variants={itemVariants}
            >
              Frontend
            </motion.h3>
            <div className="space-y-4">
              {frontendSkills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="w-full"
                  variants={itemVariants}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-light-300">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.5 }}
          >
            <motion.h3 
              className="text-2xl font-semibold mb-6 text-secondary-400"
              variants={itemVariants}
            >
              Backend
            </motion.h3>
            <div className="space-y-4">
              {backendSkills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="w-full"
                  variants={itemVariants}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-light-300">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.7 }}
          >
            <motion.h3 
              className="text-2xl font-semibold mb-6 text-accent-400"
              variants={itemVariants}
            >
              Mobile
            </motion.h3>
            <div className="space-y-4">
              {mobileSkills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="w-full"
                  variants={itemVariants}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-light-300">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;