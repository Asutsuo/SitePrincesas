# 👑 Chá das Princesas — Encontro Real de Mulheres

Website oficial e galeria interativa do projeto ministerial **Chá das Princesas**, idealizado por **Edinea Gomes Barbalho**. Um encontro criado para acolher, curar feridas emocionais e lembrar a cada mulher que ela é amada, preciosa e filha do Rei Jesus.

---

## ✨ Funcionalidades

- **🎨 Temas Dinâmicos por Edição**: Paleta visual que se adapta automaticamente conforme a edição selecionada (Azul Celestial para 2026, Marsala/Rosa para 2025, etc.).
- **📖 História Real & Origem**: Narrativa fiel ao testemunho de Edinea Barbalho sobre a oração de 2024, a visão da urgência e a parceria na organização de cada detalhe.
- **📜 O Manual das Princesas**: Apresentação das 10 regras de honra e acolhimento à mesa, destacando a regra nº 10 (*"Se sentir vontade de chorar, fique à vontade!"*).
- **📸 Acervo de Edições & Galeria Interativa**:
  - **1ª Edição (2025)**: Tema, louvores, dinâmicas da mochila e do espelho, fotos categorizadas e relatos.
  - **2ª Edição (2026)**: Tema *Herdeiras do Reino*, tour em vídeo pela mesa posta, fotos e novos feedbacks.
- **💬 Depoimentos Verídicos**: Relatos reais das participantes separados rigorosamente por edição, com visualização em alta resolução dos prints das mensagens originais.
- **🔍 Modal Lightbox Completo**: Sistema de ampliação de fotos com controles de zoom e suporte a teclado (ESC).
- **🛡️ Painel Administrativo**: Interface para visualização e gestão de edições e configurações (`/admin`).

---

## 🛠️ Tecnologias Utilizadas

- **[Next.js 16](https://nextjs.org/)** (App Router & Turbopack)
- **[React 19](https://react.dev/)** & **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Lucide React](https://lucide.dev/)** (Ícones)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Asutsuo/SitePrincesas.git
cd SitePrincesas
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:3000
```

### Build de Produção

```bash
npm run build
npm run start
```

---

## 📁 Estrutura do Projeto

```
SitePrincesas/
├── public/
│   └── assets/            # Imagens, logos, fotos e vídeos das edições
├── src/
│   ├── app/               # Rotas e páginas do Next.js (App Router)
│   ├── components/
│   │   ├── common/        # Componentes reutilizáveis (Lightbox, Divisores, etc.)
│   │   ├── home/          # Seções da página inicial (Hero, História, Edições, etc.)
│   │   └── layout/        # Navbar e Footer
│   ├── context/           # ThemeContext (controle de tema e edição ativa)
│   ├── data/              # Dados em JSON das edições e postagens
│   └── lib/               # Tipos e utilitários
└── package.json
```

---

## 📄 Licença

Este projeto foi desenvolvido com amor para o ministério **Chá das Princesas**. Todos os direitos reservados.
