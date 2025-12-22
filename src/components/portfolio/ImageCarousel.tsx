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
      <div className="relative w-full">
        {/* Main Image Display */}
        <div
          className={`relative w-full max-w-xl mx-auto overflow-hidden rounded-2xl bg-neutral-900 ${
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

          {/* Screenshot Counter */}
          {screenshots.length > 1 && (
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium z-10">
              {currentIndex + 1} / {screenshots.length}
            </div>
          )}
        </div>

        {/* Navigation Arrows - Positioned outside the image */}
        {screenshots.length > 1 && (
          <>
            <motion.button
              onClick={goToPrevious}
              className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 cursor-pointer"
              aria-label="Previous screenshot"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <motion.button
              onClick={goToNext}
              className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 cursor-pointer"
              aria-label="Next screenshot"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </>
        )}

        {/* Thumbnail Navigation */}
        {screenshots.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {screenshots.map((screenshot, index) => (
              <motion.button
                key={index}
                onClick={() => goToIndex(index)}
                className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                  currentIndex === index
                    ? 'ring-2 ring-offset-2 ring-offset-black'
                    : 'opacity-50 hover:opacity-100'
                }`}
                style={{
                  ringColor: currentIndex === index ? categoryColor : undefined,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View screenshot ${index + 1}`}
              >
                <Image
                  src={screenshot}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </motion.button>
            ))}
          </div>
        )}

        {/* Progress Dots */}
        {screenshots.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'w-6' : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
                style={{
                  backgroundColor: index === currentIndex ? categoryColor : undefined,
                }}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageCarousel
