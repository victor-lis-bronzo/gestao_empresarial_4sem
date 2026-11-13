"""Gráficos estáticos (PNG) para o Status Report v2, todos a partir de numeros.json."""
import json
from datetime import date, timedelta
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.dates as mdates
import matplotlib.pyplot as plt

HERE = Path(__file__).parent
N = json.loads((HERE / "numeros.json").read_text())
OUT = HERE / "img"
OUT.mkdir(exist_ok=True)
D = date.fromisoformat

BLUE, ORANGE, AQUA, YELLOW, MAGENTA, GREEN, VIOLET, RED = (
    "#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#6250d6", "#e34948")
INK, INK2, MUTED, GRID, SURF = "#0b0b0b", "#52514e", "#8a8984", "#e6e5e1", "#ffffff"
BASEGRAY = "#b9b8b3"

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 9, "text.color": INK, "axes.labelcolor": INK2,
    "axes.edgecolor": GRID, "xtick.color": INK2, "ytick.color": INK2, "axes.grid": True,
    "grid.color": GRID, "grid.linewidth": 0.6, "axes.spines.top": False, "axes.spines.right": False,
    "axes.spines.left": False, "figure.facecolor": SURF, "axes.facecolor": SURF, "savefig.dpi": 200,
})


def brl(x, dec=0):
    s = f"{x:,.{dec}f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"R$ {s}"


def save(fig, nome):
    fig.savefig(OUT / nome, bbox_inches="tight")
    plt.close(fig)


# ------------------------------------------------------------- 1. Gantt condensado
tar = {t["name"]: t for t in json.loads((HERE / "tarefas.json").read_text())}


def pick(prefix):
    return next(t for n, t in tar.items() if n.startswith(prefix))


rows = [("S1 2025/1", pick("1.1 ")), ("S2 2025/2", pick("1.2 ")), ("S3 2026/1", pick("1.3 ")),
        ("S4 2026/2 (R1)", pick("1.4 ")), ("CR-01 investimento", pick("CR-01")),
        ("Onboarding contratados", pick("Onboarding")), ("R2 (v1.1.0)", pick("1.5 Release")),
        ("R3 (v1.2.0)", pick("1.6 Release"))]
fig, ax = plt.subplots(figsize=(7.6, 3.4))
for i, (lab, t) in enumerate(rows):
    y = len(rows) - 1 - i
    b0, b1 = D(t["base"][0]), D(t["base"][1])
    a0, a1 = D(t["start"]), D(t["end"])
    mudou = (b0, b1) != (a0, a1)
    if mudou:
        ax.barh(y + 0.2, (b1 - b0).days + 1, left=b0, height=0.26, color=BASEGRAY, edgecolor=SURF, linewidth=1)
        ax.text(b1 + timedelta(days=8), y + 0.2, f"{b1:%d/%m/%y}", va="center", fontsize=7.5, color=MUTED)
    ax.barh(y - 0.12 if mudou else y, (a1 - a0).days + 1, left=a0, height=0.36, color=BLUE, edgecolor=SURF, linewidth=1)
    marco = {"S4": ("R1", N["cronograma"]["R1"]), "R2": ("R2", N["cronograma"]["acel_R2"]),
             "R3": ("R3", N["cronograma"]["acel_R3"])}.get(lab[:2])
    if marco:
        ax.text(a1 + timedelta(days=8), y - 0.12 if mudou else y, f"{marco[0]} {D(marco[1]):%d/%m/%y}", va="center", fontsize=7.5, color=INK)
ax.set_yticks(range(len(rows)))
ax.set_yticklabels([r[0] for r in rows][::-1])
corte = D(N["corte"])
ax.axvline(corte, color=INK2, lw=1, ls="--")
ax.text(corte, -0.75, "corte 12/11/2026 ", color=INK2, fontsize=8, va="bottom", ha="right")
ax.set_ylim(-0.8, len(rows) - 0.4)
ax.xaxis.set_major_locator(mdates.MonthLocator(bymonth=[1, 7]))
ax.xaxis.set_major_formatter(mdates.DateFormatter("%m/%Y"))
ax.grid(axis="y", visible=False)
ax.legend(handles=[plt.Rectangle((0, 0), 1, 1, color=BLUE), plt.Rectangle((0, 0), 1, 1, color=BASEGRAY)],
          labels=["Cenário acelerado (CR-01)", "Linha de base BL-PLAN (quando muda)"], loc="upper right", frameon=False, fontsize=8)
ax.set_title("Gantt condensado: linha de base x cenário acelerado", loc="left", fontsize=10, color=INK)
save(fig, "gantt_resumo.png")

