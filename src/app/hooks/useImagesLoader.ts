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

    let totalSize = 0
    let loadedSize = 0

    const loadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', src, true)
        xhr.responseType = 'blob'

        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            const previousLoaded = (xhr as XMLHttpRequest & { previousLoaded?: number }).previousLoaded || 0;
            loadedSize += event.loaded - previousLoaded;
            (xhr as XMLHttpRequest & { previousLoaded?: number }).previousLoaded = event.loaded;

            const progress = Math.round((loadedSize / totalSize) * 100);

            if (Date.now() - lastUpdateRef.current > 100) {
              if (isMounted.current) {
                setLoadingProgress(progress);
                lastUpdateRef.current = Date.now();
              }
            }
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve()
          } else {
            reject(new Error(`HTTP error ${xhr.status}`))
          }
        }

        xhr.onerror = () => reject(new Error('Network error'))
        xhr.send()
      })
    }

    const loadAllImages = async () => {
      // Primero, obtenemos el tamaño total de todas las imágenes
      for (const src of images) {
        try {
          const response = await fetch(src, { method: 'HEAD' })
          const size = parseInt(response.headers.get('Content-Length') || '0', 10)
          totalSize += size
        } catch (error) {
          console.error(`Error obteniendo tamaño de imagen: ${src}`, error)
        }
      }

      // Luego, cargamos las imágenes
      for (const src of images) {
        if (!isMounted.current) break
        try {
          await loadImage(src)
        } catch (error) {
          console.error(`Error cargando imagen: ${src}`, error)
        }
      }

      if (isMounted.current) {
        setLoadedImages(true)
        setLoadingProgress(100)
      }
    }

    loadAllImages()

    return () => {
      isMounted.current = false
    }
  }, [images])

  return { loadedImages, loadingProgress }
}
