import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const restoButtonBase =
  "rounded-full font-bold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--resto-brand)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--resto-paper)] hover:-translate-y-0.5";

export const restoButtonVariants = cva(
  cn(restoButtonBase, "inline-flex shrink-0 items-center justify-center"),
  {
    variants: {
      variant: {
        primary:
          "border-2 border-[var(--resto-surface)] bg-[var(--resto-surface)] text-[var(--resto-brand)] shadow-lg hover:border-[var(--resto-brand)] hover:bg-[var(--resto-brand)] hover:text-white hover:shadow-[0_14px_36px_rgba(32,84,59,0.28)]",
        command:
          "bg-[var(--resto-brand)] text-white shadow-lg hover:bg-[var(--resto-surface)] hover:text-[var(--resto-brand)] hover:shadow-[0_14px_36px_rgba(32,84,59,0.28)]",
        secondary:
          "border-2 border-[var(--resto-surface)] bg-[var(--resto-surface)] text-[var(--resto-brand)] shadow-md hover:border-[var(--resto-brand)] hover:bg-[var(--resto-brand)] hover:text-white hover:shadow-[0_14px_36px_rgba(32,84,59,0.35)]",
        outline:
          "border-2 border-[var(--resto-ink)]/22 bg-[var(--resto-surface)] text-[var(--resto-ink)] font-extrabold uppercase tracking-wide hover:border-[var(--resto-brand)] hover:bg-[var(--resto-brand)] hover:text-white",
        social:
          "gap-2 border-2 border-[var(--resto-brand)] bg-white font-extrabold uppercase tracking-wide text-[var(--resto-brand)] shadow-md hover:bg-[var(--resto-brand)] hover:text-white hover:shadow-lg",
      },
      size: {
        md: "h-12 px-7 text-base sm:h-[3.25rem] sm:px-8 sm:text-lg",
        sm: "gap-2 px-5 py-2.5 text-base sm:px-6 sm:py-3 sm:text-lg",
        heroPhone:
          "h-10 w-10 gap-0 p-0 text-sm min-[420px]:h-auto min-[420px]:w-auto min-[420px]:gap-2 min-[420px]:px-4 min-[420px]:py-2 min-[420px]:text-sm sm:px-6 sm:py-3 sm:text-lg",
        compact: "inline-flex gap-1.5 px-5 py-2.5 text-sm",
        social: "w-full py-4 text-base sm:w-auto sm:px-10 lg:text-lg",
        fab: "box-border h-14 min-w-0 gap-2 border-2 border-[var(--resto-surface)] px-4 text-sm uppercase tracking-wide shadow-lg sm:text-base",
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
  "border-2 border-[var(--resto-brand)] bg-[var(--resto-brand)] text-white shadow-lg hover:bg-[var(--resto-brand-dark)] hover:shadow-xl";

export const menuToggleInactive =
  "border-2 border-[var(--resto-ink)]/18 bg-[var(--resto-surface)] text-[var(--resto-ink)]/88 shadow-sm";

export const menuToggleInactiveHover = {
  forest:
    "hover:border-[var(--resto-brand)] hover:bg-[var(--resto-brand)]/12 hover:text-[var(--resto-brand)] hover:shadow-md",
  sage: "hover:border-[var(--resto-accent)] hover:bg-[var(--resto-accent)]/15 hover:text-[var(--resto-brand)] hover:shadow-md",
} as const;
