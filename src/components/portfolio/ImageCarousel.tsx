'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageCarouselProps {
  screenshots: string[]
  title: string
  categoryColor?: string
}

const ImageCarousel = ({ screenshots, title, categoryColor = '#4CD787' }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [imageDimensions, setImageDimensions] = useState<{
    [key: number]: { width: number; height: number; isHorizontal: boolean }
  }>({})
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Reset on image load to get dimensions
  const handleImageLoad = useCallback((index: number, width: number, height: number) => {
    const isHorizontal = width > height
    setImageDimensions((prev) => ({
      ...prev,
      [index]: { width, height, isHorizontal },
    }))
  }, [])

  const currentImage = screenshots[currentIndex]
  const isHorizontal = imageDimensions[currentIndex]?.isHorizontal ?? false

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
  }, [screenshots.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }, [screenshots.length])

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  if (!isMounted || screenshots.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">App Screenshots</h3>

      {/* Main Carousel Container */}
      <div className="relative w-full group">
        {/* Background Blur Effect for Horizontal Images */}
        {currentImage && isHorizontal && (
          <div
            className="absolute inset-0 pointer-events-none z-0 rounded-2xl overflow-hidden"
            style={{
              background: `url(${currentImage}) center/cover no-repeat`,
            }}
          >
            <div className="absolute inset-0 backdrop-blur-2xl bg-black/40" />
          </div>
        )}

        {/* Main Image Display */}
        <div
          className={`relative w-full max-w-xl mx-auto overflow-hidden border border-white/10 bg-black/40 transition-all duration-500 rounded-2xl ${
            isHorizontal ? 'aspect-video' : 'max-h-[420px] sm:max-h-[480px] md:max-h-[520px]'
          }`}
        >
          <AnimatePresence mode="wait">
            {currentImage && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt={`${title} screenshot ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                  priority={currentIndex === 0}
                  onLoadingComplete={(result) => {
                    if (result.naturalWidth && result.naturalHeight) {
                      handleImageLoad(currentIndex, result.naturalWidth, result.naturalHeight)
                    }
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Arrows - Overlay on Image */}
          {screenshots.length > 1 && (
            <>
              {/* Left Navigation Button */}
              <motion.button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Previous screenshot"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="p-3 sm:p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/40 text-white shadow-xl hover:bg-black/70 hover:border-white/60 transition-all duration-300">
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
                </div>
              </motion.button>

              {/* Right Navigation Button */}
              <motion.button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Next screenshot"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="p-3 sm:p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/40 text-white shadow-xl hover:bg-black/70 hover:border-white/60 transition-all duration-300">
                  <ChevronRight size={24} className="sm:w-7 sm:h-7" />
                </div>
              </motion.button>
            </>
          )}

          {/* Screenshot Counter */}
          {screenshots.length > 1 && (
            <motion.div
              className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-white text-xs font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentIndex + 1} / {screenshots.length}
            </motion.div>
          )}
        </div>

        {/* Thumbnail Navigation - Beautiful Grid with Enhanced UX */}
        {screenshots.length > 1 && (
          <motion.div
            className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 flex-wrap px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {screenshots.map((screenshot, index) => (
              <motion.button
                key={index}
                onClick={() => goToIndex(index)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  currentIndex === index
                    ? 'scale-110 border-white shadow-lg shadow-white/40'
                    : 'border-white/20 hover:border-white/50 hover:scale-105'
                }`}
                style={{
                  width: 'clamp(40px, 8vw, 52px)',
                  height: 'clamp(40px, 8vw, 52px)',
                }}
                whileHover={{ scale: currentIndex === index ? 1.1 : 1.12 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View screenshot ${index + 1}`}
              >
                <div className="relative w-full h-full bg-black/40">
                  <Image
                    src={screenshot}
                    alt={`${title} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="52px"
                  />
                </div>

                {/* Active Indicator Glow */}
                {currentIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      border: `2px solid ${categoryColor}`,
                      boxShadow: `0 0 12px ${categoryColor}60, inset 0 0 12px ${categoryColor}40`,
                      pointerEvents: 'none',
                    }}
                    layoutId="carouselIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Progress Indicator Bar */}
        {screenshots.length > 1 && (
          <motion.div className="mt-2.5 flex gap-0.5 justify-center h-0.5 rounded-full overflow-hidden bg-white/10 p-0.5 max-w-xs mx-auto">
            {screenshots.map((_, index) => (
              <motion.div
                key={index}
                className="flex-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    index === currentIndex ? categoryColor : 'rgba(255, 255, 255, 0.2)',
                  opacity: index === currentIndex ? 1 : 0.6,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ImageCarousel
