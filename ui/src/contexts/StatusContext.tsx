import { createContext, useState } from "react"
import { Sample } from "../types/Sample"

type Status = { type: "success" | "info" | "error"; text: string }

type PlayingSample = Pick<Sample, "name" | "id"> & {
  timeoutId?: number
}

type StatusContextType = {
  status: Status
  setPlayingSamplesStatus: (samples: PlayingSample[]) => void
  setIntermittentStatus: (status: Status, durationMs?: number) => void
  setPermanentStatus: (status: Status) => void
}

const initialStatus: Status = { type: "info", text: "" }

// I'm gonna set this initial context just so I don't have to deal with the possibility of StatusContext being null.
export const StatusContext = createContext<StatusContextType>({
  status: initialStatus,
  setPlayingSamplesStatus: () => {},
  setIntermittentStatus: () => {},
  setPermanentStatus: () => {},
})

export const StatusProvider = (props: React.PropsWithChildren) => {
  const [msgTimeoutId, setMsgTimeoutId] = useState(0)
  const [status, setStatus] = useState(initialStatus)

  const setPlayingSamplesStatus = (samples: PlayingSample[]) => {
    if (samples.length > 1) {
      setStatus({
        type: "info",
        text: `${samples.length} samples playing`,
      })
    } else if (samples.length === 1) {
      setStatus({ type: "info", text: `${samples[0].name} playing` })
    } else {
      setStatus({ type: "info", text: "" })
    }
  }

  const setIntermittentStatus = (status: Status, durationMs: number = 2000) => {
    clearTimeout(msgTimeoutId)
    setStatus(status)
    setMsgTimeoutId(
      setTimeout(() => setStatus({ type: "info", text: "" }), durationMs)
    )
  }

  return (
    <StatusContext.Provider
      value={{
        status,
        setPlayingSamplesStatus,
        setIntermittentStatus,
        setPermanentStatus: setStatus,
      }}
      {...props}
    />
  )
}
