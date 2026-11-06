#!/usr/bin/env bash
# コミット前のチェックをまとめて実行する。どれかが失敗したらそこで止まる。
#   npm run check
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

step() { printf '\n=== %s ===\n' "$1"; }

step "単体テスト (Vitest)"
npm test --silent

step "lint"
npm run lint --silent

step "型チェック"
npm run typecheck --silent

step "本番ビルド（静的書き出し）"
rm -rf .next out
npm run build --silent >/dev/null
test -f out/index.html

printf '\nすべてのチェックが通りました（out/ に書き出し済み）\n'
