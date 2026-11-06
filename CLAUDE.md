# so-index

自分のブログ・Webアプリ・ポートフォリオへのリンクをまとめた静的サイト。

@AGENTS.md

## ドキュメント
- `docs/requirements.md` 要件 / `docs/architecture.md` 設計 / `docs/roadmap.md` 進み具合

## 開発ルール
- サイトの中身は `src/content/site.ts` に置く。画面のコードに文言や URL を直書きしない
- 間違えやすいロジックは `src/lib/domain/` の純粋関数にして Vitest でテストする
- 静的書き出し（`output: "export"`）なので、サーバー処理・Route Handler・`cacheComponents` は使わない
- UI の文言は日本語
- 仕様を変えたら docs も更新する

## コミット前
`npm run check`（テスト・lint・型チェック・ビルド）を通す。画面を変えたら `out/` を配信してスマホ幅で確認する。
