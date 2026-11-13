# Glossário de gestão do HardDex (PMBOK / EVM)

> Extraído de `mundo_victor_harddex.md` (seção 4B). Valores do relatório RS-HDX-2026-10, corte em 12/10/2026.

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
