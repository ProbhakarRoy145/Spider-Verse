import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SpiderCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const webLinesRef = useRef([])
  const pos = useRef({ x: 0, y: 0 })
  const prevPos = useRef({ x: 0, y: 0 })
  const webTrailsRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const trails = webTrailsRef.current

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }

      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: 'power2.out',
      })

      gsap.to(ring, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Spider web trail effect
      const dx = e.clientX - prevPos.current.x
      const dy = e.clientY - prevPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 30) {
        createWebTrail(prevPos.current.x, prevPos.current.y, e.clientX, e.clientY)
        prevPos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const createWebTrail = (x1, y1, x2, y2) => {
      if (!trails) return
      const line = document.createElement('div')
      line.className = 'cursor-web-line'

      const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
      const angle = Math.atan2(y2 - y1, x2 - x1)

      line.style.width = `${length}px`
      line.style.height = '1px'
      line.style.left = `${x1}px`
      line.style.top = `${y1}px`
      line.style.transform = `rotate(${angle}rad)`
      line.style.transformOrigin = '0 0'
      line.style.background = 'linear-gradient(90deg, rgba(226,54,54,0.4), transparent)'

      trails.appendChild(line)

      gsap.to(line, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => line.remove(),
      })
    }

    const onMouseDown = () => {
      gsap.to(dot, { scale: 2.5, duration: 0.15 })
      gsap.to(ring, { scale: 1.5, borderColor: '#e23636', duration: 0.15 })

      // Web burst effect on click
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const lineEl = document.createElement('div')
        lineEl.className = 'cursor-web-line'
        lineEl.style.left = `${pos.current.x}px`
        lineEl.style.top = `${pos.current.y}px`
        lineEl.style.width = '0px'
        lineEl.style.height = '1px'
        lineEl.style.transform = `rotate(${angle}rad)`
        lineEl.style.transformOrigin = '0 0'
        lineEl.style.background = 'linear-gradient(90deg, rgba(226,54,54,0.8), transparent)'
        trails.appendChild(lineEl)

        gsap.to(lineEl, {
          width: 40 + Math.random() * 30,
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(lineEl, {
          opacity: 0,
          duration: 0.5,
          delay: 0.1,
          ease: 'power2.out',
          onComplete: () => lineEl.remove(),
        })
      }
    }

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.15 })
      gsap.to(ring, { scale: 1, borderColor: 'rgba(226,54,54,0.5)', duration: 0.15 })
    }

    // Hover detection for interactive elements
    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .interactive')) {
        ring.classList.add('hovering')
        gsap.to(dot, { scale: 0.5, background: '#fff', duration: 0.2 })
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .interactive')) {
        ring.classList.remove('hovering')
        gsap.to(dot, { scale: 1, background: '#e23636', duration: 0.2 })
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    // Spider idle animation — pulsing ring
    gsap.to(ring, {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={webTrailsRef} className="spider-cursor" />
    </>
  )
}
