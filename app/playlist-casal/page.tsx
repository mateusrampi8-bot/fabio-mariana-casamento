"use client";

import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Nav } from "../components";

const playlist = [
  { title: "Musica do casal 01", artist: "Fábio & Mariana", file: "casal-01.mp3" },
  { title: "Musica do casal 02", artist: "Fábio & Mariana", file: "casal-02.mp3" },
  { title: "Musica do casal 03", artist: "Fábio & Mariana", file: "casal-03.mp3" },
  { title: "Musica do casal 04", artist: "Fábio & Mariana", file: "casal-04.mp3" },
  { title: "Musica do casal 05", artist: "Fábio & Mariana", file: "casal-05.mp3" }
].map((song) => ({ ...song, src: encodeURI(`/audio/casal/${song.file}`) }));

export default function PlaylistCasal() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  const song = playlist[current];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = song.src;
    audio.volume = 0.72;
  }, [song.src]);

  function play() {
    audioRef.current?.play().then(() => {
      setIsPlaying(true);
      setNeedsGesture(false);
    }).catch(() => setNeedsGesture(true));
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
    <main className="min-h-screen bg-[#fbf3f1] text-navy">
      <Nav />
      <section className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-5xl rounded-lg border border-champagne/25 bg-white/75 p-7 shadow-soft backdrop-blur">
          <audio ref={audioRef} onEnded={next} />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">Playlist do casal</p>
          <h1 className="mt-3 font-serif text-6xl text-rose">Fábio & Mariana</h1>
          <p className="mt-4 max-w-2xl leading-8 text-navy/65">
            Esta aba ja esta pronta para receber as musicas dos dois em `public/audio/casal`.
          </p>
          {needsGesture ? <p className="mt-5 text-sm text-rose">O navegador pediu um toque para liberar o audio.</p> : null}

          <div className="mt-8 flex items-center gap-3">
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

          <div className="mt-8 space-y-2">
            {playlist.map((item, index) => (
              <button
                key={item.src}
                onClick={() => setCurrent(index)}
                className={`flex w-full items-center gap-4 rounded-md px-4 py-3 text-left transition ${
                  index === current ? "bg-rose text-white" : "bg-white/70 text-[#8b5d62] hover:bg-blush/60"
                }`}
              >
                <span className="font-serif text-2xl">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-sm font-semibold">{item.title}</span>
                  <span className={`text-xs ${index === current ? "text-white/75" : "text-[#8b5d62]/60"}`}>{item.file}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
