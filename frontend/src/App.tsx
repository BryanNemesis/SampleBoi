import { useEffect, useState } from 'react'
import './App.css'
import SoundBoard from './components/soundboard/SoundBoard'

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
    <div className="App">
      <h1>SampleBoi</h1>
      <SoundBoard samples={samples} />
    </div>
  )
}

export default App
