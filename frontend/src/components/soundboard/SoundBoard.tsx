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
    <div className="mt-12 flex justify-center">
      <div className="l:w-3/5 grid w-2/3 -skew-y-3 grid-cols-2 justify-items-center gap-x-12 gap-y-16 align-middle md:grid-cols-3 xl:w-1/2 2xl:grid-cols-4">
        {buttons}
        {buttons}
        {buttons}
      </div>
    </div>
  )
}

export default SoundBoard
