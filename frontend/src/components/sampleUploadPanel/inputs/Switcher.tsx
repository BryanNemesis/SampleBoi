import { useState, useEffect } from 'react';

interface Props {
  handler: (option: string) => void
  options: string[]
}

const Switcher: React.FC<Props> = ({ handler, options }) => {
  const [position, setPosition] = useState(0)

  const handleClick = () => {
    position + 1 === options.length ? setPosition(0) : setPosition(position => position + 1)
  }

  useEffect(() => {
    handler(options[position])
  }, [position])

  return (
    <div onClick={handleClick} className="flex items-center gap-x-2">
      <div>{options[position]}</div>
      <i className="fa-solid fa-repeat text-lime-400"></i>
    </div>
  )
}

export default Switcher
