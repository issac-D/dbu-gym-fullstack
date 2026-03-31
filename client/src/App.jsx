import { useEffect, useMemo, useState } from 'react'
import Footer from './components/Footer'

function DumbbellIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9v6" />
      <path d="M7 7v10" />
      <path d="M10 8h4" />
      <path d="M10 16h4" />
      <path d="M14 8h0" />
      <path d="M14 16h0" />
      <path d="M17 7v10" />
      <path d="M20 9v6" />
      <rect x="9" y="10" width="6" height="4" rx="2" />
    </svg>
  )
}

function MoonIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

function SunIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-semibold tracking-wide text-white/70 transition hover:text-white"
    >
      {children}
    </a>
  )
}

function ApparatusIcon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function StatIcon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const apparatusItems = [
  {
    title: 'Free Weights',
    description: 'Dumbbells up to 150lbs, Olympic barbells, and calibrated plates.',
    icon: (
      <ApparatusIcon>
        <path d="M3 10v4" />
        <path d="M7 8v8" />
        <path d="M17 8v8" />
        <path d="M21 10v4" />
        <rect x="9" y="10" width="6" height="4" rx="2" />
      </ApparatusIcon>
    ),
  },
  {
    title: 'Cardio Zone',
    description: 'Latest treadmills, stair masters, and rowers with screens.',
    icon: (
      <ApparatusIcon>
        <path d="M5 18h14" />
        <path d="M7 18l4-10 4 10" />
        <circle cx="17.5" cy="7.5" r="2.5" />
      </ApparatusIcon>
    ),
  },
  {
    title: 'Cable Machines',
    description: 'Functional trainers to target every muscle group safely.',
    icon: (
      <ApparatusIcon>
        <path d="M6 3v18" />
        <path d="M18 3v18" />
        <path d="M6 7h12" />
        <path d="M9 21v-6" />
        <path d="M15 21v-6" />
      </ApparatusIcon>
    ),
  },
  {
    title: 'Calisthenics',
    description: 'Pull-up bars and dip stations for bodyweight mastery.',
    icon: (
      <ApparatusIcon>
        <path d="M4 6h16" />
        <path d="M6 6v12" />
        <path d="M18 6v12" />
        <path d="M12 10v8" />
        <path d="M9 14h6" />
      </ApparatusIcon>
    ),
  },
  {
    title: 'Combat Zone',
    description: 'Heavy bags and a boxing ring for high-intensity conditioning.',
    icon: (
      <ApparatusIcon>
        <path d="M9 4h6" />
        <path d="M10 4v3" />
        <path d="M14 4v3" />
        <rect x="8" y="7" width="8" height="12" rx="3" />
      </ApparatusIcon>
    ),
  },
  {
    title: 'Recovery',
    description: 'Massage guns and saunas for post-workout care.',
    icon: (
      <ApparatusIcon>
        <path d="M4 14h16" />
        <path d="M6 14c0-3 3-6 6-6s6 3 6 6" />
        <path d="M8 18h8" />
      </ApparatusIcon>
    ),
  },
]

