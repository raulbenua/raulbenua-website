export default function ProgressBar({ loadingProgress }: { loadingProgress: number }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="h-[2px] bg-white animate-expand border-none"
        style={{ width: `${loadingProgress * 0.8}%`, transition: 'width 0.5s' }}
      ></div>
    </div>
  )
}
