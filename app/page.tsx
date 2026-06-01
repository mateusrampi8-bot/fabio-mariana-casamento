"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FloralFrame, Nav } from "./components";
import { coverImage, fallbackCover, weddingDate } from "./data";

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

export default function Home() {
  const countdown = useCountdown();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);

  return (
    <main className="min-h-screen bg-navy text-white">
      <Nav />
      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          style={{ y, backgroundImage: `url(${coverImage}), url(${fallbackCover})` }}
          className="absolute inset-0 scale-110 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/65" />
        <FloralFrame />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-24 text-center">
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-xs font-medium uppercase tracking-[0.55em] text-white/85">
            Contagem regressiva
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-6xl font-medium leading-none md:text-9xl">
            Fábio <span className="text-champagne">&</span> Mariana
          </motion.h1>
          <p className="mt-7 text-sm font-medium uppercase tracking-[0.36em] text-white/90">13 de junho de 2026</p>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.32em] text-white/85">Estamos contando os dias para o nosso sim.</p>
          <div className="my-8 h-px w-80 max-w-full gold-line" />
          <div className="grid grid-cols-4 gap-3 md:gap-8">
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label} className="min-w-16 border-r border-champagne/45 px-2 last:border-0 md:min-w-28">
                <div className="font-serif text-4xl text-champagne md:text-6xl">{String(value).padStart(2, "0")}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.26em] text-white/80">{label}</div>
              </div>
            ))}
          </div>
          <a href="/sobre-nos" className="mt-9 rounded-full bg-gradient-to-r from-[#eed18a] to-[#d4af37] px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-navy shadow-gold transition hover:translate-y-[-2px]">
            Entrar no site
          </a>
          <ChevronDown className="absolute bottom-8 text-champagne" size={38} />
        </div>
      </section>
    </main>
  );
}
