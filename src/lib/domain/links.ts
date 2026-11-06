// サイトに載せるリンクの型と、検証・並べ替え・グループ分けの純粋関数。
// 画面から切り離してあるので src/lib/domain/links.test.ts でテストしている。

export const CATEGORIES = [
  { id: "app", label: "Webアプリ", description: "作って公開しているアプリ" },
  { id: "blog", label: "ブログ", description: "書いている記事・ブログ" },
  { id: "portfolio", label: "ポートフォリオ", description: "制作物・作品" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type LinkItem = {
  /** 表示名 */
  title: string;
  /** リンク先（http:// か https://） */
  url: string;
  /** ひとこと説明 */
  description?: string;
  category: CategoryId;
  /** 公開・更新した時期。"2026-11" か "2026-11-06" の形 */
  date?: string;
  /** 使った技術など */
  tags?: string[];
  /** ソースコードなどの補足リンク */
  repo?: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type Profile = {
  name: string;
  /** 名前の下に出す一行 */
  tagline?: string;
  /** 自己紹介（段落ごとに配列） */
  bio?: string[];
  socials?: SocialLink[];
};

export type SiteContent = {
  profile: Profile;
  items: LinkItem[];
};

const DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$/;

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** 表示用のドメイン名（www. は省く）。URL として読めなければ空文字 */
export function displayHost(value: string): string {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** 内容の誤りを日本語の文の配列で返す。空なら問題なし */
export function validateSite(site: SiteContent): string[] {
  const errors: string[] = [];
  const categoryIds = new Set<string>(CATEGORIES.map((c) => c.id));

  if (!site.profile.name.trim()) errors.push("profile.name が空です");
  site.profile.socials?.forEach((s, i) => {
    if (!s.label.trim()) errors.push(`profile.socials[${i}] の label が空です`);
    if (!isHttpUrl(s.url))
      errors.push(`profile.socials[${i}] の url が http(s) ではありません: ${s.url}`);
  });

  const seen = new Map<string, number>();
  site.items.forEach((item, i) => {
    const where = `items[${i}]（${item.title || "無題"}）`;
    if (!item.title.trim()) errors.push(`${where} の title が空です`);
    if (!isHttpUrl(item.url))
      errors.push(`${where} の url が http(s) ではありません: ${item.url}`);
    if (item.repo !== undefined && !isHttpUrl(item.repo))
      errors.push(`${where} の repo が http(s) ではありません: ${item.repo}`);
    if (!categoryIds.has(item.category))
      errors.push(`${where} の category が不明です: ${item.category}`);
    if (item.date !== undefined && !DATE_PATTERN.test(item.date))
      errors.push(`${where} の date は "YYYY-MM" か "YYYY-MM-DD" で書いてください: ${item.date}`);

    const first = seen.get(item.url);
    if (first !== undefined)
      errors.push(`${where} の url が items[${first}] と重複しています: ${item.url}`);
    else seen.set(item.url, i);
  });

  return errors;
}

/** 新しい順（日付なしは最後）、同じなら名前順。元の配列は変えない */
export function sortItems(items: readonly LinkItem[]): LinkItem[] {
  return [...items].sort((a, b) => {
    if (a.date && b.date && a.date !== b.date) return a.date < b.date ? 1 : -1;
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    return a.title.localeCompare(b.title, "ja");
  });
}

export type CategoryGroup = {
  id: CategoryId;
  label: string;
  description: string;
  items: LinkItem[];
};

/** CATEGORIES の順にまとめる。項目のないカテゴリは含めない */
export function groupByCategory(items: readonly LinkItem[]): CategoryGroup[] {
  return CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    description: c.description,
    items: sortItems(items.filter((item) => item.category === c.id)),
  })).filter((g) => g.items.length > 0);
}

/** "2026-11" → "2026.11"、"2026-11-06" → "2026.11.06" */
export function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}
