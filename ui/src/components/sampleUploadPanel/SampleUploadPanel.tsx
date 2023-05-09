import { useState } from "react"
import Input from "./inputs/Input"
import SubmitButton from "./SubmitButton"
import Opener from "./Opener"

interface Props {
  refreshSamples: () => void
}

interface SampleData {
  name: string
  mode: string
  color: string
  url?: string
  file?: File
}

const SampleUploadPanel: React.FC<Props> = ({ refreshSamples }) => {
  const [open, setOpen] = useState(false)
  const [sampleData, setSampleData] = useState<SampleData>({
    name: "",
    url: "",
    mode: "oneshot",
    color: "#27272a",
  })

  const setName = (name: string) => {
    setSampleData({ ...sampleData, name: name })
  }

  const setUrl = (url: string) => {
    if (url) {
      setSampleData({ ...sampleData, url: url })
    }
  }

  const setMode = (mode: string) => {
    setSampleData({ ...sampleData, mode: mode })
  }

  const setColor = (color: string) => {
    setSampleData({ ...sampleData, color: color })
  }

  const setFile = (file: File) => {
    setSampleData({ ...sampleData, file: file })
  }

  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  const submitSample = async () => {
    const formData = new FormData()
    Object.entries(sampleData).forEach(([k, v]) => formData.append(k, v))
    const response = await fetch(`${import.meta.env.VITE_API_URL}samples/`, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
    // TODO: better to append the new sample to the data
    refreshSamples()
  }

  const inputs = () => {
    return (
      <div className="flex flex-col gap-y-1 p-4 text-sm uppercase">
        <Input
          label="name"
          type="text"
          handler={setName}
          placeholder="max 15 chars"
        />
        <Input label="from file" type="filepicker" handler={setFile} />
        <Input
          label="from youtube"
          type="text"
          handler={setUrl}
          placeholder="vid url"
        />
        <Input
          label="playback mode"
          handler={setMode}
          type="switcher"
          options={["ONESHOT", "START_STOP"]}
        />
        <Input label="color" type="colorpicker" handler={setColor} />
        <SubmitButton handler={submitSample} />
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
