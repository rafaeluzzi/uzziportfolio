import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FileText, Briefcase, Mail } from 'lucide-react';
import hitSfx from '../lib/sfx/hit.mp3'; // Adjust path if needed
import rotateSfx from '../lib/sfx/rotate.wav'; // Adjust path if needed
import clearSfx from '../lib/sfx/clear.wav'; // Adjust path if needed

const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shapeIndex, setShapeIndex] = useState(() =>
    Math.floor(Math.random() * 4)
  );
  const [rotation, setRotation] = useState(0); // 0, 1, 2, 3
  const [isFalling, setIsFalling] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const hideDelayTimeout = useRef<NodeJS.Timeout | null>(null);
  const hitAudioRef = useRef<HTMLAudioElement | null>(null);
  const rotateAudioRef = useRef<HTMLAudioElement | null>(null);
  const clearAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedHit = useRef(false);

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
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
  ];

  const blockSize = 44;

  // Rotate a shape's blocks 90deg clockwise n times
  function rotateShape(blocks: { x: number; y: number }[], times: number) {
    let rotated = blocks.map(b => ({ ...b }));
    for (let t = 0; t < times; t++) {
      rotated = rotated.map(({ x, y }) => ({ x: y, y: -x }));
      // Normalize so all x/y >= 0
      const minX = Math.min(...rotated.map(b => b.x));
      const minY = Math.min(...rotated.map(b => b.y));
      rotated = rotated.map(b => ({ x: b.x - minX, y: b.y - minY }));
    }
    return rotated;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) {
        setIsVisible(true);
        return;
      }
      const currentScrollY = window.scrollY;
      if (hideDelayTimeout.current) clearTimeout(hideDelayTimeout.current);

      hideDelayTimeout.current = setTimeout(() => {
        const shouldShow = currentScrollY < lastScrollY;
        if (shouldShow) {
          if (!isVisible) {
            setShapeIndex(prev => {
              let next;
              do {
                next = Math.floor(Math.random() * tetrisShapes.length);
              } while (next === prev);
              return next;
            });
            setRotation(0); // Reset rotation on new shape
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
  }, [lastScrollY, isVisible, tetrisShapes.length, isMobile]);

  useEffect(() => {
    // Show navbar with animation on first load
    const showTimeout = setTimeout(() => setIsVisible(true), 4000);
    return () => clearTimeout(showTimeout);
  }, []);

  // Track falling state for keyboard control
  useEffect(() => {
    if (isVisible) setIsFalling(true);
  }, [isVisible, shapeIndex]);

  useEffect(() => {
    if (!isFalling) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setRotation(r => (r + 3) % 4);
        if (rotateAudioRef.current) {
          rotateAudioRef.current.currentTime = 0;
          rotateAudioRef.current.play();
        }
      } else if (e.key === 'ArrowRight') {
        setRotation(r => (r + 1) % 4);
        if (rotateAudioRef.current) {
          rotateAudioRef.current.currentTime = 0;
          rotateAudioRef.current.play();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFalling]);

  useEffect(() => {
    if (!isFalling) return;

    const handleTouch = (e: TouchEvent) => {
      // Prevent accidental link clicks while falling
      e.preventDefault();
      setRotation(r => (r + 1) % 4);
      if (rotateAudioRef.current) {
        rotateAudioRef.current.currentTime = 0;
        rotateAudioRef.current.play();
      }
    };

    window.addEventListener('touchstart', handleTouch, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [isFalling]);

  useEffect(() => {
    if (!isVisible && clearAudioRef.current) {
      clearAudioRef.current.currentTime = 0;
      clearAudioRef.current.play();
    }
  }, [isVisible]);

  const selectedShape = tetrisShapes[shapeIndex];
  const rotatedShape = rotateShape(selectedShape, rotation);
  const maxY = Math.max(...rotatedShape.map(b => b.y));
  const shapeOffset = blockSize * (3 - maxY);

  return (
    <motion.div
      key={shapeIndex}
      initial={{ y: -800, opacity: 0 }}
      animate={{
        y: isVisible ? shapeOffset : -200,
        opacity: isVisible ? 1 : 0,
        transition: { type: 'spring', stiffness: 20, damping: 18 }
      }}
      onUpdate={latest => {
        if (
          isVisible &&
          !hasPlayedHit.current &&
          typeof latest.y === 'number' &&
          Math.abs(latest.y - shapeOffset) < 6 // Allow for spring overshoot
        ) {
          hasPlayedHit.current = true;
          if (hitAudioRef.current) {
            hitAudioRef.current.currentTime = 0;
            hitAudioRef.current.play();
          }
        }
        if (!isVisible) {
          hasPlayedHit.current = false;
        }
      }}
      onAnimationComplete={() => {
        setIsFalling(false);
        // No need to play sound here anymore
      }}
      className="fixed bottom-4 left-0 z-50"
      style={{
        width: blockSize * 3,
        height: blockSize * 4,
        padding: 8,
        pointerEvents: 'none',
      }}
    >
      <audio ref={hitAudioRef} src={hitSfx} preload="auto" />
      <audio ref={rotateAudioRef} src={rotateSfx} preload="auto" />
      <audio ref={clearAudioRef} src={clearSfx} preload="auto" />
      {/* Arrow icons in top-right corner while falling */}
      
      <div className="relative w-full h-full">
        <AnimatePresence>
          {isVisible &&
            rotatedShape.map((block, index) => {
              const link = navLinks[index];
              if (!link) return null;
              const Icon = link.icon;
              const x = (Math.random() - 0.5) * 180;
              const y = 220 + Math.random() * 80;

              return (
                <motion.a
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
                  initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                  animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                  exit={{
                    scale: 0.7,
                    opacity: 0,
                    x,
                    y,
                    rotate: 30 + Math.random() * 60,
                    transition: { duration: 0.5, ease: 'easeIn' },
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 24,
                    delay: 0.08 * index,
                  }}
                >
                  <Icon size={22} />
                </motion.a>
              );
            })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Navbar;