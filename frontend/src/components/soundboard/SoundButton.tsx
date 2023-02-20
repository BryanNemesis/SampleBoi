import useSound from 'use-sound'
import { useState } from 'react'

interface Props {
  name: string
  url: string
}

const SoundButton: React.FC<Props> = ({ name, url }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, { stop }] = useSound(url, {
    onend: () => {
      setIsPlaying(false)
    },
  })

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (isPlaying) {
      setIsPlaying(false)
      stop()
    } else {
      setIsPlaying(true)
      play()
    }
  }

  const cropText = (text: string) => {
    return text.length > 12 ? text.substring(0, 12) + '···' : text
  }

  return (
    <div>
      <div className="m-px text-xs uppercase text-zinc-100">{cropText(name)}</div>
      <div
        onClick={handleClick}
        className={`h-32 w-32 rounded-md border-2 border-zinc-300 active:border-zinc-400 active:shadow-inner active:shadow-zinc-500 ${
          isPlaying ? 'bg-red-800' : 'bg-zinc-800'
        }`}
      ></div>
    </div>
  )
}

export default SoundButton
