"use client";

import { Heart, Pause, Play, Volume2, X } from "lucide-react";
import { useRef, useState } from "react";
import { Nav } from "../components";

const photos = Array.from({ length: 12 }, (_, index) => `/images/casal/album-${String(index + 1).padStart(2, "0")}.png`);
const coupleAudio = "/audio/casal/casal-01.mp3";

export default function FotosCasal() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMissing, setAudioMissing] = useState(false);

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
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }

  return (
    <main className="min-h-screen bg-[#fff8f5] text-navy">
      <Nav />
      <audio
        ref={audioRef}
        src={coupleAudio}
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        onError={() => setAudioMissing(true)}
      />

      <section className="px-5 pb-20 pt-28 md:px-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="font-script text-5xl text-champagne">Nossa trilha</p>
            <h1 className="mt-2 font-serif text-5xl leading-none text-rose md:text-7xl">Fábio & Mariana</h1>
            <div className="mx-auto my-6 flex max-w-sm items-center justify-center gap-4 text-champagne">
              <span className="h-px flex-1 bg-champagne/45" />
              <Heart size={20} />
              <span className="h-px flex-1 bg-champagne/45" />
            </div>
            <div className="mx-auto flex max-w-md items-center justify-center gap-5 rounded-full border border-champagne/30 bg-white/65 px-5 py-4 shadow-soft backdrop-blur">
              <button
                type="button"
                onClick={toggleAudio}
                aria-label={isPlaying ? "Pausar música do casal" : "Tocar música do casal"}
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-champagne text-white shadow-gold transition hover:scale-105"
              >
                {isPlaying ? <Pause size={23} /> : <Play size={23} />}
              </button>
              <div className="min-w-0 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-champagne">Player do casal</p>
                <p className="truncate font-serif text-xl text-navy">{audioMissing ? "Adicione o MP3 do casal" : "Uma música para nós dois"}</p>
              </div>
              <Volume2 className="shrink-0 text-rose" size={22} />
            </div>
          </div>

          <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
            {photos.map((photo, index) => (
              <button
                key={photo}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                aria-label="Abrir foto do casal"
                className={`rounded-lg bg-cover bg-center shadow-soft transition hover:scale-[1.015] ${
                  index === 0 || index === 7 ? "row-span-2" : ""
                }`}
                style={{ backgroundImage: `url(${photo}), url(/images/capa-casal-premium.png)` }}
              />
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
