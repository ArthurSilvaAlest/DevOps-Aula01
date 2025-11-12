---
title: "Regras de Negócio – Leads"
version: "v2.0"
date: "2025-01-15"
author: "Product Owner"
status: "approved"
related_code: "SiteWebAPI/sql/001_create_leads.sql, SiteWebAPI/src/routes/leads.js"
---

# Regras de Negócio – Leads

## 📊 Entidade Lead

### Atributos
| Campo | Tipo | Obrigatório | Regra |
|-------|------|-------------|-------|
| id | SERIAL | Auto | Primary Key |
| nome | TEXT | ✅ | Mín 2 chars (planned) |
| email | TEXT | ✅ | Formato válido + único |
| area | TEXT | ✅ | Enum: desenvolvimento, devops, qa, infra, outro |
| comentario | TEXT | ❌ | Máx 500 chars (planned) |
| created_at | TIMESTAMPTZ | Auto | UTC timezone |

---

## ✅ Validações

### Email
- **Formato**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Normalização** (planned): Lowercase, trim
- **Unicidade**: Index único no banco

### Nome
- **Atual**: Obrigatório
- **Planned**: Mínimo 2 caracteres, máximo 100

### Área
- **Valores Permitidos**: 
  - `desenvolvimento`
  - `devops`
  - `qa`
  - `infra`
  - `outro`

---

## 🔒 Segurança

- ✅ SQL Injection: Queries parametrizadas
- ✅ XSS: React escapa automaticamente
- 🚧 Rate Limiting: 100 req/15min (planned)
- 🚧 CAPTCHA: Após 3 submissões rápidas (planned)

---

## 📈 Auditoria

- `created_at`: Timestamp de criação
- `updated_at`: Planned para rastreabilidade
- `deleted_at`: Soft delete para LGPD (planned)

---

**Referências**:
- [Fluxo de Leads](../flows/leads-flow-v2.md)
- [PRD](../architecture/steering/PRD.md)

