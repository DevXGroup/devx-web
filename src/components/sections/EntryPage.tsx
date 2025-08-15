'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Concentrated Letter Glitch Background Effect
const LetterGlitch = ({
  glitchColors = ['#00ff41', '#008f11', '#004d0a'],
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
}) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const letters = useRef([])
  const grid = useRef({ columns: 0, rows: 0 })
  const context = useRef(null)
  const lastGlitchTime = useRef(Date.now())

  const fontSize = 15
  const charWidth = 10
  const charHeight = 20

  const lettersAndSymbols = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '!',
    '@',
    '#',
    '$',
    '&',
    '*',
    '(',
    ')',
    '-',
    '_',
    '+',
    '=',
    '/',
    '[',
    ']',
    '{',
    '}',
    ';',
    ':',
    '<',
    '>',
    ',',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '?',
    '/',
  ]

  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
  }

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)]
  }

  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    }
    return `rgb(${result.r}, ${result.g}, ${result.b})`
  }

  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth)
    const rows = Math.ceil(height / charHeight)
    return { columns, rows }
  }

  const initializeLetters = (columns, rows) => {
    grid.current = { columns, rows }
    const totalLetters = columns * rows
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }))
  }

  const resizeCanvas = () => {
    try {
      const canvas = canvasRef.current
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return

      const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
      const rect = parent.getBoundingClientRect()

      if (rect.width <= 0 || rect.height <= 0) return

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      if (context.current) {
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      const { columns, rows } = calculateGrid(rect.width, rect.height)
      initializeLetters(columns, rows)

      drawLetters()
    } catch (error) {
      console.warn('Canvas resize error:', error)
    }
  }

  const drawLetters = () => {
    try {
      if (!context.current || letters.current.length === 0 || !canvasRef.current) return
      const ctx = context.current
      const rect = canvasRef.current.getBoundingClientRect()
      const { width, height } = rect

      if (width <= 0 || height <= 0) return

      ctx.clearRect(0, 0, width, height)
      ctx.font = `${fontSize}px monospace`
      ctx.textBaseline = 'top'

      letters.current.forEach((letter, index) => {
        const x = (index % grid.current.columns) * charWidth
        const y = Math.floor(index / grid.current.columns) * charHeight
        // Dim the background letters to make text more prominent
        ctx.globalAlpha = 0.3
        ctx.fillStyle = letter.color
        ctx.fillText(letter.char, x, y)
      })
      // Reset alpha for other elements
      ctx.globalAlpha = 1
    } catch (error) {
      console.warn('Canvas draw error:', error)
    }
  }

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05))

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length)
      if (!letters.current[index]) continue

      letters.current[index].char = getRandomChar()
      letters.current[index].targetColor = getRandomColor()

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor
        letters.current[index].colorProgress = 1
      } else {
        letters.current[index].colorProgress = 0
      }
    }
  }

  const handleSmoothTransitions = () => {
    let needsRedraw = false
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05
        if (letter.colorProgress > 1) letter.colorProgress = 1

        const startRgb = hexToRgb(letter.color)
        const endRgb = hexToRgb(letter.targetColor)
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress)
          needsRedraw = true
        }
      }
    })

    if (needsRedraw) {
      drawLetters()
    }
  }

  const animate = () => {
    const now = Date.now()
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters()
      drawLetters()
      lastGlitchTime.current = now
    }

    if (smooth) {
      handleSmoothTransitions()
    }

    if (typeof window !== 'undefined') {
      animationRef.current = requestAnimationFrame(animate)
    }
  }

  useEffect(() => {
    try {
      const canvas = canvasRef.current
      if (!canvas) return

      context.current = canvas.getContext('2d')
      if (!context.current) return

      resizeCanvas()
      animate()

      let resizeTimeout

      const handleResize = () => {
        try {
          clearTimeout(resizeTimeout)
          resizeTimeout = setTimeout(() => {
            if (animationRef.current && typeof window !== 'undefined') {
              cancelAnimationFrame(animationRef.current)
            }
            resizeCanvas()
            animate()
          }, 100)
        } catch (error) {
          console.warn('Resize handler error:', error)
        }
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize)
      }

      return () => {
        if (animationRef.current && typeof window !== 'undefined') {
          cancelAnimationFrame(animationRef.current)
        }
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', handleResize)
        }
        if (resizeTimeout) {
          clearTimeout(resizeTimeout)
        }
      }
    } catch (error) {
      console.warn('Canvas initialization error:', error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth])

  return (
    <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {outerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]"></div>
      )}
      {centerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"></div>
      )}
    </div>
  )
}

