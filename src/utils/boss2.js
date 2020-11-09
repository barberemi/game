export const boss2 = {
  name: "Green Barrow",
  image: "green-barrow.png",
  level: 45,
  givenExperience: 11500,
  towerLevel: 2,
  characteristics: [
    {name: "health", amount: 800},
    {name: "haste", amount: 20},
    {name: "strength", amount: 70},
    {name: "intelligence", amount: 30},
    {name: "focus", amount: 80},
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
  academy: {
    name: "Archer",
    roles: ["Dégats physiques", "Distance"],
    className: "text-danger",
    image: "hunter.png",
  },
  items: [
    {id: 1, name: "Casque d'or", image: "https://www.gameuionweb.com/zelda-botw/items/armors/BotW_Cap_of_the_Hero_Icon.png", cost: 100, level: 10, type: "helmet", rarity: "common", characteristics: [
        {amount: 10, characteristic: {name: "Vie"}},
      ]},
    {id: 2, name: "Amulette d'or", image: "https://wow.zamimg.com/images/wow/icons/large/inv_jewelry_amulet_04.jpg", cost: 200, level: 20, type: "amulet", rarity: "unusual", characteristics: [
        {amount: 20, characteristic: {name: "Vie"}},
      ]},
    {id: 3, name: "Epaulières d'or", image: "https://wow.zamimg.com/images/wow/icons/large/inv_shoulder_25.jpg", cost: 2500, level: 25, type: "shoulders", rarity: "unusual", characteristics: [
        {amount: 25, characteristic: {name: "Vie"}},
      ]},
    {id: 4, name: "Armure d'or", image: "https://www.gameuionweb.com/zelda-botw/items/armors/BotW_Flamebreaker_Armor_Icon.png", cost: 3000, level: 30, type: "armor", rarity: "rare", characteristics: [
        {amount: 30, characteristic: {name: "Vie"}},
      ]},
    {id: 5, name: "Gants d'or", image: "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_17.jpg", cost: 3500, level: 35, type: "glovers", rarity: "rare", characteristics: [
        {amount: 35, characteristic: {name: "Vie"}},
      ]},
    {id: 6, name: "Ceinture d'or", image: "https://wow.zamimg.com/images/wow/icons/large/inv_belt_12.jpg", cost: 4000, level: 40, type: "belt", rarity: "epic", characteristics: [
        {amount: 40, characteristic: {name: "Vie"}},
      ]},
    {id: 7, name: "Pantalon d'or", image: "https://www.gameuionweb.com/zelda-botw/items/armors/BotW_Zora_Greaves_Icon.png", cost: 4400, level: 45, type: "pants", rarity: "epic", characteristics: [
        {amount: 45, characteristic: {name: "Vie"}},
      ]},
  ]
};