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
        img.src = src // Remueve el parámetro ?v= para evitar cambios constantes en la URL
        img.onload = () => resolve()
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      })
    }

    const loadAllImages = async () => {
      let loadedCount = 0

      try {
        await Promise.all(
          images.map(async (src) => {
            await loadImage(src)
            loadedCount++
            setLoadingProgress(Math.round((loadedCount / images.length) * 100))
          })
        )
        setLoadedImages(true)
      } catch (error) {
        setError((error as Error).message)
      }
    }

    loadAllImages()
  }, [images])

  return { loadedImages, loadingProgress, error }
}
