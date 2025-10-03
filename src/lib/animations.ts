/**
 * Global animation variants for consistent, smooth animations across the site
 * Use these instead of creating custom variants to maintain consistency
 */

// Smooth slide-in animation for cards (no flash/scale)
export const cardSlideVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth motion
    },
  },
}

// Faster slide-in for performance-critical sections
export const cardSlideFastVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// Fade-in only (no movement)
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

// Container stagger for child animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Smooth scale for hover effects (not initial animations)
export const hoverScaleVariants = {
  scale: 1.02,
  transition: { duration: 0.3, ease: 'easeOut' },
}
