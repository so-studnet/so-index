// ここを書き換えればサイトの中身が変わる。
// - items にリンクを足すと、category ごとの見出しの下に新しい順で並ぶ
// - category: "app" のものはいちばん上に大きなボタンとして並ぶ
// - 書き方を間違えると npm run build（Vercel のデプロイ）が理由付きで失敗する
// - 「TODO」の付いた値は仮のもの。実際の URL や文に差し替える

import type { SiteContent } from "@/lib/domain/links";

export const site: SiteContent = {
  profile: {
    name: "so", // TODO: 表示したい名前
    tagline: "Webアプリを作ったり、ブログを書いたりしています", // TODO
    bio: [
      // TODO: 自己紹介。段落ごとに1要素
      "個人でWebアプリを作っています。作ったもの・書いたものをここにまとめています。",
    ],
    socials: [
      { label: "GitHub", url: "https://github.com/so-studnet" },
      // { label: "X", url: "https://x.com/xxxx" },
      // { label: "Zenn", url: "https://zenn.dev/xxxx" },
    ],
  },

  items: [
    {
      title: "What did you do",
      url: "https://example.com/what-did-you-do", // TODO: 公開している URL
      description: "今やっていることを記録して、時間の使い方を振り返る作業記録アプリ。",
      category: "app",
      date: "2026-10", // TODO
      repo: "https://github.com/so-studnet/what-did-you-do",
      icon: "⏱️",
    },
    // アプリを足すときは、ここに同じ形で書き足す（icon は省略すると名前の頭文字）
    {
      title: "次のアプリ（例）",
      url: "https://example.com/next-app", // TODO: 実際のアプリに置き換えるか消す
      description: "説明はカードに2行まで表示されます。",
      category: "app",
    },
    {
      title: "ブログ（例）",
      url: "https://example.com/blog", // TODO
      description: "開発のメモや日々のこと。",
      category: "blog",
      icon: "📝",
    },
    {
      title: "ポートフォリオ（例）",
      url: "https://example.com/portfolio", // TODO
      description: "これまでの制作物。",
      category: "portfolio",
    },
  ],
};
