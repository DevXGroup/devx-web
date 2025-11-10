interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export default function LoadingSpinner({ size = 'md', className = '', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-theme-green ${sizeClasses[size]}`}
        role="status"
        aria-label={text || 'Loading'}
      />
      {text && <p className="mt-2 text-sm text-gray-400 font-mono">{text}</p>}
    </div>
  )
}
