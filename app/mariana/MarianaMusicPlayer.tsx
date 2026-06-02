"use client";

import { Image as ImageIcon, Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const playlist = [
  { title: "deja vu", artist: "Olivia Rodrigo", src: "/audio/deja%20vu%20-%20Olivia%20Rodrigo.mp3" },
  { title: "good 4 u", artist: "Olivia Rodrigo", src: "/audio/good%204%20u%20-%20Olivia%20Rodrigo.mp3" },
  { title: "traitor", artist: "Olivia Rodrigo", src: "/audio/traitor%20-%20Olivia%20Rodrigo.mp3" },
  { title: "favorite crime", artist: "Olivia Rodrigo", src: "/audio/favorite%20crime%20-%20Olivia%20Rodrigo.mp3" },
  { title: "The Call", artist: "Regina Spektor", src: "/audio/The%20Call%20-%20Regina%20Spektor.mp3" },
  { title: "Kings & Queens", artist: "Ava Max", src: "/audio/Kings%20%26%20Queens%20-%20Ava%20Max.mp3" },
  { title: "Take Me To Church", artist: "Hozier", src: "/audio/Take%20Me%20To%20Church%20-%20Hozier.mp3" },
  { title: "Hall of Fame", artist: "The Script", src: "/audio/Hall%20of%20Fame%20-%20The%20Script.mp3" },
  { title: "Demons", artist: "Imagine Dragons", src: "/audio/Demons%20-%20Imagine%20Dragons.mp3" },
  { title: "Radioactive", artist: "Imagine Dragons", src: "/audio/Radioactive%20-%20Imagine%20Dragons.mp3" }
];

const album = [
  "/images/mariana/album-01.png",
  "/images/mariana/album-02.png",
  "/images/mariana/album-03.png",
  "/images/mariana/album-04.png",
  "/images/mariana/album-05.png",
  "/images/mariana/album-06.png",
  "/images/mariana/album-07.png",
  "/images/mariana/album-08.png",
  "/images/mariana/album-09.png",
  "/images/mariana/album-10.png"
];

export default function MarianaMusicPlayer() {
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
    <section id="playlist" className="bg-[#fff7f6] px-0 py-16 md:px-6">
      <audio ref={audioRef} onEnded={next} />
      <div className="mx-auto grid max-w-[1480px] gap-8 xl:grid-cols-[minmax(560px,760px)_1fr]">
        <div className="rounded-r-lg border border-l-0 border-rose/20 bg-white/75 p-6 shadow-soft backdrop-blur md:rounded-lg md:border-l">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">Playlist da Mariana</p>
              <h2 className="mt-3 font-serif text-5xl text-rose">{song.title}</h2>
              <p className="mt-2 text-lg text-[#8b5d62]">{song.artist}</p>
              {needsGesture ? (
                <p className="mt-5 text-sm leading-6 text-[#8b5d62]/75">
                  O navegador pediu um toque para liberar o audio.
                </p>
              ) : null}
              <div className="mt-7 flex items-center gap-3">
                <button onClick={previous} aria-label="Musica anterior" className="grid h-12 w-12 place-items-center rounded-full border border-rose/30 text-rose">
                  <SkipBack size={18} />
                </button>
                <button onClick={isPlaying ? pause : play} className="grid h-16 w-16 place-items-center rounded-full bg-rose text-white shadow-soft" aria-label={isPlaying ? "Pausar" : "Tocar"}>
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button onClick={next} aria-label="Proxima musica" className="grid h-12 w-12 place-items-center rounded-full border border-rose/30 text-rose">
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
                    index === current ? "bg-rose text-white" : "bg-white/55 text-[#8b5d62] hover:bg-blush/60"
                  }`}
                >
                  <span className="font-serif text-2xl">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-sm font-semibold">{item.title}</span>
                    <span className={`text-xs ${index === current ? "text-white/75" : "text-[#8b5d62]/60"}`}>{item.artist}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div id="album-mariana" className="px-6 xl:pr-0">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">Album de fotos</p>
              <h2 className="mt-2 font-serif text-5xl text-rose">Mariana</h2>
            </div>
            <ImageIcon className="text-champagne" size={30} />
          </div>
          <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:grid-cols-3">
            {album.map((photo, index) => (
              <button
                key={photo}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                aria-label="Abrir foto da Mariana"
                className={`group relative overflow-hidden rounded-lg bg-cover bg-center shadow-soft ${
                  index === 0 || index === 5 ? "row-span-2" : ""
                }`}
                style={{ backgroundImage: `url(${photo}), url(/images/mariana/principal.png)` }}
              />
            ))}
          </div>
        </div>
      </div>

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
          <img src={selectedPhoto} alt="Foto da Mariana" className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-gold" />
        </div>
      ) : null}
    </section>
  );
}
