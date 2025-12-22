'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageCarouselProps {
  screenshots: string[]
  title: string
  categoryColor?: string
}

interface ImageDimensions {
  width: number
  height: number
  isHorizontal: boolean
}

const ImageCarousel = ({ screenshots, title, categoryColor = '#4CD787' }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [imageDimensions, setImageDimensions] = useState<Record<number, ImageDimensions>>({})

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Preload adjacent images and detect dimensions
  const preloadedImages = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!isMounted) return

    const indicesToPreload = [
      currentIndex,
      (currentIndex - 1 + screenshots.length) % screenshots.length,
      (currentIndex + 1) % screenshots.length,
    ]

    indicesToPreload.forEach((index) => {
      const src = screenshots[index]
      if (src && !preloadedImages.current.has(src)) {
        const img = new window.Image()
        img.onload = () => {
          setImageDimensions((prev) => ({
            ...prev,
            [index]: {
              width: img.naturalWidth,
              height: img.naturalHeight,
              isHorizontal: img.naturalWidth > img.naturalHeight,
            },
          }))
        }
        img.src = src
        preloadedImages.current.add(src)
      }
    })
  }, [currentIndex, screenshots, isMounted])

  const currentImage = screenshots[currentIndex]
  const currentDimensions = imageDimensions[currentIndex]
  const isHorizontal = currentDimensions?.isHorizontal ?? true // Default to horizontal layout

  const goToPrevious = useCallback(() => {
    if (isAnimating) return
    setDirection(-1)
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
  }, [screenshots.length, isAnimating])

  const goToNext = useCallback(() => {
    if (isAnimating) return
    setDirection(1)
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }, [screenshots.length, isAnimating])

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

  if (!isMounted || screenshots.length === 0) return null

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
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
          {screenshots.length > 1 && (
            <motion.button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer backdrop-blur-sm"
              aria-label="Previous screenshot"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isAnimating}
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </motion.button>
          )}

          {/* Image Container - responsive sizing based on image orientation */}
          <div
            className={`relative w-full overflow-hidden rounded-2xl bg-neutral-900 ${
              isHorizontal
                ? 'max-w-full aspect-video'
                : 'max-w-2xl lg:max-w-4xl xl:max-w-5xl min-h-[50vh] lg:min-h-[60vh] xl:min-h-[70vh]'
            }`}
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="wait"
              onExitComplete={() => setIsAnimating(false)}
            >
              {currentImage && (
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`flex items-center justify-center ${
                    isHorizontal ? 'w-full h-full' : 'absolute inset-0'
                  }`}
                >
                  <Image
                    src={currentImage}
                    alt={`${title} screenshot ${currentIndex + 1}`}
                    width={1600}
                    height={900}
                    className={`object-contain rounded-2xl ${
                      isHorizontal
                        ? 'w-full h-auto'
                        : 'w-auto h-auto max-w-full max-h-[50vh] lg:max-h-[60vh] xl:max-h-[70vh]'
                    }`}
                    priority={currentIndex === 0}
                    draggable={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screenshot Counter */}
            {screenshots.length > 1 && (
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium z-10 backdrop-blur-sm">
                {currentIndex + 1} / {screenshots.length}
              </div>
            )}
          </div>

          {/* Right Arrow */}
          {screenshots.length > 1 && (
            <motion.button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer backdrop-blur-sm"
              aria-label="Next screenshot"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isAnimating}
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </motion.button>
          )}
        </div>

        {/* Progress Dots */}
        {screenshots.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {screenshots.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToIndex(index)}
                className="rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: index === currentIndex ? categoryColor : 'rgba(255,255,255,0.3)',
                }}
                animate={{
                  width: index === currentIndex ? 32 : 8,
                  height: 8,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                whileHover={{
                  backgroundColor: index === currentIndex ? categoryColor : 'rgba(255,255,255,0.5)',
                  scale: 1.1,
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
