import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  delay?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, delay = 0, className = '' }) => {
  const animationDuration = `${speed}s`;
  const animationDelay = `${delay}s`;

  return (
    <div
      className={`text-[#b5b5b5a4] bg-clip-text inline-block transition-colors duration-300 hover:text-[#ccff00] ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
        animationDelay: animationDelay
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;