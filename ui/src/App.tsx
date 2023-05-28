import { useEffect, useState } from "react"
import { useBottomScrollListener } from "react-bottom-scroll-listener"

import SoundBoard from "./components/soundboard/SoundBoard"
import Header from "./components/header/Header"
import SampleUploadPanel from "./components/sampleUploadPanel/SampleUploadPanel"
import { Sample } from "./types/Sample"
import SoundBoardControls, {
  SampleOrder,
} from "./components/soundboardControls/SoundBoardControls"

const App: React.FC = () => {
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

  useBottomScrollListener(getMoreSamples)

  return (
    <>
      <Header />
      <SampleUploadPanel addSampleToBoard={addSample} />
      <SoundBoardControls
        setSampleOrder={setSampleOrder}
        sampleOrder={sampleOrder}
      />
      <SoundBoard samples={samples} loading={loading} />
    </>
  )
}

export default App
