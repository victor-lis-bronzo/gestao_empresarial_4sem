"""Memória de cálculo única do HardDex (corte 12/11/2026).

Gera numeros.json, lido pelo gerador do .gan, dos gráficos e do .docx.
Todos os valores monetários em R$; horas em h.
"""
import json
from datetime import date, timedelta
from pathlib import Path

OUT = Path(__file__).with_name("numeros.json")

# ---------------------------------------------------------------- premissas
CORTE = date(2026, 11, 12)
CORTE_ANTERIOR = date(2026, 10, 12)
TAXA_ANTIGA = 40.0
HORAS_SEMANA_PESSOA = 5          # 12,5% de 40 h, como no .gan original
HORAS_MES_PRODUTIVAS = 160       # base para converter salário em custo-hora
FATOR_CUSTO_EMPRESA = 1.70       # encargos CLT + benefícios (~70% sobre o salário)
SEMANAS_MES = 52 / 12

# salário-base mensal de referência (estimativa de mercado 2026) por nível
NIVEIS = {
    "GP": {"nome": "Gerente de Projeto", "salario": 10_350},
    "Sr": {"nome": "Sênior", "salario": 9_400},
    "Pl": {"nome": "Pleno", "salario": 6_600},
    "Jr": {"nome": "Júnior", "salario": 4_200},
}


def custo_hora(salario):
    """custo-empresa por hora, arredondado para múltiplo de R$ 5."""
    bruto = salario * FATOR_CUSTO_EMPRESA / HORAS_MES_PRODUTIVAS
    return round(bruto / 5) * 5, bruto


for k, v in NIVEIS.items():
    v["taxa"], v["taxa_bruta"] = custo_hora(v["salario"])

EQUIPE = [
    {"id": 0, "nome": "Mirela Andressa de Oliveira", "curto": "Mirela", "papel": "Gerente do Projeto", "nivel": "GP"},
    {"id": 3, "nome": "Victor Lis Bronzo", "curto": "Victor", "papel": "Líder Técnico (Dev Full-Stack)", "nivel": "Sr"},
    {"id": 1, "nome": "Ana Tayná Reis Maciel", "curto": "Ana", "papel": "Back-End", "nivel": "Pl"},
    {"id": 2, "nome": "Mariana Mourão Sampaio", "curto": "Mariana", "papel": "Banco de Dados e QA", "nivel": "Pl"},
    {"id": 4, "nome": "Yago Barbosa Dini", "curto": "Yago", "papel": "Front-End", "nivel": "Jr"},
]
for p in EQUIPE:
    p["taxa"] = NIVEIS[p["nivel"]]["taxa"]

N = len(EQUIPE)
H_SEMESTRE = 400
H_TOTAL = 2400
H_PESSOA_SEMESTRE = H_SEMESTRE / N        # 80 h
CUSTO_HORA_EQUIPE = sum(p["taxa"] for p in EQUIPE)   # custo de 1 h de cada um
TAXA_MEDIA = CUSTO_HORA_EQUIPE / N

assert N * HORAS_SEMANA_PESSOA * 2 == 50  # sprint quinzenal = 50 h


def custo_equipe(horas):
    """horas da equipe divididas igualmente (alocação de 12,5% para todos)."""
    return horas * TAXA_MEDIA


# ---------------------------------------------------------------- 1. valor-hora antes x depois
BAC_ANTIGO = H_TOTAL * TAXA_ANTIGA
BAC_NOVO = custo_equipe(H_TOTAL)
CUSTO_SEMESTRE = custo_equipe(H_SEMESTRE)
assert abs(BAC_NOVO - sum(H_TOTAL / N * p["taxa"] for p in EQUIPE)) < 0.01

mensal_antigo_pessoa = TAXA_ANTIGA * HORAS_SEMANA_PESSOA * SEMANAS_MES

# ---------------------------------------------------------------- 2. EVM em 12/11/2026
H_S1_S3 = 1200
H_S4_CORTE = 289   # pauta GP.pdf: 289 de 400 h (sprints 1-5 = 250 h + 39 h da sprint 6)
H_VA = H_S1_S3 + H_S4_CORTE
assert H_VA == 1489
H_VP = H_VA        # sprint 6 (02/11-15/11) no dia 11 de 14: 50*11/14 = 39,3 h planejadas
H_CR = H_VA        # horas apontadas = horas aceitas (nenhum retrabalho apontado)

