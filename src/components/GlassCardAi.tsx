import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

interface GlassCardAiProps {
  icon?: typeof LucideIcon;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  isExpanded?: boolean; 
}

const GlassCardAi: React.FC<GlassCardAiProps> = ({ icon: Icon, label, className = "", children, isExpanded = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // State for height and bottom offset
  const [cardStyle, setCardStyle] = useState({ height: 216, bottom: -225 });

  // Update style based on screen size
  useEffect(() => {
    const updateStyle = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setCardStyle(isMobile ? { height: 316, bottom: -325 } : { height: 216, bottom: -225 });
    };
    updateStyle();
    window.addEventListener('resize', updateStyle);
    return () => window.removeEventListener('resize', updateStyle);
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        height: isExpanded ? 800 : cardStyle.height,
        duration: 0.8,
        ease: 'power2.inOut',
      });
      if (isExpanded) {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
          gsap.to(window, {
            scrollTo: { y: 450 },
            duration: 0.8,
            ease: 'power2.inOut',
          });
        }
      }
    }
  }, [isExpanded, cardStyle.height]);

  return (
    <div
      ref={cardRef}
      className={`glass-card z-20 p-4 flex flex-col overflow-hidden col-span-12 ${className}`}
      style={{
        height: cardStyle.height,
        width: '100%',
        position: 'absolute',
        bottom: cardStyle.bottom,
      }}
    >
      {(Icon || label) && (
        <div className="flex items-center gap-1 mb-2">
          {Icon && <Icon size={20} className={`text-primary-400 ${
            label === 'Select your project type to get started.' ? 'animate-pulse' : ''
              }`} />}
          {label && <span className={`text-light-100 text-xs md:text-sm font-medium`}>{label}</span>}
        </div>
      )}
      {children}
    </div>
  );
};

export default GlassCardAi;