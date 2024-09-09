'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

interface GalleryProps {
  imagesH: string[]
  imagesV: string[]
}

export default function Gallery({ imagesH, imagesV }: GalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLandscape, setIsLandscape] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth / window.innerHeight > 1)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % (isLandscape ? imagesH.length : imagesV.length))
    }, 3000)

    return () => clearInterval(interval)
  }, [imagesH.length, imagesV.length, isLandscape])

  const currentImages = isLandscape ? imagesH : imagesV

  return (
    <div className="w-screen h-screen relative overflow-hidden z-0">
      {currentImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={src} alt={`Gallery image ${index + 1}`} fill style={{ objectFit: 'cover' }} />
        </div>
      ))}
    </div>
  )
}