# ------------------------------------------------------------- 2. Gantt detalhado pós-12/11
det = [t for t in tar.values() if D(t["end"]) >= date(2026, 11, 1) and t["eap"] and not t["ms"]
       and (t["eap"].startswith(("1.5.", "1.6.", "CR-01")) or t["eap"].startswith("1.4.S"))]
det = [t for t in det if not t["eap"] in ("1.4",)]
fig, ax = plt.subplots(figsize=(7.6, 5.6))
for i, t in enumerate(det):
    y = len(det) - 1 - i
    b0, b1 = D(t["base"][0]), D(t["base"][1])
    a0, a1 = D(t["start"]), D(t["end"])
    if (b0, b1) != (a0, a1):
        ax.barh(y + 0.2, (b1 - b0).days + 1, left=b0, height=0.22, color=BASEGRAY, edgecolor=SURF, linewidth=1)
    ax.barh(y - 0.1, (a1 - a0).days + 1, left=a0, height=0.34, color=BLUE if t["complete"] < 100 else GREEN,
            edgecolor=SURF, linewidth=1)
lbl = []
for t in det:
    n = t["name"]
    if t["eap"].startswith("1.4.S"):
        n = f"S4 {n}"
    lbl.append(n if len(n) <= 52 else n[:50] + "…")
ax.set_yticks(range(len(det)))
ax.set_yticklabels(lbl[::-1], fontsize=7.2)
ax.axvline(corte, color=INK2, lw=1, ls="--")
ax.xaxis.set_major_locator(mdates.MonthLocator())
ax.xaxis.set_major_formatter(mdates.DateFormatter("%m/%y"))
ax.tick_params(axis="x", labelsize=7.5)
ax.grid(axis="y", visible=False)
ax.legend(handles=[plt.Rectangle((0, 0), 1, 1, color=GREEN), plt.Rectangle((0, 0), 1, 1, color=BLUE),
                   plt.Rectangle((0, 0), 1, 1, color=BASEGRAY)],
          labels=["Concluído", "Planejado (acelerado)", "Linha de base"], loc="upper right", frameon=False, fontsize=7.5)
ax.set_title("Cronograma de 11/2026 em diante, por pacote de trabalho", loc="left", fontsize=10)
save(fig, "gantt_detalhe.png")

# ------------------------------------------------------------- 3. curva de entrega de escopo
lin = N["cronograma"]["linhas"]
base = N["cronograma"]["curva_base"]
fig, ax = plt.subplots(figsize=(7.2, 3.2))
xb = [D(p["semana"]) + timedelta(days=6) for p in base]
ax.plot(xb, [p["acum"] for p in base], color=ORANGE, lw=2, label="Linha de base (só a equipe, nos semestres)")
xa = [D(p["semana"]) + timedelta(days=6) for p in lin]
ax.plot(xa, [p["acum"] for p in lin], color=BLUE, lw=2, label="Acelerado (equipe + 2 contratados)")
for h, nome in [(400, "R2"), (800, "R3")]:
    ax.axhline(h, color=GRID, lw=1)
    ax.text(xb[-1], h + 12, nome, color=INK2, fontsize=8, ha="right")
ax.set_ylabel("Horas de escopo entregues (R2 + R3)")
ax.set_ylim(0, 860)
ax.xaxis.set_major_formatter(mdates.DateFormatter("%m/%y"))
ax.legend(frameon=False, fontsize=8, loc="upper left", bbox_to_anchor=(0.0, 0.93))
cr_ = N["cronograma"]
ax.annotate(f"R3 {cr_['sem_ganhas_R3']:.0f} semanas antes", xy=(D(cr_["acel_R3"]), 800), xytext=(D("2027-06-20"), 640),
            arrowprops=dict(arrowstyle="->", color=INK2, lw=0.8), fontsize=8, color=INK2)
ax.set_title("Entrega acumulada do escopo restante após o R1", loc="left", fontsize=10)
save(fig, "curva_entrega.png")

# ------------------------------------------------------------- 4. valor-hora por pessoa
eq = N["equipe"]
fig, ax = plt.subplots(figsize=(6.6, 2.6))
nomes = [f"{p['curto']} ({p['nivel']})" for p in eq][::-1]
tx = [p["taxa"] for p in eq][::-1]
ax.barh(nomes, tx, color=BLUE, height=0.55, edgecolor=SURF)
for y, v in enumerate(tx):
    ax.text(v + 2, y, brl(v) + "/h", va="center", fontsize=8, color=INK)
