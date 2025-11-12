---
title: "Deploy Development - Docker Compose"
version: "v2.0"
date: "2025-01-15"
author: "DevOps Team"
status: "approved"
---

# Deploy Development - Docker Compose

## 🚀 Quick Start

```bash
# Clone repositório
git clone <repo-url>
cd SiteDev

# Start ambiente completo
docker compose up -d

# Verificar health
curl http://localhost:5007/api/health
curl http://localhost:8081/
```

**Endpoints**:
- UI: http://localhost:8081
- API: http://localhost:5007
- DB: localhost:5442 (PostgreSQL)

---

## 📋 Pré-requisitos

- Docker Desktop 24+ 
- Docker Compose 2.x
- 4GB RAM disponível
- Portas livres: 8081, 5007, 5442

---

## 🔧 Configuração

### Variáveis de Ambiente
```bash
# API (.env)
PORT=5000
CLIENT_URL=http://localhost:8081
PGHOST=db
PGPORT=5432
PGUSER=postgres
PGPASSWORD=senha123  # ⚠️ Dev apenas
PGDATABASE=siteweb
```

### Health Checks (Planned)
```yaml
api:
  healthcheck:
    test: ["CMD", "node", "-e", "require('http').get('http://localhost:5000/api/health')"]
    interval: 30s
    timeout: 3s
    retries: 3
```

---

## 🔍 Troubleshooting

### Erro: "Port already allocated"
```bash
# Verificar portas em uso
lsof -i :8081
lsof -i :5007

# Parar containers conflitantes
docker compose down
```

### Erro: "Connection refused" (API → DB)
```bash
# Verificar DB está healthy
docker compose ps
docker compose logs db

# Recriar volumes
docker compose down -v
docker compose up -d
```

---

## 📊 Observabilidade (Planned Q1 2025)

### Logs Estruturados
```bash
# Ver logs em tempo real
docker compose logs -f api

# Filtrar por serviço
docker compose logs --tail=100 api
```

### Métricas
- Prometheus: http://localhost:9090 (planned)
- Grafana: http://localhost:3000 (planned)

---

**Referências**:
- [Tech Spec](../architecture/steering/TECH_SPEC.md)
- [Governance](../architecture/steering/GOVERNANCE.md)

