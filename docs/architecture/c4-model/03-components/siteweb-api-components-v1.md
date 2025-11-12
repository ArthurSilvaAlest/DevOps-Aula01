---
title: "C4 – Nível 3: Componentes (API)"
version: "v1.0"
date: "2025-11-12"
author: "Equipe Alest EVC"
reviewer: "Arthur Silva"
status: "approved"
last_updated: "2025-11-12"
related_code: "SiteWebAPI/src/server.js, SiteWebAPI/src/routes/*, SiteWebAPI/sql/001_create_leads.sql"
---

```mermaid
flowchart LR
  Server[server.js] --> Router[Rotas /api]
  Router --> Leads[/api/leads]
  Leads --> Validate[Validação básica]
  Leads --> Repo[DB Adapter]
  Repo --> SQL[leads (CREATE TABLE)]
```

Responsabilidades
- `server.js`: inicializa Express, middlewares (JSON), health.
- `routes`: define endpoints (`POST /api/leads`, etc.).
- `db adapter`: conexões e queries parametrizadas.
- `sql/001_create_leads.sql`: criação da tabela e índices.