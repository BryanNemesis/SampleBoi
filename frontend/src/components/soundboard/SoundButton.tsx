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

  return (
    <div onClick={handleClick} className='active:scale-90'>
      {/* button background */}
      <div
        className="absolute -my-2 -mx-3 h-32 w-32 md:h-40 md:w-40
        skew-x-3 skew-y-6 rounded-full border-4 border-slate-500 bg-slate-400"
      ></div>
      {/* button foreground */}
      <div
        className={`border-1 flex h-28 w-28 md:h-36 md:w-36 skew-x-3 skew-y-6 flex-col justify-center 
        rounded-full border-2 border-slate-700 bg-slate-300
        align-middle text-slate-800 ${ isPlaying ? 'bg-wavy-red' : 'bg-wavy-amber'}`}
      >
        <div className="flex h-4/5 w-4/5 flex-col justify-center self-center overflow-clip text-center align-middle">
          <span className="text-center text-sm md:text-base">{name}</span>
          <i className={`fa-solid mt-2 ${isPlaying ? 'animate-ping fa-volume-high' : 'fa-play'}`}></i>
        </div>
      </div>
    </div>
  )
}

export default SoundButton
