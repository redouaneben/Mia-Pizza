export type PizzaItem = {
  name: string;
  ingredients: string;
  grande: number;
  petite: number | null;
};

export type MenuTab = "tomate" | "creme";

export const PIZZAS_TOMATE: PizzaItem[] = [
  {
    name: "Margherita",
    ingredients:
      "Tomate San Marzano, mozzarella Fior di Latte, origan, olives",
    grande: 9.4,
    petite: 7.6,
  },
  {
    name: "Chorizo",
    ingredients:
      "Tomate San Marzano, chorizo, mozzarella Fior di Latte, origan, olives",
    grande: 10.4,
    petite: 8.0,
  },
  {
    name: "Pescatora",
    ingredients:
      "Tomate San Marzano, thon, poivrons, câpres, mozzarella Fior di Latte, origan, olives",
    grande: 11.9,
    petite: 8.6,
  },
  {
    name: "Napolitaine",
    ingredients:
      "Tomate San Marzano, anchois, mozzarella Fior di Latte, origan, olives",
    grande: 10.4,
    petite: 8.0,
  },
  {
    name: "Prosciutto",
    ingredients:
      "Tomate San Marzano, jambon, mozzarella Fior di Latte, origan, olives",
    grande: 10.4,
    petite: 8.0,
  },
  {
    name: "Sicilienne",
    ingredients:
      "Tomate San Marzano, anchois, câpres, mozzarella Fior di Latte, origan, olives",
    grande: 10.9,
    petite: 8.0,
  },
  {
    name: "Reine",
    ingredients:
      "Tomate San Marzano, jambon, champignons, mozzarella Fior di Latte, origan, olives",
    grande: 10.9,
    petite: 8.0,
  },
  {
    name: "Dauphinoise",
    ingredients:
      "Tomate San Marzano, reblochon, mozzarella Fior di Latte, lardons, olives",
    grande: 11.4,
    petite: 8.5,
  },
  {
    name: "Végétalia",
    ingredients:
      "Tomate San Marzano, champignons, artichauts, poivrons, aubergines, mozzarella Fior di Latte, origan, olives",
    grande: 11.9,
    petite: 8.7,
  },
  {
    name: "Tonio",
    ingredients:
      "Tomate San Marzano, jambon, œuf, filet de crème, mozzarella Fior di Latte, origan, olives",
    grande: 11.4,
    petite: 8.5,
  },
  {
    name: "Basquaise",
    ingredients:
      "Tomate San Marzano, poulet, poivrons, mozzarella Fior di Latte, origan, olives",
    grande: 11.4,
    petite: 8.5,
  },
  {
    name: "Andalouse",
    ingredients:
      "Tomate San Marzano, chorizo, poivrons, oignons, mozzarella Fior di Latte, origan, olives",
    grande: 11.4,
    petite: 8.5,
  },
  {
    name: "Chèvre miel",
    ingredients:
      "Tomate San Marzano, chèvre, mozzarella Fior di Latte, miel, olives",
    grande: 11.4,
    petite: 8.5,
  },
  {
    name: "4 saisons",
    ingredients:
      "Tomate San Marzano, jambon, champignons, artichauts, mozzarella Fior di Latte, origan, olives",
    grande: 11.4,
    petite: 8.5,
  },
  {
    name: "Campagnarde",
    ingredients:
      "Tomate San Marzano, oignons, lardons, mozzarella Fior di Latte, filet de crème, olives",
    grande: 11.9,
    petite: 8.6,
  },
  {
    name: "Bolonaise",
    ingredients:
      "Tomate San Marzano, oignons, viande hachée, mozzarella Fior di Latte, œuf, olives",
    grande: 12.4,
    petite: 9.2,
  },
  {
    name: "Chef",
    ingredients:
      "Tomate San Marzano, jambon, champignons, poivrons, mozzarella Fior di Latte, œuf, origan, olives",
    grande: 12.4,
    petite: 9.0,
  },
  {
    name: "4 fromages",
    ingredients:
      "Tomate San Marzano, gorgonzola, roquefort, parmesan, mozzarella Fior di Latte, olives",
    grande: 12.5,
    petite: 9.4,
  },
  {
    name: "Forestière",
    ingredients:
      "Tomate San Marzano, jambon, champignons, gorgonzola, mozzarella Fior di Latte, olives",
    grande: 12.7,
    petite: 8.9,
  },
  {
    name: "Patron",
    ingredients:
      "Tomate San Marzano, oignons, reblochon, jambon, mozzarella Fior di Latte, lardons, filet de crème, olives",
    grande: 13.0,
    petite: 9.4,
  },
  {
    name: "Fruits de mer",
    ingredients:
      "Tomate San Marzano, fruits de mer, mozzarella Fior di Latte, persillade, olives",
    grande: 13.0,
    petite: 9.4,
  },
  {
    name: "San Gennaro",
    ingredients:
      "Tomate San Marzano, poivrons, mozzarella Fior di Latte, saucisse piquante napolitaine, origan, olives",
    grande: 12.9,
    petite: null,
  },
  {
    name: "Diavola",
    ingredients:
      "Tomate San Marzano, saucisses piquantes napolitaines, gorgonzola, mozzarella Fior di Latte, parmesan, olives",
    grande: 14.4,
    petite: null,
  },
  {
    name: "Pizza du mois",
    ingredients: "Consulter sur place ou Facebook",
    grande: 15.3,
    petite: null,
  },
  {
    name: "Elio",
    ingredients:
      "Tomate San Marzano, taleggio, mozzarella Fior di Latte, roquette, coppa, parmesan, réduction de vinaigre balsamique, olives",
    grande: 14.0,
    petite: null,
  },
  {
    name: "Mia pizza",
    ingredients:
      "Tomate San Marzano, mozzarella Fior di Latte, roquette, jambon cru, tomates cerises, mozzarella di bufala, parmesan, olives",
    grande: 14.9,
    petite: null,
  },
];

