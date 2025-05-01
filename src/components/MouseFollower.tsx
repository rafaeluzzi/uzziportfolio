import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { throttle } from 'lodash';

const TRAIL_LENGTH = 10; // Number of trailing circles
const FADE_OUT_DELAY = 100; // Delay in milliseconds between opacity updates

const MouseFollower: React.FC = () => {
  const [trail, setTrail] = useState<{ x: number; y: number; opacity: number }[]>(
    Array(TRAIL_LENGTH).fill({ x: 0, y: 0, opacity: 0 }) // Initialize trail with default positions and opacity
  );
  const [lastCursor, setLastCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      setLastCursor({ x: e.clientX, y: e.clientY }); // Update the last cursor position
      setTrail((prevTrail) => {
        const newTrail = [...prevTrail];
        newTrail.push({ x: e.clientX, y: e.clientY, opacity: 1 }); // Add the new position with full opacity
        newTrail.shift(); // Remove the oldest position to maintain the trail length
        return newTrail;
      });
    }, 16); // Throttle to ~60fps (16ms)

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updateTrail = () => {
      setTrail((prevTrail) =>
        prevTrail.map((dot, index) => {
          const dx = lastCursor.x - dot.x;
          const dy = lastCursor.y - dot.y;

          return {
            x: dot.x + dx * 0.2, // Move closer to the cursor
            y: dot.y + dy * 0.2,
            opacity: Math.max(dot.opacity - 0.1, 0), // Gradually fade out
          };
        })
      );

      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [lastCursor]);

  return (
    <>
      {trail.map((point, index) => {
        const size = 12 - index; // Gradually reduce size for trailing circles

        return (
          <motion.div
            key={index}
            className="fixed rounded-full pointer-events-none z-50"
            style={{
              width: size,
              height: size,
              backgroundColor: `rgba(255, 255, 255, ${point.opacity})`,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              x: point.x,
              y: point.y,
            }}
            transition={{
              type: 'spring', // Use spring for smoother motion
              stiffness: 500, // Adjust stiffness for responsiveness
              damping: 30, // Adjust damping for smooth stopping
            }}
          />
        );
      })}
    </>
  );
};

export default MouseFollower;