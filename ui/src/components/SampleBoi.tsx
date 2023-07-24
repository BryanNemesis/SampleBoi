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
  const { setIntermittentStatusMsg, setPermanentStatusMsg } =
    useContext(StatusContext)

  const [samples, setSamples] = useState<Sample[]>([])
  const [sampleOrder, setSampleOrder] = useState<SampleOrder>("latest")
  const [samplePage, setSamplePage] = useState(1)
  const [allSamplesLoaded, setAllSamplesFetched] = useState(false)
  const [readyToLoadMoreSamples, setReadyToLoadMoreSamples] = useState(false)

  const getSamples = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}samples/?order=${sampleOrder}&page=1`
    )
    const { results, next } = await response.json()
    setSamples(results)
    if (next === null) {
      setAllSamplesFetched(true)
    }
  }

  const getMoreSamples = async () => {
    if (allSamplesLoaded || !readyToLoadMoreSamples) {
      return
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}samples/?order=${sampleOrder}&page=${
        samplePage + 1
      }`
    )

    if (response.status === 404) {
      setAllSamplesFetched(true)
      return
    }

    const { results, next } = await response.json()

    setSamples((samples) => [...samples, ...results])
    setSamplePage((samplePage) => samplePage + 1)
    if (next === null) {
      setAllSamplesFetched(true)
    }
  }

  const addSample = async (sample: Sample) => {
    setSamples((samples) => [sample, ...samples])
  }

  useEffect(() => {
    setSamplePage(1)
    setAllSamplesFetched(false)
    getSamples()
    setIntermittentStatusMsg('Sampleboi ready to rock XD')
  }, [sampleOrder])

  useBottomScrollListener(getMoreSamples)

  return (
    <>
      <div className="sticky top-0 w-full border-b-2 border-black bg-zinc-900">
        <Header />
        <SampleUploadPanel addSampleToBoard={addSample} />
        <SoundBoardControls
          setSampleOrder={setSampleOrder}
          sampleOrder={sampleOrder}
        />
      </div>
      <SoundBoard
        samples={samples}
        handleSamplesBatchLoaded={() => {
          setReadyToLoadMoreSamples(true)
        }}
      />
    </>
  )
}

export default App
