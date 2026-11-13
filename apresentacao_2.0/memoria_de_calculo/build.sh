#!/usr/bin/env bash
# Regera todos os entregáveis da apresentação 2.0 a partir da memória de cálculo.
# Uso: ./build.sh   (rodar dentro de apresentacao_2.0/memoria_de_calculo)
set -euo pipefail
cd "$(dirname "$0")"
PY="${PYTHON:-python3}"
OUT=..

"$PY" calc.py                                   # 1. números -> numeros.json
"$PY" gerar_gan.py "$OUT/HardDex_Cronograma_v2.gan"  # 2. cronograma -> .gan + tarefas.json
"$PY" graficos.py                               # 3. gráficos -> img/*.png
node gerar_docx.js "$OUT/StatusReport_HardDex_v2.docx"  # 4. Status Report
node gerar_gp.js "$OUT/GP_v2.docx"                    # 5. pauta da reunião dos GPs

# 6. PDFs (opcional, precisa do LibreOffice)
if command -v soffice >/dev/null; then
  soffice --headless --convert-to pdf --outdir "$OUT" "$OUT/StatusReport_HardDex_v2.docx" "$OUT/GP_v2.docx" >/dev/null
fi
echo "ok: entregáveis regenerados em $(cd "$OUT" && pwd)"
