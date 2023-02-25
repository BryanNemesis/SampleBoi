import { useState } from 'react'

interface Props {
  options: string[]
}

const Switcher: React.FC<Props> = ({ options }) => {
  const [position, setPosition] = useState(0)

  const handleClick = () => {
    position + 1 === options.length ? setPosition(0) : setPosition(position => position + 1)
  }

  return (
    <div onClick={handleClick} className="flex items-center gap-x-2">
      <div>{options[position]}</div>
      <i className="fa-solid fa-repeat text-lime-400"></i>
    </div>
  )
}

export default Switcher
