"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "resto-cookie-notice-dismissed";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Information cookies"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[60] border-t border-[#27251F]/10 bg-[#FDFCF8]/95 p-4 shadow-lg",
        "bottom-20 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:bottom-4",
        "md:mx-auto md:max-w-2xl md:rounded-2xl md:border"
      )}
    >
      <p className="text-center text-sm leading-snug text-[#27251F]/90 sm:text-base">
        Carte Google Maps et hébergement peuvent déposer des cookies ou traceurs.{" "}
        <Link
          href="/politique-de-confidentialite"
          className="font-semibold text-[#20543B] underline-offset-2 hover:underline"
        >
          Politique de confidentialité
        </Link>
        .
      </p>
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
          className="rounded-full bg-[#20543B] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1a4530]"
        >
          J&apos;ai compris
        </button>
      </div>
    </div>
  );
}
