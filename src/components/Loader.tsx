import { useProgress, Html } from '@react-three/drei'

export const Loader = () => {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center w-40">
        <span className="font-mono text-[9px] tracking-[0.3em] mb-4 text-black/40 uppercase">Initialising</span>
        <div className="w-full h-[1px] bg-black/5 relative">
          <div 
            className="absolute h-full bg-accent transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <span className="font-mono text-[9px] mt-4 text-black/40">{Math.round(progress)}%</span>
      </div>
    </Html>
  )
}