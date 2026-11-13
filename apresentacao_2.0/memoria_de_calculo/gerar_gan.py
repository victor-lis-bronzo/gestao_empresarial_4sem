"""Gera HardDex_Cronograma_v2.gan (GanttProject 3.x) a partir de numeros.json."""
import hashlib
import json
import sys
from datetime import date, timedelta
from pathlib import Path
from xml.sax.saxutils import escape

N = json.loads(Path(__file__).with_name("numeros.json").read_text())
OUT = Path(sys.argv[1])
TAXA = N["valor_hora"]["taxa_media"]
TAXA_OLD = N["premissas"]["taxa_antiga"]
D = date.fromisoformat
CORTE = D(N["corte"])

VERDE, AZUL, CINZA, LARANJA, ROXO, VERMELHO = "#2E7D32", "#5B7BD5", "#9E9E9E", "#E08A1E", "#7B4FA0", "#C62828"

tasks = []          # dicts com hierarquia
_next = [0]


def nid():
    i = _next[0]
    _next[0] += 1
    return i


def T(name, start, end=None, *, ms=False, complete=0, color=AZUL, eap="", horas=None, agregadas=None,
      custo=None, notes="", base=None, team=False, contr=0, children=None):
    """end inclusivo; base = (start, end) da linha de base (default = igual)."""
    end = start if ms else end
    t = {"id": nid(), "name": name, "start": start, "end": end, "ms": ms, "complete": complete,
         "color": color, "eap": eap, "horas": horas, "agregadas": agregadas, "custo": custo,
         "notes": notes, "base": base or (start, end), "team": team, "contr": contr,
         "children": children or []}
    return t


def dur(t):
    return 0 if t["ms"] else (t["end"] - t["start"]).days + 1


def summarize(t):
    if t["children"]:
        for c in t["children"]:
            summarize(c)
        t["start"] = min(c["start"] for c in t["children"])
        t["end"] = max(c["end"] for c in t["children"])
        bs = [c["base"] for c in t["children"]]
        t["base"] = (min(b[0] for b in bs), max(b[1] for b in bs))


def sprints(inicio, n, horas_feitas, dur_dias=None, eap_pref="", sp0=1):
    out = []
    s = inicio
    for k in range(n):
        dd = (dur_dias or [14] * n)[k]
        e = s + timedelta(days=dd - 1)
        feito = max(0, min(50, horas_feitas - 50 * k))
        out.append(T(f"Sprint {k + 1} (Sp{sp0 + k:02d})", s, e, complete=round(feito / 50 * 100),
                     color=VERDE if feito == 50 else (LARANJA if feito else AZUL),
                     eap=f"{eap_pref}.S{k + 1}", horas=50, agregadas=feito, custo=50 * TAXA, team=True,
                     notes=f"{s:%d/%m/%Y} a {e:%d/%m/%Y}; 50 h da equipe (5 pessoas x 5 h/semana x 2 semanas)."))
        s = e + timedelta(days=1)
    return out


def semestre(cod, nome, inicio, horas_feitas, sp0, extra=()):
    sp = sprints(inicio, 8, horas_feitas, eap_pref=cod, sp0=sp0)
    return T(f"{cod} {nome}", inicio, color=VERDE if horas_feitas >= 400 else AZUL, eap=cod, horas=400,
             agregadas=horas_feitas, custo=400 * TAXA, complete=round(horas_feitas / 4),
             notes=f"400 h = R$ {400 * TAXA:,.2f} pelo valor-hora revisado (antes: R$ {400 * TAXA_OLD:,.2f}).",
             children=sp + list(extra))


# ------------------------------------------------------------------ S1-S3
s1 = semestre("1.1", "S1 2025/1 - Ideação", D("2025-03-10"), 400, 1)
s2 = semestre("1.2", "S2 2025/2 - Requisitos iniciais", D("2025-08-25"), 400, 9)
s3 = semestre("1.3", "S3 2026/1 - Análise e modelagem", D("2026-03-09"), 400, 17,
              [T("BL-REQ 1.0 - documento de análise e modelagem", D("2026-06-28"), ms=True, complete=100, color=VERDE)])

