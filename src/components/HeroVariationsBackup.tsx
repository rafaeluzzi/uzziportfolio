import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Code, Terminal, Database, Cloud, 
  Cpu, Blocks, Smartphone, Globe, Sparkles, 
  Rocket, Server, Layout, Layers, Wifi
} from 'lucide-react';
import gsap from 'gsap';

const HeroVariations = () => {
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
      {/* Variation 1: Full-Stack Developer Showcase */}
      <section id="home" className="min-h-screen relative flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/20 via-transparent to-dark-300/20"></div>
          <div className="absolute right-[15%] top-1/4 w-96 h-96 bg-secondary-600/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute left-[10%] bottom-1/3 w-96 h-96 bg-secondary-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-light-100">Hi, I’m Rafael.</span>
                 <br />
                <span className="text-gradient">A Full-Stack</span>
                <br />
                <span className="text-light-100">Software Engineer.</span>
              </motion.h1>
              
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-3">
                  <Code size={20} className="text-primary-400" />
                  <span className="text-light-300">React & Next.js Expert</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Server size={20} className="text-primary-400" />
                  <span className="text-light-300">Node.js Backend Developer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone size={20} className="text-primary-400" />
                  <span className="text-light-300">React Native Mobile Developer</span>
                </div>
              </motion.div>
              
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-medium inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </motion.div>

            <div className="relative">
              <motion.div
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { icon: Layout, label: "Web Apps" },
                  { icon: Smartphone, label: "Mobile Apps" },
                  { icon: Server, label: "Backend" },
                  { icon: Cloud, label: "Cloud" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="glass-card p-6 aspect-square flex flex-col items-center justify-center text-center"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                    }}
                  >
                    <item.icon size={40} className="text-primary-400 mb-4" />
                    <span className="text-light-100">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroVariations;