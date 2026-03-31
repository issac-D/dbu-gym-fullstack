function SocialIcon({ path, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl font-semibold tracking-wide text-[var(--text)]">
            <span className="text-[var(--accent)]">DBU</span>GYM
          </p>
          <p className="mt-3 max-w-sm text-sm text-[var(--text-muted)]">
            Making the world stronger, one rep at a time. Come for the
            equipment, stay for the community.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SocialIcon
            label="Facebook"
            path="M13 10h3m-3 8V7.5a2.5 2.5 0 0 1 2.5-2.5H17"
          />
          <SocialIcon
            label="Instagram"
            path="M16.5 7.5h.01M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"
          />
          <SocialIcon
            label="Twitter"
            path="M4 5l7.5 7.5L19 5M6.5 18.5l5-5 5 5"
          />
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--text-soft)]">
        © 2025 Dbu-Gym. All rights reserved.
      </div>
    </footer>
  )
}
