export const character = {
  email: "barbe.remi25@gmail.com",
  name: "Pikachu",
  level: 55,
  experience: 160000,
  money: 666,
  skillPoints: 10,
  itemSpaceNb: 50,
  characteristics: [
    {name: "health", amount: 1200},
    {name: "haste", amount: 50},
    {name: "strength", amount: 110},
    {name: "intelligence", amount: 20},
    {name: "focus", amount: 150},
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
  },
  friends: [
    {id: 3, name: "Romain le romarin", level: 5, academy: {name: "warrior"}},
    {id: 4, name: "Alain le babouin", level: 2, academy: {name: "magician"}},
  ],
  items: [
    {id: 1, name: "Casque d'or", equipped: true, image: "https://www.gameuionweb.com/zelda-botw/items/armors/BotW_Cap_of_the_Hero_Icon.png", cost: 100, level: 10, type: "helmet", rarity: "common", characteristics: [
      {amount: 10, characteristic: {name: "Vie"}},
    ]},
    {id: 2, name: "Amulette d'or", equipped: true, image: "https://wow.zamimg.com/images/wow/icons/large/inv_jewelry_amulet_04.jpg", cost: 200, level: 20, type: "amulet", rarity: "unusual", characteristics: [
      {amount: 20, characteristic: {name: "Vie"}},
    ]},
    {id: 3, name: "Epaulières d'or", equipped: true, image: "https://wow.zamimg.com/images/wow/icons/large/inv_shoulder_25.jpg", cost: 2500, level: 25, type: "shoulders", rarity: "unusual", characteristics: [
      {amount: 25, characteristic: {name: "Vie"}},
    ]},
    {id: 4, name: "Armure d'or", equipped: true, image: "https://www.gameuionweb.com/zelda-botw/items/armors/BotW_Flamebreaker_Armor_Icon.png", cost: 3000, level: 30, type: "armor", rarity: "rare", characteristics: [
      {amount: 30, characteristic: {name: "Vie"}},
    ]},
    {id: 5, name: "Gants d'or", equipped: true, image: "https://wow.zamimg.com/images/wow/icons/large/inv_gauntlets_17.jpg", cost: 3500, level: 35, type: "glovers", rarity: "rare", characteristics: [
      {amount: 35, characteristic: {name: "Vie"}},
    ]},
    {id: 6, name: "Ceinture d'or", equipped: true, image: "https://wow.zamimg.com/images/wow/icons/large/inv_belt_12.jpg", cost: 4000, level: 40, type: "belt", rarity: "epic", characteristics: [
      {amount: 40, characteristic: {name: "Vie"}},
    ]},
    {id: 7, name: "Pantalon d'or", equipped: true, image: "https://www.gameuionweb.com/zelda-botw/items/armors/BotW_Zora_Greaves_Icon.png", cost: 4400, level: 45, type: "pants", rarity: "epic", characteristics: [
      {amount: 45, characteristic: {name: "Vie"}},
    ]},
    {id: 8, name: "Chaussures d'or", equipped: true, image: "https://wow.zamimg.com/images/wow/icons/large/inv_boots_cloth_05.jpg", cost: 5000, level: 50, type: "shoes", rarity: "legendary", characteristics: [
      {amount: 50, characteristic: {name: "Vie"}},
    ]},
    {id: 9, name: "Épée d'or", equipped: true, image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Ancient_Short_Sword_Icon.png", cost: 5500, level: 55, type: "weapon", rarity: "legendary", characteristics: [
      {amount: 55, characteristic: {name: "Vie"}},
      {amount: 100, characteristic: {name: "Force"}},
    ]},
    {id: 10, name: "Claymore de chevalier", equipped: false, image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Royal_Claymore_Icon.png", cost: 4500, level: 45, type: "weapon", rarity: "legendary", characteristics: [
      {amount: 35, characteristic: {name: "Vie"}},
      {amount: 30, characteristic: {name: "Force"}},
    ]},
    {id: 11, name: "Bâton divin", equipped: false, image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Tree_Branch_Icon.png", cost: 4500, level: 45, type: "weapon", rarity: "epic", characteristics: [
      {amount: 100, characteristic: {name: "Confiance"}},
    ]},
  ]
};