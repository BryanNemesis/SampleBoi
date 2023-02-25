import { useState } from 'react'
import Input from './inputs/Input'
import SubmitButton from './SubmitButton'
import Opener from './Opener'

const SampleUploadPanel: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [sampleData, setSampleData] = useState({
    name: '',
    url: '',
    mode: 'oneshot',
    color: '#27272a',
    file: {},
  })

  const setName = (name: string) => {
    setSampleData({ ...sampleData, name: name })
  }

  const setUrl = (url: string) => {
    setSampleData({ ...sampleData, url: url })
  }

  const setMode = (mode: string) => {
    setSampleData({ ...sampleData, mode: mode })
  }

  const setColor = (color: string) => {
    setSampleData({ ...sampleData, color: color })
  }

  const setFile = (file: object) => {
    setSampleData({ ...sampleData, file: file })
  }

  const toggleOpen = () => {
    setOpen(open => !open)
  }

  const inputs = () => {
    return (
      <div className="flex flex-col gap-y-1 p-4 text-sm uppercase">
        <Input label="name" type="text" handler={setName} placeholder="max 15 chars" />
        <Input label="from file" type="filepicker" handler={setFile} />
        <Input label="from youtube" type="text" handler={setUrl} placeholder="vid url" />
        <Input
          label="playback mode"
          handler={setMode}
          type="switcher"
          options={['oneshot', 'start/stop']}
        />
        <Input label="color" type="colorpicker" handler={setColor} />
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
