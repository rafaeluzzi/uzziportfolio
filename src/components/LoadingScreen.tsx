import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Braces, Laptop, Smartphone } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 bg-dark-300 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { 
          duration: 0.8,
          ease: "easeInOut"
        }
      }}
    >
      <motion.div 
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center justify-center mb-10">
          <motion.div 
            className="absolute"
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-32 h-32 rounded-full border-4 border-secondary-500 border-opacity-20"></div>
          </motion.div>
          
          <motion.div 
            className="absolute"
            animate={{ 
              rotate: -360,
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-40 h-40 rounded-full border-4 border-primary-500 border-opacity-10"></div>
          </motion.div>
          
          {/* Icons */}
          <motion.div 
            className="absolute top-0 text-primary-400"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Code size={24} />
          </motion.div>
          
          <motion.div 
            className="absolute right-0 text-secondary-400"
            animate={{ 
              x: [0, 8, 0],
            }}
            transition={{ 
              duration: 2,
              delay: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Braces size={24} />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-0 text-accent-400"
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{ 
              duration: 2,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Laptop size={24} />
          </motion.div>
          
          <motion.div 
            className="absolute left-0 text-primary-300"
            animate={{ 
              x: [0, -8, 0],
            }}
            transition={{ 
              duration: 2,
              delay: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Smartphone size={24} />
          </motion.div>
          
          <div className="text-4xl font-semibold glass-card px-6 py-3 text-gradient">JD</div>
        </div>
      </motion.div>
      
      <motion.div 
        className="w-64 h-1 bg-dark-100 rounded-full overflow-hidden mb-4"
        initial={{ width: 0 }}
        animate={{ width: 256 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
      
      <motion.div
        className="text-sm text-light-300 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {progress < 100 ? 'Loading experience...' : 'Launching...'}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;