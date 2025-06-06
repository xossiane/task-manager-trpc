# My Task Manager 🌈

Um gerenciador simples de tarefas construído com Next.js 15, usando TRPC para comunicação com a API e roteamento moderno do Next.js (App Router).

---

## Funcionalidades

- Listagem de tarefas com carregamento no servidor (SSR).
- Criação, edição e exclusão de tarefas com ações do Next.js Server Actions.
- Feedback visual para sucesso e erro nas operações.
- Redirecionamento com mensagens para indicar status das operações.
- Interface limpa e responsiva com Tailwind CSS.

---

## Tecnologias utilizadas

- [Next.js 15](https://nextjs.org) (App Router)
- [TRPC](https://trpc.io) para comunicação entre front-end e back-end
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com) para estilização
- TypeScript para tipagem estática

---

## Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
## Como rodar localmente

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn

3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev

4. Abra no navegador:[
   http://localhost:3000

## Como funciona o sistema
As páginas usam o app router do Next.js 15 com React Server Components para obter dados do servidor.

O TRPC fornece endpoints API fortemente tipados para manipular tarefas.

As ações de deletar tarefa são feitas com funções server actions ('use server') e redirecionam a página com query params para feedback visual.

O componente FeedbackMessage lê a query string para mostrar mensagens de sucesso ou erro.

O design usa Tailwind CSS para uma interface simples e responsiva.