export const PIZZAS_CREME: PizzaItem[] = [
  {
    name: "Bressane",
    ingredients: "Crème, poulet, mozzarella Fior di Latte, origan, olives",
    grande: 10.9,
    petite: 8.0,
  },
  {
    name: "Dolce",
    ingredients:
      "Crème, jambon, reblochon, mozzarella Fior di Latte, parmesan, olives",
    grande: 11.8,
    petite: 8.5,
  },
  {
    name: "Tartiflette",
    ingredients:
      "Crème, oignons, pommes de terre, reblochon, mozzarella Fior di Latte, lardons, olives",
    grande: 12.9,
    petite: 8.5,
  },
  {
    name: "Cocotte",
    ingredients:
      "Crème, poulet, reblochon, pommes de terre, mozzarella Fior di Latte, origan, olives",
    grande: 12.8,
    petite: 8.5,
  },
  {
    name: "Fontina",
    ingredients:
      "Crème, fontina, gorgonzola, mozzarella Fior di Latte, roquette, saucisse piquante napolitaine, olives",
    grande: 14.5,
    petite: 10.0,
  },
  {
    name: "Cosi",
    ingredients:
      "Crème, jambon, taleggio, mozzarella Fior di Latte, roquette, tomates cerises, mozzarella di bufala, olives",
    grande: 14.5,
    petite: 10.0,
  },
  {
    name: "Prima",
    ingredients:
      "Crème, poulet, poivrons, tomates cerises, mozzarella di bufala, réduction de vinaigre balsamique, parmesan, olives",
    grande: 14.5,
    petite: 10.0,
  },
  {
    name: "Truffelia",
    ingredients:
      "Crème de truffe, jambon, champignons frais, mozzarella Fior di Latte, tomates cerises, mozzarella di bufala, olives",
    grande: 14.8,
    petite: 10.4,
  },
];
