import { PageHero, PageShell, SectionTitle } from "../components";

export default function Recados() {
  return (
    <PageShell>
      <PageHero eyebrow="Cartas para" title="Fábio & Mariana" subtitle="Palavras escritas por quem caminhou conosco até aqui." dark />
      <section className="px-6 py-20">
        <SectionTitle title="Recados" subtitle="Família, padrinhos, amigos e colegas terão mensagens em texto e vídeo." />
      </section>
    </PageShell>
  );
}
