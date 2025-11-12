---
title: "Deploy Local – Docker Compose"
version: "v1.0"
date: "2025-11-12"
author: "Equipe Alest EVC"
reviewer: "Arthur Silva"
status: "approved"
last_updated: "2025-11-12"
related_code: "docker-compose.yml"
---

Pré-requisitos
- Docker Desktop e Docker Compose.
- Acesso às imagens no Docker Hub.

Comandos
```bash
docker compose pull
docker compose up -d
```

Endpoints
- UI: `http://localhost:8081/`
- API Health: `http://localhost:5007/api/health`

Banco (init automático)
- Volume: `./SiteWebAPI/sql -> /docker-entrypoint-initdb.d` (read-only)
- Reset volumes: `docker compose down -v && docker compose up -d`

Configuração
- DB host: `db`, porta interna `5432` (host `5442`).
- API porta interna `5000` (host `5007`).
- UI porta `8081` com proxy `/api`.

Troubleshooting
- 404 no `/api`: verificar `nginx.conf` montado e container `api` healthy.
- 500 na API: confirmar tabela `leads` criada e conexão com DB.