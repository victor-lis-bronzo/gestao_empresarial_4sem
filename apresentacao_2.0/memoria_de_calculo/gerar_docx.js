// Gera StatusReport_HardDex_v2.docx a partir de numeros.json + img/*.png
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  ImageRun, AlignmentType, HeadingLevel, Header, Footer, PageNumber, LevelFormat, BorderStyle,
  PageBreak, TableOfContents,
} = require("docx");

const HERE = __dirname;
const N = JSON.parse(fs.readFileSync(path.join(HERE, "numeros.json"), "utf8"));
const OUT = process.argv[2];

// ------------------------------------------------------------------ formatação pt-BR
const num = (x, d = 0) => Number(x).toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
const brl = (x, d = 2) => (x < 0 ? "−R$ " : "R$ ") + num(Math.abs(x), d);
const pct = (x, d = 2) => num(x * 100, d) + "%";
const dt = (iso) => { const [y, m, d] = iso.split("-"); return `${d}/${m}/${y}`; };

const V = N.valor_hora, E = N.evm, C = N.cronograma, A = N.aceleracao, I = N.investimento, R = N.retorno, P = N.premissas;
const NV = N.niveis;
const equipe = N.equipe, contr = N.contratados;
const cenarios = R.cenarios;
const taxaOldSalario = P.taxa_antiga * P.horas_mes_produtivas / P.fator_custo_empresa;

// ------------------------------------------------------------------ helpers de layout
const FONT = "Arial";
const W = 9638; // largura útil A4 com margens de 2 cm
const AZUL = "1F4E79", CINZA = "F2F2F2", AZUL_CLARO = "DCE6F2", VERDE = "E2F0D9", AMARELO = "FFF2CC";

const t = (text, o = {}) => new TextRun({ text, font: FONT, ...o });
const p = (content, o = {}) => new Paragraph({
  spacing: { after: 100, line: 276 }, ...o,
  children: (Array.isArray(content) ? content : [content]).map((c) => (typeof c === "string" ? t(c) : c)),
});
const h1 = (s) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [t(s)] });
const h2 = (s) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [t(s)] });
const bullet = (content) => new Paragraph({
  numbering: { reference: "bul", level: 0 }, spacing: { after: 60 },
  children: (Array.isArray(content) ? content : [content]).map((c) => (typeof c === "string" ? t(c) : c)),
});
const b = (s) => t(s, { bold: true });
const nota = (s) => p([t(s, { italics: true, size: 18, color: "595959" })]);
const brk = () => new Paragraph({ children: [new PageBreak()] });

const border = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };
const borders = { top: border, bottom: border, left: border, right: border };

function cell(content, width, o = {}) {
  const runs = (Array.isArray(content) ? content : [content]).map((c) =>
    typeof c === "string" || typeof c === "number" ? t(String(c), { size: 18, bold: !!o.bold, color: o.color }) : c);
  return new TableCell({
    width: { size: width, type: WidthType.DXA }, borders,
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 50, bottom: 50, left: 90, right: 90 },
    columnSpan: o.span,
    children: [new Paragraph({ alignment: o.align || AlignmentType.LEFT, children: runs })],
  });
}

// tabela: cabeçalho + linhas; cols = frações; align = array de "L"/"R"/"C"
function tabela(head, rows, fr, o = {}) {
  const tot = fr.reduce((a, x) => a + x, 0);
  const widths = fr.map((x) => Math.floor((x / tot) * W));
  widths[widths.length - 1] += W - widths.reduce((a, x) => a + x, 0);
  const al = (i) => ({ R: AlignmentType.RIGHT, C: AlignmentType.CENTER }[(o.align || [])[i]] || AlignmentType.LEFT);
  const trs = [];
  if (head) trs.push(new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, widths[i], { bold: true, fill: AZUL_CLARO, align: al(i) })) }));
  rows.forEach((r, ri) => {
    const destaque = (o.destaque || []).includes(ri);
    trs.push(new TableRow({ children: r.map((c, i) => cell(c, widths[i], { align: al(i), bold: destaque, fill: destaque ? CINZA : (o.fills || {})[`${ri},${i}`] })) }));
  });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: widths, rows: trs });
}

function pngSize(file) {
  const buf = fs.readFileSync(file);
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), buf };
}
function fig(nome, legenda, larguraPx = 620) {
  const { w, h, buf } = pngSize(path.join(HERE, "img", nome));
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 40 },
      children: [new ImageRun({ type: "png", data: buf, transformation: { width: larguraPx, height: Math.round((larguraPx * h) / w) },
        altText: { title: legenda, description: legenda, name: nome } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: [t(legenda, { italics: true, size: 18, color: "595959" })] }),
  ];
}
const caixa = (titulo, linhas, fill = AZUL_CLARO) => new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: [W],
  rows: [new TableRow({ children: [new TableCell({
    width: { size: W, type: WidthType.DXA }, borders, shading: { fill, type: ShadingType.CLEAR, color: "auto" },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [new Paragraph({ spacing: { after: 80 }, children: [t(titulo, { bold: true, color: AZUL })] }),
      ...linhas.map((l) => new Paragraph({ numbering: { reference: "bul", level: 0 }, spacing: { after: 40 },
        children: (Array.isArray(l) ? l : [l]).map((c) => (typeof c === "string" ? t(c, { size: 20 }) : c)) }))],
  })] })],
});

