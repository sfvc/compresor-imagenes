import { FileInput } from 'flowbite-react'
import { useImageCompression } from './useImageCompression'
import Loading from './Loading'

const Formulario = ({ setDniImage, handleInputChange }) => {
  const { isLoading, handleCompressImage } = useImageCompression()

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const compressed = await handleCompressImage(file)
      setDniImage(compressed)
      handleInputChange({ target: { name: 'foto_dni', value: compressed } })
    }
  }

  return (
    <>
      <FileInput
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        disabled={isLoading}
      />
      {isLoading && <Loading />}
    </>
  )
}
