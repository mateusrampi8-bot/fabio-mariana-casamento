"use client";

import Link from "next/link";
import { Eraser, Heart, Send } from "lucide-react";
import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { PageShell } from "../components";

export default function DeixarRecado() {
  const [message, setMessage] = useState("");
  const [hasSignature, setHasSignature] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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
  }, []);

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

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const signature = canvasRef.current?.toDataURL("image/png") ?? "";

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

    const payload = (await response.json().catch(() => ({}))) as { error?: string };

    if (!response.ok) {
      setStatus("error");
      setError(payload.error ?? "Não foi possível enviar agora.");
      return;
    }

    setStatus("sent");
    setMessage("");
    clearSignature();
  }

  return (
    <PageShell>
      <section className="relative min-h-screen overflow-hidden bg-[#fbf6ee] px-5 pb-16 pt-28 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(247,215,221,0.78),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(212,175,55,0.24),transparent_30%),linear-gradient(115deg,rgba(212,175,55,0.09)_0_1px,transparent_1px_46px)]" />
        <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full border border-rose/20 bg-rose/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full border border-champagne/20 bg-champagne/10 blur-3xl" />

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
              Escreva uma mensagem para o casal e assine como se fosse uma carta feita à mão.
            </p>
          </div>

          <form onSubmit={submitMessage} className="rounded-lg border border-champagne/20 bg-white/86 p-6 shadow-soft backdrop-blur md:p-8">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne">Seu recado</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={700}
                required
                rows={8}
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
            {status === "sent" ? <p className="mt-4 text-sm text-navy/70">Seu recado foi enviado para o mural.</p> : null}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={status === "sending" || !message.trim() || !hasSignature}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-gold transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-55"
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
