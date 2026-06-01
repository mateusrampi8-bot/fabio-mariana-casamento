import { PageHero, PageShell, SectionTitle } from "../components";
import { galleryImages } from "../data";

export default function Galeria() {
  return (
    <PageShell>
      <PageHero eyebrow="Memórias" title="Galeria" subtitle="Fotos em uma experiência visual limpa e separada das outras abas." />
      <section className="px-6 py-20">
        <SectionTitle title="Nossa galeria" />
        <div className="mx-auto columns-1 gap-5 space-y-5 md:columns-3">
          {galleryImages.map((src, index) => (
            <img key={src} src={src} alt={`Galeria ${index + 1}`} className={`w-full rounded-lg object-cover shadow-soft ${index % 2 ? "h-72" : "h-96"}`} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
