import Switcher from "../sampleUploadPanel/inputs/Switcher"

export type SampleOrder = 'latest' | 'oldest' | 'popular' | 'hipster'

interface Props {
  setSampleOrder: (sortMode: SampleOrder) => void
}

const SoundBoardControls: React.FC<Props> = ({ setSampleOrder }) => {
  return (
    <div className="flex flex-col items-center justify-center text-zinc-100">
      <div className="w-4/5 gap-y-1 rounded-md border border-zinc-400 p-4 text-sm uppercase sm:w-1/2 lg:w-5/12">
        <Switcher
          handler={setSampleOrder}
          options={['latest', 'oldest', 'popular', 'hipster']}
        />
      </div>
    </div>
  )
}

export default SoundBoardControls
