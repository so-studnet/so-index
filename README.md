# so-index

自分のブログ・制作したWebアプリ・ポートフォリオへのリンクをまとめたシンプルな静的サイトです。

## 内容を変える

`src/content/site.ts` を編集します。`items` にリンクを1つ足すと、カテゴリ（`app` / `blog` / `portfolio`）ごとの見出しの下に新しい順で並びます。`app` はいちばん上に大きなボタンとして表示されます。

```ts
{
  title: "作ったアプリ",
  url: "https://example.vercel.app",
  description: "ひとこと説明",
  category: "app",
  date: "2026-11",
  repo: "https://github.com/so-studnet/xxx", // 任意
  icon: "🚀", // 任意。省略すると名前の頭文字
},
```

URL や日付の書き方を間違えると、ビルドが理由付きで失敗するので気づけます。

## 手元で動かす

```bash
npm install
```

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

## チェックとビルド

```bash
npm run check
```

テスト・lint・型チェック・ビルドをまとめて実行します。静的な HTML が `out/` に出力されます。

## 公開（Vercel）

1. このブランチを `main` にマージする
2. Vercel で **Add New → Project** からこのリポジトリを選ぶ
3. Application Preset が **Next.js** になっていることを確認して **Deploy**

以後は `main` に push するたびに自動で公開されます。`out/` を使えば GitHub Pages など他の静的ホスティングにも置けます。
