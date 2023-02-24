import SoundButton from './SoundButton'

interface Props {
  samples: {
    name: string
    url: string
  }[]
}

const SoundBoard: React.FC<Props> = ({ samples }) => {
  const buttons = samples.map(sample => (
    <SoundButton key={sample.name} name={sample.name} url={sample.url} />
  ))

  return (
    <div
      className="grid grid-cols-2 justify-center justify-items-center gap-y-2 p-4 sm:grid-cols-4
    sm:p-8 lg:grid-cols-6 xl:grid-cols-8"
    >
      {buttons}
    </div>
  )
}

export default SoundBoard
