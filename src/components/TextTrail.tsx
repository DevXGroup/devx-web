"use client"

import React, { useEffect, useRef, useState } from "react";
import { useSafariDetection } from "@/hooks/use-safari-detection";

export interface TextTrailProps {
  text?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  textColor?: string;
  backgroundColor?: number | string;
  className?: string;
}

const TextTrail: React.FC<TextTrailProps> = ({
  text = "Text Trail",
  fontFamily = "Arial",
  fontWeight = "bold",
  textColor = "#CFB53B",
  backgroundColor = "transparent",
  className = "",
}) => {
  const { isSafari, isClient } = useSafariDetection();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [fallback, setFallback] = useState(false);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailsRef = useRef<Array<{ x: number; y: number; alpha: number }>>([]);

  useEffect(() => {
    setMounted(true);
    
    // Set fallback timeout
    const fallbackTimer = setTimeout(() => {
      setFallback(true);
    }, 1000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    if (!mounted || !isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setFallback(true);
      return;
    }

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      setupCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // Add new trail point
      trailsRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        alpha: 1
      });
      
      // Limit trail length
      if (trailsRef.current.length > 50) {
        trailsRef.current.shift();
      }
    };

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw main text
      ctx.font = `${fontWeight} ${Math.min(width / 6, 72)}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = textColor;
      ctx.fillText(text, width / 2, height / 2);
      
      // Draw trails
      trailsRef.current.forEach((trail, index) => {
        const alpha = trail.alpha * (index / trailsRef.current.length);
        if (alpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.font = `${fontWeight} ${Math.min(width / 6, 72)}px ${fontFamily}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = textColor;
          
          // Add slight offset for trail effect
          const offsetX = (trail.x - width / 2) * 0.1;
          const offsetY = (trail.y - height / 2) * 0.1;
          
          ctx.fillText(text, width / 2 + offsetX, height / 2 + offsetY);
          ctx.restore();
        }
      });
      
      // Fade trails
      trailsRef.current = trailsRef.current.map(trail => ({
        ...trail,
        alpha: trail.alpha * 0.95
      })).filter(trail => trail.alpha > 0.01);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    setupCanvas();
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted, isClient, text, fontFamily, fontWeight, textColor]);

  if (!mounted || !isClient || fallback) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight"
          style={{ 
            color: textColor,
            fontFamily: fontFamily,
            fontWeight: fontWeight
          }}
        >
          {text}
        </h1>
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          backgroundColor: backgroundColor === "transparent" ? "transparent" : backgroundColor as string,
          cursor: "crosshair"
        }}
      />
    </div>
  );
};

export default TextTrail;