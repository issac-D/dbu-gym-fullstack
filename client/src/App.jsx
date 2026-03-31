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

        <section id="about" className="bg-[#0b0f14] py-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-8">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                About Us
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-white md:text-4xl">
                Built to support your strongest goals.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">
                At Dbu-Gym, we believe fitness is not just a hobby, but a
                lifestyle. We have helped thousands of members achieve their
                physical and mental potential with 24/7 access, expert trainers,
                and a welcoming community.
              </p>
              <div className="mt-8 space-y-3 text-sm text-white/80">
                {[
                  'Certified Trainers',
                  'Modern Equipment',
                  'Personalized Programs',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#51CCF9]/20 text-[#51CCF9]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl border border-[#51CCF9]/20" />
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Gym Trainer"
                className="relative w-full rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section id="apparatus" className="bg-[#0f141b] py-20">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                Apparatus
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-white md:text-4xl">
                World-class apparatus
              </h2>
              <p className="mt-4 text-sm text-white/60 md:text-base">
                Train with the best equipment industry standards have to offer.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {apparatusItems.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-2 hover:border-[#51CCF9]/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#51CCF9]/20 text-[#51CCF9]">
                    <DumbbellIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[#0b0f14] py-20">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                Pricing
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-white md:text-4xl">
                Choose your plan
              </h2>
              <p className="mt-4 text-sm text-white/60 md:text-base">
                Flexible options for every training style.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-[#51CCF9]/40 bg-[#51CCF9]/10 px-6 py-5 text-sm text-white/80">
              <span className="font-semibold text-white">Staff member?</span>{' '}
              Log in with your employee or student ID to apply a 20% discount.
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex h-full flex-col rounded-2xl border bg-white/5 p-7 text-left transition hover:-translate-y-2 ${
                    plan.featured
                      ? 'border-[#51CCF9] bg-[#51CCF9]/10'
                      : 'border-white/10'
                  }`}
                >
                  {plan.featured ? (
                    <span className="absolute -top-3 left-6 rounded-full bg-[#51CCF9] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black">
                      Best Value
                    </span>
                  ) : null}
                  <h3 className="text-lg font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {plan.price}
                    <span className="ml-2 text-sm font-normal text-white/60">
                      {plan.term}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-white/70">{plan.description}</p>
                  <ul className="mt-6 space-y-3 text-sm text-white/70">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <span className="text-[#51CCF9]">•</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-8 rounded-full border border-[#51CCF9] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#51CCF9] hover:text-black">
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#0f141b] py-20">
          <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                Contact
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-white md:text-4xl">
                Get in touch
              </h2>
              <p className="mt-4 text-sm text-white/60 md:text-base">
                Tell us what you need and our team will get back to you fast.
              </p>
            </div>
            <form className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-white/70">
                  Full Name
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#51CCF9] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-white/70">
                  Email Address
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#51CCF9] focus:outline-none"
                  />
                </label>
              </div>
              <label className="text-sm text-white/70">
                Message
                <textarea
                  rows="5"
                  placeholder="How can we help you?"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#51CCF9] focus:outline-none"
                />
              </label>
              <button className="rounded-full bg-[#51CCF9] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#3db0da]">
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
