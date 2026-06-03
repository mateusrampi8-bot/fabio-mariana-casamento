import Link from "next/link";
import { Heart, Music2 } from "lucide-react";
import { coverImage, fallbackCover, pages } from "./data";

export function Nav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-transparent px-4 py-3 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3">
        <Link href="/" className="shrink-0 font-serif text-3xl text-champagne drop-shadow-sm">
          F | M
        </Link>
        <div className="scrollbar-hide flex flex-1 justify-start gap-4 overflow-x-auto px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-champagne drop-shadow-[0_1px_8px_rgba(16,35,63,.55)] md:justify-center lg:gap-6 xl:text-[11px]">
          {pages.map((page) => (
            <Link key={page.href} href={page.href} className="whitespace-nowrap transition hover:text-ivory">
              {page.label}
            </Link>
          ))}
        </div>
        <button aria-label="Música ambiente" className="grid h-10 w-10 place-items-center rounded-full border border-champagne/40 text-champagne">
          <Music2 size={18} />
        </button>
      </div>
    </nav>
  );
}

export function FloralFrame() {
  return (
    <>
      <div className="pointer-events-none absolute -left-10 top-28 hidden h-[34rem] w-56 rotate-6 rounded-full bg-[radial-gradient(ellipse_at_center,#f7d7dd_0%,#f7d7dd_22%,transparent_62%)] opacity-75 blur-sm md:block" />
      <div className="pointer-events-none absolute -right-10 bottom-20 hidden h-[34rem] w-56 -rotate-6 rounded-full bg-[radial-gradient(ellipse_at_center,#f7d7dd_0%,#f7d7dd_22%,transparent_62%)] opacity-75 blur-sm md:block" />
      <div className="pointer-events-none absolute left-6 top-36 hidden text-7xl text-champagne/50 md:block">✦</div>
      <div className="pointer-events-none absolute right-10 top-52 hidden text-6xl text-champagne/50 md:block">✧</div>
    </>
  );
}

export function PageHero({ eyebrow, title, subtitle, dark = false }: { eyebrow: string; title: string; subtitle: string; dark?: boolean }) {
  return (
    <header className={`relative min-h-[62vh] overflow-hidden px-6 pt-32 ${dark ? "bg-navy text-white" : "bg-ivory text-navy"}`}>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(16,35,63,.82), rgba(248,246,242,.28)), url(${coverImage}), url(${fallbackCover})` }}
      />
      <FloralFrame />
      <div className="relative mx-auto flex min-h-[48vh] max-w-5xl flex-col items-center justify-center text-center">
        <p className="font-script text-5xl text-champagne">{eyebrow}</p>
        <h1 className="font-serif text-6xl font-semibold leading-none md:text-8xl">{title}</h1>
        <div className="my-6 h-px w-56 gold-line" />
        <p className={`max-w-2xl text-lg leading-8 ${dark ? "text-white/78" : "text-navy/70"}`}>{subtitle}</p>
      </div>
    </header>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-ivory text-navy">
      <Nav />
      {children}
    </main>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <Heart className="mx-auto mb-4 text-champagne" />
      <h2 className="font-serif text-5xl font-semibold md:text-6xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-lg leading-8 text-navy/65">{subtitle}</p> : null}
    </div>
  );
}
