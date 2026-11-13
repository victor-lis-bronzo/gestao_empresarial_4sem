# Mini-mundo do Victor — HardDex em 26/10/2026

Estado hipotético do projeto **hoje**, 14 dias depois do corte (12/10), do ponto de vista do Líder Técnico/Infra. Serve para responder qualquer pergunta sem travar.

**Legenda (leia antes de usar):**
- **[RELATÓRIO]** = dado oficial dos slides, do guia ou dos `.docx`. Pode afirmar como fato.
- **[REPO]** = existe no código real do GitHub (`ammvy`). Pode afirmar como fato técnico, mas lembre que o relatório é a "verdade" da apresentação.
- **[PROJEÇÃO]** = inventado aqui, coerente com o relatório. Só afirme com segurança se o grupo concordar. Se perguntarem "de onde vem esse número?", responda "estimativa de planejamento", nunca "medimos".
- **[A VERIFICAR]** = confirme com o grupo/repo antes de falar.

---

## 0. Antes de tudo: 5 correções no material oficial

| # | Onde | Problema | O que falar |
|---|------|----------|-------------|
| 1 | Guia, Fraqueza 3 | Diz "backup diário externo automatizado" e "recriar em <30 min" como fato. O slide 4 mostra **A4 (Victor, 13/11): monitoramento externo + backup com teste de restauração** ainda aberta. O que falta **não é** fazer backup nem testá-lo, e sim **automatizar** a verificação. | "O backup diário já roda e é validado manualmente; a **Ação A4** (13/11) **automatiza** essa validação com um smoke test. Não prometemos '30 min' sem medir." |
| 2 | Guia/roteiro | A4 é sua e não está na fala. Guia lista A1–A6; slide tem **A1–A7**. | Incluir A4 na fala (ver seção 5). |
| 3 | Guia, Ana | Busca semântica é **RF-005**, não RF-002 (RF-002 = Perfil/TDU). | Se citarem, use RF-005. Avise a Ana. |
| 4 | Guia, Node | "Descontinuação prematura" é vago. O slide diz **"Node 25 sem suporte desde 01/06/2026"**. | Releases ímpares do Node nunca viram LTS e saem de suporte em ~6 meses. Por isso migrar para LTS (par). |
| 5 | Roteiro | Escrito com corte 12/10 ("v0.4.0 na próxima semana"). Hoje já passou. | Falar no passado: v0.4.0 fechou a Sprint 4 (seção 2). |

---

## 1. O mundo em uma página

### Quem é quem (Líder Técnico = você)
- **Mirela** gerente · **Yago** front/comunicação · **Victor** líder técnico/infra · **Ana** back/dados · **Mariana** BD/QA. [RELATÓRIO]
- No código real, seus papéis técnicos: integração front+back, monorepo, padrões, infra de build/deploy. [REPO]

### Números-âncora [RELATÓRIO]
| Item | Valor |
|---|---|
| Escopo | RF-001 a RF-010, entrega 07/12/2027, 3 releases (R1 06/12/2026 v1.0.0, R2 27/06/2027 v1.1.0, R3 07/12/2027 v1.2.0) |
| BAC | 2.400 h × R$ 40 = **R$ 96.000** |
| Reserva de contingência | R$ 9.600 (10%) intacta |
| Corte 12/10 | 1.386 h = R$ 55.440 = 57,75% (VP = VA = CR), IDP = IDC = 1,00 |
| S4 no corte | 186/400 h = 46,5% · Sprint 4 em 72% (36/50 h) |
| Infra | R$ 160 de R$ 1.040 orçados |
| Arquitetura | BL-ARQ 1.0 congelada em 02/10 (ADR-001 a 004); HTTPS no ar desde 02/10 |
| Versões | v0.3.0 (tag) → v0.4.0-alpha.1 (09/10) → beta 27/11 → rc 30/11 → GA v1.0.0 06/12 |
| Risco com você | R3 (VPS única), AT-3/R5 (Node), Ações A3 (30/10) e A4 (13/11) |

### Linha do tempo até hoje e daqui para frente
```
02/10  BL-ARQ 1.0 + ADR-001..004 aprovados · HTTPS (Let's Encrypt) no staging        [RELATÓRIO]
09/10  deploy v0.4.0-alpha.1                                                        [RELATÓRIO]
12/10  CORTE do status report · Sprint 4 em 72%                                    [RELATÓRIO]
16/10  Sprint 4 fecha: login Google + controle Admin/Editor · tag v0.4.0            [RELATÓRIO prazo / PROJEÇÃO que cumpriu]
19/10  Sprint 5 começa: spike de busca/ADR-005, CRUD specs e mídias, Node LTS + CI [RELATÓRIO]
26/10  HOJE · Sprint 5 na 2ª semana                                                 [PROJEÇÃO]
30/10  A1 (spike/ADR-005, Ana) e A3 (Node LTS, Victor) vencem · fecha Sprint 5      [RELATÓRIO]
13/11  A2 (catálogo), A4 (monitoramento + restauração, Victor), A5 (LGPD)           [RELATÓRIO]
27/11  v1.0.0-beta.1 · 30/11 v1.0.0-rc.1 · 06/12 GA v1.0.0 (Release R1)             [RELATÓRIO]
```

