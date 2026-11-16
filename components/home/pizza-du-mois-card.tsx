"use client";

import Image from "next/image";
import { Info, Phone } from "lucide-react";

import { pizzaDuMois } from "@/data/pizza-du-mois";
import type { PizzaItem } from "@/data/menu";
import { restoButtonClass } from "@/lib/resto-button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}\u00A0€`;
}

function Ribbon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <h2 className="text-center text-xl font-extrabold uppercase tracking-[0.12em] text-[var(--resto-brand)] sm:text-2xl lg:text-3xl xl:text-[2rem] xl:leading-tight">
        {children}
      </h2>
    </div>
  );
}

export function PizzaDuMoisCard({
  onAllergenClick,
}: {
  onAllergenClick: (pizza: PizzaItem) => void;
}) {
  const menuItem: PizzaItem = {
    name: pizzaDuMois.name,
    ingredients: pizzaDuMois.ingredients,
    grande: pizzaDuMois.grande,
    petite: pizzaDuMois.petite,
  };

  return (
    <div className="rounded-[2rem] border border-[var(--resto-ink)]/10 bg-[var(--resto-surface)]/95 p-6 shadow-sm sm:p-8 lg:p-10">
      <Ribbon>{pizzaDuMois.name}</Ribbon>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,11rem)_1fr] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,13rem)_1fr]">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl bg-[var(--resto-ink)]/5 shadow-md lg:mx-0 lg:max-w-none">
          <Image
            src={pizzaDuMois.image}
            alt={pizzaDuMois.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 220px, 208px"
            priority={false}
          />
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-start justify-between gap-3">
            <p className="text-lg font-extrabold leading-snug text-[var(--resto-ink)] sm:text-xl">
              Création du moment
            </p>
            <button
              type="button"
              onClick={() => onAllergenClick(menuItem)}
              aria-label={`Allergènes — ${pizzaDuMois.name}`}
              className="shrink-0 rounded-full p-1.5 text-[var(--resto-brand)] transition hover:bg-[var(--resto-brand)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--resto-brand)]/45"
            >
              <Info className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </div>

          <p className="mt-3 text-lg leading-relaxed text-[var(--resto-ink)]/90 sm:text-xl">
            {pizzaDuMois.ingredients}
          </p>

          <p className="mt-4 text-xl font-extrabold tabular-nums text-[var(--resto-ink)] sm:text-2xl">
            {formatPrice(pizzaDuMois.grande)}{" "}
            <span className="text-base font-bold text-[var(--resto-ink)]/70 sm:text-lg">
              (Grande)
            </span>
            {" — "}
            <span className="text-[var(--resto-ink)]/80">
              {pizzaDuMois.petite === null ? "Ø" : formatPrice(pizzaDuMois.petite)}{" "}
              en Petite
            </span>
          </p>

          <a
            href={siteConfig.phone.href}
            className={cn("mt-6 w-full sm:w-auto", restoButtonClass("command", "md"))}
          >
            <Phone className="h-5 w-5" aria-hidden />
            Commander — {siteConfig.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}
