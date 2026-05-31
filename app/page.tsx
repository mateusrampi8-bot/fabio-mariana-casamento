"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Image as ImageIcon,
  MapPin,
  Music2,
  Pause,
  Play,
  Send,
  Sparkles,
  Video,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const weddingDate = new Date("2026-09-27T16:30:00-03:00");

const images = {
  hero:
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=2200&q=88",
  mariana:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=88",
  fabio:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=88",
  story:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2200&q=88",
  footer:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1800&q=88",
  guests: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80"
  ]
};

const gallery = [
  { src: images.story, category: "Nossa História", title: "O abraço que virou casa" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=84", category: "Ensaio", title: "Ensaio ao pôr do sol" },
  { src: "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?auto=format&fit=crop&w=900&q=84", category: "Viagens", title: "Primeira viagem" },
  { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=900&q=84", category: "Momentos", title: "Promessa em silêncio" },
  { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=84", category: "Casamento", title: "Detalhes do sim" },
  { src: "https://images.unsplash.com/photo-1509610973147-232dfea52a97?auto=format&fit=crop&w=900&q=84", category: "Nossa História", title: "Mãos entrelaçadas" },
  { src: "https://images.unsplash.com/photo-1519741347686-c1e331fcb4d4?auto=format&fit=crop&w=900&q=84", category: "Ensaio", title: "Luz dourada" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=900&q=84", category: "Viagens", title: "Caminhos juntos" }
];

const marianaSongs = [
  "Easy On Me - Adele",
  "Love in the Dark - Adele",
  "Levitating - Dua Lipa",
  "Homesick - Dua Lipa",
  "A Thousand Years - Christina Perri",
  "Jar of Hearts - Christina Perri",
  "Perfect - Ed Sheeran",
  "Photograph - Ed Sheeran",
  "Thinking Out Loud - Ed Sheeran",
  "Lover - Taylor Swift",
  "Enchanted - Taylor Swift",
  "Daylight - Taylor Swift",
  "All of Me - John Legend",
  "Lucky - Jason Mraz",
  "The One - Kodaline"
];

const fabioSongs = [
  "Photograph - Ed Sheeran",
  "All of Me - John Legend",
  "Better Together - Jack Johnson",
  "Iris - Goo Goo Dolls",
  "Yellow - Coldplay",
  "Fix You - Coldplay",
  "You Are The Reason - Calum Scott",
  "Marry Me - Train",
  "Just The Way You Are - Bruno Mars",
  "The Scientist - Coldplay",
  "XO - John Mayer",
  "Pra Sonhar - Marcelo Jeneci",
  "Velha Infância - Tribalistas",
  "Trevo - Anavitória",
  "Oceano - Djavan"
];

const coupleSongs = [
  "The Call - Regina Spektor",
  "Perfect - Ed Sheeran",
  "A Thousand Years - Christina Perri",
  "All of Me - John Legend",
  "How Long Will I Love You - Ellie Goulding",
  "Better Together - Jack Johnson",
  "Can You Feel the Love Tonight - Elton John"
];

const storyEvents = [
  { date: "Fev/2021", title: "Primeiro encontro", text: "Um café, um sorriso e a sensação delicada de que algo bonito começava.", photo: gallery[0].src },
  { date: "Mar/2021", title: "Primeira conversa", text: "Horas de papo, risadas e planos que pareciam pequenos, mas já eram destino.", photo: gallery[5].src },
  { date: "Jun/2021", title: "Primeira viagem", text: "Descobriram o mundo e um ao outro ainda mais.", photo: gallery[2].src },
  { date: "Dez/2021", title: "Primeiro beijo", text: "O instante em que a amizade ganhou o nome de amor.", photo: gallery[3].src },
  { date: "Mai/2022", title: "Pedido de namoro", text: "Um sim sereno, cheio de futuro.", photo: gallery[6].src },
  { date: "Set/2025", title: "Pedido de casamento", text: "A promessa que fez o tempo parar.", photo: gallery[7].src },
  { date: "27/09/2026", title: "Casamento", text: "O dia em que duas histórias escolhem caminhar como uma só.", photo: gallery[4].src }
];

const guestMessages = [
  { name: "Claudia", relation: "Mãe da noiva", type: "Família", photo: images.guests[0], text: "Minha filha, hoje você inicia um capítulo de luz. Estarei sempre aqui por você." },
  { name: "Carlos", relation: "Pai do noivo", type: "Família", photo: images.guests[1], text: "Fábio, ver você encontrando alguém que te completa é o maior presente." },
  { name: "Marcos e Juliana", relation: "Padrinhos", type: "Padrinhos", photo: images.guests[2], text: "Desejamos uma vida cheia de amor, parceria e muitas conquistas." },
  { name: "Renata Silveira", relation: "Amiga da noiva", type: "Amigos", photo: images.guests[3], text: "Mariana, você merece toda a felicidade do mundo. Que essa nova fase seja leve." },
  { name: "Lucas Almeida", relation: "Amigo do noivo", type: "Amigos", photo: images.guests[1], text: "Fábio, admiro demais a pessoa que você é. Conte comigo sempre." },
  { name: "Fernanda Rocha", relation: "Colega", type: "Colegas", photo: images.guests[0], text: "Que essa história continue sendo escrita todos os dias com muito amor." }
];

function useCountdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const diff = Math.max(weddingDate.getTime() - now.getTime(), 0);
    return {
      dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diff / (1000 * 60)) % 60),
      segundos: Math.floor((diff / 1000) % 60)
    };
  }, [now]);
}

