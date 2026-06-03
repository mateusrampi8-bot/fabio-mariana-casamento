"use client";

import { Image as ImageIcon, Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const playlist = [
  { title: "All My Life", artist: "Foo Fighters", file: "SpotiDownloader.com - All My Life - Foo Fighters.mp3" },
  { title: "Back In Black", artist: "AC/DC", file: "SpotiDownloader.com - Back In Black - AC_DC.mp3" },
  { title: "Bohemian Rhapsody", artist: "Queen", file: "SpotiDownloader.com - Bohemian Rhapsody - Remastered 2011 - Queen.mp3" },
  { title: "Feeling Good", artist: "Michael Bublé", file: "SpotiDownloader.com - Feeling Good - Michael Bublé.mp3" },
  { title: "Immigrant Song", artist: "Led Zeppelin", file: "SpotiDownloader.com - Immigrant Song - Remaster - Led Zeppelin.mp3" },
  { title: "Killing In The Name", artist: "Rage Against The Machine", file: "SpotiDownloader.com - Killing In The Name - Rage Against The Machine.mp3" },
  { title: "Rock and Roll", artist: "Led Zeppelin", file: "SpotiDownloader.com - Rock and Roll - Remaster - Led Zeppelin.mp3" },
  { title: "Stairway to Heaven", artist: "Led Zeppelin", file: "SpotiDownloader.com - Stairway to Heaven - Remaster - Led Zeppelin.mp3" },
  { title: "Whole Lotta Love", artist: "Led Zeppelin", file: "SpotiDownloader.com - Whole Lotta Love - 1990 Remaster - Led Zeppelin.mp3" }
].map((song) => ({ ...song, src: encodeURI(`/audio/fabio/${song.file}`) }));

const album = [
  "/images/optimized/fabio/album-01.jpg",
  "/images/optimized/fabio/album-02.jpg",
  "/images/optimized/fabio/album-03.jpg",
  "/images/optimized/fabio/album-04.jpg",
  "/images/optimized/fabio/album-05.jpg",
  "/images/optimized/fabio/album-06.jpg",
  "/images/optimized/fabio/album-07.jpg",
  "/images/optimized/fabio/album-08.jpg",
  "/images/optimized/fabio/album-09.jpg",
  "/images/optimized/fabio/album-10.jpg"
];

export default function FabioMediaSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const song = playlist[current];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = song.src;
    audio.volume = 0.72;

    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setNeedsGesture(true);
        });
    }
  }, [song.src]);

  function play() {
    audioRef.current?.play().then(() => {
      setIsPlaying(true);
      setNeedsGesture(false);
    });
  }

  function pause() {
    audioRef.current?.pause();
    setIsPlaying(false);
  }

  function next() {
    setCurrent((index) => (index + 1) % playlist.length);
  }

  function previous() {
    setCurrent((index) => (index - 1 + playlist.length) % playlist.length);
  }

  return (
    <section id="playlist-fabio" className="bg-[#061426] px-0 py-16 text-white md:px-6">
      <audio ref={audioRef} onEnded={next} />
      <div className="mx-auto grid max-w-[1480px] gap-8 xl:grid-cols-[1fr_minmax(560px,760px)]">
        <div id="album-fabio" className="px-6 xl:pl-0">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">Album de fotos</p>
              <h2 className="mt-2 font-serif text-5xl text-white">Fábio</h2>
            </div>
            <ImageIcon className="text-champagne" size={30} />
          </div>
          <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:grid-cols-3">
            {album.map((photo, index) => (
              <button
                key={photo}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                aria-label="Abrir foto do Fábio"
                className={`group relative overflow-hidden rounded-lg bg-cover bg-center shadow-gold transition hover:scale-[1.015] ${
                  index === 0 || index === 5 ? "row-span-2" : ""
                }`}
                style={{ backgroundImage: `url(${photo}), url(/images/optimized/fabio/principal.jpg)` }}
              />
            ))}
          </div>
        </div>

        <div className="rounded-l-lg border border-r-0 border-champagne/20 bg-white/5 p-6 shadow-gold backdrop-blur md:rounded-lg md:border-r">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">Playlist do Fábio</p>
              <h2 className="mt-3 font-serif text-5xl text-white">{song.title}</h2>
              <p className="mt-2 text-lg text-white/70">{song.artist}</p>
              {needsGesture ? (
                <p className="mt-5 text-sm leading-6 text-white/60">
                  O navegador pediu um toque para liberar o audio.
                </p>
              ) : null}
              <div className="mt-7 flex items-center gap-3">
                <button onClick={previous} aria-label="Musica anterior" className="grid h-12 w-12 place-items-center rounded-full border border-champagne/40 text-champagne">
                  <SkipBack size={18} />
                </button>
                <button onClick={isPlaying ? pause : play} className="grid h-16 w-16 place-items-center rounded-full bg-champagne text-navy shadow-gold" aria-label={isPlaying ? "Pausar" : "Tocar"}>
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button onClick={next} aria-label="Proxima musica" className="grid h-12 w-12 place-items-center rounded-full border border-champagne/40 text-champagne">
                  <SkipForward size={18} />
                </button>
                <Volume2 className="ml-2 text-champagne" size={22} />
              </div>
            </div>

            <div className="space-y-2">
              {playlist.map((item, index) => (
                <button
                  key={item.src}
                  onClick={() => setCurrent(index)}
                  className={`flex w-full items-center gap-4 rounded-md px-4 py-3 text-left transition ${
                    index === current ? "bg-champagne text-navy" : "bg-white/5 text-white/78 hover:bg-white/10"
                  }`}
                >
                  <span className="font-serif text-2xl">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-sm font-semibold">{item.title}</span>
                    <span className={`text-xs ${index === current ? "text-navy/65" : "text-white/45"}`}>{item.artist}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedPhoto ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-navy/92 p-5 backdrop-blur-sm" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Fechar foto"
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-navy shadow-soft"
          >
            <X size={24} />
          </button>
          <img src={selectedPhoto} alt="Foto do Fábio" className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-gold" />
        </div>
      ) : null}
    </section>
  );
}
