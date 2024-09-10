import { useEffect, useState } from 'react'

export default function useImagesLoader(images: string[]) {
  const [loadedImages, setLoadedImages] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Maneja el caso en el que no hay imágenes para cargar
    if (images.length === 0) {
      setLoadedImages(true)
      setLoadingProgress(100)
      return
    }

    const loadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.src = src + '?t=' + Math.random() // Evita el caché
        img.onload = () => {
          resolve()
        }
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      })
    }

    const loadAllImages = async () => {
      let loadedCount = 0

      for (const src of images) {
        try {
          await loadImage(src)
          loadedCount++
          setLoadingProgress(Math.round((loadedCount / images.length) * 100))
        } catch (error) {
          setError((error as Error).message)
        }
      }

      setLoadedImages(true)
    }

    loadAllImages()
  }, [images])

  return { loadedImages, loadingProgress, error }
}