ax.axvline(40, color=ORANGE, lw=2)
ax.text(39, -0.75, "valor único antigo: R$ 40/h ", color=INK2, fontsize=8, ha="right")
ax.axvline(N["valor_hora"]["taxa_media"], color=INK2, lw=1, ls="--")
ax.text(N["valor_hora"]["taxa_media"] + 1, -0.75, f"média ponderada {brl(N['valor_hora']['taxa_media'])}/h", color=INK2, fontsize=8)
ax.set_xlim(0, 130)
ax.set_ylim(-1.1, len(eq) - 0.5)
ax.set_xlabel("Custo-empresa por hora (R$)")
ax.grid(axis="y", visible=False)
ax.set_title("Valor-hora revisado por senioridade", loc="left", fontsize=10)
save(fig, "valor_hora.png")

# ------------------------------------------------------------- 5. curva S de custo planejado
sem_fim = [("S1", "2025-06-29"), ("S2", "2025-12-14"), ("S3", "2026-06-28"), ("S4", "2026-12-06"),
           ("S5", "2027-06-27"), ("S6", "2027-12-07")]
x = [D("2025-03-10")] + [D(d) for _, d in sem_fim]
novo = [0] + [N["valor_hora"]["custo_semestre"] * (i + 1) for i in range(6)]
velho = [0] + [N["valor_hora"]["custo_semestre_antigo"] * (i + 1) for i in range(6)]
fig, ax = plt.subplots(figsize=(7.0, 3.0))
ax.plot(x, novo, color=BLUE, lw=2, marker="o", ms=4, label="VP com valor-hora revisado")
ax.plot(x, velho, color=ORANGE, lw=2, marker="o", ms=4, label="VP com R$ 40/h (relatório anterior)")
ax.plot(corte, N["evm"]["VA"], marker="D", color=INK, ms=7, ls="none", label="VA = CR em 12/11/2026")
ax.annotate(brl(N["evm"]["VA"]), xy=(corte, N["evm"]["VA"]), xytext=(-80, 10), textcoords="offset points", fontsize=8)
ax.text(x[-1], novo[-1], "  " + brl(novo[-1]), va="center", fontsize=8)
ax.text(x[-1], velho[-1], "  " + brl(velho[-1]), va="center", fontsize=8)
ax.yaxis.set_major_formatter(matplotlib.ticker.FuncFormatter(lambda v, _: f"{v / 1000:.0f} mil"))
ax.xaxis.set_major_formatter(mdates.DateFormatter("%m/%y"))
ax.set_ylabel("R$ acumulado")
ax.legend(frameon=False, fontsize=8, loc="upper left")
ax.set_title("Curva S do valor planejado: antes x depois da revisão", loc="left", fontsize=10)
save(fig, "curva_s.png")

# ------------------------------------------------------------- 6. sensibilidade
cen = N["retorno"]["cenarios"]
nomes = list(cen)
fig, ax = plt.subplots(figsize=(6.6, 2.3))
vals = [cen[n]["receita_mes"] for n in nomes]
ax.barh(nomes[::-1], vals[::-1], color=BLUE, height=0.5, edgecolor=SURF)
for y, n in enumerate(nomes[::-1]):
    c = cen[n]
    ax.text(c["receita_mes"] + 300, y, f"{brl(c['receita_mes'])}/mês · payback do aporte {c['payback_meses']:.0f} meses",
            va="center", fontsize=8)
ax.set_xlim(0, max(vals) * 1.9)
ax.xaxis.set_major_formatter(matplotlib.ticker.FuncFormatter(lambda v, _: f"{v / 1000:.0f} mil"))
ax.set_xlabel("Receita mensal de afiliados (R$)")
ax.grid(axis="y", visible=False)
ax.set_title("Sensibilidade da receita de afiliados após o R2", loc="left", fontsize=10)
save(fig, "sensibilidade.png")

# ------------------------------------------------------------- 7. cap table
inv = N["investimento"]
fig, ax = plt.subplots(figsize=(6.8, 1.9))
cores = [BLUE, AQUA, YELLOW, MAGENTA, GREEN]
for y, (lab, tabela) in enumerate([("Depois", inv["cap_depois"]), ("Antes", inv["cap_antes"])]):
    left = 0
    for i, s in enumerate(tabela):
        cor = VIOLET if s["socio"] == "Investidor" else cores[i]
        ax.barh(lab, s["pct"] * 100, left=left, color=cor, edgecolor=SURF, linewidth=2, height=0.55)
        ax.text(left + s["pct"] * 50, y, f"{s['socio']}\n{s['pct'] * 100:.0f}%", ha="center", va="center",
                fontsize=7, color="white" if cor in (BLUE, GREEN, VIOLET) else INK)
        left += s["pct"] * 100
ax.set_xlim(0, 100)
ax.set_xlabel("% das ações")
ax.grid(False)
ax.set_title(f"Quadro societário antes e depois do aporte ({inv['pct']:.0%} ao investidor)", loc="left", fontsize=10)
save(fig, "cap_table.png")
print(sorted(p.name for p in OUT.iterdir()))
