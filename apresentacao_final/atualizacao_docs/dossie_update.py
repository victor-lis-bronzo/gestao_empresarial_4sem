"""Dossiê: Matriz de Riscos v3 (16 riscos), balanço de riscos e referência ao Status Report v3.0.
Uso: python dossie_update.py <pasta_descompactada>"""
import sys
from xml.sax.saxutils import escape

p = f"{sys.argv[1]}/word/document.xml"
x = open(p, encoding="utf8").read()


def rep(old, new):
    global x
    assert x.count(old) == 1, (old[:80], x.count(old))
    x = x.replace(old, new)


rep("A versão atualizada da matriz reúne 14 (quatorze) riscos mapeados e alinhados ao Cronograma v2,",
    "A versão atualizada da matriz (v3) reúne 16 (dezesseis) riscos mapeados e alinhados ao Cronograma v2,")
rep("e gargalo de mentoria sobre o Líder Técnico).",
    "e gargalo de mentoria sobre o Líder Técnico), além de dois riscos de negócio da CR-01 incorporados do Status Report v3.0: "
    "tráfego abaixo do cenário base (R15) e governança com o novo sócio (R16).")
rep(" (corte 12/11/2026) e realização da reunião dos GPs;",
    " (v2.0, corte 12/11/2026; atualizado para a v3.0 com corte em 22/11/2026) e realização da reunião dos GPs;")

rep("plataforma omnicanal (Web e Mobile)", "plataforma web")

RF = '<w:rFonts w:ascii="Arial" w:cs="Arial" w:eastAsia="Arial" w:hAnsi="Arial"/>'
h2 = ('<w:p><w:pPr><w:pStyle w:val="Heading2"/><w:jc w:val="left"/><w:rPr/></w:pPr><w:r><w:rPr>' + RF +
      '<w:b w:val="1"/><w:bCs w:val="1"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr>'
      '<w:t xml:space="preserve">3.1 Balanço de Riscos (corte 22/11/2026)</w:t></w:r></w:p>')


def body(t):
    return ('<w:p><w:pPr><w:spacing w:line="360" w:lineRule="auto"/><w:ind w:firstLine="708"/><w:jc w:val="both"/><w:rPr/></w:pPr>'
            '<w:r><w:rPr>' + RF + '<w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr>'
            f'<w:t xml:space="preserve">{escape(t)}</w:t></w:r></w:p>')


txt1 = ("No corte de 22/11/2026, os 16 riscos estão distribuídos em 2 críticos (score 9: R02 e R10), 9 médios (score 6) "
        "e 5 baixos (score ≤ 4), com score médio de 5,6. Nenhum risco se materializou e a reserva de contingência de "
        "R$ 19.328,65 (10% × R$ 193.286,52, o BAC com a proposta; sem a proposta seria 10% × R$ 189.600 = R$ 18.960,00) permanece intacta.")
txt2 = ("As ações A1 (sprint 6), A2, A4 e A5 (13/11/2026) foram concluídas e tratam R11 (busca por Full-Text Search do PostgreSQL, ADR-005), "
        "R03 (protocolo do catálogo), R06 (backup e monitoramento) e R07 (checklist LGPD); R06 e R07 seguem com mitigação parcial. O próximo gatilho é 27/11/2026: "
        "o Beta do R1 valida R02 (o R10 só dá para testar quando o R2 entregar o redirecionamento de afiliados), a decisão da CR-01 resolve R12 e a minuta do acordo de acionistas trata R16. "
        "O status de cada risco e o balanço completo estão na planilha (coluna “Status em 22/11” e aba “Balanço”).")
anchor = "governança com o novo sócio (R16)."
i = x.find(anchor)
e = x.find("</w:p>", i) + len("</w:p>")
x = x[:e] + h2 + body(txt1) + body(txt2) + x[e:]
open(p, "w", encoding="utf8").write(x)
print("ok")
