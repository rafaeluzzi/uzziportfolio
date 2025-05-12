import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  Code, Server, 
  Smartphone, Github, MapPin,
  Twitter, 
  Keyboard, 
  FileJson, FileCode, Blocks, 
  LayoutTemplate, Monitor, 
  Database, Cloud, 
  Flame, Laptop,
  Bot, Container, 
  GitBranch, Upload,
  Boxes, Binary,BotMessageSquare,Cpu,Linkedin} from 'lucide-react';
import GlassCard from './GlassCard';
import GlassCardAi from './GlassCardAi';
import AppleMap from './AppleMap';
import GitHubCalendar from 'react-github-calendar';
import { Tooltip as MuiTooltip } from '@mui/material';
import { NowPlaying } from './NowPlaying'; 
import ElapsedTime from './ElapsedTime';
import DevMatchCard from './DevMatchCard';
import clsx from 'clsx'; // If not installed, run: npm install clsx

const isMobile = window.matchMedia('(max-width: 768px)').matches;
const iconSize = isMobile ? 18 : 20;

const techStacks = [
  { name: 'React', icon: Blocks },
  { name: 'React Native', icon: Smartphone },
  { name: 'Next.js', icon: LayoutTemplate },
  { name: 'Tailwind CSS', icon: Flame },
  { name: 'Chakra UI', icon: LayoutTemplate },
  { name: 'Framer Motion', icon: Monitor },
  { name: 'GSAP', icon: Monitor },
  { name: 'Node.js', icon: Server },
  { name: 'Express', icon: Monitor },
  { name: 'Tailwind', icon: Flame },
  { name: 'ShadCN', icon: Laptop },
  { name: 'Puppeteer', icon: Bot },
  { name: 'PostgreSQL', icon: Database },
  { name: 'MongoDB', icon: Database },
  { name: 'Firebase', icon: Flame },
  { name: 'AWS', icon: Cloud },
  { name: 'AI-assisted Tools', icon: BotMessageSquare },
  { name: 'Vite', icon: Binary },
  { name: 'REST APIs', icon: Server },
  { name: 'JavaScript', icon: FileJson },
  { name: 'Python', icon: FileCode },
  { name: 'TypeScript', icon: FileCode },
  { name: 'Rails', icon: Blocks },
  { name: 'Docker', icon: Container },
  { name: 'GitHub Actions', icon: GitBranch },
  { name: 'Vercel', icon: Upload },
  { name: 'Netlify', icon: Boxes },
  { name: 'GitHub Copilot', icon: Bot },
  { name: 'VS Code', icon: Monitor },
];

const slideshowImages = [
  'https://pbs.twimg.com/profile_images/1891978978233024512/XnKTanIU_400x400.jpg', // Twitter
  'https://avatars.githubusercontent.com/u/43967?v=4&size=200', // GitHub
  'https://media.licdn.com/dms/image/v2/D4E03AQEJqdCxbXarvg/profile-displayphoto-shrink_800_800/B4EZasGfS1GYAg-/0/1746644105099?e=1752105600&v=beta&t=qewkL5A_yEu0xiaMD_8Fx1sr0WA-IVQvxET5NJA5-s0', // Website
];

const slideshowTitles = [
  "18y old me",
  "1st git 16y ago",
  "These Days"
];

const socialLinks = [
  {
    href: "https://x.com/rafaeluzzi",
    icon: Twitter,
    label: "Twitter",
  },
  {
    href: "https://github.com/rafaeluzzi",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/rafaeluzzi",
    icon: Linkedin,
    label: "LinkedIn",
  },
];

// Slideshow now receives index and setIndex as props
const Slideshow: React.FC<{ index: number; setIndex: React.Dispatch<React.SetStateAction<number>> }> = ({ index, setIndex }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [setIndex]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img
        src={slideshowImages[index]}
        alt="Portrait Slideshow"
        className="rounded-xl object-cover w-[62px] h-[62px] md:w-[72px] md:h-[72px] transition-all duration-700 shadow-lg"
        style={{ aspectRatio: '1/1' }}
      />
    </div>
  );
};

