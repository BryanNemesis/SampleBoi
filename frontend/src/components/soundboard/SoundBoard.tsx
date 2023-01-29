import SoundButton from './SoundButton'

interface Props {
  samples: {
    name: string
    url: string
  }[]
}

const SoundBoard: React.FC<Props> = ( {samples} ) => {
  const buttons = samples.map(sample => (
    <SoundButton key={sample.name} name={sample.name} url={sample.url} />
  ))

  return <div className="buttons-container">{buttons}</div>
}

export default SoundBoard
