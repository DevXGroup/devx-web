import React from "react";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties['animationDuration'];
    thickness?: number;
  }

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component 
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`} 
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style,
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div 
        className="relative z-1 border border-gray-800 text-center text-[14px] py-[10px] px-[18px] rounded-[20px] transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,15,15,0.95) 50%, rgba(0,0,0,0.9) 100%), radial-gradient(circle at center, ${color}25, transparent 60%)`,
          backdropFilter: 'blur(2px)',
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px ${color}20`
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;