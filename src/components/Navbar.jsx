import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const links = ['Home', 'About', 'Gallery', 'Universe']

  useEffect(() => {
    const tl = gsap.timeline()
    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
    })
    tl.from('.nav-item', {
      y: -30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
    })

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md shadow-lg shadow-red-900/20 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="interactive flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center overflow-hidden">
            <img src="/spider.jpg" alt="Spider" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-bold text-2xl tracking-widest" style={{ fontFamily: 'Bebas Neue' }}>
            SPIDEY
          </span>
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="nav-item nav-link interactive text-gray-300 hover:text-white text-sm tracking-wider uppercase transition-colors"
            >
              {link}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button className="nav-item interactive hidden md:block px-6 py-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 text-sm tracking-wider uppercase rounded-sm">
          Join the Web
        </button>
      </div>
    </nav>
  )
}
