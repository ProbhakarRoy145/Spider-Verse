import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete,
        })
      },
    })

    // Animate progress
    tl.to({}, {
      duration: 2,
      onUpdate: function () {
        setProgress(Math.round(this.progress() * 100))
      },
    })

    // Spider icon animation
    tl.from('.loader-spider', {
      scale: 0,
      rotation: 720,
      duration: 1,
      ease: 'back.out(1.7)',
    }, 0)

    tl.to('.loader-spider', {
      y: -20,
      duration: 0.5,
      yoyo: true,
      repeat: 3,
      ease: 'power2.inOut',
    }, 0.5)

    // Web lines shooting out
    tl.from('.loader-web-line', {
      scaleX: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: 'power2.out',
    }, 0.3)
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
    >
      {/* Web lines decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="loader-web-line absolute h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"
            style={{
              width: '120%',
              transform: `rotate(${(i / 12) * 360}deg)`,
              transformOrigin: 'center',
            }}
          />
        ))}
      </div>

      {/* Spider icon */}
      <div className="loader-spider mb-8">
        <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-600 flex items-center justify-center overflow-hidden">
          <img src="/spider.jpg" alt="Loading" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Progress */}
      <div className="text-center">
        <div className="stat-number text-5xl text-red-500 mb-4" style={{ fontFamily: 'Orbitron' }}>
          {progress}%
        </div>
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-600 text-xs mt-4 tracking-widest uppercase">
          Spinning the Web...
        </p>
      </div>
    </div>
  )
}