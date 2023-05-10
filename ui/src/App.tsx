import { useEffect, useState } from "react"
import SoundBoard from "./components/soundboard/SoundBoard"
import Header from "./components/header/Header"
import SampleUploadPanel from "./components/sampleUploadPanel/SampleUploadPanel"
import Sample from "./types/Sample"
import SoundBoardControls, { SampleOrder } from "./components/soundboardControls/SoundBoardControls"

const App: React.FC = () => {
  const [samples, setSamples] = useState<Sample[]>([])
  const [sampleOrder, setSampleOrder] = useState<SampleOrder>('latest')

  const getSamples = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}samples/?order=${sampleOrder}`)
    const data = await response.json()
    setSamples(data)
  }

  useEffect(() => {
    getSamples()
  }, [sampleOrder])

  return (
    <>
      <Header />
      <SampleUploadPanel refreshSamples={getSamples} />
      <SoundBoardControls setSampleOrder={setSampleOrder} />
      <SoundBoard samples={samples} />
    </>
  )
}

export default App
