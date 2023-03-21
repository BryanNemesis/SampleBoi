import SoundButton from "./SoundButton"

interface Props {
  samples: {
    name: string
    color: string
    mode: string
    file_url: string
    clicks: number
  }[]
}

const SoundBoard: React.FC<Props> = ({ samples }) => {
  const buttons = samples.map((sample) => (
    <SoundButton key={sample.name} name={sample.name} url={sample.file_url} />
  ))

  return (
    <div
      className="grid justify-center justify-items-center gap-y-2 p-4 button-cols-2 sm:p-8
    sm:button-cols-4 lg:button-cols-6 xl:button-cols-8"
    >
      {buttons}
    </div>
  )
}

export default SoundBoard
