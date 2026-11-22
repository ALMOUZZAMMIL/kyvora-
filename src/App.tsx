import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { content, whatsappLink, type Lang } from './content'

const NeuralCore = lazy(() => import('./components/NeuralCore'))

const ease = [0.22, 1, 0.36, 1] as const

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Kyvora">
      <svg viewBox="0 0 40 40" width="30" height="30" aria-hidden>
        <circle cx="19" cy="21" r="11" fill="none" stroke="var(--ember)" strokeWidth="4.5" />
        <path d="M30 4l2 4.5 4.5 2-4.5 2L30 17l-2-4.5-4.5-2 4.5-2z" fill="var(--peach)" />
      </svg>
      <span>Kyvora</span>
    </a>
  )
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView || !ref.current) return
    const c = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v) + suffix),
    })
    return () => c.stop()
  }, [inView, to, suffix])
  return <span ref={ref}>0{suffix}</span>
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  )
}

function ServiceCard({ s, i }: { s: (typeof content.fr.services.items)[number]; i: number }) {
  const ref = useRef<HTMLElement>(null)
  return (
    <Reveal delay={i * 0.08}>
      <article
        ref={ref}
        className="service"
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect()
          ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`)
          ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`)
        }}
      >
        <div className="service-top">
          <span className="mono">0{i + 1}</span>
          <span className="tag mono">{s.tag}</span>
        </div>
        <h3>{s.name}</h3>
        <p>{s.text}</p>
        <ul>
          {s.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </article>
    </Reveal>
  )
}

function Process({ c }: { c: typeof content.fr }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <section id="process" className="section process">
      <div className="wrap process-grid">
        <div className="process-head">
          <Reveal>
            <span className="label mono">{c.process.label}</span>
            <h2>{c.process.title}</h2>
          </Reveal>
        </div>
        <div className="steps" ref={ref}>
          <div className="rail">
            <motion.div className="rail-fill" style={{ height: h }} />
          </div>
          {c.process.steps.map((s, i) => (
            <Reveal key={s.k} delay={0.05}>
              <div className="step">
                <span className="node" />
                <span className="mono step-k">
                  {String(i + 1).padStart(2, '0')} / {s.k}
                </span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('kyvora-lang') as Lang) || 'fr'
    } catch {
      return 'fr'
    }
  })
  const c = content[lang]
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('kyvora-lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const wa = whatsappLink(c.hero.waMsg)

  return (
    <>
      <div className="grain" aria-hidden />
      <header className={`nav ${scrolled ? 'nav-solid' : ''}`}>
        <div className="wrap nav-inner">
          <Logo />
          <nav className="nav-links">
            <a href="#services">{c.nav.services}</a>
            <a href="#process">{c.nav.process}</a>
            <a href="#work">{c.nav.work}</a>
            <a href="#contact">{c.nav.contact}</a>
          </nav>
          <div className="nav-right">
            <div className="lang mono" role="group" aria-label="Language">
              {(['fr', 'en'] as const).map((l) => (
                <button key={l} className={l === lang ? 'on' : ''} onClick={() => setLang(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a className="btn btn-sm" href={wa} target="_blank" rel="noreferrer">
              {c.nav.cta}
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-canvas" aria-hidden>
            <Suspense fallback={null}>
              <NeuralCore />
            </Suspense>
          </div>
          <div className="hero-fade" aria-hidden />
          <div className="wrap hero-inner">
            <motion.span className="kicker mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
              <i className="dot" /> {c.hero.kicker}
            </motion.span>
            <h1 key={lang}>
              {c.hero.title.map((line, i) => (
                <span className="line" key={line}>
                  <motion.span
                    className={i === c.hero.title.length - 1 ? 'accent' : ''}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease }}>
              {c.hero.sub}
            </motion.p>
            <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.9, ease }}>
              <a className="btn" href={wa} target="_blank" rel="noreferrer">
                <WaIcon /> {c.hero.primary}
              </a>
              <a className="btn btn-ghost" href="#work">
                {c.hero.secondary} <span aria-hidden>↘</span>
              </a>
            </motion.div>
          </div>
          <div className="wrap hero-hud mono" aria-hidden>
            {c.hero.hud.map((h, i) => (
              <div key={h} className="hud-item">
                <span>{h}</span>
                <div className="hud-bar">
                  <i style={{ animationDelay: `${i * 0.6}s` }} />
                </div>
              </div>
            ))}
            <span className="scroll-cue">{c.hero.scroll} ↓</span>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="marquee" aria-label="Services">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div className="marquee-row" key={k} aria-hidden={k === 1}>
                {c.marquee.map((m) => (
                  <span key={m}>
                    {m} <b>✦</b>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="label mono">{c.services.label}</span>
              <h2>{c.services.title}</h2>
            </Reveal>
            <div className="services">
              {c.services.items.map((s, i) => (
                <ServiceCard key={s.tag} s={s} i={i} />
              ))}
            </div>
          </div>
        </section>

        <Process c={c} />

        {/* WORK */}
        <section id="work" className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="label mono">{c.work.label}</span>
              <h2>{c.work.title}</h2>
            </Reveal>
            <div className="work">
              {c.work.items.map((w, i) => (
                <Reveal key={w.name} delay={i * 0.1} className={c.work.items.length === 1 ? 'work-wide' : ''}>
                  <a className="project" href={w.url} target="_blank" rel="noreferrer" style={{ ['--h' as string]: w.hue }}>
                    <div className="project-art">
                      {w.image && <img className="project-shot" src={w.image} alt={w.name} loading="lazy" />}
                      <div className="orb" />
                      <div className="grid-lines" />
                      <span className="project-mark">{w.name}</span>
                    </div>
                    <div className="project-meta">
                      <div>
                        <h3>{w.name}</h3>
                        <span>{w.type}</span>
                      </div>
                      <span className="visit">{c.work.cta} ↗</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats-band">
          <div className="wrap stats">
            {c.stats.map((s) => (
              <div key={s.l} className="stat">
                <strong>
                  <Counter to={s.v} suffix={s.s} />
                </strong>
                <span className="stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="section cta">
          <div className="cta-glow" aria-hidden />
          <div className="wrap cta-inner">
            <Reveal>
              <span className="label mono">{c.cta.label}</span>
              <h2 className="cta-title">
                {c.cta.title[0]} <span className="accent">{c.cta.title[1]}</span>
              </h2>
              <p>{c.cta.sub}</p>
              <a className="btn btn-lg" href={wa} target="_blank" rel="noreferrer">
                <WaIcon /> {c.cta.button}
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <Logo />
          <span>{c.footer.tagline}</span>
          <span className="mono muted">
            © {new Date().getFullYear()} Kyvora · {c.footer.demo}
          </span>
        </div>
        <div className="footer-word" aria-hidden>
          KYVORA
        </div>
      </footer>
    </>
  )
}
