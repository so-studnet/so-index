import { displayHost, formatDate, type LinkItem } from "@/lib/domain/links";

export function LinkCard({ item }: { item: LinkItem }) {
  return (
    <li className="group relative rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug">
          {/* カード全体を押せるように、リンクの ::after をカードいっぱいに広げる */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
          >
            {item.title}
          </a>
        </h3>
        <span
          aria-hidden
          className="mt-0.5 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        >
          ↗
        </span>
      </div>
      <p className="mt-1 text-xs text-muted">
        {displayHost(item.url)}
        {item.date && <> · {formatDate(item.date)}</>}
      </p>
      {item.description && <p className="mt-3 text-sm leading-relaxed">{item.description}</p>}
      {(item.tags?.length || item.repo) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {item.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-background px-2.5 py-0.5 text-xs text-muted">
              {tag}
            </span>
          ))}
          {item.repo && (
            <a
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 ml-auto text-xs text-muted underline-offset-2 hover:text-accent hover:underline"
            >
              ソースコード
            </a>
          )}
        </div>
      )}
    </li>
  );
}
