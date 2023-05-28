import { createContext, useState } from "react"

type Status = { type: "success" | "info" | "error"; text: string }

type StatusContextType = {
  status: Status
  setStatus: (status: Status) => void
}

const initialStatus: Status = { type: "info", text: "welcome" }

export const StatusContext = createContext<StatusContextType>({
  status: initialStatus,
  setStatus: () => {},
})

export const StatusProvider = (props: React.PropsWithChildren) => {
  const [status, setStatus] = useState(initialStatus)
  return <StatusContext.Provider value={{ status, setStatus }} {...props} />
}
