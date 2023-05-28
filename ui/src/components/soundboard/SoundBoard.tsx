import { Sample } from "../../types/Sample"
import LoadingButton from "./LoadingButton"
import SoundButton from "./SoundButton"

interface Props {
  samples: Sample[]
  loading: boolean
}

const SoundBoard: React.FC<Props> = ({ samples, loading }) => {
  const buttons = [
    ...samples.map((sample) => <SoundButton key={sample.id} sample={sample} />),
    loading && <LoadingButton key='loading' />
  ]

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
