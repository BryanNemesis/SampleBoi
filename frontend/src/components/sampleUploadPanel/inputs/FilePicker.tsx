import { useFilePicker } from 'use-file-picker'
import { useEffect } from 'react'

interface Props {
  handler: (file: object) => void
}

const FilePicker: React.FC<Props> = ({ handler }) => {
  // for some reason this component won't reload automatically, probably bc of the use-file-picker package
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    multiple: false,
    // TODO: this doesnt limit the available formats on android
    accept: ['.mp3', '.wav', '.flac', '.aiff'],
  })

  useEffect(() => {
    handler(filesContent[0])
  }, [filesContent])

  const cropText = (text: string, length: number = 15) => {
    return text.length > length ? `${text.substring(0, length)}...` : text
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div onClick={() => openFileSelector()} className="flex items-center gap-x-2">
          <div>{!!filesContent.length ? cropText(filesContent[0].name) : 'tap to select'}</div>
          <i
            className={`fa-solid text-lime-400 ${
              !!filesContent.length ? 'fa-check' : 'fa-hand-pointer'
            }`}
          ></i>
        </div>
      )}
    </>
  )
}

export default FilePicker
