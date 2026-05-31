# Deploy do site Fabio & Mariana

O projeto esta pronto para Vercel, o mesmo caminho recomendado para sites Next.js.

## Publicar pela Vercel

1. Entre em https://vercel.com.
2. Clique em `Add New...` e depois `Project`.
3. Importe o repositorio GitHub deste projeto.
4. Confira as configuracoes:
   - Framework Preset: `Next.js`
   - Install Command: `npm install --no-audit --no-fund`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Clique em `Deploy`.

## Publicar por CLI

Depois de fazer login na Vercel:

```bash
npx vercel
npx vercel --prod
```

## Fotos reais

Coloque as fotos do casal em `public/images` e troque os links no objeto `images` em `app/page.tsx`.
Use caminhos como:

```ts
hero: "/images/hero-casal.jpg"
```

## Observacao

Esta sessao nao conseguiu acessar o registry npm: `npm install` e `npm view next version` deram timeout.
Quando a rede/npm responder, rode:

```bash
npm install
npm run build
```