// ------------------------------------------------------------------ números derivados para o texto
const semR2 = num(C.sem_ganhas_R2, 0), semR3 = num(C.sem_ganhas_R3, 0);
const deltaPct = A.delta_custo / A.custo_base_pos_r1;
const base = cenarios["Base"], pess = cenarios["Pessimista"], otim = cenarios["Otimista"];
const capt = I.captacao;

// ================================================================== CONTEÚDO
const kids = [];

// ---------------- capa / cabeçalho
kids.push(
  new Paragraph({ spacing: { after: 60 }, children: [t("Relatório de Status de Projeto - HardDex", { bold: true, size: 36, color: AZUL })] }),
  p([t("RS-HDX-2026-11 · versão 2.0 · Período 13/10/2026 a 12/11/2026 · Data de corte: 12/11/2026", { size: 20 })]),
  p([t("Gestão de Projetos de Software (BRAGEPR) - IFSP Bragança Paulista, ADS · Avaliador: Prof. André Luis Maciel Leme · Entrega: 07/12/2026", { size: 18, color: "595959" })]),
);
kids.push(tabela(null, [
  [b("Nome do Projeto"), "HardDex - Simplificando o hardware! (plataforma web de comparação de hardware)", b("Percentual geral"), `${pct(E.avanco)} (${num(E.H_VA)} de 2.400 h)`],
  [b("Status do Projeto"), "VERDE (prazo e custo em dia)", b("Data de corte"), "12/11/2026"],
  [b("Patrocinador"), "Stakeholder investidor, a confirmar com a aprovação da CR-01 (antes: não se aplica)", b("Fase atual"), "S4 (2026/2) - Sprint 6 de 8 (02/11 a 15/11/2026)"],
  [b("Gerente do Projeto"), "Mirela Andressa de Oliveira (GP)", b("Próximo marco"), "Release R1 (v1.0.0) - 06/12/2026"],
  [b("Líder Técnico"), "Victor Lis Bronzo (Sr, Dev Full-Stack)", b("Mudança pendente"), "CR-01 - venda de 20% das ações para acelerar R2 e R3"],
  [b("Equipe"), { __multi: true }, b("Relatório anterior"), "RS-HDX-2026-10 v1.0 (corte 12/10/2026)"],
].map((r) => r.map((c) => (c && c.__multi ? "Ana Tayná Reis Maciel (Pl, Back-End); Mariana Mourão Sampaio (Pl, Banco de Dados e QA); Yago Barbosa Dini (Jr, Front-End)" : c))),
[1.3, 3.2, 1.3, 2.6]));

kids.push(p(""));
kids.push(caixa("Resumo executivo", [
  [b("Valor-hora corrigido. "), t(`O relatório anterior usava R$ 40,00/h igual para todos. Pelo custo-empresa por senioridade (GP, Sr, Pl, Jr), a média é ${brl(V.taxa_media)}/h e o BAC passa de ${brl(V.bac_antigo)} para ${brl(V.bac_novo)}.`, { size: 20 })],
  [b("Projeto em dia. "), t(`Em 12/11: ${num(E.H_VA)} h agregadas (${pct(E.avanco)}), VP = VA = CR = ${brl(E.VA)}, IDP = IDC = IDPT = 1,00. R1 mantido em 06/12/2026.`, { size: 20 })],
  [b("Proposta CR-01. "), t(`Vender ${pct(I.pct, 0)} das ações por ${brl(capt)} (pré-money ${brl(I.pre_money)}), para contratar 2 devs (1 Pl e 1 Jr, 20 h/semana) de 07/12/2026 até o R3.`, { size: 20 })],
  [b("Efeito no prazo. "), t(`R2 passa de ${dt(C.base_R2)} para ${dt(C.acel_R2)} (${semR2} semanas antes) e R3 de ${dt(C.base_R3)} para ${dt(C.acel_R3)} (${semR3} semanas antes).`, { size: 20 })],
  [b("Efeito no custo. "), t(`Custo econômico do R2+R3 sobe ${brl(A.delta_custo)} (+${pct(deltaPct, 1)}), com +${num(A.delta_horas)} h por causa da rampa e da coordenação (Lei de Brooks). O caixa novo é ${brl(capt)}, que só existe com o aporte.`, { size: 20 })],
  [b("Decisão pedida. "), t("Aprovar a CR-01 até 27/11/2026, com o aporte em 2 parcelas de R$ 30.000,00 vinculadas ao R1 e ao R2.", { size: 20 })],
]));

