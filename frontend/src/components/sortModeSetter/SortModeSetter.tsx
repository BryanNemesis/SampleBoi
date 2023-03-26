import Switcher from "../sampleUploadPanel/inputs/Switcher"

interface Props {
  setSortMode: (sortMode: String) => void
}

const SortModeSetter: React.FC<Props> = ({ setSortMode }) => {
  return (
    <div className="flex flex-col items-center">
        <Switcher handler={setSortMode} options={["mystery", "date"]} />
    </div>
  )
}

export default SortModeSetter
