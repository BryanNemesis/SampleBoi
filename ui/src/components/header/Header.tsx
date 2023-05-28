import { useContext } from "react"
import { StatusContext } from "../../contexts/StatusContext"

const Header: React.FC = () => {
  const { statusMsg } = useContext(StatusContext)

  return (
    <div className="flex items-center justify-between p-4 sm:p-8">
      <h1 className="text-3xl font-extrabold uppercase text-zinc-50 text-shadow-rose lg:text-6xl">
        SampleBoi
      </h1>
      <h1
        className="h-8 w-1/2 truncate rounded-md bg-black p-2
        pt-1.5 text-right font-digital uppercase tracking-wide text-lime-400
        placeholder-lime-800 text-glow
        lg:w-1/3"
      >
        {statusMsg}
      </h1>
    </div>
  )
}

export default Header