// ---------------- 1. resposta às observações
kids.push(brk(), h1("1. O que mudou desde a primeira apresentação"));
kids.push(p("Esta versão responde às observações feitas na apresentação de 12/10/2026. A tabela liga cada observação ao que estava errado e ao que foi corrigido."));
kids.push(tabela(["Observação", "O que estava errado", "Correção nesta versão"], [
  ["Os valores não parecem bater", `R$ 40,00/h de custo-empresa equivale a um salário de cerca de ${brl(taxaOldSalario, 0)}/mês, abaixo até de um Júnior (${brl(NV.Jr.salario, 0)}). A GP e o líder técnico custavam o mesmo que um iniciante.`, "Valor-hora por senioridade, uma memória de cálculo única (Anexo A) e a mesma base em todas as tabelas, no Gantt e nos gráficos."],
  ["As contas não consideravam o valor-hora", "BAC = 2.400 h × R$ 40,00, sem distinguir quem executa cada hora.", `BAC = Σ (horas de cada pessoa × custo-hora do nível) = ${brl(V.bac_novo)}.`],
  ["Faltavam métricas para a venda de ações", "A tese \"vender ações acelera\" não tinha datas, custo nem retorno.", "Simulação semanal da capacidade, custo por semana ganha, captação, valuation, quadro societário, retorno e sensibilidade (seção 4)."],
  ["Novo Gantt", "Gantt sem cenário de aceleração.", "HardDex_Cronograma_v2.gan com o cenário acelerado, a linha de base salva para comparar e recursos com custo-hora."],
  ["(revisão interna) Contradição na tese", "O relatório dizia IDPT = 1,00 e \"não precisamos acelerar\", e a proposta pedia dinheiro para acelerar.", "A aceleração não corrige atraso: antecipa a receita (o R2 traz o redirecionamento com afiliado) e libera a equipe para escopo novo (seção 4.1)."],
], [1.6, 3.2, 3.6]));

// ---------------- 2. valor-hora
kids.push(h1("2. Revisão de custos e valor-hora"));
kids.push(h2("2.1 Método"));
kids.push(p([t("O custo de uma hora para o projeto é o "), b("custo-empresa"), t(", não o salário: "), b(`custo-hora = salário-base × ${num(P.fator_custo_empresa, 2)} ÷ ${P.horas_mes_produtivas} h`), t(`. O fator ${num(P.fator_custo_empresa, 2)} cobre encargos CLT, férias, 13º e benefícios (cerca de 70% sobre o salário). As ${P.horas_mes_produtivas} h são as horas produtivas de um mês. O resultado é arredondado para múltiplos de R$ 5,00. Os salários são referências de mercado estimadas para 2026.`)]));
kids.push(tabela(["Nível", "Salário-base de referência", "Custo-hora calculado", "Custo-hora adotado"],
  ["GP", "Sr", "Pl", "Jr"].map((k) => [`${k} - ${NV[k].nome}`, brl(NV[k].salario), brl(NV[k].taxa_bruta), brl(NV[k].taxa)]),
  [2.4, 2.2, 2, 2], { align: ["L", "R", "R", "R"] }));
kids.push(h2("2.2 Equipe, nível e custo"));
kids.push(p(`Cada integrante trabalha ${P.horas_semana_pessoa} h por semana no projeto (alocação de 12,5%), igual para todos, como no cronograma original. São 80 h por semestre e ${num(V.horas_pessoa_total)} h por pessoa no projeto inteiro.`));
kids.push(tabela(["Integrante", "Papel", "Nível", "Custo-hora", "Custo/mês no projeto (5 h/sem)", "Custo total (480 h)"],
  [...equipe.map((e) => [e.nome, e.papel, e.nivel, brl(e.taxa), brl(V.mensal_novo_pessoa[e.curto]), brl(V.custo_pessoa_total[e.curto])]),
   ["Total / média", "", "", `${brl(V.taxa_media)} (média)`, brl(Object.values(V.mensal_novo_pessoa).reduce((a, x) => a + x, 0)), brl(V.bac_novo)]],
  [2.4, 2.2, 0.7, 1.2, 1.9, 1.6], { align: ["L", "L", "C", "R", "R", "R"], destaque: [5] }));
kids.push(...fig("valor_hora.png", "Figura 1 - Custo-hora por integrante comparado com o valor único antigo de R$ 40,00/h", 560));
kids.push(h2("2.3 Antes × depois"));
kids.push(tabela(["Item", "Relatório anterior (R$ 40/h)", "Revisado (por senioridade)", "Diferença"], [
  ["Valor-hora", brl(P.taxa_antiga), `${brl(V.taxa_media)} (média)`, `+${pct(V.taxa_media / P.taxa_antiga - 1, 1)}`],
  ["Custo de 1 semestre (400 h)", brl(V.custo_semestre_antigo), brl(V.custo_semestre), brl(V.custo_semestre - V.custo_semestre_antigo)],
  ["BAC (2.400 h)", brl(V.bac_antigo), brl(V.bac_novo), brl(V.bac_novo - V.bac_antigo)],
  ["Reserva de contingência (10% do BAC)", brl(V.reserva_antiga), brl(V.reserva_nova), brl(V.reserva_nova - V.reserva_antiga)],
  ["Infraestrutura (VPS + domínio, fora do BAC)", brl(V.infra), brl(V.infra), brl(0)],
  ["Orçamento total", brl(V.orcamento_total_antigo), brl(V.orcamento_total_novo), brl(V.orcamento_total_novo - V.orcamento_total_antigo)],
  ["VA em 12/11/2026 (1.489 h)", brl(N.evm_antigo.VA_12_11), brl(E.VA), brl(E.VA - N.evm_antigo.VA_12_11)],
  ["EPT em 12/11/2026 (911 h)", brl(N.evm_antigo.EPT_12_11), brl(E.EPT), brl(E.EPT - N.evm_antigo.EPT_12_11)],
], [3, 2.1, 2.1, 1.6], { align: ["L", "R", "R", "R"], destaque: [2, 5] }));
kids.push(p(""));
kids.push(p([t("As horas não mudaram: 2.400 h no total e 1.489 h agregadas. O que muda é o preço de cada hora. Por isso os índices (IDP, IDC, IDPT) continuam 1,00, mas os valores em reais quase dobram. "), b(`O custo antigo subestimava o projeto em ${pct(1 - V.bac_antigo / V.bac_novo, 1)}.`)]));
kids.push(...fig("curva_s.png", "Figura 2 - Curva S do valor planejado acumulado: R$ 40,00/h × valor-hora revisado", 600));

