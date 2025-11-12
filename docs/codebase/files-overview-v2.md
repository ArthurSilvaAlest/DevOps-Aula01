---
title: "Catálogo de Arquivos – SiteWeb"
version: "v2.0"
date: "2025-01-15"
author: "Tech Lead"
status: "approved"
related_code: "docker-compose.yml, SiteWebAPI/*, SiteWebUI/*"
---

# Catálogo de Arquivos – Objetivos e Responsabilidades

## 📁 Estrutura Geral

```
/SiteDev/
├── docker-compose.yml          # Orquestração de containers
├── docs/                       # 📚 Documentação completa (este repositório)
├── SiteWebAPI/                 # Backend Node.js + Express
└── SiteWebUI/                  # Frontend React + Vite
```

---

## 🌐 SiteWebUI (Frontend)

### Configuração
| Arquivo | Propósito |
|---------|-----------|
| `package.json` | Dependências e scripts npm |
| `vite.config.js` | Configuração Vite (proxy API dev) |
| `eslint.config.js` | Regras de linting |
| `Dockerfile` | Multi-stage build (Vite + Nginx) |
| `nginx.conf` | Proxy /api → api:5000 |

### Código-Fonte
| Arquivo | Responsabilidade |
|---------|------------------|
| `index.html` | Shell da SPA |
| `src/main.jsx` | Bootstrap React |
| `src/App.jsx` | Componente principal + formulário |
| `src/App.css` | Estilos de componentes |
| `src/index.css` | Estilos globais + tema |

---

## ⚙️ SiteWebAPI (Backend)

### Configuração
| Arquivo | Propósito |
|---------|-----------|
| `package.json` | Dependências e scripts npm |
| `Dockerfile` | Build Node.js 20-alpine |
| `.env.example` | Template de variáveis de ambiente |

### Código-Fonte
| Arquivo | Responsabilidade |
|---------|------------------|
| `src/server.js` | Entry point, setup Express |
| `src/routes/index.js` | Agregador de rotas |
| `src/routes/health.js` | GET /api/health |
| `src/routes/leads.js` | POST /api/leads |
| `src/db/pool.js` | Connection pool PostgreSQL |

### Database
| Arquivo | Propósito |
|---------|-----------|
| `sql/001_create_leads.sql` | Init script (CREATE TABLE + INDEX) |

---

## 📚 Documentação (/docs/)

### Arquitetura
```
/architecture/
├── c4-model/
│   ├── 01-system-context/overview-v2.md
│   ├── 02-containers/siteweb-containers-v2.md
│   └── 03-components/
│       ├── siteweb-api-components-v2.md
│       └── siteweb-ui-components-v2.md
├── adr/
│   ├── 0001-stack-node-react.md
│   ├── 0002-postgresql-database.md
│   └── 0003-docker-deployment.md
└── steering/
    ├── PRD.md
    ├── TECH_SPEC.md
    └── GOVERNANCE.md
```

### Fluxos e Regras
```
/flows/
└── leads-flow-v2.md

/business-rules/
└── leads-v2.md
```

### Deploy e Templates
```
/deployment/
└── development-v2.md

/templates/
├── adr-template.md
├── gap-analysis-template.md
└── migration-plan-template.md

/codebase/
└── files-overview-v2.md  (este arquivo)
```

---

## 📊 Estatísticas do Projeto

### Backend
- **Total de Arquivos**: ~15
- **Linhas de Código**: ~300
- **Dependências npm**: 4 (production)
- **Rotas API**: 2 (`/health`, `/leads`)

### Frontend
- **Total de Arquivos**: ~10
- **Linhas de Código**: ~400
- **Dependências npm**: 2 (production)
- **Componentes React**: 1 principal + seções inline

### Documentação
- **Total de Arquivos**: 25+
- **C4 Diagrams**: 4 níveis completos
- **ADRs**: 3
- **Steering Docs**: 3 (PRD, Tech Spec, Governance)

---

## 🔄 Próximos Passos (Q1 2025)

### Código
- [ ] Migrar para TypeScript
- [ ] Adicionar testes (Jest/Vitest)
- [ ] Implementar Winston logging
- [ ] Adicionar React Query

### Documentação
- [ ] OpenAPI spec para API
- [ ] Runbooks operacionais
- [ ] Postmortems template
- [ ] Onboarding guide

---

**Última Atualização**: 2025-01-15 | **Mantido por**: Tech Lead

