/**
 * Design system client — modifier UNIQUEMENT ce fichier pour les couleurs.
 * Les composants utilisent les variables CSS `--resto-*` (injectées dans `app/layout.tsx`).
 *
 * Polices : renseigner `fonts` puis adapter les imports dans `lib/fonts.ts`.
 */
export const theme = {
  colors: {
    paper: "#F1EFE5",
    brand: "#20543B",
    brandDark: "#1a4530",
    accent: "#719A76",
    ink: "#27251F",
    surface: "#FDFCF8",
    statusClosed: "#E8E6E0",
    heroOverlay: "#27251F",
  },
  decorBrandFilter:
    "brightness(0) saturate(100%) invert(14%) sepia(22%) saturate(2800%) hue-rotate(118deg) brightness(92%) contrast(90%)",
  fonts: {
    script: "Pacifico",
    sans: "Plus Jakarta Sans",
  },
} as const;
