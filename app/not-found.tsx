import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--resto-paper)] px-6 text-center text-[var(--resto-ink)]">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--resto-brand)]">
        404
      </p>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-lg text-[var(--resto-ink)]/80">
        Cette adresse n&apos;existe pas. Retournez à l&apos;accueil pour voir la
        carte et commander au {siteConfig.phone.display}.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-[var(--resto-brand)] px-8 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[var(--resto-brand-dark)]"
      >
        Accueil — {siteConfig.name}
      </Link>
    </div>
  );
}
