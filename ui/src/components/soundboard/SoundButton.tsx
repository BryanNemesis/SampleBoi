import useSound from "use-sound"
import { useState } from "react"
import { Sample } from "../../types/Sample"

interface Props {
  sample: Sample
  addPlayingSample: (sample: Sample) => void
  removePlayingSample: (sample: Sample) => void
}

const SoundButton: React.FC<Props> = ({ sample, addPlayingSample, removePlayingSample }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, { stop }] = useSound(sample.file_url, {
    onplay: () => {
      if (!isPlaying) {
        addPlayingSample(sample)
      }
      setIsPlaying(true)
    },
    onend: () => {
      removePlayingSample(sample)
      setIsPlaying(false)
    },
    onstop: () => {
      removePlayingSample(sample)
      setIsPlaying(false)
    },
  })

  const handleClick = (sample: Sample) => {
    sample.mode === "ONESHOT" ? oneshotPlay() : startStopPlay()
    fetch(`${import.meta.env.VITE_API_URL}samples/${sample.id}/add_click/`, {
      method: "POST",
    })
  }

  const oneshotPlay = () => {
    if (isPlaying) {
      stop()
    }
    play()
  }

  const startStopPlay = () => {
    if (isPlaying) {
      stop()
    } else {
      play()
    }
  }

  const cropText = (text: string) => {
    return text.length > 12 ? text.substring(0, 12) + "···" : text
  }

  return (
    <>
      <div>
        {isPlaying && (
          <div className="absolute mt-5 h-32 w-32 animate-pulse rounded-md bg-transparent slate-glow"></div>
        )}
        <div
          onClick={() => handleClick(sample)}
          className="absolute mt-5 h-32 w-32 rounded-md bg-transparent active:slate-glow"
        ></div>
        <div className="flex">
          <div className="m-px flex-1 text-xs uppercase text-zinc-100">
            {cropText(sample.name)}
          </div>
          <i
            className={`fa-solid text-xs text-zinc-100 ${
              sample.mode === "ONESHOT" ? "fa-gun" : "fa-faucet"
            }`}
          ></i>
        </div>
        <div
          onClick={() => handleClick(sample)}
          className={`h-32 w-32 rounded-md border-2 border-zinc-300 ${
            isPlaying && "bg-red-800"
          }`}
          style={{ backgroundColor: sample.color }}
        ></div>
      </div>
    </>
  )
}

export default SoundButton
