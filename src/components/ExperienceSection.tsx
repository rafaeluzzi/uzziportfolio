import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Award, Users, Code, Monitor, Database } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: number;
  year: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface Achievement {
  title: string;
  value: string;
  icon: React.ReactNode;
  suffix: string;
}

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (!countersRef.current || !isInView) return;

    const counters = countersRef.current.querySelectorAll('.counter-value');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent || '0', 10);
      const duration = 2;
      
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function() {
            counter.textContent = Math.ceil(this.targets()[0].innerText).toString();
          },
        }
      );
    });
  }, [isInView]);

  const experiences: Experience[] = [
    {
      id: 1,
      year: "2022 - Present",
      role: "Senior Full-stack Developer",
      company: "TechInnovate Solutions",
      description: "Leading full-stack development for enterprise clients, architecting scalable solutions, and mentoring junior developers.",
      achievements: [
        "Redesigned the company's flagship product, improving performance by 40%",
        "Led migration from monolith to microservices architecture",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Mentored 5 junior developers, improving team velocity"
      ],
      technologies: ["React", "Node.js", "GraphQL", "AWS", "Docker", "Kubernetes"]
    },
    {
      id: 2,
      year: "2020 - 2022",
      role: "Mobile App Developer",
      company: "AppWave Technologies",
      description: "Developed cross-platform mobile applications for iOS and Android using React Native, focusing on performance and user experience.",
      achievements: [
        "Developed 3 major apps with over 500K combined downloads",
        "Reduced app loading time by 35% through code optimization",
        "Implemented real-time features using WebSockets and Firebase",
        "Created a reusable component library used across multiple projects"
      ],
      technologies: ["React Native", "TypeScript", "Redux", "Firebase", "Jest"]
    },
    {
      id: 3,
      year: "2018 - 2020",
      role: "Frontend Developer",
      company: "Digital Creations Co.",
      description: "Built responsive web applications with focus on accessibility and modern UI/UX practices.",
      achievements: [
        "Collaborated with UX team to implement design system using Styled Components",
        "Improved page load speed by 50% through code splitting and lazy loading",
        "Led migration from AngularJS to React, resulting in improved developer productivity",
        "Introduced unit testing, achieving 80% code coverage"
      ],
      technologies: ["React", "Angular", "SCSS", "Jest", "Webpack", "Storybook"]
    },
    {
      id: 4,
      year: "2016 - 2018",
      role: "Junior Web Developer",
      company: "WebSolutions Inc.",
      description: "Assisted in developing and maintaining client websites and applications, focusing on frontend implementations.",
      achievements: [
        "Participated in development of 10+ client websites",
        "Implemented responsive designs ensuring cross-browser compatibility",
        "Created interactive UI components and animations",
        "Assisted in migrating legacy code to modern frameworks"
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "jQuery", "PHP", "WordPress"]
    }
  ];

  const achievements: Achievement[] = [
    {
      title: "Years Experience",
      value: "8",
      icon: <Calendar size={24} />,
      suffix: "+"
    },
    {
      title: "Projects Completed",
      value: "50",
      icon: <Monitor size={24} />,
      suffix: "+"
    },
    {
      title: "Satisfied Clients",
      value: "30",
      icon: <Users size={24} />,
      suffix: "+"
    },
    {
      title: "Technologies Mastered",
      value: "25",
      icon: <Code size={24} />,
      suffix: "+"
    }
  ];

  return (
    <section id="experience" className="py-20 lg:py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0">
        
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute left-1/4 bottom-1/4 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-sm uppercase font-medium text-primary-400 tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My Journey
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-gradient"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Work Experience
          </motion.h2>
          <motion.p 
            className="text-lg text-light-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            My professional journey across different companies and roles,
            showcasing growth and expertise gained over the years.
          </motion.p>
        </motion.div>

        <div 
          ref={countersRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {achievements.map((item, index) => (
            <motion.div 
              key={index} 
              className="glass-card p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex justify-center mb-3 text-primary-400">
                {item.icon}
              </div>
              <div className="text-3xl font-bold mb-1">
                <span className="counter-value">{item.value}</span>{item.suffix}
              </div>
              <div className="text-sm text-light-300">{item.title}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className="glass-card p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ x: 10 }}
            >
              <div className="flex items-center gap-6">
                <div className="text-2xl font-bold text-primary-400">{experience.year}</div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{experience.role}</h3>
                  <p className="text-primary-400">{experience.company}</p>
                </div>
              </div>
              
              <p className="text-light-300 mt-4">{experience.description}</p>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Key Achievements:</h4>
                <ul className="list-disc pl-5 text-light-300 text-sm space-y-1">
                  {experience.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.technologies.map((tech, i) => (
                  <span 
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-primary-500/10 text-primary-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;