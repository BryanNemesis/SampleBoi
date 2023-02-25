import { useState } from 'react'
import Input from './inputs/Input'
import SubmitButton from './SubmitButton'
import Opener from './Opener'

const SampleUploadPanel: React.FC = () => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(open => !open)
  }

  const inputs = () => {
    return (
      <div className="flex flex-col gap-y-1 p-4 text-sm uppercase">
        <Input label="name" type="text" placeholder="max 15 chars" />
        <Input label="from file" type="filepicker" />
        <Input label="from youtube" type="text" placeholder="vid url" />
        <Input label="playback mode" type="switcher" />
        <Input label="color" type="colorpicker" />
        <SubmitButton />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center text-zinc-100 ">
      <div className="w-4/5 rounded-md border border-zinc-400 sm:w-1/2 lg:w-5/12">
        <Opener open={open} toggleOpen={toggleOpen} />
        {open ? inputs() : <div className="p-1"></div>}
      </div>
    </div>
  )
}

export default SampleUploadPanel