VP, VA, CR = (custo_equipe(h) for h in (H_VP, H_VA, H_CR))
evm = {
    "H_VP": H_VP, "H_VA": H_VA, "H_CR": H_CR,
    "VP": VP, "VA": VA, "CR": CR,
    "VPr": VA - VP, "VC": VA - CR,
    "IDP": VA / VP, "IDC": VA / CR,
    "EPT": BAC_NOVO - VA, "H_EPT": H_TOTAL - H_VA,
    "ENT": CR + (BAC_NOVO - VA) / (VA / CR),
    "IDPT": (BAC_NOVO - VA) / (BAC_NOVO - CR),
    "avanco": H_VA / H_TOTAL,
    "avanco_s4": H_S4_CORTE / H_SEMESTRE,
}
evm_antigo = {
    "VA_12_10": 1386 * TAXA_ANTIGA,
    "VA_12_11": H_VA * TAXA_ANTIGA,
    "EPT_12_11": (H_TOTAL - H_VA) * TAXA_ANTIGA,
}
RESERVA_ANTIGA = 0.10 * BAC_ANTIGO
RESERVA_NOVA = 0.10 * BAC_NOVO
INFRA = 1040.0
INFRA_INCORRIDO = 60 * 3 + 40   # VPS set/out/nov + domínio 2026

# ---------------------------------------------------------------- 3. cronograma base x acelerado
R1 = date(2026, 12, 6)
H_R1_RESTANTE = 2400 - 800 - H_VA     # 111 h até o R1 (fora o R2/R3)
assert H_R1_RESTANTE == 111
H_R2 = 400
H_R3 = 400

BASE_R2 = date(2027, 6, 27)
BASE_R3 = date(2027, 12, 7)

INICIO_ACEL = date(2026, 12, 7)          # segunda após o R1
RECESSO = (date(2026, 12, 21), date(2027, 1, 3))
S5 = (date(2027, 3, 8), date(2027, 6, 27))
S6 = (date(2027, 8, 16), date(2027, 12, 5))

CONTRATADOS = [
    {"id": 5, "nome": "Dev Pleno contratado (full-stack)", "curto": "Contratado Pl", "papel": "Dev Full-Stack (contratado)", "nivel": "Pl", "h_semana": 20},
    {"id": 6, "nome": "Dev Júnior contratado (front-end)", "curto": "Contratado Jr", "papel": "Front-End (contratado)", "nivel": "Jr", "h_semana": 20},
]
for c in CONTRATADOS:
    c["taxa"] = NIVEIS[c["nivel"]]["taxa"]

RAMPA = [0.50, 0.50, 0.75, 0.75]         # semanas 1-2 e 3-4; depois 0,90
PROD_PLENA = 0.90
FATOR_COORD = 0.90                        # canais: 5 pessoas = 10, 7 pessoas = 21
H_ONBOARD_VICTOR = 2                      # h/semana de revisão e mentoria (fora do 5 h dele)


def canais(n):
    return n * (n - 1) // 2


def em(d, faixa):
    return faixa[0] <= d <= faixa[1]


