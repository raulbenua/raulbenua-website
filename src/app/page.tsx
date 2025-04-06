'use client'

import { useCallback, useEffect, useState } from 'react'

import Footer from '@/app/components/Footer'
import Gallery from '@/app/components/Gallery'
import Header from '@/app/components/Header'
import ProgressBar from '@/app/components/ProgressBar'
import { motion } from 'framer-motion'

export default function Home() {
  const [content, setContent] = useState<{ imagesH: string[]; imagesV: string[] } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const preloadImages = useCallback(async (urls: string[]): Promise<void> => {
    const totalImages = urls.length
    if (totalImages === 0) return

    let loadedImages = 0

    await Promise.allSettled(
      urls.map(
        (url) =>
          new Promise<void>((resolve) => {
            const img = new Image()
            img.src = url
            img.onload = () => {
              loadedImages++
              setLoadingProgress((loadedImages / totalImages) * 100)
              resolve()
            }
            img.onerror = () => {
              console.error(`Failed to load image: ${url}`)
              loadedImages++
              setLoadingProgress((loadedImages / totalImages) * 100)
              resolve()
            }
          })
      )
    )

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }, [])

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/content.json')
        if (!response.ok) throw new Error('Error al cargar el contenido')
        const data = await response.json()
        setContent(data)

        const urls = [...data.imagesH, ...data.imagesV]
        await preloadImages(urls)
      } catch (error) {
        console.error('Error:', error)
        setError('Error al cargar el contenido')
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [preloadImages])

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-center px-4">
        <p className="text-xl">{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return <ProgressBar loadingProgress={loadingProgress} />
  }

  return content ? (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
      <Header />
      <Gallery imagesH={content.imagesH} imagesV={content.imagesV} />
      <Footer />
    </motion.div>
  ) : null
}
