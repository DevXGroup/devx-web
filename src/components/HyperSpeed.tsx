'use client';
import React, { useRef, useEffect, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
}

interface HyperSpeedProps {
  className?: string;
  starCount?: number;
  speed?: number;
  trailLength?: number;
  starColor?: string;
  backgroundColor?: string;
}

const HyperSpeed: React.FC<HyperSpeedProps> = ({
  className = '',
  starCount = 800,
  speed = 0.75,
  trailLength = 3,
  starColor = '#ffffff',
  backgroundColor = 'transparent',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const speedRef = useRef(speed);

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < starCount; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * Math.min(centerX, centerY);
      
      stars.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        z: Math.random() * 1000,
        prevX: centerX + Math.cos(angle) * radius,
        prevY: centerY + Math.sin(angle) * radius,
      });
    }
    
    starsRef.current = stars;
  }, [starCount]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas with fade effect for trail
    ctx.fillStyle = backgroundColor === 'transparent' ? 'rgba(0, 0, 0, 0.05)' : backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Update and draw stars
    starsRef.current.forEach((star) => {
      // Store previous position
      star.prevX = star.x;
      star.prevY = star.y;

      // Move star towards viewer
      star.z -= speedRef.current * 10;

      // Reset star if it's too close
      if (star.z <= 0) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * Math.min(centerX, centerY);
        star.x = centerX + Math.cos(angle) * radius;
        star.y = centerY + Math.sin(angle) * radius;
        star.z = 1000;
        star.prevX = star.x;
        star.prevY = star.y;
      }

      // Project 3D to 2D
      const x = (star.x - centerX) * (200 / star.z) + centerX;
      const y = (star.y - centerY) * (200 / star.z) + centerY;

      const prevX = (star.prevX - centerX) * (200 / (star.z + speedRef.current * 10)) + centerX;
      const prevY = (star.prevY - centerY) * (200 / (star.z + speedRef.current * 10)) + centerY;

      // Draw star trail
      const opacity = Math.max(0, 1 - star.z / 1000);
      const size = Math.max(0.5, (1 - star.z / 1000) * 3);

      // Enhanced trail with glow effect
      ctx.strokeStyle = starColor;
      ctx.globalAlpha = opacity * 0.8;
      ctx.lineWidth = size;
      ctx.shadowColor = starColor;
      ctx.shadowBlur = size * 2;
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Draw bright star dot
      ctx.shadowBlur = size * 3;
      ctx.fillStyle = starColor;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Reset shadow and alpha
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [starColor, backgroundColor]);

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

    initStars(rect.width, rect.height);
  }, [initStars]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    // Delay initialization to allow parent animations to complete
    const initTimeout = setTimeout(() => {
      resizeCanvas();
      animate();
    }, 100);

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeCanvas, animate]);

  const handleClick = () => {
    // Boost speed temporarily for click effect
    speedRef.current = speed * 3;
    setTimeout(() => {
      speedRef.current = speed;
    }, 500);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer block"
        onClick={handleClick}
        style={{ background: backgroundColor, width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default HyperSpeed;