const Hero: React.FC = () => {
  const [direction, setDirection] = useState<'left' | 'right'>('left'); // Track the direction of the slider
  const controls = useAnimation(); // Framer Motion animation controls
  const cardRef = useRef<HTMLDivElement>(null); // Reference to the card element
  const [hasLaunched, setHasLaunched] = useState(false); // Track if the project has launched
  const [showUzzi, setShowUzzi] = useState(false);
  const [devMatchHovered, setDevMatchHovered] = useState(false);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  const codingLabel = isMobile
    ? "Experience"
    : "Coding Experience";


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

  /*useEffect(() => {
    const interval = setInterval(() => {
      setShowUzzi((prev) => !prev);
    }, 2500); // Change every 2.5 seconds
    return () => clearInterval(interval);
  }, []);*/

  return (
      <section id="home" className="min-h-screen relative flex items-center mb-[275px] lg:mb-0">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/20 via-transparent to-dark-300/20"></div>
          <div className="absolute right-[15%] top-1/4 w-96 h-96 bg-secondary-600/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute left-[10%] bottom-1/3 w-96 h-96 bg-secondary-600/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 mt-20 lg:mt-[-216px]">
          <div className="grid lg:grid-cols-2 gap-2 items-center">
            {/* Left column: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6  mb-8 lg:mb-0"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-light-100">
                  Hi, I'm{' '}
                  <span
                    className="inline-block relative align-middle min-w-[175px] h-[1.1em] overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={showUzzi ? 'Uzzi' : 'Rafael'}
                        initial={{ y: 30, opacity: 0, position: 'absolute', left: 0, right: 0 }}
                        animate={{ y: 0, opacity: 1, position: 'absolute', left: 0, right: 0 }}
                        exit={{ y: -30, opacity: 0, position: 'absolute', left: 0, right: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-gradient w-full text-center block"
                        style={{ fontSize: 'inherit', lineHeight: 'inherit',textAlign: 'left' }}
                      >
                        {showUzzi ? 'Uzzi' : 'Rafael'}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  
                </span>
                <br />
                <span className="text-gradient">Full-Stack</span>
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
              
              {/* <motion.button
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-medium inline-flex items-center transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <ArrowRight className="ml-2" size={18} />
              </motion.button> */}
            </motion.div>

            {/* Right column: Bento grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rightbento grid grid-cols-12 auto-rows-[100px] gap-2 relative "
            >
               {/* Music */}
            
               <NowPlaying />

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

             

              {/* Social Links */}
              <GlassCard
                className={`${isMobile ? "col-span-3" : "col-span-2"} row-span-1 flex items-center justify-center pl-0 pr-2`}
              >
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-center gap-2 mt-2">
                    <Slideshow index={slideshowIndex} setIndex={setSlideshowIndex} />
                    <div className="flex flex-col gap-2 justify-center">
                      {socialLinks.map((link, idx) => {
                        const Icon = link.icon;
                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                          >
                            <Icon
                              size={iconSize}
                              className={clsx(
                                "text-light-100 hover:text-primary-400 cursor-pointer transition-colors",
                                slideshowIndex === idx && "text-primary-400"
                              )}
                            />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  {/* Move the title below both columns */}
                  <span className="text-xs text-light-400 mt-0 pt-[0px]">
                    {slideshowTitles[slideshowIndex]}
                  </span>
                </div>
              </GlassCard>

             
              {/* Tech Stack Slider */}
              <GlassCard 
                icon={Cpu}
                label="Tech Stack Behind My Work"
                className={`${isMobile ? "col-span-9" : "col-span-10"} row-span-1 overflow-hidden`}
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
                        className="flex flex-col items-center gap-2 min-w-[45px] md:min-w-[60px]"
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
    labels={{
      totalCount: '{{count}} contributions this year',
    }}
  />
</GlassCard>


              {/* Coding Since */}
              <GlassCard 
                icon={Keyboard}
                label={codingLabel}
                className="col-span-4 row-span-2"
              >
                <ElapsedTime /> {/* Render the ElapsedTime component */}
              </GlassCard>

              {/* AI bot */}
             
              <GlassCardAi  
                icon={BotMessageSquare}
                label={
                  devMatchHovered
                    ? "Select your project type to get started."
                    : "Need a dev? Let AI help you explain it to me"
                }
                isExpanded={hasLaunched}
              >
                <DevMatchCard
                  onLaunch={(hasLaunched) => setHasLaunched(hasLaunched)}
                  setHovered={setDevMatchHovered}
                />
              </GlassCardAi>

              
            </motion.div>
          </div>
        </div>
      </section>
  );
};

export default Hero;