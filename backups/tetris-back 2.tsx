import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FileText, Briefcase, Mail } from 'lucide-react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shapeIndex, setShapeIndex] = useState(() =>
    Math.floor(Math.random() * 4)
  );
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const hideDelayTimeout = useRef<NodeJS.Timeout | null>(null);
  const pendingShapeChange = useRef(false);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: FileText },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const tetrisShapes = [
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
    [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  ];

  const blockSize = 44;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (hideDelayTimeout.current) clearTimeout(hideDelayTimeout.current);

      hideDelayTimeout.current = setTimeout(() => {
        const shouldShow = currentScrollY < lastScrollY || currentScrollY < 100;
        if (shouldShow) {
          // Only change shape if it was hidden before
          if (!isVisible) {
            setShapeIndex(prev => {
              let next;
              do {
                next = Math.floor(Math.random() * tetrisShapes.length);
              } while (next === prev);
              return next;
            });
          }
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        setLastScrollY(currentScrollY);
      }, 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideDelayTimeout.current) clearTimeout(hideDelayTimeout.current);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
    // eslint-disable-next-line
  }, [lastScrollY, isVisible, tetrisShapes.length]);

  const selectedShape = tetrisShapes[shapeIndex];
  const maxY = Math.max(...selectedShape.map(b => b.y));
  const shapeOffset = blockSize * (3 - maxY);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={shapeIndex}
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: shapeOffset, opacity: 1 }}
          exit={{ y: -150, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 18,
          }}
          className="fixed bottom-4 left-0 z-50"
          style={{
            width: blockSize * 3,
            height: blockSize * 4,
            padding: 8,
            pointerEvents: 'none',
          }}
        >
          <div className="relative w-full h-full">
            {selectedShape.map((block, index) => {
              const link = navLinks[index];
              if (!link) return null;
              const Icon = link.icon;
              return (
                <a
                  key={`${link.name}-${shapeIndex}`}
                  href={link.href}
                  className="absolute flex items-center justify-center bg-secondary-900 border border-dark-100 rounded text-light-300 hover:text-primary-400 transition-colors"
                  style={{
                    width: blockSize,
                    height: blockSize,
                    left: block.x * blockSize,
                    top: block.y * blockSize,
                    pointerEvents: 'auto',
                  }}
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;