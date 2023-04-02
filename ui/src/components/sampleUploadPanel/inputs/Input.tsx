import ColorPicker from './ColorPicker'
import FilePicker from './FilePicker'
import Switcher from './Switcher'
import TextInput from './TextInput'

interface Props {
  label: string
  type: string
  // TODO: I should propably type this as string | File but idc for now
  handler: (arg: any) => void
  placeholder?: string
  options?: string[]
}

const Input: React.FC<Props> = ({ label, type, handler, placeholder = '', options = [] }) => {
  const input = (type: string) => {
    switch (type) {
      case 'text':
        return <TextInput handler={handler} placeholder={placeholder} />
      case 'filepicker':
        return <FilePicker handler={handler} />
      case 'switcher':
        return <Switcher handler={handler} options={options} />
      case 'colorpicker':
        return <ColorPicker handler={handler} />
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