// Decrypted text animation for DevX Group LLC
function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',
  onComplete,
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    let interval
    let currentIteration = 0

    const getNextIndex = (revealedSet) => {
      const textLength = text.length
      switch (revealDirection) {
        case 'start':
          return revealedSet.size
        case 'end':
          return textLength - 1 - revealedSet.size
        case 'center': {
          const middle = Math.floor(textLength / 2)
          const offset = Math.floor(revealedSet.size / 2)
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i
          }
          return 0
        }
        default:
          return revealedSet.size
      }
    }

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('')

    const shuffleText = (originalText, currentRevealed) => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split('').map((char, i) => ({
          char,
          isSpace: char === ' ',
          index: i,
          isRevealed: currentRevealed.has(i),
        }))

        const nonSpaceChars = positions
          .filter((p) => !p.isSpace && !p.isRevealed)
          .map((p) => p.char)

        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]]
        }

        let charIndex = 0
        return positions
          .map((p) => {
            if (p.isSpace) return ' '
            if (p.isRevealed) return originalText[p.index]
            return nonSpaceChars[charIndex++]
          })
          .join('')
      } else {
        return originalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (currentRevealed.has(i)) return originalText[i]
            return availableChars[Math.floor(Math.random() * availableChars.length)]
          })
          .join('')
      }
    }

    if (isAnimating) {
      setIsScrambling(true)
      interval = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed)
              const newRevealed = new Set(prevRevealed)
              newRevealed.add(nextIndex)
              setDisplayText(shuffleText(text, newRevealed))
              return newRevealed
            } else {
              clearInterval(interval)
              setIsScrambling(false)
              setTimeout(() => onComplete && onComplete(), 800)
              return prevRevealed
            }
          } else {
            setDisplayText(shuffleText(text, prevRevealed))
            currentIteration++
            if (currentIteration >= maxIterations) {
              clearInterval(interval)
              setIsScrambling(false)
              setDisplayText(text)
              setTimeout(() => onComplete && onComplete(), 800)
            }
            return prevRevealed
          }
        })
      }, speed)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [
    isAnimating,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
    onComplete,
  ])

  useEffect(() => {
    if (animateOn !== 'view') return

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsAnimating(true)
          setHasAnimated(true)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [animateOn, hasAnimated])

  const isComplete = revealedIndices.size === text.length && !isScrambling

  return (
    <div className="relative z-10 flex items-center justify-center min-h-[80px]">
      <motion.h1
        ref={containerRef}
        className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-mono text-center"
        style={{
          fontFamily: "'IBM Plex Mono', 'SF Pro Display', 'Helvetica Neue', sans-serif",
          fontWeight: 600,
          letterSpacing: '0.1em',
          minWidth: '300px',
          height: '1.2em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        <span className="sr-only">{text}</span>
        <motion.span
          aria-hidden="true"
          className="inline-block"
          animate={{
            color: isComplete ? '#ffffff' : '#cccccc',
          }}
          transition={{
            color: { duration: isComplete ? 0.8 : 0 },
          }}
          style={{
            textShadow: isComplete
              ? '0 0 20px rgba(255,255,255,0.6), 0 0 10px rgba(255,255,255,0.4)'
              : 'none',
          }}
        >
          {displayText.split('').map((char, index) => {
            const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isAnimating

            return (
              <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
                {char}
              </span>
            )
          })}
        </motion.span>
      </motion.h1>
    </div>
  )
}

// Enhanced star field component with more realistic distribution
function StarField() {
  const stars = Array.from({ length: 300 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.8 + 0.4,
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 3,
    twinkleIntensity: Math.random() * 0.6 + 0.4,
    isFlashing: Math.random() < 0.3, // 30% of stars will have flashing effect
    flashDuration: Math.random() * 3 + 2,
    flashDelay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,0.8)`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            star.isFlashing
              ? {
                  // Flashing stars: turn completely on and off
                  opacity: [0, star.opacity, star.opacity, 0, 0, star.opacity],
                  scale: [0.5, 1.3, 1.3, 0.3, 0.3, 1.3],
                }
              : {
                  // Regular twinkling stars
                  opacity: [
                    0,
                    star.opacity * star.twinkleIntensity,
                    star.opacity,
                    0.1,
                    star.opacity,
                    0,
                  ],
                  scale: [0.5, 1.2, 1, 0.8, 1.1, 0.5],
                }
          }
          transition={{
            duration: star.isFlashing ? star.flashDuration : star.duration,
            repeat: Infinity,
            delay: star.isFlashing ? star.flashDelay : star.delay,
            ease: star.isFlashing ? 'easeInOut' : 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Animation sequence without zoom
function AnimatedInfinity({ onComplete }: { onComplete: () => void }) {
  const [animationPhase, setAnimationPhase] = useState<'drawing' | 'text'>('drawing')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDrawingComplete = () => {
    setTimeout(() => setAnimationPhase('text'), 200)
  }

  const handleTextComplete = () => {
    setTimeout(onComplete, 400)
  }

  if (!mounted) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Drawing Phase - Infinity Symbol */}
      {animationPhase === 'drawing' && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center"
        >
          <svg width="200" height="100" viewBox="0 0 200 100" className="relative z-10">
            <defs>
              {/* White glow effect */}
              <filter id="infinityGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.path
              d="M50 50 C50 25, 75 25, 100 50 C125 75, 150 75, 150 50 C150 25, 125 25, 100 50 C75 75, 50 75, 50 50"
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#infinityGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                onComplete: handleDrawingComplete,
              }}
            />
          </svg>
        </motion.div>
      )}

      {/* Text Phase - DevX Group LLC with Loading Animation */}
      {animationPhase === 'text' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center relative z-10"
        >
          <motion.div
            initial={{ filter: 'blur(8px)', opacity: 0.3 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <DecryptedText
              text="DevX Group LLC"
              speed={60}
              sequential={true}
              revealDirection="start"
              animateOn="view"
              onComplete={handleTextComplete}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default function EntryPage() {
  const [mounted, setMounted] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isCollapsing, setIsCollapsing] = useState(false)
  const router = useRouter()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (animationComplete) {
      // Start collapse animation immediately
      setIsCollapsing(true)
      // Navigate after collapse animation completes
      setTimeout(() => {
        router.push('/home')
      }, 400)
    }
  }, [animationComplete, router])

  // Skip animation if user prefers reduced motion
  useEffect(() => {
    if (reduceMotion && mounted) {
      const timer = setTimeout(() => {
        router.push('/home')
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [reduceMotion, mounted, router])

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (reduceMotion) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <StarField />
      <LetterGlitch
        glitchColors={['#4CD787', '#FFD700', '#9d4edd', '#4834D4', '#00ff41', '#008f11']}
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
      <AnimatedInfinity onComplete={() => setAnimationComplete(true)} />

      {/* Shutter Collapse Animation - Top and Bottom bars */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] w-full"
        style={{
          background: '#000000',
          boxShadow: '0 4px 20px rgba(0,0,0,0.8)',
          minHeight: 0,
          willChange: 'height',
        }}
        initial={{ height: 0 }}
        animate={{ height: isCollapsing ? '50vh' : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[100] w-full"
        style={{
          background: '#000000',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.8)',
          minHeight: 0,
          willChange: 'height',
        }}
        initial={{ height: 0 }}
        animate={{ height: isCollapsing ? '50vh' : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
    </div>
  )
}
