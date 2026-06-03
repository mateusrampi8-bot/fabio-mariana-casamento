import { Heart } from "lucide-react";
import { Nav } from "../components";
import { fabioImage } from "../data";
import FabioMediaSection from "./FabioMediaSection";

export default function Fabio() {
  return (
    <main className="min-h-screen bg-navy text-white">
      <Nav />
      <section className="relative grid min-h-[78vh] overflow-hidden bg-navy lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[720px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fabioImage})` }} />
          <div className="absolute inset-y-0 right-0 hidden w-48 bg-gradient-to-l from-navy to-transparent lg:block" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/20 via-transparent to-navy/65" />
        </div>

        <div className="relative flex items-center px-7 py-24 lg:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,106,.16),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,.08),transparent_28%)]" />
          <div className="relative max-w-xl">
            <p className="font-script text-5xl text-champagne">Conheça</p>
            <h1 className="font-serif text-7xl font-semibold uppercase leading-none tracking-wide text-white md:text-8xl">
              Fábio
            </h1>
            <div className="my-7 flex items-center gap-4 text-champagne">
              <span className="h-px w-28 bg-champagne/70" />
              <Heart size={22} />
              <span className="h-px w-28 bg-champagne/70" />
            </div>
            <h2 className="font-serif text-2xl text-white/90">Determinado, leal e apaixonado</h2>
            <div className="mt-7 space-y-5 text-lg leading-8 text-white/72">
              <p>
                Fábio é aquele amigo que está sempre presente, alguém que acredita em propósito, trabalha com dedicação e enfrenta a vida com coragem e fé.
              </p>
              <p>
                Ama sua família, valoriza suas amizades e hoje vive o início de uma nova fase ao lado de Mariana.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FabioMediaSection />

      <section className="relative overflow-hidden bg-[#061426] px-6 py-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(212,175,106,.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,.08),transparent_28%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="font-script text-5xl text-champagne">Fábio em uma frase</p>
          <p className="mx-auto mt-8 max-w-3xl font-serif text-3xl leading-tight text-white/86 md:text-4xl">
            “Tudo posso naquele que me fortalece.”
          </p>
          <Heart className="mx-auto mt-6 text-champagne" />
        </div>
      </section>
    </main>
  );
}
