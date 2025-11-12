---
title: "ADR-0002: PostgreSQL como Banco de Dados"
date: "2025-01-15"
status: "Aprovada"
deciders: "Equipe Alest EVC"
consulted: "DBA, Arquiteto de Dados"
informed: "Time de Desenvolvimento"
---

# ADR 0002: PostgreSQL como Banco de Dados

## Contexto

O sistema precisa de um banco de dados relacional para:
- Armazenar leads com integridade referencial
- Garantir ACID transactions
- Suportar queries complexas (futuro: analytics)
- Backup e restore confiáveis
- Compliance com LGPD/GDPR (auditoria, exclusão lógica)

### Requisitos
- **Volume inicial**: ~1K leads/mês
- **Crescimento esperado**: 10K+ leads/mês em 12 meses
- **Disponibilidade**: 99.9% uptime
- **Backup**: Daily automated + point-in-time recovery
- **Cost**: < $20/mês para MVP

---

## Decisão

**Escolhemos PostgreSQL 16 como banco de dados principal.**

### Configuração
- **Versão**: PostgreSQL 16-alpine (latest stable LTS)
- **Deployment**: Container Docker com volume persistente
- **Connection Pool**: 10 conexões (configurável)
- **Backup**: pg_dump diário (planejado)

### Rationale
1. **Open-source**: Zero licensing cost
2. **ACID compliance**: Transações confiáveis
3. **JSON support**: Flexibilidade para dados semi-estruturados (futuro)
4. **Performance**: Indexes, query planner eficiente
5. **Ecosystem**: ORMs maduros (Sequelize, TypeORM), clients estáveis (pg)
6. **Cloud-ready**: Managed services (RDS, Azure Database, Cloud SQL)

---

## Consequências

### ✅ Positivas
- **Confiabilidade**: MVCC garante leitura consistente
- **Extensibilidade**: PostGIS, pg_cron, full-text search
- **Comunidade**: Documentação rica, suporte ativo
- **Tooling**: pgAdmin, DBeaver, psql cli
- **Type system**: Rich data types (arrays, jsonb, uuid)

### ⚠️ Negativas
- **Vertical scaling**: Requer recursos significativos em grande escala
  - **Mitigação**: Read replicas, connection pooling (PgBouncer)
- **Operational complexity**: Tuning, vacuum, index maintenance
  - **Mitigação**: Managed services (RDS) para produção
- **Write scaling**: Single-master limita throughput de escrita
  - **Mitigação**: Suficiente para escala atual; sharding se necessário

---

## Alternativas Consideradas

### 1. MySQL 8
**Prós**: Popular, performance similar, managed services  
**Contras**: JSON support inferior, licenciamento Oracle  
**Rejeitado**: PostgreSQL tem features superiores sem vendor lock-in

### 2. MongoDB
**Prós**: Schema-less, horizontal scaling nativo  
**Contras**: ACID apenas em transações multi-documento (4.0+), over-engineering para dados estruturados  
**Rejeitado**: Leads são dados estruturados; PostgreSQL é mais simples

### 3. SQLite
**Prós**: Zero-config, arquivo único, perfeito para dev  
**Contras**: Single-writer, não suporta concorrência  
**Rejeitado**: Insuficiente para produção multi-user

---

## Validação

### Schema Atual
```sql
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  area TEXT NOT NULL,
  comentario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
```

### Performance Atual
- Insert latency: < 10ms (p95)
- Select by email (indexed): < 5ms
- Connection pool: 2-3 conexões ativas em média

---

## Plano de Evolução

### Q1 2025
- [x] Schema inicial com tabela leads
- [ ] Backup automático diário
- [ ] Monitoring (pg_stat_statements)

### Q2 2025
- [ ] Read replica para analytics
- [ ] Full-text search para comentários
- [ ] Soft delete para compliance LGPD

### Q3 2025
- [ ] Migrar para RDS/managed service
- [ ] Point-in-time recovery configurado
- [ ] Encryption at rest

---

## Referências
- [PostgreSQL 16 Release Notes](https://www.postgresql.org/docs/16/release-16.html)
- [ADR-0001: Stack Node.js + React](0001-stack-node-react.md)
- [Global Rules - Seção 30 (Banco de Dados)](../../GLOBAL_RULES.md#30-banco-de-dados-e-migrações)

---

**Status**: ✅ **APROVADA** - Em uso desde MVP.