// ---------------- 3. cenário atual
kids.push(brk(), h1("3. Cenário atual (As Is em 12/11/2026)"));
kids.push(h2("3.1 Posição atual"));
kids.push(p(`O projeto registra ${pct(E.avanco)} de avanço global (${num(E.H_VA)} de 2.400 h). No S4 são 289 de 400 h (${pct(E.avanco_s4)}). As sprints 4 e 5 foram concluídas: login Google e controle Admin/Editor (tag v0.4.0), migração do runtime para a linha LTS do Node.js, pipeline de CI e CRUD de especificações e mídias. A sprint 6, em encerramento, concentra o catálogo público, as rotinas automatizadas de backup do MySQL e o monitoramento de disponibilidade.`));
kids.push(p(`To Be (06/12/2026): Release R1 (v1.0.0) em produção na VPS própria, com cadastro e login por e-mail e Google, catálogo 100% administrável (fabricantes, modelos, especificações e mídias) e gerenciamento do dicionário didático.`));
kids.push(h2("3.2 Desempenho (valor agregado) com valor-hora revisado"));
kids.push(tabela(["Indicador", "Fórmula", "Horas", "R$ (revisado)", "Leitura"], [
  ["BAC (VOT)", "Σ horas × custo-hora", "2.400", brl(V.bac_novo), "Orçamento no término"],
  ["VP (PV)", "planejado até 12/11", num(E.H_VP), brl(E.VP), "Sprint 6 no dia 11 de 14"],
  ["VA (EV)", "pacotes aceitos", num(E.H_VA), brl(E.VA), "PR aprovado + homologado"],
  ["CR (AC)", "horas apontadas × custo-hora", num(E.H_CR), brl(E.CR), "Custo real"],
  ["VPr (SV)", "VA − VP", "0", brl(E.VPr), "No prazo"],
  ["VC (CV)", "VA − CR", "0", brl(E.VC), "No orçamento"],
  ["IDP (SPI)", "VA ÷ VP", "", num(E.IDP, 2), "Ritmo planejado"],
  ["IDC (CPI)", "VA ÷ CR", "", num(E.IDC, 2), "Cada R$ 1 gasto agrega R$ 1"],
  ["EPT (ETC)", "(BAC − VA) ÷ IDC", num(E.H_EPT), brl(E.EPT), "Falta executar"],
  ["ENT (EAC)", "CR + EPT", "2.400", brl(E.ENT), "Término no orçamento"],
  ["IDPT (TCPI)", "(BAC − VA) ÷ (BAC − CR)", "", num(E.IDPT, 2), "Basta manter a eficiência"],
], [1.3, 2.4, 0.9, 1.6, 2.4], { align: ["L", "L", "R", "R", "L"] }));
kids.push(nota(`Reserva de contingência: ${brl(V.reserva_nova)} (10% do BAC revisado), intacta. Infraestrutura fora do BAC: ${brl(V.infra_incorrido)} incorridos de ${brl(V.infra)} previstos (VPS de set. a nov. e domínio de 2026).`));
kids.push(h2("3.3 Próximos passos até a entrega final"));
kids.push(tabela(["Quando", "O quê", "Responsável"], [
  ["13/11/2026", "Submissão da CR-01 ao stakeholder e das ações A2, A4 e A5", "Mirela; Mariana, Victor e Ana"],
  ["16/11 a 29/11", "Sprint 7: beta do R1 (v1.0.0-beta.1) em produção com acesso restrito e testes ponta a ponta", "Equipe"],
  ["27/11/2026", "Decisão do stakeholder sobre a CR-01", "Stakeholder / Mirela"],
  ["30/11 a 06/12", "Sprint 8: homologação (v1.0.0-rc.1) e estabilização do R1", "Mariana (QA) e equipe"],
  ["06/12/2026", "Release R1 (v1.0.0) e termo de aceite", "Mirela e equipe"],
  ["07/12/2026", "Entrega do Status Report na disciplina; início do cenário acelerado, se aprovado", "Mirela; Victor"],
], [1.6, 5.2, 2.2]));

