import { displayHost, iconColor, iconText, type LinkItem } from "@/lib/domain/links";

/**
 * 1件のリンク。カード全体が1つの <a> なので、どこを押しても開く。
 * primary（アプリ）は大きく「開く」ボタン付き、secondary（ブログなど）は少し小さい。
 * ソースコードへのリンクは押し間違えないよう、カードの外に分けて置く。
 */
export function LinkCard({ item, variant }: { item: LinkItem; variant: "primary" | "secondary" }) {
  const primary = variant === "primary";
  const host = displayHost(item.url);

  return (
    <li>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title}を開く（${host}、新しいタブ）`}
        className={`group flex items-center gap-4 rounded-2xl border border-border bg-surface transition select-none hover:border-accent hover:shadow-md active:scale-[0.98] active:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          primary ? "min-h-24 p-4 shadow-sm" : "min-h-16 px-4 py-3"
        }`}
      >
        <span
          aria-hidden
          style={{ backgroundColor: iconColor(item.title) }}
          className={`flex shrink-0 items-center justify-center font-bold text-white ${
            primary ? "size-14 rounded-2xl text-2xl" : "size-10 rounded-xl text-lg"
          }`}
        >
          {iconText(item)}
        </span>

        <span className="min-w-0 flex-1">
          <span className={`block truncate font-semibold ${primary ? "text-lg" : "text-base"}`}>
            {item.title}
          </span>
          <span className="block truncate text-xs text-muted">{host}</span>
          {item.description && (
            <span className={`mt-1 line-clamp-2 text-sm leading-snug ${primary ? "" : "text-muted"}`}>
              {item.description}
            </span>
          )}
        </span>

        {primary ? (
          <span
            aria-hidden
            className="shrink-0 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition group-hover:opacity-85"
          >
            開く
          </span>
        ) : (
          <span
            aria-hidden
            className="shrink-0 text-lg text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          >
            ↗
          </span>
        )}
      </a>

      {item.repo && (
        <a
          href={item.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 inline-block px-2 py-2 text-xs text-muted underline-offset-2 hover:text-accent hover:underline"
        >
          {item.title} のソースコード ↗
        </a>
      )}
    </li>
  );
}
