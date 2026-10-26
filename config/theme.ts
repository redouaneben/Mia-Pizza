/**
 * Design tokens — modifier ici pour un nouveau client (blueprint).
 * Les classes Tailwind dans les composants reprennent ces hex (pas de classes dynamiques).
 */
export const theme = {
  colors: {
    paper: "#F1EFE5",
    forest: "#20543B",
    forestDark: "#1a4530",
    sage: "#719A76",
    ink: "#27251F",
    white: "#FDFCF8",
    statusClosed: "#E8E6E0",
  },
  decorForestDarkFilter:
    "brightness(0) saturate(100%) invert(14%) sepia(22%) saturate(2800%) hue-rotate(118deg) brightness(92%) contrast(90%)",
  fonts: {
    script: "Pacifico",
    sans: "Plus Jakarta Sans",
  },
} as const;
