import { Briefcase, GraduationCap, Heart, Star, Trophy, Users } from "lucide-react";
import { Nav } from "../components";
import { fabioImage } from "../data";
import FabioGallery from "./FabioGallery";

const timeline = [
  { label: "Nascimento", icon: Heart },
  { label: "Infância", icon: Star },
  { label: "Amigos", icon: Users },
  { label: "Faculdade", icon: GraduationCap },
  { label: "Trabalho", icon: Briefcase },
  { label: "Conquistas", icon: Trophy },
  { label: "Conheceu Mariana", icon: Heart }
];

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

      <FabioGallery />

      <section className="relative overflow-hidden bg-[#061426] px-6 py-14 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(212,175,106,.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,.08),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl uppercase tracking-[0.22em] text-champagne">Linha do Tempo</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
            {timeline.map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="mx-auto mb-4 text-champagne" size={30} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-xl leading-8 text-white/78">
            “Tudo posso naquele que me fortalece.”
          </p>
          <Heart className="mx-auto mt-6 text-champagne" />
        </div>
      </section>
    </main>
  );
}
