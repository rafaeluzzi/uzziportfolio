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
          
          
          {/* Icons */}
          <motion.div 
            className="absolute top-2 text-light-300 opacity-75"
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
            className="absolute right-2 text-light-300 opacity-75"
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
            className="absolute bottom-2 text-light-300 opacity-75"
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
            className="absolute left-2 text-light-300 opacity-75"
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