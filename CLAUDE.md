# HardDex: guia para o Claude neste repositório

Projeto acadêmico (IFSP Bragança Paulista, Gestão de Projetos de Software, prof. André Leme). Veja o `README.md` para o contexto geral.

## Apresentação de hoje (23/11/2026): o que vale

Quando o usuário perguntar sobre "a apresentação de hoje", "o deck", "os docs" ou "o que levo", responda com **somente** os arquivos de `apresentacao_final/entregaveis/` (versão **v3**, corte 22/11/2026). As pastas `apresentacao_1/` e `apresentacao_2.0/` são histórico e não vão para hoje.

| Papel | Arquivo |
|---|---|
| Deck principal (10 min): 19 slides + divisor "ANEXO" + 9 slides de apoio para perguntas, com notas do orador | `Gestão - HardDex v3 (10 min).pptx` e `.pdf` |
| Deck completo (reserva): 28 slides | `Gestão - HardDex v3.pptx` e `.pdf` |
| Relatório | `StatusReport_HardDex_v3.0_corte_22-11-2026.docx` e `.pdf` |
| Dossiê de gestão | `Dossiê de Gestão de Projetos - HardDex v3.docx` e `.pdf` |
| Riscos | `Matriz de Riscos - HardDex v3.xlsx` |
| Mapa dos slides (Canva de 15 → leve de 28) | `Relação de slides - antes e depois.md` |

- O deck de 10 min sai do completo pelo script `apresentacao_final/slides/versao_10min.py`. O completo sai de `apresentacao_final/slides/build.js`.
- Os documentos são atualizados por `apresentacao_final/atualizacao_docs/` (`sr_update.py`, `dossie_update.py`, `matriz_update.py`).
- Cópias em `~/Desktop/gestao/` (`revisao-1`, `revisao-2`) são versões antigas: ignore. O PDF de 10 min do repo já é o mais recente (20:04 de 22/11).
- Números de referência: status VERDE, IDP = IDC = 1,00, valor-hora médio R$ 79, proposta CR-01 (20% das ações por R$ 60.000, 2 parcelas de R$ 30.000), orçamento total R$ 213.655,17 com reserva. Confira nos documentos v3 antes de citar, pois o v2 tinha outros valores.
- Entrega final do Status Report: 07/12/2026.

## Regras

- Não regenere nem altere os entregáveis sem o usuário pedir; ele pode estar prestes a apresentar.
- Se o usuário disser que mudou o plano de hoje (por exemplo, usar o deck completo), atualize esta seção.
- Rascunhos e PDFs gerados por skills ficam em `~/Downloads`, nunca no repo.
