import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

const heroImages = [
  '/spidey4.jpg',
  '/spidey1.jpg',
  '/spidey2.jpg',
  '/spidey3.jpg',
  '/spidey5.jpg',
  '/spidey6.jpg',
  '/Miles.jpg'

]

export default function Hero() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const slidesRef = useRef(null)
  const particlesRef = useRef(null)
  const ctaRef = useRef(null)
  const logoRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const intervalRef = useRef(null)

  const goToSlide = useCallback((index) => {
    const slides = slidesRef.current?.querySelectorAll('.hero-slide')
    if (!slides) return

    // Fade out current slides
    slides.forEach((slide) => {
      gsap.to(slide, { opacity: 0, scale: 1.05, duration: 1.2, ease: 'power2.inOut' })
    })

    // Fade in target slide
    gsap.to(slides[index], { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.inOut' })
    setActiveSlide(index)
  }, [])

  useEffect(() => {
    // Start auto-rotation
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % heroImages.length
        goToSlide(next)
        return next
      })
    }, 4000)

    return () => clearInterval(intervalRef.current)
  }, [goToSlide])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 })

    // First slide scales in
    const firstSlide = slidesRef.current?.querySelector('.hero-slide')
    if (firstSlide) {
      tl.from(firstSlide, {
        scale: 1.3,
        duration: 2,
        ease: 'power3.out',
      })
    }

    // Logo emblem pulse in
    tl.from(logoRef.current, {
      scale: 0,
      opacity: 0,
      rotation: -180,
      duration: 1.2,
      ease: 'back.out(1.4)',
    }, '-=1.2')

    // Title chars animate in
    const titleChars = titleRef.current?.querySelectorAll('.t-char')
    if (titleChars) {
      tl.from(titleChars, {
        y: 60,
        opacity: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'back.out(1.7)',
      }, '-=0.6')
    }

    // CTA area
    tl.from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.3')

    // Particles
    createParticles()

    // Parallax on mouse move
    const handleMouseMove = (e) => {
      const xP = (e.clientX / window.innerWidth - 0.5) * 2
      const yP = (e.clientY / window.innerHeight - 0.5) * 2

      gsap.to(slidesRef.current, {
        x: xP * 12,
        y: yP * 8,
        duration: 1,
        ease: 'power2.out',
      })

      gsap.to(logoRef.current, {
        x: xP * -6,
        y: yP * -4,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const createParticles = () => {
    if (!particlesRef.current) return
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      const size = 2 + Math.random() * 4
      Object.assign(particle.style, {
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${60 + Math.random() * 40}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: '0',
        background: Math.random() > 0.5
          ? '#e23636'
          : `hsl(${25 + Math.random() * 20}, 100%, ${55 + Math.random() * 30}%)`,
        borderRadius: Math.random() > 0.3 ? '50%' : '0',
        filter: `blur(${Math.random() * 1}px)`,
      })
      particlesRef.current.appendChild(particle)

      gsap.to(particle, {
        y: -(120 + Math.random() * 350),
        x: (Math.random() - 0.5) * 120,
        opacity: 0.3 + Math.random() * 0.6,
        duration: 2.5 + Math.random() * 4,
        repeat: -1,
        delay: Math.random() * 3,
        ease: 'none',
      })
    }
  }

  const handleDotClick = (index) => {
    clearInterval(intervalRef.current)
    goToSlide(index)
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % heroImages.length
        goToSlide(next)
        return next
      })
    }, 4000)
  }

  return (
    <section ref={sectionRef} id="home" className="hero-section relative overflow-hidden">
      {/* Slideshow background images */}
      <div ref={slidesRef} className="absolute inset-0 z-0 scale-105">
        {heroImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Spider-Man ${i + 1}`}
            className="hero-slide absolute inset-0 w-full h-full object-cover object-top"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>

      {/* Dark cinematic overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-black/20 to-black/40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(80,0,0,0.25) 100%)',
      }} />

      {/* Ember particles */}
      <div ref={particlesRef} className="absolute inset-0 z-[5] overflow-hidden pointer-events-none" />

      {/* Center content — logo + title + CTA */}
      <div className="absolute inset-0 z-[10] flex flex-col items-center justify-center px-6">
        {/* Spider-Man emblem logo */}
        <div ref={logoRef} className="mb-6 md:mb-8">
          <img
            src="/logo2.jpg"
            alt="Spider-Man Emblem"
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain rounded-full"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(226,54,54,0.4)) drop-shadow(0 0 60px rgba(226,54,54,0.15))',
            }}
          />
        </div>              

        {/* Title — properly sized horizontal text */}
        <div ref={titleRef} className="text-center mb-4">
          <p
            className="text-sm sm:text-base md:text-lg tracking-[0.5em] uppercase mb-2"
            style={{
              fontFamily: 'Orbitron',
              color: '#ffffff',
              textShadow: '2px 2px 0 #7f1d1d, 3px 3px 6px rgba(0,0,0,0.5)',
              fontWeight: 700,
            }}
          >
            Into the Spider-Verse
          </p>
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-none select-none"
            style={{
              fontFamily: 'Bebas Neue',
              fontWeight: 900,
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, transparent 70%)',
              padding: '1.5rem 3rem',
              letterSpacing: '0.08em',
            }}
          >
            {'SPIDER-MAN'.split('').map((char, i) => (
              <span
                key={i}
                className="t-char"
                style={{
                  color: '#ffffff',
                  textShadow:
                    '2px 2px 0 #b91c1c, 4px 4px 0 #991b1b, 6px 6px 0 #7f1d1d, 8px 8px 0 #450a0a, 10px 10px 15px rgba(0,0,0,0.6)',
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Navigation Links */}
        <div ref={ctaRef} className="flex flex-wrap justify-center gap-10 md:gap-14 mt-10">
          {[
            { label: 'Home', href: '#home' },
            { label: 'About', href: '#about' },
            { label: 'Gallery', href: '#gallery' },
            { label: 'Multiverse', href: '#universe' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="interactive text-red-500 text-sm md:text-base font-bold tracking-[0.3em] uppercase transition-all duration-300 hover:text-white hover:-translate-y-1"
              style={{
                textShadow: '0 0 8px rgba(226,54,54,0.4)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex gap-3">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`interactive w-2 h-2 rounded-full transition-all duration-500 ${
              activeSlide === i
                ? 'bg-red-500 w-6 shadow-lg shadow-red-500/50'
                : 'bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-[10] flex flex-col items-center gap-2">
        <span className="text-gray-600 text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-4 h-7 border border-gray-600 rounded-full flex justify-center p-1">
          <div className="w-0.5 h-1.5 bg-red-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
