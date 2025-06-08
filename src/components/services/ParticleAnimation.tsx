"use client"

import { useRef, useEffect } from "react"

// Helper debounce function
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default function ParticleAnimation({ color = "#4CD787", density = 50, speed = 0.7 }) {

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    baseColor: string;
    opacity: number;

    constructor(canvas: HTMLCanvasElement, particleSpeed: number, particleColor: string) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * particleSpeed * 0.3;
      this.speedY = (Math.random() - 0.5) * particleSpeed * 0.3;
      this.baseColor = particleColor;
      this.opacity = Math.random() * 0.2 + 0.1;
    }

    update(canvas: HTMLCanvasElement) {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (isNaN(this.x) || isNaN(this.y)) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.baseColor;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
    }
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const requestRef = useRef<number | null>(null)
  const previousTimeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Optimize by reducing particle count
    const actualDensity = Math.min(density, 10);

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < actualDensity; i++) {
      particles.push(new Particle(canvas, speed, color)); // Use new Particle class constructor
    }
    particlesRef.current = particles;

    // Animation loop with throttling
    const animate = (timestamp: DOMHighResTimeStamp) => {
      if (!previousTimeRef.current) previousTimeRef.current = timestamp;
      const deltaTime = timestamp - previousTimeRef.current;

      // Limit to ~30fps for better performance
      if (deltaTime > 33) {
        previousTimeRef.current = timestamp;

        if (!ctx || !canvas) return; // Guard against null ctx or canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update(canvas); // Pass canvas to update
          particles[i].draw(ctx); // Pass ctx to draw
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate)

    // Handle resize with debounce
    const handleResize = debounce(() => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }, 200)

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [color, density, speed])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60" />
}
