import { useState } from "react"
import Input from "./inputs/Input"
import SubmitButton from "./SubmitButton"
import Opener from "../common/Opener"
import { Sample, SampleStub } from "../../types/Sample"

interface Props {
  addSampleToBoard: (sample: Sample) => void
}

const SampleUploadPanel: React.FC<Props> = ({ addSampleToBoard }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sampleData, setSampleData] = useState<SampleStub>({
    name: "",
    mode: "ONESHOT",
    color: "#27272a",
  })

  const setName = (name: string) => {
    setSampleData({ ...sampleData, name: name })
  }

  const setMode = (mode: "ONESHOT" | "START_STOP") => {
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
    setLoading(true)
    const formData = new FormData()
    Object.entries(sampleData).forEach(([k, v]) => formData.append(k, v))
    const response = await fetch(`${import.meta.env.VITE_API_URL}samples/`, {
      method: "POST",
      body: formData,
    })
    const result = await response.json()
    addSampleToBoard(result)
    setLoading(false)
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
          label="playback mode"
          handler={setMode}
          type="switcher"
          options={["ONESHOT", "START_STOP"]}
        />
        <Input label="color" type="colorpicker" handler={setColor} />
        <SubmitButton handler={submitSample} loading={loading} />
      </div>
    )
  }

  return (
    <div className="mb-6 flex flex-col items-center justify-center text-zinc-100">
      <div className="w-4/5 rounded-md border border-zinc-400 sm:w-1/2 lg:w-5/12">
        <Opener open={open} toggleOpen={toggleOpen} label="upload sample" />
        {open ? inputs() : <div className="p-1"></div>}
      </div>
    </div>
  )
}

export default SampleUploadPanel