def simular():
    semana = INICIO_ACEL
    feito = 0.0
    sem_contratado = 0
    linhas = []
    marcos = {}
    h_equipe = h_contr = h_onb = 0.0
    custo_contr = 0.0
    while feito < H_R2 + H_R3:
        fim_semana = semana + timedelta(days=6)
        if em(semana, RECESSO):
            linhas.append({"semana": semana.isoformat(), "efetivo": 0, "acum": feito, "obs": "recesso"})
            semana += timedelta(days=7)
            continue
        equipe_h = N * HORAS_SEMANA_PESSOA if (em(semana, S5) or em(semana, S6)) else 0
        prod = RAMPA[sem_contratado] if sem_contratado < len(RAMPA) else PROD_PLENA
        contr_pago = sum(c["h_semana"] for c in CONTRATADOS)
        contr_ef = contr_pago * prod
        efetivo = (equipe_h + contr_ef) * FATOR_COORD
        faltando = H_R2 + H_R3 - feito
        frac = min(1.0, faltando / efetivo)
        feito += efetivo * frac
        h_equipe += equipe_h * frac
        h_contr += contr_pago * frac
        h_onb += H_ONBOARD_VICTOR * frac
        custo_contr += sum(c["h_semana"] * c["taxa"] for c in CONTRATADOS) * frac
        sem_contratado += 1
        if "R2" not in marcos and feito >= H_R2:
            marcos["R2"] = fim_semana
        if feito >= H_R2 + H_R3 - 1e-9:
            marcos["R3"] = fim_semana
        linhas.append({"semana": semana.isoformat(), "equipe_h": equipe_h, "contr_pago": contr_pago,
                       "prod": prod, "efetivo": round(efetivo * frac, 2), "acum": round(feito, 2)})
        semana += timedelta(days=7)
    return {
        "linhas": linhas, "R2": marcos["R2"], "R3": marcos["R3"],
        "h_equipe": h_equipe, "h_contr": h_contr, "h_onb": h_onb, "custo_contr": custo_contr,
        "semanas_contr": sem_contratado,
    }


sim = simular()
ACEL_R2, ACEL_R3 = sim["R2"], sim["R3"]
sem_ganhas_R2 = (BASE_R2 - ACEL_R2).days / 7
sem_ganhas_R3 = (BASE_R3 - ACEL_R3).days / 7

# curva acumulada do cenário base (para gráfico)
def curva_base():
    pts = []
    semana = INICIO_ACEL
    feito = 0.0
    while semana <= BASE_R3:
        if em(semana, S5) or em(semana, S6):
            feito = min(800, feito + N * HORAS_SEMANA_PESSOA)
        pts.append({"semana": semana.isoformat(), "acum": feito})
        semana += timedelta(days=7)
    return pts


# custos econômicos pós-R1 (R2 + R3)
custo_base_pos_r1 = custo_equipe(H_R2 + H_R3)
custo_acel_equipe = custo_equipe(sim["h_equipe"])
custo_acel_onb = sim["h_onb"] * NIVEIS["Sr"]["taxa"]
custo_acel_pos_r1 = custo_acel_equipe + sim["custo_contr"] + custo_acel_onb
horas_acel_pos_r1 = sim["h_equipe"] + sim["h_contr"] + sim["h_onb"]
delta_custo = custo_acel_pos_r1 - custo_base_pos_r1
delta_horas = horas_acel_pos_r1 - (H_R2 + H_R3)
custo_semana_ganha = delta_custo / sem_ganhas_R3

# horas da equipe liberadas (sobram do calendário S5/S6 para novo escopo)
h_equipe_liberada = (H_R2 + H_R3) - sim["h_equipe"]

H_TOTAL_ACEL = 1600 + horas_acel_pos_r1
BAC_ACEL = custo_equipe(1600) + custo_acel_pos_r1

# ---------------------------------------------------------------- 4. captação e ações
CAIXA = {
    "Contratados (horas x custo-hora)": sim["custo_contr"],
    "Recrutamento, contas e ferramentas": 3_000.0,
    "Infra extra: 2ª VPS e monitoramento (12 meses)": 1_200.0,
}
caixa_sub = sum(CAIXA.values())
RESERVA_CAIXA = 0.15 * caixa_sub
captacao_calc = caixa_sub + RESERVA_CAIXA
CAPTACAO = 60_000.0
assert CAPTACAO >= captacao_calc

