interface Props {
  label: string
  type: string
  placeholder: string
}

const Input: React.FC<Props> = ({ label, type, placeholder }) => {
  const input = (type: string) => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            className="w-1/2 rounded-md bg-black uppercase text-lime-400 placeholder-lime-800 text-right font-digital tracking-widest text-lg"
            placeholder={placeholder}
          ></input>
        )
      case 'filepicker': 
        return 
      case 'placeholder':
        return <div>{placeholder}</div>
    }
  }

  return (
    <div className="flex justify-between items-center h-8">
      <div>{label}</div>
      {input(type)}
    </div>
  )
}

export default Input
