const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const Lu = require("react-icons/lu");
const path = require("path");
// Deck da apresentação final (base: deck do Canva aprovado, versão "leve" revisada).
// Uso: SKILL=<pasta da skill pptx> node build.js saida.pptx
// SKILL é opcional: só serve para gravar as cores e fontes no tema do arquivo.
const applyTheme = process.env.SKILL
  ? require(process.env.SKILL + "/scripts/apply_theme.js").applyTheme
  : async () => console.warn("SKILL não definido: tema não aplicado (visual dos slides não muda)");

const IMG = path.join(__dirname, "img");
const OUT = process.argv[2] || "deck.pptx";

// ---------- palette & type (copied from the approved Canva deck) ----------
const BLUE = "2B4FD8";   // stripes, bars, filled cards
const BLUE_T = "3A5BDB"; // blue text on black
const SOFT = "4F66C9";   // secondary blue (investor bar)
const WHITE = "FFFFFF";
const GREY = "A1A1AA";
const LIGHT = "D4D4D8";
const DIM = "3F3F46";
const HEAD = "Michroma", MONO = "Space Mono", SANS = "Arial";

const THEME = {
  name: "HardDex",
  headFontFace: HEAD,
  bodyFontFace: SANS,
  colors: {
    dk1: "000000", lt1: "FFFFFF", dk2: "0A0A0A", lt2: "A1A1AA",
    accent1: BLUE, accent2: SOFT, accent3: "9AA8E8", accent4: "3F3F46",
    accent5: "D4D4D8", accent6: "6B7280", hlink: BLUE, folHlink: SOFT,
  },
};

const W = 13.333, MX = 0.7, CW = W - 2 * MX;

// ---------- icons ----------
const iconCache = {};
async function iconData(name, color) {
  const key = name + color;
  if (iconCache[key]) return iconCache[key];
  const C = Lu[name];
  if (!C) throw new Error("missing icon " + name);
  const svg = RDS.renderToStaticMarkup(React.createElement(C, { size: 256, color: "#" + color }));
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return (iconCache[key] = "image/png;base64," + buf.toString("base64"));
}

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "HardDex — Relatório de Status & Proposta de Investimento";
pres.author = "Equipe HardDex";
pres.theme = { headFontFace: HEAD, bodyFontFace: SANS };

