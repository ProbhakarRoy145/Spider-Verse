import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollBanner() {
  const bannerRef = useRef(null)
  const trackRef = useRef(null)
  const directionRef = useRef(1) // 1 = left, -1 = right

  useEffect(() => {
    const track = trackRef.current

    // Continuous auto-scroll animation
    const tween = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 8,
      ease: 'none',
    })

    // Listen to scroll direction and reverse the tween
    ScrollTrigger.create({
      trigger: bannerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const newDir = self.direction // 1 = scroll down, -1 = scroll up
        if (newDir !== directionRef.current) {
          directionRef.current = newDir
          gsap.to(tween, {
            timeScale: newDir,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const text = 'WELCOME TO THE SPIDER-VERSE'
  const separator = ' ✦ '
  // Double the text so the loop is seamless when xPercent hits -50%
  const repeatedText = Array(12).fill(text).join(separator)

  return (
    <div
      ref={bannerRef}
      className="relative overflow-hidden py-4 md:py-5"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0000 50%, #0a0a0a 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div
        ref={trackRef}
        className="whitespace-nowrap select-none"
      >
        <span
          className="text-xl sm:text-2xl md:text-3xl font-black tracking-wider"
          style={{
            fontFamily: 'Bebas Neue',
            color: '#e23636',
            textShadow: '0 0 20px rgba(226,54,54,0.6), 0 0 60px rgba(226,54,54,0.2)',
          }}
        >
          {repeatedText}
        </span>
      </div>
    </div>
  )
}
