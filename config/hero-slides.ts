import type { StaticImageData } from "next/image";

import { siteConfig } from "@/config/site";

import heroExt from "../IMGS/EXT_NEW.png";
import heroTerrasse from "../IMGS/Pizza en terrasse ensoleillée.png";
import heroBistro from "../IMGS/Pizza gourmande dans une ambiance bistro.png";

export type HeroSlide = { src: StaticImageData; alt: string };

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: heroTerrasse,
    alt: `Pizza en terrasse ensoleillée — ${siteConfig.name}`,
  },
  {
    src: heroBistro,
    alt: `Pizza gourmande, ambiance bistro — ${siteConfig.name}`,
  },
  {
    src: heroExt,
    alt: `${siteConfig.name} — devanture et place du village`,
  },
];
