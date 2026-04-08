import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.footer-link', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      })

      // Web decoration animation
      gsap.from('.footer-web', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative py-16 bg-black border-t border-white/5 overflow-hidden">
      {/* Web decoration */}
      <div className="footer-web absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="20" stroke="#e23636" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" stroke="#e23636" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" stroke="#e23636" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="80" stroke="#e23636" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="99" stroke="#e23636" strokeWidth="0.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="100"
              y1="100"
              x2={100 + 99 * Math.cos((angle * Math.PI) / 180)}
              y2={100 + 99 * Math.sin((angle * Math.PI) / 180)}
              stroke="#e23636"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      <div className="footer-content max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center overflow-hidden">
                <img src="/spider.jpg" alt="Spider" className="w-full h-full object-cover" />
              </div>
              <span className="text-white font-bold text-2xl tracking-widest" style={{ fontFamily: 'Bebas Neue' }}>
                SPIDEY
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your friendly neighborhood Spider-Man. Protecting the city, one web at a time.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-4" style={{ fontFamily: 'Orbitron' }}>
              Explore
            </h4>
            <div className="space-y-2">
              {['Home', 'About', 'Gallery', 'Universe'].map((link) => (
                <button
                  key={link}
                  className="footer-link interactive block text-gray-500 hover:text-red-500 text-sm transition-colors"
                  onClick={() => {
                    const el = document.getElementById(link.toLowerCase())
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Spider-Sense */}
          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-4" style={{ fontFamily: 'Orbitron' }}>
              Spider-Sense
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Stay connected to the Spider-Verse. Get notifications when danger is near.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white text-sm rounded-sm focus:outline-none focus:border-red-600/50 transition-colors"
              />
              <button className="interactive px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm tracking-wider uppercase rounded-sm transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; 2026 SPIDEY. All rights reserved. Not affiliated with Marvel.
          </p>
          <p className="text-gray-700 text-xs">
            Built with <span className="text-red-600">&#9829;</span> and web fluid
          </p>
        </div>
      </div>
    </footer>
  )
}
