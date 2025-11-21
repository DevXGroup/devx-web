'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

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
}

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Our Story',
  fontFamily = 'var(--font-ibm-plex-mono)',
  fontUrl = '',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  strokeWidth = 2,
  className = '',
  minFontSize = 24,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const spansRef = useRef<(HTMLSpanElement | null)[]>([])

  const mouseRef = useRef({ x: 0, y: 0 })
  const cursorRef = useRef({ x: 0, y: 0 })

  const [fontSize, setFontSize] = useState(minFontSize)
  const [scaleY, setScaleY] = useState(1)
  const [lineHeight, setLineHeight] = useState(1)

  const normalizedText = (text ?? '').replace(/&nbsp;/g, '\u00A0')
  const chars = normalizedText.split('')

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = b.x - a.x
    const dy = b.y - a.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  useEffect(() => {
    const updateCursor = (x: number, y: number) => {
      cursorRef.current.x = x
      cursorRef.current.y = y
    }

    const recenterCursor = () => {
      if (!containerRef.current) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      updateCursor(centerX, centerY)
      mouseRef.current.x = centerX
      mouseRef.current.y = centerY
    }

    const handleMouseMove = (e: MouseEvent) => {
      updateCursor(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      updateCursor(t.clientX, t.clientY)
    }

    const handleMouseLeave = () => {
      recenterCursor()
    }

    const node = containerRef.current
    const touchOptions: AddEventListenerOptions = { passive: false }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, touchOptions)
    node?.addEventListener('mousemove', handleMouseMove)
    node?.addEventListener('touchmove', handleTouchMove, touchOptions)
    node?.addEventListener('mouseleave', handleMouseLeave)

    recenterCursor()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove, touchOptions)
      node?.removeEventListener('mousemove', handleMouseMove)
      node?.removeEventListener('touchmove', handleTouchMove, touchOptions)
      node?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect()
    const charCount = chars.length || 1

    let newFontSize = containerW / (charCount / 2)
    newFontSize = Math.max(newFontSize, minFontSize)

    setFontSize(newFontSize)
    setScaleY(1)
    setLineHeight(1)

    requestAnimationFrame(() => {
      if (!titleRef.current) return
      const textRect = titleRef.current.getBoundingClientRect()

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height
        setScaleY(yRatio)
        setLineHeight(yRatio)
      }
    })
  }, [chars.length, minFontSize, scale])

  useEffect(() => {
    setSize()
    window.addEventListener('resize', setSize)
    return () => window.removeEventListener('resize', setSize)
  }, [setSize])

  useEffect(() => {
    let rafId: number
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect()
        const maxDist = titleRect.width / 2 || 1

        spansRef.current.forEach((span) => {
          if (!span) return

          const rect = span.getBoundingClientRect()
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          }

          const d = dist(mouseRef.current, charCenter)

          const getAttr = (distance: number, minVal: number, maxVal: number) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist)
            return Math.max(minVal, val + minVal)
          }

          const wdth = width ? Math.floor(getAttr(d, 95, 200)) : 100
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400
          const italVal = italic ? getAttr(d, 0, 1) : 0
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : '1'

          span.style.opacity = alphaVal
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal.toFixed(
            2
          )}`
          span.style.fontWeight = `${Math.min(900, Math.max(100, wght))}`

          const widthScale = width ? Math.min(1.4, Math.max(0.6, wdth / 100)) : 1
          const skewDeg = italic ? italVal * 12 : 0
          span.style.transform = `scaleX(${widthScale.toFixed(2)}) skewX(${skewDeg.toFixed(2)}deg)`
          span.style.display = 'inline-block'
          if (flex) {
            const flexGrow = Math.max(0.25, wdth / 160)
            span.style.flexGrow = flexGrow.toFixed(2)
            span.style.flexBasis = 'auto'
          } else {
            span.style.flexGrow = ''
            span.style.flexBasis = ''
          }
        })
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(rafId)
  }, [width, weight, italic, alpha, chars.length, flex])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-transparent">
      <style>{`
        ${
          fontUrl
            ? `@font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }`
            : ''
        }
        .text-pressure-title span {
          font-family: inherit !important;
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
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${className} ${
          flex ? 'flex justify-between' : ''
        } ${stroke ? 'stroke' : ''} uppercase text-center`}
        style={{
          fontFamily,
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor,
          ...(flex
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }
            : {}),
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
