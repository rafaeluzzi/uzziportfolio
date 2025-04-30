import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">
          <motion.button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-primary-500/10 text-primary-400 mb-6 hover:bg-primary-500/20 transition-colors"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
          
          <motion.a 
            href="#home" 
            className="text-2xl font-bold text-gradient mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Rafael 'Uzzi' Cruz
          </motion.a>
          
          <div className="flex space-x-8 mb-6">
            <a href="#home" className="text-light-300 hover:text-primary-400 transition-colors">Home</a>
            <a href="#about" className="text-light-300 hover:text-primary-400 transition-colors">About</a>
            <a href="#projects" className="text-light-300 hover:text-primary-400 transition-colors">Projects</a>
            <a href="#experience" className="text-light-300 hover:text-primary-400 transition-colors">Experience</a>
            <a href="#contact" className="text-light-300 hover:text-primary-400 transition-colors">Contact</a>
          </div>
          
          <div className="text-light-300 text-sm">
            &copy; {currentYear} Rafael 'Uzzi' Cruz. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;