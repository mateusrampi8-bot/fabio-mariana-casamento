import { PageHero, PageShell, SectionTitle } from "../components";

export default function NossaHistoria() {
  return (
    <PageShell>
      <PageHero eyebrow="Nossa" title="História" subtitle="De dois, um só coração." />
      <section className="px-6 py-20">
        <SectionTitle title="Como tudo começou" subtitle="Primeiro encontro, primeira conversa, primeira viagem, primeiro beijo, pedido de namoro, pedido de casamento e casamento." />
      </section>
    </PageShell>
  );
}
