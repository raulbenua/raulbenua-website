export default function ProgressBar({ loadingProgress }: { loadingProgress: number }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="h-[2px] bg-white border-none"
        style={{
          transform: `scaleX(${loadingProgress / 100})`,
          transformOrigin: 'left',
          transition: 'transform 0.5s',
          width: '80%',
        }}
      ></div>
    </div>
  )
}
