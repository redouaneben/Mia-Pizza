/** Palette Mia Pizza — 3 verts : sapin, sauge, sapin foncé (hover) */
export const C = {
  paper: "#F1EFE5",
  forest: "#20543B",
  forestDark: "#1a4530",
  sage: "#719A76",
  ink: "#27251F",
  white: "#FDFCF8",
} as const;

/** PNG noir / gris → teinte sapin foncé (décors herbes) */
export const DECOR_FOREST_DARK_FILTER =
  "brightness(0) saturate(100%) invert(14%) sepia(22%) saturate(2800%) hue-rotate(118deg) brightness(92%) contrast(90%)";
