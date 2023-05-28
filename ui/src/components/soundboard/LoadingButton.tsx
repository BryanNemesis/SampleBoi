const LoadingButton: React.FC = () => {
  return (
    <div>
      <div className="m-px text-xs">&nbsp;</div>
      <div className="flex h-32 w-32 justify-center">
        <div className="fa-solid fa-spinner animate-spin self-center text-6xl text-zinc-300" />
      </div>
    </div>
  )
}

export default LoadingButton
