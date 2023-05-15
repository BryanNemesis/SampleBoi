interface Props {
  handler: () => void
  loading: boolean
}

const SubmitButton: React.FC<Props> = ({ handler, loading }) => {
  return (
    <button
      onClick={handler}
      className="mt-4 w-32 self-center rounded-md border-2 border-zinc-300 bg-zinc-800 p-1 font-bold uppercase text-zinc-200"
    >
      {/* TODO: the loading should be on the top screen instead of here */}
      {loading ? <i className="fa-solid fa-arrows-spin text-lime-400 animate-spin" /> : 'ok'}
    </button>
  )
}

export default SubmitButton
