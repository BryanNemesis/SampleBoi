import Uploader from './UploadBox'

interface Props {
  getSamples: Function
}

const Header: React.FC<Props> = ({ getSamples }) => {
  return (
    <div className="flex items-center justify-between p-4 sm:p-8 mb-2">
      <h1 className="text-3xl font-extrabold uppercase text-zinc-50 text-shadow-rose sm:text-6xl">
        SampleBoi
      </h1>
      {/* <Uploader getSamples={getSamples} /> */}
    </div>
  )
}

export default Header
