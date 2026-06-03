"use client";

import Link from "next/link";
import { Heart, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { PageShell } from "../components";

export default function DeixarRecado() {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const response = await fetch("/api/recados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, relation, message })
    });

    const payload = (await response.json().catch(() => ({}))) as { error?: string };

    if (!response.ok) {
      setStatus("error");
      setError(payload.error ?? "Não foi possível enviar agora.");
      return;
    }

    setStatus("sent");
    setName("");
    setRelation("");
    setMessage("");
  }

  return (
    <PageShell>
      <section className="relative min-h-screen overflow-hidden bg-[#fbf6ee] px-5 pb-16 pt-28 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(247,215,221,0.75),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(212,175,55,0.22),transparent_30%)]" />
        <div className="relative mx-auto grid min-h-[78vh] max-w-6xl items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-script text-6xl text-champagne md:text-7xl">Cartas para</p>
            <h1 className="mt-2 font-serif text-6xl font-semibold leading-none text-rose md:text-8xl">Fábio & Mariana</h1>
            <div className="my-8 flex max-w-xs items-center gap-4 text-champagne">
              <span className="h-px flex-1 bg-champagne/45" />
              <Heart size={20} />
              <span className="h-px flex-1 bg-champagne/45" />
            </div>
            <p className="max-w-md text-lg leading-8 text-navy/68">
              Escreva uma mensagem com carinho. Ela ficará guardada no mural de recados do casal.
            </p>
          </div>

          <form onSubmit={submitMessage} className="rounded-lg border border-champagne/20 bg-white/82 p-6 shadow-soft backdrop-blur md:p-8">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne">Seu nome</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={80}
                required
                className="mt-3 w-full rounded-md border border-rose/20 bg-white px-4 py-3 text-navy outline-none transition focus:border-champagne"
                placeholder="Ex: Renata Silva"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne">Relação</span>
              <input
                value={relation}
                onChange={(event) => setRelation(event.target.value)}
                maxLength={80}
                className="mt-3 w-full rounded-md border border-rose/20 bg-white px-4 py-3 text-navy outline-none transition focus:border-champagne"
                placeholder="Ex: amiga da noiva, primo do noivo"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne">Mensagem</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={700}
                required
                rows={7}
                className="mt-3 w-full resize-none rounded-md border border-rose/20 bg-white px-4 py-3 text-navy outline-none transition focus:border-champagne"
                placeholder="Deixe aqui seu carinho para Fábio & Mariana..."
              />
            </label>

            {status === "error" ? <p className="mt-4 text-sm text-rose">{error}</p> : null}
            {status === "sent" ? <p className="mt-4 text-sm text-navy/70">Seu recado foi enviado e já pode aparecer no mural.</p> : null}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-gold transition hover:scale-[1.02] disabled:opacity-60"
              >
                <Send size={16} />
                {status === "sending" ? "Enviando" : "Enviar recado"}
              </button>
              <Link
                href="/recados"
                className="inline-flex items-center justify-center rounded-full border border-champagne/35 px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-champagne"
              >
                Ver mural
              </Link>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
