import { useRef, useEffect } from "react";

const LetterGlitch = ({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
}: {
  glitchColors: string[];
  glitchSpeed: number;
  centerVignette: boolean;
  outerVignette: boolean;
  smooth: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<
    {
      char: string;
      color: string;
      targetColor: string;
      colorProgress: number;
    }[]
  >([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());
  const mousePosition = useRef({ x: -1, y: -1 });
  const isHovering = useRef(false);
  const isDev = process.env.NODE_ENV !== 'production';

  const fontSize = 14;
  const charWidth = 9;
  const charHeight = 16;

  const lettersAndSymbols = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "!",
    "@",
    "#",
    "$",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "/",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "<",
    ">",
    ",",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const getRandomChar = () => {
    return lettersAndSymbols[
      Math.floor(Math.random() * lettersAndSymbols.length)
    ] || 'A';
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)] || '#00ff00';
  };

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result && result[1] && result[2] && result[3]
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    // Ensure minimum canvas size for better reliability
    const width = Math.max(rect.width, 80);
    const height = Math.max(rect.height, 80);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(width, height);
    initializeLetters(columns, rows);
    
    // Force initial draw with delay to ensure context is ready
    requestAnimationFrame(() => {
      drawLetters();
    });
  };

  const drawLetters = () => {
    if (!context.current || !canvasRef.current || letters.current.length === 0) return;
    const ctx = context.current;
    const canvas = canvasRef.current;
    let rect = { width: 100, height: 100 };
    try {
      rect = canvas.getBoundingClientRect();
    } catch (error) {
      if (isDev) {
        console.warn('Could not get canvas dimensions, using defaults', error);
      }
    }
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    try {
      letters.current.forEach((letter, index) => {
        const x = (index % grid.current.columns) * charWidth;
        const y = Math.floor(index / grid.current.columns) * charHeight;
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, x, y);
      });
    } catch (error) {
      if (isDev) {
        console.warn('Error drawing letters', error);
      }
    }
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    // Increase update rate when hovering
    const baseRate = isHovering.current ? 0.12 : 0.05;
    const updateCount = Math.max(1, Math.floor(letters.current.length * baseRate));

    for (let i = 0; i < updateCount; i++) {
      let index;
      
      // If mouse is hovering, bias updates around mouse position
      if (isHovering.current && mousePosition.current.x >= 0) {
        const mouseCol = Math.floor(mousePosition.current.x / charWidth);
        const mouseRow = Math.floor(mousePosition.current.y / charHeight);
        const radius = 3;
        
        // 70% chance to update near cursor, 30% random
        if (Math.random() < 0.7) {
          const colOffset = Math.floor(Math.random() * (radius * 2 + 1)) - radius;
          const rowOffset = Math.floor(Math.random() * (radius * 2 + 1)) - radius;
          const targetCol = Math.max(0, Math.min(grid.current.columns - 1, mouseCol + colOffset));
          const targetRow = Math.max(0, Math.min(grid.current.rows - 1, mouseRow + rowOffset));
          index = targetRow * grid.current.columns + targetCol;
        } else {
          index = Math.floor(Math.random() * letters.current.length);
        }
      } else {
        index = Math.floor(Math.random() * letters.current.length);
      }
      
      const letter = letters.current[index];
      if (!letter) continue;

      letter.char = getRandomChar();
      letter.targetColor = getRandomColor();

      if (!smooth) {
        letter.color = letter.targetColor;
        letter.colorProgress = 1;
      } else {
        letter.colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(
            startRgb,
            endRgb,
            letter.colorProgress
          );
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext("2d");
    
    // Force immediate initialization with fixed dimensions
    const initCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      // Use fixed minimum dimensions to ensure reliability
      let width = 100;
      let height = 100;
      try {
        const rect = parent.getBoundingClientRect();
        width = Math.max(rect.width || 100, 100);
        height = Math.max(rect.height || 100, 100);
      } catch (error) {
        if (isDev) {
          console.warn('Could not get parent element dimensions, using defaults', error);
        }
      }
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      if (context.current) {
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      
      const { columns, rows } = calculateGrid(width, height);
      initializeLetters(columns, rows);
      
      // Start animation immediately
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animate();
    };

    // Initialize with multiple attempts and delays
    initCanvas();
    const timeout1 = setTimeout(initCanvas, 100);
    const timeout2 = setTimeout(initCanvas, 300);
    const timeout3 = setTimeout(initCanvas, 500);

    // Mouse event handlers with better reliability
    const handleMouseMove = (e: MouseEvent) => {
      try {
        const rect = canvas.getBoundingClientRect();
        mousePosition.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        // Ensure we're hovering when mouse moves
        if (!isHovering.current) {
          isHovering.current = true;
        }
      } catch (error) {
        if (isDev) {
          console.warn('Error in mouse move handler:', error);
        }
      }
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      mousePosition.current = { x: -1, y: -1 };
    };

    // Also add mouse events to parent container for better coverage
    const handleParentMouseEnter = () => {
      isHovering.current = true;
    };

    const handleParentMouseLeave = () => {
      isHovering.current = false;
      mousePosition.current = { x: -1, y: -1 };
    };

    const handleParentMouseMove = (e: MouseEvent) => {
      try {
        const rect = canvas.getBoundingClientRect();
        mousePosition.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        isHovering.current = true;
      } catch (error) {
        if (isDev) {
          console.warn('Error in parent mouse move handler:', error);
        }
      }
    };

    // Simple resize handler without debouncing
    const handleResize = () => {
      initCanvas();
    };

    // Add events to both canvas and parent for better reliability
    const parent = canvas.parentElement;
    
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    
    if (parent) {
      parent.addEventListener('mouseenter', handleParentMouseEnter, { passive: true });
      parent.addEventListener('mouseleave', handleParentMouseLeave, { passive: true });
      parent.addEventListener('mousemove', handleParentMouseMove, { passive: true });
    }
    
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      
      if (parent) {
        parent.removeEventListener('mouseenter', handleParentMouseEnter);
        parent.removeEventListener('mouseleave', handleParentMouseLeave);
        parent.removeEventListener('mousemove', handleParentMouseMove);
      }
      
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  return (
    <div 
      className="relative w-full h-full bg-black overflow-hidden"
      style={{ 
        pointerEvents: 'auto',
        zIndex: 1
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
        style={{ 
          width: '100%', 
          height: '100%', 
          minWidth: '50px', 
          minHeight: '50px',
          pointerEvents: 'auto',
          zIndex: 2
        }}
        // Add fallback text if canvas fails
        aria-label="Animated Glitch Background"
      />
      <div className="absolute inset-0 w-full h-full cursor-pointer" style={{ zIndex: 4 }}></div>
      {outerVignette && (
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]"
          style={{ zIndex: 3 }}
        ></div>
      )}
      {centerVignette && (
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"
          style={{ zIndex: 3 }}
        ></div>
      )}
    </div>
  );
};

export default LetterGlitch;
