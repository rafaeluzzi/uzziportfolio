import React, { useEffect, useRef } from 'react';

const PixelTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixels: { x: number; y: number; alpha: number }[] = [];
    const maxPixels = 50; // Maximum number of pixels in the trail
    const pixelSize = 4; // Size of each pixel
    const fadeSpeed = 0.05; // Speed at which pixels fade out

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      pixels.push({ x, y, alpha: 1 });
      if (pixels.length > maxPixels) {
        pixels.shift(); // Remove the oldest pixel
      }
    };

    const draw = () => {
      if (!ctx) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each pixel
      pixels.forEach((pixel, index) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${pixel.alpha})`;
        ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);

        // Fade out the pixel
        pixel.alpha -= fadeSpeed;
        if (pixel.alpha <= 0) {
          pixels.splice(index, 1); // Remove fully faded pixels
        }
      });

      requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />;
};

export default PixelTrail;