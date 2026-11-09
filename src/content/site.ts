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
      url: "https://what-did-you-do.vercel.app",
      description: "今やっていることを記録して、時間の使い方を振り返る作業記録アプリ。",
      category: "app",
      date: "2026-11",
      repo: "https://github.com/so-studnet/what-did-you-do",
      icon: "⏱️",
    },
    {
      title: "words quest",
      url: "https://words-quest-nine.vercel.app",
      description: "英辞書",
      category: "app",
      date: "2026-11",
      repo: "https://github.com/so-studnet/words-quest",
    },
    {
      title: "typing sushi",
      url: "https://typing-sushi.onrender.com",
      description: "英タイピング",
      category: "app",
      date: "2026-11",
      repo: "https://github.com/so-studnet/typing-sushi",
    },
    {
      title: "trivia battle",
      url: "https://trivia-battle-derg.onrender.com",
      description: "トリビアバトル（自主制作の旧版）",
      category: "app",
      date: "2026-11",
      repo: "https://github.com/so-studnet/trivia-battle",
    },
    {
      title: "trivia battle v2",
      url: "https://trivia-battle-v2.vercel.app",
      description: "自主制作した trivia battle を、実用的に作り直したトリビアバトル。",
      category: "app",
      date: "2026-11-09",
      repo: "https://github.com/so-studnet/trivia-battle-v2",
    },
    {
      title: "toeic words",
      url: "https://toeic-drill.onrender.com",
      description: "toeic問題対策",
      category: "app",
      date: "2026-11",
      repo: "https://github.com/so-studnet/TOEIC-words",
    },
    {
      title: "歴検 世界史2級",
      url: "https://history-in-a-week.vercel.app",
      description: "歴史能力検定 世界史2級の直前対策。834問の4択演習、全選択肢に解説つき。",
      category: "app",
      date: "2026-11-08",
      repo: "https://github.com/so-studnet/history-in-a-week",
      icon: "📜",
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
