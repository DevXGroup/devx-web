'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface SingleImageDisplayProps {
  image: string
  title: string
  categoryColor?: string
}

const SingleImageDisplay = ({
  image,
  title,
  categoryColor = '#4CD787',
}: SingleImageDisplayProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isHorizontal, setIsHorizontal] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleImageLoad = (width: number, height: number) => {
    setIsHorizontal(width > height)
  }

  if (!isMounted || !image) return null

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">App Screenshot</h3>

      {/* Background Blur Effect for Horizontal Images */}
      <div>
        {isHorizontal && (
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0"
            style={{
              background: `url(${image}) center/cover no-repeat`,
            }}
          >
            <div className="absolute inset-0 backdrop-blur-2xl bg-black/40" />
          </div>
        )}

        {/* Image Display */}
        <motion.div
          className={`relative w-full max-w-xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-black/40 transition-all duration-500 ${
            isHorizontal ? 'aspect-video' : 'max-h-[420px] sm:max-h-[480px] md:max-h-[520px]'
          }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
            priority
            onLoadingComplete={(result) => {
              if (result.naturalWidth && result.naturalHeight) {
                handleImageLoad(result.naturalWidth, result.naturalHeight)
              }
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default SingleImageDisplay
