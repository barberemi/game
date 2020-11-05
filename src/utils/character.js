export const character = {
  email: "barbe.remi25@gmail.com",
  name: "Pikachu",
  level: 55,
  experience: 160000,
  money: 666,
  skillPoints: 10,
  characteristics: [
    {name: "health", amount: 1200},
    {name: "haste", amount: 50},
    {name: "strength", amount: 110},
    {name: "intelligence", amount: 20},
    {name: "focus", amount: 150},
  ],
  equippedItems: [
    {name: "Casque d'or", cost: 100, level: 10, type: "helmet", rarity: "common", characteristics: [
        {amount: 10, characteristic: {name: "Vie"}},
    ]},
    {name: "Amulette d'or", cost: 200, level: 20, type: "amulet", rarity: "unusual", characteristics: [
      {amount: 20, characteristic: {name: "Vie"}},
    ]},
    {name: "Epaulières d'or", cost: 2500, level: 25, type: "shoulders", rarity: "unusual", characteristics: [
      {amount: 25, characteristic: {name: "Vie"}},
    ]},
    {name: "Armure d'or", cost: 3000, level: 30, type: "armor", rarity: "rare", characteristics: [
      {amount: 30, characteristic: {name: "Vie"}},
    ]},
    {name: "Gants d'or", cost: 3500, level: 35, type: "gloves", rarity: "rare", characteristics: [
      {amount: 35, characteristic: {name: "Vie"}},
    ]},
    {name: "Ceinture d'or", cost: 4000, level: 40, type: "belt", rarity: "epic", characteristics: [
      {amount: 40, characteristic: {name: "Vie"}},
    ]},
    {name: "Pantalon d'or", cost: 4400, level: 45, type: "pantalon", rarity: "epic", characteristics: [
      {amount: 45, characteristic: {name: "Vie"}},
    ]},
    {name: "Chaussures d'or", cost: 5000, level: 50, type: "shoes", rarity: "legendary", characteristics: [
      {amount: 50, characteristic: {name: "Vie"}},
    ]},
    {name: "Épée d'or", cost: 5500, level: 55, type: "weapon", rarity: "legendary", characteristics: [
      {amount: 55, characteristic: {name: "Vie"}},
      {amount: 100, characteristic: {name: "Force"}},
    ]},
  ],
  skills: {
    dark: [
      {
        id: 1,
        level: 5,
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
      {
        id: 4,
        level: 15,
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
      {
        id: 7,
        level: 25,
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
    ],
    light: [
      {
        id: 19,
        level: 5,
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
      {
        id: 22,
        level: 15,
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
    ]
  },
  guild: {
    name: "Les Flibustier",
  },
  academy: {
    name: "Guerrier",
    image: "warrior.png",
    roles: ["Dégats physiques", "Corps à corps"],
    className: "text-danger",
  }
};