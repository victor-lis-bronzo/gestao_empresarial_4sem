"""Atualiza o Status Report (v2.1/"v3") para a v3.0 alinhada ao deck revisado.
Uso: python sr_update.py <pasta_descompactada>"""
import sys, re
from xml.sax.saxutils import escape

D = sys.argv[1]
p = f"{D}/word/document.xml"
x = open(p, encoding="utf8").read()


def rep(old, new, count=1, src=None):
    global x
    s = x if src is None else src
    n = s.count(old)
    assert n == count, (old, n)
    return s.replace(old, new)


def T(s):
    return f'<w:t xml:space="preserve">{escape(s)}</w:t>'


# ---------- versão ----------
x = rep("RS-HDX-2026-11 · versão 2.1 ·", "RS-HDX-2026-11 · versão 3.0 ·")
h = open(f"{D}/word/header1.xml", encoding="utf8").read()
assert h.count("RS-HDX-2026-11 v2.1") == 1
open(f"{D}/word/header1.xml", "w", encoding="utf8").write(h.replace("RS-HDX-2026-11 v2.1", "RS-HDX-2026-11 v3.0"))

# ---------- alternativa B ----------
x = rep("eleva R6 (sobrecarga)", "eleva R05 (sobrecarga)")

# ---------- seção 4.8: IDs e score da Matriz de Riscos v3 ----------
i48 = x.find("4.8 Riscos novos introduzidos pela CR-01")
i49 = x.find("4.9 Decis")
sec = x[i48:i49]
for old, new in [("R7", "R13"), ("R8", "R15"), ("R9", "R16"), ("R10", "R17")]:
    sec = rep(T(old), T(new), src=sec)
sec = rep(T("Criticidade"), T("Score (P × I)"), src=sec)
# células de criticidade, na ordem R7..R10 (Média, Alta, Média, Baixa) -> score da matriz
scores = iter(["4 (Média × Médio)", "6 (Média × Alto)", "2 (Baixa × Médio)", "2 (Baixa × Médio)"])
crit_cells = [m for m in re.finditer(r'<w:t xml:space="preserve">(Média|Alta|Baixa)</w:t>', sec)]
assert len(crit_cells) == 4, len(crit_cells)
out, last = [], 0
for m in crit_cells:
    out.append(sec[last:m.start()]); out.append(T(next(scores))); last = m.end()
out.append(sec[last:]); sec = "".join(out)
sec = rep(T("R8 é o primeiro risco de criticidade Alta do projeto. Ele só existe se a CR-01 for aprovada e já nasce com resposta definida, então o status continua VERDE pela regra do semáforo (nenhum Alto sem plano)."),
          T("Numeração e escala da Matriz de Riscos v3 (probabilidade e impacto de 1 a 3; score = P × I). R15 (tráfego) é o risco de negócio mais relevante da CR-01: só existe se a CR-01 for aprovada e já nasce com resposta definida. Os únicos riscos com score máximo (9) continuam R02 e R10, ambos com plano, então o status segue VERDE pela regra do semáforo (nenhum risco alto sem plano)."), src=sec)
# 4.8: renomeia e acrescenta R12 e R14 (clonando a linha de R13), ordem R12, R13, R14, R15, R16 (R17 removido)
sec = rep("4.8 Riscos novos introduzidos pela CR-01", "4.8 Riscos da CR-01 (R12 a R16)", src=sec)
_rows = sec.split("<w:tr>")
_tpl = _rows[2]  # primeira linha de dados (R13)
assert T("R13") in _tpl


def _clone(vals):
    it = iter(vals)
    return re.sub(r'<w:t xml:space="preserve">[^<]*</w:t>', lambda m: T(next(it)), _tpl) + ""


_r12 = _clone(["R12", "CR-01 não aprovada até 27/11/2026 ou atraso nas parcelas de R$ 30.000,00 → decisão do stakeholder ou desembolso atrasa → perda ou adiamento da aceleração",
               "Média (50%)", "Alto", "6 (Média × Alto)", "Business case com EVM verde (IDP = IDC = 1,00); decisão acompanhada até 27/11 e desembolsos vinculados a BL-R1 e BL-R2", "Mirela"])
