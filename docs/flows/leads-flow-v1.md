---
title: "Fluxo de Negócio – Cadastro de Leads"
version: "v1.0"
date: "2025-11-12"
author: "Equipe Alest EVC"
reviewer: "Arthur Silva"
status: "approved"
last_updated: "2025-11-12"
related_code: "SiteWebUI/src/App.jsx, SiteWebAPI/src/routes/*"
---

```mermaid
flowchart TD
  A[Usuário preenche formulário] --> B{Validações UI}
  B -->|OK| C[POST /api/leads]
  C --> D{Validações API}
  D -->|OK| E[Insert em leads]
  E --> F[201 Created]
  B -->|Erro| G[Mensagem amigável]
  D -->|Erro| H[Log técnico + 400/500]
```

Validações
- Nome obrigatório; e-mail em formato válido.
- Área informada; comentário opcional.
- E-mail único (índice) – tratar conflito com mensagem clara.