# valuation
H_ATE_R1 = 1600
custo_reposicao = custo_equipe(H_ATE_R1) + INFRA_INCORRIDO + 60 + 0  # + VPS de dez
BERKUS = {
    "Ideia sólida (valor básico)": 70_000,
    "Protótipo / tecnologia (R1 em produção)": 90_000,
    "Qualidade da equipe de gestão": 60_000,
    "Relações estratégicas (afiliados)": 20_000,
    "Lançamento / vendas": 0,
}
berkus = sum(BERKUS.values())
PRE_MONEY = 240_000.0
POS_MONEY = PRE_MONEY + CAPTACAO
PCT = CAPTACAO / POS_MONEY
assert abs(PCT - 0.20) < 1e-9
cap_antes = [{"socio": p["curto"], "pct": 1 / N} for p in EQUIPE]
cap_depois = [{"socio": p["curto"], "pct": (1 / N) * (1 - PCT)} for p in EQUIPE] + [{"socio": "Investidor", "pct": PCT}]
assert abs(sum(c["pct"] for c in cap_depois) - 1) < 1e-9
TRANCHES = [
    {"parcela": 1, "valor": 30_000.0, "gatilho": "Aprovação da proposta e Release R1 (v1.0.0) aceita", "data": "07/12/2026"},
    {"parcela": 2, "valor": 30_000.0, "gatilho": "Release R2 (v1.1.0) entregue no cenário acelerado", "data": ACEL_R2.strftime("%d/%m/%Y")},
]

# ---------------------------------------------------------------- 5. retorno (custo do atraso)
CENARIOS = {
    "Pessimista": {"visitas": 4_000, "clique": 0.10, "conversao": 0.02, "ticket": 3_000, "comissao": 0.03},
    "Base": {"visitas": 8_000, "clique": 0.15, "conversao": 0.03, "ticket": 3_500, "comissao": 0.04},
    "Otimista": {"visitas": 15_000, "clique": 0.20, "conversao": 0.04, "ticket": 4_000, "comissao": 0.05},
}
meses_antecipados = (BASE_R2 - ACEL_R2).days / 30.44
FIM_HORIZONTE = date(2027, 12, 31)
meses_receita_base = (FIM_HORIZONTE - BASE_R2).days / 30.44
meses_receita_acel = (FIM_HORIZONTE - ACEL_R2).days / 30.44
for nome, c in CENARIOS.items():
    compras = c["visitas"] * c["clique"] * c["conversao"]
    c["compras"] = compras
    c["receita_mes"] = compras * c["ticket"] * c["comissao"]
    c["receita_antecipada"] = c["receita_mes"] * meses_antecipados
    c["receita_2027_base"] = c["receita_mes"] * meses_receita_base
    c["receita_2027_acel"] = c["receita_mes"] * meses_receita_acel
    c["payback_meses"] = CAPTACAO / c["receita_mes"]
    c["ganho_liquido"] = c["receita_antecipada"] - delta_custo

