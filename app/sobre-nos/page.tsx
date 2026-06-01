import { Heart } from "lucide-react";
import { PageHero, PageShell, SectionTitle } from "../components";

export default function SobreNos() {
  return (
    <PageShell>
      <PageHero eyebrow="Quem somos nós" title="Duas histórias, um destino" subtitle="Antes do sim, existiam sonhos, famílias, amigos e caminhos que finalmente se encontraram." />
      <section className="px-6 py-20">
        <SectionTitle title="Fábio & Mariana" subtitle="Uma página para conhecer os dois com calma, como um álbum aberto." />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {["Mariana", "Fábio"].map((name) => (
            <a key={name} href={name === "Mariana" ? "/mariana" : "/fabio"} className="rounded-lg border border-champagne/25 bg-white/80 p-8 text-center shadow-soft transition hover:-translate-y-1">
              <Heart className="mx-auto mb-5 text-champagne" />
              <h2 className="font-serif text-5xl">{name}</h2>
              <p className="mt-4 text-navy/65">Conhecer</p>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
