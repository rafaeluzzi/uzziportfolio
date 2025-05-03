import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Globe, Bot } from 'lucide-react';

// Update the onLaunch prop type to accept a boolean parameter
interface DevMatchCardProps {
  onLaunch: (hasLaunched: boolean) => void;
}

const DevMatchCard: React.FC<DevMatchCardProps> = ({ onLaunch }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [hasLaunched, setHasLaunched] = useState(false);

  const handleIconClick = (type: string) => {
    setSelectedType(type);
    setHasLaunched(true);
    onLaunch(true); // Notify the parent component with true
    
  };

  const handleClose = () => {
    
    setIsHovered(false);
    
    setHasLaunched(false);
    setSelectedType(null);
    onLaunch(false); // Notify the parent component with false
  };

  return (
    <>
      <motion.div
        className={`relative ${
          hasLaunched ? 'h-full' : 'h-full'
        } bg-dark-300 rounded-lg p-6 shadow-lg overflow-hidden cursor-pointer border border-dark-100 transition-all`}
        onHoverStart={() => !hasLaunched && setIsHovered(true)}
        onHoverEnd={() => !hasLaunched && setIsHovered(false)}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        
          {/* === STATE 1: Teaser State === */}
          {!isHovered && !hasLaunched && (
            <motion.div
              key="teaser"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex flex-col items-center justify-center h-full w-full text-center"
            >
              <div className="flex items-center justify-center h-full w-full">
                {/* Gradient Background with Blur */}
                <div className="relative flex flex-col items-center justify-center w-12 h-12">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 blur-lg animate-pulse"
                  ></motion.div>
                  {/* Bot Icon */}
                  <Bot size={24} className="relative text-primary-300 z-10" />
                  {/* Start Text */}
                  <span className="mt-1 text-sm font-bold text-primary-300">Start</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* === STATE 2: Hover State === */}
          {isHovered && !hasLaunched && (
            <motion.div
              key="hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex flex-col items-center justify-center h-full w-full text-center"
            >
              <h2 className="text-lg md:text-xl font-bold text-primary-400 mb-4">
                Select your project type to get started.
              </h2>
              <div className="flex space-x-6">
                {['Smartphone', 'Monitor', 'Globe'].map((type) => (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.3 }}
                    onClick={() => handleIconClick(type)}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-100 text-primary-400 hover:text-primary-500 transition-all"
                  >
                    {type === 'Smartphone' && <Smartphone size={24} />}
                    {type === 'Monitor' && <Monitor size={24} />}
                    {type === 'Globe' && <Globe size={24} />}
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-sm text-light-300">
                AI will ask a few questions and craft a custom brief.
              </p>
            </motion.div>
          )}
      

      {/* === STATE 3: Modal-Like Click-to-Launch State === */}
      {hasLaunched && (
        
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-dark-300 rounded-lg shadow-xl w-full h-full text-center relative"
            >
              
              <h2 className="text-lg md:text-xl font-bold text-primary-400 mb-4">
                {selectedType} selected!
              </h2>
              <p className="mt-4 text-sm text-light-300">Loading wizard...</p>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-dark-100 text-light-300 hover:bg-dark-200 rounded-full p-2 transition-all"
              >
                ✕
              </button>
          </motion.div>
      )}
      </motion.div>
    </>
  );
};

export default DevMatchCard;