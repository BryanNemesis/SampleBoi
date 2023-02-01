import { useEffect, useState } from 'react'
import SoundBoard from './components/soundboard/SoundBoard'
import Header from './components/header/Header'
import Uploader from './components/inputs/Uploader'

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
      <Uploader getSamples={getSamples} />
      <SoundBoard samples={samples} />
    </>
  )
}

export default App
