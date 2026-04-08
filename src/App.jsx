import { useState } from 'react'
import SpiderCursor from './components/SpiderCursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Universe from './components/Universe'
import Footer from './components/Footer'
import ScrollBanner from './components/ScrollBanner'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      {/* Custom spider cursor */}
      <SpiderCursor />

      {/* Loader */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <main>
        <Hero />
        <ScrollBanner />
        <About />
        <Gallery />
        <Universe />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
