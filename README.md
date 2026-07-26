# Bíblia360

O **Bíblia360** é um repositório e agregador digital sem fins lucrativos que unifica conteúdos bíblicos, hinos da Harpa Cristã e lições de estudo da EBD, com foco em uma experiência de leitura agradável, limpa e minimalista.

## ✨ Funcionalidades Principais

- **Leitura Offline (PWA):** O site pode ser instalado no dispositivo. Você pode baixar versões da Bíblia (limite de 2 versões completas), hinos da Harpa (ilimitado) e lições da EBD (limite de 1) para ler sem internet.
- **Ferramentas de Leitura e Acessibilidade:**
  - Ajuste dinâmico do tamanho das fontes (A+ / A-).
  - Modo Sépia (Filtro amarelado para descanso ocular).
  - Modo de Alto Contraste (Cores invertidas).
  - Tipografia de leitura rigorosamente em estilo Serif (ex: Georgia, Merriweather) para maior conforto visual.
- **Gerenciamento de Cotas:** Controle integrado de Downloads Offline em página dedicada, avisando quando limites são atingidos e oferecendo gestão fácil.
- **Modo Claro / Escuro:** O layout base adapta-se ao tema do sistema ou preferência do usuário.

## 🛠️ Stack Tecnológico

- **Front-end:** React + Vite
- **Estilização:** CSS Puro (Vanilla CSS) com variáveis semânticas.
- **Armazenamento Offline:** Dexie.js (para gestão eficiente de cotas e dados no IndexedDB).
- **Backend/Scraping:** Serverless Functions (Node.js + Cheerio) para contornar problemas de CORS e extrair hinos e lições de fontes terceiras (diretório `/api`).
- **PWA:** vite-plugin-pwa

## 🚀 Como Rodar Localmente (Desenvolvimento)

1. Clone o repositório:
   ```bash
   git clone https://github.com/disoliveiradso/Biblia360.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor local:
   ```bash
   npm run dev
   ```
4. O servidor geralmente estará rodando em `http://localhost:5173`.

## 🌐 Como Colocar Online (Deploy na Vercel)

Como este projeto utiliza Serverless Functions nativas (pasta `/api`), a melhor plataforma para colocá-lo no ar de forma totalmente gratuita e eficiente é a **Vercel**.

1. Crie uma conta na [Vercel](https://vercel.com/) com o seu GitHub.
2. No painel da Vercel, clique em **Add New -> Project**.
3. Importe o repositório **Biblia360**.
4. A Vercel detectará automaticamente que é um projeto Vite e configurará tudo sozinha. As Serverless Functions em `/api` também serão compiladas automaticamente.
5. Clique em **Deploy**! Em 1 minuto seu aplicativo estará online.

## 📝 Créditos e Fontes de Dados

Este projeto obtém as informações das seguintes fontes:
- **Bíblia:** API pública da BibliaAPI (https://bibliaapi.com.br/)
- **Harpa Cristã:** Scraping de informações de https://www.harpacrista.org/
- **EBD:** Scraping de informações de https://www.estudantesdabiblia.com.br/

> "O Bíblia360 funciona como um repositório e agregador de conteúdos sem fins lucrativos. Todas as informações disponibilizadas podem ser acessadas e obtidas no repositório oficial do projeto."
