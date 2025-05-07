import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface GlassCardProps {
  icon?: typeof LucideIcon;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ icon: Icon, label, className = "", children }) => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const iconSize = isMobile ? 18 : 20;
  return (
    <motion.div
      className={`glass-card p-4 flex flex-col ${className}`}
      whileHover={{ 
        boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
      }}
    >
      {(Icon || label) && (
        <div className="flex items-center gap-1 mb-2">
          {Icon && <Icon size={iconSize} className="text-primary-400" />}
          {label && <span className="text-light-100 text-xs md:text-sm font-medium">{label}</span>}
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default GlassCard;