import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

import botaniqueBandeau from "../IMGS/Bandeau décoratif botanique vert.png";
import decorHerb from "../IMGS/herb_sprig_left.png";

function DecorOrnament({
  src,
  className,
}: {
  src: StaticImageData;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={src.width}
      height={src.height}
      className={cn(
        "pointer-events-none h-auto max-w-none select-none",
        className
      )}
      style={{ filter: "var(--resto-decor-filter)" }}
      sizes="160px"
    />
  );
}

export function HerbPair({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const leaf = size === "sm" ? "w-16 sm:w-20" : "w-24 sm:w-32";
  const opacity = size === "sm" ? "opacity-40" : "opacity-[0.48]";

  return (
    <div
      aria-hidden
      className={cn("flex items-end justify-center gap-6 sm:gap-10", className)}
    >
      <DecorOrnament
        src={decorHerb}
        className={cn(leaf, opacity, "-scale-x-100 rotate-[-6deg]")}
      />
      <DecorOrnament
        src={decorHerb}
        className={cn(leaf, opacity, "rotate-[6deg]")}
      />
    </div>
  );
}

/** Bandeau sous le hero uniquement */
export function HeaderBotaniqueBandeau() {
  return (
    <div aria-hidden className="relative w-full px-5 py-1 sm:px-8 sm:py-1.5 lg:px-12">
      <Image
        src={botaniqueBandeau}
        alt=""
        width={botaniqueBandeau.width}
        height={botaniqueBandeau.height}
        className="mx-auto h-auto w-full max-w-4xl object-contain opacity-90 mix-blend-multiply sm:max-w-5xl lg:max-w-6xl"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 72rem"
      />
    </div>
  );
}
