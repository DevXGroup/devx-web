'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Square {
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  speed: number;
  rotationSpeed: number;
  color: string;
}

interface SquaresProps {
  className?: string;
  squareCount?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

const Squares: React.FC<SquaresProps> = ({
  className = '',
  squareCount = 50,
  colors = ['#4CD787', '#4834D4', '#CFB53B', '#9d4edd'],
  minSize = 10,
  maxSize = 40,
  speed = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const squaresRef = useRef<Square[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  const initSquares = useCallback((width: number, height: number) => {
    const squares: Square[] = [];

    for (let i = 0; i < squareCount; i++) {
      squares.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * speed + 0.5,
        rotationSpeed: (Math.random() - 0.5) * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    squaresRef.current = squares;
  }, [squareCount, colors, minSize, maxSize, speed]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isAnimating) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw squares
    squaresRef.current.forEach((square) => {
      // Update position
      square.y -= square.speed;
      square.rotation += square.rotationSpeed;

      // Reset square if it goes off screen
      if (square.y + square.size < 0) {
        square.y = height + square.size;
        square.x = Math.random() * width;
      }

      // Draw square
      ctx.save();
      ctx.translate(square.x + square.size / 2, square.y + square.size / 2);
      ctx.rotate((square.rotation * Math.PI) / 180);
      ctx.globalAlpha = square.opacity;

      // Draw filled square with glow
      ctx.fillStyle = square.color;
      ctx.shadowColor = square.color;
      ctx.shadowBlur = 8;
      ctx.fillRect(-square.size / 2, -square.size / 2, square.size, square.size);

      // Draw border with enhanced visibility
      ctx.strokeStyle = square.color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 4;
      ctx.strokeRect(-square.size / 2, -square.size / 2, square.size, square.size);
      
      // Reset shadow
      ctx.shadowBlur = 0;

      ctx.restore();
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isAnimating]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    initSquares(rect.width, rect.height);
  }, [initSquares]);

  useEffect(() => {
    resizeCanvas();
    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeCanvas, animate]);

  const handleClick = () => {
    // Burst effect - temporarily increase speed and add more squares
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    
    // Add temporary burst squares
    for (let i = 0; i < 20; i++) {
      squaresRef.current.push({
        x: Math.random() * rect.width,
        y: rect.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * speed * 3 + 1,
        rotationSpeed: (Math.random() - 0.5) * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Increase existing squares speed temporarily
    squaresRef.current.forEach((square, index) => {
      if (index < squareCount) {
        square.speed *= 2;
        square.rotationSpeed *= 2;
      }
    });

    // Reset speeds after burst
    setTimeout(() => {
      squaresRef.current = squaresRef.current.slice(0, squareCount);
      squaresRef.current.forEach((square) => {
        square.speed = Math.random() * speed + 0.1;
        square.rotationSpeed = (Math.random() - 0.5) * 2;
      });
    }, 1000);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default Squares;