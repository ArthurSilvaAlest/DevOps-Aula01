---
title: "Technical Specification - SiteWeb"
version: "v1.0"
date: "2025-01-15"
author: "Tech Lead - Equipe Alest"
reviewer: "Arquiteto de Solução"
status: "approved"
project: "SiteWeb - Lead Capture Platform"
stakeholders: ["Tech Lead", "Arquiteto", "Dev Team"]
---

# Technical Specification - SiteWeb

## 📋 Visão Geral Técnica

**Arquitetura**: 3-tier (UI + API + Database)  
**Stack**: Node.js 20 + React 19 + PostgreSQL 16  
**Deployment**: Docker Compose (dev), Kubernetes (prod planned)  
**CI/CD**: GitHub Actions (planned)

---

## 🏗️ Arquitetura

### High-Level Architecture
```
Browser → Nginx (8081) → React SPA
                      ↓ proxy /api/*
                   Express API (5007)
                      ↓ pg client
                PostgreSQL (5442)
```

### Referências Detalhadas
- [C4 System Context](/architecture/c4-model/01-system-context/overview-v2.md)
- [C4 Containers](/architecture/c4-model/02-containers/siteweb-containers-v2.md)
- [C4 API Components](/architecture/c4-model/03-components/siteweb-api-components-v2.md)
- [C4 UI Components](/architecture/c4-model/03-components/siteweb-ui-components-v2.md)

---

## 🔧 Especificações Técnicas

### Frontend (SiteWebUI)
**Framework**: React 19.2.0  
**Build Tool**: Vite 7.2.2  
**Runtime**: Nginx 1.27-alpine  
**Bundle Size**: ~150KB (gzipped)  

**Features**:
- Single Page Application (SPA)
- React Hooks para state management
- Client-side validation
- Responsive design (mobile-first)

**Performance Targets**:
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

### Backend (SiteWebAPI)
**Runtime**: Node.js 20.x LTS  
**Framework**: Express 4.19.2  
**Database Client**: pg 8.12.0  

**Endpoints**:
```
GET  /api/health  → Status check
POST /api/leads   → Create lead
```

**Validações**:
- Campos obrigatórios: nome, email, area
- Email format validation (regex)
- SQL injection protection (parameterized queries)

**Performance Targets**:
- API response time < 200ms (p95)
- Connection pool: 10 max connections

---

### Database (PostgreSQL)
**Version**: PostgreSQL 16-alpine  
**Schema**:
```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  area TEXT NOT NULL,
  comentario TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_leads_email ON leads (email);
```

**Backup Strategy**:
- Daily pg_dump (planned)
- Retention: 7 days local, 30 days remote

---

## 🔒 Segurança

### Implementado
- ✅ HTTPS (TLS 1.3)
- ✅ CORS configurado
- ✅ Parameterized SQL queries
- ✅ Input validation (client + server)

### Planejado
- 🚧 Rate limiting (100 req/15min)
- 🚧 CAPTCHA após 3 submissões
- 🚧 CSP headers
- 🚧 Secrets management (Vault)

---

## 📊 Observabilidade

### Atual
- ✅ Health check endpoint
- ✅ Console.log (development)

### Planejado (Q1 2025)
- 🚧 Winston structured logging
- 🚧 Prometheus metrics
- 🚧 OpenTelemetry tracing
- 🚧 Grafana dashboards

**Métricas Target**:
- RED: Rate, Errors, Duration
- SLO: 99.9% availability, < 200ms latency p95

---

## 🧪 Estratégia de Testes

### Planejado (Q1 2025)
- **Unit Tests**: Jest/Vitest → 80% coverage
- **Integration Tests**: Supertest → API endpoints
- **E2E Tests**: Playwright → Critical flows
- **Performance Tests**: k6 → Load/stress testing

---

## 🚀 Deploy Strategy

### MVP (Docker Compose)
```yaml
services:
  ui:   image: arthursilvaalest/sitewebui:latest
  api:  image: arthursilvaalest/sitewebapi:latest
  db:   image: postgres:16-alpine
```

**Commands**:
```bash
docker compose up -d    # Start
docker compose down     # Stop
docker compose logs -f  # Logs
```

### Produção (Kubernetes - Q2 2025)
- **HPA**: Auto-scaling baseado em CPU/Memory
- **Service Mesh**: Istio (considerando)
- **Ingress**: Nginx Ingress Controller
- **Secrets**: Sealed Secrets

---

## 🔄 CI/CD Pipeline (Planned)

```yaml
on: [push, pull_request]
jobs:
  lint → test → build → security-scan → deploy
```

**Quality Gates**:
- ✅ Lint pass (ESLint)
- ✅ Tests pass (80% coverage)
- ✅ Build success
- ✅ Security scan (Snyk/Trivy)
- ✅ No critical vulnerabilities

---

## 📈 Escalabilidade

### Current Capacity
- **Users**: ~100 simultâneos
- **Throughput**: 50 req/s
- **Database**: Single instance

### Scale Plan
| Fase | Users | Strategy |
|------|-------|----------|
| MVP (Q4 2024) | 100 | Single VM |
| Growth (Q1 2025) | 1K | API replicas (2-3) |
| Scale (Q2 2025) | 10K+ | Kubernetes HPA, CDN |

---

## 📚 Decisões Arquiteturais

Ver ADRs completos:
- [ADR-0001: Stack Node.js + React](../adr/0001-stack-node-react.md)
- [ADR-0002: PostgreSQL Database](../adr/0002-postgresql-database.md)
- [ADR-0003: Docker Deployment](../adr/0003-docker-deployment.md)

---

## 🤝 Dependências Externas

| Serviço | Status | Purpose |
|---------|--------|---------|
| Docker Hub | ✅ Ativo | Image registry |
| PostgreSQL | ✅ Ativo | Database |
| Email Service | 🚧 Planejado | Notifications |
| CRM | 🚧 Planejado | Lead sync |

---

## 📞 Contatos Técnicos

- **Tech Lead**: Arthur Silva
- **Arquiteto**: Equipe Alest EVC
- **DevOps**: [TBD]

---

**Aprovação**: ✅ Aprovado em 2025-01-15 por Arquiteto de Solução