---

## 2. Estado projetado de hoje (26/10) — seu território

### 2.1 Versionamento e Git [PROJEÇÃO sobre datas do RELATÓRIO]
- Tag **v0.4.0** publicada ~16/10 ao fechar a Sprint 4 (login Google + Admin/Editor).
- Hoje: `develop` na linha **0.5.0-dev** (Sprint 5). Próxima tag prevista **v0.5.0 em 30/10**; depois v0.6.0 (~13/11), `v1.0.0-beta.1` (27/11), `rc.1` (30/11), `v1.0.0` (06/12).
- Fluxo: `feature/*` → Pull Request com revisão de um par → CI verde → `develop` (publica em **staging**) → `main` (GA/produção). Commits em formato Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). [REPO: guia de commits semânticos]
- Ritmo estimado: ~4–6 PRs/semana, 1–2 branches `feature/` por dupla. [PROJEÇÃO]
- Nada direto na `main`. Se perguntarem "e hotfix?": branch `hotfix/*` → PR → patch (`0.x.y+1`), mesma regra de revisão.

### 2.2 Stack e arquitetura (BL-ARQ 1.0) [RELATÓRIO + REPO]
- Front: **Next.js + React** (App Router; rotas `/compare`, `/quiz`, `/profile`, `/admin/*`, `/login`, `/signup`). [REPO]
- Back: **Fastify + Node.js**, camadas **Routes → Controllers → Services → DAO**, validação com Zod, documentação Swagger em `/docs`. [REPO]
- Banco: **MySQL 8 + Prisma**. [RELATÓRIO]
- Monorepo **pnpm workspaces** (+ Turborepo para build). [REPO]
- Infra: **Docker Compose** + **NGINX** (proxy reverso, "porta de entrada segura") + **Let's Encrypt** com renovação automática (certbot em laço de ~12 h). [RELATÓRIO + REPO]
- Decisões registradas: ADR-001 a ADR-004 (aprovadas, 02/10). **ADR-005 (busca)** sai até 30/10 com a Ana. [RELATÓRIO]
  - Sugestão de conteúdo dos 4 ADRs, para não travar se perguntarem [PROJEÇÃO]: 001 front (Next.js), 002 back (Fastify), 003 banco/ORM (MySQL + Prisma), 004 infra/deploy (Docker + NGINX + VPS).

### 2.3 Ação A3 — Node.js LTS (prazo 30/10) [RELATÓRIO prazo; resto PROJEÇÃO]
- Problema: Node 25 sem suporte desde 01/06/2026 (R5: prob. 70%, impacto moderado → **criticidade média**).
- Plano: migrar para a linha **LTS (Node 24)**, fixar versões com **lockfile** (`pnpm-lock.yaml`) e `engines` no `package.json`, imagem Docker `node:24-alpine`, CI roda na mesma versão.
- Estado hoje: migração em branch própria, CI passando; falta só validar compatibilidade Prisma/TypeScript em staging e fechar até 30/10. [PROJEÇÃO — confirme com o repo real antes de dizer "já migrei"]
- Contingência (R5): manter o staging fechado ao público até a migração fechar. [RELATÓRIO]

### 2.4 Ação A4 — monitoramento externo + backup com teste de restauração (prazo 13/11) [RELATÓRIO prazo; resto PROJEÇÃO]
- **Já existe:** reinício automático de contêineres (`restart: unless-stopped`), backup diário do MySQL (dump agendado) com cópia fora da VPS, e **validação manual** do backup (restauração feita à mão por você). [informado pelo Victor]
- **Falta (por isso A4 está aberta):** (a) **smoke test automático do backup**: um job que pega o dump mais recente, restaura num MySQL descartável (contêiner efêmero) e confere que é utilizável; (b) **monitoramento externo** de disponibilidade com alerta.
- **Desenho do smoke test (para explicar se perguntarem):**
  1. sobe um `mysql:8` temporário;
  2. importa o último dump;
  3. checa: importação sem erro, tabelas esperadas existem (ex.: `users`, `products`, `manufacturers`), contagem de linhas > 0 e uma query simples responde;
  4. grava o tempo gasto (isso vira o **RTO medido**);
  5. falhou → o pipeline fica vermelho e alerta; passou → registra sucesso.
- **Onde roda:** rótulo "CI" é válido, mas o ideal é um **job agendado** (diário, logo após o backup), não por PR: o PR não gera o backup real da VPS. Para a banca: "é um pipeline de verificação, mesma lógica do CI: automatiza e falha de forma visível."
- **Critério de pronto (DoD da A4):** smoke test rodando todo dia, última execução verde, tempo de restauração registrado, alerta testado forçando uma falha. [PROJEÇÃO]
- Dica: antes da apresentação, rode a restauração manual cronometrando. O tempo medido vira o "RTO observado" e substitui qualquer chute.

### 2.4B O que está dentro da v0.4.0-alpha.1 (tag/deploy de 09/10)
**Regra:** alpha = funcionalidade incompleta, uso interno, no staging. Sobe o MINOR (0.3.0 → 0.4.0) porque entrou funcionalidade nova; leva `-alpha.1` porque a Sprint 4 ainda estava em 72% no corte (12/10) e fecha em 16/10 com a v0.4.0.

