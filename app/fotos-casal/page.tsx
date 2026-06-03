"use client";

import { Heart, Pause, Play, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

const photos = photoFiles.map(optimizedPhotoPath);
const playlist = audioFiles.map((file) => encodeURI(`/audio/casal/${file}`));

export default function FotosCasal() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMissing, setAudioMissing] = useState(false);

  const coupleAudio = playlist[currentSong];

  useEffect(() => {
    if (!isPlaying) return;

    audioRef.current
      ?.play()
      .then(() => setAudioMissing(false))
      .catch(() => setIsPlaying(false));
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
        onEnded={nextSong}
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
                <p className="truncate font-serif text-xl text-navy">{audioMissing ? "Preparando a trilha" : "Uma música para nós dois"}</p>
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
                  index === 0 || index === 7 || index === 16 || index === 24 ? "row-span-2" : ""
                }`}
                style={{ backgroundImage: `url(${photo}), url(/images/optimized/capa-casal-premium.jpg)` }}
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
