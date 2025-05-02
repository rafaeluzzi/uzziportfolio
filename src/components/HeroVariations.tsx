import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  ArrowRight, Code, Server, 
  Smartphone, Github, MapPin,
  Twitter, Globe,
  Keyboard, 
  FileJson, FileCode, Blocks, 
  LayoutTemplate, Monitor, 
  Database, Cloud, 
  Flame, Laptop,
  Bot, Container, 
  GitBranch, Upload,
  Boxes, Binary,BotMessageSquare,Cpu} from 'lucide-react';
import GlassCard from './GlassCard';
import AppleMap from './AppleMap';
import GitHubCalendar from 'react-github-calendar';
 import { Tooltip as MuiTooltip } from '@mui/material';
import { NowPlaying } from './NowPlaying'; 
import ElapsedTime from './ElapsedTime'; // Import the new component

const techStacks = [
  { name: 'JavaScript', icon: FileJson },
  { name: 'TypeScript', icon: FileCode },
  { name: 'React', icon: Blocks },
  { name: 'React Native', icon: Smartphone },
  { name: 'Next.js', icon: LayoutTemplate },
  { name: 'Node.js', icon: Server },
  { name: 'Express', icon: Monitor },
  { name: 'Tailwind', icon: Flame },
  { name: 'ShadCN', icon: Laptop },
  { name: 'Vite', icon: Binary },
  { name: 'Puppeteer', icon: Bot },
  { name: 'PostgreSQL', icon: Database },
  { name: 'MongoDB', icon: Database },
  { name: 'Firebase', icon: Flame },
  { name: 'AWS', icon: Cloud },
  { name: 'REST APIs', icon: Server },
  { name: 'Python', icon: FileCode },
  { name: 'Rails', icon: Blocks },
  { name: 'Docker', icon: Container },
  { name: 'GitHub Actions', icon: GitBranch },
  { name: 'Vercel', icon: Upload },
  { name: 'Netlify', icon: Boxes },
  { name: 'GitHub Copilot', icon: Bot },
  { name: 'VS Code', icon: Monitor },
  { name: 'AI-assisted Tools', icon: BotMessageSquare }
];
const Hero: React.FC = () => {
  const [direction, setDirection] = useState<'left' | 'right'>('left'); // Track the direction of the slider
  const controls = useAnimation(); // Framer Motion animation controls
  const cardRef = useRef<HTMLDivElement>(null); // Reference to the card element
 

 

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prevDirection) => (prevDirection === 'left' ? 'right' : 'left')); // Toggle direction
    }, 30000); // Adjust duration to match the animation duration (60 seconds here)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateSlider = async () => {
      if (direction === 'left') {
        await controls.start({
          x: -1920, // Slide left
          transition: {
            duration: 30, // Match the duration of the animation
            ease: 'linear',
          },
        });
        setDirection('right'); // Reverse direction after completing the animation
      } else {
        await controls.start({
          x: 0, // Slide right
          transition: {
            duration: 30, // Match the duration of the animation
            ease: 'linear',
          },
        });
        setDirection('left'); // Reverse direction after completing the animation
      }
    };

    animateSlider();
  }, [direction, controls]);

  return (
      <section className="min-h-screen relative flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/20 via-transparent to-dark-300/20"></div>
          <div className="absolute right-[15%] top-1/4 w-96 h-96 bg-secondary-600/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute left-[10%] bottom-1/3 w-96 h-96 bg-secondary-600/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-light-100">Hi, I'm Rafael.</span>
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
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-medium inline-flex items-center transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </motion.div>

            {/* Right column: Bento grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-12 auto-rows-[100px] gap-4"
            >
              {/* Location */}
              <GlassCard 
                icon={MapPin}
                label="My Location"
                className="col-span-4 row-span-2"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-[#1a1b26] opacity-80"></div>
                  <AppleMap />
                </div>
              </GlassCard>

              {/* Music */}
            
               <NowPlaying />

              {/* Social Links */}
              <GlassCard className="col-span-4 row-span-1">
                <div className="flex justify-around w-full">
                  <Twitter size={20} className="text-light-100 hover:text-primary-400 cursor-pointer" />
                  <Github size={20} className="text-light-100 hover:text-primary-400 cursor-pointer" />
                  <Globe size={20} className="text-light-100 hover:text-primary-400 cursor-pointer" />
                </div>
              </GlassCard>

             
              {/* Tech Stack Slider */}
              <GlassCard 
                icon={Cpu}
                label="Tech Stack Behind My Work"
                className="col-span-8 row-span-1 overflow-hidden"
              >
                <div className="relative">
                  <motion.div 
                    ref={cardRef} // Attach the ref to the card
                    className="flex gap-8 items-center cursor-grab" // Add cursor styling for drag interaction
                    animate={controls} // Use animation controls for smooth transitions
                    drag="x" // Enable horizontal dragging
                    dragConstraints={{ left: -1920, right: 0 }} // Set drag boundaries
                  >
                    {[...techStacks, ...techStacks].map((tech, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center gap-2 min-w-[60px]"
                        whileHover={{ scale: 1.2 }} // Optional: Add a hover effect for individual icons
                      >
                        <tech.icon 
                          size={22} 
                          className="text-light-300 hover:text-primary-400 transition-colors"
                        />
                        <span className="text-xs text-light-300 whitespace-nowrap">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </GlassCard>

              {/* GitHub Activity */}
           
<GlassCard
  icon={Github}
  label="Github Activity"
  className="col-span-8 row-span-2 relative"
>
  <GitHubCalendar
    username="rafaeluzzi"
    colorScheme="dark"
    hideMonthLabels
    hideColorLegend
    renderBlock={(block, activity) => (
      <MuiTooltip
        title={`${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${activity.date}`}
        enterTouchDelay={0}
        arrow
      >
        {block}
      </MuiTooltip>
    )}
  />
</GlassCard>


              {/* Coding Since */}
              <GlassCard 
                icon={Keyboard}
                label="Coding Since 2009"
                className="col-span-4 row-span-2"
              >
                <ElapsedTime /> {/* Render the ElapsedTime component */}
              </GlassCard>

              {/* Tech Stack */}
              <GlassCard 
                label="Grok"
                className="col-span-12 row-span-2 overflow-hidden"
              >
              <p className="text-sm text-light-300 mt-4">
                I need ideas for this card
              </p>
              </GlassCard>

              
            </motion.div>
          </div>
        </div>
      </section>
  );
};

export default Hero;