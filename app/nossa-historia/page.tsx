import { Heart } from "lucide-react";
import { PageHero, PageShell } from "../components";

const storyParagraphs = [
  "Tudo começou em 16 de julho de 2022, quando os caminhos de Fábio e Mariana se cruzaram e uma nova história começou a ser escrita.",
  "Fábio, nascido em 03 de agosto de 1993, em Tubarão, é um homem reservado, gentil e dono de um coração enorme. Apaixonado por futebol, tênis, trilhas, academia, rock, Pokémon e pelo Botafogo, vibra com cada conquista do seu time como se fosse uma vitória pessoal. Filho do meio entre três irmãos, sempre carregou consigo um jeito cuidadoso e carinhoso de demonstrar amor.",
  "Mariana, nascida em 30 de abril de 1999, em Cocal do Sul, é uma mulher meiga, amorosa e cheia de luz. Seu carinho transforma os momentos simples em memórias especiais, e sua doçura é uma das qualidades que mais encantam todos ao seu redor.",
  "Ao longo dos anos, construíram uma vida repleta de experiências inesquecíveis. Viajaram juntos por lugares que sempre sonharam conhecer, como Inglaterra, Itália, Vaticano e Argentina, além de criarem memórias especiais em São Paulo e no Rio de Janeiro. Compartilharam shows, risadas em apresentações de stand-up e mágica, passeios, refeições, compras de livros, sapatos e tantas pequenas aventuras do dia a dia.",
  "A família também cresceu com a chegada de companheiros muito especiais: Tico, o cachorro que conquistou seus corações, e os gatos Selena e Alex, que tornaram a casa ainda mais cheia de vida e amor.",
  "Entre momentos felizes e desafios, estiveram sempre lado a lado. Um dos capítulos mais marcantes dessa jornada foi a cirurgia do cisto, enfrentada com coragem, apoio e fé, terminando com a melhor notícia possível: tudo deu certo.",
  "Juntos, comemoraram conquistas, realizaram sonhos, colecionaram lembranças, assistiram a shows de artistas que amam, vibraram com o título da Libertadores do Botafogo e descobriram que a felicidade está nos detalhes compartilhados.",
  "Agora, após anos construindo uma história baseada em amor, companheirismo, respeito e amizade, chegou o momento de dar um novo passo.",
  "No dia 13 de junho de 2026, Fábio e Mariana celebram não apenas um casamento, mas a continuação de uma linda história que começou com um encontro e se transformou em uma vida inteira de amor.",
  "E este é apenas o começo."
];

const storyPhotos = [
  {
    src: "/images/optimized/casal/WhatsApp%20Image%202026-06-02%20at%2013.05.08%20(1).jpg",
    alt: "Fábio e Mariana abraçados em um coreto"
  },
  {
    src: "/images/optimized/casal/WhatsApp%20Image%202026-05-30%20at%2009.42.50%20(2).jpg",
    alt: "Fábio e Mariana caminhando na praia"
  },
  {
    src: "/images/optimized/casal/WhatsApp%20Image%202026-05-30%20at%2009.42.51%20(2).jpg",
    alt: "Fábio e Mariana sorrindo em meio à natureza"
  },
  {
    src: "/images/optimized/casal/abf5af1e-19a6-4534-83fa-1badc6db0e60.jpg",
    alt: "Fábio e Mariana no cartório"
  },
  {
    src: "/images/optimized/casal/WhatsApp%20Image%202026-06-02%20at%2013.05.08%20(3).jpg",
    alt: "Fábio beijando Mariana em uma moldura floral"
  },
  {
    src: "/images/optimized/casal/9935d1d9-278d-4f9e-8873-e410d3fb5216.jpg",
    alt: "Selfie de Fábio e Mariana"
  }
];

export default function NossaHistoria() {
  return (
    <PageShell>
      <PageHero eyebrow="Nossa" title="História" subtitle="De dois, um só coração." />
      <section className="relative overflow-hidden bg-[#fbf6ee] px-5 py-20 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(247,215,221,0.52),transparent_26%),radial-gradient(circle_at_84%_30%,rgba(212,175,55,0.18),transparent_28%)]" />

        <div className="relative mx-auto grid max-w-[1500px] gap-10 xl:grid-cols-[0.78fr_minmax(540px,760px)_0.78fr]">
          <div className="hidden flex-col gap-8 xl:flex">
            <PhotoCard photo={storyPhotos[0]} className="mt-12 rotate-[-2deg]" />
            <PhotoCard photo={storyPhotos[2]} className="ml-10 rotate-[2deg]" />
            <PhotoCard photo={storyPhotos[4]} className="rotate-[-1deg]" />
          </div>

          <article className="rounded-lg border border-champagne/18 bg-white/84 px-6 py-10 shadow-soft backdrop-blur md:px-12">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <p className="font-script text-5xl text-champagne md:text-6xl">Como tudo começou</p>
              <h2 className="mt-2 font-serif text-5xl font-semibold leading-none text-rose md:text-7xl">Fábio & Mariana</h2>
              <div className="mx-auto my-7 flex max-w-xs items-center justify-center gap-4 text-champagne">
                <span className="h-px flex-1 bg-champagne/45" />
                <Heart size={20} />
                <span className="h-px flex-1 bg-champagne/45" />
              </div>
            </div>

            <div className="space-y-6 text-[17px] leading-9 text-navy/72">
              {storyParagraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 || index === storyParagraphs.length - 1 ? "font-serif text-2xl leading-9 text-navy" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <div className="hidden flex-col gap-8 xl:flex">
            <PhotoCard photo={storyPhotos[1]} className="rotate-[2deg]" />
            <PhotoCard photo={storyPhotos[3]} className="mr-10 rotate-[-2deg]" />
            <PhotoCard photo={storyPhotos[5]} className="rotate-[1deg]" />
          </div>

          <div className="grid gap-4 md:grid-cols-3 xl:hidden">
            {storyPhotos.map((photo, index) => (
              <PhotoCard key={photo.src} photo={photo} className={index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function PhotoCard({ photo, className = "" }: { photo: { src: string; alt: string }; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-lg bg-white p-2 shadow-soft ${className}`}>
      <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[0.82/1] w-full rounded-md object-cover" />
    </figure>
  );
}