# ------------------------------------------------------------------ S4 (R1)
s4_sp = sprints(D("2026-08-17"), 8, 289, dur_dias=[21, 14, 14, 14, 14, 14, 14, 7], eap_pref="1.4", sp0=25)
s4_ms = [
    T("Kickoff do S4 / BL-PLAN-S4", D("2026-08-17"), ms=True, complete=100, color=VERDE),
    T("BL-ARQ 1.0 (v0.3.0)", D("2026-10-02"), ms=True, complete=100, color=VERDE),
    T("Status report RS-HDX-2026-10 (corte 12/10)", D("2026-10-12"), ms=True, complete=100, color=VERDE),
    T("Status report RS-HDX-2026-11 (corte 12/11) e reunião dos GPs", D("2026-11-12"), ms=True, complete=100, color=VERDE),
    T("Beta do R1 (v1.0.0-beta.1)", D("2026-11-27"), ms=True),
    T("Release candidate do R1 (v1.0.0-rc.1)", D("2026-11-30"), ms=True),
    T("Release R1 (v1.0.0) / BL-R1", D("2026-12-06"), ms=True, color=VERMELHO),
    T("Entrega do Status Report na disciplina", D("2026-12-07"), ms=True),
]
s4 = T("1.4 S4 2026/2 - Arquitetura, back-end base, catálogo (R1)", D("2026-08-17"), eap="1.4", horas=400,
       agregadas=289, custo=400 * TAXA, complete=72,
       notes="289 de 400 h em 12/11/2026 (72,25%). R1 não é acelerável: faltam 3 semanas e incluir gente agora atrasaria (Lei de Brooks).",
       children=s4_sp + s4_ms)

# ------------------------------------------------------------------ proposta de investimento
inv = N["investimento"]
cr = T("CR-01 Proposta de investimento (venda de 20% das ações)", D("2026-11-12"), color=ROXO, eap="CR-01",
       notes=(f"Captação de R$ {inv['captacao']:,.2f} por {inv['pct']:.0%} (pré-money R$ {inv['pre_money']:,.2f}). "
              "Recursos só para contratar 2 devs e infra; liberados em 2 parcelas condicionadas a marcos."),
       children=[
           T("Submissão da proposta ao stakeholder", D("2026-11-13"), ms=True, color=ROXO),
           T("Análise e decisão do stakeholder", D("2026-11-16"), D("2026-11-27"), color=ROXO),
           T("Recrutamento dos 2 devs (Pl e Jr)", D("2026-11-23"), D("2026-12-06"), color=ROXO),
           T(f"Aporte parcela 1 (R$ {inv['tranches'][0]['valor']:,.0f})", D("2026-12-07"), ms=True, color=ROXO),
       ])

# ------------------------------------------------------------------ R2 / R3 acelerados
lin = N["cronograma"]["linhas"]
base_pts = N["cronograma"]["curva_base"]


def acum_dates(pts):
    """lista (segunda, acum_inicio, acum_fim)."""
    out, prev = [], 0.0
    for p in pts:
        a = p["acum"]
        out.append((D(p["semana"]), prev, a))
        prev = a
    return out


ACEL = acum_dates(lin)
BASE = acum_dates(base_pts)


def janela(curva, h0, h1):
    ini = next(m for m, a0, a1 in curva if a1 > h0 + 1e-6)
    fim = next(m for m, a0, a1 in curva if a1 >= h1 - 1e-6) + timedelta(days=6)
    return ini, fim


R2_PKG = [("1.5.2", "Questionário TDU e perfilamento (RF-004, RGN-01)", 60),
          ("1.5.3", "Busca em linguagem simples (RF-005)", 80),
          ("1.5.4", "Tags baseadas no perfil (RF-006)", 40),
          ("1.5.5", "Comparador de até 4 dispositivos (RF-007)", 60),
          ("1.5.6", "Dicionário didático na interface com WCAG nos modais (RF-008)", 40),
          ("1.5.7", "Componentes e redirecionamento com afiliado (RGN-03)", 30),
          ("1.5.8", "Integração, testes e release R2", 50)]
