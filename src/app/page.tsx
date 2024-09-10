'use client'

import { useEffect, useState } from 'react'

import Footer from '@/app/components/Footer'
import Gallery from '@/app/components/Gallery'
import Header from '@/app/components/Header'
import ProgressBar from '@/app/components/ProgressBar'
import { motion } from 'framer-motion'

export default function Home() {
  const [content, setContent] = useState<{ imagesH: string[]; imagesV: string[] } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch('/content.json')
      const data = await response.json()
      setContent(data)

      const urls = [...data.imagesH, ...data.imagesV]
      await preloadImages(urls)
      setIsLoading(false)
    }

    fetchContent()
  }, [])

  const preloadImages = (urls: string[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      let loadedImages = 0
      const totalImages = urls.length

      if (totalImages === 0) {
        resolve()
        return
      }

      urls.forEach((url) => {
        const img = new Image()
        img.src = url
        img.onload = () => {
          loadedImages++
          const progress = (loadedImages / totalImages) * 100
          setLoadingProgress(progress)
          if (loadedImages === totalImages) {
            resolve()
          }
        }
        img.onerror = reject
      })
    })
  }

  if (isLoading) {
    return <ProgressBar loadingProgress={loadingProgress} />
  }

  if (content) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
        <Header />
        <Gallery imagesH={content?.imagesH} imagesV={content?.imagesV} />
        <Footer />
      </motion.div>
    )
  }
}
