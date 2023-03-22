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

  const headerIcons = () => {
    return sample.mode === "oneshot" ? (
      <span className="material-icons text-sm text-zinc-100">start</span>
    ) : (
      <>
        <span className="material-icons text-sm text-zinc-100 -mr-1">play_arrow</span>
        <span className="material-icons text-sm text-zinc-100 -ml-px">pause</span>
      </>
    )
  }

  return (
    <div>
      <div className="flex">
        <div className="m-px text-xs uppercase text-zinc-100 flex-1">
          {cropText(sample.name)}
        </div>
        {headerIcons()}
      </div>
      <div
        onClick={sample.mode === "oneshot" ? oneshotPlay : startStopPlay}
        className={`h-32 w-32 rounded-md border-2 border-zinc-300 active:border-zinc-400 active:shadow-inner active:shadow-zinc-500 ${
          isPlaying && "bg-red-800"
        }`}
        style={{ backgroundColor: sample.color }}
      ></div>
    </div>
  )
}

export default SoundButton
