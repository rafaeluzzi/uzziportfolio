import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Code, Terminal, Database, Cloud, 
  Cpu, Blocks, Smartphone, Globe, Sparkles, 
  Rocket, Server, Layout, Layers, Wifi
} from 'lucide-react';
import gsap from 'gsap';

const HeroTests = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderCharacters = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="space-y-32 pb-32" ref={containerRef}>
      {/* Variation 2: Tech Stack Showcase */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20"></div>
          <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute left-1/4 bottom-1/4 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-gradient">Modern Tech Stack</span>
            </h1>
            <p className="text-xl text-light-300">Building scalable solutions with cutting-edge technologies</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Layout, label: "React", desc: "Frontend Development" },
              { icon: Blocks, label: "Next.js", desc: "SSR Applications" },
              { icon: Smartphone, label: "React Native", desc: "Mobile Apps" },
              { icon: Server, label: "Node.js", desc: "Backend Services" },
              { icon: Database, label: "MongoDB", desc: "Database" },
              { icon: Cloud, label: "AWS", desc: "Cloud Infrastructure" },
              { icon: Wifi, label: "REST & GraphQL", desc: "API Development" },
              { icon: Layers, label: "Docker", desc: "Containerization" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                }}
              >
                <tech.icon size={40} className="text-primary-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{tech.label}</h3>
                <p className="text-light-300 text-sm">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Variation 3: Interactive Project Showcase */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20"></div>
          <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute left-1/4 bottom-1/4 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-bold mb-6">
                <motion.span
                  className="block text-gradient"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  Full-Stack
                </motion.span>
                <span className="block text-light-100">Developer</span>
              </h1>
              
              <motion.div
                className="space-y-6 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="glass-card p-4 hover:bg-primary-500/10 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">Web Development</h3>
                  <p className="text-light-300">Creating responsive and performant web applications</p>
                </div>
                
                <div className="glass-card p-4 hover:bg-primary-500/10 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">Mobile Development</h3>
                  <p className="text-light-300">Building cross-platform mobile experiences</p>
                </div>
                
                <div className="glass-card p-4 hover:bg-primary-500/10 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
                  <p className="text-light-300">Designing scalable server architectures</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative h-[500px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {[Code, Cloud, Database, Terminal, Smartphone, Globe].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute glass-card p-6"
                    style={{
                      transform: `rotateY(${index * 60}deg) translateZ(200px)`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon size={60} className="text-primary-400" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Variation 4: Skills Timeline */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20"></div>
          <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute left-1/4 bottom-1/4 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold text-center mb-16">
              <span className="text-gradient">Development</span>
              <br />
              <span className="text-light-100">Journey</span>
            </h1>

            <div className="space-y-8">
              {[
                { year: "2023", title: "Full-Stack Developer", tech: "React, Node.js, React Native" },
                { year: "2022", title: "Frontend Specialist", tech: "Next.js, TypeScript" },
                { year: "2021", title: "Mobile Developer", tech: "React Native, iOS, Android" },
                { year: "2020", title: "Backend Developer", tech: "Node.js, Express, MongoDB" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 flex items-center gap-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="text-2xl font-bold text-primary-400">{item.year}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-light-300">{item.tech}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroTests;