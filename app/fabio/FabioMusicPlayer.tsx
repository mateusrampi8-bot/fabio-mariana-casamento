"use client";

import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
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

export default function FabioMusicPlayer() {
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
      <div className="mx-auto max-w-6xl rounded-lg border border-champagne/20 bg-white/5 p-6 shadow-gold backdrop-blur">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">Playlist do Fábio</p>
            <h2 className="mt-3 font-serif text-5xl text-white">{song.title}</h2>
            <p className="mt-2 text-lg text-white/70">{song.artist}</p>
            {needsGesture ? <p className="mt-5 text-sm leading-6 text-white/60">O navegador pediu um toque para liberar o audio.</p> : null}
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
    </section>
  );
}
