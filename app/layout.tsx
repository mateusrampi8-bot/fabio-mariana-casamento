import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fábio & Mariana | Site de Casamento",
  description: "Um álbum digital premium para celebrar a história, o casamento e as memórias de Fábio e Mariana.",
  keywords: ["casamento", "Fábio e Mariana", "álbum digital", "convite de casamento"],
  openGraph: {
    title: "Fábio & Mariana",
    description: "Estamos contando os dias para o nosso sim.",
    type: "website",
    locale: "pt_BR"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
