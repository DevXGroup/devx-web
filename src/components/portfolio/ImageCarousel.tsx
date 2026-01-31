'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageCarouselProps {
  screenshots: string[]
  title: string
  categoryColor?: string
  screenshotAlts?: string[] | undefined
}

interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
}

const ImageCarousel = ({
  screenshots,
  title,
  categoryColor = '#4CD787',
  screenshotAlts,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [imageDimensions, setImageDimensions] = useState<Record<string, ImageDimensions>>({})
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  // Filter valid screenshots
  const validScreenshots = useMemo(() => {
    return screenshots.filter((src) => src && src.trim() !== '' && !failedImages.has(src))
  }, [screenshots, failedImages])

  // Reset index if it goes out of bounds due to filtering
  useEffect(() => {
    if (currentIndex >= validScreenshots.length && validScreenshots.length > 0) {
      setCurrentIndex(0)
    }
  }, [validScreenshots.length, currentIndex])

  // Swipe threshold for touch gestures
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Preload adjacent images and detect dimensions
  const preloadedImages = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!isMounted || validScreenshots.length === 0) return

    const indicesToPreload = [
      currentIndex,
      (currentIndex - 1 + validScreenshots.length) % validScreenshots.length,
      (currentIndex + 1) % validScreenshots.length,
    ]

    indicesToPreload.forEach((index) => {
      const src = validScreenshots[index]
      if (src && !preloadedImages.current.has(src)) {
        const img = new window.Image()
        img.onload = () => {
          setImageDimensions((prev) => ({
            ...prev,
            [src]: {
              width: img.naturalWidth,
              height: img.naturalHeight,
              aspectRatio: img.naturalWidth / img.naturalHeight,
            },
          }))
        }
        img.onerror = () => {
          setFailedImages((prev) => new Set(prev).add(src))
        }
        img.src = src
        preloadedImages.current.add(src)
      }
    })
  }, [currentIndex, validScreenshots, isMounted])

  const currentImage = validScreenshots[currentIndex]!
  // Default to 16/9 if dimensions not yet loaded
  const currentAspectRatio = imageDimensions[currentImage]?.aspectRatio ?? 16 / 9
  const isHorizontal = currentAspectRatio > 1

  const goToPrevious = useCallback(() => {
    if (isAnimating || validScreenshots.length <= 1) return
    setDirection(-1)
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? validScreenshots.length - 1 : prev - 1))
  }, [validScreenshots.length, isAnimating])

  const goToNext = useCallback(() => {
    if (isAnimating || validScreenshots.length <= 1) return
    setDirection(1)
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % validScreenshots.length)
  }, [validScreenshots.length, isAnimating])

  const goToIndex = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return
      setDirection(index > currentIndex ? 1 : -1)
      setIsAnimating(true)
      setCurrentIndex(index)
    },
    [currentIndex, isAnimating]
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  if (!isMounted || validScreenshots.length === 0) return null

  // Slide animation variants - smoother
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
        filter: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.9,
      filter: 'blur(4px)',
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">App Screenshots</h3>

      {/* Main Carousel Container */}
      <div className="relative w-full">
        {/* Main Image Display with Navigation Arrows */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow */}
          {validScreenshots.length > 1 && (
            <motion.button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white transition-colors duration-200 cursor-pointer backdrop-blur-md border border-white/10"
              aria-label="Previous screenshot"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isAnimating}
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </motion.button>
          )}

          {/* Image Container - Smooth resize */}
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl bg-neutral-900 border border-white/5"
            animate={{
              height: isHorizontal ? 'auto' : '70vh',
              aspectRatio: isHorizontal ? '16/9' : '3/4',
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 25,
            }}
            style={{
              maxHeight: '80vh',
            }}
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center w-full h-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)
                  if (swipe < -swipeConfidenceThreshold) {
                    goToNext()
                  } else if (swipe > swipeConfidenceThreshold) {
                    goToPrevious()
                  }
                }}
              >
                {currentImage && (
                  <Image
                    src={currentImage}
                    alt={
                      screenshotAlts?.[currentIndex] || `${title} screenshot ${currentIndex + 1}`
                    }
                    fill
                    className="object-contain"
                    priority={currentIndex === 0}
                    draggable={false}
                    onError={() => {
                      setFailedImages((prev) => new Set(prev).add(currentImage))
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Screenshot Counter */}
            {validScreenshots.length > 1 && (
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-medium z-10 backdrop-blur-md border border-white/10">
                {currentIndex + 1} / {validScreenshots.length}
              </div>
            )}
          </motion.div>

          {/* Right Arrow */}
          {validScreenshots.length > 1 && (
            <motion.button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white transition-colors duration-200 cursor-pointer backdrop-blur-md border border-white/10"
              aria-label="Next screenshot"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isAnimating}
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </motion.button>
          )}
        </div>

        {/* Progress Dots */}
        {validScreenshots.length > 1 && (
          <div className="hidden md:flex justify-center gap-2 mt-4 flex-wrap px-4">
            {validScreenshots.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToIndex(index)}
                className="rounded-full transition-colors duration-200 touch-manipulation h-1.5"
                style={{
                  backgroundColor: index === currentIndex ? categoryColor : 'rgba(255,255,255,0.2)',
                }}
                animate={{
                  width: index === currentIndex ? 24 : 8,
                }}
                whileHover={{
                  backgroundColor: index === currentIndex ? categoryColor : 'rgba(255,255,255,0.4)',
                  scale: 1.1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                aria-label={`Go to screenshot ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageCarousel
