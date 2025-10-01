import React from 'react'

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T
  className?: string
  children?: React.ReactNode
  color?: string
  speed?: React.CSSProperties['animationDuration']
  thickness?: number
}

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button'

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] cursor-pointer`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        cursor: 'pointer',
        ...(rest as any).style,
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-[1]"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-[1]"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className={`relative z-[10] bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white hover:text-[#ccff00] hover:shadow-[0_0_20px_rgba(204,255,0,0.8)] text-center rounded-[20px] hover:border-robinhood transition-all duration-300 ${className}`}
      >
        <span className="relative z-[20] hover:drop-shadow-[0_0_8px_rgba(204,255,0,1)]">
          {children}
        </span>
      </div>
    </Component>
  )
}

export default StarBorder
