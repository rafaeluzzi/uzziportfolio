import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Bot, Wrench, Brain, Rocket, Briefcase } from 'lucide-react';
import DevInquiryWizard from './DevInquiryWizard';
import { Tooltip as MuiTooltip } from '@mui/material';


// Update the onLaunch prop type to accept a boolean parameter
interface DevMatchCardProps {
  onLaunch: (hasLaunched: boolean) => void;
  setHovered: (hovered: boolean) => void; // Add this line
}

const DevMatchCard: React.FC<DevMatchCardProps> = ({ onLaunch, setHovered }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [hasLaunched, setHasLaunched] = useState(false);

  const projectTypes = [
    { label: 'Prototype MVP', icon: Rocket, description: 'Build a lean version to validate your idea' },
    { label: 'iOS/Android Mobile App', icon: Smartphone, description: 'Build a native or hybrid app for iOS/Android' },
    { label: 'Custom Software', icon: Monitor, description: 'Develop a software-as-a-service product, store or any other idea you have in mind with modern UX' },
    { label: 'AI or Automation', icon: Brain, description: 'Integrate AI, chatbots, or smart workflows' },
    { label: 'Custom API', icon: Briefcase, description: 'Create a tailored API for your needs' },
    { label: 'Fixes & Upgrades', icon: Wrench, description: 'Resolve bugs or enhance existing software' }
  ];

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
        onHoverStart={() => {
          if (!hasLaunched) setIsHovered(true);
          setHovered(true); // Notify parent
        }}
        onHoverEnd={() => {
          if (!hasLaunched) setIsHovered(false);
          setHovered(false); // Notify parent
        }}
        onTouchStart={() => {
          if (!hasLaunched) setIsHovered(true);
          setHovered(true);
        }}
        onTouchEnd={() => {
          if (!hasLaunched) setIsHovered(false);
          setHovered(false);
        }}
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
             
<div className="flex flex-wrap gap-4 justify-center">
  {projectTypes.map(({ label, icon: Icon, description }) => (
    <div key={label} className="w-14 flex flex-col items-center justify-center  inline-block">
      <MuiTooltip
        title={description}
        arrow
        placement="top"
        slotProps={{
          tooltip: {
            sx: {
              bgcolor: '#23243a', // match your bg-dark-300
              color: '#e5e7ef',   // match your text-light-300
              fontSize: 13,
              borderRadius: 2,
              boxShadow: 3,
              px: 2,
              py: 1,
              letterSpacing: 0.1,
            },
          },
          arrow: {
            sx: {
              color: '#23243a',
            },
          },
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick(label);
          }}
          onTouchStart={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
          className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-dark-100 text-primary-400 hover:text-primary-500 transition-all cursor-pointer"
        >
          <Icon size={24} />
        </motion.div>
      </MuiTooltip>
      <span className="text-[10px] mt-1 text-center">{label}</span>
    </div>
  ))}
</div>
             { /*<p className="mt-4 text-sm text-light-300">
                AI will ask a few questions and craft a custom brief.
              </p>*/}
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
              <DevInquiryWizard projectType={selectedType || ''} onClose={handleClose} />


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