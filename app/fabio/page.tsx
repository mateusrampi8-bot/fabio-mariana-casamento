import { PageHero, PageShell, SectionTitle } from "../components";

export default function Fabio() {
  return (
    <PageShell>
      <PageHero eyebrow="Conheça" title="Fábio" subtitle="Determinado, leal e apaixonado pela vida." dark />
      <section className="px-6 py-20">
        <SectionTitle title="Playlist, galeria e linha do tempo" subtitle="Esta aba será dedicada à história do Fábio, suas músicas e seus momentos." />
      </section>
    </PageShell>
  );
}
