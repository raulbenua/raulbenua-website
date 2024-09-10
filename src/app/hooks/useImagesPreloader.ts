import { useEffect, useState } from 'react'

// define la función para precargar las imágenes
const preloadImages = (urls: string[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    let loadedImages = 0
    const totalImages = urls.length

    if (totalImages === 0) {
      resolve() // no hay imágenes para cargar
      return
    }

    urls.forEach((url) => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        loadedImages++
        // calcula el progreso de carga
        const progress = (loadedImages / totalImages) * 100
        console.log('Progress:', progress)
        if (loadedImages === totalImages) {
          resolve()
        }
      }
      img.onerror = reject // en caso de error
    })
  })
}

// hook personalizado para precargar imágenes
const useImagesPreloader = (urls: string[]) => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      try {
        await preloadImages(urls)
        setIsLoading(false) // oculta el cargador cuando se completa la carga
      } catch (error) {
        setError('Error al cargar imágenes')
        setIsLoading(false) // también oculta el cargador en caso de error
      }
    }

    // actualiza el progreso de carga cada vez que cambia el progreso
    const updateProgress = () => {
      const progress = Math.round((loadingProgress / urls.length) * 100)
      setLoadingProgress(progress)
    }

    loadImages()
    updateProgress() // actualiza el progreso inicial
  }, [urls, loadingProgress])

  return { isLoading, loadingProgress, error }
}

export default useImagesPreloader