function FloralFrame() {
  return (
    <>
      <div className="pointer-events-none absolute -left-8 top-24 hidden h-96 w-44 rotate-6 rounded-full bg-[radial-gradient(ellipse_at_center,#f7d7dd_0%,#f7d7dd_20%,transparent_62%)] opacity-75 blur-sm md:block" />
      <div className="pointer-events-none absolute -right-8 bottom-16 hidden h-96 w-44 -rotate-6 rounded-full bg-[radial-gradient(ellipse_at_center,#f7d7dd_0%,#f7d7dd_20%,transparent_62%)] opacity-75 blur-sm md:block" />
      <div className="pointer-events-none absolute left-4 top-32 hidden text-7xl text-champagne/50 md:block">✦</div>
      <div className="pointer-events-none absolute right-8 top-48 hidden text-6xl text-champagne/50 md:block">✧</div>
    </>
  );
}

function Nav() {
  const links = [
    ["Início", "inicio"],
    ["Sobre nós", "sobre"],
    ["História", "historia"],
    ["Galeria", "galeria"],
    ["Mensagens", "recados"],
    ["Detalhes", "detalhes"]
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-ivory/75 px-5 py-4 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#inicio" className="font-serif text-3xl text-champagne">F | M</a>
        <div className="scrollbar-hide flex max-w-[72vw] gap-5 overflow-x-auto text-[11px] font-semibold uppercase tracking-[0.22em] text-navy/75 md:gap-9">
          {links.map(([label, href]) => (
            <a key={href} href={`#${href}`} className="whitespace-nowrap transition hover:text-champagne">
              {label}
            </a>
          ))}
        </div>
        <button aria-label="Música ambiente" className="grid h-10 w-10 place-items-center rounded-full border border-champagne/40 text-champagne">
          <Music2 size={18} />
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  const countdown = useCountdown();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 160]);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-navy text-white">
      <motion.img style={{ y }} src={images.hero} alt="Fábio e Mariana" className="absolute inset-0 h-full w-full scale-110 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/60" />
      <FloralFrame />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-20 text-center">
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-xs font-medium uppercase tracking-[0.55em] text-white/85">
          Sejam bem-vindos ao nosso site
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-6xl font-medium leading-none md:text-9xl">
          Fábio <span className="text-champagne">&</span> Mariana
        </motion.h1>
        <p className="mt-7 text-sm font-medium uppercase tracking-[0.36em] text-white/90">Estamos contando os dias para o nosso sim.</p>
        <div className="my-8 h-px w-80 max-w-full gold-line" />
        <div className="grid grid-cols-4 gap-3 md:gap-8">
          {Object.entries(countdown).map(([label, value]) => (
            <div key={label} className="min-w-16 border-r border-champagne/45 px-2 last:border-0 md:min-w-28">
              <div className="font-serif text-4xl text-champagne md:text-6xl">{String(value).padStart(2, "0")}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.26em] text-white/80">{label}</div>
            </div>
          ))}
        </div>
        <a href="#historia" className="mt-9 rounded-full bg-gradient-to-r from-[#eed18a] to-[#d4af37] px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-navy shadow-gold transition hover:translate-y-[-2px]">
          Conheça nossa história
        </a>
        <ChevronDown className="absolute bottom-8 text-champagne" size={38} />
      </div>
    </section>
  );
}

