# AtlasBuild - Elite Software Factory Landing Page

Landing page profissional para fábrica de software especializada em Blockchain, IA e sistemas de alta performance. Desenvolvida com Next.js 16, Tailwind CSS v4 e next-intl para suporte bilíngue (PT/EN).

## 🚀 Stack Técnica

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (OKLCH colors)
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **i18n**: next-intl
- **Forms**: React Hook Form + Zod
- **Email**: Resend + React Email
- **Rate Limiting**: Upstash Redis
- **Analytics**: Vercel Analytics + Speed Insights
- **TypeScript**: Strict mode enabled

## 🎨 Design

- **Paleta Ultra-Dark**: Fundo #0D0D12 inspirado em reflect.app
- **Glassmorphism**: Cards com backdrop-blur e transparência
- **Gradientes**: Purple (#8B5CF6) → Blue (#3B82F6) → Cyan (#06B6D4)
- **Glow Effects**: Box-shadow suave nos CTAs e ícones
- **Typography**: Geist Sans + Geist Mono

## 📋 Seções da Landing Page

1. **Hero**: Headline impactante + CTAs com glow effects
2. **Expertise Grid**: 4 cards (Blockchain, Payments, Integrações, End-to-End)
3. **Diferencial Tech**: IA Generativa, RAG, n8n Automation
4. **Processo**: Timeline com 4 etapas (Discovery → Deploy)
5. **Formulário de Contato**: Validação Zod + Rate limiting + Campo WhatsApp

## 🌐 Funcionalidades i18n

- Detecção automática de idioma via `Accept-Language` header
- PT-BR ou PT → Português
- Demais idiomas → English
- Seletor manual de idioma no navbar
- URLs com prefixo de locale: `/pt/...` e `/en/...`

## 🔧 Configuração

### 1. Clonar e Instalar

```bash
git clone <repository-url>
cd atlasbuild-landpage
pnpm install
```

### 2. Configurar Variáveis de Ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Preencha as variáveis obrigatórias:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3002

# Resend (para formulário de contato)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev  # Para testes use este
RESEND_TO_EMAILS=seu-email@gmail.com     # Seu email para receber contatos

# Upstash (rate limiting)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AxxxxxxxxxxxQ==
```

### 3. Rodar em Desenvolvimento

```bash
pnpm dev
```

Acesse http://localhost:3002

## 📧 Configurar Resend

### Para Desenvolvimento/Testes

Use o email de teste da Resend:

```env
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAILS=seu-email@gmail.com
```

⚠️ **Importante**: Com `onboarding@resend.dev`, você só pode enviar para o email cadastrado na sua conta Resend.

### Para Produção

1. Criar conta em [resend.com](https://resend.com)
2. Adicionar e verificar domínio (ex: atlasbuild.com)
3. Gerar API Key
4. Adicionar em `RESEND_API_KEY`
5. Configurar `RESEND_FROM_EMAIL` com email verificado (ex: contato@atlasbuild.com)
6. Adicionar destinatários em `RESEND_TO_EMAILS` (separados por vírgula)

## 🛡️ Configurar Upstash Redis

1. Criar conta em [upstash.com](https://upstash.com)
2. Criar novo Redis database
3. Copiar `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`
4. Adicionar em `.env.local`

## 🎯 SEO

- **Metadata**: Títulos e descrições bilíngues
- **OpenGraph**: Imagens dinâmicas geradas via Vercel OG
- **Twitter Cards**: Configurado para summary_large_image
- **JSON-LD**: Schema.org Organization + Services
- **Sitemap**: Gerado dinamicamente com alternates de idioma
- **Robots.txt**: Configurado para permitir crawling

## 📱 Responsividade

- **Mobile-first**: Breakpoints 375px, 768px, 1440px
- **Menu Mobile**: Sheet com navegação completa
- **Grids Responsivos**: 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)
- **Timeline**: Scroll horizontal em mobile

## 🧪 Rate Limiting

- **Formulário de Contato**: 3 envios por hora por IP
- **Tecnologia**: Upstash Redis com sliding window
- **Mensagens**: Feedback claro sobre limite excedido

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Configurar variáveis de ambiente no dashboard da Vercel.

#### Checklist de Verificação de Deploy (NOT_FOUND / DEPLOYMENT_NOT_FOUND)

1. Em **Project > Deployments**, promova o último deploy estável para produção.
2. Em **Project > Domains**, confirme que existe um domínio ativo ligado ao projeto.
3. Em **Project > Settings > Environment Variables**, configure `NEXT_PUBLIC_APP_URL` com o domínio de produção exato (ex: `https://seu-dominio.com` ou `https://atlasbuild-landpage.vercel.app`).
4. Faça um novo deploy após alterar variáveis de ambiente.
5. Valide as rotas em produção:
   - `/` redireciona para `/en`
   - `/en` responde `200`
   - `/pt` responde `200`
   - `/es` mostra página 404 da aplicação (não erro de deploy da Vercel)

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js 16+:

- Netlify
- Railway
- Fly.io
- AWS Amplify

## 📦 Scripts Disponíveis

```bash
pnpm dev          # Desenvolvimento (porta 3002)
pnpm build        # Build de produção
pnpm start        # Servidor de produção
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm test         # Vitest
pnpm test:e2e     # Playwright
```

## 🎨 Customização

### Cores

Edite [src/app/[locale]/globals.css](src/app/[locale]/globals.css):

```css
.dark {
  --background: oklch(0.05 0.005 285); /* Ultra-dark */
  --primary: oklch(0.627 0.265 303.9); /* Purple */
  /* ... */
}
```

### Copy

Edite os dicionários:

- [src/dictionaries/pt.json](src/dictionaries/pt.json)
- [src/dictionaries/en.json](src/dictionaries/en.json)

### Seções

Modifique [src/app/[locale]/(public)/page.tsx](<src/app/[locale]/(public)/page.tsx>)

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── [locale]/                      # Rotas com i18n
│   │   ├── (public)/                  # Landing page
│   │   │   └── page.tsx               # Página principal
│   │   ├── layout.tsx                 # Layout com i18n
│   │   ├── globals.css                # Estilos globais
│   │   └── opengraph-image.tsx        # OG Image dinâmica
│   ├── actions/
│   │   └── send-email.ts              # Server action com rate limiting
│   ├── layout.tsx                     # Root layout
│   ├── sitemap.ts                     # Sitemap dinâmico
│   └── robots.ts                      # Robots.txt
├── components/
│   ├── ui/                            # shadcn/ui components
│   │   ├── scroll-reveal.tsx          # Animação Framer Motion
│   │   └── ...
│   ├── emails/
│   │   └── contact-notification.tsx   # Template React Email
│   ├── contact-form.tsx               # Formulário de contato
│   ├── language-selector.tsx          # Seletor de idioma
│   ├── navbar.tsx                     # Navbar com menu mobile
│   ├── footer.tsx                     # Footer traduzido
│   └── theme-provider.tsx             # Dark mode provider
├── dictionaries/
│   ├── pt.json                        # Traduções PT
│   └── en.json                        # Traduções EN
├── i18n/
│   └── request.ts                     # Configuração next-intl
├── lib/
│   ├── validations/
│   │   └── contact.ts                 # Schema Zod do formulário
│   └── utils.ts                       # Utilities
└── middleware.ts                      # i18n + auth middleware
```

## 🔐 Autenticação

- **Better Auth** com PostgreSQL
- Email/password authentication
- Sessões com 7 dias de duração
- Rate limiting: 100 req/min
- Suporte para OAuth (GitHub, Google) - comentado

## 📄 Licença

MIT

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ pela AtlasBuild
