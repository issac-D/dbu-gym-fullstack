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
      className="text-sm font-semibold tracking-wide text-[var(--text-soft)] transition hover:text-[var(--text)]"
    >
      {children}
    </a>
  )
}

const apparatusItems = [
  {
    title: 'Free Weights',
    description: 'Dumbbells up to 150lbs, Olympic barbells, and calibrated plates.',
  },
  {
    title: 'Cardio Zone',
    description: 'Latest treadmills, stair masters, and rowers with screens.',
  },
  {
    title: 'Cable Machines',
    description: 'Functional trainers to target every muscle group safely.',
  },
  {
    title: 'Calisthenics',
    description: 'Pull-up bars and dip stations for bodyweight mastery.',
  },
  {
    title: 'Combat Zone',
    description: 'Heavy bags and a boxing ring for high-intensity conditioning.',
  },
  {
    title: 'Recovery',
    description: 'Massage guns and saunas for post-workout care.',
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
      <header className="fixed inset-x-0 top-0 z-20 border-b border-[var(--border)] bg-[var(--surface-strong)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--accent)] glow-ring">
              <DumbbellIcon className="h-8 w-8" />
            </span>
            <span className="font-display text-4xl tracking-wide md:text-5xl">
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
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:shadow-[0_0_25px_var(--accent-glow)]"
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
              className="hidden rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-black sm:inline-flex"
            >
              Login / Register
            </a>
          </div>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[var(--hero-overlay)]" />
          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--text-soft)] animate-fade-up">
              Stronger Every Day
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-wide text-[var(--text)] md:text-6xl animate-fade-up">
              Build Your <span className="text-[var(--accent)]">Dream Body</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-[var(--text-muted)] md:text-lg animate-fade-up">
              State of the art equipment, expert trainers, and a community that
              supports your goals. Train smarter, recover faster, and show up for
              the strongest version of yourself.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-up">
              <a
                href="#pricing"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_var(--accent-glow)] transition hover:translate-y-[-2px] hover:bg-[var(--accent-strong)]"
              >
                Join Now
              </a>
              <a
                href="#about"
                className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                Explore The Gym
              </a>
            </div>
            <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
              {[
                { label: '24/7 Access', value: 'Anytime' },
                { label: 'Certified Coaches', value: '12+' },
                { label: 'Member Community', value: '2,500+' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 backdrop-blur animate-fade-up"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[var(--text)]">
                    {item.value}
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--accent)]">
                    <DumbbellIcon className="h-6 w-6" />
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
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[var(--surface)] p-7 text-left transition hover:-translate-y-2 card-sheen ${
                    plan.featured
                      ? 'border-[var(--accent)] bg-[var(--surface-strong)] glow-ring'
                      : 'border-[var(--border)]'
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
                  <p className="mt-3 text-3xl font-semibold text-[var(--text)]">
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
                  <button className="mt-8 rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-black">
                    {plan.cta}
                  </button>
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