// ---------------- 4. CR-01
kids.push(brk(), h1("4. Solicitação de Mudança CR-01: proposta de investimento"));
kids.push(h2("4.1 Por que acelerar um projeto que está em dia"));
kids.push(p([t("O IDPT = 1,00 mostra que o projeto termina no prazo e no custo "), b("da linha de base"), t(". O problema é a linha de base em si: a equipe só trabalha no projeto durante os semestres letivos, então o calendário tem duas janelas paradas (dezembro a março e julho a agosto), e o produto só gera receita a partir do R2, quando entram o comparador e o redirecionamento ao varejo com ID de afiliado (RGN-03).")]));
kids.push(bullet([b("Hoje: "), t(`receita só depois de ${dt(C.base_R2)} e produto completo em ${dt(C.base_R3)}.`)]));
kids.push(bullet([b("Com a CR-01: "), t(`receita a partir de ${dt(C.acel_R2)} e produto completo em ${dt(C.acel_R3)}. A equipe fica com cerca de ${num(A.h_equipe_liberada)} h livres no S5/S6 para escopo novo (por exemplo, alertas de preço ou app mobile, hoje fora do escopo), via nova solicitação de mudança.`)]));
kids.push(bullet([b("Por que precisa de ações: "), t("as horas da equipe são custo econômico (os sócios não recebem em dinheiro), mas contratados exigem caixa. Sem receita, a única fonte de caixa é um aporte do stakeholder em troca de participação.")]));
kids.push(h2("4.2 Alternativas avaliadas"));
kids.push(tabela(["Alternativa", "Efeito no prazo", "Custo / risco", "Decisão"], [
  ["A. Manter a linha de base", "R2 27/06/2027, R3 07/12/2027", "Sem custo novo; receita começa 3 meses mais tarde", "Plano B se a CR-01 for recusada"],
  ["B. Equipe trabalhar nas férias", "Antecipa parcialmente", "Sem caixa, mas eleva R6 (sobrecarga) e não é sustentável", "Descartada"],
  ["C. Contratar 2 devs com o aporte", `R2 ${semR2} e R3 ${semR3} semanas antes`, `+${brl(A.delta_custo)} econômico; ${brl(capt)} de caixa`, "Recomendada"],
  ["D. Reduzir escopo do R2/R3", "Antecipa, mas entrega menos", "Perde RF centrais (busca, comparador)", "Descartada"],
], [2.4, 2.2, 2.8, 1.6], { destaque: [2] }));
kids.push(h2("4.3 Premissas da aceleração"));
kids.push(tabela(["Premissa", "Valor", "Justificativa"], [
  ["Contratados", contr.map((c) => `${c.nivel} (${brl(c.taxa)}/h)`).join(" + ") + ", 20 h/semana cada", "Perfis complementares: full-stack e front-end"],
  ["Início", `${dt(C.inicio_acel)} (após o R1)`, "R1 não é acelerável: faltam 3 semanas e incluir gente agora atrasaria"],
  ["Recesso", `${dt(C.recesso[0])} a ${dt(C.recesso[1])}`, "Ninguém trabalha"],
  ["Rampa de produtividade", "50% (sem. 1-2), 75% (sem. 3-4), 90% depois", "Curva de aprendizado do código e do domínio"],
  ["Coordenação", `−${pct(1 - P.fator_coord, 0)} da produção de todos`, `Canais de comunicação sobem de ${P.canais_5} (5 pessoas) para ${P.canais_7} (7 pessoas)`],
  ["Mentoria do líder técnico", `${P.h_onboard_victor} h/semana do Victor (Sr)`, "Revisão de PR e onboarding, além das 5 h dele"],
  ["Equipe", "5 × 5 h/semana só nos semestres (S5 08/03 a 27/06; S6 16/08 a 05/12)", "Calendário acadêmico inalterado"],
  ["Escopo", "R2 = 400 h e R3 = 400 h, mesmos pacotes da EAP", "Nenhum requisito cortado"],
], [2, 3.4, 3.6]));
kids.push(h2("4.4 Resultado: linha de base × cenário acelerado"));
kids.push(tabela(["Métrica", "Linha de base", "Acelerado (CR-01)", "Diferença"], [
  ["Release R2 (v1.1.0)", dt(C.base_R2), dt(C.acel_R2), `${semR2} semanas antes`],
  ["Release R3 (v1.2.0)", dt(C.base_R3), dt(C.acel_R3), `${semR3} semanas antes`],
  ["Horas para R2+R3 (pagas)", num(A.horas_base_pos_r1), num(A.horas_acel_pos_r1), `+${num(A.delta_horas)} h (+${pct(A.delta_horas / A.horas_base_pos_r1, 1)})`],
  ["  da equipe", num(A.horas_base_pos_r1), num(A.h_equipe), ""],
  ["  dos contratados", "0", num(A.h_contr), ""],
  ["  mentoria do líder técnico", "0", num(A.h_onb), ""],
  ["Custo econômico do R2+R3", brl(A.custo_base_pos_r1), brl(A.custo_acel_pos_r1), `+${brl(A.delta_custo)} (+${pct(deltaPct, 1)})`],
  ["BAC do projeto", brl(V.bac_novo), brl(A.bac_acel), `+${brl(A.bac_acel - V.bac_novo)}`],
  ["Custo econômico por semana ganha (R3)", "", brl(A.custo_semana_ganha), "inclinação do crashing"],
  ["Caixa por semana ganha (R3)", "", brl(A.caixa_semana_ganha), "aporte ÷ semanas"],
  ["Horas da equipe liberadas no S5/S6", "0", num(A.h_equipe_liberada), "para escopo novo"],
], [3, 2, 2, 2], { align: ["L", "R", "R", "R"], destaque: [0, 1, 6] }));
kids.push(p(""));
kids.push(p([t("Leitura: o cenário acelerado usa "), b(`${num(A.delta_horas)} h a mais`), t(" (rampa + coordenação + mentoria), como prevê a Lei de Brooks. Mesmo assim, o custo econômico sobe só "), b(pct(deltaPct, 1)), t(", porque as horas dos contratados (Pl e Jr) custam menos que a média da equipe, que tem GP e Sr. O ganho de 30 semanas sai por cerca de "), b(`${brl(A.custo_semana_ganha, 0)} por semana`), t(" em custo econômico.")]));
kids.push(...fig("curva_entrega.png", "Figura 3 - Horas de escopo do R2+R3 entregues ao longo do tempo (simulação semanal)", 600));
kids.push(...fig("gantt_resumo.png", "Figura 4 - Gantt condensado: linha de base × cenário acelerado", 620));

