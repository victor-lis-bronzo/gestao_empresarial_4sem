# Memória de cálculo

Fonte única dos números da apresentação 2.0. Nenhum valor é digitado à mão nos documentos: tudo sai de `calc.py` → `numeros.json` e é lido pelos geradores. Assim o Status Report, a pauta dos GPs, o Gantt e os gráficos nunca divergem entre si.

## Fluxo

```
calc.py ──► numeros.json ──┬─► gerar_gan.py ──► ../HardDex_Cronograma_v2.gan + tarefas.json
                           │                                   │
                           ├─► graficos.py ◄───────────────────┘ ──► img/*.png
                           ├─► gerar_docx.js (+ img/) ──► ../StatusReport_HardDex_v2.docx
                           └─► gerar_gp.js ──► ../GP_v2.docx
```

| Arquivo | O que faz |
|---|---|
| `calc.py` | Premissas e cálculos: valor-hora por nível, BAC, EVM em 12/11, simulação semanal da aceleração, captação, valuation, quadro societário e cenários de receita. Contém `assert`s de consistência (2.400 h, sprint = 50 h, soma do quadro = 100%, % = captação ÷ pós-money) |
| `numeros.json` | Saída de `calc.py` (versionada para consulta sem rodar nada) |
| `gerar_gan.py` | Gera o XML do GanttProject 3.x: tarefas, recursos com taxa, alocações, recesso e a linha de base em `<previous>` |
| `graficos.py` | 7 gráficos em PNG (matplotlib): Gantt condensado e detalhado, curva de entrega, valor-hora, curva S, sensibilidade e quadro societário |
| `gerar_docx.js` | Status Report v2 em `.docx` (biblioteca `docx`) |
| `gerar_gp.js` | Pauta da reunião dos GPs em `.docx` |
| `build.sh` | Roda tudo em ordem e converte os `.docx` para PDF com o LibreOffice |

## Como rodar

```bash
python3 -m pip install -r requirements.txt
npm install
./build.sh
```

Para usar outro Python (por exemplo, um venv): `PYTHON=.venv/bin/python ./build.sh`.

## Onde mudar as premissas (`calc.py`)

| Premissa | Variável |
|---|---|
| Salário por nível | `NIVEIS` |
| Nível de cada integrante | `EQUIPE` |
| Fator custo-empresa / horas por mês | `FATOR_CUSTO_EMPRESA`, `HORAS_MES_PRODUTIVAS` |
| Horas do S4 em 12/11 | `H_S4_CORTE` |
| Contratados (nível, h/semana) | `CONTRATADOS` |
| Rampa, coordenação, mentoria | `RAMPA`, `PROD_PLENA`, `FATOR_COORD`, `H_ONBOARD_VICTOR` |
| Calendário (semestres, recesso) | `S5`, `S6`, `RECESSO`, `INICIO_ACEL` |
| Itens de caixa e captação | `CAIXA`, `CAPTACAO` |
| Valuation | `BERKUS`, `PRE_MONEY` |
| Cenários de receita | `CENARIOS` |

`CAPTACAO` e `PRE_MONEY` são decisões de negociação, não resultados de cálculo. O script confere que a captação cobre a necessidade calculada e que o percentual resultante é 20%. Se mudar um dos dois, ajuste o `assert` correspondente.

## Fórmulas

- custo-hora(nível) = arred5(salário × 1,70 ÷ 160)
- BAC = Σ (horas de cada pessoa × custo-hora) = 2.400 h × média
- VP, VA e CR = horas × taxa média; IDP = VA ÷ VP; IDC = VA ÷ CR; IDPT = (BAC − VA) ÷ (BAC − CR)
- produção semanal = [h da equipe (só nos semestres) + Σ h dos contratados × rampa] × 0,90, até somar 800 h de escopo (R2 + R3)
- custo por semana ganha = (custo acelerado − custo base) ÷ semanas antecipadas do R3
- captação ≥ (contratados + recrutamento + infra extra) × 1,15; % de ações = captação ÷ (pré-money + captação)
- receita/mês = visitas × clique × conversão × ticket × comissão
