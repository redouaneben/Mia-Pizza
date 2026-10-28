import Link from "next/link";

import { siteConfig } from "@/config/site";
import { C } from "@/lib/colors";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: C.paper, color: C.ink }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#20543B]">
        404
      </p>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-lg text-[#27251F]/80">
        Cette adresse n&apos;existe pas. Retournez à l&apos;accueil pour voir la
        carte et commander au {siteConfig.phone.display}.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-[#20543B] px-8 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#1a4530]"
      >
        Accueil — {siteConfig.name}
      </Link>
    </div>
  );
}
