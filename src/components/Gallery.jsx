import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: '/download.jpg', title: 'The Classic', subtitle: 'Peter Parker' },
  { src: '/download (1).jpg', title: 'Into the Verse', subtitle: 'Miles Morales' },
  { src: '/download (2).jpg', title: 'Spider-Gwen', subtitle: 'Gwen Stacy' },
  { src: '/download (3).jpg', title: 'Noir', subtitle: 'Spider-Man Noir' },
  { src: '/download (4).jpg', title: 'The Future', subtitle: 'Spider-Man 2099' },
  { src: '/SPIDERMAN.jpg', title: 'The Legend', subtitle: 'Friendly Neighbor' },
]

export default function Gallery() {
  const sectionRef = useRef(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.gallery-title', {
        scrollTrigger: {
          trigger: '.gallery-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // Horizontal scroll for gallery
      const scrollContainer = scrollContainerRef.current
      if (scrollContainer) {
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth

        gsap.to(scrollContainer, {
          scrollLeft: scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 20%',
            end: `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })
      }

      // Gallery cards reveal
      gsap.from('.gallery-item', {
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        scale: 0.85,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Card tilt effect
  const handleMouseMove = (e, cardEl) => {
    const rect = cardEl.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    gsap.to(cardEl, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    })
  }

  const handleMouseLeave = (cardEl) => {
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <section ref={sectionRef} id="gallery" className="relative py-24 bg-[#0a0a0a]">
      <div className="section-divider mb-20" />

      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="gallery-title">
          <span className="text-red-600 text-sm tracking-[0.3em] uppercase block mb-3">The Collection</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white" style={{ fontFamily: 'Bebas Neue' }}>
            SPIDER <span className="text-red-600">GALLERY</span>
          </h2>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollContainerRef}
        className="gallery-grid overflow-x-auto overflow-y-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-6 px-6 pb-8" style={{ width: 'max-content' }}>
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-item gallery-card interactive relative group flex-shrink-0 w-72 sm:w-80 md:w-96 overflow-hidden rounded-xl"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-[450px] md:h-[500px]">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Red accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-red-500 text-xs tracking-widest uppercase block mb-1">{img.subtitle}</span>
                  <h3 className="text-white text-2xl font-bold" style={{ fontFamily: 'Bebas Neue' }}>
                    {img.title}
                  </h3>
                  <div className="w-0 group-hover:w-12 h-0.5 bg-red-600 mt-3 transition-all duration-500" />
                </div>

                {/* Corner number */}
                <div className="absolute top-4 right-4 text-red-600/30 text-6xl font-black" style={{ fontFamily: 'Bebas Neue' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
