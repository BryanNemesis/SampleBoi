import { FileUploader } from 'react-drag-drop-files'

interface Props {
  getSamples: Function
}

const fileTypes = ['TSX', 'MP3', 'WAV', 'AIFF', 'FLAC']

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
    <div className="flex flex-col rounded-md border-2 border-dashed border-slate-300 bg-slate-800 p-6 text-slate-100 opacity-80">
      <i className="fa-solid fa-upload mb-3 self-center"></i>
      <div>Drop your sample file here</div>
    </div>
  )

  return (
    <div className="mb-20 flex flex-row justify-center">
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
