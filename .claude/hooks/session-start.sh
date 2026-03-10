#!/bin/bash
set -euo pipefail

# Solo ejecutar en entornos remotos (Claude Code en la web)
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo "Instalando dependencias..."
cd "${CLAUDE_PROJECT_DIR:-.}"
npm install