**Dentro (feito até 09/10):**
- **Infra:** staging atrás de NGINX com HTTPS (Let's Encrypt), no ar desde 02/10; Docker Compose sobe os serviços. [RELATÓRIO]
- **Autenticação (RF-001):** cadastro e login por e-mail, com confirmação de e-mail; layout responsivo. [RELATÓRIO]
- **OAuth Google:** **configurado** (provedor e credenciais), ainda sem fluxo completo validado. [RELATÓRIO: "configuração do login Google"; fecha na Sprint 4]
- **Back-end:** API CRUD de **fabricantes e modelos** (camadas Routes → Controllers → Services → DAO, validação, Swagger). [RELATÓRIO + REPO]
- **Admin:** telas administrativas de fabricantes/modelos (RF-009 em parte). [RELATÓRIO]
- **Dados:** regras de especificações por categoria no banco; **dicionário de dados (lote 1, 20 termos)** e **catálogo (lote 2)**. [RELATÓRIO]
- **Qualidade/processo:** ADR-001..004 aprovados; pipeline de CI no PR; migrações Prisma aplicadas no staging. [RELATÓRIO + PROJEÇÃO]
- **Entregáveis da tag:** tag anotada em commit de `develop`, deploy no staging, nota de versão (changelog). [PROJEÇÃO]

**Fora (entra depois, por isso é alpha):**
- Login Google **completo** e **controle de acesso Admin/Editor** (fecham a Sprint 4 → **v0.4.0**, 16/10). [RELATÓRIO]
- Busca em linguagem simples (RF-005; spike/ADR-005 até 30/10) e CRUD de especificações e mídias (Sprint 5). [RELATÓRIO]
- Catálogo público, dicionário completo, backup automatizado/smoke test (A4), checklist LGPD (novembro). [RELATÓRIO]
- Migração para Node LTS e CI endurecido (A3, 30/10). [RELATÓRIO]

**Frase para a banca:** "A alpha.1 entregou a base: ambiente seguro, autenticação por e-mail, API e telas administrativas de fabricantes e modelos, e a primeira carga de dados. Login Google completo e controle de acesso ficaram para fechar a Sprint 4 na v0.4.0."

**Se perguntarem "por que não é 0.4.0 direto?":** "Porque o critério de pronto da Sprint 4 ainda não estava cumprido; pré-release sinaliza que não é estável e permite validar no staging sem prometer compatibilidade."

### 2.5 Certificado e domínio [REPO]
- Let's Encrypt com renovação automática. Risco prático: renovação falhar silenciosamente → coberto pelo monitoramento externo da A4 (alerta de expiração).

### 2.6 EVM projetado para hoje [PROJEÇÃO — não afirme como medido]
- 16/10: Sprint 4 completa (50/50 h) → 1.400 h = 58,3%.
- 26/10: ~metade da Sprint 5 (~25 h) → **~1.425 h ≈ R$ 57.000 ≈ 59,4%**, mantendo IDP/IDC ≈ 1,00.
- Se perguntarem números de hoje: "O relatório oficial é de 12/10 (R$ 55.440). Hoje, por linearidade das sprints, estamos perto de 1.425 h; o número auditado sai no próximo corte."

### 2.7 Custo de infra [PROJEÇÃO]
- R$ 160 até o corte; +R$ 10–20 por mês de VPS/domínio → ~R$ 170–180 hoje, bem abaixo do teto de R$ 1.040.

---

## 3. Conceitos de gestão ↔ o que você fez (pense assim ao responder)

| Conceito (aula) | Aplicação sua | Frase curta |
|---|---|---|
| **Baseline / linha de base** | BL-ARQ 1.0 congelada em 02/10 com ADR-001..004 | "Congelamos a arquitetura; mudar exige novo ADR e passa por controle de mudança." |
| **Gerência de Configuração** | Git, monorepo, SemVer, PR, CI | "Todo artefato versionado e rastreável; ninguém altera a main direto." |
| **Controle de mudanças (Anexo A)** | Pedido de app mobile/login Apple = Solicitação de Mudança | "Calculamos horas e verba; o sponsor decide ampliar ou cortar equivalente." |
| **Big Bang Merge (anti-pattern)** | Code-Promotion branches | "Integração pequena e frequente; PRs curtos." |
| **Release / ciclo de vida** | alpha → beta → rc → GA | "Cada estágio tem critério de entrada; GA só com os 9 critérios de aceite." |
| **DoD / critério de aceite** | CI verde + par revisou + homologado no staging | "Só vira Valor Agregado depois disso." |
| **EVM** | VA creditado por entrega aceita | "Sem PR aprovado e staging, não conta hora." |
| **Risco (PMBOK 8, 5x5)** | R3 (30% × impacto alto), R5 (70% × moderado) | "Probabilidade × impacto = criticidade; dono único e prazo." |
| **Comunicação (RACI do `plano_de_entrega.jpeg`)** | Líder Técnico = Equipe Dev: A/R no daily, R na review | "Eu respondo pela entrega técnica; relatório executivo é da Mirela." |
| **Custo** | Infra R$ 160/1.040 dentro do BAC | "Infra é item pequeno do BAC; mão de obra domina." |

---

## 4. Glossário em linguagem de negócio
- **Proxy reverso (NGINX):** "a porta de entrada segura": recebe o tráfego, aplica HTTPS e encaminha para a aplicação.
- **HTTPS / Let's Encrypt:** cadeado do navegador; certificado gratuito com renovação automática.
- **Docker Compose:** "receita" que sobe todos os serviços iguais em qualquer máquina.
- **Monorepo:** um repositório só para front e back; um PR pode alterar os dois de forma coerente.
- **ADR:** registro curto de uma decisão técnica (contexto, decisão, consequências).
- **SemVer:** `MAJOR.MINOR.PATCH`. MAJOR quebra compatibilidade, MINOR adiciona funcionalidade compatível, PATCH corrige bug. Sufixos de pré-release: `alpha < beta < rc < versão final`.
- **LTS:** versão com suporte longo (números pares do Node). **Lockfile:** trava as versões exatas das dependências.
- **Spike:** experimento curto com prazo para decidir uma questão técnica (A1, busca).
- **CI:** pipeline que roda build e testes a cada PR.
- **RTO/RPO:** quanto tempo para voltar (RTO) e quanto dado podemos perder (RPO). Com backup diário, RPO ≈ até 24 h.
- **Staging:** ambiente de homologação com HTTPS, igual à produção, onde se valida antes do GA.

---

## 4B. Glossário de gestão (PMBOK / EVM) — o "dicionário do relatório"

O relatório usa as siglas do PMBOK em português, mas o professor também pode falar em inglês. Sempre: **sigla PT / sigla EN**.

### A ideia em 20 segundos
EVM (Gerenciamento do Valor Agregado) responde a 3 perguntas com 3 números:
- **O que eu planejei fazer até hoje?** → **VP**
- **O que eu realmente fiz até hoje?** → **VA**
- **Quanto eu realmente gastei até hoje?** → **CR**

Tudo o mais (índices, variações, previsões) é comparação entre esses 3, medida em horas ou em reais (aqui: **R$ 40/hora**, então 1 h = R$ 40).

### Os 3 números base + o orçamento total
| Sigla PT (EN) | Nome | Significado simples | Valor no HardDex (corte 12/10) |
|---|---|---|---|
| **BAC** / ONT (BAC) | Orçamento no Término | Orçamento **total** do projeto, aprovado na linha de base. | 2.400 h × R$ 40 = **R$ 96.000** |
| **VP** (PV) | Valor Planejado | Quanto de trabalho **deveria** estar pronto até a data, segundo o cronograma. | 1.386 h = **R$ 55.440** |
| **VA** (EV) | Valor Agregado | Valor do trabalho **realmente concluído** (aceito) até a data. | 1.386 h = **R$ 55.440** |
| **CR** (AC) | Custo Real | Quanto **realmente gastamos** para entregar isso. | 1.386 h = **R$ 55.440** |

Dica de memória: **VP = plano, VA = entregue, CR = gasto**.
No nosso caso o VA só conta com PR aprovado + homologado no staging (regra de aceite).

### Variações (diferenças, em R$ ou horas)
| Sigla PT (EN) | Fórmula | Leitura | HardDex |
|---|---|---|---|
| **VPr** (SV) Variação de Prazo | VA − VP | Positivo = adiantado · negativo = atrasado · 0 = no prazo | 55.440 − 55.440 = **0** |
| **VC** (CV) Variação de Custo | VA − CR | Positivo = economia · negativo = estouro · 0 = no orçamento | 55.440 − 55.440 = **0** |

### Índices (razões; o "1,00" que a Mirela cita)
| Sigla PT (EN) | Fórmula | Leitura | HardDex |
|---|---|---|---|
| **IDP** (SPI) Índice de Desempenho de Prazo | VA ÷ VP | **> 1** adiantado · **= 1** no prazo · **< 1** atrasado. Ex.: 0,90 = produzindo 90% do planejado. | 1,00 |
| **IDC** (CPI) Índice de Desempenho de Custo | VA ÷ CR | **> 1** gastando menos que o valor entregue · **= 1** no orçamento · **< 1** gastando demais. Ex.: 0,90 = cada R$ 1 gasto gera R$ 0,90 de valor. | 1,00 |

Por que "1,00 exato" levanta suspeita: no mundo real quase nunca dá exato. A resposta preparada é: o VA só entra com aceite; o esforço é limitado a 10 h/semana por pessoa; e o relatório é auditável por commits.

### Previsões (como o projeto termina)
| Sigla PT (EN) | Fórmula usada | Significado | HardDex |
|---|---|---|---|
| **EPT** (ETC) Estimativa para Terminar | BAC − VA (quando o ritmo atual se mantém, IDC = 1) | Quanto **ainda vai custar** para acabar. | 96.000 − 55.440 = **R$ 40.560** (= **1.014 h**) |
| **ENT** (EAC) Estimativa no Término | CR + EPT | Custo **total previsto** no fim. | 55.440 + 40.560 = **R$ 96.000** (= BAC) |
| **IDPT** (TCPI) Índice de Desempenho para o Término | (BAC − VA) ÷ (BAC − CR) | Desempenho **necessário daqui para frente** para fechar no orçamento. **> 1** = precisa melhorar · **= 1** basta manter o ritmo · **< 1** sobra folga. | 40.560 ÷ 40.560 = **1,00** |
| **Avanço (%)** | VA ÷ BAC | Quanto do projeto já foi entregue. | 1.386 ÷ 2.400 = **57,75%** |

Frase para guardar: "IDPT = 1,00 significa que **não precisamos acelerar nem consumir a reserva** para terminar; basta manter o ritmo".

### Reserva e orçamento
- **Reserva de contingência (R$ 9.600 = 10% do BAC):** dinheiro separado **fora do BAC** para riscos **identificados** (ex.: R3, R5). Só é gasta com ocorrência do risco e com aprovação. "100% intacta" = nenhum risco ocorreu a ponto de consumi-la.
- **Linha de base (baseline):** versão **aprovada e congelada** do escopo, cronograma e custo (e aqui, da arquitetura: **BL-ARQ**). Mudar exige controle de mudança. Outras do projeto: BL-REQ (requisitos), BL-PLAN (plano).
- **Custo de infra R$ 160 de R$ 1.040:** parte do orçamento é infraestrutura (VPS, domínio); o BAC de R$ 96.000 é só **mão de obra**.

### Escopo e planejamento
| Termo | Significa | No HardDex |
|---|---|---|
| **PMBOK** | Guia do PMI com as boas práticas de gestão de projetos (aqui, 8ª edição). | Base "preditiva" (planejar antes). |
| **Scrum / Sprint** | Método ágil; **sprint** = ciclo curto de entrega. | Sprints quinzenais de **50 h**. |
| **Modelo híbrido** | PMBOK (visão macro, orçamento, riscos) + Scrum (execução). | "Rigor do PMBOK com velocidade do Scrum". |
| **Escopo** | O que **será** entregue. | RF-001 a RF-010. |
| **Fora de escopo** | O que foi **deliberadamente excluído**. | App mobile, pagamentos/carrinho, push, login Apple. |
| **Scope creep** | Escopo crescendo sem controle (e sem ajuste de prazo/custo). | O que evitamos com controle de mudança. |
| **SMART** | Meta **E**specífica, **M**ensurável, **A**tingível, **R**elevante, com **T**empo. | Plataforma em produção até 07/12/2027, 2.400 h, R$ 96.000. |
| **EAP** (WBS) | Estrutura Analítica do Projeto: quebra do escopo em pacotes de trabalho. | S1 a S6 de 400 h cada. |
| **Gantt** | Gráfico de cronograma (barras no tempo). | Slide 2 e 3. |
| **Marco (milestone)** | Evento de duração zero que marca uma entrega. | BL-ARQ, Beta, R1. |
| **Release** | Entrega publicada de uma versão do produto. | R1 (06/12/2026), R2 (27/06/2027), R3 (07/12/2027). |
| **GA** | *General Availability*: versão estável, disponível a todos. | v1.0.0 em 06/12/2026. |
| **Solicitação de Mudança (CR*)** | Pedido formal para alterar escopo/prazo/custo; analisa impacto e o **sponsor** decide. (*CR em inglês = Change Request; **não** confundir com CR = Custo Real.) | Anexo A do relatório. |
| **Sponsor / patrocinador** | Quem financia e aprova mudanças. | No contexto da disciplina, o professor/avaliador faz esse papel. |
| **Stakeholders** | Todos os interessados no projeto. | Equipe, professor, usuários. |
| **DoD** (*Definition of Done*) | Critério objetivo de "pronto". | CI verde + par revisou + homologado; **9 critérios** para aceitar a R1. |
| **Termo de aceite** | Documento formal em que o cliente aceita a entrega. | Release R1. |

### Riscos
| Termo | Significa | No HardDex |
|---|---|---|
| **Risco** | Evento incerto que, se ocorrer, afeta o projeto (para pior ou melhor). | R1 a R6. |
| **Causa → Evento → Consequência** | Forma de escrever um risco: "Por causa de X, pode ocorrer Y, resultando em Z". | Padrão do relatório. |
| **Probabilidade × Impacto** | Dois eixos de avaliação. | R3: 30% × alto · R5: 70% × moderado. |
| **Matriz 5x5** | Grade 5 níveis de probabilidade × 5 de impacto; o cruzamento dá a **criticidade** (baixa/média/alta). | Nenhum risco "Alto". |
| **Criticidade** | Gravidade final do risco. | R3 e R5 = média. |
| **Dono do risco** | Pessoa responsável por monitorar e agir. | Um por risco. |
| **Mitigação** | Ação para **reduzir** probabilidade ou impacto antes de ocorrer. | Backup, migração Node LTS. |
| **Contingência (plano)** | O que fazer **se o risco ocorrer**. | Staging fechado ao público (R5). |
| **Ponto de atenção (AT)** | Item ainda não crítico, mas monitorado. | AT-1, AT-2, AT-3. |
| **Ponto crítico** | Problema grave que exige decisão imediata. | Nenhum no período. |
| **Spike** | Experimento curto para reduzir incerteza técnica. | A1 (busca). |

### Comunicação e governança
| Termo | Significa | No HardDex |
|---|---|---|
| **6W2H** (5W2H) | Plano de ação: *What, Why, Where, When, Who, How, How much* (+ *Which* na versão 6W). | Governança de reuniões e ações. |
| **RACI** | Quem é **R**esponsável, **A**provador, **C**onsultado, **I**nformado. | Matriz do `plano_de_entrega.jpeg` (A/R, C, I). |
| **GP / SM / PO** | Gerente de Projeto / *Scrum Master* / *Product Owner*. | Mirela = GP. |
| **Daily Scrum** | Alinhamento diário rápido. | Assíncrono via Discord. |
| **Sprint Review / Retrospectiva** | Demonstra o entregue / melhora o processo. | Cerimônias limitadas a 2 h. |
| **Ruído (comunicação)** | Tudo que distorce a mensagem entre emissor e receptor. | Problema que o HardDex resolve para o usuário **e** que a gestão resolve para a equipe. |
| **KPI / CSAT / SLA** | Indicador-chave / satisfação do cliente / prazo-padrão de atendimento. | Colunas de métricas do `plano_de_entrega.jpeg`. |
| **Status Report** | Relatório periódico de situação. | RS-HDX-2026-10. |
| **Semáforo (verde/amarelo/vermelho)** | Resumo visual da saúde do projeto. | **Verde**. |

### Produto e requisitos
| Sigla | Significa |
|---|---|
| **RF** | Requisito Funcional (o que o sistema **faz**). RF-001 a RF-010. |
| **RNF** | Requisito Não Funcional (**como** deve ser: segurança, disponibilidade...). |
| **RGN** | Regra de Negócio. |
| **TDU** | Tipo de Uso: perfil do usuário (estudante, gamer, trabalho...). Núcleo do produto. |
| **Afiliados** | Modelo de receita: redirecionar a compra ao varejista e ganhar comissão. |
| **MVP** | Versão mínima viável do produto. |
| **LGPD** | Lei Geral de Proteção de Dados. |
| **OAuth** | Login por terceiro (Google) sem guardar senha. |

### Cola de 10 segundos (a decorar)
```
BAC  = orçamento total .................. R$ 96.000
VP   = planejado até hoje ............... R$ 55.440
VA   = entregue (aceito) até hoje ....... R$ 55.440
CR   = gasto até hoje ................... R$ 55.440
VPr  = VA - VP  (prazo)  ................ 0
VC   = VA - CR  (custo)  ................ 0
IDP  = VA / VP  (prazo)  ................ 1,00
IDC  = VA / CR  (custo)  ................ 1,00
EPT  = BAC - VA (falta gastar) .......... R$ 40.560 (1.014 h)
IDPT = (BAC-VA)/(BAC-CR) ................ 1,00
Avanço = VA / BAC ....................... 57,75%
Regra: >1 bom · =1 no plano · <1 ruim (para IDP, IDC)
```

---

## 5. Seu bloco (3A) revisado — ~2:45, ~330 palavras

> **Obrigado, Yago.** Do lado técnico, congelamos em 2 de outubro a nossa **linha de base de arquitetura, a BL-ARQ 1.0**, com as decisões ADR-001 a 004 aprovadas.
>
> A stack é: **Next.js e React** no front; **Fastify sobre Node.js** no back, organizado em camadas de rotas, controladores, serviços e acesso a dados; e **MySQL 8 com Prisma**. Tudo roda em **Docker Compose**, atrás de um **proxy reverso NGINX** com **HTTPS** via Let's Encrypt, numa VPS própria. Esse ambiente de homologação está no ar desde 2 de outubro.
>
> Para manter a estabilidade, usamos **gerência de configuração** num monorepo Git. **Ninguém commita na main.** Todo trabalho nasce numa branch `feature`, passa por **Pull Request revisado por um colega** e só entra com o **CI verde**. A `develop` publica em staging; a `main` representa a versão estável. Evitamos o *Big Bang Merge* integrando em pedaços pequenos.
>
> Versionamos com **SemVer**. Publicamos a **v0.4.0-alpha.1** em 9 de outubro e fechamos a Sprint 4 com a **v0.4.0**. Seguimos para a beta **v1.0.0-beta.1** em 27 de novembro, a **release candidate em 30 de novembro** e a **v1.0.0**, nossa Release R1, em **6 de dezembro**.
>
> Dois itens estão sob minha responsabilidade. A **Ação A3**: o Node 25 saiu de suporte em junho, então migramos para a versão **LTS** com lockfile e CI, até **30 de outubro**. E a **Ação A4**: hoje o backup diário já é validado manualmente; até **13 de novembro** automatizamos essa validação com um **smoke test** que restaura o último backup num banco descartável e confere se ele é utilizável, junto com **monitoramento externo**. Isso reduz o risco R3 da VPS única.
>
> Com isso, passo a palavra para a Ana, que apresenta a gestão de riscos."

**Versão de 60 s (aviso de 2 min do tempo):**
> "Congelamos a arquitetura BL-ARQ 1.0 em 2 de outubro: Next.js, Fastify, MySQL com Prisma, tudo em Docker com NGINX e HTTPS. Nada vai direto à main: branch, Pull Request revisado e CI verde. Versionamos por SemVer: alpha hoje, beta em 27/11 e a v1.0.0 em 6 de dezembro. Meus dois pontos de atenção são a migração para Node LTS até 30/10 e a automação do teste de backup até 13/11. Passo para a Ana."

---

## 6. Perguntas prováveis da banca (resposta curta · se apertar · armadilha)

### Infra e risco
**1. "99,9% numa VPS única é realista?"** *(origem: RNF-03)*
- Curta: "Para a R1, em piloto, não prometemos 99,9% medido; é meta do requisito. A VPS única cabe no custo (R$ 160) e o risco é o R3 (prob. 30%, impacto alto), com plano de mitigação."
- Se apertar: "Mitigação: reinício automático de contêineres, backup diário já validado manualmente, e na A4 (13/11) automatizamos essa validação com um smoke test de restauração, mais monitoramento externo. Recriar a VPS parte do repositório (Docker Compose) + o último backup."
- Armadilha: **não** cite "99,9% garantido" nem "30 min" sem teste medido.

**2. "Quanto tempo para voltar se a VPS cair?"**
- Curta: "Medimos a restauração no teste manual e o smoke test automático da A4 (13/11) passa a registrar esse tempo todo dia. Perda máxima de dados: até 24 h (backup diário)." (Use o tempo que você realmente cronometrar; sem medição, diga "algumas horas".)
- Armadilha: confundir RTO e RPO.

**3. "Por que não usar nuvem gerenciada/alta disponibilidade?"**
- "Custo e fase: BAC protegido. Se a demanda crescer, entra como Solicitação de Mudança com orçamento próprio."

**4. "E se o certificado expirar?"**
- "Renovação automática a cada ciclo; o monitoramento externo da A4 alerta antes da expiração."

**5. "O risco R3 não deveria ser alto?"**
- "Probabilidade 30% (baixa/média) × impacto alto = criticidade média na matriz 5x5. Seria alto se a probabilidade fosse maior ou sem mitigação."

### Arquitetura e escolhas
**6. "Por que Docker?"** — "Ambiente reprodutível: o mesmo `compose` sobe staging, outra VPS ou a máquina de um colega; isso é o que torna a recriação rápida."

**7. "Por que NGINX?"** — "Termina o HTTPS, encaminha para a API e esconde a porta interna; renovação de certificado automatizada."

**8. "Por que Fastify e não Express?"** — "Desempenho, validação por esquema (Zod) e documentação Swagger integradas. Decisão registrada no ADR-002."

**9. "Por que MySQL + Prisma?"** — "Relacional cabe no catálogo (fabricantes, modelos, especificações); Prisma dá tipagem e migrações versionadas. ADR-003. A busca em linguagem simples (RF-005) está sendo decidida no spike da Ana (ADR-005): FULLTEXT do MySQL vs. índice invertido/TF-IDF/BM25."
- Armadilha: **não** dizer que a busca "já está pronta".

**10. "A busca semântica muda a arquitetura?"** — "Se vencer FULLTEXT, nada muda. Se vencer índice próprio, é um módulo dentro da API, sem novo serviço, para não estourar o BAC. Por isso o spike antes de implementar."

**11. "Por que monorepo?"** — "Front e back compartilham tipos e versão; um PR pode alterar contrato e consumo juntos; uma tag representa o sistema inteiro."

### Git, versões e qualidade
**12. "Por que ninguém commita na main?"** — "A `main` é a versão estável (GA). Revisão por par + CI evitam regressão e deixam rastro auditável, base do Valor Agregado."

**13. "O que muda MAJOR, MINOR e PATCH?"** — "MAJOR quebra compatibilidade; MINOR adiciona funcionalidade compatível; PATCH corrige bug. R1 = 1.0.0, R2 = 1.1.0, R3 = 1.2.0."

**14. "Por que pula de 0.4.0 para 1.0.0-beta.1?"** — "É válido em SemVer: 0.x é desenvolvimento inicial; 1.0.0 é a primeira versão estável (R1) e o beta é pré-release dela. Ordem: alpha < beta < rc < final."

**15. "Diferença entre alpha, beta e rc?"** — "Alpha: funcionalidade incompleta, uso interno. Beta: completa, em validação. RC: candidata a final; só correção de bug. GA: publicada."

**16. "O que é 'CI verde'? Tem testes?"** — "Pipeline roda lint, build e testes a cada PR; sem verde, não faz merge." *(Armadilha: não afirme cobertura de testes (%) sem número; diga que a meta de cobertura está no DoD da R1.)* [A VERIFICAR]

**17. "O que é Big Bang Merge?"** — "Juntar muito trabalho isolado de uma vez, gerando conflitos e regressões. Evitamos com branches curtas e PRs pequenos."

### Node / dependências
**18. "Por que migrar do Node 25?"** — "Releases ímpares não entram em LTS e perdem suporte em ~6 meses (sem suporte desde 01/06/2026). Segurança e previsibilidade exigem LTS."

**19. "E se a migração quebrar o Prisma/TypeScript?"** — "Por isso: branch separada, lockfile, CI na mesma versão e validação em staging antes de promover. Contingência: staging fechado ao público e rollback pela tag anterior."

**20. "Dependência com vulnerabilidade?"** — "Atualização via PR com CI; lockfile garante reprodutibilidade; patch release (0.x.y+1)."

### Gestão (ligando com os colegas)
**21. "Isso não é maquiagem de EVM?" (parte técnica)** — "Valor Agregado só é creditado com PR aprovado e funcionalidade homologada em staging; o histórico de commits e PRs é a evidência."

**22. "App mobile era requisito (RNF-04). Por que cortaram?"** — "Duplicaria homologação e custo (conta Apple US$ 99/ano fora do BAC). Foi decisão de escopo; novos pedidos entram como Solicitação de Mudança (Anexo A) com impacto em horas e verba."

**23. "LGPD: como a arquitetura ajuda?"** — "OAuth Google evita guardar senha; coletamos o mínimo; checklist LGPD (A5, Ana) até 13/11."

**24. "O que acontece se alguém da dupla faltar?"** — "Par pré-definido: eu cubro a Ana (A1/ADR-005). Documentação em ADR e PR facilita a troca."

**25. "Qual seu papel na comunicação?"** — "Equipe Dev/Líder Técnico: responsável (A/R) no alinhamento diário e na demonstração técnica; a Mirela é A/R do relatório executivo."

---

## 7. Cenários "e se..."
- **VPS cai durante a demo:** não depender dela. Tenha o **PDF offline** e prints do staging. Diga: "Esse é exatamente o R3; o monitoramento da A4 nos alertaria."
- **CI quebra na véspera da beta (27/11):** congelar merge, corrigir no branch, promover só com verde; se atrasar, a beta desliza para a janela de reserva da Sprint 8 sem mexer na R1 (06/12).
- **Smoke test de backup fica vermelho:** é para isso que ele existe; o alerta dispara, investigamos o dump (corrompido? schema mudou após migração?), corrigimos e refazemos o backup no mesmo dia. Backup sem restauração validada não conta como backup. Se persistir até o rc (30/11), R3 sobe para "monitorar".
- **A3 atrasa além de 30/10:** staging fechado, migração entra na Sprint 6; R5 continua média.
- **Dupla some:** ver pergunta 24.
- **Professor interrompe:** pare, responda em até 3 s e devolva a palavra ao orador.

---

## 8. Checklist de palco (Victor)
- [ ] PDF offline no pendrive **e** no desktop.
- [ ] Cabo HDMI + adaptador (USB-C) na mochila.
- [ ] Você cuida do hardware; Mirela segura a fala (plano de contingência do guia).
- [ ] Entrada: "Obrigado, Yago." Saída: "…passo a palavra para a Ana."
- [ ] Combinar o sinal de "faltam 2 min" com a Mariana.
- [ ] Não improvisar números novos além dos do relatório.

---

## 9. Sabatina (10 perguntas — responda em voz alta e confira)
1. Quais ADRs foram congelados na BL-ARQ 1.0 e quando?
2. Qual a ordem de precedência de `alpha`, `beta`, `rc` e versão final?
3. Por que a `main` não recebe commits diretos?
4. Qual a diferença entre `develop` e `main` no nosso fluxo?
5. Qual é o prazo e o dono de A3? E de A4?
6. R3: probabilidade, impacto e criticidade?
7. Por que Node 25 não serve e o que é LTS?
8. O que é RPO e qual o nosso com backup diário?
9. Por que não prometemos 30 min nem 99,9%?
10. Quais releases correspondem a v1.0.0, v1.1.0 e v1.2.0 e em que datas?

<details><summary>Gabarito</summary>

1. ADR-001 a 004, em 02/10/2026.
2. alpha < beta < rc < versão final.
3. Main = versão estável; PR revisado + CI verde garantem qualidade e rastreabilidade (base do Valor Agregado).
4. `develop` integra e publica em staging; `main` é o GA.
5. A3: Victor, 30/10. A4: Victor, 13/11.
6. 30% × impacto alto = criticidade média (nenhum risco "Alto" no ciclo).
7. Release ímpar, sem suporte desde 01/06/2026; LTS = suporte longo, previsível.
8. Quanto de dado podemos perder; até ~24 h.
9. Não temos medição contínua: o teste manual existe, a automação (smoke test) é a A4 (13/11), e 99,9% é meta de requisito, não medição.
10. R1 06/12/2026, R2 27/06/2027, R3 07/12/2027.
</details>

---

## 10. Rastreio das fontes
| Informação | Fonte |
|---|---|
| BAC, EVM, 57,75%, S4 186/400 | Slide 2, guia, `.docx` |
| Sprint 4 72% (36/50 h), v0.3.0, alpha.1, próximas datas | Slide 3 |
| AT-1/2/3, A1–A7, positivos | Slide 4 |
| Node 25 sem suporte desde 01/06/2026 | Slide 4 |
| R1 50%; Node 70% moderado; R3 30% alto | `.docx` Roteiro (perguntas) |
| Ordem do fluxo Git | Guia (bloco 3A) e `.docx` (develop publica em staging) |
| RF-001..010, RNF-03/04, RGN | repo `docs` → `anotacoes/requisitos.tex` |
| Camadas, rotas, entidades, NGINX/certbot, Conventional Commits | repos `harddex-landing`, `template` |
| RACI de comunicação | `plano_de_entrega.jpeg` |
| Tudo marcado [PROJEÇÃO] | Estimativa deste documento |
