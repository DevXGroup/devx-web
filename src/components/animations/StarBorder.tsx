'use client'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'

type StarBorderProps = {
  className?: string
  children?: React.ReactNode
  color?: string
  speed?: React.CSSProperties['animationDuration']
  thickness?: number
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  as?: 'a' | 'button' | 'div'
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
  disabled?: boolean
  variant?: 'default' | 'hero'
}

const StarBorder = ({
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  variant = 'default',
  children,
  href,
  onClick,
  target,
  rel,
  as,
  type = 'button',
  'aria-label': ariaLabel,
  ...rest
}: StarBorderProps) => {
  const router = useRouter()

  // Memoize color calculations to prevent recalculation on every render
  const colorWithAlpha = useMemo(() => {
    // Convert color to rgba for box-shadow (20% opacity)
    const shadowColor = color === 'white' ? 'rgba(255, 255, 255, 0.2)' : `${color}33`
    // For text-shadow (50% opacity)
    const textShadowColor = color === 'white' ? 'rgba(255, 255, 255, 0.5)' : `${color}80`
    return { shadowColor, textShadowColor }
  }, [color])

  // Determine if this is an external link or internal navigation
  const isExternal = href && (href.startsWith('http') || href.startsWith('mailto:'))
  const isInternalLink = href && !isExternal
  const isHeroVariant = variant === 'hero'

  // Handle click for internal navigation
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick()
    }

    // Handle internal navigation with Next.js router
    if (isInternalLink && !target) {
      e.preventDefault()
      router.push(href)
    }
  }

  // Determine the component type
  const Component = as || (href ? 'a' : 'button')

  // Build props based on component type
  const componentProps: any = {
    className:
      'star-border-wrapper relative inline-block overflow-hidden rounded-[24px] cursor-pointer group',
    onClick: handleClick,
    style: {
      padding: `${thickness}px`,
      cursor: 'pointer !important',
      pointerEvents: 'auto',
      borderRadius: '24px',
      isolation: 'isolate',
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)',
      WebkitFontSmoothing: 'antialiased',
    },
    'aria-label': ariaLabel,
    ...rest,
  }

  if (Component === 'a' && href) {
    componentProps.href = href
    if (isExternal) {
      componentProps.target = target || '_blank'
      componentProps.rel = rel || 'noopener noreferrer'
    }
  } else if (Component === 'button') {
    componentProps.type = type
  }

  return (
    <Component {...componentProps}>
      {isHeroVariant && (
        <div className="absolute inset-[-6px] sm:inset-[-4px] rounded-[28px] bg-[radial-gradient(circle_at_center,_rgba(226,232,240,0.38),_rgba(134,239,172,0.14)_45%,_transparent_70%)] blur-[22px] sm:blur-[18px] md:blur-[16px] opacity-95 pointer-events-none -z-[1]" />
      )}

      {/* Moving Beams */}
      <div
        className={`absolute ${
          isHeroVariant ? 'w-[220%] h-[62%] opacity-95' : 'w-[200%] h-[50%] opacity-80'
        } bottom-[-20%] right-[-50%] rounded-full animate-star-movement-bottom z-0 ${
          isHeroVariant ? 'blur-[18px] sm:blur-[16px] md:blur-[14px]' : 'blur-[12px]'
        } pointer-events-none`}
        style={{
          background: `radial-gradient(circle, ${color}, transparent 50%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={`absolute ${
          isHeroVariant ? 'w-[220%] h-[62%] opacity-95' : 'w-[200%] h-[50%] opacity-80'
        } top-[-20%] left-[-50%] rounded-full animate-star-movement-top z-0 ${
          isHeroVariant ? 'blur-[18px] sm:blur-[16px] md:blur-[14px]' : 'blur-[12px]'
        } pointer-events-none`}
        style={{
          background: `radial-gradient(circle, ${color}, transparent 50%)`,
          animationDuration: speed,
        }}
      />

      {/* Inner Button Content - hover styles via Tailwind group-hover */}
      <div
        className={`relative z-10 bg-zinc-950/90 border border-white/5 text-white text-center backdrop-blur-sm transition-all duration-300 group-hover:bg-zinc-950/80 group-hover:border-white/20 cursor-pointer ${className}`}
        style={{
          // Apply box-shadow on hover via CSS variable
          ['--hover-shadow' as string]: `0 0 30px ${colorWithAlpha.shadowColor}`,
          cursor: 'pointer',
          pointerEvents: 'auto',
          borderRadius: `${24 - thickness}px`,
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      >
        <div
          className="flex items-center justify-center gap-2 w-full h-full transition-all duration-300 relative z-20 font-sans tracking-wide cursor-pointer"
          style={{
            ['--hover-text-shadow' as string]: `0 0 10px ${colorWithAlpha.textShadowColor}`,
            cursor: 'pointer',
          }}
        >
          {children}
        </div>
      </div>
    </Component>
  )
}

export default StarBorder
