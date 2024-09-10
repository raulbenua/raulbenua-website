import { useEffect, useRef, useState } from 'react'

export default function useImagesLoader(images: string[]) {
  const [loadedImages, setLoadedImages] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    if (images.length === 0) {
      setLoadedImages(true)
      setLoadingProgress(100)
      return
    }

    const loadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve()
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      })
    }

    const loadAllImages = async () => {
      let loadedCount = 0

      for (const src of images) {
        if (!isMounted.current) break
        try {
          await loadImage(src)
          loadedCount++
          setLoadingProgress(Math.round((loadedCount / images.length) * 100))
        } catch (error) {
          console.error((error as Error).message)
        }
      }

      if (isMounted.current) {
        setLoadedImages(true)
      }
    }

    loadAllImages()

    return () => {
      isMounted.current = false
    }
  }, [images])

  return { loadedImages, loadingProgress }
}
