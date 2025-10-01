import { useEffect, useRef, useState, useCallback } from 'react'

interface TextPressureProps {
  text?: string
  fontFamily?: string
  fontUrl?: string
  width?: boolean
  weight?: boolean
  italic?: boolean
  alpha?: boolean
  flex?: boolean
  stroke?: boolean
  scale?: boolean
  textColor?: string
  strokeColor?: string
  strokeWidth?: number
  className?: string
  minFontSize?: number
  letterSpacing?: string
}

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Our Story',
  fontFamily = 'IBM Plex Mono',
  // fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
  fontUrl = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#',
  strokeColor = '#FFFFFF',
  strokeWidth = 2,
  className = '',
  minFontSize = 24,
  letterSpacing = 'normal',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const spansRef = useRef<(HTMLSpanElement | null)[]>([])

  const mouseRef = useRef({ x: 0, y: 0 })
  const cursorRef = useRef({ x: 0, y: 0 })

  const [fontSize, setFontSize] = useState(minFontSize)
  const [scaleY, setScaleY] = useState(1)
  const [lineHeight, setLineHeight] = useState(1)

  const chars = text.split('')

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = b.x - a.x
    const dy = b.y - a.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX
      cursorRef.current.y = e.clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) {
        cursorRef.current.x = t.clientX
        cursorRef.current.y = t.clientY
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    if (containerRef.current) {
      try {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        mouseRef.current.x = left + width / 2
        mouseRef.current.y = top + height / 2
        cursorRef.current.x = mouseRef.current.x
        cursorRef.current.y = mouseRef.current.y
      } catch (error) {
        console.warn('TextPressure: Could not get container bounds', error)
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return

    let containerW = 300, containerH = 100
    try {
      const rect = containerRef.current.getBoundingClientRect()
      containerW = rect.width
      containerH = rect.height
    } catch (error) {
      console.warn('TextPressure: Could not get container dimensions', error)
    }

    let newFontSize = containerW / (chars.length / 2)
    newFontSize = Math.max(newFontSize, minFontSize)

    setFontSize(newFontSize)
    setScaleY(1)
    setLineHeight(1)

    requestAnimationFrame(() => {
      if (!titleRef.current) return
      try {
        const textRect = titleRef.current.getBoundingClientRect()
        if (scale && textRect.height > 0) {
          const yRatio = containerH / textRect.height
          setScaleY(yRatio)
          setLineHeight(yRatio)
        }
      } catch (error) {
        console.warn('TextPressure: Could not get title dimensions', error)
      }
    })
  }, [chars.length, minFontSize, scale])

  useEffect(() => {
    // Force immediate sizing on mount and after a short delay for Safari
    setSize()
    const timeoutId = setTimeout(() => {
      setSize()
    }, 100)

    window.addEventListener('resize', setSize)
    return () => {
      window.removeEventListener('resize', setSize)
      clearTimeout(timeoutId)
    }
  }, [scale, text, setSize])

  useEffect(() => {
    let rafId: number
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15

      if (titleRef.current) {
        let titleRect = { width: 300, height: 100, x: 0, y: 0 }
        try {
          titleRect = titleRef.current.getBoundingClientRect()
        } catch (error) {
          console.warn('TextPressure: Could not get title rect for animation', error)
        }
        const maxDist = titleRect.width / 2

        spansRef.current.forEach((span) => {
          if (!span) return

          let rect = { x: 0, y: 0, width: 20, height: 20 }
          try {
            rect = span.getBoundingClientRect()
          } catch (error) {
            console.warn('TextPressure: Could not get span rect', error)
            return
          }

          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          }

          const d = dist(mouseRef.current, charCenter)

          const getAttr = (distance: number, minVal: number, maxVal: number) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist)
            return Math.max(minVal, val + minVal)
          }

          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : '0'
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : '1'

          span.style.opacity = alphaVal
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`
        })
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(rafId)
  }, [width, weight, italic, alpha, chars.length])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-transparent">
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }
        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
        .text-pressure-title {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${className} ${
          stroke ? 'stroke' : ''
        } uppercase text-center`}
        style={{
          fontFamily,
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center center',
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor,
          letterSpacing: letterSpacing,
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el
            }}
            data-char={char}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  )
}

export default TextPressure
