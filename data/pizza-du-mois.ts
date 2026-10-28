import type { StaticImageData } from "next/image";

import pizzaDuMoisImage from "../IMGS/pizzadumois.jpg";

/** Pizza du mois — MAJ mensuelle (1 modif abo client) */
export const pizzaDuMois = {
  name: "Pizza du mois",
  ingredients:
    "Base crème, jambon cru, copeaux de parmesan, touches de fromage frais, olives noires, filet de crème de balsamique",
  grande: 15.3,
  petite: null as number | null,
  image: pizzaDuMoisImage as StaticImageData,
  imageAlt: "Pizza du mois — création artisanale Mia Pizza",
} as const;
