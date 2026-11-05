/** Pie de página compartido. */
export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-10">
      <p className="mx-auto max-w-6xl text-center text-sm text-white/40">
        © {new Date().getFullYear()} LACMSI League. Look at Curry man, so inspirational.
      </p>
    </footer>
  )
}
