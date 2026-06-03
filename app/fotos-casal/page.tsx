"use client";

import { Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { Nav } from "../components";

const photos = Array.from({ length: 12 }, (_, index) => `/images/casal/album-${String(index + 1).padStart(2, "0")}.png`);

export default function FotosCasal() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-ivory text-navy">
      <Nav />
      <section className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">Fotos do casal</p>
              <h1 className="mt-2 font-serif text-6xl text-rose">Fábio & Mariana</h1>
            </div>
            <ImageIcon className="text-champagne" size={32} />
          </div>

          <div className="grid auto-rows-[170px] grid-cols-2 gap-4 md:grid-cols-4">
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
