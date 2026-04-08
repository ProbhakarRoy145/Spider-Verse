import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const spiders = [
  {
    name: 'Peter Parker',
    universe: 'Earth-616',
    img: '/download.jpg',
    desc: 'The original Spider-Man from the main Marvel universe.',
  },
  {
    name: 'Miles Morales',
    universe: 'Earth-1610',
    img: '/Miles.jpg',
    desc: 'A Brooklyn teenager who carries on the Spider-Man legacy.',
  },
  {
    name: 'Gwen Stacy',
    universe: 'Earth-65',
    img: '/spidey6.jpg',
    desc: 'In her universe, Gwen was bitten by the spider instead of Peter.',
  },
  {
    name: 'Spider-Noir',
    universe: 'Earth-90214',
    img: '/Spider Noir.jpg',
    desc: 'A dark, gritty Spider-Man from 1930s New York during the Great Depression.',
  },
  {
    name: 'Pravitra Prabhakar',
    universe: 'Earth-50101',
    img: '/Pavitra.jpg',
    desc: 'Indian Spider-Man.',
  },
]

export default function Universe() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.from('.universe-title', {
        scrollTrigger: {
          trigger: '.universe-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // Cards with staggered appear + slide from alternating sides
      const cards = document.querySelectorAll('.universe-card')
      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -120 : 120

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          x: fromX,
          opacity: 0,
          rotation: i % 2 === 0 ? -5 : 5,
          duration: 1.2,
          ease: 'power3.out',
        })
      })

      // Parallax images inside cards
      document.querySelectorAll('.universe-card-img').forEach((img) => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          yPercent: -10,
          ease: 'none',
        })
      })

      // Marquee speed up on scroll
      gsap.to('.marquee-track', {
        scrollTrigger: {
          trigger: '.marquee-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        x: -200,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const marqueeText = 'SPIDER-VERSE • ACROSS THE DIMENSIONS • EVERY UNIVERSE NEEDS A HERO • '

  return (
    <section ref={sectionRef} id="universe" className="relative py-24 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
      <div className="section-divider mb-20" />

      {/* Marquee */}
      <div className="marquee-wrapper overflow-hidden mb-16">
        <div className="marquee-track whitespace-nowrap">
          <span className="text-8xl md:text-9xl font-black text-white/5 tracking-wider" style={{ fontFamily: 'Bebas Neue' }}>
            {marqueeText.repeat(4)}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="universe-title text-center">
          <span className="text-red-600 text-sm tracking-[0.3em] uppercase block mb-3">Multiverse</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white" style={{ fontFamily: 'Bebas Neue' }}>
            THE SPIDER-<span className="text-red-600">VERSE</span>
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {spiders.map((s, i) => (
          <div
            key={i}
            className={`universe-card interactive flex flex-col ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } items-center gap-8 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-600/30 transition-all duration-500 group hover:-translate-y-1 ${
              i % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:mr-0 md:ml-auto'
            } md:w-[85%]`}
          >
            {/* Image */}
            <div className="w-full md:w-72 h-64 md:h-80 overflow-hidden rounded-xl relative flex-shrink-0">
              <img
                src={s.img}
                alt={s.name}
                className="universe-card-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-red-600/90 text-white text-xs tracking-wider uppercase rounded-sm">
                {s.universe}
              </div>
            </div>

            {/* Text */}
            <div className={`flex-1 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Bebas Neue' }}>
                {s.name}
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-4">{s.desc}</p>
              <div className={`w-0 group-hover:w-20 h-0.5 bg-red-600 transition-all duration-700 ${i % 2 === 0 ? '' : 'ml-auto'}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
