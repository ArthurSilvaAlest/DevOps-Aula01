---
title: "Catálogo de Arquivos – Objetivos e Responsabilidades"
version: "v1.0"
date: "2025-11-12"
author: "Equipe Alest EVC"
reviewer: "Arthur Silva"
status: "approved"
last_updated: "2025-11-12"
related_code: "docker-compose.yml, SiteWebAPI/*, SiteWebUI/*"
---

Raiz
- `docker-compose.yml`: orquestra UI, API e DB; volumes e portas.

SiteWebUI
- `Dockerfile`: build da UI e Nginx para servir estáticos.
- `nginx.conf`: proxy `/api/*` para `api:5000` e serve a SPA.
- `index.html`: shell da aplicação SPA.
- `src/main.jsx`: bootstrap da UI.
- `src/App.jsx`: tela principal e envio de leads.
- `vite.config.js`: config de build/dev.
- `package.json`: scripts e dependências da UI.

SiteWebAPI
- `Dockerfile`: build da API Node/Express.
- `src/server.js`: inicialização do servidor, middlewares, health.
- `src/routes/*`: rotas da API (ex.: `POST /api/leads`).
- `src/db/*`: conexão e queries PostgreSQL.
- `sql/001_create_leads.sql`: criação da tabela e índice por e-mail.
- `.env.example`: variáveis esperadas para execução.
- `package.json`: scripts e dependências da API.

CI/CD
- `.github/workflows/ci-develop.yml`: validações em `develop`.
- `.github/workflows/cd-main.yml`: publicação de imagens e deploy.