import { useEffect, useState } from 'react'
import SoundBoard from './components/soundboard/SoundBoard'
import Header from './components/header/Header'

const App: React.FC = () => {
  const [samples, setSamples] = useState([])

  useEffect(() => {
    const getSamples = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}samples`)
      const data = await response.json()
      setSamples(data)
    }

    getSamples()
  }, [])

  return (
    <>
      <Header />
      <SoundBoard samples={samples} />
    </>
  )
}

export default App
