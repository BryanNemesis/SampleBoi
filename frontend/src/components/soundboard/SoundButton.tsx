import useSound from 'use-sound'
import { useState } from 'react'

interface Props {
  name: string
  url: string
}

const SoundButton: React.FC<Props> = ({ name, url }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, {stop}] = useSound(url, {
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

  return (
    <div onClick={handleClick} className={`sound-button ${isPlaying ? 'spin' : ''}`} >
      {name}
    </div>
  )
}

export default SoundButton
