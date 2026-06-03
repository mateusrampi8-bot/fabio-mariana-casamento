"use client";

import { Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";

const photos = [
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

export default function FabioGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section className="bg-navy px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">Album de fotos</p>
            <h2 className="mt-2 font-serif text-5xl">Fábio</h2>
          </div>
          <ImageIcon className="text-champagne" size={30} />
        </div>
        <div className="grid auto-rows-[170px] grid-cols-2 gap-4 md:grid-cols-4">
          {photos.map((photo, index) => (
            <button
              key={photo}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              aria-label="Abrir foto do Fábio"
              className={`rounded-lg bg-cover bg-center shadow-gold transition hover:scale-[1.015] ${
                index === 0 || index === 7 ? "row-span-2" : ""
              }`}
              style={{ backgroundImage: `url(${photo}), url(/images/optimized/fabio/principal.jpg)` }}
            />
          ))}
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
