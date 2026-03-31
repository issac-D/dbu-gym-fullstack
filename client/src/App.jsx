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

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-semibold tracking-wide text-white/80 transition hover:text-white"
    >
      {children}
    </a>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="flex items-center gap-2 text-lg font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#51CCF9]/20 text-[#51CCF9]">
              <DumbbellIcon className="h-5 w-5" />
            </span>
            <span className="font-display text-2xl tracking-wide">
              <span className="text-[#51CCF9]">DBU</span>GYM
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#apparatus">Apparatus</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <a
            href="#pricing"
            className="hidden rounded-full border border-[#51CCF9] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#51CCF9] hover:text-black md:inline-flex"
          >
            Login / Register
          </a>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
              Stronger Every Day
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-wide text-white md:text-6xl">
              Build Your <span className="text-[#51CCF9]">Dream Body</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
              State of the art equipment, expert trainers, and a community that
              supports your goals. Train smarter, recover faster, and show up for
              the strongest version of yourself.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#pricing"
                className="rounded-full bg-[#51CCF9] px-6 py-3 text-sm font-semibold text-black transition hover:translate-y-[-2px] hover:bg-[#3db0da]"
              >
                Join Now
              </a>
              <a
                href="#about"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
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
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
