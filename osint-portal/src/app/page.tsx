import { Explorer } from "@/components/Explorer";
import { featuredRecommendations } from "@/data/osintTools";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-50 via-white to-sky-50 pb-24 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-[-10rem] z-0 h-[50rem] bg-[radial-gradient(ellipse_at_top,_rgba(13,148,136,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.12),rgba(2,6,23,0))]" />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 pt-20 lg:px-10">
        <header className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              Panorama 2025
            </span>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
              Ferramentas OSINT gratuitas indispensáveis para investigações em 2025
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Curadoria independente das plataformas mais eficazes para coleta e análise de inteligência de fontes abertas. Filtre por maturidade, foco estratégico e explore stacks recomendados para diferentes equipes.
            </p>
          </div>

          <aside className="rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-[0_35px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
              Destaques rápidos
            </h2>
            <ul className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
              {featuredRecommendations.map((bundle) => (
                <li key={bundle.title} className="rounded-2xl border border-zinc-200/60 p-4 shadow-inner shadow-zinc-100/40 dark:border-zinc-700/60 dark:shadow-none">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{bundle.title}</p>
                  <p className="mt-2 leading-6">{bundle.rationale}</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-sky-700 dark:text-sky-300">
                    {bundle.tools.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </header>

        <Explorer />
      </main>
    </div>
  );
}
