<div align="center">

# ⚡ Flowo Focus

**Gerenciamento de tarefas moderno, fluido e minimalista.**

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-State-orange?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat-square&logo=framer)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=flat-square&logo=vite)

</div>

---

## 📸 Preview

> Dark mode moderno com visualização Kanban em 3 colunas, filtros por categoria e prioridade, barra de progresso diária e drag-and-drop fluido.

---

## ✨ Funcionalidades

- **Kanban Board** — Visualização em 3 colunas (A Fazer, Em Andamento, Concluído) com drag-and-drop entre e dentro das colunas
- **List View** — Visualização em lista ordenada por prazo, agrupada por urgência
- **Criar / Editar / Excluir tarefas** — Modal completo com título, descrição, categoria, prioridade e prazo
- **Filtros em tempo real** — Filtre por categoria, prioridade e busca por texto
- **Indicador de progresso** — Barra mostrando o percentual de tarefas concluídas no dia
- **Persistência automática** — Dados salvos no `localStorage`, nada se perde ao fechar o navegador
- **Animações fluidas** — Transições e microinterações com Framer Motion em todas as interações principais
- **Totalmente responsivo** — Funciona em desktop e mobile

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript (strict mode) |
| Estilização | Tailwind CSS v3 |
| Estado global | Zustand com middleware `persist` |
| Animações | Framer Motion v11 |
| Drag & Drop | @hello-pangea/dnd |
| Ícones | lucide-react |
| Datas | date-fns |
| Build | Vite |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Ferreiraztx/flowo-focus.git

# Entre na pasta
cd flowo-focus

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/           # Componentes genéricos (Button, Badge, Modal, Input, ProgressBar)
│   ├── kanban/       # KanbanBoard, KanbanColumn, KanbanCard
│   ├── list/         # ListView, ListItem
│   ├── layout/       # Header, Sidebar
│   └── modals/       # TaskModal (criar e editar)
├── store/
│   ├── useTaskStore.ts   # Estado das tarefas com persistência
│   └── useUIStore.ts     # Estado da interface (filtros, modal, view mode)
├── types/
│   └── index.ts          # Tipagem estrita de tarefas, categorias e estados
├── hooks/
│   ├── useFilteredTasks.ts   # Lógica de filtro e progresso do dia
│   └── useDragAndDrop.ts     # Handler do drag-and-drop
├── utils/
│   └── dateUtils.ts      # Formatação e verificação de prazos
├── constants/
│   └── index.ts          # Cores, labels e tarefas de exemplo
└── App.tsx
```

---

## 🎨 Identidade Visual

O Flowo usa um dark mode de alta fidelidade com paleta customizada:

| Token | Cor | Uso |
|---|---|---|
| `background` | `#0A0A0F` | Fundo geral |
| `surface` | `#12121A` | Cards e painéis |
| `accent` | `#6C63FF` | Ações primárias e coluna "A Fazer" |
| `warning` | `#FFB347` | Coluna "Em Andamento" |
| `success` | `#4FFFB0` | Coluna "Concluído" |
| `danger` | `#FF6B6B` | Tarefas vencidas |

---

## 🗂️ Categorias e Prioridades

**Categorias:** Design · Dev · Marketing · Research · Pessoal · Outro

**Prioridades:** Alta · Média · Baixa

---

## 🔧 Scripts disponíveis

```bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Build de produção
npm run preview   # Preview do build local
npm run lint      # Verificação de lint
npm run typecheck # Verificação de tipos TypeScript
```

---

## 📄 Licença

MIT © [Matheus Ferreira](https://github.com/Ferreiraztx)

---

<div align="center">
  Feito com ⚡ e muito café
</div>