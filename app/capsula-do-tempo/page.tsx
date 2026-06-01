import { PageHero, PageShell, SectionTitle } from "../components";

export default function CapsulaDoTempo() {
  return (
    <PageShell>
      <PageHero eyebrow="Para o nosso futuro" title="Cápsula do Tempo" subtitle="Um espaço sentimental para promessas, sonhos e respostas." />
      <section className="px-6 py-20">
        <SectionTitle title="Abrir esta cápsula em 27/09/2035" subtitle="Onde estaremos daqui a 10 anos, o que mais amamos um no outro e nossas promessas." />
      </section>
    </PageShell>
  );
}
