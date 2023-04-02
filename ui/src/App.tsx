import { useEffect, useState } from "react"
import SoundBoard from "./components/soundboard/SoundBoard"
import Header from "./components/header/Header"
import SampleUploadPanel from "./components/sampleUploadPanel/SampleUploadPanel"
import Sample from "./types/Sample"
import SortModeSetter from "./components/sortModeSetter/sortModeSetter"

const App: React.FC = () => {
  const [samples, setSamples] = useState<Sample[]>([])
  const [sortMode, setSortMode] = useState<String>('mystery')

  const getSamples = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}samples?sort_by=${sortMode}`)
    const data = await response.json()
    setSamples(data)
  }

  useEffect(() => {
    getSamples()
  }, [sortMode])

  return (
    <>
      <Header />
      <SampleUploadPanel refreshSamples={getSamples} />
      <SortModeSetter setSortMode={setSortMode} />
      <SoundBoard samples={samples} />
    </>
  )
}

export default App
