---
title: "C4 – Nível 3: Componentes (UI)"
version: "v1.0"
date: "2025-11-12"
author: "Equipe Alest EVC"
reviewer: "Arthur Silva"
status: "approved"
last_updated: "2025-11-12"
related_code: "SiteWebUI/src/*, SiteWebUI/nginx.conf"
---

```mermaid
flowchart LR
  Main[main.jsx] --> App[App.jsx]
  App --> Form[Formulário de Lead]
  Form --> Fetch[fetch POST /api/leads]
  UIProxy[nginx.conf proxy /api] --> API[(siteweb_api)]
```

Responsabilidades
- `index.html`: container da SPA.
- `main.jsx`: bootstrap da aplicação.
- `App.jsx`: UI principal e handlers do formulário.
- `nginx.conf`: serve estáticos e proxy `/api/*` para a API.