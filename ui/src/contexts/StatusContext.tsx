import { createContext, useState } from "react"
import { Sample } from "../types/Sample"

type Status = {
  info: string
  success?: string
  error?: string
}

type PlayingSample = Pick<Sample, "name" | "id"> & {
  timeoutId?: number
}

type StatusContextType = {
  statusMsg: string
  setPlayingSamplesStatusMsg: (samples: PlayingSample[]) => void
  setIntermittentStatusMsg: (msg: string, durationMs?: number) => void
  setPermanentStatusMsg: (msg: string) => void
  setErrorMsg: (msg: string) => void
  setSuccessMsg: (msg: string) => void
}

const initialStatus: Status = { info: "" }

// I'm gonna set this initial context just so I don't have to deal with the possibility of StatusContext being null.
export const StatusContext = createContext<StatusContextType>({
  statusMsg: "",
  setPlayingSamplesStatusMsg: () => {},
  setIntermittentStatusMsg: () => {},
  setPermanentStatusMsg: () => {},
  setErrorMsg: () => {},
  setSuccessMsg: () => {},
})

export const StatusProvider = (props: React.PropsWithChildren) => {
  const [msgTimeoutId, setMsgTimeoutId] = useState(0)
  const [errorTimeoutId, setErrorTimeoutId] = useState(0)
  const [successTimeoutId, setSuccessTimeoutId] = useState(0)
  const [status, setStatus] = useState(initialStatus)

  const setPlayingSamplesStatusMsg = (samples: PlayingSample[]) => {
    if (samples.length > 1) {
      setStatus({
        ...status,
        info: `${samples.length} samples playing`,
      })
    } else if (samples.length === 1) {
      setStatus({ ...status, info: `${samples[0].name} playing` })
    } else {
      setStatus({ ...status, info: "" })
    }
  }

  const setIntermittentStatusMsg = (msg: string, durationMs: number = 2000) => {
    clearTimeout(msgTimeoutId)
    setStatus({ ...status, info: msg })
    setMsgTimeoutId(
      setTimeout(() => setStatus({ ...status, info: "" }), durationMs)
    )
  }

  const setPermanentStatusMsg = (msg: string) => {
    setStatus({ ...status, info: msg })
  }

  const setErrorMsg = (msg: string) => {
    clearTimeout(errorTimeoutId)
    setStatus({...status, error: msg})
    setErrorTimeoutId(
      setTimeout(() => setStatus({info: status.info}), 3000)
    )
  }

  const setSuccessMsg = (msg: string) => {
    clearTimeout(successTimeoutId)
    setStatus({...status, success: msg})
    setSuccessTimeoutId(
      setTimeout(() => setStatus({info: status.info}), 3000)
    )
  }

  const statusMsg = status.error || status.success || status.info

  return (
    <StatusContext.Provider
      value={{
        statusMsg,
        setPlayingSamplesStatusMsg,
        setIntermittentStatusMsg,
        setPermanentStatusMsg,
        setErrorMsg,
        setSuccessMsg,
      }}
      {...props}
    />
  )
}