function SectionTitle({ script, title, subtitle, dark = false }: { script?: string; title: string; subtitle?: string; dark?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {script ? <div className={`font-script text-4xl ${dark ? "text-champagne" : "text-rose"}`}>{script}</div> : null}
      <h2 className={`font-serif text-5xl font-semibold md:text-7xl ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      <div className="mx-auto my-5 h-px w-44 gold-line" />
      {subtitle ? <p className={`text-base leading-8 ${dark ? "text-white/75" : "text-navy/70"}`}>{subtitle}</p> : null}
    </div>
  );
}

function PersonCards() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-ivory px-6 py-24">
      <FloralFrame />
      <SectionTitle script="Quem somos nós" title="Duas histórias, um destino" subtitle="Antes do sim, existiam sonhos, famílias, amigos e caminhos que finalmente se encontraram." />
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        {[
          { name: "Mariana", src: images.mariana, href: "#mariana", tone: "from-blush/85" },
          { name: "Fábio", src: images.fabio, href: "#fabio", tone: "from-navy/85" }
        ].map((person) => (
          <motion.article whileHover={{ y: -8 }} key={person.name} className="group relative min-h-[540px] overflow-hidden rounded-lg shadow-soft">
            <img src={person.src} alt={person.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className={`absolute inset-0 bg-gradient-to-t ${person.tone} via-black/10 to-transparent`} />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="font-serif text-6xl">{person.name}</h3>
              <a href={person.href} className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/55 px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-md transition hover:bg-white hover:text-navy">
                Conhecer <Heart size={15} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function MusicPlayer({ title, songs, dark = false }: { title: string; songs: string[]; dark?: boolean }) {
  const [playing, setPlaying] = useState(0);
  const [paused, setPaused] = useState(false);

  return (
    <div className={`rounded-lg border p-5 shadow-soft ${dark ? "border-champagne/30 bg-white/5 text-white" : "border-rose/20 bg-white/70 text-navy"}`}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-champagne">Playlist</p>
          <h4 className="font-serif text-3xl">{title}</h4>
        </div>
        <button onClick={() => setPaused(!paused)} aria-label="Tocar playlist" className="grid h-12 w-12 place-items-center rounded-full bg-champagne text-navy">
          {paused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>
      <div className="max-h-80 space-y-2 overflow-auto pr-2">
        {songs.map((song, index) => (
          <button key={song} onClick={() => setPlaying(index)} className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition ${playing === index ? "bg-champagne/20" : "hover:bg-champagne/10"}`}>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-champagne/45 text-champagne">
              {playing === index && !paused ? <Pause size={13} /> : <Play size={13} />}
            </span>
            <span className="text-sm">{song}</span>
            <span className="ml-auto text-xs opacity-60">{3 + (index % 2)}:{String(18 + index * 3).slice(0, 2)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PersonSection({ id, name, image, dark, songs, timeline }: { id: string; name: string; image: string; dark?: boolean; songs: string[]; timeline: string[] }) {
  return (
    <section id={id} className={`relative overflow-hidden px-6 py-24 ${dark ? "bg-navy text-white" : "bg-[#fff7f7] text-navy"}`}>
      <div className="absolute inset-0 grain" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="min-h-[620px] overflow-hidden rounded-lg shadow-soft">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </motion.div>
        <div className="flex flex-col justify-center">
          <p className={`font-script text-4xl ${dark ? "text-champagne" : "text-rose"}`}>Conheça</p>
          <h2 className="font-serif text-6xl font-semibold md:text-8xl">{name}</h2>
          <div className="my-6 h-px w-56 gold-line" />
          <p className={`max-w-xl text-lg leading-9 ${dark ? "text-white/78" : "text-navy/70"}`}>
            {name === "Mariana"
              ? "Sonhadora, dedicada e apaixonada pelos pequenos detalhes, Mariana ilumina qualquer ambiente com seu sorriso e transforma cuidado em linguagem de amor."
              : "Determinado, leal e apaixonado pela vida, Fábio é presença firme, amigo generoso e alguém que acredita no amor construído todos os dias."}
          </p>
          <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <MusicPlayer title={`Playlist ${name}`} songs={songs} dark={dark} />
            <div className={`rounded-lg border p-5 ${dark ? "border-champagne/30 bg-white/5" : "border-rose/20 bg-white/70"}`}>
              <p className="mb-5 text-xs uppercase tracking-[0.28em] text-champagne">Linha do tempo</p>
              <div className="grid grid-cols-2 gap-3">
                {timeline.map((item) => (
                  <div key={item} className={`rounded-md border p-4 text-center text-xs uppercase tracking-[0.12em] ${dark ? "border-white/10" : "border-rose/20"}`}>
                    <Sparkles className="mx-auto mb-2 text-champagne" size={19} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="historia" className="relative overflow-hidden bg-ivory px-6 py-24">
      <div className="absolute left-0 right-0 top-0 h-[520px]">
        <img src={images.story} alt="História do casal" className="h-full w-full object-cover photo-mask" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/50 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-xl pt-16">
          <p className="font-script text-5xl text-champagne">Nossa</p>
          <h2 className="font-serif text-7xl font-semibold text-rose md:text-8xl">História</h2>
          <p className="mt-7 text-xl leading-9 text-navy/70">De dois, um só coração. Duas histórias, caminhos diferentes, um mesmo propósito: o amor.</p>
        </div>
        <div className="mt-32 rounded-lg bg-white/78 p-7 shadow-soft backdrop-blur">
          <SectionTitle title="Como tudo começou" />
          <div className="grid gap-5 md:grid-cols-7">
            {storyEvents.map((event) => (
              <button key={event.title} className="group text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-champagne/50 text-champagne transition group-hover:bg-champagne group-hover:text-navy">
                  <Heart size={22} />
                </div>
                <p className="text-xs uppercase tracking-[0.15em] text-champagne">{event.date}</p>
                <h3 className="mt-3 font-serif text-xl font-semibold">{event.title}</h3>
                <p className="mt-2 text-sm leading-6 text-navy/65">{event.text}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle title="Nossa Galeria" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {gallery.slice(0, 6).map((item) => (
                <img key={item.src} src={item.src} alt={item.title} className="aspect-square rounded-lg object-cover shadow-soft" />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center border-champagne/30 lg:border-l lg:pl-12">
            <p className="font-script text-5xl text-rose">De dois, um só coração.</p>
            <p className="mt-7 text-lg leading-9 text-navy/72">
              A nossa história não foi escrita de uma hora para outra. Foi sendo construída nos pequenos detalhes, nos gestos diários, nas escolhas e nas renúncias.
            </p>
            <p className="mt-6 font-script text-4xl text-navy/80">Fábio & Mariana</p>
          </div>
        </div>
        <div className="mt-14">
          <MusicPlayer title="Nossa trilha sonora" songs={coupleSongs} />
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [filter, setFilter] = useState("Todos");
  const [open, setOpen] = useState<(typeof gallery)[number] | null>(null);
  const filters = ["Todos", "Nossa História", "Viagens", "Momentos", "Ensaio", "Casamento"];
  const visible = filter === "Todos" ? gallery : gallery.filter((item) => item.category === filter);

  return (
    <section id="galeria" className="bg-linen px-6 py-24">
      <SectionTitle script="Memórias" title="Galeria" subtitle="Um mosaico de lugares, gestos e instantes que guardam a nossa forma de amar." />
      <div className="mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-3">
        {filters.map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={`rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition ${filter === item ? "border-champagne bg-champagne text-navy" : "border-champagne/35 bg-white/55 text-navy/70 hover:bg-white"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="mx-auto columns-1 gap-5 space-y-5 md:columns-3 xl:columns-4">
        {visible.map((item, index) => (
          <button key={item.src} onClick={() => setOpen(item)} className="group block w-full overflow-hidden rounded-lg bg-white shadow-soft">
            <img src={item.src} alt={item.title} className={`w-full object-cover transition duration-700 group-hover:scale-105 ${index % 3 === 0 ? "h-96" : "h-72"}`} />
            <div className="p-4 text-left">
              <p className="text-xs uppercase tracking-[0.18em] text-champagne">{item.category}</p>
              <h3 className="font-serif text-2xl">{item.title}</h3>
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-navy/90 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setOpen(null)} aria-label="Fechar imagem" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-navy">
              <X />
            </button>
            <motion.img initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} src={open.src} alt={open.title} className="max-h-[84vh] max-w-[92vw] rounded-lg object-contain shadow-gold" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Messages() {
  const [filter, setFilter] = useState("Todos");
  const filters = ["Todos", "Família", "Padrinhos", "Amigos", "Colegas"];
  const visible = filter === "Todos" ? guestMessages : guestMessages.filter((message) => message.type === filter);

  return (
    <section id="recados" className="bg-ivory">
      <div className="relative min-h-[430px] overflow-hidden bg-navy px-6 py-28 text-center text-white">
        <img src={images.story} alt="Cartas para Fábio e Mariana" className="absolute inset-0 h-full w-full object-cover opacity-45 grayscale" />
        <FloralFrame />
        <div className="relative">
          <p className="font-script text-5xl text-champagne">Cartas para</p>
          <h2 className="font-serif text-6xl md:text-8xl">Fábio & Mariana</h2>
          <p className="mt-6 text-lg text-white/80">Palavras escritas por quem caminhou conosco até aqui.</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] ${filter === item ? "bg-champagne text-navy" : "border border-champagne/30 bg-white text-navy/70"}`}>
                {item}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-rose px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-soft">
            <Send size={16} /> Deixe seu recado
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((message, index) => (
            <article key={message.name} className="rounded-lg border border-champagne/20 bg-white/80 p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <img src={message.photo} alt={message.name} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-serif text-2xl">{message.name}</h3>
                  <p className="text-sm text-navy/55">{message.relation}</p>
                </div>
              </div>
              <p className="mt-6 text-base leading-8 text-navy/70">“{message.text}”</p>
              {index === visible.length - 1 ? (
                <button className="mt-6 flex w-full items-center gap-3 rounded-md border border-rose/30 p-3 text-left text-sm text-rose">
                  <Video size={20} /> Mensagem em vídeo
                </button>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostWedding() {
  return (
    <section className="bg-navy px-6 py-24 text-white">
      <SectionTitle script="Depois do sim" title="Nossa nova história começou" subtitle="O melhor dia das nossas vidas foi apenas o começo." dark />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative aspect-video overflow-hidden rounded-lg shadow-gold">
          <img src={gallery[4].src} alt="Vídeo oficial do casamento" className="h-full w-full object-cover opacity-80" />
          <button aria-label="Assistir vídeo" className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy">
            <Play size={32} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["Fotos oficiais", "Vídeos", "Drone", "Cerimônia", "Festa", "Bastidores"].map((item, index) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-5">
              {index % 2 ? <Video className="mb-5 text-champagne" /> : <ImageIcon className="mb-5 text-champagne" />}
              <h3 className="font-serif text-2xl">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimeCapsule() {
  return (
    <section className="relative overflow-hidden bg-[#fbf3f1] px-6 py-24">
      <FloralFrame />
      <SectionTitle script="Para o nosso futuro" title="Cápsula do Tempo" subtitle="Um lugar guardado para as promessas, os sonhos e as respostas que queremos reencontrar daqui a muitos anos." />
      <div className="mx-auto grid max-w-6xl gap-7 md:grid-cols-3">
        {[
          ["Onde estaremos daqui a 10 anos?", "Mariana imagina uma casa cheia de luz, planos realizados e a mesma vontade de cuidar. Fábio sonha com uma família forte, viagens e uma rotina onde o amor continue sendo escolha."],
          ["O que mais amamos um no outro?", "A calma, o riso, a coragem, a fé, a parceria nos dias simples e a forma como cada um faz o outro acreditar no futuro."],
          ["Nossas Promessas", "Prometemos escutar com paciência, celebrar pequenas vitórias, escolher o carinho antes do orgulho e caminhar juntos em todas as estações."]
        ].map(([title, text]) => (
          <article key={title} className="rounded-lg border border-champagne/25 bg-white/75 p-7 shadow-soft backdrop-blur">
            <Heart className="mb-5 text-champagne" />
            <h3 className="font-serif text-3xl">{title}</h3>
            <p className="mt-4 leading-8 text-navy/68">{text}</p>
          </article>
        ))}
      </div>
      <div className="mt-12 text-center">
        <button className="rounded-full bg-navy px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-soft">
          Abrir esta cápsula em 27/09/2035
        </button>
      </div>
    </section>
  );
}

function Details() {
  return (
    <section id="detalhes" className="bg-ivory px-6 py-24">
      <SectionTitle script="O grande dia" title="Detalhes do Casamento" subtitle="Tudo preparado para receber quem faz parte da nossa história." />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Data", "27 de setembro de 2026"],
            ["Horário", "16h30"],
            ["Cerimônia", "Capela Santa Luzia"],
            ["Recepção", "Villa Champagne"],
            ["Endereço", "Estrada das Flores, 1200"],
            ["Dress Code", "Social elegante"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-champagne/25 bg-white/80 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.22em] text-champagne">{label}</p>
              <h3 className="mt-3 font-serif text-2xl">{value}</h3>
            </div>
          ))}
        </div>
        <div className="min-h-[430px] overflow-hidden rounded-lg border border-champagne/25 bg-white shadow-soft">
          <iframe
            title="Mapa do casamento"
            src="https://www.google.com/maps?q=Estrada%20das%20Flores%201200&output=embed"
            className="h-full min-h-[430px] w-full"
            loading="lazy"
          />
        </div>
      </div>
      <div className="mt-10 text-center">
        <a href="https://www.google.com/maps/search/?api=1&query=Estrada%20das%20Flores%201200" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-champagne px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-navy shadow-gold">
          <MapPin size={17} /> Como chegar
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative min-h-[520px] overflow-hidden bg-navy text-white">
      <img src={images.footer} alt="Fábio e Mariana caminhando juntos" className="absolute inset-0 h-full w-full object-cover opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/45 to-transparent" />
      <FloralFrame />
      <div className="relative mx-auto flex min-h-[520px] max-w-5xl flex-col justify-center px-6">
        <Heart className="mb-6 text-champagne" size={36} />
        <h2 className="max-w-2xl font-serif text-5xl leading-tight md:text-7xl">Obrigado por fazer parte da nossa história.</h2>
        <p className="mt-8 font-script text-5xl text-champagne">Fábio & Mariana</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Casamento de Fábio e Mariana",
            startDate: weddingDate.toISOString(),
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: "Villa Champagne",
              address: "Estrada das Flores, 1200"
            }
          })
        }}
      />
      <Nav />
      <Hero />
      <PersonCards />
      <PersonSection id="mariana" name="Mariana" image={images.mariana} songs={marianaSongs} timeline={["Nascimento", "Infância", "Escola", "Faculdade", "Conquistas", "Sonhos", "Conheceu Fábio"]} />
      <PersonSection id="fabio" name="Fábio" image={images.fabio} songs={fabioSongs} timeline={["Nascimento", "Infância", "Amigos", "Faculdade", "Trabalho", "Conquistas", "Conheceu Mariana"]} dark />
      <Story />
      <Gallery />
      <Messages />
      <PostWedding />
      <TimeCapsule />
      <Details />
      <Footer />
    </main>
  );
}
