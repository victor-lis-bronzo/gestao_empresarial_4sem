# Gestão de Projetos de Software: HardDex (4º semestre)

Material do grupo **HardDex** na disciplina **Gestão de Projetos de Software (BRAGEPR)** do curso de Análise e Desenvolvimento de Sistemas do **IFSP, campus Bragança Paulista**, semestre 2026/2. Avaliador: Prof. André Luis Maciel Leme.

O HardDex ("Simplificando o hardware!") é uma plataforma web que traduz especificações de hardware para linguagem simples e compara dispositivos pelo **Tipo de Uso (TDU)** de quem vai comprar. O grupo trata o produto como um projeto de 6 semestres (2025/1 a 2027/2), com 3 releases. Nesta disciplina, a gestão segue o PMBOK 8ª edição (escopo, cronograma, custo/EVM, riscos, comunicação e configuração) com execução em Scrum.

| Integrante | Papel | Nível |
|---|---|---|
| Mirela Andressa de Oliveira | Gerente do Projeto | GP |
| Victor Lis Bronzo | Líder Técnico (Dev Full-Stack) | Sr |
| Ana Tayná Reis Maciel | Back-End | Pl |
| Mariana Mourão Sampaio | Banco de Dados e QA | Pl |
| Yago Barbosa Dini | Front-End | Jr |

## Linha do tempo das entregas

| Data | Entrega | Pasta |
|---|---|---|
| 12/10/2026 | 1ª apresentação: Status Report RS-HDX-2026-10 (corte 12/10), slides e cronograma | [`apresentacao_1/`](apresentacao_1/) |
| 12/11/2026 | Reunião com os GPs + revisão após o feedback do professor: Status Report v2 (corte 12/11), proposta de investimento CR-01, novo Gantt e pauta dos GPs | [`apresentacao_2.0/`](apresentacao_2.0/) |
| 07/12/2026 | Entrega final do Status Report na disciplina | — |

O que mudou de uma versão para a outra, e por quê, está no [`CHANGELOG.md`](CHANGELOG.md).

## Estrutura do repositório

```
.
├── README.md                  este arquivo
├── CHANGELOG.md               mudanças entre a apresentação 1 e a 2.0
├── anotacoes_professor/       materiais de aula convertidos para Markdown (referência)
├── apresentacao_1/            entregáveis da 1ª apresentação (corte 12/10/2026)
└── apresentacao_2.0/          entregáveis revisados (corte 12/11/2026)
    ├── StatusReport_HardDex_v2.docx / .pdf
    ├── GP_v2.docx / .pdf      pauta da reunião dos gerentes de projeto
    ├── HardDex_Cronograma_v2.gan
    └── memoria_de_calculo/    scripts que geram todos os números, gráficos e documentos
```

## Resultados principais da versão 2.0

**Situação em 12/11/2026:** status VERDE, 1.489 de 2.400 h agregadas (62,04%). VP = VA = CR, e IDP = IDC = IDPT = 1,00.

**Valor-hora revisado.** O relatório anterior usava R$ 40,00/h igual para todos, o que subestimava o projeto em 49,4%. Agora o custo-empresa varia pela senioridade:
- GP R$ 110, Sr R$ 100, Pl R$ 70, Jr R$ 45 por hora (média de R$ 79/h);
- o orçamento total (BAC) passa de R$ 96.000 para **R$ 189.600**.

**Proposta CR-01 (venda de ações para acelerar):**
- **Aporte:** 20% das ações por R$ 60.000, com valuation pré-money de R$ 240.000 (método Berkus, conferido pelo custo de reposição).
- **Uso do dinheiro:** contratar 2 devs (1 Pl e 1 Jr, 20 h/semana cada).
- **Ganho de prazo:** R2 sai em 21/03/2027 em vez de 27/06/2027 (−14 semanas) e R3 em 09/05/2027 em vez de 07/12/2027 (−30 semanas).
- **Custo da aceleração:** +252 h e +R$ 3.686,52 de custo econômico (+5,8%), por causa da Lei de Brooks (rampa de aprendizado, coordenação e mentoria).
- **Liberação:** 2 parcelas de R$ 30.000, condicionadas ao aceite do R1 e do R2.

Detalhes, fórmulas e premissas: [`apresentacao_2.0/README.md`](apresentacao_2.0/README.md) e o Anexo A do Status Report.

## Como regenerar os documentos

Todos os números, gráficos, o `.gan` e os `.docx` da versão 2.0 saem de uma única memória de cálculo. Basta alterar uma premissa em `calc.py` e rodar:

```bash
cd apresentacao_2.0/memoria_de_calculo
python3 -m pip install -r requirements.txt   # matplotlib
npm install                                  # docx (docx-js)
./build.sh
```

Requisitos: Python 3.10+, Node.js 18+ e, para os PDFs, LibreOffice (`soffice`). Passo a passo em [`apresentacao_2.0/memoria_de_calculo/README.md`](apresentacao_2.0/memoria_de_calculo/README.md).

## Como abrir os arquivos

- `.docx` / `.pptx`: Microsoft Office, LibreOffice ou Google Docs.
- `.gan`: [GanttProject](https://www.ganttproject.biz/) 3.x. A linha de base original está em *Projeto → Linhas de base*.

## Aviso sobre o material de referência

A pasta `anotacoes_professor/` reúne o material de aula e as leituras da disciplina convertidos para Markdown, para consulta do grupo. Os direitos pertencem aos autores. Os textos integrais do *Guia PMBOK* (6ª e 8ª edição), de propriedade do PMI, **não** estão no repositório.

Os números do projeto são uma **simulação acadêmica**: valores de mercado, tráfego e valuation são estimativas de planejamento, não dados medidos.
