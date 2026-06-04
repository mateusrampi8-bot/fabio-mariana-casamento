"use client";

import { Eraser, Heart, MessageCircle, PenLine, Send, X } from "lucide-react";
import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { PageHero, PageShell } from "../components";

type GuestMessage = {
  id: string;
  name: string;
  relation: string;
  message: string;
  signature?: string;
  createdAt: string;
};

const LOCAL_RECADO_KEY = "fabio-mariana-recados";

function readLocalMessages() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(LOCAL_RECADO_KEY);
    return stored ? (JSON.parse(stored) as GuestMessage[]) : [];
  } catch {
    return [];
  }
}

function saveLocalMessages(messages: GuestMessage[]) {
  try {
    window.localStorage.setItem(LOCAL_RECADO_KEY, JSON.stringify(messages.slice(0, 99)));
  } catch {
    // Local backup is best-effort only.
  }
}

function mergeMessages(primary: GuestMessage[], secondary: GuestMessage[]) {
  const seen = new Set<string>();
  return [...primary, ...secondary].filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export default function Recados() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasSignature, setHasSignature] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const localMessages = readLocalMessages();
    setMessages(localMessages);

    fetch("/api/recados", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { messages?: GuestMessage[] }) => {
        setMessages(mergeMessages(payload.messages ?? [], localMessages));
      })
      .catch(() => setMessages(localMessages))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!isFormOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * scale));
    canvas.height = Math.max(1, Math.floor(rect.height * scale));

    const context = canvas.getContext("2d");
    if (!context) return;

    context.scale(scale, scale);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 3;
    context.strokeStyle = "#10233F";
  }, [isFormOpen]);

  function getPoint(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function startDrawing(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    const point = getPoint(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
    setIsDrawing(true);
    setHasSignature(true);
  }

  function draw(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;

    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const point = getPoint(event);
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  function stopDrawing() {
    const context = canvasRef.current?.getContext("2d");
    context?.closePath();
    setIsDrawing(false);
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  }

  function closeForm() {
    setIsFormOpen(false);
    setStatus("idle");
    setError("");
    setMessage("");
    setHasSignature(false);
  }

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const signature = canvasRef.current?.toDataURL("image/png") ?? "";

    try {
      const response = await fetch("/api/recados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Assinatura manual",
          relation: "",
          message,
          signature
        })
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string; message?: GuestMessage };

      if (!response.ok || !payload.message) {
        throw new Error(payload.error ?? "Não foi possível enviar agora.");
      }

      const nextMessages = mergeMessages([payload.message], messages);
      setMessages(nextMessages);
      saveLocalMessages(nextMessages);
      setStatus("sent");
      closeForm();
    } catch (caughtError) {
      const fallbackMessage: GuestMessage = {
        id: crypto.randomUUID(),
        name: "Assinatura manual",
        relation: "",
        message,
        signature,
        createdAt: new Date().toISOString()
      };
      const nextMessages = mergeMessages([fallbackMessage], messages);
      setMessages(nextMessages);
      saveLocalMessages(nextMessages);
      setStatus("sent");
      closeForm();
    }
  }

  return (
    <PageShell>
      <PageHero eyebrow="Cartas para" title="Fábio & Mariana" subtitle="Palavras escritas por quem caminhou conosco até aqui." dark />
      <section className="relative bg-[#fbf6ee] px-5 py-20 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(247,215,221,0.62),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(212,175,55,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <p className="font-script text-5xl text-champagne">Mural de carinho</p>
              <h2 className="mt-2 font-serif text-5xl font-semibold text-rose md:text-6xl">Recados dos convidados</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-gold transition hover:scale-[1.02]"
            >
              <PenLine size={16} />
              Adicionar recado
            </button>
          </div>

          {loading ? <p className="text-center text-navy/60">Carregando recados...</p> : null}

          {!loading && messages.length === 0 ? (
            <div className="rounded-lg border border-champagne/18 bg-white/82 p-8 text-center shadow-soft">
              <Heart className="mx-auto mb-4 text-champagne" size={24} />
              <p className="font-serif text-3xl text-rose">Ainda não há recados por aqui.</p>
              <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-navy/60">
                Clique em adicionar recado para deixar uma mensagem assinada à mão.
              </p>
            </div>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {messages.map((item) => (
              <article key={item.id} className="rounded-lg border border-champagne/18 bg-white/86 p-6 shadow-soft">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-navy">{item.name}</h3>
                    {item.relation ? <p className="mt-1 text-sm text-rose">{item.relation}</p> : null}
                  </div>
                  <MessageCircle className="shrink-0 text-champagne" size={22} />
                </div>
                <p className="text-base leading-8 text-navy/68">“{item.message}”</p>
                {item.signature ? (
                  <div className="mt-6 rounded-md border border-champagne/15 bg-[#fffaf6] px-4 py-3">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">Assinatura</p>
                    <img src={item.signature} alt="Assinatura feita à mão" className="h-20 max-w-full object-contain object-left" />
                  </div>
                ) : (
                  <Heart className="mx-auto mt-6 text-rose/75" size={18} />
                )}
              </article>
            ))}
          </div>
        </div>

        {isFormOpen ? (
          <div className="fixed inset-0 z-[80] overflow-y-auto bg-navy/55 px-5 py-10 backdrop-blur-sm">
            <form
              onSubmit={submitMessage}
              className="relative mx-auto max-w-2xl rounded-lg border border-champagne/20 bg-white p-6 shadow-soft md:p-8"
            >
              <button
                type="button"
                onClick={closeForm}
                aria-label="Fechar formulário de recado"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-champagne/25 text-champagne"
              >
                <X size={18} />
              </button>

              <p className="font-script text-5xl text-champagne">Cartas para</p>
              <h3 className="mt-1 pr-12 font-serif text-5xl font-semibold text-rose">Fábio & Mariana</h3>

              <label className="mt-8 block">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne">Seu recado</span>
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

              <div className="mt-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne">Assine à mão</span>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="inline-flex items-center gap-2 rounded-full border border-rose/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose transition hover:border-rose"
                  >
                    <Eraser size={14} />
                    Limpar
                  </button>
                </div>
                <canvas
                  ref={canvasRef}
                  onPointerDown={startDrawing}
                  onPointerMove={draw}
                  onPointerUp={stopDrawing}
                  onPointerLeave={stopDrawing}
                  className="mt-3 h-44 w-full touch-none rounded-md border border-champagne/25 bg-[linear-gradient(180deg,#fff,#fffaf6)] shadow-inner outline-none"
                  aria-label="Campo para assinar à mão livre"
                />
                <p className="mt-2 text-sm text-navy/45">Use o mouse, dedo ou caneta para fazer a assinatura.</p>
              </div>

              {status === "error" ? <p className="mt-4 text-sm text-rose">{error}</p> : null}

              <button
                type="submit"
                disabled={status === "sending" || !message.trim() || !hasSignature}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-gold transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-55"
              >
                <Send size={16} />
                {status === "sending" ? "Enviando" : "Enviar recado"}
              </button>
            </form>
          </div>
        ) : null}
      </section>
    </PageShell>
  );
}
