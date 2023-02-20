import { FileUploader } from 'react-drag-drop-files'

interface Props {
  getSamples: Function
}

const fileTypes = ['MP3', 'WAV', 'AIFF', 'FLAC']

const Uploader: React.FC<Props> = ({ getSamples }) => {
  const handleChange = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    // TODO: enable cors, so we can see the response and only reload samples when it's 200
    const response = await fetch(`${import.meta.env.VITE_API_URL}samples`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })

    await getSamples()
  }

  const uploaderHtml = (
    <div className="flex flex-col rounded-md border-2 border-dashed border-zinc-300 bg-zinc-800 p-3 text-zinc-50 opacity-80 sm:p-6">
      <i className="fa-solid fa-upload mb-3 self-center"></i>
      <div className="text-xs uppercase sm:text-sm">Drop sample here</div>
    </div>
  )

  return (
    <div className="flex flex-row justify-center">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        maxSize={5}
        children={uploaderHtml}
      />
    </div>
  )
}

export default Uploader