kids.push(h2("4.5 Quanto captar"));
kids.push(tabela(["Item de caixa", "Valor"], [
  ...Object.entries(I.caixa).map(([k, v]) => [k, brl(v)]),
  ["Subtotal", brl(I.caixa_sub)],
  ["Reserva de contingência do aporte (15%)", brl(I.reserva_caixa)],
  ["Necessidade calculada", brl(I.captacao_calc)],
  ["Captação proposta (arredondada)", brl(capt)],
], [6, 3], { align: ["L", "R"], destaque: [3, 6] }));
kids.push(nota("As horas da equipe e a mentoria do líder técnico não entram no caixa: são custo econômico pago em participação (sweat equity), não em dinheiro."));

kids.push(h2("4.6 Valuation e percentual de ações"));
kids.push(p("Dois métodos foram usados para ancorar o valor da empresa antes do aporte (pré-money):"));
kids.push(bullet([b("Custo de reposição: "), t(`quanto custaria refazer o que existirá no R1 (1.600 h a ${brl(V.taxa_media)}/h + infraestrutura) = ${brl(I.custo_reposicao)}. É o piso: não inclui o valor da ideia nem da equipe.`)]));
kids.push(bullet([b("Método Berkus "), t("(startups sem receita): até um teto por fator de risco reduzido.")]));
kids.push(tabela(["Fator Berkus", "Valor atribuído"], [
  ...Object.entries(I.berkus).map(([k, v]) => [k, brl(v)]), ["Total Berkus", brl(I.berkus_total)],
], [6, 3], { align: ["L", "R"], destaque: [5] }));
kids.push(p(""));
kids.push(tabela(["Cálculo", "Valor"], [
  ["Pré-money adotado (Berkus; 1,9× o custo de reposição)", brl(I.pre_money)],
  ["Captação", brl(capt)],
  ["Pós-money = pré-money + captação", brl(I.pos_money)],
  ["% ao investidor = captação ÷ pós-money", pct(I.pct, 0)],
  ["Diluição de cada sócio fundador", `de 20% para ${pct(0.2 * (1 - I.pct), 0)}`],
], [6, 3], { align: ["L", "R"], destaque: [3] }));
kids.push(...fig("cap_table.png", "Figura 5 - Quadro societário antes e depois do aporte (premissa: fundadores com partes iguais)", 560));
kids.push(p([b("Liberação em parcelas (proteção do investidor):")]));
kids.push(tabela(["Parcela", "Valor", "Gatilho", "Data prevista"],
  I.tranches.map((x) => [String(x.parcela), brl(x.valor), x.gatilho, x.data]), [1, 1.6, 4.6, 1.8], { align: ["C", "R", "L", "C"] }));

