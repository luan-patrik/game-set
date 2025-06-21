import { UploadForm } from './UploadForm'

export const UploadSettings = () => {
  const handleUploadSuccess = async () => {
    'use server'
  }

  return (
    <div className='bg-background rounded-lg border p-6 shadow'>
      <h2 className='mb-4 text-2xl font-semibold'>Enviar Configurações</h2>
      <p className='mb-6 text-gray-600'>Faça upload de suas configurações.</p>
      <UploadForm onUploadSuccess={handleUploadSuccess} />
    </div>
  )
}
