"""Matriz de Riscos v2 -> v3: R15-R16 (riscos da CR-01 do Status Report), coluna de status e aba de balanço.
Uso: python matriz_update.py entrada.xlsx saida.xlsx"""
import sys
from copy import copy
import openpyxl
from openpyxl.formatting.formatting import ConditionalFormattingList
from openpyxl.styles import Font, Alignment
from openpyxl.comments import Comment

src, dst = sys.argv[1], sys.argv[2]
wb = openpyxl.load_workbook(src)
ws = wb["Página1"]
FIRST, LAST_OLD, LAST = 9, 22, 24


def clone_style(a, b):
    b.font, b.fill, b.border = copy(a.font), copy(a.fill), copy(a.border)
    b.alignment, b.number_format, b.protection = copy(a.alignment), a.number_format, copy(a.protection)


# ---------- novos riscos (mesmo texto usado no Status Report v3.0 e no deck) ----------
novos = [
    ["R15", "Negócios / Receita (CR-01)",
     "Tráfego abaixo do cenário base (8 mil visitas/mês) faz a receita de afiliados não cobrir o aporte de R$ 60.000,00; no cenário pessimista o payback passa de 6 anos.",
     "Média (2)", "Alto (3)", 6,
     "Condicionar a parcela 2 (R$ 30.000,00) à entrega do R2 e instrumentar métricas de visitas e cliques desde o R1 (ação A11).",
     "Rever os cenários de receita com o tráfego real medido antes de liberar a parcela 2.",
     "Mirela (GP) / Yago (Front-End)"],
    ["R16", "Governança / Societário (CR-01)",
     "Entrada do investidor como sócio gera conflito de governança e diluição dos fundadores (de 20% para 16% cada).",
     "Baixa (1)", "Médio (2)", 2,
     "Assinar o acordo de acionistas antes do aporte (ação A10, minuta até 27/11/2026); investidor com voto apenas em mudanças de escopo.",
     "Mudanças de escopo pedidas pelo investidor seguem o fluxo formal de solicitação de mudança (CR), com decisão registrada.",
     "Mirela (GP)"],
]
for i, row in enumerate(novos):
    r = LAST_OLD + 1 + i
    ws.row_dimensions[r].height = ws.row_dimensions[LAST_OLD].height
    for j, v in enumerate(row):
        c = ws.cell(r, 2 + j, v)
        clone_style(ws.cell(LAST_OLD, 2 + j), c)

# ---------- coluna de status (K) ----------
status = {
    "R01": "Ativo · em monitoramento",
    "R02": "Ativo · validação no beta do R1 (27/11)",
    "R03": "Ação A2 concluída (13/11)",
    "R04": "Ativo · em monitoramento",
    "R05": "Ativo · em monitoramento",
    "R06": "Ação A4 concluída (13/11) · mitigação parcial",
    "R07": "Ação A5 concluída (13/11) · mitigação parcial",
    "R08": "Ativo · em monitoramento",
    "R09": "Ativo · em monitoramento",
    "R10": "Ativo · só testável no R2 (redirecionamento de afiliados)",
    "R11": "Ação A1 concluída (sprint 6)",
    "R12": "Ativo · decisão da CR-01 em 27/11",
    "R13": "Ativo · triagem desde 23/11 (A9)",
    "R14": "Ativo · em monitoramento",
    "R15": "Ativo · métricas desde o R1 (A11)",
    "R16": "Ativo · minuta do acordo até 27/11 (A10)",
}
hdr = ws.cell(8, 11, "Status em 22/11")
clone_style(ws.cell(8, 10), hdr)
for r in range(FIRST, LAST + 1):
    c = ws.cell(r, 11, status[ws.cell(r, 2).value])
    clone_style(ws.cell(r, 10), c)
ws.column_dimensions["K"].width = 30
ws.column_dimensions["I"].width = 40.13

# ---------- totais, formatação condicional e títulos ----------
ws["B6"] = f"=COUNTA(B{FIRST}:B{LAST})"
ws["D6"] = f"=AVERAGE(G{FIRST}:G{LAST})"
ws["E6"] = f"=MAX(G{FIRST}:G{LAST})"
old = ws.conditional_formatting
new = ConditionalFormattingList()
for cf in old:
    rng = str(cf.sqref).replace(f"G{FIRST}:G{LAST_OLD}", f"G{FIRST}:G{LAST}")
    for rule in cf.rules:
        new.add(rng, rule)
ws.conditional_formatting = new
ws["B3"] = ("Identificação, avaliação, estratégias de mitigação e contingência do projeto — "
            "Matriz v3 (R15 e R16 vêm do Status Report v3.0) — Corte 22/11/2026")
