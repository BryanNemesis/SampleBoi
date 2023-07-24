import { useContext, useEffect, useState } from "react"
import { Sample } from "../../types/Sample"
import SoundButton from "./SoundButton"
import { StatusContext } from "../../contexts/StatusContext"

interface Props {
  samples: Sample[]
  handleSamplesBatchLoaded: () => void
}

const SoundBoard: React.FC<Props> = ({ samples, handleSamplesBatchLoaded }) => {
  const { setPlayingSamplesStatusMsg } = useContext(StatusContext)
  const [playingSamples, setPlayingSamples] = useState<Sample[]>([])
  const [loadedSampleIndex, setLoadedSampleIndex] = useState(0)

  const addPlayingSample = (sample: Sample) => {
    setPlayingSamples((samples) => [...samples, sample])
  }

  const removePlayingSample = (sample: Sample) => {
    setPlayingSamples((samples) => samples.filter((s) => s.id !== sample.id))
  }

  useEffect(() => {
    setPlayingSamplesStatusMsg(playingSamples)
  }, [playingSamples])

  useEffect(() => {
    if (loadedSampleIndex === samples.length) {
      handleSamplesBatchLoaded()
    }
  }, [loadedSampleIndex])

  const buttons = [
    ...samples
      .slice(0, loadedSampleIndex + 1)
      .map((sample) => (
        <SoundButton
          key={sample.id}
          sample={sample}
          addPlayingSample={addPlayingSample}
          removePlayingSample={removePlayingSample}
          setLoaded={() => setLoadedSampleIndex((value) => value + 1)}
        />
      )),
  ]

  return (
    <div
      className="grid justify-center justify-items-center gap-y-2 p-4 button-cols-2 sm:p-8
    sm:button-cols-4 lg:button-cols-6 xl:button-cols-8"
    >
      {buttons}
    </div>
  )
}

export default SoundBoard
