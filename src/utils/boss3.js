export const boss3 = {
  name: "The Lich Skin",
  image: "lich-skin.png",
  level: 25,
  givenExperience: 8600,
  towerLevel: 1,
  characteristics: [
    {name: "health", amount: 600},
    {name: "haste", amount: 20},
    {name: "strength", amount: 30},
    {name: "intelligence", amount: 120},
    {name: "focus", amount: 50},
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
    name: "Magicien",
    roles: ["Dégats magiques", "Distance"],
    className: "text-primary",
    image: "magician.png",
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
  ]
};