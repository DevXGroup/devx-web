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
  squareCount = 25,
  colors = ['#4CD787', '#4834D4', '#FFD700', '#9d4edd'],
  minSize = 15,
  maxSize = 45,
  speed = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const squaresRef = useRef<Square[]>([]);
  const mousePosition = useRef({ x: -1, y: -1 });
  const isHovering = useRef(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const initSquares = useCallback((width: number, height: number) => {
    const squares: Square[] = [];
    
    // Scale square sizes based on container size for better responsiveness
    const scaleFactor = Math.min(width / 400, height / 400, 1);
    const responsiveMinSize = Math.max(minSize * scaleFactor, 8);
    const responsiveMaxSize = Math.max(maxSize * scaleFactor, 15);

    for (let i = 0; i < squareCount; i++) {
      const squareSize = Math.random() * (responsiveMaxSize - responsiveMinSize) + responsiveMinSize;
      squares.push({
        x: Math.random() * (width - squareSize) + squareSize/2,
        y: Math.random() * (height - squareSize) + squareSize/2,
        size: squareSize,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.4 + 0.6,
        speed: Math.random() * speed + 0.1,
        rotationSpeed: (Math.random() - 0.5) * 2,
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
      // Mouse interaction - add horizontal drift toward cursor
      if (isHovering.current && mousePosition.current.x >= 0) {
        const dx = mousePosition.current.x - square.x;
        const distance = Math.abs(dx);
        
        if (distance < 60) {
          const attraction = (60 - distance) / 60 * 0.5;
          square.x += Math.sign(dx) * attraction;
        }
      }
      
      square.y -= square.speed;
      square.rotation += square.rotationSpeed;

      // Reset square if it goes off screen
      if (square.y + square.size < 0) {
        square.y = height + square.size;
        square.x = Math.random() * (width - square.size);
      }

      // Draw square
      ctx.save();
      ctx.translate(square.x + square.size / 2, square.y + square.size / 2);
      ctx.rotate((square.rotation * Math.PI) / 180);
      ctx.globalAlpha = square.opacity;

      // Draw rounded square with enhanced radius
      const radius = square.size * 0.25; // Increased border radius
      
      // Draw filled rounded square with glow
      ctx.fillStyle = square.color;
      ctx.shadowColor = square.color;
      ctx.shadowBlur = 8;
      
      // Create rounded rectangle path with fallback
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(-square.size / 2, -square.size / 2, square.size, square.size, radius);
      } else {
        // Fallback for browsers that don't support roundRect
        const x = -square.size / 2;
        const y = -square.size / 2;
        const width = square.size;
        const height = square.size;
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }
      ctx.fill();

      // Draw border with enhanced visibility
      ctx.strokeStyle = square.color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 4;
      ctx.stroke();
      
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
    
    // Don't initialize if container is too small (likely still animating)
    if (rect.width < 10 || rect.height < 10) {
      setTimeout(resizeCanvas, 100);
      return;
    }
    
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
    // Force immediate and reliable initialization
    const initCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(rect.width || 100, 100);
      const height = Math.max(rect.height || 100, 100);
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      initSquares(width, height);
      
      // Ensure animation starts and doesn't stop
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animate();
    };
    
    // Multiple initialization attempts with longer intervals
    initCanvas();
    const timeout1 = setTimeout(initCanvas, 100);
    const timeout2 = setTimeout(initCanvas, 300);
    const timeout3 = setTimeout(initCanvas, 500);
    const timeout4 = setTimeout(initCanvas, 1000);

    // Mouse event handlers for interaction
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      mousePosition.current = { x: -1, y: -1 };
    };

    const handleResize = () => {
      // Delay reinit on resize to prevent flashing
      const canvas = canvasRef.current;
      if (!canvas) return;
      setTimeout(() => {
        if (canvasRef.current) {
          initCanvas();
        }
      }, 50);
    };
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initSquares, animate]);


  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ 
          width: '100%', 
          height: '100%',
          zIndex: 0
        }}
      />
    </div>
  );
};

export default Squares;