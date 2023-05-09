import useSound from "use-sound"
import { useState } from "react"
import Sample from "../../types/Sample"

interface Props {
  sample: Sample
}

const SoundButton: React.FC<Props> = ({ sample }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, { stop }] = useSound(sample.file_url, {
    onend: () => {
      setIsPlaying(false)
    },
  })

  const oneshotPlay: React.MouseEventHandler<HTMLDivElement> = () => {
    if (isPlaying) {
      stop()
    }
    setIsPlaying(true)
    play()
  }

  const startStopPlay: React.MouseEventHandler<HTMLDivElement> = () => {
    if (isPlaying) {
      setIsPlaying(false)
      stop()
    } else {
      setIsPlaying(true)
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
          onClick={sample.mode === "ONESHOT" ? oneshotPlay : startStopPlay}
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
          onClick={sample.mode === "ONESHOT" ? oneshotPlay : startStopPlay}
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
