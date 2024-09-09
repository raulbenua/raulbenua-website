import { useEffect, useRef, useState } from 'react'

export default function useImagesLoader(images: string[]) {
  const [loadedImages, setLoadedImages] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const isMounted = useRef(true)
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    isMounted.current = true

    if (images.length === 0) {
      setLoadedImages(true)
      setLoadingProgress(100)
      return
    }

    let loadedCount = 0

    const loadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve()
        img.onerror = (error) => reject(error)
      })
    }

    const loadAllImages = async () => {
      for (const src of images) {
        if (!isMounted.current) break
        try {
          await loadImage(src)
          loadedCount++

          const progress = Math.round((loadedCount / images.length) * 100)

          if (Date.now() - lastUpdateRef.current > 100) {
            if (isMounted.current) {
              setLoadingProgress(progress)
              lastUpdateRef.current = Date.now()
            }
          }
        } catch (error) {
          console.error(`Error loading image: ${src}`, error)
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
