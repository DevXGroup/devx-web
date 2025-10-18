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
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const flickerSquaresRef = useRef<Set<string>>(new Set());
  const lastFlickerTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      numSquaresX.current = Math.ceil(canvas.offsetWidth / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.offsetHeight / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    setTimeout(resizeCanvas, 0);

    const scaledSquareSize = squareSize * dpr;

    const drawGrid = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / scaledSquareSize) * scaledSquareSize;
      const startY = Math.floor(gridOffset.current.y / scaledSquareSize) * scaledSquareSize;

      for (let x = startX; x < canvas.width + scaledSquareSize; x += scaledSquareSize) {
        for (let y = startY; y < canvas.height + scaledSquareSize; y += scaledSquareSize) {
          const squareX = x - gridOffset.current.x;
          const squareY = y - gridOffset.current.y;

          const gridX = Math.floor(x / scaledSquareSize);
          const gridY = Math.floor(y / scaledSquareSize);
          const squareKey = `${gridX}-${gridY}`;

          const isHovered = hoveredSquareRef.current &&
            gridX === hoveredSquareRef.current.x &&
            gridY === hoveredSquareRef.current.y;

          const isFlickering = randomFlicker && flickerSquaresRef.current.has(squareKey);

          if (isHovered || isFlickering) {
            // Enhanced hover/flicker effect with glow
            ctx.fillStyle = hoverFillColor;
            ctx.shadowColor = typeof borderColor === 'string' ? borderColor : '#FFD700';
            ctx.shadowBlur = 8;
            ctx.fillRect(squareX, squareY, scaledSquareSize, scaledSquareSize);
            ctx.shadowBlur = 0;
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, scaledSquareSize, scaledSquareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "#060010");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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

      if (randomFlicker) {
        updateFlickerSquares();
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Use page coordinates to avoid scrolling issues
      // Get canvas position relative to the document
      const canvasRect = canvas.getBoundingClientRect();
      const canvasDocX = canvasRect.left + window.scrollX;
      const canvasDocY = canvasRect.top + window.scrollY;
      
      const mouseX = (event.pageX - canvasDocX) * dpr;
      const mouseY = (event.pageY - canvasDocY) * dpr;

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x) / scaledSquareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y) / scaledSquareSize);

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    // Create a debounced scroll handler to reset canvas calculations after scrolling stops
    let scrollTimer: number | null = null;
    const debouncedScrollHandler = () => {
      if (scrollTimer) {
        window.clearTimeout(scrollTimer);
      }
      
      // Clear hover state during scrolling
      hoveredSquareRef.current = null;
      
      // After scrolling stops for a brief moment, recalculate the canvas state
      scrollTimer = window.setTimeout(() => {
        // Recalculate canvas dimensions and grid sizes like during resize
        resizeCanvas();
      }, 150); // Wait 150ms after scrolling stops before recalculating
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", debouncedScrollHandler);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", debouncedScrollHandler);
      if (scrollTimer) window.clearTimeout(scrollTimer);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, randomFlicker, flickerInterval, maxFlickerSquares]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full border-none block"
      style={{ cursor: 'default' }}
    ></canvas>
  );
};

export default GridAnimation;