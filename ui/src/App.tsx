import SampleBoi from "./components/SampleBoi"
import { StatusProvider } from "./contexts/StatusContext"

const App: React.FC = () => {
  return (
    <StatusProvider>
      <SampleBoi />
    </StatusProvider>
  )
}

export default App