note = ws.cell(LAST + 2, 2, "Nenhum risco materializado até 22/11/2026 · reserva de contingência de R$ 19.328,65 intacta (10% × R$ 193.286,52; sem a proposta: 10% × R$ 189.600 = R$ 18.960) · balanço completo na aba \"Balanço\".")
note.font = Font(name=ws["B3"].font.name, size=9, italic=True, color="595959")

# ---------- aba de balanço ----------
bs = wb.create_sheet("Balanço")
base_font = ws.cell(FIRST, 2).font.name
F = lambda **k: Font(name=base_font, **k)
bs.column_dimensions["A"].width = 2.75
bs.column_dimensions["B"].width = 34
bs.column_dimensions["C"].width = 18
bs.column_dimensions["D"].width = 70
bs["B2"] = "Balanço de Riscos - HardDex"
clone_style(ws["B2"], bs["B2"])
bs["B3"] = "Situação no corte de 22/11/2026 · fórmulas ligadas à aba Página1 (azul = valor digitado)"
clone_style(ws["B3"], bs["B3"])
for col, t in zip("BCD", ["Indicador", "Valor", "Leitura"]):
    clone_style(ws["B8"], bs[f"{col}5"]); bs[f"{col}5"] = t
P = "'Página1'"
G, K = f"{P}!$G${FIRST}:$G${LAST}", f"{P}!$K${FIRST}:$K${LAST}"
linhas = [
    ("Riscos monitorados", f"=COUNTA({P}!$B${FIRST}:$B${LAST})", "0", "14 da Matriz v2 + R15 e R16 da CR-01"),
    ("Críticos (score ≥ 7)", f'=COUNTIF({G},">=7")', "0", "R02 e R10 (score 9)"),
    ("Médios (score 5 a 6)", f'=COUNTIFS({G},">=5",{G},"<7")', "0", "R01, R04, R05, R06, R08, R11, R12, R14, R15"),
    ("Baixos (score ≤ 4)", f'=COUNTIF({G},"<=4")', "0", "R03, R07, R09, R13, R16"),
    ("Score médio", f"=AVERAGE({G})", "0.0", "Score = probabilidade × impacto (1 a 3 cada)"),
    ("Ações concluídas (A1, A2, A4, A5)", f'=COUNTIF({K},"Ação*")', "0", "R11 (A1, sprint 6), R03 (A2), R06 (A4) e R07 (A5); R06 e R07 com mitigação parcial"),
    ("Riscos ativos", f'=COUNTIF({K},"Ativo*")', "0", "Em monitoramento, com gatilho e responsável"),
    ("Riscos materializados", f'=COUNTIF({K},"Materializado*")', "0", "Marque o status como \"Materializado ...\" na aba Página1 se ocorrer"),
    ("Reserva de contingência (R$)", "=ROUND(193286.52*0.1,2)", '"R$" #,##0.00', "10% × R$ 193.286,52 (BAC com a proposta); sem a proposta: 10% × R$ 189.600 = R$ 18.960"),
    ("Reserva usada (R$)", 0, '"R$" #,##0.00;-"R$" #,##0.00;"-"', "Nenhum uso até 22/11/2026"),
    ("Reserva disponível (R$)", "=C14-C15", '"R$" #,##0.00', ""),
    ("Reserva disponível (%)", "=IF(C14=0,0,C16/C14)", "0.0%", ""),
    ("Próximo gatilho", "27/11/2026", "@", "Beta do R1 valida R02 (o R10 só dá para testar no R2); decisão da CR-01 resolve R12; acordo de acionistas (A10) trata R16"),
]
body = ws.cell(FIRST, 4)
for i, (ind, val, fmt, leit) in enumerate(linhas):
    r = 6 + i
    for col, v in zip("BCD", [ind, val, leit]):
        c = bs[f"{col}{r}"]
        clone_style(body, c)
        c.value = v
        c.alignment = Alignment(vertical="center", wrap_text=True)
    bs[f"B{r}"].font = F(size=10, bold=True)
    bs[f"C{r}"].number_format = fmt
    bs[f"C{r}"].alignment = Alignment(horizontal="right", vertical="center")
    if isinstance(val, (int, float)) or val == "27/11/2026":
        bs[f"C{r}"].font = F(size=10, color="0000FF")
    bs.row_dimensions[r].height = 30
bs["C14"].comment = Comment("Fonte: Status Report RS-HDX-2026-11 v3.0, seção 3.2. 10% × R$ 193.286,52 (BAC com a proposta) = R$ 19.328,65; sem a proposta, 10% × R$ 189.600,00 = R$ 18.960,00.", "HardDex")
bs["C15"].comment = Comment("Fonte: Status Report v3.0 — reserva intacta no corte de 22/11/2026.", "HardDex")
wb.save(dst)
print("ok", dst)
