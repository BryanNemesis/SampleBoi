import { createContext, useState } from "react"

type Status = { type: "success" | "info" | "error"; text: string }

type StatusContextType = {
  status: Status
  setIntermittentStatus: (status: Status, durationMs?: number) => void
  setPermanentStatus: (status: Status) => void
}

const initialStatus: Status = { type: "info", text: "" }

export const StatusContext = createContext<StatusContextType>({
  status: initialStatus,
  setIntermittentStatus: () => {},
  setPermanentStatus: () => {},
})

export const StatusProvider = (props: React.PropsWithChildren) => {
  const [msgTimeoutId, setMsgTimeoutId] = useState(0)
  const [status, setStatus] = useState(initialStatus)

  const setIntermittentStatus = (status: Status, durationMs: number = 2000) => {
    clearTimeout(msgTimeoutId)
    setStatus(status)
    setMsgTimeoutId(
      setTimeout(() => setStatus({ type: "info", text: "" }), durationMs)
    )
    console.log(`timeout id: ${msgTimeoutId}`)
  }

  return (
    <StatusContext.Provider
      value={{ status, setIntermittentStatus, setPermanentStatus: setStatus }}
      {...props}
    />
  )
}
