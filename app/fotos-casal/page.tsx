"use client";

import { Heart, Pause, Play, Volume2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Nav } from "../components";

const photoFiles = [
  "0877fe5f-f5ae-41d8-9524-0be32238a22d.png",
  "0cc936da-8ce3-4a7c-89bf-21093638fb0c.png",
  "2c8d8ad5-fef9-4b48-9d52-0c3d6d85aec7.png",
  "30d2aef1-6dc6-40a0-9d69-451aae01c1a7.png",
  "3e23dfe0-4eda-4d7f-9963-730df4866ffd.png",
  "4013464d-4a7a-46a6-bd9a-907b733a1ef4.png",
  "44f222d4-23b0-4a27-9a77-4ccad0d65752.png",
  "560a5c0c-bcf9-4426-baa3-9dd3c0f4a229.png",
  "727e1fa8-7f26-4b1b-a4c4-9a5c7742d89d.png",
  "778a0e88-81a1-4721-baa1-90bac1984ff6.png",
  "7d9573d5-2431-4849-9386-7c49ebc76871.png",
  "84aa4aa8-aa42-4830-bfd4-d52105abaac1.png",
  "9935d1d9-278d-4f9e-8873-e410d3fb5216.png",
  "a7525def-e723-4236-ac33-22cf5f1c5cd3.png",
  "abf5af1e-19a6-4534-83fa-1badc6db0e60.png",
  "c2558d6d-705c-4b28-9241-ed023a08f44c.png",
  "ChatGPT Image 2 de jun. de 2026, 22_56_27.png",
  "ChatGPT Image 2 de jun. de 2026, 22_59_44.png",
  "ChatGPT Image 2 de jun. de 2026, 23_11_59.png",
  "ChatGPT Image 2 de jun. de 2026, 23_30_27.png",
  "d2b99023-0a66-4361-bf3d-3fb863984851.png",
  "WhatsApp Image 2026-05-30 at 09.42.50 (1).jpeg",
  "WhatsApp Image 2026-05-30 at 09.42.50 (2).jpeg",
  "WhatsApp Image 2026-05-30 at 09.42.50.jpeg",
  "WhatsApp Image 2026-05-30 at 09.42.51 (1).jpeg",
  "WhatsApp Image 2026-05-30 at 09.42.51 (2).jpeg",
  "WhatsApp Image 2026-05-30 at 09.42.51.jpeg",
  "WhatsApp Image 2026-06-02 at 13.05.08 (1).jpeg",
  "WhatsApp Image 2026-06-02 at 13.05.08 (3).jpeg",
  "WhatsApp Image 2026-06-02 at 13.13.24 (1).jpeg"
];

const audioFiles = [
  "1-SpotiDownloader.com - Angel - Libera.mp3",
  "2-SpotiDownloader.com - Ave Verum (Albinoni's Adagio in G minor) - Tomaso Albinoni.mp3",
  "3-SpotiDownloader.com - Demons - Imagine Dragons (1).mp3",
  "4-SpotiDownloader.com - Birds - Imagine Dragons.mp3",
  "5-SpotiDownloader.com - The Call - Regina Spektor (1).mp3",
  "6-SpotiDownloader.com - Into the West - Annie Lennox.mp3",
  "7-SpotiDownloader.com - May It Be - Enya.mp3",
  "8-SpotiDownloader.com - Mirrors - Justin Timberlake.mp3",
  "9-SpotiDownloader.com - Only Hope - Mandy Moore.mp3",
  "10-SpotiDownloader.com - Turning Page - Sleeping At Last.mp3",
  "11-SpotiDownloader.com - Runaway - AURORA.mp3"
];

