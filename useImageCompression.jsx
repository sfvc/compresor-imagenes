import { useState } from 'react'
import imageCompression from 'browser-image-compression'

export const useImageCompression = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleCompressImage = async (file) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }

    setIsLoading(true)

    try {
      const originalSizeKB = file.size / 1024

      const compressedFile = await imageCompression(file, options)
      const compressedSizeKB = compressedFile.size / 1024
      const porcentajeReducido = ((1 - compressedFile.size / file.size) * 100).toFixed(2)

      return compressedFile
    } catch (error) {
      console.error('Error al comprimir imagen:', error)
      return file
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleCompressImage
  }
}
