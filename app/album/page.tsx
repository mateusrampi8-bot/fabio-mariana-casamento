import { PageHero, PageShell, SectionTitle } from "../components";

export default function Album() {
  return (
    <PageShell>
      <PageHero eyebrow="Depois do sim" title="Nossa nova história começou" subtitle="O melhor dia das nossas vidas foi apenas o começo." dark />
      <section className="px-6 py-20">
        <SectionTitle title="Álbum pós-casamento" subtitle="Fotos oficiais, vídeos, drone, cerimônia e festa." />
      </section>
    </PageShell>
  );
}
