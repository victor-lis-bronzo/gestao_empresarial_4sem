"""Gera a versão de 10 minutos a partir do deck completo (28 slides), sem alterar o original.

Deck principal: 19 slides (o que o professor cobrou e o núcleo do Status Report).
Depois do encerramento: um divisor "ANEXO" e os 9 slides de apoio para perguntas.
As notas do orador acompanham cada slide.

Uso: python3 -I versao_10min.py "Gestão - HardDex v3.pptx" "Gestão - HardDex v3 (10 min).pptx"
"""
import re
import sys
import uuid
import zipfile

PRINCIPAL = [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 19, 26, 27, 28]
ANEXO = [6, 9, 18, 20, 21, 22, 23, 24, 25]
assert sorted(PRINCIPAL + ANEXO) == list(range(1, 29))

# textos que passam para as notas porque o slide de origem foi para o anexo
NOTAS_EXTRA = {
    10: ("porque o time novo precisa aprender e a equipe perde tempo ensinando.",
         " Até aqui o semestre está em 81,25%: 325 de 400 h feitas (300 h das sprints 1 a 6 mais 25 h da sprint 7)."),
    26: ("com R06 e R07 em mitigação parcial.",
         " Entre os riscos da proposta, o R12 (proposta recusada ou parcela atrasada) e o R14 (gargalo no líder técnico) têm nota 6; o detalhe está no anexo."),
}

src, dst = sys.argv[1], sys.argv[2]
zin = zipfile.ZipFile(src)
files = {n: zin.read(n) for n in zin.namelist()}
DIV = 29  # novo slide divisor, copiado do encerramento (slide 28)

# ---------- divisor "ANEXO" ----------
s28 = files["ppt/slides/slide28.xml"].decode("utf8")
for old, new in [("A EQUIPE AGRADECE", "ANEXO"), ("SUA ATENÇÃO.", ""), ("PERGUNTAS?", "MATERIAL DE APOIO")]:
    assert s28.count(f"<a:t>{old}</a:t>") == 1, old
    s28 = s28.replace(f"<a:t>{old}</a:t>", f"<a:t>{new}</a:t>")
files[f"ppt/slides/slide{DIV}.xml"] = s28.encode("utf8")
rels = files["ppt/slides/_rels/slide28.xml.rels"].decode("utf8")
rels = re.sub(r'<Relationship [^>]*relationships/notesSlide"[^>]*/>', "", rels)  # divisor sem nota
files[f"ppt/slides/_rels/slide{DIV}.xml.rels"] = rels.encode("utf8")
ct = files["[Content_Types].xml"].decode("utf8")
over = '<Override PartName="/ppt/slides/slide28.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>'
assert ct.count(over) == 1
files["[Content_Types].xml"] = ct.replace(over, over + over.replace("slide28.xml", f"slide{DIV}.xml")).encode("utf8")

prels = files["ppt/_rels/presentation.xml.rels"].decode("utf8")
rid_of = {int(n): r for r, n in re.findall(r'Id="(rId\d+)"[^>]*Target="slides/slide(\d+)\.xml"', prels)}
assert len(rid_of) == 28
new_rid = "rId%d" % (max(int(x) for x in re.findall(r'Id="rId(\d+)"', prels)) + 1)
prels = prels.replace("</Relationships>",
    f'<Relationship Id="{new_rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{DIV}.xml"/></Relationships>')
files["ppt/_rels/presentation.xml.rels"] = prels.encode("utf8")
rid_of[DIV] = new_rid

# ---------- ordem dos slides e seções ----------
pres = files["ppt/presentation.xml"].decode("utf8")
sid_of = {}
for sid, rid in re.findall(r'<p:sldId id="(\d+)" r:id="(rId\d+)"/>', pres):
    n = next(k for k, v in rid_of.items() if v == rid)
    sid_of[n] = int(sid)
sid_of[DIV] = max(sid_of.values()) + 1
ordem = PRINCIPAL + [DIV] + ANEXO
lst = "<p:sldIdLst>" + "".join(f'<p:sldId id="{sid_of[n]}" r:id="{rid_of[n]}"/>' for n in ordem) + "</p:sldIdLst>"
pres, k = re.subn(r"<p:sldIdLst>.*?</p:sldIdLst>", lst, pres, flags=re.S)
assert k == 1


def secao(nome, nums):
    ids = "".join(f'<p14:sldId id="{sid_of[n]}"/>' for n in nums)
    return f'<p14:section name="{nome}" id="{{{uuid.uuid4()}}}"><p14:sldIdLst>{ids}</p14:sldIdLst></p14:section>'


secoes = secao("Apresentação (10 min)", PRINCIPAL) + secao("Anexo", [DIV] + ANEXO)
pres, k = re.subn(r"(<p14:sectionLst[^>]*>).*?(</p14:sectionLst>)", lambda m: m.group(1) + secoes + m.group(2), pres, flags=re.S)
assert k == 1
files["ppt/presentation.xml"] = pres.encode("utf8")

# ---------- notas que absorvem os slides do anexo ----------
for n, (fim, extra) in NOTAS_EXTRA.items():
    p = f"ppt/notesSlides/notesSlide{n}.xml"
    x = files[p].decode("utf8")
    assert x.count(fim + "</a:t>") == 1, (n, fim)
    files[p] = x.replace(fim + "</a:t>", fim + extra + "</a:t>").encode("utf8")

# ---------- grava ([Content_Types].xml primeiro) ----------
with zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as zout:
    names = ["[Content_Types].xml"] + [n for n in files if n != "[Content_Types].xml"]
    for n in names:
        zout.writestr(n, files[n])
print("ok", dst, len(ordem), "slides")
