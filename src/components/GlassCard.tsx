import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface GlassCardProps {
  icon?: LucideIcon;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ icon: Icon, label, className = "", children, href }) => {
  const CardWrapper = href ? 'a' : 'div';
  
  return (
    <motion.div
      className={`glass-card p-4 flex flex-col ${className}`}
      whileHover={{ 
        boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
      }}
    >
      {(Icon || label) && (
        <div className="flex items-center gap-2 mb-2">
          {Icon && <Icon size={20} className="text-primary-400" />}
          {label && <span className="text-light-100 text-sm font-medium">{label}</span>}
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default GlassCard;