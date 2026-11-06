import { describe, expect, it } from "vitest";
import {
  displayHost,
  graphemeCount,
  groupByCategory,
  ICON_COLORS,
  iconColor,
  iconText,
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
        site([item({ date: "2026-11", repo: "https://github.com/a/b" })], {
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

  it("icon は1〜2文字。絵文字の組み合わせは1文字と数える", () => {
    expect(validateSite(site([item({ icon: "⏱️" }), item({ url: "https://example.com/2", icon: "👨‍💻" })]))).toEqual([]);
    expect(validateSite(site([item({ icon: "abc" })]))).toEqual([expect.stringContaining("icon は")]);
    expect(validateSite(site([item({ icon: " " })]))).toEqual([expect.stringContaining("icon は")]);
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

describe("graphemeCount", () => {
  it("見た目の文字数を数える", () => {
    expect(graphemeCount("ab")).toBe(2);
    expect(graphemeCount("👨‍👩‍👧")).toBe(1);
    expect(graphemeCount("")).toBe(0);
  });
});

describe("iconText", () => {
  it("icon があればそれ、なければ頭文字を大文字で", () => {
    expect(iconText({ title: "x", icon: " 📝 " })).toBe("📝");
    expect(iconText({ title: " what did you do" })).toBe("W");
    expect(iconText({ title: "作業記録" })).toBe("作");
    expect(iconText({ title: "" })).toBe("?");
  });
});

describe("iconColor", () => {
  it("同じ名前なら同じ色、用意した色のどれか", () => {
    expect(iconColor("What did you do")).toBe(iconColor("What did you do"));
    expect(ICON_COLORS).toContain(iconColor("ブログ"));
    expect(ICON_COLORS).toContain(iconColor(""));
  });
  it("名前が違えば色がばらける", () => {
    const colors = new Set(["a", "b", "c", "d", "e", "f", "g", "h"].map(iconColor));
    expect(colors.size).toBeGreaterThan(3);
  });
});
