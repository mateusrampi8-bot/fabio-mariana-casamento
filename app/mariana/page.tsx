import { PageHero, PageShell, SectionTitle } from "../components";

export default function Mariana() {
  return (
    <PageShell>
      <PageHero eyebrow="Conheça" title="Mariana" subtitle="Sonhadora, dedicada e apaixonada pelos pequenos detalhes." />
      <section className="px-6 py-20">
        <SectionTitle title="Playlist, galeria e linha do tempo" subtitle="Esta aba será dedicada à história da Mariana, suas músicas e seus momentos." />
      </section>
    </PageShell>
  );
}