pres.defineSlideMaster({
  title: "HardDex Conteudo",
  background: { color: "000000" },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: MX, y: 0.42, w: CW, h: 0.8, fontFace: HEAD, fontSize: 30, color: WHITE, align: "left", valign: "middle", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "sub", type: "body", x: MX, y: 1.22, w: CW, h: 0.45, fontFace: SANS, fontSize: 20, bold: true, color: BLUE_T, align: "left", valign: "middle", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({ title: "HardDex Capa", background: { color: "000000" }, objects: [] });

// ---------- helpers ----------
function T(s, text, o) {
  s.addText(text, Object.assign({ isTextBox: true, margin: 0, fontFace: SANS, fontSize: 18, color: WHITE, valign: "top", paraSpaceAfter: 0 }, o));
}
function card(s, x, y, w, h, o = {}) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.12,
    fill: { color: o.fill || "000000" },
    line: { color: o.line || BLUE, width: o.lw || 1.5 },
    objectName: o.name,
  });
}
async function icon(s, name, x, y, size, color) {
  s.addImage({ data: await iconData(name, color), x, y, w: size, h: size, altText: name.replace(/^Lu/, "") + " icon" });
}
// icon inside a circle: filled (blue/white icon) or outlined
async function badge(s, name, x, y, d, o = {}) {
  const fill = o.fill === undefined ? BLUE : o.fill;
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill || "000000" }, line: { color: o.line || fill || BLUE, width: 1.5 } });
  const p = d * 0.24;
  await icon(s, name, x + p, y + p, d - 2 * p, o.color || WHITE);
}
const NOTES = [
 "O projeto está verde: no prazo e dentro do custo em 22/11/2026. O avanço é de 1.525 horas feitas de 2.400 previstas: 1.525 ÷ 2.400 = 63,54%. O índice de desempenho de prazo (IDP) compara o que foi entregue com o que estava planejado, e o índice de desempenho de custo (IDC) compara o que foi entregue com o que foi gasto. Os dois valem 1,00, então estamos exatamente no planejado. O R1 continua marcado para 06/12/2026.",
 "Na banca de 12/10 o custo-hora era R$ 40 para todos, igual para a gerente e para o júnior, o que subestimava o projeto. Agora cada pessoa tem o custo-hora do seu nível, e a média é R$ 79 por hora. Por isso o orçamento (BAC) passou de R$ 96.000 para R$ 189.600: 2.400 h × R$ 79 = R$ 189.600. As horas não mudaram, só o preço de cada hora.",
 "A tese anterior era corrigir atraso, mas o projeto está em dia. Agora a proposta antecipa a receita de afiliados, aproveitando as janelas paradas do calendário acadêmico. Também foi feito o novo cronograma (Gantt v2) com o cenário acelerado e com o plano original salvo, para comparar as datas.",
 "O custo-hora é o salário de referência × 1,70 ÷ 160 horas, arredondado para múltiplos de R$ 5. O fator 1,70 cobre encargos, férias, 13º e benefícios. O resultado é R$ 110 para a gerente, R$ 100 para o sênior, R$ 70 para cada pleno e R$ 45 para o júnior. Cada pessoa dedica 5 h por semana, o que dá 80 h por semestre e 480 h no projeto. Exemplo: Mirela custa 480 h × R$ 110 = R$ 52.800.",
 "A média do custo-hora é (110 + 100 + 70 + 70 + 45) ÷ 5 = R$ 79. Cada integrante tem 480 h no projeto, então são 2.400 h no total. O orçamento é 2.400 h × R$ 79 = R$ 189.600, o mesmo valor que se obtém somando o custo total de cada pessoa. Antes, com R$ 40 por hora, o total era R$ 96.000.",
 "O BAC é o orçamento do projeto inteiro: R$ 189.600. O VP é quanto deveria estar pronto até 22/11: 1.525 h × R$ 79 = R$ 120.475. O VA é quanto realmente foi entregue e aceito, também R$ 120.475. O CR é quanto realmente se gastou: R$ 120.475. Por isso o índice de prazo (IDP) = VA ÷ VP = 1,00 e o índice de custo (IDC) = VA ÷ CR = 1,00.",
 "As variações são zero: VA − VP = 0 no prazo e VA − CR = 0 no custo. O que falta fazer é (BAC − VA) ÷ IDC = (R$ 189.600 − R$ 120.475) ÷ índice de custo 1,00 = R$ 69.125, o que equivale a 875 horas. A reserva de contingência é 10% do orçamento com a proposta: 10% de R$ 193.286,52 = R$ 19.328,65, e está intacta. Sem a proposta, seria 10% de R$ 189.600 = R$ 18.960. O orçamento total, com reserva e R$ 1.040 de infraestrutura, é R$ 193.286,52 + R$ 19.328,65 + R$ 1.040 = R$ 213.655,17; sem a proposta, R$ 189.600 + R$ 18.960 + R$ 1.040 = R$ 209.600. A reserva de R$ 19.328,65 só passa a valer se a proposta for aprovada; hoje a reserva vigente é R$ 18.960.",
 "No semestre atual foram feitas 325 das 400 horas, ou 81,25% (325 ÷ 400): 300 h das sprints 1 a 6 mais 25 h da sprint 7. As sprints concluídas entregaram o login com Google e os perfis Admin e Editor, a migração para a versão LTS do Node.js, a integração contínua, o cadastro de especificações e mídias, o catálogo público, o backup do PostgreSQL e o monitoramento de disponibilidade. Esse é o ciclo que leva ao R1.",
 "O beta do R1 sai em 27/11/2026, em produção com acesso restrito, junto com a decisão do investidor sobre a proposta. De 30/11 a 06/12 é a sprint 8, de homologação e estabilização. O R1 vai ao ar em 06/12/2026. Ele não pode ser acelerado: faltam só 2 semanas e incluir gente agora atrasaria. É a Lei de Brooks: colocar mais gente perto da entrega costuma atrasar em vez de acelerar, porque o time novo precisa aprender e a equipe perde tempo ensinando.",
 "O projeto está em dia, mas o plano original tem um limite: a equipe só trabalha nos semestres letivos. Há duas janelas paradas, de dezembro a março e de julho a agosto. A receita só começa no R2, quando entra o redirecionamento ao varejo com link de afiliado, previsto para 27/06/2027.",
 "A proposta é contratar 2 desenvolvedores, 1 pleno (R$ 70 por hora) e 1 júnior (R$ 45 por hora), com 20 horas por semana cada, a partir de 07/12/2026 até o R3. Com isso a equipe fundadora fica com cerca de 580 horas livres nos semestres S5 e S6 para escopo novo (800 h previstas para o R2 e o R3 menos 220 h que a equipe ainda faria = 580 h), via nova solicitação de mudança. Durante o recesso de 21/12/2026 a 03/01/2027 ninguém trabalha.",
 "Com a proposta, o R2 passa de 27/06/2027 para 21/03/2027, que é 14 semanas (98 dias) antes. O R3 passa de 07/12/2027 para 09/05/2027, 30 semanas (212 dias) antes. A comparação é entre o plano original e o cenário acelerado, com o mesmo escopo: nenhum requisito foi cortado. A simulação semana a semana considera os 2 contratados com 40 h pagas por semana (20 h cada), produtividade de 50% nas semanas 1 e 2, 75% nas semanas 3 e 4 e 90% depois, desconto de 10% para coordenação, o recesso sem trabalho e a equipe fundadora só nos semestres letivos.",
 "O cenário acelerado usa 252 horas a mais, de 800 para 1.052 horas pagas no R2 e no R3, por causa da adaptação dos contratados, da coordenação e da mentoria (Lei de Brooks: mais gente no time exige tempo para aprender e para se coordenar). As 1.052 h são 220 h da equipe fundadora + 792 h dos contratados + 40 h de mentoria do líder técnico. O custo desse trecho sobe de R$ 63.200 para R$ 66.886,52, ou seja, +R$ 3.686,52 (+5,8%). O orçamento (BAC) passa de R$ 189.600 para R$ 193.286,52. Cada semana ganha custa cerca de R$ 121,72 (R$ 3.686,52 ÷ 30,3 semanas ganhas no R3). O custo extra é pequeno porque as horas dos fundadores são pagas em participação, não em dinheiro; os R$ 60.000 do aporte são caixa, usado para pagar os contratados e outros custos (próximo bloco de slides).",
 "O aporte cobre só o que exige dinheiro: contratados R$ 45.543,35, recrutamento, contas e ferramentas R$ 3.000 e servidor extra com monitoramento por 12 meses R$ 1.200. O subtotal é R$ 49.743,35. Soma-se uma folga de caixa de 15% (R$ 7.461,50, mostrada como R$ 7.462), chegando a R$ 57.204,85, arredondado para R$ 60.000. Os R$ 4.200 de recrutamento e servidor extra são caixa da proposta e não estão no orçamento (BAC) de R$ 193.286,52, que cobre as horas e a infraestrutura base. As horas da equipe e a mentoria não entram: são pagas em participação, não em dinheiro.",
 "O valor da empresa antes do aporte foi ancorado por dois métodos. O custo de reposição, que é quanto custaria refazer o R1 (1.600 h × R$ 79 mais infraestrutura), dá R$ 126.680. O método Berkus, para startups sem receita, soma fatores e dá R$ 240.000, que foi o valor adotado, cerca de 1,9 vez o custo de reposição. Com o aporte de R$ 60.000, o valor depois é R$ 300.000, e o investidor fica com 60.000 ÷ 300.000 = 20%. Cada fundador cai de 20% para 16%.",
 "A receita vem da comissão de afiliados a partir do R2: visitas × cliques para o varejo × conversão × ticket médio × comissão. No cenário base são 8.000 visitas, 15% de cliques, 3% de conversão, ticket de R$ 3.500 e 4% de comissão, o que dá 36 compras e R$ 5.040 por mês. Antecipar o R2 antecipa essa receita em 3,2 meses (98 dias ÷ 30,44; R$ 5.040 × 3,2 = R$ 16.226). O ganho líquido da antecipação é a receita antecipada (R$ 16.226,02) menos o custo extra (R$ 3.686,52) = R$ 12.539,50; o aporte de R$ 60.000 é medido por outra conta, o tempo que a receita do produto leva para cobri-lo (R$ 60.000 ÷ R$ 5.040 por mês): 11,9 meses no cenário base, 83,3 no pessimista e 2,5 no otimista.",
 "O aporte de R$ 60.000 sai em duas parcelas de R$ 30.000, ligadas a entregas. A parcela 1 vem em 07/12/2026, com a proposta aprovada e o R1 (versão 1.0) aceito. A parcela 2 vem em 21/03/2027, com o R2 entregue no cenário acelerado. Assim o investidor só paga conforme o projeto entrega.",
 "Cada risco tem uma nota igual à probabilidade × o impacto, e cada um vai de 1 a 3, então a nota máxima é 9. Só dois riscos chegam a 9: o R02, configuração do servidor, e o R10, bloqueadores de anúncio barrando links de afiliado. Os dois têm plano de mitigação. O R02 será verificado no beta do R1, em 27/11; o R10 só pode ser testado quando o R2 entregar o redirecionamento de afiliados.",
 "R12 e R14 têm nota 6, ou seja, probabilidade média (2) × impacto alto (3). O R12 é a proposta não ser aprovada ou as parcelas atrasarem. O R14 é o líder técnico virar gargalo ao acumular desenvolvimento crítico e 2 h por semana de mentoria. Os dois têm resposta definida e responsável.",
 "A nota de cada risco aparece no círculo: R01 = 6, R02 = 9, R03 = 4 e R04 = 6, sempre probabilidade × impacto. R02 tem nota máxima (alta × alto). A ação A2, ligada ao R03 (protocolo do catálogo), foi concluída em 13/11/2026.",
 "As notas são: R05 = 6 (alta × médio), R06 = 6 (média × alto) e R07 = 3 (baixa × alto). A ação A4 (monitoramento externo e backup), ligada ao R06, e a A5 (checklist de LGPD), ligada ao R07, foram concluídas em 13/11/2026. Os dois riscos seguem com mitigação parcial.",
 "As notas são: R08 = 6, R09 = 4, R10 = 9 e R11 = 6. A ação A1, o teste da busca que levou à decisão pelo PostgreSQL (ADR-005), foi concluída na sprint 6 e trata o R11. O R10 é um dos dois riscos de nota máxima.",
 "R12 = 6, R13 = 4 e R14 = 6. Estes três riscos existem por causa da proposta de investimento. A triagem de recrutamento começa em 23/11/2026 e a decisão do investidor é até 27/11.",
 "O R15, tráfego abaixo do cenário base, tem nota 6: probabilidade média × impacto alto. No cenário pessimista o aporte levaria mais de 6 anos para se pagar. O R16, governança com o novo sócio, tem nota 2: probabilidade baixa × impacto médio. A minuta do acordo de acionistas (ação A10) é até 27/11.",
 "No corte de 22/11/2026 são 16 riscos: 2 críticos (nota 9), 9 médios e 5 baixos. A nota média é 89 ÷ 16 ≈ 5,6. Nenhum risco virou problema, e a reserva de contingência de R$ 19.328,65 está intacta (10% × R$ 193.286,52; sem a proposta seria 10% × R$ 189.600 = R$ 18.960). As ações A1, A2, A4 e A5 estão concluídas, com R06 e R07 em mitigação parcial.",
 "A decisão pedida é aprovar a proposta até 27/11/2026. Aprovando: R$ 60.000 em 2 parcelas, 20% das ações ao investidor e produto completo em 09/05/2027, 7 meses antes do plano original (07/12/2027). Se for recusada, vale o plano original: R1 em 06/12/2026, R2 em 27/06/2027 e R3 em 07/12/2027."
];
let noteIdx = 0;
function content(title, sub, origin, sub2) {
  const s = pres.addSlide({ masterName: "HardDex Conteudo", sectionTitle: section });
  s.addText(title, { placeholder: "title" });
  if (sub) s.addText(sub, { placeholder: "sub" });
  if (sub2) T(s, sub2, { x: MX, y: 1.66, w: CW, h: 0.38, fontSize: 16, color: GREY, valign: "middle" });
  s.addNotes(NOTES[noteIdx++]);
  return s;
}
function caption(s, text, y = 6.85) {
  T(s, text, { x: MX, y, w: CW, h: 0.38, fontSize: 15, color: GREY, valign: "middle" });
}
let section = "";
function sec(t) { section = t; pres.addSection({ title: t }); }

