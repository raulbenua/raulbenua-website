'use client'

import { useEffect, useState } from 'react'

import Footer from '@/app/components/Footer'
import Gallery from '@/app/components/Gallery'
import Header from '@/app/components/Header'
import ProgressBar from '@/app/components/ProgressBar'
import { motion } from 'framer-motion'
import useImagesLoader from '@/app/hooks/useImagesLoader'

export default function Home() {
  const [content, setContent] = useState<{ imagesH: string[]; imagesV: string[] } | null>(null)
  const { loadedImages, loadingProgress } = useImagesLoader(content ? [...content.imagesH, ...content.imagesV] : [])

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch('/content.json')
      const data = await response.json()
      setContent(data)
    }
    fetchContent()
  }, [])

  if (!content || !loadedImages) {
    return <ProgressBar loadingProgress={loadingProgress} />
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
      <Header />
      <Gallery imagesH={content.imagesH} imagesV={content.imagesV} />
      <Footer />
    </motion.div>
  )
}
