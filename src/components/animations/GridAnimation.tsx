import React, { useRef, useEffect } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

interface GridAnimationProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
  randomFlicker?: boolean;
  flickerInterval?: number;
  maxFlickerSquares?: number;
  showRadialGradient?: boolean;
}

const GridAnimation: React.FC<GridAnimationProps> = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
  randomFlicker = false,
  flickerInterval = 150,
  maxFlickerSquares = 5,
  showRadialGradient = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const flickerSquaresRef = useRef<Set<string>>(new Set());
  const lastFlickerTimeRef = useRef<number>(0);
  const gradientRef = useRef<CanvasGradient | null>(null);
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Detect mobile for performance optimizations
    isMobileRef.current = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const dpr = isMobileRef.current ? 1 : (window.devicePixelRatio || 1); // Use 1x on mobile for better performance

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      numSquaresX.current = Math.ceil(canvas.offsetWidth / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.offsetHeight / squareSize) + 1;

      // Cache gradient on resize (only if needed and not on mobile)
      if (showRadialGradient && !isMobileRef.current) {
        gradientRef.current = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
        );
        gradientRef.current.addColorStop(0, "rgba(0, 0, 0, 0.88)");
        gradientRef.current.addColorStop(0.35, "rgba(0, 0, 0, 0.65)");
        gradientRef.current.addColorStop(0.65, "rgba(0, 0, 0, 0.25)");
        gradientRef.current.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
    };

    window.addEventListener("resize", resizeCanvas);
    setTimeout(resizeCanvas, 0);

    const scaledSquareSize = squareSize * dpr;

    const drawGrid = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = Math.max(0.5, 0.5 * dpr);

      const startX = Math.floor(gridOffset.current.x / scaledSquareSize);
      const startY = Math.floor(gridOffset.current.y / scaledSquareSize);
      const endX = Math.ceil((gridOffset.current.x + canvas.width) / scaledSquareSize);
      const endY = Math.ceil((gridOffset.current.y + canvas.height) / scaledSquareSize);

      // for (let gridX = startX; gridX < endX; gridX++) {
      //   for (let gridY = startY; gridY < endY; gridY++) {
      //     const squareKey = `${gridX}-${gridY}`;
      //     const squareX = gridX * scaledSquareSize - gridOffset.current.x;
      //     const squareY = gridY * scaledSquareSize - gridOffset.current.y;

      //     const isHovered = hoveredSquareRef.current &&
      //       gridX === hoveredSquareRef.current.x &&
      //       gridY === hoveredSquareRef.current.y;

      //     const isFlickering = randomFlicker && flickerSquaresRef.current.has(squareKey);

      //     if (isHovered) {
      //       // Enhanced hover/flicker effect with glow
      //       ctx.fillStyle = hoverFillColor;
      //       ctx.shadowColor = typeof borderColor === 'string' ? borderColor : '#FFD700';
      //       ctx.shadowBlur = 8;
      //       ctx.fillRect(squareX, squareY, scaledSquareSize, scaledSquareSize);
      //       ctx.shadowBlur = 0;
      //     } else if (isFlickering) {
      //       ctx.fillStyle = hoverFillColor;
      //       ctx.fillRect(squareX, squareY, scaledSquareSize, scaledSquareSize);
      //     }

      //     // ctx.strokeStyle = borderColor;
      //     // ctx.strokeRect(squareX, squareY, scaledSquareSize, scaledSquareSize);
      //   }
      // }

      if (randomFlicker) {
        flickerSquaresRef.current.forEach((key) => {
          const [gx, gy] = key.split("-").map(Number);
          const squareX = gx! * scaledSquareSize - gridOffset.current.x;
          const squareY = gy! * scaledSquareSize - gridOffset.current.y;
          if (squareX + scaledSquareSize > 0 && squareX < canvas.width && squareY + scaledSquareSize > 0 && squareY < canvas.height) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, scaledSquareSize, scaledSquareSize);
          }
        });
      }

      if (hoveredSquareRef.current) {
        const gx = hoveredSquareRef.current.x;
        const gy = hoveredSquareRef.current.y;
        const squareX = gx * scaledSquareSize - gridOffset.current.x;
        const squareY = gy * scaledSquareSize - gridOffset.current.y;
        if (squareX + scaledSquareSize > 0 && squareX < canvas.width && squareY + scaledSquareSize > 0 && squareY < canvas.height) {
          ctx.fillStyle = hoverFillColor;
          ctx.shadowColor = typeof borderColor === "string" ? borderColor : "#FFD700";
          ctx.shadowBlur = 8;
          ctx.fillRect(squareX, squareY, scaledSquareSize, scaledSquareSize);
          ctx.shadowBlur = 0;
        }
      }

      ctx.beginPath();

      // Vertical lines
      for (let gridX = startX; gridX <= endX; gridX++) {
        const x = gridX * scaledSquareSize - gridOffset.current.x;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      // Horizontal lines
      for (let gridY = startY; gridY <= endY; gridY++) {
        const y = gridY * scaledSquareSize - gridOffset.current.y;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      ctx.strokeStyle = borderColor;
      ctx.shadowBlur = 0;
      ctx.shadowColor = '';
      ctx.stroke();

      // Use cached gradient on desktop only (skip on mobile for performance)
      if (showRadialGradient && !isMobileRef.current && gradientRef.current) {
        ctx.fillStyle = gradientRef.current;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const updateFlickerSquares = () => {
      const now = Date.now();
      if (now - lastFlickerTimeRef.current >= flickerInterval) {
        flickerSquaresRef.current.clear();

        const numSquares = Math.floor(Math.random() * maxFlickerSquares) + 1;
        for (let i = 0; i < numSquares; i++) {
          const randomX = Math.floor(Math.random() * numSquaresX.current);
          const randomY = Math.floor(Math.random() * numSquaresY.current);
          flickerSquaresRef.current.add(`${randomX}-${randomY}`);
        }

        lastFlickerTimeRef.current = now;
      }
    };

    let flickerIntervalId: any = null;
    if (randomFlicker) {
      flickerIntervalId = window.setInterval(updateFlickerSquares, flickerInterval);
    }

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1) * dpr;
      switch (direction) {
        case "right":
          gridOffset.current.x -= effectiveSpeed;
          break;
        case "left":
          gridOffset.current.x += effectiveSpeed;
          break;
        case "up":
          gridOffset.current.y += effectiveSpeed;
          break;
        case "down":
          gridOffset.current.y -= effectiveSpeed;
          break;
        case "diagonal":
          gridOffset.current.x -= effectiveSpeed;
          gridOffset.current.y -= effectiveSpeed;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Use client coordinates for accurate positioning
      const canvasRect = canvas.getBoundingClientRect();

      // Calculate mouse position relative to canvas
      const mouseX = (event.clientX - canvasRect.left) * dpr;
      const mouseY = (event.clientY - canvasRect.top) * dpr;

      // Check if mouse is within canvas bounds
      if (mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height) {
        const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x) / scaledSquareSize);
        const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y) / scaledSquareSize);

        if (
          !hoveredSquareRef.current ||
          hoveredSquareRef.current.x !== hoveredSquareX ||
          hoveredSquareRef.current.y !== hoveredSquareY
        ) {
          hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
        }
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    // Create a debounced scroll handler - mobile only clears hover, no resize
    let scrollTimer: number | null = null;
    const debouncedScrollHandler = () => {
      // Clear hover state during scrolling
      hoveredSquareRef.current = null;

      // Skip canvas recalculation on mobile to prevent flashing
      if (isMobileRef.current) return;

      if (scrollTimer) {
        window.clearTimeout(scrollTimer);
      }

      // After scrolling stops for a brief moment, recalculate the canvas state (desktop only)
      scrollTimer = window.setTimeout(() => {
        resizeCanvas();
      }, 150);
    };

    // Listen on window for hover effect to work everywhere
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", debouncedScrollHandler);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", debouncedScrollHandler);
      if (scrollTimer) window.clearTimeout(scrollTimer);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, randomFlicker, flickerInterval, maxFlickerSquares, showRadialGradient]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full border-none block"
        style={{
          cursor: 'default',
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      ></canvas>
      {/* CSS-based gradient overlay for mobile (better performance than canvas) */}
      {/*<div className="absolute inset-0" style={{
        backgroundImage: 'repeating-linear-gradient(to right, #999 0 2px, transparent 1px 40px), repeating-linear-gradient(to bottom, #999 0 1px, transparent 2px 40px)',
        backgroundPosition: '0 0',
        backgroundSize: '40px 40px',
      }} />*/}
      {showRadialGradient && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 100%)',
            mixBlendMode: 'normal',
            opacity: 1,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default GridAnimation;
