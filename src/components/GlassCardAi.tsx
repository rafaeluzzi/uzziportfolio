import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        height: isExpanded ? '800px' : '216px', // Use the height values directly
        duration: 0.8,
        ease: 'power2.inOut',
      });
      if (isExpanded) {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
          gsap.to(window, {
            scrollTo: { y: 450 }, // Scroll to the top of the page
            duration: 0.8,
            ease: 'power2.inOut',
          });
        }
      }
    }
  }, [isExpanded]);

  return (
    <div
      ref={cardRef}
      className={`glass-card z-20 p-4 flex flex-col overflow-hidden col-span-12 ${className}`}
      style={{
        height: '216px', // Set initial height
        width: '100%', // Full width
        position: 'absolute', // Anchor the card
        bottom: -225, // Fix it to the bottom
      }}
    >
      {(Icon || label) && (
        <div className="flex items-center gap-2 mb-2">
          {Icon && <Icon size={20} className="text-primary-400" />}
          {label && <span className="text-light-100 text-sm font-medium">{label}</span>}
        </div>
      )}
      {children}
    </div>
  );
};

export default GlassCardAi;