R3_PKG = [("1.6.2", "Perfil do usuário (RF-002)", 50),
          ("1.6.3", "Favoritos e histórico no back-end (RF-003, RNF-02)", 50),
          ("1.6.4", "Qualidade de software (testes automatizados)", 60),
          ("1.6.5", "Segurança da informação e LGPD (RNF-01)", 50),
          ("1.6.6", "Acessibilidade WCAG (RNF-05)", 30),
          ("1.6.7", "Polimento da documentação de análise", 30),
          ("1.6.8", "Deploy final, monitoramento e disponibilidade (RNF-03)", 40),
          ("1.6.9", "Homologação, aceite final e release R3", 50)]
GER = 40   # gerenciamento de cada semestre (1.5.1 / 1.6.1) corre em paralelo
ac = N["aceleracao"]
CUSTO_H_ESCOPO_ACEL = ac["custo_acel_pos_r1"] / 800


def release(cod, titulo, pkgs, offset, data_base_ms, data_acel_ms, versao):
    filhos = []
    h = offset
    g0, g1 = janela(ACEL, offset, offset + 400)
    b0, b1 = janela(BASE, offset, offset + 400)
    filhos.append(T(f"{cod}.1 Gerenciamento (sprints, status, riscos)", g0, g1, eap=f"{cod}.1", horas=GER,
                    custo=GER * CUSTO_H_ESCOPO_ACEL, base=(b0, b1), team=True))
    h += GER
    for eap, nome, hh in pkgs:
        a0, a1 = janela(ACEL, h, h + hh)
        bb0, bb1 = janela(BASE, h, h + hh)
        filhos.append(T(f"{eap} {nome}", a0, a1, eap=eap, horas=hh, custo=hh * CUSTO_H_ESCOPO_ACEL,
                        base=(bb0, bb1), team=True, contr=50,
                        notes=f"Linha de base: {bb0:%d/%m/%Y} a {bb1:%d/%m/%Y}. Acelerado: {a0:%d/%m/%Y} a {a1:%d/%m/%Y}."))
        h += hh
    filhos.append(T(f"Release {versao}", data_acel_ms, ms=True, color=VERMELHO,
                    base=(data_base_ms, data_base_ms),
                    notes=f"Linha de base {data_base_ms:%d/%m/%Y}; acelerado {data_acel_ms:%d/%m/%Y}."))
    return T(titulo, g0, eap=cod, horas=400, custo=400 * CUSTO_H_ESCOPO_ACEL, children=filhos, color=AZUL)


cron = N["cronograma"]
on0 = D(cron["inicio_acel"])
onboarding = T("Onboarding dos contratados (rampa 50% -> 75% -> 90%)", on0, on0 + timedelta(days=41), color=LARANJA,
               eap="CR-01.1", contr=50,
               notes="Recesso 21/12/2026 a 03/01/2027 sem trabalho. Victor dedica 2 h/semana a revisão e mentoria enquanto houver contratados.")
r2 = release("1.5", "1.5 Release R2 acelerada (v1.1.0)", R2_PKG, 0, D(cron["base_R2"]), D(cron["acel_R2"]), "R2 (v1.1.0) / BL-R2")
r2["children"].append(T(f"Aporte parcela 2 (R$ {inv['tranches'][1]['valor']:,.0f})", D(cron["acel_R2"]),
                        ms=True, color=ROXO))
r3 = release("1.6", "1.6 Release R3 acelerada (v1.2.0) e encerramento", R3_PKG, 400, D(cron["base_R3"]), D(cron["acel_R3"]),
             "R3 (v1.2.0), aceite final e encerramento / BL-R3")

proj = T("1 Projeto HardDex", D("2025-03-10"), eap="1", horas=round(ac["h_total_acel"]),
         agregadas=N["evm"]["H_VA"], custo=ac["bac_acel"], color=AZUL,
         notes=(f"Cenário acelerado (CR-01). Status em 12/11/2026: VERDE; VP = VA = CR = {N['evm']['H_VA']} h = "
                f"R$ {N['evm']['VA']:,.2f}; IDP = IDC = 1,00.\nValor-hora revisado por senioridade (média R$ {TAXA:.2f}/h). "
                f"BAC base R$ {N['valor_hora']['bac_novo']:,.2f}; BAC do cenário acelerado R$ {ac['bac_acel']:,.2f} "
                f"({ac['h_total_acel']:,.0f} h).\nLinha de base salva: BL-PLAN (datas originais de R2 27/06/2027 e R3 07/12/2027)."),
         children=[T("Início do projeto (kickoff S1)", D("2025-03-10"), ms=True, complete=100, color=VERDE),
                   s1, s2, s3, s4, cr, onboarding, r2, r3])
summarize(proj)
proj["complete"] = round(N["evm"]["avanco"] * 100)

# ------------------------------------------------------------------ XML
RES = [(p["id"], p["nome"], p["nivel"], p["taxa"], p["papel"]) for p in N["equipe"]] + \
      [(c["id"], c["nome"], c["nivel"], c["taxa"], c["papel"]) for c in N["contratados"]]
ROLE = {}
for rid, _, nivel, _, papel in RES:
    ROLE[rid] = len(ROLE)

uid = lambda t: hashlib.md5(f"hdx-{t['id']}-{t['name']}".encode()).hexdigest()
fmt = lambda x: f"{x:.2f}"
xml = []
w = xml.append
w('<?xml version="1.0" encoding="UTF-8"?>')
w('<project name="HardDex - Simplificando o hardware!" company="IFSP Campus Bragança Paulista - ADS - Gestão de Projetos de Software (BRAGEPR)" webLink="" view-date="2026-08-01" view-index="0" gantt-divider-location="760" resource-divider-location="320" version="3.3.3309" locale="en">')
w(f'    <description>{escape("Cronograma v2 do HardDex (corte 12/11/2026) com o cenário acelerado da CR-01 (venda de 20% das ações para contratar 2 devs). Linha de base BL-PLAN salva para comparar. Custos pelo valor-hora revisado por senioridade (coluna Custo) e pelo valor antigo de R$ 40/h (coluna Custo antigo). Taxas dos recursos em R$/hora.")}</description>')
w('''    <view zooming-state="default:3" id="gantt-chart">
        <field id="tpd3" name="Name" width="420" order="0" />
        <field id="tpd4" name="Begin date" width="90" order="1" />
        <field id="tpd5" name="End date" width="90" order="2" />
        <field id="tpd7" name="Completion" width="70" order="3" />
        <field id="tpc0" name="EAP" width="80" order="4" />
        <field id="tpc1" name="Horas planejadas" width="90" order="5" />
        <field id="tpc2" name="Horas agregadas (12/11/2026)" width="90" order="6" />
        <field id="tpc4" name="Custo (R$)" width="100" order="7" />
        <field id="tpc5" name="Custo antigo R$ 40/h" width="100" order="8" />
        <option id="taskLabelRight" value="name" />
    </view>
    <view id="resource-table">
        <field id="0" name="Name" width="220" order="0" />
        <field id="1" name="Default role" width="200" order="1" />
    </view>
    <calendars>
        <day-types>
            <day-type id="0" />
            <day-type id="1" />
            <default-week id="1" name="default" sun="0" mon="0" tue="0" wed="0" thu="0" fri="0" sat="0" />
            <only-show-weekends value="false" />
            <overriden-day-types />
            <days />
        </day-types>
    </calendars>
    <tasks empty-milestones="true">
        <taskproperties>
            <taskproperty id="tpd0" name="type" type="default" valuetype="icon" />
            <taskproperty id="tpd1" name="priority" type="default" valuetype="icon" />
            <taskproperty id="tpd2" name="info" type="default" valuetype="icon" />
            <taskproperty id="tpd3" name="name" type="default" valuetype="text" />
            <taskproperty id="tpd4" name="begindate" type="default" valuetype="date" />
            <taskproperty id="tpd5" name="enddate" type="default" valuetype="date" />
            <taskproperty id="tpd6" name="duration" type="default" valuetype="int" />
            <taskproperty id="tpd7" name="completion" type="default" valuetype="int" />
            <taskproperty id="tpd8" name="coordinator" type="default" valuetype="text" />
            <taskproperty id="tpd9" name="predecessorsr" type="default" valuetype="text" />
            <taskproperty id="tpc0" name="EAP" type="custom" valuetype="text" defaultvalue="" />
            <taskproperty id="tpc1" name="Horas planejadas" type="custom" valuetype="int" defaultvalue="" />
            <taskproperty id="tpc2" name="Horas agregadas (12/11/2026)" type="custom" valuetype="int" defaultvalue="" />
            <taskproperty id="tpc4" name="Custo (R$)" type="custom" valuetype="double" defaultvalue="" />
            <taskproperty id="tpc5" name="Custo antigo R$ 40/h" type="custom" valuetype="double" defaultvalue="" />
        </taskproperties>''')

allocs = []
flat = []


def emit(t, ind):
    flat.append(t)
    sp = "    " * ind
    w(f'{sp}<task id="{t["id"]}" uid="{uid(t)}" name="{escape(t["name"], {chr(34): "&quot;"})}" color="{t["color"]}" '
      f'meeting="{"true" if t["ms"] else "false"}" start="{t["start"]}" duration="{dur(t)}" complete="{t["complete"]}" '
      f'expand="{"true" if t["id"] == 0 else "false"}" cost-manual-value="{fmt(t["custo"] or 0)}" cost-calculated="false">')
    if t["notes"]:
        w(f'{sp}    <notes>{escape(t["notes"])}</notes>')
    if t["eap"]:
        w(f'{sp}    <customproperty taskproperty-id="tpc0" value="{escape(t["eap"])}" />')
    if t["horas"] is not None:
        w(f'{sp}    <customproperty taskproperty-id="tpc1" value="{t["horas"]}" />')
        w(f'{sp}    <customproperty taskproperty-id="tpc5" value="{fmt(t["horas"] * TAXA_OLD)}" />')
    if t["agregadas"] is not None:
        w(f'{sp}    <customproperty taskproperty-id="tpc2" value="{t["agregadas"]}" />')
    if t["custo"] is not None:
        w(f'{sp}    <customproperty taskproperty-id="tpc4" value="{fmt(t["custo"])}" />')
    for c in t["children"]:
        emit(c, ind + 1)
    w(f'{sp}</task>')
    if not t["children"] and not t["ms"]:
        if t["team"]:
            for p in N["equipe"]:
                allocs.append((t["id"], p["id"], 12.5))
        if t["contr"]:
            for c in N["contratados"]:
                allocs.append((t["id"], c["id"], t["contr"]))


emit(proj, 2)
w('    </tasks>')
w('    <resources>')
for rid, nome, nivel, taxa, papel in RES:
    w(f'        <resource id="{rid}" name="{escape(nome)}" function="{ROLE[rid]}" contacts="" phone="">')
    w(f'            <rate name="standard" value="{taxa}" />')
    w('        </resource>')
w('    </resources>')
w('    <allocations>')
for tid, rid, load in allocs:
    w(f'        <allocation task-id="{tid}" resource-id="{rid}" function="{ROLE[rid]}" responsible="false" load="{load}" />')
w('    </allocations>')
w('    <vacations>')
for rid, *_ in RES:
    w(f'        <vacation start="2026-12-21" end="2027-01-03" resourceid="{rid}" />')
w('    </vacations>')
w('    <previous>')
w('        <previous-tasks name="BL-PLAN (linha de base original: R2 27/06/2027, R3 07/12/2027)">')
for t in flat:
    b0, b1 = t["base"]
    d = 0 if t["ms"] else (b1 - b0).days + 1
    w(f'            <previous-task id="{t["id"]}" start="{b0}" duration="{d}" meeting="{"true" if t["ms"] else "false"}" super="{"true" if t["children"] else "false"}" />')
w('        </previous-tasks>')
w('    </previous>')
w('    <roles roleset-name="Default" />')
w('    <roles>')
for rid, nome, nivel, taxa, papel in RES:
    w(f'        <role id="{ROLE[rid]}" name="{escape(f"{papel} - {nivel} (R$ {taxa}/h)")}" />')
w('    </roles>')
w('</project>')

OUT.write_text("\n".join(xml) + "\n", encoding="utf-8")
# exporta a lista de tarefas para os gráficos
Path(__file__).with_name("tarefas.json").write_text(json.dumps(
    [{"id": t["id"], "name": t["name"], "start": str(t["start"]), "end": str(t["end"]), "ms": t["ms"],
      "base": [str(t["base"][0]), str(t["base"][1])], "eap": t["eap"], "complete": t["complete"],
      "nivel": 0} for t in flat], ensure_ascii=False, indent=1))
print("tarefas", len(flat), "alocações", len(allocs), "->", OUT)
