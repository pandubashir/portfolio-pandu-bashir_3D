import { useEffect, useRef, useState, type RefObject } from 'react'
import { SplineScene } from './SplineScene'

const WORDS = [
  'Machine Learning',
  'Data Science',
  'Data Analysis',
  'Software Engineering',
]

const SPLINE_SCENE_URL =
  'https://prod.spline.design/Im6PHeUgHW7FmVsy/scene.splinecode'

function useTypedText() {
  const [text, setText] = useState('')

  useEffect(() => {
    let idx = 0
    let charIdx = 0
    let typing = true
    let timeout: ReturnType<typeof setTimeout>

    function tick() {
      if (typing) {
        if (charIdx < WORDS[idx].length) {
          charIdx++
          setText(WORDS[idx].slice(0, charIdx))
          timeout = setTimeout(tick, 100)
        } else {
          timeout = setTimeout(() => {
            typing = false
            tick()
          }, 2000)
        }
      } else {
        if (charIdx > 0) {
          charIdx--
          setText(WORDS[idx].slice(0, charIdx))
          timeout = setTimeout(tick, 50)
        } else {
          idx = (idx + 1) % WORDS.length
          typing = true
          tick()
        }
      }
    }

    tick()
    return () => clearTimeout(timeout)
  }, [])

  return text
}

function useParallax(imgRef: RefObject<HTMLImageElement | null>) {
  useEffect(() => {
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let raf: number

    function handleMove(e: MouseEvent) {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetX = (e.clientX - cx) / cx
      targetY = (e.clientY - cy) / cy
    }

    function animate() {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(1.05) translate(${currentX * 12}px, ${currentY * 8}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    animate()
    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [imgRef])
}

export function Hero() {
  const typedText = useTypedText()
  const imgRef = useRef<HTMLImageElement>(null)
  useParallax(imgRef)

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col md:flex-row items-center px-6 md:px-20 gap-10 md:gap-15 relative overflow-hidden pt-20 md:pt-0 text-center md:text-left"
    >
      {/* Robot Spline — z-0, pointer-events aktif supaya cursor bisa interaksi */}
      <div className="absolute inset-0 z-0" style={{ transform: 'scaleX(-1)' }}>
        <SplineScene scene={SPLINE_SCENE_URL} className="w-full h-full" />

        {/* Penutup watermark — counter-mirror karena parent di-flip */}
        <div
          className="absolute bottom-0 left-0 w-72 h-20 pointer-events-none"
          style={{ zIndex: 2, background: 'linear-gradient(to top right, #080b12 65%, transparent 100%)', transform: 'scaleX(-1)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-56 h-12 pointer-events-none rounded-tr-2xl"
          style={{ zIndex: 3, background: '#080b12', transform: 'scaleX(-1)' }}
        />
      </div>

      {/* Overlay gradasi */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg/40 via-bg/10 to-bg/60 pointer-events-none" />

      {/* Content — z-10 di atas robot, pointer-events normal */}
      <div className="flex-1 relative z-10">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-4 py-1.5 text-[0.72rem] text-accent font-semibold mb-7 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-green" />
          Open for opportunities
        </div>

        <p className="text-sm text-muted2 mb-2 tracking-widest uppercase">
          Hey, I'm Pandu 👋
        </p>

        <h1 className="text-[2.6rem] md:text-[4.8rem] font-bold leading-[1.02] tracking-[-2px] mb-4">
          <span className="glass-text">Software</span>
          <br />
          <span
            className="bg-gradient-to-br from-accent via-accent2 to-accent3 bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 4px 24px rgba(139,92,246,0.35))' }}
          >
            Engineer
          </span>
        </h1>

        <p className="text-[0.85rem] text-muted2/70 font-light mb-4 tracking-[2px] leading-relaxed italic uppercase">
          Where Robust Logic Meets, Seamless Execution.
        </p>

        <h2 className="text-[1.15rem] md:text-[1.5rem] font-light text-muted2 mb-6 tracking-wide">
          Enthusiast{' '}
          <span className="text-accent font-semibold italic">{typedText}</span>
          <span className="text-accent animate-blink">|</span>
        </h2>

        <p className="text-[0.88rem] text-muted2/80 max-w-[420px] mb-10 leading-[1.9] mx-auto md:mx-0 font-light tracking-wide">
          A Software Engineer passionate about Data Science, Data Analysis,
          and building functional systems you can rely on. Currently
          exploring machine learning, web development, and digital forensics.
        </p>

        <div className="flex gap-3.5 justify-center md:justify-start flex-wrap">
          <a
            href="https://www.linkedin.com/in/pandu-bashir-alamin-a357a8331/"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3 rounded-xl font-semibold text-[0.82rem] no-underline transition-all border-none inline-flex items-center gap-2 tracking-widest uppercase bg-gradient-to-br from-accent to-accent2 text-white shadow-[0_8px_32px_rgba(139,92,246,0.35)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(139,92,246,0.5)]"
          >
            Get In Touch →
          </a>
          <a
            href="#projects"
            className="px-7 py-3 rounded-xl font-semibold text-[0.82rem] no-underline transition-all inline-flex items-center gap-2 tracking-widest uppercase bg-white/4 border border-white/8 text-muted2 backdrop-blur-md hover:border-accent/40 hover:text-accent hover:-translate-y-0.5"
          >
            Browse Projects
          </a>
        </div>
      </div>

      {/* Foto profil */}
      <div className="relative z-10 flex-shrink-0 w-full md:w-[300px] h-[300px] md:h-[500px] md:-mr-10 md:mt-8 pointer-events-none">
        <img
          ref={imgRef}
          id="hero-img"
          className="hero-profile-img w-full h-full object-cover object-top block"
          src="/poto-pandu.jpeg"
          alt="Pandu Bashir Alamin"
        />
      </div>
    </section>
  )
}