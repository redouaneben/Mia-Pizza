"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import type { PizzaItem } from "@/data/menu";
import {
  ALLERGEN_DISCLAIMER,
  getPizzaAllergenTags,
} from "@/data/allergens";
import { restoButtonClass } from "@/lib/resto-button";
import { cn } from "@/lib/utils";

export function PizzaAllergenPanel({
  pizza,
  onClose,
}: {
  pizza: PizzaItem | null;
  onClose: () => void;
}) {
  const desktopCloseRef = useRef<HTMLButtonElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pizza) return;
    const prefersDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (prefersDesktop) desktopCloseRef.current?.focus();
    else mobileCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pizza, onClose]);

  useEffect(() => {
    if (pizza) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [pizza]);

  return (
    <AnimatePresence>
      {pizza && (
        <>
          <motion.button
            type="button"
            aria-label="Fermer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#27251F]/45 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="allergen-dialog-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "fixed z-[101] flex w-full flex-col overflow-hidden",
              "border border-[#27251F]/12 bg-[#FDFCF8] shadow-xl",
              "bottom-0 left-0 right-0 rounded-t-[1.75rem]",
              "md:bottom-auto md:left-1/2 md:top-1/2 md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[2rem] lg:max-w-xl"
            )}
          >
            <div className="flex items-start justify-between gap-4 px-6 pb-5 pt-6 sm:px-8 md:pt-8">
              <div className="min-w-0 pr-2">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#20543B] sm:text-sm">
                  Allergènes
                </p>
                <h2
                  id="allergen-dialog-title"
                  className="mt-2 text-2xl font-extrabold leading-snug text-[#27251F] sm:text-3xl"
                >
                  {pizza.name}
                </h2>
              </div>
              <button
                ref={desktopCloseRef}
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className={cn(
                  "hidden shrink-0 md:inline-flex",
                  restoButtonClass("outline", "compact"),
                  "h-12 w-12 rounded-full p-0 normal-case tracking-normal"
                )}
              >
                <X className="h-6 w-6" strokeWidth={2.25} aria-hidden />
              </button>
            </div>

            <div className="px-6 pb-6 sm:px-8 md:pb-8">
              <ul className="flex flex-wrap gap-3">
                {getPizzaAllergenTags(pizza.name).map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border-2 border-[#20543B]/25 bg-[#20543B]/10 px-5 py-2.5 text-base font-bold text-[#20543B] sm:text-lg"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[#27251F]/60 sm:text-base">
                {ALLERGEN_DISCLAIMER}
              </p>
            </div>

            <div className="border-t border-[#27251F]/10 px-6 py-5 md:hidden">
              <button
                ref={mobileCloseRef}
                type="button"
                onClick={onClose}
                className={cn("w-full", restoButtonClass("command", "md"))}
              >
                Retour
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
