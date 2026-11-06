import { LinkCard } from "@/components/link-card";
import { site } from "@/content/site";
import { groupByCategory, validateSite } from "@/lib/domain/links";

// 書き間違いがあればビルドを止めて、どこが悪いかを表示する
const errors = validateSite(site);
if (errors.length > 0) {
  throw new Error(`src/content/site.ts に誤りがあります:\n- ${errors.join("\n- ")}`);
}

export default function Home() {
  const { profile } = site;
  const groups = groupByCategory(site.items);

  return (
    <div className="mx-auto w-full max-w-xl px-4 pt-10 pb-16 sm:pt-16">
      {/* 自己紹介は小さくまとめ、アプリへのリンクがすぐ目に入るようにする */}
      <header className="px-1">
        <div className="flex items-center gap-4">
          <div
            aria-hidden
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-foreground text-xl font-bold text-background"
          >
            {profile.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
            {profile.tagline && <p className="text-sm text-muted">{profile.tagline}</p>}
          </div>
        </div>
        {profile.bio?.map((p) => (
          <p key={p} className="mt-3 text-sm leading-relaxed text-muted">
            {p}
          </p>
        ))}
      </header>

      <main className="mt-8 space-y-10">
        {groups.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`}>
            <h2
              id={`${g.id}-heading`}
              className="mb-3 px-1 text-xs font-semibold tracking-wider text-muted"
            >
              {g.label}
              <span className="ml-1.5 font-normal">{g.items.length}</span>
            </h2>
            <ul className={g.id === "app" ? "space-y-3" : "space-y-2"}>
              {g.items.map((item) => (
                <LinkCard key={item.url} item={item} variant={g.id === "app" ? "primary" : "secondary"} />
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className="mt-14 px-1">
        {profile.socials && profile.socials.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {profile.socials.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-5 text-sm hover:border-accent hover:text-accent active:scale-95"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-xs text-muted">© {profile.name}</p>
      </footer>
    </div>
  );
}