function optimizedPhotoPath(file: string) {
  return encodeURI(`/images/optimized/casal/${file.replace(/\.(png|jpe?g)$/i, ".jpg")}`);
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${rest}`;
}

const photos = photoFiles.map(optimizedPhotoPath);
const playlist = audioFiles.map((file) => encodeURI(`/audio/casal/${file}`));

export default function FotosCasal() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMissing, setAudioMissing] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const coupleAudio = playlist[currentSong];
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const featured = photos[27] ?? photos[0];
  const featureCards = useMemo(
    () =>
      [
        { photo: photos[23], title: "Nosso primeiro passo" },
        { photo: photos[0], title: "Noite inesquecível", featured: true },
        { photo: photos[25], title: "O mundo lá fora pode esperar" }
      ].filter((item): item is { photo: string; title: string; featured?: boolean } => Boolean(item.photo)),
    []
  );
  const remaining = photos.filter((photo) => photo !== featured && !featureCards.some((item) => item.photo === photo));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.68;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setNeedsGesture(false);
      })
      .catch(() => {
        setIsPlaying(false);
        setNeedsGesture(true);
      });
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    audioRef.current
      ?.play()
      .then(() => {
        setAudioMissing(false);
        setNeedsGesture(false);
      })
      .catch(() => {
        setIsPlaying(false);
        setNeedsGesture(true);
      });
  }, [currentSong, isPlaying]);

  function nextSong() {
    setCurrentSong((index) => (index + 1) % playlist.length);
  }

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio || audioMissing) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setNeedsGesture(false);
      })
      .catch(() => {
        setIsPlaying(false);
        setNeedsGesture(true);
      });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf6ee] text-navy">
      <Nav />
      <audio
        ref={audioRef}
        src={coupleAudio}
        autoPlay
        preload="metadata"
        onEnded={nextSong}
        onError={() => setAudioMissing(true)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />

      <section className="relative min-h-screen px-5 pb-16 pt-24 md:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(212,175,55,0.12)_0_1px,transparent_1px_42px),linear-gradient(25deg,rgba(201,112,122,0.10)_0_1px,transparent_1px_54px)]" />
        <div className="absolute inset-0 opacity-[0.16]">
          <img src={photos[0]} alt="" className="h-full w-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,246,238,0.84),rgba(251,246,238,0.94)_46%,#fbf6ee),radial-gradient(ellipse_at_top,rgba(255,255,255,0.78),transparent_58%)]" />
        <div className="pointer-events-none absolute left-0 right-0 top-24 h-px bg-gradient-to-r from-transparent via-champagne/45 to-transparent" />
        <div className="pointer-events-none absolute left-0 top-36 hidden h-[31rem] w-48 -translate-x-14 rotate-[-10deg] border-y border-champagne/20 bg-white/35 shadow-soft backdrop-blur-sm lg:block">
          <img src={photos[22]} alt="" className="h-full w-full object-cover opacity-35" />
        </div>
        <div className="pointer-events-none absolute right-0 top-44 hidden h-[32rem] w-48 translate-x-14 rotate-[10deg] border-y border-champagne/20 bg-white/35 shadow-soft backdrop-blur-sm lg:block">
          <img src={photos[25]} alt="" className="h-full w-full object-cover opacity-35" />
        </div>
        <div className="pointer-events-none absolute -left-16 top-36 hidden h-[31rem] w-52 rotate-[-12deg] rounded-[55%] border border-rose/15 bg-[radial-gradient(circle_at_42%_22%,#f3c4ca_0_9%,transparent_10%),radial-gradient(circle_at_58%_38%,#f6d9d2_0_10%,transparent_11%),linear-gradient(120deg,transparent,#d4af37_52%,transparent_54%)] opacity-55 md:block" />
        <div className="pointer-events-none absolute -right-16 top-44 hidden h-[33rem] w-52 rotate-12 rounded-[55%] border border-rose/15 bg-[radial-gradient(circle_at_48%_24%,#f2c4cc_0_10%,transparent_11%),radial-gradient(circle_at_36%_48%,#f7ded6_0_10%,transparent_11%),linear-gradient(65deg,transparent,#d4af37_48%,transparent_50%)] opacity-55 md:block" />

        <div className="relative mx-auto max-w-[1320px]">
          <header className="mx-auto max-w-4xl text-center">
            <p className="font-script text-5xl text-champagne md:text-7xl">Nossa trilha</p>
            <h1 className="mt-1 font-serif text-6xl font-semibold leading-none text-rose md:text-8xl">Fábio & Mariana</h1>
            <div className="mx-auto my-8 flex max-w-md items-center justify-center gap-4 text-champagne">
              <span className="h-px flex-1 bg-champagne/45" />
              <Heart size={20} />
              <span className="h-px flex-1 bg-champagne/45" />
            </div>

            <div className="mx-auto flex max-w-[540px] items-center gap-5 rounded-full bg-white/90 p-3 pr-7 shadow-soft ring-1 ring-champagne/10 backdrop-blur">
              <button
                type="button"
                onClick={toggleAudio}
                aria-label={isPlaying ? "Pausar música do casal" : "Tocar música do casal"}
                className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[#101010] text-white shadow-gold transition hover:scale-105"
              >
                <span className="absolute inset-2 rounded-full border border-white/10" />
                {isPlaying ? <Pause size={26} /> : <Play size={26} />}
              </button>
              <div className="min-w-0 flex-1 text-left">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">Player do casal</p>
                    <p className="truncate font-serif text-xl text-navy md:text-2xl">
                      {audioMissing ? "Preparando a trilha" : needsGesture ? "Toque para ouvir nossa trilha" : "Uma música para nós dois"}
                    </p>
                  </div>
                  <Volume2 className="shrink-0 text-rose" size={18} />
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-linen">
                  <div className="h-full rounded-full bg-champagne" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-semibold text-navy/45">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-20 grid items-center gap-10 md:grid-cols-[0.78fr_1.35fr]">
            <div className="mx-auto max-w-sm text-center md:text-left">
              <p className="font-script text-5xl leading-tight text-rose">Nosso lugar favorito</p>
              <p className="mt-8 text-lg leading-8 text-navy/68">
                Entre risos, conversas e o lar que sonhamos construir, a vida fica mais bonita.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedPhoto(featured)}
              aria-label="Abrir foto destaque do casal"
              className="overflow-hidden rounded-lg bg-white p-2 shadow-soft transition hover:scale-[1.01]"
            >
              <img src={featured} alt="Foto destaque do casal" className="aspect-[1.75/1] w-full rounded-md object-cover" />
            </button>
          </div>
        </div>
      </section>

      <section className="relative bg-[#fbf6ee] px-5 pb-20 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(212,175,55,0.09)_0_1px,transparent_1px_72px),linear-gradient(180deg,rgba(255,255,255,0.55),transparent_18rem)]" />
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-10 bg-[linear-gradient(180deg,rgba(16,35,63,0.08),transparent)] opacity-30" />
        <div className="relative mx-auto max-w-[1320px]">
          <div className="relative grid items-center gap-5 lg:grid-cols-[0.95fr_1.12fr_0.95fr]">
            {featureCards.map((item, index) => (
              <button
                key={item.photo}
                type="button"
                onClick={() => setSelectedPhoto(item.photo)}
                aria-label="Abrir foto do casal"
                className={`overflow-hidden rounded-lg bg-white p-3 shadow-soft transition hover:scale-[1.012] ${
                  item.featured ? "lg:-translate-y-8 lg:scale-105" : index === 0 ? "lg:rotate-[-1deg]" : "lg:rotate-[1deg]"
                }`}
              >
                <img
                  src={item.photo}
                  alt="Foto do casal"
                  loading="eager"
                  className={`w-full rounded-md object-cover ${item.featured ? "aspect-[0.95/1]" : "aspect-[1.12/1]"}`}
                />
                <span className={`block text-center font-serif text-champagne ${item.featured ? "px-4 py-7 text-4xl" : "px-3 py-5 text-3xl"}`}>
                  {item.title}
                </span>
                <span className="mx-auto mb-2 flex max-w-40 items-center justify-center gap-4 text-champagne">
                  <span className="h-px flex-1 bg-champagne/50" />
                  <Heart size={18} />
                  <span className="h-px flex-1 bg-champagne/50" />
                </span>
              </button>
            ))}
          </div>

          <div className="mx-auto my-12 max-w-md text-center">
            <p className="font-serif text-5xl text-champagne">“</p>
            <p className="text-lg text-navy/65">Não são só fotos. São pedaços do caminho que trouxe vocês até aqui.</p>
          </div>

          <div className="grid auto-rows-[190px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4">
            {remaining.map((photo, index) => (
              <button
                key={photo}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                aria-label="Abrir foto do casal"
                className={`overflow-hidden rounded-lg bg-white p-2 shadow-soft transition hover:scale-[1.012] ${
                  index === 3 || index === 11 ? "row-span-2" : ""
                }`}
              >
                <img src={photo} alt="Foto do casal" loading="lazy" className="h-full w-full rounded-md object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedPhoto ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-navy/90 p-5 backdrop-blur-sm" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Fechar foto"
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-navy shadow-soft"
          >
            <X size={24} />
          </button>
          <img src={selectedPhoto} alt="Foto do casal" className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-gold" />
        </div>
      ) : null}
    </main>
  );
}
