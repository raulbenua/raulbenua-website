'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'

import Image from 'next/image'

interface GalleryProps {
  imagesH: string[]
  imagesV: string[]
}

const INTERVAL_TIME = 3000

export default function Gallery({ imagesH, imagesV }: GalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLandscape, setIsLandscape] = useState(true)

  const handleResize = useCallback(() => {
    setIsLandscape(window.innerWidth / window.innerHeight > 1)
  }, [])

  const currentImages = useMemo(() => (isLandscape ? imagesH : imagesV), [isLandscape, imagesH, imagesV])

  const intervalCallback = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % currentImages.length)
  }, [currentImages.length])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    const interval = setInterval(intervalCallback, INTERVAL_TIME)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(interval)
    }
  }, [handleResize, intervalCallback])

  return (
    <motion.div
      className="w-screen h-screen relative overflow-hidden z-0"
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImage}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={currentImages[currentImage]}
            alt={`Imagen de galería ${currentImage + 1}`}
            fill
            sizes="100vw"
            quality={85}
            style={{ objectFit: 'cover' }}
            priority
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
