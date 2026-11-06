# 設計

## 技術スタック
- Next.js 16（App Router）+ TypeScript + Tailwind CSS 4
  - `output: "export"` で静的 HTML を `out/` に書き出す。サーバー処理はない
  - 静的書き出しとは両立しないため、create-next-app が入れた `cacheComponents` / `partialPrefetching` は外した
  - フォントは外部から読み込まず、端末のフォント（ヒラギノ・Noto Sans JP など）を使う
- Vitest：検証・並べ替えなどの純粋関数のテスト
- 公開先：Vercel（GitHub の `main` に push すると自動で公開）
- Supabase・ログイン・ブラウザ内保存は使っていない

## データ
`src/content/site.ts` の `site`（型は `src/lib/domain/links.ts` の `SiteContent`）。

- `profile`：`name`, `tagline?`, `bio?: string[]`, `socials?: { label, url }[]`
- `items`：`title`, `url`, `category: "app" | "blog" | "portfolio"`, `description?`, `date?: "YYYY-MM" | "YYYY-MM-DD"`, `tags?`, `repo?`

カテゴリの表示名・説明・順番は `CATEGORIES`（`src/lib/domain/links.ts`）で決める。カテゴリを増やすときはここに足す。

## 設計のポイント
- 検証・並べ替え・グループ分けは `src/lib/domain/links.ts` の純粋関数にしてテストしている
- `src/app/page.tsx` はビルド時に `validateSite` を呼び、誤りがあれば例外でビルドを止める
- カードは全体を押せるよう、タイトルのリンクの `::after` をカードいっぱいに広げている。「ソースコード」リンクは `z-10` でその上に出す

## ディレクトリ
```
src/
  app/            layout.tsx（メタ情報）, page.tsx（トップ）, globals.css（色の定義）
  components/     link-card.tsx
  content/        site.ts（サイトの中身。ここを編集する）
  lib/domain/     links.ts（型と純粋関数）, links.test.ts
scripts/check.sh  コミット前のチェック一式
docs/             要件・設計・ロードマップ
```