# ---------------------------------------------------------------- saída
d = lambda x: x.isoformat()
numeros = {
    "corte": d(CORTE),
    "premissas": {
        "taxa_antiga": TAXA_ANTIGA, "horas_semana_pessoa": HORAS_SEMANA_PESSOA,
        "horas_mes_produtivas": HORAS_MES_PRODUTIVAS, "fator_custo_empresa": FATOR_CUSTO_EMPRESA,
        "rampa": RAMPA, "prod_plena": PROD_PLENA, "fator_coord": FATOR_COORD,
        "h_onboard_victor": H_ONBOARD_VICTOR, "canais_5": canais(5), "canais_7": canais(7),
    },
    "niveis": NIVEIS,
    "equipe": EQUIPE,
    "contratados": CONTRATADOS,
    "valor_hora": {
        "taxa_media": TAXA_MEDIA, "custo_hora_equipe": CUSTO_HORA_EQUIPE,
        "bac_antigo": BAC_ANTIGO, "bac_novo": BAC_NOVO, "custo_semestre": CUSTO_SEMESTRE,
        "custo_semestre_antigo": H_SEMESTRE * TAXA_ANTIGA,
        "mensal_antigo_pessoa": mensal_antigo_pessoa,
        "mensal_novo_pessoa": {p["curto"]: p["taxa"] * HORAS_SEMANA_PESSOA * SEMANAS_MES for p in EQUIPE},
        "horas_pessoa_total": H_TOTAL / N,
        "custo_pessoa_total": {p["curto"]: H_TOTAL / N * p["taxa"] for p in EQUIPE},
        "reserva_antiga": RESERVA_ANTIGA, "reserva_nova": RESERVA_NOVA,
        "infra": INFRA, "infra_incorrido": INFRA_INCORRIDO,
        "orcamento_total_antigo": BAC_ANTIGO + RESERVA_ANTIGA + INFRA,
        "orcamento_total_novo": BAC_NOVO + RESERVA_NOVA + INFRA,
    },
    "evm": evm,
    "evm_antigo": evm_antigo,
    "cronograma": {
        "R1": d(R1), "h_r1_restante": H_R1_RESTANTE,
        "base_R2": d(BASE_R2), "base_R3": d(BASE_R3),
        "acel_R2": d(ACEL_R2), "acel_R3": d(ACEL_R3),
        "sem_ganhas_R2": sem_ganhas_R2, "sem_ganhas_R3": sem_ganhas_R3,
        "inicio_acel": d(INICIO_ACEL), "recesso": [d(x) for x in RECESSO],
        "S5": [d(x) for x in S5], "S6": [d(x) for x in S6],
        "semanas_contr": sim["semanas_contr"],
        "linhas": sim["linhas"], "curva_base": curva_base(),
    },
    "aceleracao": {
        "h_equipe": sim["h_equipe"], "h_contr": sim["h_contr"], "h_onb": sim["h_onb"],
        "custo_contr": sim["custo_contr"], "custo_acel_equipe": custo_acel_equipe,
        "custo_acel_onb": custo_acel_onb,
        "custo_base_pos_r1": custo_base_pos_r1, "custo_acel_pos_r1": custo_acel_pos_r1,
        "horas_base_pos_r1": H_R2 + H_R3, "horas_acel_pos_r1": horas_acel_pos_r1,
        "delta_custo": delta_custo, "delta_horas": delta_horas,
        "custo_semana_ganha": custo_semana_ganha,
        "caixa_semana_ganha": CAPTACAO / sem_ganhas_R3,
        "h_equipe_liberada": h_equipe_liberada,
        "h_total_acel": H_TOTAL_ACEL, "bac_acel": BAC_ACEL,
    },
    "investimento": {
        "caixa": CAIXA, "caixa_sub": caixa_sub, "reserva_caixa": RESERVA_CAIXA,
        "captacao_calc": captacao_calc, "captacao": CAPTACAO,
        "custo_reposicao": custo_reposicao, "berkus": BERKUS, "berkus_total": berkus,
        "pre_money": PRE_MONEY, "pos_money": POS_MONEY, "pct": PCT,
        "cap_antes": cap_antes, "cap_depois": cap_depois, "tranches": TRANCHES,
    },
    "retorno": {
        "cenarios": CENARIOS, "meses_antecipados": meses_antecipados,
        "meses_receita_base": meses_receita_base, "meses_receita_acel": meses_receita_acel,
    },
}

if __name__ == "__main__":
    OUT.write_text(json.dumps(numeros, ensure_ascii=False, indent=1, default=str))
    v, e, a, i = numeros["valor_hora"], evm, numeros["aceleracao"], numeros["investimento"]
    print("niveis", {k: (x["salario"], x["taxa"], round(x["taxa_bruta"], 2)) for k, x in NIVEIS.items()})
    print("taxa media", TAXA_MEDIA, "BAC", BAC_ANTIGO, "->", BAC_NOVO, "semestre", CUSTO_SEMESTRE)
    print("mensal antigo/pessoa", round(mensal_antigo_pessoa, 2))
    print("EVM", {k: round(x, 2) for k, x in e.items()})
    print("R2", ACEL_R2, "R3", ACEL_R3, "sem ganhas", round(sem_ganhas_R2, 1), round(sem_ganhas_R3, 1), "semanas contr", sim["semanas_contr"])
    print("acel", {k: round(x, 1) for k, x in a.items()})
    print("caixa", round(caixa_sub, 2), "reserva", round(RESERVA_CAIXA, 2), "capt calc", round(captacao_calc, 2))
    print("reposicao", custo_reposicao, "berkus", berkus, "pct", PCT)
    for n, c in CENARIOS.items():
        print(n, {k: round(x, 1) for k, x in c.items()})
    print("meses antecipados", round(meses_antecipados, 2))
