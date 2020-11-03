export const character = {
  email: "barbe.remi25@gmail.com",
  name: "Pikachu",
  level: 55,
  experience: 160000,
  money: 666,
  characteristics: [
    {name: "health", amount: 1200},
    {name: "haste", amount: 50},
    {name: "strength", amount: 110},
    {name: "intelligence", amount: 20},
    {name: "focus", amount: 150},
  ],
  equippedItems: [
    {name: "Casque d'or", cost: 100, level: 10, type: "helmet", rarity: "common"},
    {name: "Amulette d'or", cost: 200, level: 20, type: "amulet", rarity: "unusual"},
    {name: "Epaulières d'or", cost: 2500, level: 25, type: "shoulders", rarity: "unusual"},
    {name: "Armure d'or", cost: 3000, level: 30, type: "armor", rarity: "rare"},
    {name: "Gants d'or", cost: 3500, level: 35, type: "gloves", rarity: "rare"},
    {name: "Ceinture d'or", cost: 4000, level: 40, type: "belt", rarity: "epic"},
    {name: "Pantalon d'or", cost: 4400, level: 45, type: "pantalon", rarity: "epic"},
    {name: "Chaussures d'or", cost: 5000, level: 50, type: "shoes", rarity: "legendary"},
    {name: "Épée d'or", cost: 5500, level: 55, type: "weapon", rarity: "legendary"},
  ],
  skills: {
    dark: [
      {
        id: 1,
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
      {
        id: 2,
        name: "Tir de flibustier",
        description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
      },
    ],
    light: [
      {
        id: 3,
        name: "Tir de flibustier",
        description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
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
    skills: {
      dark: [
        {
          id: 1,
          name: "Décoche flèches",
          description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
        },
        {
          id: 2,
          name: "Tir de flibustier",
          description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
        },
        {
          id: 5,
          name: "Tir de flibustier",
          description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
        },
        {
          id: 6,
          name: "Tir de flibustier",
          description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
        },
        {
          id: 7,
          name: "Tir de flibustier",
          description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
        },
      ],
      light: [
        {
          id: 3,
          name: "Tir de flibustier",
          description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
        },
        {
          id: 4,
          name: "Tir de flibustier",
          description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
        },
      ]
    },
  }
};