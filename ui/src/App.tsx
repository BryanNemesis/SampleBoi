import { useEffect, useState } from "react"
import { useBottomScrollListener } from "react-bottom-scroll-listener"

import SoundBoard from "./components/soundboard/SoundBoard"
import Header from "./components/header/Header"
import SampleUploadPanel from "./components/sampleUploadPanel/SampleUploadPanel"
import Sample from "./types/Sample"
import SoundBoardControls, {
  SampleOrder,
} from "./components/soundboardControls/SoundBoardControls"

const App: React.FC = () => {
  const [samples, setSamples] = useState<Sample[]>([])
  const [sampleOrder, setSampleOrder] = useState<SampleOrder>("latest")
  const [samplePage, setSamplePage] = useState<number>(1)
  const [allSamplesLoaded, setAllSamplesLoaded] = useState<boolean>(false)

  const getSamples = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }samples/?order=${sampleOrder}&page=1`
    )
    const { results, next } = await response.json()
    setSamples(results)
    if (next === null) {
      setAllSamplesLoaded(true)
    }
  }

  const getMoreSamples = async () => {
    if (allSamplesLoaded) {
      return
    }
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
  }

  useBottomScrollListener(getMoreSamples)

  useEffect(() => {
    setSamplePage(1)
    setAllSamplesLoaded(false)
    getSamples()
  }, [sampleOrder])

  return (
    <>
      <Header />
      <SampleUploadPanel refreshSamples={getSamples} />
      <SoundBoardControls
        setSampleOrder={setSampleOrder}
        sampleOrder={sampleOrder}
      />
      <SoundBoard samples={samples} />
    </>
  )
}

export default App
