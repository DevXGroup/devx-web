import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        xs: '475px',
      },
      fontFamily: {
        mono: ['var(--font-ibm-plex-mono)', 'ui-monospace', 'SF Mono', 'monospace'],
        sans: ['var(--font-ibm-plex-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'playwrite-cu': ['var(--font-playwrite-cu)', 'cursive'],
        editorial: ['"Playfair Display"', 'serif'],
        creative: ['var(--font-pacifico)', '"Pacifico"', 'cursive'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        robinhood: '#ccff00',
        'theme-gold': '#FFD700',
        'theme-green': '#4CD787',
        'theme-purple': '#9d4edd',
        'theme-blue': '#4834D4',
      },
      scale: {
        120: '1.2',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'star-movement-bottom': 'star-movement-bottom linear infinite',
        'star-movement-top': 'star-movement-top linear infinite',
        shine: 'shine 5s linear infinite',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%': { transform: 'translate(200%, 0%) scale(0.8)', opacity: '0.3' },
          '25%': { transform: 'translate(100%, -20%) scale(1)', opacity: '1' },
          '50%': { transform: 'translate(0%, -40%) scale(1.2)', opacity: '1' },
          '75%': { transform: 'translate(-100%, -20%) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(-200%, 0%) scale(0.8)', opacity: '0.3' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(-200%, 0%) scale(0.8)', opacity: '0.3' },
          '25%': { transform: 'translate(-100%, 20%) scale(1)', opacity: '1' },
          '50%': { transform: 'translate(0%, 40%) scale(1.2)', opacity: '1' },
          '75%': { transform: 'translate(100%, 20%) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(200%, 0%) scale(0.8)', opacity: '0.3' },
        },
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
