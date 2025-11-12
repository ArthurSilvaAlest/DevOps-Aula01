---
title: "Regras de Negócio – Leads"
version: "v1.0"
date: "2025-11-12"
author: "Equipe Alest EVC"
reviewer: "Arthur Silva"
status: "approved"
last_updated: "2025-11-12"
related_code: "SiteWebAPI/sql/001_create_leads.sql, SiteWebAPI/src/routes/*"
---

Entidades
- Lead: `id`, `nome`, `email`, `area`, `comentario`, `created_at`.

Regras
- Nome obrigatório; e-mail obrigatório e único (índice).
- Área obrigatória (livre: `qa`, `infra`, etc.).
- Comentário opcional; `created_at` default `now()`.

Erros & Mensagens
- Duplicidade de e-mail: 409/400 com mensagem clara.
- Erros técnicos: log estruturado; resposta genérica ao cliente.

Auditoria
- Todos os inserts têm `created_at`; avaliar adicionar `updated_at` se necessário.