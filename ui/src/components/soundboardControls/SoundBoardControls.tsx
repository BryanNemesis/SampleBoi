import { useState } from "react"
import Opener from "../common/Opener"
import Input from "../sampleUploadPanel/inputs/Input"

export type SampleOrder = "latest" | "oldest" | "popular" | "hipster"

interface Props {
  setSampleOrder: (sortMode: SampleOrder) => void
  sampleOrder: SampleOrder
}

const SoundBoardControls: React.FC<Props> = ({ setSampleOrder, sampleOrder }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  const options = ["latest", "oldest", "popular", "hipster"]

  return (
    <div className="mb-4 flex flex-col items-center justify-center text-sm uppercase text-zinc-100">
      <div className="w-4/5 rounded-md border border-zinc-400 sm:w-1/2 lg:w-5/12">
        <Opener open={open} toggleOpen={toggleOpen} label="controls" />
        {open ? (
          <div className="flex flex-col gap-y-1 p-4">
            <Input
              label="order samples by"
              handler={setSampleOrder}
              type="switcher"
              options={options}
              defaultValue={options.indexOf(sampleOrder)}
            />
          </div>
        ) : (
          <div className="p-1"></div>
        )}
      </div>
    </div>
  )
}

export default SoundBoardControls
