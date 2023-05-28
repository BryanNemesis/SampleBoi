interface Props {
  handler: (text: string) => void
  placeholder?: string 
}

const TextInput: React.FC<Props> = ({ handler, placeholder }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handler(event.target.value)
  }

  return (
    <input
      type="text"
      className="w-1/2 rounded-md bg-black pt-px pr-1 text-right font-digital uppercase tracking-wide text-lime-400 placeholder-lime-800 text-glow sm:pt-1"
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  )
}

export default TextInput