(async () => {
  // =============== 1. CAPA ===============
  sec("Abertura");
  {
    const s = pres.addSlide({ masterName: "HardDex Capa", sectionTitle: section });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.19, h: 7.5, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
    T(s, "IFSP BRAGANÇA PAULISTA · ADS · GESTÃO DE PROJETOS DE SOFTWARE", { x: 1.15, y: 1.15, w: 9.4, h: 0.45, fontSize: 18, bold: true, color: BLUE_T, valign: "middle" });
    s.addImage({ path: path.join(IMG, "logo.png"), x: 1.1, y: 1.8, w: 4.4, h: 4.4 * 525 / 1830, altText: "Logo HardDex" });
    T(s, "Relatório de Status & Proposta de Investimento", { x: 1.15, y: 3.3, w: 9.4, h: 0.65, fontFace: MONO, fontSize: 26, bold: true, valign: "middle" });
    T(s, [
      { text: "Mirela Oliveira (GP) · Victor Bronzo (Sr) · Ana Tayná Maciel (Pl)", options: { breakLine: true } },
      { text: "Mariana Sampaio (Pl) · Yago Dini (Jr)", options: { breakLine: true } },
      { text: "HardDex — Simplificando o hardware!", options: { color: BLUE_T, bold: true } },
    ], { x: 1.15, y: 5.15, w: 9.4, h: 1.5, fontSize: 20, color: LIGHT, paraSpaceAfter: 6 });
    ["im-000.png", "im-002.png", "im-001.png"].forEach((f, i) =>
      s.addImage({ path: path.join(IMG, f), x: 10.85, y: 0.75 + i * 2.13, w: 1.75, h: 1.75, altText: "Mascote HardDex" }));
  }

  // =============== 2. STATUS EXECUTIVO ===============
  sec("Status do Projeto");
  {
    const s = content("STATUS EXECUTIVO.", "Saúde do Projeto em 22/11/2026", 2);
    const items = [
      ["LuCircleCheck", "VERDE", "Status Geral", "No prazo e dentro do custo"],
      ["LuGauge", "63,54%", "Esforço Concluído", "1.525 h feitas de 2.400 h"],
      ["LuTarget", "1,00", "IDP e IDC", "Desempenho de prazo e de custo"],
      ["LuRocket", "06/12", "Entrega do R1", "Versão 1.0, data confirmada"],
    ];
    const cw = (CW - 0.33) / 2;
    for (let i = 0; i < 4; i++) {
      const x = MX + (i % 2) * (cw + 0.33), y = 2.15 + Math.floor(i / 2) * 2.25;
      const [ic, big, l1, l2] = items[i];
      card(s, x, y, cw, 2.0);
      await badge(s, ic, x + 0.4, y + 0.45, 1.1);
      T(s, big, { x: x + 1.85, y: y + 0.25, w: cw - 2.1, h: 0.8, fontSize: 44, bold: true, color: BLUE_T, valign: "middle" });
      T(s, l1, { x: x + 1.85, y: y + 1.08, w: cw - 2.1, h: 0.4, fontFace: MONO, fontSize: 20, bold: true });
      T(s, l2, { x: x + 1.85, y: y + 1.5, w: cw - 2.1, h: 0.35, fontSize: 17, color: GREY });
    }
    caption(s, "Execução 100% aderente ao plano original, sem desvios de prazo ou orçamento.", 6.7);
  }

  // =============== 3-4. EVOLUÇÃO DO PLANEJAMENTO ===============
  async function evoRow(s, y, ic, label, before, after) {
    const h = 1.95;
    await badge(s, ic, MX, y + (h - 1.0) / 2, 1.0);
    T(s, label, { x: 1.95, y, w: 2.5, h, fontFace: MONO, fontSize: 22, bold: true, valign: "middle" });
    card(s, 4.55, y, 3.35, h, { line: DIM });
    T(s, "BANCA 12/10", { x: 4.8, y: y + 0.25, w: 2.9, h: 0.3, fontFace: MONO, fontSize: 13, color: GREY });
    T(s, before, { x: 4.8, y: y + 0.62, w: 2.9, h: h - 0.8, fontSize: 20, color: GREY });
    await icon(s, "LuArrowRight", 8.05, y + (h - 0.55) / 2, 0.55, BLUE_T);
    card(s, 8.75, y, CW + MX - 8.75, h, { fill: BLUE });
    T(s, "REVISÃO 22/11", { x: 9.0, y: y + 0.25, w: 3.4, h: 0.3, fontFace: MONO, fontSize: 13, color: "DCE3FA" });
    T(s, after, { x: 9.0, y: y + 0.62, w: 3.45, h: h - 0.8, fontSize: 20, bold: true });
  }
  {
    const s = content("EVOLUÇÃO DO PLANEJAMENTO.", "Correções Pós-Banca (1/2) · Custos", 3);
    await evoRow(s, 2.2, "LuClock", "Taxa horária", "R$ 40/h fixo, irreal", "Custo-Empresa por senioridade (média R$ 79/h)");
    await evoRow(s, 4.5, "LuWallet", "Orçamento total (BAC)", "R$ 96.000", "R$ 189.600");
  }
  {
    const s = content("EVOLUÇÃO DO PLANEJAMENTO.", "Correções Pós-Banca (2/2) · Tese e Cronograma", 3,
      "A proposta de investimento (CR-01): vender 20% das ações por R$ 60.000 para acelerar o projeto");
    await evoRow(s, 2.2, "LuTarget", "Tese da proposta", "Corrigir atraso", "Antecipar receita de afiliados nas férias letivas");
    await evoRow(s, 4.5, "LuCalendarClock", "Cronograma", "Gantt sem cenário de aceleração", "Novo Gantt v2 com o plano original salvo para comparar");
  }

  // =============== 5-6. MODELO FINANCEIRO ===============
  sec("Finanças e Desempenho");
  {
    const s = content("MODELO FINANCEIRO.", "Custo-Hora Revisado por Senioridade (R$/h)", 4,
      "Custo-hora = salário × 1,70 ÷ 160 h (mês CLT integral) · cada membro dedica 5 h/semana (12,5%) · total em 480 h");
    // barras desenhadas com formas (gráfico nativo perdia os nomes fora do PowerPoint)
    const rows = [
      ["Mirela", "GP", "R$ 52,8k", 110], ["Victor", "Sr", "R$ 48,0k", 100], ["Ana", "Pl", "R$ 33,6k", 70],
      ["Mariana", "Pl", "R$ 33,6k", 70], ["Yago", "Jr", "R$ 21,6k", 45],
    ];
    const lx = MX, lw = 3.6, bx = MX + lw + 0.25, bmax = 6.2, top = 2.35, rh = 0.9;
    T(s, "INTEGRANTE · CUSTO NO PROJETO", { x: lx, y: top - 0.15, w: lw, h: 0.3, fontFace: MONO, fontSize: 13, color: GREY });
    T(s, "CUSTO-HORA (R$ POR HORA DE TRABALHO)", { x: bx, y: top - 0.15, w: 6.5, h: 0.3, fontFace: MONO, fontSize: 13, color: GREY });
    rows.forEach(([nome, nivel, total, taxa], i) => {
      const y = top + 0.3 + i * rh, bh = 0.6;
      T(s, [{ text: `${nome} (${nivel})`, options: { bold: true, color: WHITE } }, { text: `  ·  ${total}`, options: { color: GREY } }],
        { x: lx, y, w: lw, h: bh, fontSize: 20, valign: "middle" });
      const bw = bmax * taxa / 110;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y, w: bw, h: bh, rectRadius: 0.06, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      T(s, `R$ ${taxa}/h`, { x: bx + bw + 0.2, y, w: 1.6, h: bh, fontSize: 22, bold: true, valign: "middle" });
    });
  }
  {
    const s = content("MODELO FINANCEIRO.", "O Orçamento em 3 Números", 4);
    const items = [
      ["LuClock", "R$ 79/h", "Custo-hora médio", "Média dos 5 integrantes (antes: R$ 40/h)"],
      ["LuUser", "480 h", "Por membro", "5 h/sem ≈ 21,7 h/mês, só nos semestres · 2.400 h no total"],
      ["LuWallet", "R$ 189,6k", "Orçamento (BAC)", "Quanto o projeto custa do início ao fim"],
    ];
    const cw = (CW - 2 * 0.33) / 3;
    for (let i = 0; i < 3; i++) {
      const x = MX + i * (cw + 0.33), y = 2.25;
      card(s, x, y, cw, 4.1);
      await badge(s, items[i][0], x + 0.4, y + 0.45, 1.15);
      T(s, items[i][1], { x: x + 0.4, y: y + 1.75, w: cw - 0.6, h: 0.8, fontSize: 40, bold: true, color: BLUE_T, valign: "middle" });
      T(s, items[i][2], { x: x + 0.4, y: y + 2.6, w: cw - 0.6, h: 0.45, fontFace: MONO, fontSize: 20, bold: true });
      T(s, items[i][3], { x: x + 0.4, y: y + 3.08, w: cw - 0.6, h: 0.9, fontSize: 17, color: GREY });
    }
  }

  // =============== 7-8. VALOR AGREGADO ===============
  {
    const s = content("CONTROLE DE DESEMPENHO.", "Valor Agregado (o que já foi entregue) · Corte 22/11", 5);
    const items = [
      ["LuWallet", "BAC", "Orçamento no Término", "R$ 189.600", "Custo do projeto inteiro · 2.400 h"],
      ["LuCalendar", "VP", "Valor Planejado", "R$ 120.475", "Planejado até 22/11 · 1.525 h"],
      ["LuChartBar", "VA", "Valor Agregado", "R$ 120.475", "Já entregue, em R$ · 63,54%"],
      ["LuReceipt", "CR", "Custo Real", "R$ 120.475", "Gasto real, igual ao valor entregue"],
    ];
    const cw = (CW - 3 * 0.3) / 4;
    for (let i = 0; i < 4; i++) {
      const x = MX + i * (cw + 0.3), y = 2.2;
      const [ic, ab, nm, val, d] = items[i];
      card(s, x, y, cw, 4.3);
      await icon(s, ic, x + 0.3, y + 0.35, 0.6, BLUE_T);
      T(s, ab, { x: x + 0.3, y: y + 1.1, w: cw - 0.5, h: 0.6, fontFace: HEAD, fontSize: 30, color: BLUE_T, valign: "middle" });
      T(s, nm, { x: x + 0.3, y: y + 1.75, w: cw - 0.5, h: 0.75, fontFace: MONO, fontSize: 16, bold: true });
      T(s, val, { x: x + 0.3, y: y + 2.6, w: cw - 0.4, h: 0.55, fontSize: 26, bold: true, valign: "middle" });
      T(s, d, { x: x + 0.3, y: y + 3.25, w: cw - 0.5, h: 0.8, fontSize: 17, color: GREY });
    }
  }
  {
    const s = content("CONTROLE DE DESEMPENHO.", "Variações e Reservas · Corte 22/11", 5);
    const rows = [
      ["LuEqual", "Variações\n(prazo e custo)", "R$ 0,00", "Desvio zero de prazo e de custo"],
      ["LuHourglass", "Falta Executar\n(estimativa)", "R$ 69.125", "O que ainda falta fazer, em R$ · 875 h"],
      ["LuShieldCheck", "Contingência\nintacta", "R$ 19.328,65", "10% × R$ 193.286,52 · sem a proposta: 10% × R$ 189.600 = R$ 18.960"],
    ];
    for (let i = 0; i < 3; i++) {
      const y = 2.1 + i * 1.4, h = 1.2;
      card(s, MX, y, CW, h);
      await badge(s, rows[i][0], MX + 0.35, y + 0.22, 0.86);
      T(s, rows[i][1], { x: 2.25, y, w: 3.3, h, fontFace: MONO, fontSize: 19, bold: true, valign: "middle" });
      T(s, rows[i][2], { x: 5.7, y, w: 3.2, h, fontSize: 30, bold: true, color: BLUE_T, valign: "middle" });
      T(s, rows[i][3], { x: 9.0, y, w: 3.4, h, fontSize: 18, color: LIGHT, valign: "middle" });
    }
    card(s, MX, 6.35, CW, 0.85, { fill: BLUE });
    await icon(s, "LuCalculator", MX + 0.35, 6.35 + 0.2, 0.45, WHITE);
    T(s, "Orçamento total: R$ 193.286,52 + R$ 19.328,65 de reserva + R$ 1.040 de infraestrutura = R$ 213.655,17 (sem a proposta: R$ 209.600)", { x: MX + 1.05, y: 6.35, w: CW - 1.3, h: 0.85, fontSize: 18, bold: true, valign: "middle" });
  }

  // =============== 9-10. ENTREGA S4 ===============
  sec("Entrega Atual");
  {
    const s = content("ENTREGA EM ANDAMENTO.", "Semestre Atual · Reta Final da Release R1", 6);
    // progress bar
    T(s, "Semestre atual: 325 de 400 h feitas", { x: MX, y: 2.05, w: 6, h: 0.4, fontFace: MONO, fontSize: 16, color: GREY, valign: "middle" });
    T(s, "81,25%", { x: MX + CW - 3, y: 2.05, w: 3, h: 0.4, fontSize: 22, bold: true, color: BLUE_T, align: "right", valign: "middle" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX, y: 2.55, w: CW, h: 0.3, rectRadius: 0.15, fill: { color: "1C1C22" }, line: { color: "1C1C22", width: 0 } });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX, y: 2.55, w: CW * 0.8125, h: 0.3, rectRadius: 0.15, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
    // left: step 01
    await badge(s, "LuCircleCheck", MX, 3.35, 1.2);
    T(s, "01 · FEITO", { x: MX, y: 4.75, w: 3.6, h: 0.5, fontFace: MONO, fontSize: 22, bold: true });
    T(s, "Sprints 1 a 6 e parte da 7", { x: MX, y: 5.3, w: 3.6, h: 0.45, fontSize: 20, color: GREY });
    T(s, "Base técnica entregue:", { x: MX, y: 5.85, w: 3.6, h: 0.45, fontSize: 18, color: GREY });
    // right: stack chips
    const chips = [["LuLayers", "Arquitetura aprovada"], ["LuDatabase", "PostgreSQL"], ["LuPackage", "Prisma / Drizzle"], ["LuServer", "Fastify"],
      ["LuCode", "Next.js"], ["LuKeyRound", "Login com Google"], ["LuDatabaseBackup", "Backup"]];
    const cx0 = 4.75, cwid = (MX + CW - cx0 - 0.3) / 2;
    for (let i = 0; i < chips.length; i++) {
      const x = cx0 + (i % 2) * (cwid + 0.3), y = 3.35 + Math.floor(i / 2) * 0.88;
      card(s, x, y, cwid, 0.7, { line: BLUE });
      await icon(s, chips[i][0], x + 0.25, y + 0.15, 0.4, BLUE_T);
      T(s, chips[i][1], { x: x + 0.85, y, w: cwid - 1.0, h: 0.7, fontFace: MONO, fontSize: 16, bold: true, valign: "middle" });
    }
  }
  {
    const s = content("ENTREGA EM ANDAMENTO.", "Próximos Marcos até a Entrega do R1", 6);
    const steps = [
      ["LuFlag", "02 · 27/11/2026", "Beta R1 & Decisão", "Versão beta no ar e decisão formal do investidor sobre a proposta."],
      ["LuLock", "03 · 30/11/2026", "Versão candidata", "Congelamento do código e validação final da versão candidata."],
      ["LuRocket", "04 · 06/12/2026", "R1 em Produção", "Versão 1.0 no ar, confirmada. Não dá para acelerar: gente nova agora atrasaria."],
    ];
    const cw = (CW - 2 * 0.4) / 3;
    const centers = [0, 1, 2].map(i => MX + i * (cw + 0.4) + cw / 2);
    s.addShape(pres.shapes.LINE, { x: centers[0], y: 2.75, w: centers[2] - centers[0], h: 0, line: { color: BLUE, width: 2 } });
    for (let i = 0; i < 3; i++) {
      const last = i === 2, x = MX + i * (cw + 0.4);
      await badge(s, steps[i][0], centers[i] - 0.5, 2.25, 1.0, last ? {} : { fill: "000000", line: BLUE, color: BLUE_T });
      card(s, x, 3.65, cw, 3.0, last ? { fill: BLUE } : {});
      T(s, steps[i][1], { x: x + 0.3, y: 3.9, w: cw - 0.5, h: 0.45, fontFace: MONO, fontSize: 20, bold: true, color: last ? WHITE : BLUE_T });
      T(s, steps[i][2], { x: x + 0.3, y: 4.4, w: cw - 0.5, h: 0.5, fontSize: 22, bold: true });
      T(s, steps[i][3], { x: x + 0.3, y: 5.0, w: cw - 0.5, h: 1.45, fontSize: 18, color: last ? WHITE : LIGHT });
    }
  }

  // =============== 11-12. PROPOSTA DE MUDANÇA ===============
  sec("Proposta de Investimento");
  async function threeCols(s, items, filled) {
    const cw = (CW - 2 * 0.33) / 3;
    for (let i = 0; i < 3; i++) {
      const x = MX + i * (cw + 0.33), y = 2.2;
      card(s, x, y, cw, 4.3, filled ? { fill: BLUE } : {});
      await badge(s, items[i][0], x + 0.4, y + 0.4, 1.15, filled ? { fill: WHITE, line: WHITE, color: BLUE } : {});
      T(s, items[i][1], { x: x + 0.4, y: y + 1.8, w: cw - 0.6, h: 0.85, fontFace: MONO, fontSize: 20, bold: true, valign: "middle" });
      T(s, items[i][2], { x: x + 0.4, y: y + 2.8, w: cw - 0.6, h: 1.3, fontSize: 20, color: filled ? WHITE : LIGHT });
    }
  }
  {
    const s = content("PROPOSTA DE MUDANÇA.", "O Gargalo do Plano Original", 7, "A proposta: por que acelerar um projeto que está em dia?");
    await threeCols(s, [
      ["LuGraduationCap", "CALENDÁRIO ACADÊMICO", "Equipe opera só nos semestres letivos."],
      ["LuPause", "JANELAS OCIOSAS", "Paradas em dez–mar e jul–ago."],
      ["LuHourglass", "MONETIZAÇÃO TARDIA", "Receita de comissão de afiliados só começa no R2 (jun/2027)."],
    ], false);
  }
  {
    const s = content("PROPOSTA DE MUDANÇA.", "A Solução Proposta", 7, "Reforçar a equipe justamente nas janelas ociosas");
    await threeCols(s, [
      ["LuUserPlus", "REFORÇO DEDICADO", "1 Pleno (R$ 70/h) + 1 Júnior (R$ 45/h), 20 h/sem."],
      ["LuSun", "INÍCIO NAS FÉRIAS", "Contratação em 07/12/2026 para manter o ritmo."],
      ["LuFeather", "ALÍVIO FUTURO", "Libera 580 h da equipe fundadora no 5º e no 6º semestre."],
    ], true);
  }

  // =============== 13-14. IMPACTO ===============
  {
    const s = content("IMPACTO NO PRAZO.", "Releases Antecipadas · Plano Original × Com a Proposta", 8);
    const items = [
      ["-14 sem", "Release R2 · 98 dias antes", "27/06/2027", "21/03/2027"],
      ["-30 sem", "Release R3 · 212 dias antes", "07/12/2027", "09/05/2027"],
    ];
    const cw = (CW - 0.33) / 2;
    for (let i = 0; i < 2; i++) {
      const x = MX + i * (cw + 0.33), y = 2.2;
      card(s, x, y, cw, 4.3);
      await badge(s, "LuCalendarClock", x + 0.45, y + 0.45, 1.0);
      T(s, items[i][0], { x: x + 1.75, y: y + 0.35, w: cw - 2, h: 1.2, fontSize: 60, bold: true, color: BLUE_T, valign: "middle" });
      T(s, items[i][1], { x: x + 0.45, y: y + 1.8, w: cw - 0.8, h: 0.5, fontFace: MONO, fontSize: 19, bold: true });
      T(s, "PLANO ORIGINAL", { x: x + 0.45, y: y + 2.65, w: 2.2, h: 0.35, fontFace: MONO, fontSize: 14, color: GREY });
      T(s, "COM A PROPOSTA", { x: x + 3.25, y: y + 2.65, w: 2.2, h: 0.35, fontFace: MONO, fontSize: 14, color: BLUE_T });
      T(s, items[i][2], { x: x + 0.45, y: y + 3.05, w: 2.2, h: 0.55, fontSize: 24, color: GREY, strike: "sngStrike", valign: "middle" });
      await icon(s, "LuArrowRight", x + 2.55, y + 3.1, 0.45, BLUE_T);
      T(s, items[i][3], { x: x + 3.25, y: y + 3.05, w: 2.3, h: 0.55, fontSize: 24, bold: true, valign: "middle" });
    }
  }
  {
    const s = content("IMPACTO NO CUSTO.", "Quanto Custa Antecipar · Plano Original × Com a Proposta", 8);
    const items = [
      ["LuTimer", "+252 h", "Horas R2+R3", "800 h → 1.052 h (adaptação, coordenação, mentoria)"],
      ["LuCircleDollarSign", "+5,8%", "Custo R2+R3", "Custo de R2 e R3: R$ 63.200 → R$ 66.886,52"],
      ["LuWallet", "R$ 193,3k", "Novo BAC", "Orçamento total com a proposta: R$ 193.286,52"],
    ];
    const cw = (CW - 2 * 0.33) / 3;
    for (let i = 0; i < 3; i++) {
      const x = MX + i * (cw + 0.33), y = 2.2;
      card(s, x, y, cw, 3.6);
      await badge(s, items[i][0], x + 0.4, y + 0.35, 0.9);
      T(s, items[i][1], { x: x + 0.4, y: y + 1.35, w: cw - 0.6, h: 0.75, fontSize: 40, bold: true, color: BLUE_T, valign: "middle" });
      T(s, items[i][2], { x: x + 0.4, y: y + 2.15, w: cw - 0.6, h: 0.4, fontFace: MONO, fontSize: 18, bold: true });
      T(s, items[i][3], { x: x + 0.4, y: y + 2.55, w: cw - 0.6, h: 0.95, fontSize: 16, color: GREY });
    }
    card(s, MX, 6.1, CW, 0.95, { fill: BLUE });
    await icon(s, "LuTrendingDown", MX + 0.35, 6.1 + 0.22, 0.5, WHITE);
    T(s, "Cada semana antecipada custa apenas R$ 121,72 a mais no orçamento (BAC).", { x: MX + 1.1, y: 6.1, w: CW - 1.4, h: 0.95, fontSize: 21, bold: true, valign: "middle" });
  }

  // =============== 15-16. ESTRUTURA FINANCEIRA ===============
  {
    const s = content("ESTRUTURA FINANCEIRA.", "Uso do Caixa · Aporte de R$ 60.000", 9);
    const items = [
      ["LuUsers", "R$ 45.543", "Contratados"],
      ["LuSearch", "R$ 3.000", "Recrutamento"],
      ["LuServer", "R$ 1.200", "2º servidor"],
      ["LuShieldCheck", "R$ 7.462", "Folga 15%"],
    ];
    const expl = ["Horas dos 2 devs × custo-hora", "Contas e ferramentas", "Servidor extra por 12 meses", "Folga de 15% sobre o subtotal"];
    const cw = (CW - 3 * 0.3) / 4;
    for (let i = 0; i < 4; i++) {
      const x = MX + i * (cw + 0.3), y = 2.2;
      card(s, x, y, cw, 3.95);
      T(s, expl[i], { x: x + 0.15, y: y + 3.2, w: cw - 0.3, h: 0.65, fontSize: 16, color: GREY, align: "center" });
      await badge(s, items[i][0], x + (cw - 1.2) / 2, y + 0.5, 1.2);
      T(s, items[i][1], { x: x + 0.15, y: y + 1.9, w: cw - 0.3, h: 0.7, fontSize: 30, bold: true, color: BLUE_T, align: "center", valign: "middle" });
      T(s, items[i][2], { x: x + 0.15, y: y + 2.6, w: cw - 0.3, h: 0.5, fontFace: MONO, fontSize: 20, bold: true, align: "center" });
    }
    card(s, MX, 6.35, CW, 0.75, { fill: BLUE });
    await icon(s, "LuCalculator", MX + 0.35, 6.35 + 0.16, 0.43, WHITE);
    T(s, "Necessidade calculada R$ 57.205  →  captação arredondada para R$ 60.000", { x: MX + 1.05, y: 6.35, w: CW - 1.3, h: 0.75, fontSize: 20, bold: true, valign: "middle" });
  }
  {
    const s = content("ESTRUTURA SOCIETÁRIA.", "Valor da Empresa e Quadro Societário", 9);
    const cw = 5.4;
    const blocks = [["VALOR ANTES DO APORTE", "R$ 240.000", "1,9× o custo de refazer o R1 (R$ 126.680)"], ["VALOR DEPOIS DO APORTE", "R$ 300.000", "R$ 240.000 + aporte de R$ 60.000"]];
    for (let i = 0; i < 2; i++) {
      const x = i ? MX + CW - cw : MX, y = 2.1;
      card(s, x, y, cw, 2.35, i ? { fill: BLUE } : {});
      T(s, blocks[i][0], { x: x + 0.4, y: y + 0.3, w: cw - 0.6, h: 0.4, fontFace: MONO, fontSize: 18, bold: true, color: i ? WHITE : BLUE_T });
      T(s, blocks[i][1], { x: x + 0.4, y: y + 0.75, w: cw - 0.6, h: 0.75, fontSize: 40, bold: true, valign: "middle" });
      T(s, blocks[i][2], { x: x + 0.4, y: y + 1.5, w: cw - 0.6, h: 0.7, fontSize: 18, color: i ? WHITE : GREY });
    }
    await icon(s, "LuArrowRight", MX + cw + (CW - 2 * cw - 0.6) / 2, 2.1 + 0.75, 0.6, BLUE_T);
    T(s, "QUADRO SOCIETÁRIO · QUEM É DONO DE QUÊ", { x: MX, y: 4.7, w: CW, h: 0.4, fontFace: MONO, fontSize: 18, bold: true, color: BLUE_T });
    const iw = CW * 0.2 - 0.1;
    card(s, MX, 5.2, iw, 1.4, { fill: SOFT, line: SOFT });
    T(s, [{ text: "20%", options: { fontSize: 30, bold: true, breakLine: true } }, { text: "Investidor", options: { fontFace: MONO, fontSize: 16, bold: true } }],
      { x: MX + 0.25, y: 5.2, w: iw - 0.4, h: 1.4, valign: "middle" });
    card(s, MX + iw + 0.2, 5.2, CW - iw - 0.2, 1.4, { fill: BLUE });
    T(s, [{ text: "80%", options: { fontSize: 30, bold: true, breakLine: true } }, { text: "5 Fundadores · 16% cada (antes 20%)", options: { fontFace: MONO, fontSize: 16, bold: true } }],
      { x: MX + iw + 0.5, y: 5.2, w: CW - iw - 0.8, h: 1.4, valign: "middle" });
  }

  // =============== 17-18. SENSIBILIDADE DE RECEITA ===============
  {
    const s = content("SENSIBILIDADE DE RECEITA.", "Retorno dos Afiliados · Receita Mensal", 10, "3,2 meses antecipados pós-R2 · R$/mês por cenário");
    // colunas desenhadas com formas (rótulos fixos, iguais em qualquer visualizador)
    const cols = [["Pessimista", "Aporte volta em 83 meses", "R$ 720", 720], ["Base", "Aporte volta em 11,9 meses", "R$ 5.040", 5040], ["Otimista", "Aporte volta em 2,5 meses", "R$ 24.000", 24000]];
    const base = 5.75, hmax = 2.95, cw2 = 1.75, slot = 7.3 / 3;
    s.addShape(pres.shapes.LINE, { x: MX, y: base, w: 7.3, h: 0, line: { color: "71717A", width: 1.5 } });
    cols.forEach(([nome, pb, rot, v], i) => {
      const cx = MX + i * slot + (slot - cw2) / 2, h = Math.max(0.08, hmax * v / 24000);
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: base - h, w: cw2, h, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      T(s, rot, { x: cx - 0.4, y: base - h - 0.5, w: cw2 + 0.8, h: 0.45, fontSize: 20, bold: true, align: "center", valign: "bottom" });
      T(s, [{ text: nome, options: { bold: true, color: WHITE, breakLine: true } }, { text: pb, options: { color: GREY } }],
        { x: MX + i * slot, y: base + 0.12, w: slot, h: 1.1, fontSize: 17, align: "center" });
    });
    const x = 8.45, cw = MX + CW - x;
    card(s, x, 2.2, cw, 4.75);
    T(s, "CENÁRIO BASE", { x: x + 0.35, y: 2.4, w: cw - 0.6, h: 0.4, fontFace: MONO, fontSize: 16, bold: true, color: BLUE_T });
    T(s, [{ text: "R$ 5.040", options: { fontSize: 40, bold: true, color: BLUE_T } }, { text: "/mês", options: { fontSize: 22, color: GREY } }],
      { x: x + 0.35, y: 2.85, w: cw - 0.5, h: 0.8, valign: "middle" });
    const rows = [["LuUsers", "8 mil visitas/mês", 0.5], ["LuShoppingCart", "36 vendas/mês", 0.5], ["LuCoins", "Ganho líquido da antecipação (receita − custo extra): R$ 12.539,50", 1.15]];
    let yy = 3.8;
    for (let i = 0; i < 3; i++) {
      const y = yy;
      await icon(s, rows[i][0], x + 0.35, y + 0.06, 0.42, BLUE_T);
      T(s, rows[i][1], { x: x + 0.95, y, w: cw - 1.1, h: rows[i][2], fontSize: 18, valign: "middle" });
      yy += rows[i][2] + 0.1;
    }
    T(s, "O aporte de R$ 60.000 se paga em 11,9 meses", { x: x + 0.35, y: yy + 0.05, w: cw - 0.6, h: 0.55, fontSize: 16, color: GREY });
  }
  {
    const s = content("APORTE EM 2 PARCELAS.", "R$ 60 mil Liberados por Marco de Entrega", 10);
    const items = [["LuFlag", "PARCELA 1", "R$ 30 mil", "Liberada em 07/12/2026", "Proposta aprovada + R1 (versão 1.0) aceito"], ["LuTrendingUp", "PARCELA 2", "R$ 30 mil", "Liberada em 21/03/2027", "R2 (versão 1.1) entregue no cenário acelerado"]];
    const cw = 5.4;
    for (let i = 0; i < 2; i++) {
      const x = i ? MX + CW - cw : MX, y = 2.2;
      card(s, x, y, cw, 3.6);
      await badge(s, items[i][0], x + 0.45, y + 0.45, 1.0);
      T(s, items[i][1], { x: x + 1.75, y: y + 0.45, w: cw - 2.0, h: 1.0, fontFace: HEAD, fontSize: 26, color: BLUE_T, valign: "middle" });
      T(s, items[i][2], { x: x + 0.45, y: y + 1.7, w: cw - 0.7, h: 0.75, fontSize: 40, bold: true, valign: "middle" });
      T(s, [{ text: items[i][3], options: { fontFace: MONO, bold: true, color: WHITE, breakLine: true } }, { text: items[i][4], options: { color: GREY } }],
        { x: x + 0.45, y: y + 2.35, w: cw - 0.7, h: 0.95, fontSize: 18 });
    }
    await icon(s, "LuArrowRight", MX + cw + (CW - 2 * cw - 0.6) / 2, 2.2 + 1.4, 0.6, BLUE_T);
    card(s, MX, 5.95, CW, 0.85, { fill: BLUE });
    await icon(s, "LuHandshake", MX + 0.35, 5.95 + 0.2, 0.45, WHITE);
    T(s, "Total de R$ 60 mil, com desembolsos ligados à entrega do R1 e à entrega do R2.", { x: MX + 1.05, y: 5.95, w: CW - 1.3, h: 0.85, fontSize: 20, bold: true, valign: "middle" });
  }

  // =============== 19-20. GESTÃO DE RISCOS ===============
  sec("Riscos");
  async function riskCard(s, x, y, w, h, r, filled) {
    card(s, x, y, w, h, filled ? { fill: BLUE } : {});
    T(s, r.id, { x: x + 0.35, y: y + 0.3, w: 1.6, h: 0.6, fontFace: HEAD, fontSize: 26, color: filled ? WHITE : BLUE_T, valign: "middle" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + w - 3.95, y: y + 0.38, w: 3.65, h: 0.45, rectRadius: 0.22, fill: { color: filled ? WHITE : BLUE }, line: { color: filled ? WHITE : BLUE, width: 0 } });
    T(s, r.score, { x: x + w - 3.95, y: y + 0.38, w: 3.65, h: 0.45, fontFace: MONO, fontSize: 11.5, bold: true, color: filled ? BLUE : WHITE, align: "center", valign: "middle" });
    T(s, r.title, { x: x + 0.35, y: y + 1.05, w: w - 0.6, h: 0.85, fontSize: 22, bold: true });
    T(s, "MITIGAÇÃO", { x: x + 0.35, y: y + 2.0, w: 3, h: 0.3, fontFace: MONO, fontSize: 13, bold: true, color: filled ? "DCE3FA" : BLUE_T });
    T(s, r.mit, { x: x + 0.35, y: y + 2.32, w: w - 0.6, h: 1.25, fontSize: 18, color: filled ? WHITE : LIGHT });
    await icon(s, "LuUser", x + 0.35, y + h - 0.68, 0.36, filled ? WHITE : BLUE_T);
    T(s, r.resp, { x: x + 0.85, y: y + h - 0.78, w: w - 1.1, h: 0.56, fontSize: 16, color: filled ? WHITE : GREY, valign: "middle" });
  }
  {
    const s = content("GESTÃO DE RISCOS.", "Riscos Críticos · Nota Máxima (R02 e R10)", 11);
    const cw = (CW - 0.33) / 2;
    await riskCard(s, MX, 2.15, cw, 4.45, { id: "R02", score: "NOTA 9 · PROB. ALTA × IMPACTO ALTO", title: "Configuração do servidor",
      mit: "Configuração guardada no repositório e testada antes do beta do R1 (27/11).", resp: "Victor (Líder Téc.) / Ana Tayná (Back-End)" }, true);
    await riskCard(s, MX + cw + 0.33, 2.15, cw, 4.45, { id: "R10", score: "NOTA 9 · PROB. ALTA × IMPACTO ALTO", title: "Bloqueadores de anúncio barrando links de afiliado",
      mit: "O servidor faz o redirecionamento e esconde o link de afiliado.", resp: "Ana Tayná (Back-End) / Yago (Front-End)" }, true);
    caption(s, "R02 e R10: únicos com nota máxima (9) · Numeração conforme Matriz de Riscos v3", 6.78);
  }
  {
    const s = content("GESTÃO DE RISCOS.", "Riscos da Proposta em Destaque (R12 e R14)", 11);
    const cw = (CW - 0.33) / 2;
    await riskCard(s, MX, 2.15, cw, 4.45, { id: "R12", score: "NOTA 6 · PROB. MÉDIA × IMPACTO ALTO", title: "Não aprovação da proposta ou atraso das parcelas",
      mit: "Estudo financeiro com projeto em dia; parcelas ligadas às entregas.", resp: "Mirela (GP)" }, false);
    await riskCard(s, MX + cw + 0.33, 2.15, cw, 4.45, { id: "R14", score: "NOTA 6 · PROB. MÉDIA × IMPACTO ALTO", title: "Gargalo no Líder Técnico (o time novo depende dele)",
      mit: "Limite de 2 h por semana de mentoria, listas de checagem e revisões divididas.", resp: "Victor (Líder Téc.) / Mirela (GP)" }, false);
    caption(s, "R12 e R14: riscos da proposta com nota 6 · Numeração conforme Matriz de Riscos v3", 6.78);
  }

  // =============== 21-24. MITIGAÇÃO ===============
  async function riskRows(s, rows) {
    // grade 2×2 de cards (3 riscos: o terceiro ocupa a largura toda; 2 riscos: lado a lado com a altura toda)
    const gap = 0.25, top = 2.1, bottom = 6.72, cw = (CW - gap) / 2;
    const two = rows.length === 2, h = two ? bottom - top : (bottom - top - gap) / 2;
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const full = rows.length === 3 && i === 2;
      const x = full ? MX : MX + (i % 2) * (cw + gap), y = two ? top : top + Math.floor(i / 2) * (h + gap), w = full ? CW : cw;
      const hi = r.score >= 9;
      card(s, x, y, w, h, { line: hi ? BLUE : "2E3A6E" });
      // cabeçalho: ícone, ID, categoria, score
      await icon(s, r.icon, x + 0.3, y + 0.22, 0.42, BLUE_T);
      T(s, r.id, { x: x + 0.85, y: y + 0.18, w: 1.2, h: 0.5, fontFace: HEAD, fontSize: 20, valign: "middle" });
      T(s, r.cat.split(" · ")[0].replace("Recursos Humanos", "RH").toUpperCase(), { x: x + 2.05, y: y + 0.18, w: w - 4.3, h: 0.5, fontFace: MONO, fontSize: 12, bold: true, color: BLUE_T, valign: "middle" });
      const d = 0.55, sx = x + w - 0.3 - d;
      T(s, r.pi, { x: sx - 1.75, y: y + 0.18, w: 1.65, h: 0.5, fontSize: 14, color: GREY, align: "right", valign: "middle" });
      s.addShape(pres.shapes.OVAL, { x: sx, y: y + 0.155, w: d, h: d, fill: { color: hi ? BLUE : "000000" }, line: { color: r.score >= 6 ? BLUE : "71717A", width: 1.5 } });
      T(s, String(r.score), { x: sx, y: y + 0.155, w: d, h: d, fontSize: 18, bold: true, align: "center", valign: "middle", color: r.score >= 6 ? WHITE : GREY });
      // título e mitigação
      T(s, r.title, { x: x + 0.3, y: y + 0.78, w: w - 0.6, h: two ? 0.6 : 0.42, fontSize: two ? 22 : 19, bold: true, valign: "middle" });
      T(s, r.mit, { x: x + 0.3, y: y + (two ? 1.5 : 1.22), w: w - 0.6, h: h - (two ? 1.6 : 1.28), fontSize: two ? 18 : 17, color: LIGHT });
    }
    caption(s, "Nota = probabilidade × impacto (1 a 3 cada) · Numeração conforme Matriz de Riscos v3", 6.85);
  }
  const R = [
    { id: "R01", icon: "LuDatabase", cat: "Técnico · Banco de dados", title: "Conflitos entre Prisma e Drizzle", score: 6, pi: "Média × Alto",
      mit: "Prisma para tabelas e Drizzle para consultas rápidas; teste feito e modelo revisado." },
    { id: "R02", icon: "LuServer", cat: "Técnico · Infraestrutura", title: "Configuração do servidor", score: 9, pi: "Alta × Alto",
      mit: "Configuração versionada desde o início do semestre; publicação testada antes do beta do R1 (27/11)." },
    { id: "R03", icon: "LuClipboardList", cat: "Gestão · Escopo/Catálogo", title: "Atraso na curadoria do catálogo", score: 4, pi: "Média × Médio",
      mit: "Catálogo inicial só com CPUs, placas de vídeo, notebooks e celulares, com validação." },
    { id: "R04", icon: "LuPlug", cat: "Integração · Site e servidor", title: "Contratos e tipagem entre site e servidor", score: 6, pi: "Média × Alto",
      mit: "TypeScript em todo o sistema e contratos site-servidor revisados antes de cada sprint." },
    { id: "R05", icon: "LuGraduationCap", cat: "Externo · Equipe", title: "Sobrecarga acadêmica da equipe", score: 6, pi: "Alta × Médio",
      mit: "Sprints niveladas, com folga nas semanas de prova e recesso de 21/12/2026 a 03/01/2027." },
    { id: "R06", icon: "LuShield", cat: "Segurança · Disponibilidade", title: "Ataques de sobrecarga e de força bruta", score: 6, pi: "Média × Alto",
      mit: "Limite de acessos por minuto, portas do servidor fechadas e proteção da Cloudflare." },
    { id: "R07", icon: "LuLock", cat: "Segurança · Dados/LGPD", title: "Invasão, injeção de comandos ou acesso indevido", score: 3, pi: "Baixa × Alto",
      mit: "Consultas protegidas contra invasão, senhas criptografadas e cada perfil acessando só o que pode." },
    { id: "R08", icon: "LuGlobe", cat: "Segurança · Aplicação Web", title: "Ataques ao navegador ou à sessão", score: 6, pi: "Média × Alto",
      mit: "Proteções do navegador no servidor, sessão segura e textos dos usuários limpos." },
    { id: "R09", icon: "LuCloud", cat: "Terceiros · Dependências", title: "Falha no Google, servidor ou pacotes", score: 4, pi: "Média × Médio",
      mit: "Login por e-mail como alternativa ao Google, pacotes verificados e backups externos." },
    { id: "R10", icon: "LuBan", cat: "Negócios · Afiliados", title: "Bloqueadores de anúncio e afiliados", score: 9, pi: "Alta × Alto",
      mit: "O servidor faz o redirecionamento e esconde o link de afiliado, em vez de expô-lo no site." },
    { id: "R11", icon: "LuSearch", cat: "Técnico · Algoritmos/Escopo", title: "Busca estourar as 80 h do R2", score: 6, pi: "Média × Alto",
      mit: "Busca nativa do PostgreSQL com tags, sinônimos e pesos definidos no painel." },
    { id: "R12", icon: "LuCoins", cat: "Financeiro · Proposta", title: "Proposta recusada ou parcela atrasada", score: 6, pi: "Média × Alto",
      mit: "Estudo financeiro com projeto em dia; parcelas ligadas às entregas." },
    { id: "R13", icon: "LuUserPlus", cat: "Recursos Humanos (proposta)", title: "Atraso no recrutamento ou na adaptação", score: 4, pi: "Média × Médio",
      mit: "Triagem desde 23/11, arquitetura e ambiente prontos, mentoria desde 07/12/2026." },
    { id: "R14", icon: "LuUserCog", cat: "Técnico · Pessoas (proposta)", title: "Gargalo no Líder Técnico (o time novo depende dele)", score: 6, pi: "Média × Alto",
      mit: "Limite de 2 h por semana de mentoria, listas de checagem na revisão de código e revisões divididas com Ana Tayná e Mariana." },
    { id: "R15", icon: "LuTrendingDown", cat: "Negócios · Receita (proposta)", title: "Tráfego abaixo do cenário base", score: 6, pi: "Média × Alto",
      mit: "2ª parcela só após a entrega do R2; visitas e cliques medidos desde o R1." },
    { id: "R16", icon: "LuHandshake", cat: "Governança · Societário (proposta)", title: "Governança com o novo sócio", score: 2, pi: "Baixa × Médio",
      mit: "Acordo de acionistas antes do aporte; investidor só vota em mudanças de escopo." },
  ];
  await riskRows(content("MITIGAÇÃO DE RISCOS.", "Matriz de Riscos v3 · R01 a R04", 12), R.slice(0, 4));
  await riskRows(content("MITIGAÇÃO DE RISCOS.", "Matriz de Riscos v3 · R05 a R07", 12), R.slice(4, 7));
  await riskRows(content("MITIGAÇÃO DE RISCOS.", "Matriz de Riscos v3 · R08 a R11", 13), R.slice(7, 11));
  await riskRows(content("MITIGAÇÃO DE RISCOS.", "Matriz de Riscos v3 · R12 a R14 (riscos da proposta)", 13), R.slice(11, 14));
  await riskRows(content("MITIGAÇÃO DE RISCOS.", "Matriz de Riscos v3 · R15 e R16 (negócio da proposta)", "novo"), R.slice(14, 16));

  // =============== BALANÇO DE RISCOS (novo; fatos da Matriz v2 e do Status Report v2.1) ===============
  {
    const s = content("BALANÇO DE RISCOS.", "Situação dos Riscos no Corte de 22/11/2026", "novo (balanço pedido pelo professor)");
    const crit = R.filter(r => r.score >= 9).length, med = R.filter(r => r.score >= 5 && r.score < 9).length, low = R.length - crit - med;
    const media = (R.reduce((a, r) => a + r.score, 0) / R.length).toFixed(1).replace(".", ",");
    const rows = [
      ["LuRadar", `${R.length} riscos`, "monitorados", `${crit} críticos (nota 9: R02 e R10) · ${med} médios · ${low} baixos · nota média ${media}`],
      ["LuShieldCheck", "0", "materializados", "Nenhum risco virou problema · Reserva intacta: 10% × R$ 193.286,52 = R$ 19.328,65 (sem a proposta: 10% × R$ 189.600 = R$ 18.960)"],
      ["LuCalendarClock", "27/11", "próxima verificação", "Beta do R1 valida R02 (servidor) · R10 (afiliados) só dá para testar no R2 · decisão da proposta resolve R12 · acordo de acionistas trata R16"],
    ];
    for (let i = 0; i < 3; i++) {
      const y = 2.15 + i * 1.55, h = 1.35;
      card(s, MX, y, CW, h);
      await badge(s, rows[i][0], MX + 0.35, y + 0.24, 0.87);
      T(s, rows[i][1], { x: 2.3, y: y + 0.12, w: 3.0, h: 0.72, fontSize: 36, bold: true, color: BLUE_T, valign: "middle" });
      T(s, rows[i][2], { x: 2.3, y: y + 0.82, w: 3.0, h: 0.4, fontFace: MONO, fontSize: 17, bold: true });
      T(s, rows[i][3], { x: 5.5, y, w: MX + CW - 5.5 - 0.3, h, fontSize: 18, color: LIGHT, valign: "middle" });
    }
  }

  // =============== 25. DECISÃO ===============
  sec("Decisão e Encerramento");
  {
    const s = content("DECISÃO SOLICITADA.", "Decisão até 27/11/2026: Aprovar a Proposta", 14);
    const cw = (CW - 0.33) / 2, y = 2.15, h = 3.75;
    const opts = [
      { fill: true, ic: "LuCircleCheck", head: "APROVAR A PROPOSTA", rows: [["LuCoins", "R$ 60.000 em 2 parcelas (R1 e R2)"], ["LuChartPie", "20% das ações ao investidor"], ["LuRocket", "Produto completo em 09/05/2027 — 7 meses antes"]] },
      { fill: false, ic: "LuShield", head: "PLANO B · PLANO ORIGINAL", rows: [["LuFlag", "Mantém o plano original"], ["LuCalendarCheck", "R1 entregue em 06/12/2026, sem impacto"]] },
    ];
    for (let i = 0; i < 2; i++) {
      const o = opts[i], x = MX + i * (cw + 0.33);
      card(s, x, y, cw, h, o.fill ? { fill: BLUE } : {});
      await badge(s, o.ic, x + 0.4, y + 0.35, 0.85, o.fill ? { fill: WHITE, line: WHITE, color: BLUE } : {});
      T(s, o.head, { x: x + 1.45, y: y + 0.35, w: cw - 1.7, h: 0.85, fontFace: MONO, fontSize: 22, bold: true, valign: "middle" });
      for (let j = 0; j < o.rows.length; j++) {
        const ry = y + 1.5 + j * 0.72;
        await icon(s, o.rows[j][0], x + 0.5, ry + 0.1, 0.4, o.fill ? WHITE : BLUE_T);
        T(s, o.rows[j][1], { x: x + 1.1, y: ry, w: cw - 1.35, h: 0.62, fontSize: 19, color: o.fill ? WHITE : LIGHT, valign: "middle" });
      }
    }
    await icon(s, "LuCalendar", MX, 6.25, 0.45, BLUE_T);
    T(s, "Marco de decisão: 27/11/2026, junto ao beta do R1 e à minuta do acordo de acionistas.", { x: MX + 0.7, y: 6.1, w: CW - 0.7, h: 0.75, fontSize: 19, bold: true, color: BLUE_T, valign: "middle" });
  }

  // =============== 26. ENCERRAMENTO ===============
  {
    const s = pres.addSlide({ masterName: "HardDex Capa", sectionTitle: section });
    const lw = 4.0, lh = lw * 525 / 1830;
    s.addImage({ path: path.join(IMG, "logo.png"), x: (W - lw) / 2, y: 1.2, w: lw, h: lh, altText: "Logo HardDex" });
    T(s, "A EQUIPE AGRADECE\nSUA ATENÇÃO.", { x: 1.5, y: 2.75, w: W - 3, h: 1.3, fontFace: HEAD, fontSize: 32, align: "center", valign: "middle" });
    T(s, "PERGUNTAS?", { x: 1.5, y: 4.95, w: W - 3, h: 0.9, fontFace: HEAD, fontSize: 38, color: BLUE_T, align: "center", valign: "middle" });
  }

  if (noteIdx !== NOTES.length) throw new Error("notas: " + noteIdx + " de " + NOTES.length);
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})().catch(e => { console.error(e); process.exit(1); });
