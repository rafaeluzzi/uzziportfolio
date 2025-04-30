import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Code, Server, 
  Smartphone, Github, MapPin,
  Twitter, Globe, Music,
  Keyboard, Coffee
} from 'lucide-react';
import GlassCard from './GlassCard';
import AppleMap from './AppleMap';
import GitHubCalendar from 'react-github-calendar';
 import { Tooltip as MuiTooltip } from '@mui/material';
import { NowPlaying } from './NowPlaying'; 

const techStacks = [
  { name: 'Astro', image: 'https://astro.build/favicon.svg' },
  { name: 'Vue', image: 'https://vuejs.org/images/logo.png' },
  { name: 'Docker', image: 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png' },
  { name: 'TypeScript', image: 'https://www.typescriptlang.org/favicon-32x32.png' },
  { name: 'Next.js', image: 'https://nextjs.org/favicon.ico' }
];

const Hero: React.FC = () => {
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
                label="Location"
                className="col-span-4 row-span-2"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-[#1a1b26] opacity-80"></div>
                  <AppleMap />
                </div>
              </GlassCard>

              {/* Featured Work */}
              <GlassCard 
                icon={Music}
                className="col-span-8 row-span-2"
                label="I'm now playing"
              >
               <NowPlaying />
              </GlassCard>

              {/* Social Links */}
              <GlassCard className="col-span-4 row-span-1">
                <div className="flex justify-around w-full">
                  <Twitter size={20} className="text-light-100 hover:text-primary-400 cursor-pointer" />
                  <Github size={20} className="text-light-100 hover:text-primary-400 cursor-pointer" />
                  <Globe size={20} className="text-light-100 hover:text-primary-400 cursor-pointer" />
                </div>
              </GlassCard>

              {/* Now Playing */}
              <GlassCard 
                icon={Music}
                label="Now playing"
                className="col-span-8 row-span-1"
              >
                
              </GlassCard>

              {/* GitHub Activity */}
           
<GlassCard
  icon={Github}
  label="Github activity"
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


              {/* Typing Speed */}
              <GlassCard 
                icon={Keyboard}
                label="Typing speed"
                className="col-span-4 row-span-2"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-4xl font-bold text-light-100">140</span>
                  <span className="text-sm text-light-300">wpm</span>
                  <div className="flex gap-2 mt-2 text-xs text-light-300">
                    <span>15s</span>
                    <span>100%</span>
                    <span>ID</span>
                  </div>
                </div>
              </GlassCard>

              {/* Tech Stack */}
              <GlassCard 
                label="Tech stack"
                className="col-span-12 row-span-2"
              >
                <div className="flex gap-4 items-center">
                  {techStacks.map((tech, index) => (
                    <img 
                      key={index}
                      src={tech.image} 
                      alt={tech.name}
                      className="w-8 h-8 object-contain filter brightness-75 hover:brightness-100 transition-all"
                    />
                  ))}
                </div>
                <p className="text-sm text-light-300 mt-4">
                  Primarily focused on the JavaScript ecosystem, but always eager to explore and learn new technologies.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
  );
};

export default Hero;