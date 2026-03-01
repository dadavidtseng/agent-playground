#!/usr/bin/env bash
# Basic accessibility testing script (requires pa11y and/or axe-core integrations)

set -e
echo "Running accessibility smoke tests..."

if command -v pa11y >/dev/null 2>&1; then
  echo "Running pa11y on dist/demo/index.html"
  pa11y file://$(pwd)/dist/demo/index.html || true
else
  echo "pa11y not installed — skipping pa11y run. Install with: npm install -g pa11y"
fi

echo "Script complete — review output and docs/accessibility-checklist.md for remediation steps."