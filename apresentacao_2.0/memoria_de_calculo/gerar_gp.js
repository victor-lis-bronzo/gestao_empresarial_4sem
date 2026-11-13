// Pauta da Reunião de Gerentes de Projetos (GP.pdf) refeita com os números do Status Report v2
const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, LevelFormat, Footer, PageNumber,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType } = require("docx");

const N = JSON.parse(fs.readFileSync(path.join(__dirname, "numeros.json"), "utf8"));
const OUT = process.argv[2];
const num = (x, d = 0) => Number(x).toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
const brl = (x, d = 2) => (x < 0 ? "−R$ " : "R$ ") + num(Math.abs(x), d);
const pct = (x, d = 2) => num(x * 100, d) + "%";
const dt = (iso) => iso.split("-").reverse().join("/");
const V = N.valor_hora, E = N.evm, C = N.cronograma, A = N.aceleracao, I = N.investimento;

const FONT = "Times New Roman";
const t = (s, o = {}) => new TextRun({ text: s, font: FONT, size: 24, ...o });
const b = (s) => t(s, { bold: true });
const runs = (c) => (Array.isArray(c) ? c : [c]).map((x) => (typeof x === "string" ? t(x) : x));
const p = (c, o = {}) => new Paragraph({ spacing: { after: 120, line: 300 }, alignment: AlignmentType.JUSTIFIED, ...o, children: runs(c) });
const h1 = (s) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [t(s)] });
const it = (c, lvl = 0) => new Paragraph({ numbering: { reference: "dash", level: lvl }, alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 100, line: 300 }, children: runs(c) });

const W = 9026;
const bd = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
const cell = (c, w, o = {}) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders: { top: bd, bottom: bd, left: bd, right: bd },
  shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: "auto" } : undefined, margins: { top: 40, bottom: 40, left: 100, right: 100 },
  children: [new Paragraph({ alignment: o.al || AlignmentType.LEFT, children: (Array.isArray(c) ? c : [c]).map((x) => (typeof x === "string" ? t(x, { size: 21, bold: !!o.bold }) : x)) })] });
const tabela = (head, rows, ws, al = []) => new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: ws,
  rows: [new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, ws[i], { bold: true, fill: "E7E6E6", al: al[i] })) }),
    ...rows.map((r) => new TableRow({ children: r.map((c, i) => cell(c, ws[i], { al: al[i] })) }))] });
const R = AlignmentType.RIGHT, CT = AlignmentType.CENTER;

const k = [];
k.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [t("Informações Oficiais do Projeto", { size: 34, bold: true })] }));
k.push(p([b("Nome do Projeto: "), t("HardDex - Simplificando o hardware!")]));
k.push(p([b("Equipe e Designação de Papéis:")], { spacing: { before: 120, after: 80 } }));
k.push(tabela(["Integrante", "Função no projeto", "Nível"], [
  ...N.equipe.map((e) => [e.nome, e.nivel === "GP" ? "Gerente do Projeto" : e.papel, e.nivel === "GP" ? "GP" : `${e.nivel} (${e.nivel === "Sr" ? "Sênior" : e.nivel === "Pl" ? "Pleno" : "Júnior"})`]),
], [3900, 3626, 1500], [undefined, undefined, CT]));

k.push(h1("Pauta Estruturada: Reunião de Gerentes de Projetos"));
k.push(p([t("Data da reunião: 12/11/2026 · Relatório de referência: RS-HDX-2026-11 v2.0 (corte 12/11/2026)", { italics: true, size: 22 })]));

k.push(h1("1. Próximos Passos para a Entrega Final"));
k.push(it(["A entrega formal do marco ", b("Release R1 (v1.0.0)"), " está confirmada para o dia ", b("06/12/2026"), ". O R1 não será acelerado: faltam três semanas, e incluir pessoas agora atrasaria a entrega (Lei de Brooks)."]));
k.push(it(["A ", b("Sprint 7"), " (16 a 29 de novembro) será dedicada à publicação da versão Beta (v1.0.0-beta.1) em produção com acesso restrito, com os testes de validação ponta a ponta."]));
k.push(it(["A ", b("Sprint 8"), " (30 de novembro a 06 de dezembro) será dedicada à homologação (release candidate v1.0.0-rc.1) e à estabilização da Release R1."]));
k.push(it(["Em ", b("13/11/2026"), " a gerente submete ao stakeholder a ", b("Solicitação de Mudança CR-01"), " (proposta de investimento), com decisão esperada até ", b("27/11/2026"), "."]));
k.push(it(["Se a CR-01 for aprovada, o recrutamento de 2 desenvolvedores (1 Pleno e 1 Júnior) ocorre de 23/11 a 06/12, e o cenário acelerado começa em ", b(dt(C.inicio_acel)), "."]));
k.push(it(["A entrega do Relatório de Status (Status Report) para avaliação da disciplina ocorrerá em ", b("07/12/2026"), "."]));

