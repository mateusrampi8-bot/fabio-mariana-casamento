"use client";

import Link from "next/link";
import { Heart, MessageCircle, PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero, PageShell } from "../components";

type GuestMessage = {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: string;
};

const featuredMessages = [
  {
    id: "mae-noiva",
    name: "Claudia",
    relation: "Mãe da noiva",
    message: "Minha filha, hoje você inicia um novo capítulo da sua vida e eu só posso desejar toda a felicidade do mundo.",
    createdAt: ""
  },
  {
    id: "pai-noivo",
    name: "Carlos",
    relation: "Pai do noivo",
    message: "Fábio, ver você encontrando alguém que te completa é o maior presente que eu poderia ter.",
    createdAt: ""
  },
  {
    id: "padrinhos",
    name: "Marcos e Juliana",
    relation: "Padrinhos",
    message: "É uma alegria imensa fazer parte desse momento tão especial. Que a vida de vocês seja cheia de amor.",
    createdAt: ""
  }
];

export default function Recados() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recados", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { configured?: boolean; messages?: GuestMessage[] }) => {
        setConfigured(payload.configured !== false);
        setMessages(payload.messages ?? []);
      })
      .catch(() => setConfigured(false))
      .finally(() => setLoading(false));
  }, []);

  const allMessages = [...messages, ...featuredMessages];

  return (
    <PageShell>
      <PageHero eyebrow="Cartas para" title="Fábio & Mariana" subtitle="Palavras escritas por quem caminhou conosco até aqui." dark />
      <section className="bg-[#fbf6ee] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <p className="font-script text-5xl text-champagne">Mural de carinho</p>
              <h2 className="mt-2 font-serif text-5xl font-semibold text-rose md:text-6xl">Recados dos convidados</h2>
            </div>
            <Link
              href="/deixar-recado"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-gold transition hover:scale-[1.02]"
            >
              <PenLine size={16} />
              Deixe seu recado
            </Link>
          </div>

          {!configured ? (
            <div className="mb-8 rounded-lg border border-champagne/25 bg-white/75 p-5 text-sm leading-7 text-navy/70 shadow-soft">
              O mural já está pronto, mas precisa conectar o armazenamento online no Vercel para receber novos recados.
            </div>
          ) : null}

          {loading ? <p className="text-center text-navy/60">Carregando recados...</p> : null}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {allMessages.map((item) => (
              <article key={item.id} className="rounded-lg border border-champagne/18 bg-white/82 p-6 shadow-soft">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-navy">{item.name}</h3>
                    {item.relation ? <p className="mt-1 text-sm text-rose">{item.relation}</p> : null}
                  </div>
                  <MessageCircle className="shrink-0 text-champagne" size={22} />
                </div>
                <p className="text-base leading-8 text-navy/68">“{item.message}”</p>
                <Heart className="mx-auto mt-6 text-rose/75" size={18} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
