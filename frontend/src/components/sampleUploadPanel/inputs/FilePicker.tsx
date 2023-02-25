import { useFilePicker } from 'use-file-picker'

const FilePicker: React.FC = () => {
  // for some reason this component won't reload automatically, probably bc of the use-file-picker package
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    multiple: false,
    accept: ['.mp3', '.wav', '.flac', '.aiff'],
  })

  if (loading) {
    return <div>Loading...</div>
  }

  const cropText = (text: string, length: number = 15) => {
    return text.length > length ? `${text.substring(0, length)}...` : text
  }

  return (
    <div onClick={() => openFileSelector()} className="flex items-center gap-x-2">
      <div>{!!filesContent.length ? cropText(filesContent[0].name) : 'tap to select'}</div>
      <i
        className={`fa-solid text-lime-400 ${
          !!filesContent.length ? 'fa-check' : 'fa-hand-pointer'
        }`}
      ></i>
    </div>
  )
}

export default FilePicker
