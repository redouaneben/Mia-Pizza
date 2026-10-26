import { Pacifico, Plus_Jakarta_Sans } from "next/font/google";

import { theme } from "@/config/theme";

/** Polices Google — noms dans `config/theme.ts` (documentation) */
export const logoScript = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-site",
});

void theme.fonts;
