import { MapPin } from "lucide-react";
import { PageHero, PageShell, SectionTitle } from "../components";

export default function Detalhes() {
  return (
    <PageShell>
      <PageHero eyebrow="O grande dia" title="Detalhes do Casamento" subtitle="Data, horário, cerimônia, recepção, endereço e dress code." />
      <section className="px-6 py-20">
        <SectionTitle title="13 de junho de 2026" subtitle="As informações finais do casamento ficam nesta aba." />
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {["Horário", "Cerimônia", "Recepção", "Endereço", "Dress Code", "Como chegar"].map((item) => (
            <div key={item} className="rounded-lg border border-champagne/25 bg-white p-6 shadow-soft">
              <MapPin className="mb-4 text-champagne" />
              <h2 className="font-serif text-3xl">{item}</h2>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
