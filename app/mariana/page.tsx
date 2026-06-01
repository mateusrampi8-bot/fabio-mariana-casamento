import { BookOpen, CalendarDays, GraduationCap, Heart, Image as ImageIcon, Music2, Star, Trophy } from "lucide-react";
import { Nav } from "../components";
import { fallbackMariana, marianaImage } from "../data";
import MarianaMusicPlayer from "./MarianaMusicPlayer";

const timeline = [
  { label: "Nascimento", icon: Heart },
  { label: "Infância", icon: Star },
  { label: "Escola", icon: BookOpen },
  { label: "Faculdade", icon: GraduationCap },
  { label: "Conquistas", icon: Trophy },
  { label: "Sonhos", icon: Star },
  { label: "Conheceu o Fábio", icon: Heart }
];

export default function Mariana() {
  return (
    <main className="min-h-screen bg-[#fff7f6] text-[#8e5660]">
      <Nav />
      <section className="relative grid min-h-[78vh] overflow-hidden bg-[#fff7f6] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[720px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${marianaImage}), url(${fallbackMariana})` }}
          />
          <div className="absolute inset-y-0 right-0 hidden w-48 bg-gradient-to-l from-[#fff7f6] to-transparent lg:block" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7d7dd]/25 via-transparent to-transparent" />
        </div>

        <div className="relative flex items-center px-7 py-24 lg:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(247,215,221,.5),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(212,175,106,.18),transparent_28%)]" />
          <div className="relative max-w-xl">
            <p className="font-script text-5xl text-rose">Conheça</p>
            <h1 className="font-serif text-7xl font-semibold uppercase leading-none tracking-wide text-rose md:text-8xl">
              Mariana
            </h1>
            <div className="my-7 flex items-center gap-4 text-champagne">
              <span className="h-px w-28 bg-champagne/70" />
              <Heart size={22} />
              <span className="h-px w-28 bg-champagne/70" />
            </div>
            <h2 className="font-serif text-2xl text-[#9d5a63]">Sonhadora, dedicada e apaixonada</h2>
            <div className="mt-7 space-y-5 text-lg leading-8 text-[#8b5d62]">
              <p>
                Mariana é aquele tipo de pessoa que ilumina qualquer ambiente com seu sorriso. Ama viver intensamente cada momento, valoriza as pequenas coisas e acredita que o amor transforma tudo ao nosso redor.
              </p>
              <p>
                Hoje, está realizando um dos maiores sonhos de sua vida: casar com o amor da sua vida.
              </p>
            </div>

            <div className="mt-9 grid gap-4">
              {[
                { label: "Playlist da Mariana", icon: Music2 },
                { label: "Galeria", icon: ImageIcon },
                { label: "Linha do Tempo", icon: CalendarDays }
              ].map((item) => (
                <a key={item.label} href={item.label === "Playlist da Mariana" ? "#playlist" : item.label === "Galeria" ? "#album-mariana" : "#timeline"} className="flex h-14 items-center justify-center gap-4 rounded-full border border-rose/45 bg-white/35 px-6 text-xs font-semibold uppercase tracking-[0.22em] text-rose transition hover:bg-rose hover:text-white">
                  <item.icon size={18} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarianaMusicPlayer />

      <section id="timeline" className="relative overflow-hidden bg-gradient-to-r from-[#bd6470] via-[#d27982] to-[#c46470] px-6 py-14 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,.16),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(212,175,106,.18),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl uppercase tracking-[0.22em] text-[#f5e3dc]">Linha do Tempo</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
            {timeline.map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="mx-auto mb-4 text-[#f1c67a]" size={30} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-xl leading-8 text-[#ffe9df]">
            “Que eu nunca perca a capacidade de sonhar e a certeza de que Deus cuida de cada detalhe.”
          </p>
          <Heart className="mx-auto mt-6 text-[#ffe9df]" />
        </div>
      </section>
    </main>
  );
}
