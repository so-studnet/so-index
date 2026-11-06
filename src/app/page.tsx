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
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:py-20">
      <header>
        <div
          aria-hidden
          className="flex size-16 items-center justify-center rounded-full bg-foreground text-2xl font-bold text-background"
        >
          {profile.name.slice(0, 1).toUpperCase()}
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight">{profile.name}</h1>
        {profile.tagline && <p className="mt-2 text-muted">{profile.tagline}</p>}
        {profile.bio?.map((p) => (
          <p key={p} className="mt-4 max-w-prose text-sm leading-relaxed">
            {p}
          </p>
        ))}
        {profile.socials && profile.socials.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.socials.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-sm hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      {groups.length > 1 && (
        <nav aria-label="カテゴリ" className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="text-muted hover:text-foreground">
              {g.label}
              <span className="ml-1 text-xs">{g.items.length}</span>
            </a>
          ))}
        </nav>
      )}

      <main className="mt-8 space-y-14">
        {groups.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`} className="scroll-mt-6">
            <h2 id={`${g.id}-heading`} className="text-lg font-bold">
              {g.label}
            </h2>
            <p className="mt-1 text-sm text-muted">{g.description}</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {g.items.map((item) => (
                <LinkCard key={item.url} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className="mt-20 border-t border-border pt-6 text-xs text-muted">
        © {profile.name}
      </footer>
    </div>
  );
}
