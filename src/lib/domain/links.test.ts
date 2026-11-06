import { describe, expect, it } from "vitest";
import {
  displayHost,
  formatDate,
  groupByCategory,
  isHttpUrl,
  sortItems,
  validateSite,
  type LinkItem,
  type SiteContent,
} from "./links";

const item = (over: Partial<LinkItem> = {}): LinkItem => ({
  title: "アプリ",
  url: "https://example.com/app",
  category: "app",
  ...over,
});

const site = (items: LinkItem[], over: Partial<SiteContent["profile"]> = {}): SiteContent => ({
  profile: { name: "so", ...over },
  items,
});

describe("isHttpUrl", () => {
  it("http と https だけを受け付ける", () => {
    expect(isHttpUrl("https://example.com")).toBe(true);
    expect(isHttpUrl("http://example.com/a?b=c")).toBe(true);
    expect(isHttpUrl("javascript:alert(1)")).toBe(false);
    expect(isHttpUrl("mailto:a@example.com")).toBe(false);
    expect(isHttpUrl("example.com")).toBe(false);
    expect(isHttpUrl("")).toBe(false);
  });
});

describe("displayHost", () => {
  it("ホスト名を返し www. を省く", () => {
    expect(displayHost("https://www.example.com/path")).toBe("example.com");
    expect(displayHost("https://app.vercel.app")).toBe("app.vercel.app");
  });
  it("読めない URL は空文字", () => {
    expect(displayHost("not a url")).toBe("");
  });
});

describe("validateSite", () => {
  it("正しい内容なら空", () => {
    expect(
      validateSite(
        site([item({ date: "2026-11", tags: ["Next.js"], repo: "https://github.com/a/b" })], {
          socials: [{ label: "GitHub", url: "https://github.com/a" }],
        }),
      ),
    ).toEqual([]);
  });

  it("名前が空・URL が不正・カテゴリ不明・日付の形が違うものを指摘する", () => {
    const errors = validateSite(
      site(
        [
          item({ title: " ", url: "ftp://x" }),
          item({ url: "https://example.com/b", category: "other" as never }),
          item({ url: "https://example.com/c", date: "2026/11" }),
          item({ url: "https://example.com/d", date: "2026-13" }),
          item({ url: "https://example.com/e", repo: "github.com/a" }),
        ],
        { name: "", socials: [{ label: "", url: "x" }] },
      ),
    );
    expect(errors).toHaveLength(9);
    expect(errors.join("\n")).toMatch("profile.name");
    expect(errors.join("\n")).toMatch("category が不明");
    expect(errors.join("\n")).toMatch("date は");
    expect(errors.join("\n")).toMatch("repo");
  });

  it("URL の重複を指摘する", () => {
    const errors = validateSite(site([item(), item({ title: "別名" })]));
    expect(errors).toEqual([expect.stringContaining("items[0] と重複")]);
  });
});

describe("sortItems", () => {
  it("新しい順、日付なしは最後、同じなら名前順。元の配列は変えない", () => {
    const items = [
      item({ title: "c" }),
      item({ title: "b", date: "2025-01" }),
      item({ title: "a", date: "2026-03" }),
      item({ title: "z", date: "2026-03" }),
      item({ title: "a2" }),
    ];
    const copy = [...items];
    expect(sortItems(items).map((i) => i.title)).toEqual(["a", "z", "b", "a2", "c"]);
    expect(items).toEqual(copy);
  });

  it("月だけと日付付きは文字列順で比べられる", () => {
    const items = [item({ title: "月", date: "2026-03" }), item({ title: "日", date: "2026-03-15" })];
    expect(sortItems(items).map((i) => i.title)).toEqual(["日", "月"]);
  });
});

describe("groupByCategory", () => {
  it("決まった順にまとめ、空のカテゴリは出さない", () => {
    const groups = groupByCategory([
      item({ title: "作品", category: "portfolio" }),
      item({ title: "アプリ" }),
    ]);
    expect(groups.map((g) => g.id)).toEqual(["app", "portfolio"]);
    expect(groups[1].items[0].title).toBe("作品");
  });
});

describe("formatDate", () => {
  it("ハイフンをドットにする", () => {
    expect(formatDate("2026-11")).toBe("2026.11");
    expect(formatDate("2026-11-06")).toBe("2026.11.06");
  });
});