kids.push(h2("4.7 Retorno e sensibilidade"));
kids.push(p("A receita vem de comissão de afiliados a partir do R2: receita/mês = visitas × taxa de clique para o varejo × conversão no varejo × ticket médio × comissão. Antecipar o R2 antecipa essa receita em " + num(R.meses_antecipados, 1) + " meses."));
const cenRow = (k, f) => Object.keys(cenarios).map((n) => f(cenarios[n]));
kids.push(tabela(["Premissa / resultado", ...Object.keys(cenarios)], [
  ["Visitas por mês", ...cenRow(0, (c) => num(c.visitas))],
  ["Clique para o varejo", ...cenRow(0, (c) => pct(c.clique, 0))],
  ["Conversão no varejo", ...cenRow(0, (c) => pct(c.conversao, 0))],
  ["Ticket médio", ...cenRow(0, (c) => brl(c.ticket, 0))],
  ["Comissão", ...cenRow(0, (c) => pct(c.comissao, 0))],
  ["Compras por mês", ...cenRow(0, (c) => num(c.compras))],
  ["Receita por mês", ...cenRow(0, (c) => brl(c.receita_mes))],
  [`Receita antecipada (${num(R.meses_antecipados, 1)} meses)`, ...cenRow(0, (c) => brl(c.receita_antecipada))],
  ["Ganho líquido (receita antecipada − custo extra)", ...cenRow(0, (c) => brl(c.ganho_liquido))],
  ["Receita até 31/12/2027: linha de base", ...cenRow(0, (c) => brl(c.receita_2027_base))],
  ["Receita até 31/12/2027: acelerado", ...cenRow(0, (c) => brl(c.receita_2027_acel))],
  ["Meses de receita para igualar o aporte", ...cenRow(0, (c) => num(c.payback_meses, 1))],
], [3.4, 1.9, 1.9, 1.9], { align: ["L", "R", "R", "R"], destaque: [6, 8] }));
kids.push(...fig("sensibilidade.png", "Figura 6 - Sensibilidade da receita mensal e do payback do aporte", 560));
kids.push(p([t("Leitura: no cenário base, a antecipação paga o custo extra ("), b(`ganho líquido de ${brl(base.ganho_liquido)}`), t(`) e a receita iguala o aporte em ${num(base.payback_meses, 0)} meses. No pessimista, o ganho líquido fica negativo (${brl(pess.ganho_liquido)}) e o payback passa de 6 anos. Por isso a 2ª parcela só é liberada após o R2, quando o tráfego real já pode ser medido.`)]));

kids.push(h2("4.8 Riscos novos introduzidos pela CR-01"));
kids.push(tabela(["#", "Risco (causa → evento → consequência)", "Chance", "Impacto", "Criticidade", "Resposta", "Owner"], [
  ["R7", "Contratados sem contexto → rampa mais lenta que a prevista → R2 desliza", "Média (50%)", "Moderado", "Média", "Onboarding guiado por ADRs; mentoria de 2 h/semana; pareamento nas 2 primeiras semanas", "Victor"],
  ["R8", "Tráfego abaixo do cenário base → receita não cobre o aporte", "Média (50%)", "Alto", "Alta", "Parcela 2 condicionada ao R2; medir visitas e cliques desde o R1", "Mirela"],
  ["R9", "Entrada de sócio → conflito de governança e diluição", "Baixa (30%)", "Moderado", "Média", "Acordo de acionistas antes do aporte; investidor com voto só em mudanças de escopo", "Mirela"],
  ["R10", "Trabalho no recesso sem revisão → queda de qualidade", "Baixa (30%)", "Moderado", "Baixa", "CI obrigatório; nenhum merge sem revisão; GP faz checkpoint quinzenal", "Victor"],
], [0.5, 2.4, 1.0, 1.1, 1.1, 2.3, 0.8]));
kids.push(nota("R8 é o primeiro risco de criticidade Alta do projeto. Ele só existe se a CR-01 for aprovada e já nasce com resposta definida, então o status continua VERDE pela regra do semáforo (nenhum Alto sem plano)."));
kids.push(h2("4.9 Decisão pedida ao stakeholder"));
kids.push(caixa("O que pedimos", [
  `Aprovar a CR-01: aporte de ${brl(capt)} por ${pct(I.pct, 0)} das ações (pré-money ${brl(I.pre_money)}).`,
  "Liberação em 2 parcelas: R$ 30.000,00 no aceite do R1 e R$ 30.000,00 no aceite do R2 acelerado.",
  `Compromisso da equipe: R2 até ${dt(C.acel_R2)} e R3 até ${dt(C.acel_R3)}, com relatório de status mensal ao investidor.`,
  "Se recusada: nada muda no R1; o projeto segue a linha de base (R2 27/06/2027, R3 07/12/2027).",
], VERDE));

// ---------------- 5. ações
kids.push(h1("5. Pontos de atenção e ações"));
kids.push(tabela(["#", "Ação", "Origem", "Responsável", "Prazo", "Situação"], [
  ["A1", "Spike de busca e ADR-005 (índice invertido × FULLTEXT)", "R1 / AT-1", "Ana", "30/10/2026", "Em andamento (pauta de 12/11) [CONFIRMAR NOVA DATA]"],
  ["A3", "Migração para Node.js LTS, versões fixadas e CI", "R5 / AT-3", "Victor", "30/10/2026", "Concluída na sprint 5"],
  ["A2", "Protocolo mensal de atualização do catálogo", "R2 / AT-2", "Mariana", "13/11/2026", "Em andamento"],
  ["A4", "Monitoramento externo e backup com teste de restauração automatizado", "R3", "Victor", "13/11/2026", "Em andamento (sprint 6)"],
  ["A5", "Checklist LGPD do R1", "R4", "Ana", "13/11/2026", "Em andamento"],
  ["A8", "Submeter a CR-01 ao stakeholder", "CR-01", "Mirela", "13/11/2026", "Nova"],
  ["A9", "Recrutar 2 devs (Pl e Jr) e preparar onboarding", "CR-01 / R7", "Victor e Mirela", "06/12/2026", "Nova (só se aprovada)"],
  ["A10", "Minuta do acordo de acionistas", "R9", "Mirela", "27/11/2026", "Nova"],
  ["A11", "Instrumentar métricas de tráfego e clique desde o R1", "R8", "Yago", "06/12/2026", "Nova"],
], [0.5, 3.4, 1.1, 1.3, 1.1, 2.2]));

