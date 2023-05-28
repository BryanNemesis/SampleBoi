const Header: React.FC = () => {
  return (
    <div className="mb-2 flex items-center justify-between p-4 sm:p-8">
      <h1 className="text-3xl font-extrabold uppercase text-zinc-50 text-shadow-rose lg:text-6xl">
        SampleBoi
      </h1>
      <h1
        className="w-1/2 h-8 rounded-md bg-black p-2 pt-1.5
        text-right font-digital uppercase tracking-wide text-lime-400 placeholder-lime-800
        text-glow truncate
        lg:w-1/3"
      >
        sampleboi is on
      </h1>
    </div>
  )
}

export default Header