_r14 = _clone(["R14", "Líder técnico acumula desenvolvimento crítico e 2 h/semana de mentoria → gargalo (Lei de Brooks) → atraso das entregas",
               "Média (50%)", "Alto", "6 (Média × Alto)", "Limite de 2 h/semana de mentoria, checklists de PR e revisões distribuídas com Ana Tayná e Mariana", "Victor / Mirela"])
assert len(_rows) == 6
# _rows[0] = prefixo; [1] = cabeçalho; [2..5] = R13, R15, R16 e a linha do antigo R10 (R17, removida)
_tail = _rows[5][_rows[5].index("</w:tr>") + len("</w:tr>"):]
sec = "<w:tr>".join([_rows[0], _rows[1], _r12, _rows[2], _r14] + _rows[3:5]) + _tail
assert "recesso" not in sec
x = x[:i48] + sec + x[i49:]

# ---------- seção 5 (ações): origem com a nova numeração ----------
i5 = x.find("5. Pontos de atenção e ações")
i6 = x.find("6. Cronograma revisado")
acts = x[i5:i6]
for old, new in [("R1 / AT-1", "R11 / AT-1"), ("R5 / AT-3", "R5 v1 (encerrado) / AT-3"), ("R2 / AT-2", "R03 / AT-2"),
                 ("R3", "R06"), ("R4", "R07"), ("CR-01 / R7", "CR-01 / R13"), ("R9", "R16"), ("R8", "R15")]:
    acts = rep(T(old), T(new), src=acts)
acts = rep("5. Pontos de atenção e ações", "6. Pontos de atenção e ações", src=acts)
x = x[:i5] + acts + x[i6:]
x = rep(T("6. Cronograma revisado (Gantt)"), T("7. Cronograma revisado (Gantt)"))

# ---------- nova seção 5: balanço de riscos ----------
RF = '<w:rFonts w:ascii="Arial" w:cs="Arial" w:eastAsia="Arial" w:hAnsi="Arial"/>'
BORD = '<w:tcBorders><w:top w:val="single" w:color="BFBFBF" w:sz="4"/><w:left w:val="single" w:color="BFBFBF" w:sz="4"/><w:bottom w:val="single" w:color="BFBFBF" w:sz="4"/><w:right w:val="single" w:color="BFBFBF" w:sz="4"/></w:tcBorders>'
MAR = '<w:tcMar><w:top w:type="dxa" w:w="50"/><w:left w:type="dxa" w:w="90"/><w:bottom w:type="dxa" w:w="50"/><w:right w:type="dxa" w:w="90"/></w:tcMar>'


def heading(text, lvl):
    return f'<w:p><w:pPr><w:pStyle w:val="Heading{lvl}"/></w:pPr><w:r><w:rPr>{RF}</w:rPr>{T(text)}</w:r></w:p>'


def para(text, italic=False):
    it = '<w:i/><w:iCs/><w:color w:val="595959"/><w:sz w:val="18"/><w:szCs w:val="18"/>' if italic else ""
    return f'<w:p><w:pPr><w:spacing w:after="100" w:line="276"/></w:pPr><w:r><w:rPr>{RF}{it}</w:rPr>{T(text)}</w:r></w:p>'


def cell(text, w, head=False, fill=None, bold=False):
    shd = f'<w:shd w:fill="{fill}" w:color="auto" w:val="clear"/>' if fill else ""
    b = '<w:b/><w:bCs/>' if (head or bold) else '<w:b w:val="false"/><w:bCs w:val="false"/>'
    return (f'<w:tc><w:tcPr><w:tcW w:type="dxa" w:w="{w}"/>{BORD}{shd}{MAR}</w:tcPr>'
            f'<w:p><w:pPr><w:jc w:val="left"/></w:pPr><w:r><w:rPr>{RF}{b}<w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr>{T(text)}</w:r></w:p></w:tc>')