// ---------------- 6. cronograma
kids.push(brk(), h1("6. Cronograma revisado (Gantt)"));
kids.push(p("O arquivo HardDex_Cronograma_v2.gan (GanttProject) traz o cenário acelerado completo:"));
kids.push(bullet("pacotes de trabalho da EAP com horas e custos (colunas \"Custo (R$)\" no valor-hora novo e \"Custo antigo R$ 40/h\" para comparação);"));
kids.push(bullet("recursos com nível e custo-hora (5 integrantes e 2 contratados);"));
kids.push(bullet("recesso marcado como férias de todos os recursos;"));
kids.push(bullet("linha de base BL-PLAN salva, para comparar as datas originais (no GanttProject: Projeto > Linhas de base)."));
kids.push(...fig("gantt_detalhe.png", "Figura 7 - Cronograma de novembro/2026 em diante, por pacote (barra cinza = linha de base)", 640));

// ---------------- Anexo A
kids.push(brk(), h1("Anexo A - Memória de cálculo"));
kids.push(p("Todos os números deste relatório, do Gantt e dos gráficos saem de um único script de cálculo. Fórmulas usadas:"));
[
  `custo-hora(nível) = arred5(salário × ${num(P.fator_custo_empresa, 2)} ÷ ${P.horas_mes_produtivas})`,
  `taxa média = Σ custo-hora dos 5 integrantes ÷ 5 = ${num(V.custo_hora_equipe)} ÷ 5 = ${brl(V.taxa_media)} (alocação igual, 12,5% cada)`,
  `BAC = 2.400 h × ${brl(V.taxa_media)} = ${brl(V.bac_novo)};  semestre = 400 h × ${brl(V.taxa_media)} = ${brl(V.custo_semestre)}`,
  `VP = VA = CR = 1.489 h × ${brl(V.taxa_media)} = ${brl(E.VA)};  EPT = BAC − VA = ${brl(E.EPT)};  IDPT = (BAC − VA) ÷ (BAC − CR) = 1,00`,
  "simulação semanal (a partir de 07/12/2026): produção = [h equipe (só nos semestres) + Σ h contratados × rampa] × 0,90, até somar 800 h de escopo",
  `custo acelerado = h equipe × taxa média + Σ h contratado × taxa + h mentoria × ${brl(NV.Sr.taxa)}`,
  `custo por semana ganha = (custo acelerado − custo base) ÷ semanas antecipadas do R3 = ${brl(A.delta_custo)} ÷ ${num(C.sem_ganhas_R3, 1)}`,
  "captação ≥ (caixa dos contratados + recrutamento + infra extra) × 1,15;  % ações = captação ÷ (pré-money + captação)",
  "receita/mês = visitas × clique × conversão × ticket × comissão;  receita antecipada = receita/mês × (R2 base − R2 acelerado) em meses",
].forEach((s) => kids.push(bullet(t(s, { font: "Consolas", size: 18 }))));
kids.push(h2("Premissas a validar pelo grupo"));
kids.push(tabela(["Premissa", "Valor usado", "Por que validar"], [
  ["Nível de cada integrante", "Mirela GP; Victor Sr; Ana Pl; Mariana Pl; Yago Jr", "Precisa bater com a lista enviada pela GP no Moodle (13/11)"],
  ["Salários de referência", "GP 10.350; Sr 9.400; Pl 6.600; Jr 4.200", "Estimativa de mercado 2026; trocar por pesquisa salarial se houver"],
  ["Fator custo-empresa", "1,70", "Faixa usual de 1,6 a 2,0 para CLT"],
  ["Quadro societário atual", "5 fundadores com 20% cada", "Confirmar a divisão combinada pelo grupo"],
  ["Tráfego e conversão", "Cenários da seção 4.7", "Sem dados reais; medir a partir do R1 (A11)"],
  ["Status da A1", "Em andamento em 12/11", "A pauta de 12/11 cita o spike ainda em execução; prazo era 30/10"],
], [2.2, 3.4, 3.4]));

// ================================================================== DOCUMENTO
const doc = new Document({
  creator: "Equipe HardDex",
  title: "Relatório de Status HardDex RS-HDX-2026-11 v2",
  styles: {
    default: { document: { run: { font: FONT, size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 28, bold: true, color: AZUL }, paragraph: { spacing: { before: 280, after: 120 }, keepNext: true, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 23, bold: true, color: AZUL }, paragraph: { spacing: { before: 200, after: 100 }, keepNext: true, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [{ reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 400, hanging: 240 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [t("HardDex · RS-HDX-2026-11 v2.0 · corte 12/11/2026", { size: 16, color: "808080" })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [t("Página ", { size: 16, color: "808080" }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: "808080" })] })] }) },
    children: kids,
  }],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("ok", OUT); });
