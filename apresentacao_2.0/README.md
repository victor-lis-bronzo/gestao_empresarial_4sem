# Apresentação 2.0: revisão de custos e proposta de investimento

Revisão entregue em **12/11/2026** (data de corte), para a reunião com os gerentes de projeto. Ela responde às observações do professor sobre a [apresentação 1](../apresentacao_1/).

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `StatusReport_HardDex_v2.docx` / `.pdf` | Relatório de Status RS-HDX-2026-11 v2.0 (11 páginas) |
| `GP_v2.docx` / `.pdf` | Pauta da reunião dos GPs (2 páginas): equipe com nível, próximos passos, itens de relevância, As Is / To Be |
| `HardDex_Cronograma_v2.gan` | Cronograma no GanttProject com o cenário acelerado e a linha de base original |
| `memoria_de_calculo/` | Scripts que geram os números, os gráficos e os documentos acima ([como usar](memoria_de_calculo/README.md)) |

## Roteiro do Status Report v2

1. **O que mudou desde a 1ª apresentação**: liga cada observação à correção feita.
2. **Revisão de custos e valor-hora**:
   - método: custo-hora = salário × 1,70 ÷ 160 h, arredondado a R$ 5;
   - custo por integrante;
   - comparação antes × depois e curva S.
3. **Cenário atual (As Is em 12/11)**: posição, EVM recalculado e próximos passos até 07/12.
4. **CR-01: proposta de investimento**:
   - por que acelerar um projeto que está em dia;
   - alternativas e premissas;
   - linha de base × acelerado;
   - quanto captar, valuation e quadro societário;
   - parcelas, retorno, sensibilidade e riscos novos;
   - decisão pedida.
5. **Pontos de atenção e ações** (A1 a A11).
6. **Cronograma revisado** (Gantt por pacote).
7. **Anexo A**: memória de cálculo e premissas a validar.

## Números principais

### Valor-hora e EVM

| Nível | Salário de referência | Custo-hora |
|---|---|---|
| GP | R$ 10.350 | R$ 110 |
| Sr | R$ 9.400 | R$ 100 |
| Pl | R$ 6.600 | R$ 70 |
| Jr | R$ 4.200 | R$ 45 |

| Indicador | Antes (R$ 40/h) | Revisado |
|---|---|---|
| BAC | R$ 96.000 | R$ 189.600 |
| VA em 12/11 (1.489 h) | R$ 59.560 | R$ 117.631 |
| EPT (911 h) | R$ 36.440 | R$ 71.969 |
| Reserva (10%) | R$ 9.600 | R$ 18.960 |
| IDP = IDC = IDPT | 1,00 | 1,00 |

### Cenário acelerado (CR-01)

| Métrica | Linha de base | Acelerado |
|---|---|---|
| R2 (v1.1.0) | 27/06/2027 | 21/03/2027 (−14 semanas) |
| R3 (v1.2.0) | 07/12/2027 | 09/05/2027 (−30 semanas) |
| Horas pagas do R2+R3 | 800 | 1.052 |
| Custo econômico do R2+R3 | R$ 63.200 | R$ 66.887 (+5,8%) |
| Caixa necessário | — | R$ 60.000 (20% das ações; pré-money R$ 240.000) |

### Premissas da simulação

Simulação semanal a partir de 07/12/2026:
- 2 contratados (Pl e Jr, 20 h/semana cada);
- rampa de produtividade de 50% → 75% → 90%;
- −10% de produção por coordenação (os canais de comunicação passam de 10 para 21);
- 2 h/semana de mentoria do líder técnico;
- recesso de 21/12 a 03/01;
- equipe só nos semestres letivos.

### Retorno (receita de afiliados após o R2)

| Cenário | Receita/mês | Meses para igualar o aporte |
|---|---|---|
| Pessimista | R$ 720 | 83 |
| Base | R$ 5.040 | 12 |
| Otimista | R$ 24.000 | 2,5 |

## Premissas a validar pelo grupo

- Nível de cada integrante (deve bater com a lista que a GP posta no Moodle).
- Salários de referência e fator de custo-empresa (1,70).
- Quadro societário atual (premissa: 5 fundadores com 20% cada).
- Tráfego e conversão (sem dados reais; medir a partir do R1, ação A11).
- Nova data da A1 (spike da busca).

Para mudar qualquer premissa, edite `memoria_de_calculo/calc.py` e rode `./build.sh`: todos os documentos são refeitos com os números novos.
