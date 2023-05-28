import { useContext, useEffect, useState } from "react"
import { useBottomScrollListener } from "react-bottom-scroll-listener"

import SoundBoard from "./soundboard/SoundBoard"
import Header from "./header/Header"
import SampleUploadPanel from "./sampleUploadPanel/SampleUploadPanel"
import { Sample } from "../types/Sample"
import SoundBoardControls, {
  SampleOrder,
} from "./soundboardControls/SoundBoardControls"
import { StatusContext } from "../contexts/StatusContext"

const App: React.FC = () => {
  const { setIntermittentStatus, setPermanentStatus } =
    useContext(StatusContext)

  const [samples, setSamples] = useState<Sample[]>([])
  const [sampleOrder, setSampleOrder] = useState<SampleOrder>("latest")
  const [samplePage, setSamplePage] = useState(1)
  const [allSamplesLoaded, setAllSamplesLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  const getSamples = async () => {
    setLoading(true)
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}samples/?order=${sampleOrder}&page=1`
    )
    const { results, next } = await response.json()
    setSamples(results)
    if (next === null) {
      setAllSamplesLoaded(true)
    }
    setLoading(false)
  }

  const getMoreSamples = async () => {
    if (allSamplesLoaded) {
      return
    }
    setLoading(true)
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}samples/?order=${sampleOrder}&page=${
        samplePage + 1
      }`
    )

    const { results, next } = await response.json()
    setSamples((samples) => [...samples, ...results])
    setSamplePage((samplePage) => samplePage + 1)
    if (next === null) {
      setAllSamplesLoaded(true)
    }
    setLoading(false)
  }

  const addSample = async (sample: Sample) => {
    setSamples((samples) => [sample, ...samples])
  }

  useEffect(() => {
    setSamplePage(1)
    setAllSamplesLoaded(false)
    getSamples()
  }, [sampleOrder])

  useEffect(() => {
    loading
      ? setPermanentStatus({ type: "info", text: "loading" })
      : setIntermittentStatus({ type: "info", text: "ready" }, 5000)
  }, [loading])

  useBottomScrollListener(getMoreSamples)

  return (
    <>
      <div className="fixed top-0 w-full border-b-2 border-black bg-zinc-900">
        <Header />
        <SampleUploadPanel addSampleToBoard={addSample} />
        <SoundBoardControls
          setSampleOrder={setSampleOrder}
          sampleOrder={sampleOrder}
        />
      </div>
      <div className="mt-56">
        <SoundBoard samples={samples} loading={loading} />
      </div>
    </>
  )
}

export default App