k.push(h1("2. Itens de Relevância"));
k.push(it([b("Destaques positivos: "), t(`status global VERDE, com prazo e custo aderentes ao planejado (IDP = IDC = IDPT = 1,00). O ambiente de homologação opera com HTTPS desde a Sprint 3. A arquitetura (ADR-001 a ADR-004) tem linha de base aprovada (BL-ARQ 1.0). Reserva de contingência intacta (${brl(V.reserva_nova)}).`)]));
k.push(it([b("Revisão de custos e valor-hora: "), t(`o relatório anterior usava R$ 40,00/h igual para todos, o que subestimava o projeto. Agora o custo-hora segue a senioridade (GP R$ 110,00; Sr R$ 100,00; Pl R$ 70,00; Jr R$ 45,00; média ${brl(V.taxa_media)}/h). O orçamento no término (BAC) passa de ${brl(V.bac_antigo)} para ${brl(V.bac_novo)}. As horas não mudam, e os índices continuam em 1,00.`)]));
k.push(it([b("Pontos de atenção e mitigação de riscos: "), t("a migração do runtime para a linha LTS do Node.js (A3) foi concluída na Sprint 5. O spike que define a estrutura de indexação da busca semântica (índice invertido × FULLTEXT, ação A1) segue em execução, com prazo original vencido em 30/10; a nova data será confirmada nesta reunião. Vencem em 13/11 o protocolo do catálogo (A2), o monitoramento com backup automatizado (A4) e o checklist LGPD (A5).")]));
k.push(it([b("Proposta de investimento (CR-01): "), t(`venda de ${pct(I.pct, 0)} das ações por ${brl(I.captacao)} (valuation pré-money de ${brl(I.pre_money)}), para contratar 2 desenvolvedores. O aporte será liberado em duas parcelas de R$ 30.000,00, vinculadas ao aceite do R1 e do R2. O custo econômico do R2 e do R3 sobe ${brl(A.delta_custo)} (+${pct(A.delta_custo / A.custo_base_pos_r1, 1)}) e o R3 é entregue ${num(C.sem_ganhas_R3)} semanas antes.`)]));

k.push(h1("3. Cenário Atual e Perspectiva Futura (As Is - To Be)"));
k.push(it([b("As Is (posição em 12/11/2026): "), t(`o projeto registra avanço global de ${pct(E.avanco)} (${num(E.H_VA)} das 2.400 horas orçadas), equivalente a ${brl(E.VA)} de valor agregado pelo valor-hora revisado. No semestre S4, o progresso é de ${pct(E.avanco_s4)} (289 de 400 horas). As Sprints 4 e 5 entregaram o login Google com controle Admin/Editor (v0.4.0), a migração do runtime, o pipeline de Integração Contínua (CI) e o CRUD de especificações e mídias. A Sprint 6, em encerramento, concentra o catálogo público, as rotinas automatizadas de backup do MySQL e o monitoramento de disponibilidade.`)]));
k.push(it([b("To Be (entrega final em 06/12/2026): "), t("o projeto alcançará o marco da Release R1 (v1.0.0). A plataforma web será entregue em operação na VPS própria, com cadastro e autenticação por e-mail e Google, catálogo 100% administrável (fabricantes, modelos, especificações e mídias) e gerenciamento do dicionário didático em produção.")]));
k.push(it([b("To Be após o R1 (com a CR-01 aprovada): "), t("as próximas releases são antecipadas conforme a tabela abaixo. A receita de afiliados, que começa no R2, também é antecipada, e a equipe fica com horas livres no S5/S6 para escopo novo.")]));
k.push(tabela(["Marco", "Linha de base", "Com a CR-01", "Ganho"], [
  ["Release R1 (v1.0.0)", "06/12/2026", "06/12/2026", "-"],
  ["Release R2 (v1.1.0)", dt(C.base_R2), dt(C.acel_R2), `${num(C.sem_ganhas_R2)} semanas`],
  ["Release R3 (v1.2.0)", dt(C.base_R3), dt(C.acel_R3), `${num(C.sem_ganhas_R3)} semanas`],
], [3200, 1950, 1950, 1926], [undefined, CT, CT, CT]));

const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal", run: { font: FONT, size: 34, bold: true }, paragraph: { spacing: { after: 200 } } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 28, bold: true }, paragraph: { spacing: { before: 280, after: 140 }, keepNext: true, outlineLevel: 0 } },
    ],
  },
  numbering: { config: [{ reference: "dash", levels: [{ level: 0, format: LevelFormat.BULLET, text: "-", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 560, hanging: 280 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 22 })] })] }) },
    children: k,
  }],
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("ok", OUT); });
