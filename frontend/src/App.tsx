import { useEffect, useState } from 'react'
import SoundBoard from './components/soundboard/SoundBoard'
import Header from './components/header/Header'
import mock_samples from './mock_samples.json'
import SampleUploadPanel from './components/sampleUploadPanel/SampleUploadPanel'

const App: React.FC = () => {
  const [samples, setSamples] = useState([])

  const getSamples = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}samples`)
    const data = await response.json()
    setSamples(data)
  }

  useEffect(() => {
    getSamples()
  }, [])

  return (
    <>
      <Header />
      <SampleUploadPanel />
      {/* <SoundBoard samples={samples} /> */}
      <SoundBoard samples={mock_samples} />
    </>
  )
}

export default App
