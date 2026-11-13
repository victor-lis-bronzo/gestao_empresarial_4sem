# Changelog

Mudanças entre as entregas, em ordem cronológica inversa.

## [2.0] - 12/11/2026: revisão após o feedback da 1ª apresentação

### Observações do professor e o que foi feito

| Observação | Problema encontrado | Correção |
|---|---|---|
| "Os valores não parecem bater" | R$ 40/h de custo-empresa equivale a um salário de ~R$ 3.765, abaixo de um Júnior; a GP e o líder técnico custavam o mesmo que um iniciante | Valor-hora por senioridade e uma memória de cálculo única para todos os documentos |
| "As contas não consideravam o valor-hora" | BAC = 2.400 h × R$ 40 sem diferenciar quem executa | BAC = Σ(horas × custo-hora do nível) = R$ 189.600 |
| Venda de ações sem métricas | A tese "vender ações acelera" não tinha datas, custo nem retorno | Simulação semanal de capacidade, custo por semana ganha, captação, valuation, quadro societário e sensibilidade |
| Novo Gantt | Sem cenário de aceleração | `HardDex_Cronograma_v2.gan` com cenário acelerado e linha de base salva |

### Adicionado
- `StatusReport_HardDex_v2.docx/.pdf` (RS-HDX-2026-11, corte 12/11/2026, 11 páginas).
- Seção 2: revisão de custos e valor-hora (método, tabela por integrante, comparação antes × depois, curva S).
- Seção 4: Solicitação de Mudança **CR-01** (proposta de investimento):
  - alternativas avaliadas e premissas;
  - resultado da simulação;
  - captação, valuation Berkus × custo de reposição e quadro societário;
  - parcelas, retorno e sensibilidade;
  - riscos novos R7 a R10;
  - decisão pedida.
- Ações A8 a A11.
- Anexo A: memória de cálculo e premissas a validar pelo grupo.
- `HardDex_Cronograma_v2.gan`:
  - 7 recursos com nível e custo-hora (5 integrantes e 2 contratados);
  - recesso como férias;
  - colunas de custo novo e antigo;
  - linha de base BL-PLAN salva.
- `GP_v2.docx/.pdf`: pauta da reunião dos gerentes de projeto refeita com os números novos e o nível de cada integrante.
- `memoria_de_calculo/`: `calc.py`, `gerar_gan.py`, `graficos.py`, `gerar_docx.js`, `gerar_gp.js` e `build.sh`.

### Alterado
- BAC de R$ 96.000 para R$ 189.600; reserva de contingência de R$ 9.600 para R$ 18.960.
- O patrocinador passa a ser o stakeholder investidor (antes: "não se aplica"), sujeito à aprovação da CR-01.
- A tese de aceleração deixa de ser "corrigir atraso" (o projeto não está atrasado: IDPT = 1,00) e passa a ser antecipar a receita de afiliados, que começa no R2.
- Pauta dos GPs: a migração para Node.js LTS (A3) aparece como concluída na Sprint 5, alinhada ao As Is (a versão anterior se contradizia).

### Pendências conhecidas
- Nova data da A1 (spike da busca), que venceu em 30/10 e segue em execução em 12/11.
- Validar com o grupo os níveis, os salários de referência e o quadro societário atual (Anexo A do relatório).

## [1.0] - 12/10/2026: 1ª apresentação

- Status Report RS-HDX-2026-10 (corte 12/10/2026): 1.386 de 2.400 h (57,75%), BAC de R$ 96.000 a R$ 40/h, IDP = IDC = 1,00.
- Slides `Apresentacao_HardDex.pptx`, cronograma `HardDex_Cronograma.gan` e pauta `GP.pdf`.
- Materiais de estudo pessoais (`mundo_victor_harddex.md`, `glossario_gestao_pmbok.md`).
