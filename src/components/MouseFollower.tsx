import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MouseFollowerProps {
  position: { x: number; y: number };
}

const MouseFollower: React.FC<MouseFollowerProps> = ({ position }) => {
  const [visible, setVisible] = useState(false);

  // Smoother spring-based animation for the cursor follower
  const springConfig = { damping: 25, stiffness: 120 };
  const springX = useSpring(position.x, springConfig);
  const springY = useSpring(position.y, springConfig);

  useEffect(() => {
    // Small delay before showing the cursor to wait for initial positioning
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    springX.set(position.x);
    springY.set(position.y);
  }, [position, springX, springY]);

  if (!visible) return null;

  return (
    <>
      {/* Larger outer circle */}
      <motion.div
        className="fixed w-12 h-12 rounded-full pointer-events-none z-50 mix-blend-difference hidden sm:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      />
      
      {/* Small inner circle */}
      <motion.div
        className="fixed w-3 h-3 rounded-full bg-white pointer-events-none z-50 mix-blend-difference hidden sm:block"
        style={{
          x: position.x,
          y: position.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};

export default MouseFollower;