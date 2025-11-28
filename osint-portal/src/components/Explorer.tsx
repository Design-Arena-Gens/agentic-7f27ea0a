"use client";

import { useMemo, useState } from "react";
import { osintTools, featuredRecommendations, maturityLegend } from "@/data/osintTools";
import { ToolCard } from "./ToolCard";

const maturityOrder = ["established", "growing", "new"] as const;

type MaturityFilter = (typeof maturityOrder)[number] | "all";

type Recommendation = (typeof featuredRecommendations)[number];

function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function Explorer() {
  const [search, setSearch] = useState("");
  const [maturity, setMaturity] = useState<MaturityFilter>("all");
  const [selectedTag, setSelectedTag] = useState<string>("todos");

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    osintTools.forEach((tool) => tool.idealFor.forEach((tag) => tagSet.add(tag)));
    return ["todos", ...Array.from(tagSet).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredTools = useMemo(() => {
    return osintTools
      .filter((tool) => {
        const matchesSearch = normalize(tool.name + tool.summary + tool.capabilities.join(" "))
          .includes(normalize(search));
        const matchesMaturity = maturity === "all" || tool.maturity === maturity;
        const matchesTag = selectedTag === "todos" || tool.idealFor.includes(selectedTag);
        return matchesSearch && matchesMaturity && matchesTag;
      })
      .sort((a, b) => maturityOrder.indexOf(a.maturity) - maturityOrder.indexOf(b.maturity));
  }, [search, maturity, selectedTag]);

  const bestMatchRecommendation = useMemo<Recommendation | null>(() => {
    if (selectedTag === "todos" && maturity === "all" && search.length < 3) return null;

    const targetTag = selectedTag !== "todos" ? selectedTag : null;

    const ranked = featuredRecommendations
      .map((rec) => {
        const taggedTools = rec.tools.map((name) => osintTools.find((tool) => tool.name === name));
        const score = taggedTools.reduce((total, tool) => {
          if (!tool) return total;
          let points = 1;
          if (targetTag && tool.idealFor.includes(targetTag)) points += 2;
          if (maturity !== "all" && tool.maturity === maturity) points += 1;
          if (search && normalize(tool.name).includes(normalize(search))) points += 3;
          return total + points;
        }, 0);
        return { rec, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    return ranked.length ? ranked[0].rec : null;
  }, [selectedTag, maturity, search]);

  return (
    <section className="space-y-10">
      <div className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-[0_35px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="grid gap-2">
          <label htmlFor="search" className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            Procurar ferramentas
          </label>
          <input
            id="search"
            placeholder="Busque por nomes, capacidades ou integrações"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            Maturidade da ferramenta
          </legend>
          <div className="flex flex-wrap gap-2">
            {["all", ...maturityOrder].map((value) => {
              const filterValue = value as MaturityFilter;
              const isAll = filterValue === "all";
              const label = isAll
                ? "Todas"
                : maturityLegend[filterValue as Exclude<MaturityFilter, "all">].label;

              return (
              <button
                key={value}
                type="button"
                onClick={() => setMaturity(filterValue)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  maturity === filterValue
                    ? "border-sky-500 bg-sky-500 text-white shadow"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-sky-300 hover:text-sky-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-sky-400"
                }`}
              >
                {label}
              </button>
            );
            })}
          </div>
        </fieldset>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            Cenário de uso
          </legend>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                  selectedTag === tag
                    ? "border-purple-500 bg-purple-500 text-white shadow"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-purple-300 hover:text-purple-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-purple-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </fieldset>

        {bestMatchRecommendation ? (
          <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-6 text-sm text-sky-800 shadow-inner dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200">
            <p className="font-semibold text-sky-900 dark:text-sky-100">
              Sugestão curada: {bestMatchRecommendation.title}
            </p>
            <p className="mt-2 leading-6">
              {bestMatchRecommendation.rationale}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wide text-sky-700 dark:text-sky-300">
              {bestMatchRecommendation.tools.join(" · ")}
            </p>
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
        {filteredTools.length === 0 ? (
          <p className="col-span-full rounded-3xl border border-dashed border-zinc-300 bg-white/30 p-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
            Nenhuma ferramenta corresponde aos filtros aplicados. Ajuste os critérios para explorar outras opções.
          </p>
        ) : null}
      </div>
    </section>
  );
}
