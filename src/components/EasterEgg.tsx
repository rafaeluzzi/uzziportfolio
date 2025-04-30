import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import gsap from 'gsap';

interface EasterEggProps {
  onClose: () => void;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 1, y: 0 };
const SPEED = 150;

const EasterEgg: React.FC<EasterEggProps> = ({ onClose }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  // Animation for the game container
  useEffect(() => {
    if (!gameRef.current) return;
    
    gsap.from(gameRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.5)",
    });
  }, []);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        
        head.x += direction.x;
        head.y += direction.y;
        
        // Check for collisions with walls
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }
        
        // Check for collisions with self
        if (newSnake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }
        
        // Check for food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prevScore => prevScore + 1);
          generateFood(newSnake.concat(head));
        } else {
          newSnake.pop(); // Remove tail if no food is eaten
        }
        
        newSnake.unshift(head); // Add new head
        return newSnake;
      });
    };
    
    const gameInterval = setInterval(moveSnake, SPEED);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, isPaused]);
  
  const generateFood = (currentSnake = snake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      // Ensure food doesn't appear on the snake
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    setFood(newFood);
  };
  
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    generateFood(INITIAL_SNAKE);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    
    if (e.key === 'p' || e.key === 'P') {
      setIsPaused(prev => !prev);
      return;
    }
    
    if (gameOver) {
      if (e.key === 'r' || e.key === 'R') {
        resetGame();
      }
      return;
    }
    
    if (isPaused) return;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-dark-300/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div 
        ref={gameRef}
        className="glass-card p-6 max-w-md w-full rounded-2xl relative overflow-hidden"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-dark-300/50 text-light-100 hover:bg-dark-300 transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gradient mb-2">Hidden Snake Game!</h3>
          <p className="text-light-300 text-sm">You found the Easter Egg! Use arrow keys or WASD to play.</p>
          <div className="mt-3 flex justify-center space-x-4">
            <div className="text-light-100">Score: {score}</div>
            <button 
              className="text-primary-400 text-sm font-medium"
              onClick={resetGame}
            >
              Reset Game
            </button>
            <button 
              className="text-primary-400 text-sm font-medium"
              onClick={() => setIsPaused(p => !p)}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        </div>
        
        <div 
          className="w-full aspect-square grid bg-dark-200 rounded-lg overflow-hidden relative"
          style={{ 
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {snake.map((segment, index) => (
            <div 
              key={`snake-${index}`}
              className={`${index === 0 ? 'bg-primary-500' : 'bg-primary-400'} rounded-sm m-[1px]`}
              style={{ 
                gridColumnStart: segment.x + 1, 
                gridRowStart: segment.y + 1,
              }}
            />
          ))}
          
          <div 
            className="bg-accent-500 rounded-full m-[2px]"
            style={{ 
              gridColumnStart: food.x + 1, 
              gridRowStart: food.y + 1,
            }}
          />
          
          {gameOver && (
            <div className="absolute inset-0 bg-dark-300/80 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-bold text-accent-400 mb-2">Game Over!</h3>
                <p className="text-light-300 mb-4">Final Score: {score}</p>
                <button 
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg"
                  onClick={resetGame}
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
          
          {isPaused && !gameOver && (
            <div className="absolute inset-0 bg-dark-300/80 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-bold text-primary-400 mb-4">Paused</h3>
                <button 
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg"
                  onClick={() => setIsPaused(false)}
                >
                  Resume
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-light-300 text-center">
          Press <span className="text-primary-400 font-mono">P</span> to pause, 
          <span className="text-primary-400 font-mono"> R</span> to reset
        </div>
      </div>
    </motion.div>
  );
};

export default EasterEgg;