def table(widths, header, rows, first_bold=True):
    tot = sum(widths)
    g = "".join(f'<w:gridCol w:w="{w}"/>' for w in widths)
    s = (f'<w:tbl><w:tblPr><w:tblW w:type="dxa" w:w="{tot}"/><w:tblBorders><w:top w:val="single" w:color="auto" w:sz="4"/><w:left w:val="single" w:color="auto" w:sz="4"/><w:bottom w:val="single" w:color="auto" w:sz="4"/><w:right w:val="single" w:color="auto" w:sz="4"/><w:insideH w:val="single" w:color="auto" w:sz="4"/><w:insideV w:val="single" w:color="auto" w:sz="4"/></w:tblBorders></w:tblPr><w:tblGrid>{g}</w:tblGrid>'
         f'<w:tr><w:trPr><w:tblHeader/></w:trPr>{"".join(cell(h, w, head=True, fill="DCE6F2") for h, w in zip(header, widths))}</w:tr>')
    for r in rows:
        fill = r[-1] if isinstance(r[-1], dict) else None
        vals = r[:-1] if fill else r
        s += "<w:tr>" + "".join(cell(v, w, bold=(first_bold and j == 0), fill=(fill or {}).get("fill")) for j, (v, w) in enumerate(zip(vals, widths))) + "</w:tr>"
    return s + "</w:tbl>"


GREEN = {"fill": "E2F0D9"}
bal = [
    ("Riscos monitorados", "16", "14 da Matriz v2 + 2 riscos da CR-01 deste relatório (R15 e R16)"),
    ("Críticos (score 9)", "2", "R02 (deploy Docker/NGINX na VPS) e R10 (AdBlockers × IDs de afiliado)"),
    ("Médios (score 6)", "9", "R01, R04, R05, R06, R08, R11, R12, R14, R15"),
    ("Baixos (score ≤ 4)", "5", "R03, R07, R09, R13, R16"),
    ("Score médio", "5,6", "89 pontos ÷ 16 riscos"),
    ("Riscos materializados", "0", "Nenhum evento de risco ocorreu até 22/11/2026", GREEN),
    ("Reserva de contingência", "R$ 19.328,65", "Intacta: 100% disponível · 10% × R$ 193.286,52 = R$ 19.328,65 (sem a proposta: 10% × R$ 189.600 = R$ 18.960); somada ao BAC compõe a linha de base de custos", GREEN),
    ("Ações concluídas", "4", "A1 (sprint 6) → R11; A2 → R03; A4 → R06 e A5 → R07 (13/11/2026); R06 e R07 com mitigação parcial", GREEN),
    ("Próximo gatilho", "27/11/2026", "Beta do R1 valida R02 (o R10 só dá para testar quando o R2 entregar o redirecionamento de afiliados); decisão da CR-01 resolve R12; minuta do acordo de acionistas (A10) trata R16"),
]
bal = [r[:3] + (r[3],) if len(r) == 4 else r for r in bal]
corr = [
    ("R1", "R11", "Busca em linguagem simples sem técnica definida"),
    ("R2", "R03", "Catálogo desatualizado / atraso na curadoria"),
    ("R3", "R06", "Disponibilidade de 99,9% numa única VPS"),
    ("R4", "R07", "LGPD, dados pessoais e controle de acesso"),
    ("R5", "encerrado", "Runtime Node.js sem suporte (A3 concluída na sprint 5)"),
    ("R6", "R05", "Sobrecarga acadêmica da equipe"),
    ("R7", "R13", "Rampa mais lenta dos contratados (CR-01)"),
    ("R8", "R15", "Tráfego abaixo do cenário base (CR-01)"),
    ("R9", "R16", "Governança e diluição com o novo sócio (CR-01)"),
    ("R10", "removido", "Trabalho no recesso: retirado, pois o plano prevê que ninguém trabalha de 21/12/2026 a 03/01/2027"),
]
new = (
    heading("5. Balanço de riscos", 1)
    + para("A partir desta versão o projeto usa um registro único: a Matriz de Riscos v3, com 16 riscos, probabilidade e impacto de 1 a 3 e score = P × I. Ela reúne os 14 riscos da Matriz v2 e 2 riscos da CR-01 deste relatório. Cada risco tem mitigação (prevenção), plano de contingência (correção), responsável e status em 22/11.")
    + heading("5.1 Situação no corte (22/11/2026)", 2)
    + table([2300, 1500, 5838], ["Indicador", "Valor", "Leitura"], bal)
    + para("Nenhum risco se materializou e a reserva de contingência não foi usada. As ações A1, A2, A4 e A5 foram concluídas (A1 na sprint 6 e as demais em 13/11), com R06 e R07 em mitigação parcial. Os riscos de score 9 têm o próximo ponto de verificação no beta do R1 (27/11).", italic=True)
    + heading("5.2 Correspondência com a numeração anterior", 2)
    + table([1300, 1500, 6838], ["Relatórios anteriores", "Matriz v3", "Risco"], corr)
)
x = rep(heading("6. Pontos de atenção e ações", 1), new + heading("6. Pontos de atenção e ações", 1))

# ---------- r3: reserva, tabela 2.3 e explicação do orçamento total ----------
_i23 = x.index("2.3 Antes × depois")
_j23 = x.index("As horas não mudaram")
_reg = x[_i23:_j23]
# a tabela mostra só o efeito do valor-hora (base sem a proposta); a reserva e o orçamento com a proposta vêm no parágrafo abaixo
_reg = rep(T("Reserva de contingência (10% do BAC)"), T("Reserva de contingência (10% do BAC, sem a proposta)"), src=_reg)
_reg = rep(T("Orçamento total"), T("Orçamento total (sem a proposta)"), src=_reg)
x = x[:_i23] + _reg + x[_j23:]
_k = x.index("</w:p>", x.index("As horas não mudaram")) + len("</w:p>")
_RF = '<w:rFonts w:ascii="Arial" w:cs="Arial" w:eastAsia="Arial" w:hAnsi="Arial"/>'
_par = ('<w:p><w:pPr><w:spacing w:after="100" w:line="276"/></w:pPr><w:r><w:rPr>' + _RF + '<w:b/><w:bCs/></w:rPr>' + T("Com a proposta de investimento (CR-01): ") + '</w:r>'
        '<w:r><w:rPr>' + _RF + '</w:rPr>' + T("a tabela acima mostra só o efeito do valor-hora, sem a proposta (reserva de R$ 18.960,00 = 10% × R$ 189.600 e orçamento total de R$ 209.600,00). "
        "Com a proposta, o BAC sobe para R$ 193.286,52 e a reserva de contingência é 10% × R$ 193.286,52 = R$ 19.328,65. "
        "Orçamento total = R$ 193.286,52 + R$ 19.328,65 + R$ 1.040,00 de infraestrutura = R$ 213.655,17. "
                "A reserva, somada ao BAC, compõe a linha de base de custos.") + '</w:r></w:p>')
x = x[:_k] + _par + x[_k:]
x = rep("Reserva de contingência: R$ 18.960,00 (10% do BAC revisado), intacta.",
        "Reserva de contingência: R$ 19.328,65 = 10% × R$ 193.286,52 (BAC com a proposta), intacta; sem a proposta seria 10% × R$ 189.600,00 = R$ 18.960,00.")
x = rep("iguala o aporte em 12 meses", "iguala o aporte em 11,9 meses")
x = rep(T("Reserva de contingência do aporte (15%)"), T("Folga de caixa do aporte (15%)"))
x = rep("Ganho líquido (receita antecipada − custo extra)", "Ganho líquido da antecipação (receita antecipada − custo extra)")
x = rep("quando o tráfego real já pode ser medido.", "quando o tráfego real já pode ser medido. O aporte de R$ 60.000,00 é medido pelo payback (11,9 meses no cenário base), não pelo ganho líquido.")

# ---------- Anexo A: premissas adotadas ----------
x = rep("Premissas a validar pelo grupo", "Premissas adotadas")
x = rep("Por que validar", "Observação")
x = rep("Precisa bater com a lista enviada pela GP no Moodle (13/11)", "Conforme a lista de integrantes e níveis enviada pela GP no Moodle (13/11)")
x = rep("Estimativa de mercado 2026; trocar por pesquisa salarial se houver", "Estimativa de mercado para 2026")
x = rep("Confirmar a divisão combinada pelo grupo", "Premissa do grupo: divisão igual entre os 5 fundadores")
x = rep("Validar registro final da ADR-005 (PostgreSQL) no repositório antes do Beta do R1 (27/11)",
        "Registro final da ADR-005 (PostgreSQL) no repositório antes do Beta do R1 (27/11/2026)")

# ---------- anexo: premissa de quadro de riscos ----------
open(p, "w", encoding="utf8").write(x)

# ---------- metadados ----------
c = f"{D}/docProps/core.xml"
cx = open(c, encoding="utf8").read()
cx = re.sub(r"RS-HDX-2026-11 v2(\.1)?", "RS-HDX-2026-11 v3.0", cx)
open(c, "w", encoding="utf8").write(cx)
print("ok")
