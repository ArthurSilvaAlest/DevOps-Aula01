---
title: "Migration Plan – [Módulo/Sistema]"
version: "v1.0"
date: "YYYY-MM-DD"
author: "[Seu Nome]"
status: "draft | review | approved"
---

# Migration Plan – [Módulo/Sistema]

## 📋 Resumo Executivo
**De**: [Sistema/Tecnologia Origem]  
**Para**: [Sistema/Tecnologia Destino]  
**Duração**: [Estimativa]  
**Risco**: Alto/Médio/Baixo

---

## 🎯 Objetivos
- [Objetivo 1]
- [Objetivo 2]

---

## 📊 Fases de Migração

### Fase 1: Discovery & ACL
**Duração**: [X semanas]  
**Objetivos**:
- [ ] Inventário completo do sistema legado
- [ ] Mapeamento de dependências
- [ ] Criação de Anti-Corruption Layer
- [ ] Documentação de gaps

**Entregáveis**:
- Gap Analysis Document
- Architecture Decision Records
- Risk Register

---

### Fase 2: Shadow/Canary
**Duração**: [X semanas]  
**Objetivos**:
- [ ] Implementação do sistema moderno
- [ ] Testes com shadow traffic
- [ ] Rollout para 10% dos usuários
- [ ] Validação de métricas

**Entregáveis**:
- Sistema moderno funcional
- Relatório de performance comparativa
- Plano de rollback validado

---

### Fase 3: Cutover
**Duração**: [X semanas]  
**Objetivos**:
- [ ] Rollout para 100% dos usuários
- [ ] Monitoramento intensivo
- [ ] Ajustes de performance
- [ ] Documentação atualizada

**Entregáveis**:
- Sistema em produção
- Postmortem de lições aprendidas
- Métricas de sucesso validadas

---

### Fase 4: Decomission
**Duração**: [X semanas]  
**Objetivos**:
- [ ] Desativação gradual do sistema legado
- [ ] Backup final de dados
- [ ] Limpeza de infraestrutura
- [ ] Documentação de encerramento

**Entregáveis**:
- Sistema legado descomissionado
- Backup arquivado
- Redução de custos confirmada

---

## 🔄 Rollback Plan
| Cenário | Trigger | Ação | Responsável |
|---------|---------|------|-------------|
| Performance degradada | p95 > 500ms | Rollback para v1 | Tech Lead |
| Error rate alto | > 5% errors | Desativar feature flag | SRE |

---

## 👥 Responsabilidades
| Papel | Nome | Responsabilidade |
|-------|------|------------------|
| Project Lead | [Nome] | Coordenação geral |
| Tech Lead | [Nome] | Decisões técnicas |
| QA Lead | [Nome] | Validação de qualidade |

---

## 📊 Métricas de Sucesso
| Métrica | Baseline | Target |
|---------|----------|--------|
| Performance | [Valor] | [Valor] |
| Error Rate | [Valor] | < 0.1% |
| Uptime | [Valor] | ≥ 99.9% |

---

## ⚠️ Riscos
| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| [Risco 1] | Alta | Alto | [Plano] |

---

## 📚 Referências
- [Gap Analysis](gap-analysis-[modulo].md)
- [ADRs Relacionados](../architecture/adr/)
- [C4 Diagrams](../architecture/c4-model/)

