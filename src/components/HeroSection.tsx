import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Code, Laptop, Database, Smartphone } from 'lucide-react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;
    
    const tl = gsap.timeline({ delay: 3.5 });
    
    tl.from(titleRef.current.querySelectorAll('.char'), {
      opacity: 0,
      y: 20,
      rotateX: -90,
      stagger: 0.03,
      duration: 0.5,
      ease: 'back.out'
    });
    
    tl.from(subtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.2');
    
  }, []);

  const renderCharacters = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="home" className="relative min-h-screen pt-16 overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 dots-bg"></div>
      
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute left-1/4 top-1/3 w-72 h-72 bg-primary-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/3 w-80 h-80 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Floating Icons Background */}
      <motion.div 
        className="absolute top-20 left-20 text-primary-500/20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Code size={50} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-32 left-1/4 text-secondary-500/20"
        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Database size={60} />
      </motion.div>
      
      <motion.div 
        className="absolute top-40 right-1/4 text-accent-500/20"
        animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Laptop size={70} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-32 text-primary-500/20"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Smartphone size={40} />
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="block mb-2 text-gradient">
              {renderCharacters("Rafael 'Uzzi' Cruz")}
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl text-light-100">
              {renderCharacters("Full-Stack Developer & Mobile Apps Engineer")}
            </span>
          </motion.h1>
          
          <motion.p 
            ref={subtitleRef}
            className="text-xl text-light-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 0.8 }}
          >
            Crafting immersive digital experiences with cutting-edge technologies.
            From web applications to mobile solutions, I build software that matters.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <motion.a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-medium flex items-center justify-center group"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.8, duration: 0.5 }}
            >
              View Projects
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-3 border border-primary-500 text-primary-400 rounded-full font-medium hover:bg-primary-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5, duration: 0.5 }}
            >
              Contact Me
            </motion.a>
          </div>
        </div>
      </div>
      
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-light-300 hover:text-primary-400 transition-colors flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          delay: 5.5, 
          duration: 0.6,
          y: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.1
          }
        }}
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <ChevronDown size={20} />
      </motion.a>
    </section>
  );
};

export default HeroSection;