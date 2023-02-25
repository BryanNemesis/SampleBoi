import ColorPicker from './ColorPicker'
import FilePicker from './FilePicker'
import Switcher from './Switcher'

interface Props {
  label: string
  type: string
  placeholder?: string
}

const Input: React.FC<Props> = ({ label, type, placeholder = '' }) => {
  const input = (type: string) => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            className="w-1/2 rounded-md bg-black pt-px pr-1 text-right font-digital uppercase tracking-wide text-lime-400 placeholder-lime-800 sm:pt-1"
            placeholder={placeholder}
          ></input>
        )
      case 'filepicker':
        return <FilePicker />
      case 'switcher':
        return <Switcher options={['oneshot', 'start/stop']} />
      case 'colorpicker':
        return <ColorPicker />
      case 'placeholder':
        return <div>{placeholder}</div>
    }
  }

  return (
    <div className="flex h-8 items-center justify-between">
      <div>{label}</div>
      {input(type)}
    </div>
  )
}

export default Input
