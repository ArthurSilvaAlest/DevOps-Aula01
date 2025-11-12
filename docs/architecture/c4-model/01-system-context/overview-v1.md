---
title: "C4 – Nível 1: System Context"
version: "v1.0"
date: "2025-11-12"
author: "Equipe Alest EVC"
reviewer: "Arthur Silva"
status: "approved"
last_updated: "2025-11-12"
related_code: "docker-compose.yml"
---

```mermaid
flowchart LR
  user[Usuário] --- UI[SiteWeb UI\n(Nginx + React)]
  UI -- "/api/*" proxy --> API[SiteWeb API\n(Node/Express)]
  API --- DB[(PostgreSQL)]

  subgraph Ambiente Local
    UI
    API
    DB
  end

  note[Docker Hub\n(Imagens UI/API)]:::ext
  note -. pull .-> UI
  note -. pull .-> API

  classDef ext fill:#eef,stroke:#667;
```

Descrição
- Usuário acessa UI (porta 8081). Requests a `/api/*` são proxied para API.
- API persiste e consulta dados no PostgreSQL (porta 5442 no host).
- Imagens são atualizadas via pull do Docker Hub.