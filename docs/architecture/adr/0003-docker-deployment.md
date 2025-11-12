---
title: "ADR-0003: Docker Deployment Strategy"
date: "2025-01-15"
status: "Aprovada"
deciders: "Equipe Alest EVC, DevOps Lead"
consulted: "SRE, Security Team"
informed: "Time de Desenvolvimento"
---

# ADR 0003: Docker Deployment Strategy

## Contexto

Necessidade de estratégia de deployment que garanta:
- Ambiente consistente (dev, staging, prod)
- Isolamento de dependências
- Facilidade de rollback
- CI/CD automation
- Portabilidade entre cloud providers

---

## Decisão

**Docker Compose para desenvolvimento; Kubernetes planejado para produção.**

### Implementação Atual
- **Docker Compose**: Orquestração local de UI, API e PostgreSQL
- **Registry**: Docker Hub público (arthursilvaalest/*)
- **Base Images**: Alpine Linux (menor footprint)
- **Multi-stage builds**: UI (build + nginx runtime)

### Configuração
```yaml
services:
  ui:     image: arthursilvaalest/sitewebui:latest
    ports: ["8081:80"]
  api:
    image: arthursilvaalest/sitewebapi:latest
    ports: ["5007:5000"]
    environment: [PGHOST, PGUSER, ...]
  db:
    image: postgres:16-alpine
    volumes: [pgdata:/var/lib/postgresql/data]
```

---

## Consequências

### ✅ Positivas
- **Paridade dev/prod**: "Funciona na minha máquina" eliminado
- **Onboarding**: `docker compose up` para ambiente completo
- **Isolamento**: Dependências encapsuladas por serviço
- **Portabilidade**: Deploy em qualquer ambiente com Docker

### ⚠️ Negativas
- **Overhead**: Containers consomem mais recursos que processos nativos
  - **Mitigação**: Alpine images (redução 60% vs. imagens padrão)
- **Complexity**: Requer conhecimento Docker
  - **Mitigação**: Documentação completa + training
- **Security**: Vulnerabilidades em base images
  - **Mitigação**: Scan automático (Trivy, Snyk)

---

## Alternativas Consideradas

### 1. Bare Metal (VMs)
**Rejeitado**: Inconsistência entre ambientes; dificuldade em replicar setup

### 2. Serverless (AWS Lambda)
**Rejeitado**: Cold start penalty; over-engineering para MVP

### 3. Kubernetes desde início
**Rejeitado**: Complexidade desnecessária para MVP; implementar em Q2 2025

---

## Plano de Evolução

### Q1 2025 (MVP)
- [x] Docker Compose para desenvolvimento local
- [ ] GitHub Actions CI/CD
- [ ] Scan de vulnerabilidades em images

### Q2 2025 (Staging)
- [ ] Migrar para Kubernetes (EKS/AKS/GKE)
- [ ] Helm charts para deployment
- [ ] Horizontal Pod Autoscaling

### Q3 2025 (Produção)
- [ ] Multi-região deployment
- [ ] Service mesh (Istio/Linkerd)
- [ ] GitOps com ArgoCD

---

## Referências
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [ADR-0001: Stack Node.js](0001-stack-node-react.md)
- [Global Rules - Seção 24 (Kubernetes)](../../GLOBAL_RULES.md#24-kubernetes-produção)

---

**Status**: ✅ **APROVADA** - Docker Compose em uso; Kubernetes planejado.

