interface Props {
  open: boolean
  toggleOpen: () => void
  label: string
}

const Opener: React.FC<Props> = ({ open, toggleOpen, label }) => {
  return (
    <div className="flex justify-center">
      <div
        onClick={() => toggleOpen()}
        className="-mt-3 pl-2 pr-2 flex w-2/5 min-w-fit items-center justify-between gap-x-2 bg-zinc-900"
      >
        <i className={`fa-solid ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        <div className="text-sm uppercase">{label}</div>
        <i className={`fa-solid ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </div>
    </div>
  )
}

export default Opener
