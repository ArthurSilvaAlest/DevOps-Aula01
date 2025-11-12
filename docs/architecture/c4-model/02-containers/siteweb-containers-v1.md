---
title: "C4 – Nível 2: Contêineres (SiteWeb)"
version: "v1.0"
date: "2025-11-12"
author: "Equipe Alest EVC"
reviewer: "Arthur Silva"
status: "approved"
last_updated: "2025-11-12"
related_code: "docker-compose.yml, SiteWebUI/nginx.conf"
---

```mermaid
flowchart TB
  subgraph UI[siteweb_ui]
    Nginx[Nginx static + proxy /api]
    React[App (Vite/React)]
  end

  subgraph API[siteweb_api]
    Express[Express server.js]
    Routes[Rotas /api/leads]
    DBClient[Cliente PG]
  end

  subgraph DB[siteweb_db]
    Postgres[(PostgreSQL)]
    Init[Init scripts /docker-entrypoint-initdb.d]
  end

  React --> Nginx
  Nginx -->|proxy :80→:5000| Express
  Express --> DBClient --> Postgres
  Init -. primeira execução .-> Postgres
```

Portas & Rede
- UI: `8081->80` (host→container)
- API: `5007->5000` (debug), rede interna para Nginx
- DB: `5442->5432` (host→container)