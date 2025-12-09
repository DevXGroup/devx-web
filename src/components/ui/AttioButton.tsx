'use client'

import { forwardRef } from 'react'
import { useRouter } from 'next/navigation'

type AttioButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  className?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
  [key: string]: any
}

/**
 * Attio-style button with subtle gradient and smooth hover effects
 * Primary: Green accent with gradient border
 * Secondary: Purple accent with gradient border
 */
const AttioButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AttioButtonProps>(
  (
    {
      children,
      variant = 'primary',
      href,
      onClick,
      className = '',
      target,
      rel,
      type = 'button',
      disabled = false,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const router = useRouter()
    const isPrimary = variant === 'primary'

    // Determine if this is an external link or internal navigation
    const isExternal = href && (href.startsWith('http') || href.startsWith('mailto:'))
    const isInternalLink = href && !isExternal

    // Handle click for internal navigation
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }

      if (onClick) {
        onClick()
      }

      // Handle internal navigation with Next.js router
      if (isInternalLink && !target) {
        e.preventDefault()
        router.push(href)
      }
    }

    const buttonClasses = `
      group relative inline-flex items-center justify-center
      px-6 py-3 sm:px-7 sm:py-3.5 lg:px-8 lg:py-4
      min-h-[44px] text-sm sm:text-base lg:text-lg
      font-medium tracking-wide
      rounded-xl
      overflow-hidden
      transition-all duration-300 ease-out
      bg-black/40 backdrop-blur-sm
      border-2
      ${
        isPrimary
          ? 'border-[#4CD787]/40 hover:border-[#4CD787]/60 text-white hover:bg-[#4CD787]/5'
          : 'border-[#9d4edd]/40 hover:border-[#9d4edd]/60 text-white hover:bg-[#9d4edd]/5'
      }
      hover:shadow-lg
      ${isPrimary ? 'hover:shadow-[#4CD787]/20' : 'hover:shadow-[#9d4edd]/20'}
      active:scale-[0.98]
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${className}
    `.trim()

    const gradientClasses = `
      absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
      bg-gradient-to-r
      ${
        isPrimary
          ? 'from-[#4CD787]/10 via-[#66E6A4]/5 to-[#4CD787]/10'
          : 'from-[#9d4edd]/10 via-[#c77dff]/5 to-[#9d4edd]/10'
      }
      pointer-events-none
    `.trim()

    const innerContent = (
      <>
        <span className={gradientClasses} />
        <span className="relative z-10 font-sans">{children}</span>
      </>
    )

    if (href) {
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          onClick={handleClick}
          target={isExternal ? target || '_blank' : target}
          rel={isExternal ? rel || 'noopener noreferrer' : rel}
          className={buttonClasses}
          aria-label={ariaLabel}
          {...props}
        >
          {innerContent}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        onClick={handleClick}
        type={type}
        disabled={disabled}
        className={buttonClasses}
        aria-label={ariaLabel}
        {...props}
      >
        {innerContent}
      </button>
    )
  }
)

AttioButton.displayName = 'AttioButton'

export default AttioButton
