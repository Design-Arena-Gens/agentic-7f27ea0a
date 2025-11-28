"use client";

import { OsintTool, maturityLegend } from "@/data/osintTools";

type Props = {
  tool: OsintTool;
};

export function ToolCard({ tool }: Props) {
  const maturity = maturityLegend[tool.maturity];

  return (
    <article className="group relative rounded-2xl border border-zinc-200 bg-white/90 p-6 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.45)] transition-colors hover:border-sky-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-sky-400/60">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          <a
            href={tool.url}
            className="inline-flex items-center gap-2 align-middle transition-colors hover:text-sky-600 dark:hover:text-sky-400"
            target="_blank"
            rel="noreferrer"
          >
            {tool.name}
            <span className="text-sm font-normal text-sky-600 transition-opacity group-hover:opacity-100 dark:text-sky-300">
              ↗
            </span>
          </a>
        </h2>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide text-white ${maturity.color}`}
        >
          {maturity.label}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        {tool.summary}
      </p>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex flex-col gap-1">
          <dt className="font-semibold text-zinc-900 dark:text-zinc-50">Destaque</dt>
          <dd className="text-zinc-600 dark:text-zinc-300">{tool.standoutFeature}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-semibold text-zinc-900 dark:text-zinc-50">Melhor para</dt>
          <dd className="flex flex-wrap gap-2 text-zinc-600 dark:text-zinc-300">
            {tool.idealFor.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 transition-colors group-hover:border-sky-300 group-hover:bg-sky-100 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200"
              >
                {tag}
              </span>
            ))}
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-semibold text-zinc-900 dark:text-zinc-50">Capacidades-chave</dt>
          <dd className="text-zinc-600 dark:text-zinc-300">
            {tool.capabilities.join(" · ")}
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-semibold text-zinc-900 dark:text-zinc-50">Cobertura regional</dt>
          <dd className="text-zinc-600 dark:text-zinc-300">
            {tool.regionsCovered.join(", ")}
          </dd>
        </div>
        {tool.integrations && tool.integrations.length > 0 ? (
          <div className="flex flex-col gap-1">
            <dt className="font-semibold text-zinc-900 dark:text-zinc-50">Integrações notáveis</dt>
            <dd className="text-zinc-600 dark:text-zinc-300">
              {tool.integrations.join(", ")}
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}