const pricingPlans = [
  {
    name: 'Day Pass',
    price: '15 ETB',
    term: '/day',
    description: 'Perfect for travelers.',
    perks: ['Single Day Access', 'Locker Room Access', 'No Guest Pass'],
    cta: 'Get Day Pass',
  },
  {
    name: 'Monthly',
    price: '800 ETB',
    term: '/month',
    description: 'Flexible commitment.',
    perks: ['24/7 Gym Access', 'Free Group Classes', '1 Guest Pass/mo'],
    cta: 'Join Monthly',
    featured: true,
  },
  {
    name: 'Yearly',
    price: '8000 ETB',
    term: '/year',
    description: "Save 2 months' fees.",
    perks: ['All Monthly Perks', 'Private Intro Session', 'Unlimited Guest Passes'],
    cta: 'Go Yearly',
  },
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('dbu-theme')
  if (stored === 'light' || stored === 'dark') return stored
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
  return prefersLight ? 'light' : 'dark'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('dbu-theme', theme)
  }, [theme])

  const toggleLabel = useMemo(
    () => (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'),
    [theme]
  )

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--accent)] glow-ring">
              <DumbbellIcon className="h-8 w-8" />
            </span>
            <span className="font-display text-4xl tracking-wide text-white md:text-5xl">
              <span className="text-[var(--accent)]">DBU</span>GYM
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#apparatus">Apparatus</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={toggleLabel}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-[var(--accent)] hover:shadow-[0_0_25px_var(--accent-glow)]"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-4 w-4 text-[var(--accent)]" />
              ) : (
                <MoonIcon className="h-4 w-4 text-[var(--accent)]" />
              )}
              <span className="uppercase tracking-[0.2em]">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>
            <a
              href="#pricing"
              className="hidden rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent)] hover:text-black sm:inline-flex"
            >
              Login / Register
            </a>
          </div>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="hero-dark relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
            <p className="hero-pill mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] animate-fade-up">
              Stronger Every Day
            </p>
            <h1 className="hero-title font-display text-4xl font-semibold leading-tight tracking-wide md:text-6xl animate-fade-up">
              Build Your <span className="text-[var(--accent)]">Dream Body</span>
            </h1>
            <p className="hero-subtitle mt-5 max-w-2xl text-base md:text-lg animate-fade-up">
              State of the art equipment, expert trainers, and a community that
              supports your goals. Train smarter, recover faster, and show up for
              the strongest version of yourself.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-up">
              <a
                href="#pricing"
                className="hero-cta rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition hover:translate-y-[-2px] hover:bg-[var(--accent-strong)]"
              >
                Join Now
              </a>
              <a
                href="#about"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
              >
                Explore The Gym
              </a>
            </div>
            <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
              {[
                {
                  label: '24/7 Access',
                  value: 'Anytime',
                  icon: (
                    <StatIcon>
                      <path d="M12 8v4l2 2" />
                      <circle cx="12" cy="12" r="7" />
                    </StatIcon>
                  ),
                },
                {
                  label: 'Certified Coaches',
                  value: '12+',
                  icon: (
                    <StatIcon>
                      <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.6-4.9-2.7-4.9 2.7.9-5.6-4-3.9L9.5 8z" />
                    </StatIcon>
                  ),
                },
                {
                  label: 'Member Community',
                  value: '2,500+',
                  icon: (
                    <StatIcon>
                      <circle cx="8" cy="9" r="3" />
                      <circle cx="16" cy="9" r="3" />
                      <path d="M3 19c0-3 3-5 5-5" />
                      <path d="M21 19c0-3-3-5-5-5" />
                    </StatIcon>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="stat-card rounded-2xl p-5 backdrop-blur animate-fade-up"
                >
                  <div className="flex items-center justify-between">
                    <span className="stat-card-icon flex h-10 w-10 items-center justify-center rounded-full text-lg">
                      {item.icon}
                    </span>
                    <span className="text-2xl font-semibold text-white">{item.value}</span>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/70">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-[var(--bg)] py-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-8">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[var(--text-soft)]">
                About Us
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-[var(--text)] md:text-4xl">
                Built to support your strongest goals.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                At Dbu-Gym, we believe fitness is not just a hobby, but a
                lifestyle. We have helped thousands of members achieve their
                physical and mental potential with 24/7 access, expert trainers,
                and a welcoming community.
              </p>
              <div className="mt-8 space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  'Certified Trainers',
                  'Modern Equipment',
                  'Personalized Programs',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--accent)] animate-pulse-glow">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-float">
              <div className="absolute -inset-4 rounded-3xl border border-[var(--border)]" />
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Gym Trainer"
                className="relative w-full rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section id="apparatus" className="bg-[var(--bg-alt)] py-20">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-[var(--text-soft)]">
                Apparatus
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-[var(--text)] md:text-4xl">
                World-class apparatus
              </h2>
              <p className="mt-4 text-sm text-[var(--text-muted)] md:text-base">
                Train with the best equipment industry standards have to offer.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {apparatusItems.map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-2 hover:border-[var(--accent)] card-sheen"
                >
                  <div className="apparatus-icon flex h-12 w-12 items-center justify-center rounded-xl">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[var(--bg)] py-20">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-[var(--text-soft)]">
                Pricing
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-[var(--text)] md:text-4xl">
                Choose your plan
              </h2>
              <p className="mt-4 text-sm text-[var(--text-muted)] md:text-base">
                Flexible options for every training style.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-[var(--accent)] bg-[var(--surface)] px-6 py-5 text-sm text-[var(--text-muted)] glow-ring">
              <span className="font-semibold text-[var(--text)]">Staff member?</span>{' '}
              Log in with your employee or student ID to apply a 20% discount.
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`pricing-card relative flex h-full flex-col overflow-hidden rounded-2xl p-8 text-left transition hover:-translate-y-2 card-sheen ${
                    plan.featured
                      ? 'featured glow-ring'
                      : ''
                  }`}
                >
                  {plan.featured ? (
                    <span className="absolute -top-3 left-6 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black">
                      Best Value
                    </span>
                  ) : null}
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    {plan.name}
                  </h3>
                  <p className="price mt-3 font-semibold text-[var(--text)]">
                    {plan.price}
                    <span className="ml-2 text-sm font-normal text-[var(--text-soft)]">
                      {plan.term}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {plan.description}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-[var(--text-muted)]">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <span className="text-[var(--accent)]">•</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <button className="w-full rounded-full border border-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-black">
                    {plan.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[var(--bg-alt)] py-20">
          <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-[var(--text-soft)]">
                Contact
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-[var(--text)] md:text-4xl">
                Get in touch
              </h2>
              <p className="mt-4 text-sm text-[var(--text-muted)] md:text-base">
                Tell us what you need and our team will get back to you fast.
              </p>
            </div>
            <form className="mt-10 space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-[var(--text-muted)]">
                  Full Name
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-soft)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Email Address
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-soft)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
              </div>
              <label className="text-sm text-[var(--text-muted)]">
                Message
                <textarea
                  rows="5"
                  placeholder="How can we help you?"
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-soft)] focus:border-[var(--accent)] focus:outline-none"
                />
              </label>
              <button className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--accent-strong)]">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
