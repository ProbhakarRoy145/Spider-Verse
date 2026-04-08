import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title reveal
      gsap.from('.about-title', {
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // Left column - text cards sliding in
      gsap.from('.about-card-left', {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        x: -120,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      })

      // Right column - image with parallax
      gsap.from('.about-image', {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        x: 120,
        opacity: 0,
        scale: 0.8,
        rotation: 5,
        duration: 1.2,
        ease: 'power3.out',
      })

      // Image parallax on scroll
      gsap.to('.about-image-inner', {
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        yPercent: -15,
        ease: 'none',
      })

      // Stats counter animation
      const statEls = document.querySelectorAll('.stat-value')
      statEls.forEach((el) => {
        const target = parseInt(el.dataset.value, 10)
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          innerText: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function () {
            el.textContent = Math.ceil(gsap.getProperty(el, 'innerText'))
          },
        })
      })

      // Decorative web lines
      gsap.from('.web-deco-line', {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scaleX: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { label: 'Universes', value: 42 },
    { label: 'Villains Defeated', value: 156 },
    { label: 'Web Shots', value: 999 },
    { label: 'Cities Saved', value: 28 },
  ]

  return (
    <section ref={sectionRef} id="about" className="relative py-24 lg:py-32 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
      {/* Divider */}
      <div className="section-divider mb-20" />

      {/* Section title */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="about-title">
          <span className="text-red-600 text-sm tracking-[0.3em] uppercase block mb-3">Origin Story</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white" style={{ fontFamily: 'Bebas Neue' }}>
            WHO IS <span className="text-red-600">SPIDER-MAN</span>?
          </h2>
        </div>
      </div>

      {/* Content grid */}
      <div className="about-content max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left - text */}
        <div className="space-y-6">
          <div className="about-card-left p-6 rounded-lg bg-white/5 border border-white/10 hover:border-red-600/30 transition-colors duration-500">
            <h3 className="text-red-500 text-xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>THE BITE</h3>
            <p className="text-gray-400 leading-relaxed">
              Peter Parker was just an ordinary teenager until a radioactive spider changed everything.
              Gaining incredible powers — wall-crawling, superhuman strength, and a mysterious spider-sense —
              he became something extraordinary.
            </p>
          </div>

          <div className="web-deco-line h-px bg-gradient-to-r from-red-600/50 to-transparent" />

          <div className="about-card-left p-6 rounded-lg bg-white/5 border border-white/10 hover:border-red-600/30 transition-colors duration-500">
            <h3 className="text-red-500 text-xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>THE RESPONSIBILITY</h3>
            <p className="text-gray-400 leading-relaxed">
              After the tragic loss of Uncle Ben, Peter learned the hardest lesson of his life:
              with great power comes great responsibility. He swore to protect the innocent.
            </p>
          </div>

          <div className="web-deco-line h-px bg-gradient-to-r from-red-600/50 to-transparent" />

          <div className="about-card-left p-6 rounded-lg bg-white/5 border border-white/10 hover:border-red-600/30 transition-colors duration-500">
            <h3 className="text-red-500 text-xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>THE SPIDER-VERSE</h3>
            <p className="text-gray-400 leading-relaxed">
              Across infinite dimensions, countless Spider-People protect their worlds.
              Miles Morales, Gwen Stacy, Spider-Man 2099 — every universe has its own hero.
            </p>
          </div>
        </div>

        {/* Right - image */}
        <div className="about-image relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 border-2 border-red-600/20 rounded-xl z-20 pointer-events-none" />
          <img
            src="/download.jpg"
            alt="Spider-Man"
            className="about-image-inner w-full h-[500px] lg:h-[600px] object-cover rounded-xl"
          />
          {/* Corner web decoration */}
          <svg className="absolute top-0 right-0 w-32 h-32 opacity-10 z-20" viewBox="0 0 100 100">
            <line x1="100" y1="0" x2="0" y2="100" stroke="#e23636" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="0" y2="50" stroke="#e23636" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="50" y2="100" stroke="#e23636" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="0" y2="75" stroke="#e23636" strokeWidth="0.3" />
            <line x1="100" y1="0" x2="75" y2="100" stroke="#e23636" strokeWidth="0.3" />
            <path d="M 90 5 Q 50 30 10 90" stroke="#e23636" strokeWidth="0.3" fill="none" />
            <path d="M 95 10 Q 60 40 20 85" stroke="#e23636" strokeWidth="0.3" fill="none" />
          </svg>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="about-card-left text-center p-6 rounded-lg bg-white/5 border border-white/10 hover:border-red-600/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="stat-value stat-number text-4xl md:text-5xl text-red-500 mb-2" data-value={s.value}>
                0
              </div>
              <div className="text-gray-500 text-sm tracking-wider uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
