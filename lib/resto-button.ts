import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Hex alignés sur `config/theme.ts` — mettre à jour les deux si la DA change */
export const restoButtonBase =
  "rounded-full font-bold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20543B]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F1EFE5] hover:-translate-y-0.5";

export const restoButtonVariants = cva(
  cn(restoButtonBase, "inline-flex shrink-0 items-center justify-center"),
  {
    variants: {
      variant: {
        primary:
          "border-2 border-[#FDFCF8] bg-[#FDFCF8] text-[#20543B] shadow-lg hover:border-[#20543B] hover:bg-[#20543B] hover:text-white hover:shadow-[0_14px_36px_rgba(32,84,59,0.28)]",
        command:
          "bg-[#20543B] text-white shadow-lg hover:bg-[#FDFCF8] hover:text-[#20543B] hover:shadow-[0_14px_36px_rgba(32,84,59,0.28)]",
        secondary:
          "border-2 border-[#FDFCF8] bg-[#FDFCF8] text-[#20543B] shadow-md hover:border-[#20543B] hover:bg-[#20543B] hover:text-white hover:shadow-[0_14px_36px_rgba(32,84,59,0.35)]",
        outline:
          "border-2 border-[#27251F]/22 bg-[#FDFCF8] text-[#27251F] font-extrabold uppercase tracking-wide hover:border-[#20543B] hover:bg-[#20543B] hover:text-white",
        social:
          "gap-2 border-2 border-[#20543B] bg-white font-extrabold uppercase tracking-wide text-[#20543B] shadow-md hover:bg-[#20543B] hover:text-white hover:shadow-lg",
      },
      size: {
        md: "h-12 px-7 text-base sm:h-[3.25rem] sm:px-8 sm:text-lg",
        sm: "gap-2 px-5 py-2.5 text-base sm:px-6 sm:py-3 sm:text-lg",
        heroPhone:
          "h-10 w-10 gap-0 p-0 text-sm min-[420px]:h-auto min-[420px]:w-auto min-[420px]:gap-2 min-[420px]:px-4 min-[420px]:py-2 min-[420px]:text-sm sm:px-6 sm:py-3 sm:text-lg",
        compact: "inline-flex gap-1.5 px-5 py-2.5 text-sm",
        social: "w-full py-4 text-base sm:w-auto sm:px-10 lg:text-lg",
        fab: "box-border h-14 min-w-0 gap-2 border-2 border-[#FDFCF8] px-4 text-sm uppercase tracking-wide shadow-lg sm:text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type RestoButtonVariant = NonNullable<
  VariantProps<typeof restoButtonVariants>["variant"]
>;

export function restoButtonClass(
  variant: RestoButtonVariant = "primary",
  size: VariantProps<typeof restoButtonVariants>["size"] = "md",
  className?: string
) {
  return cn(restoButtonVariants({ variant, size }), className);
}

export const menuToggleActive =
  "border-2 border-[#20543B] bg-[#20543B] text-white shadow-lg hover:bg-[#1a4530] hover:shadow-xl";

export const menuToggleInactive =
  "border-2 border-[#27251F]/18 bg-[#FDFCF8] text-[#27251F]/88 shadow-sm";

export const menuToggleInactiveHover = {
  forest:
    "hover:border-[#20543B] hover:bg-[#20543B]/12 hover:text-[#20543B] hover:shadow-md",
  sage: "hover:border-[#719A76] hover:bg-[#719A76]/15 hover:text-[#20543B] hover:shadow-md",
} as const;
