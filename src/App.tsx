import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroVariations from './components/HeroVariations';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';
import EasterEgg from './components/EasterEgg';
import HeroTests from './components/HeroTests';
import { AnimatePresence } from 'framer-motion';

function MainContent() {
  const [easterEggActive, setEasterEggActive] = useState(false);



  const activateEasterEgg = () => {
    setEasterEggActive(true);
  };

  const closeEasterEgg = () => {
    setEasterEggActive(false);
  };

  return (
    <div className="min-h-screen bg-dark-300 text-light-100 overflow-hidden">
    
      
      <main className="relative">
        <Navbar />
        <HeroVariations />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
        
        <div className="easter-egg-trigger" onClick={activateEasterEgg} title="Easter Egg"></div>
        
        <AnimatePresence>
          {easterEggActive && <EasterEgg onClose={closeEasterEgg} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <div className={`transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/hero-variations" element={<HeroTests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;