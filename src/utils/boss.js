export const boss = [
  {
    id: 1,
    name: "The Lich Skin",
    image: "lich-skin.png",
    level: 25,
    givenExperience: 8600,
    levelTower: 1,
    characteristics: [
      {name: "health", amount: 600},
      {name: "haste", amount: 20},
      {name: "strength", amount: 30},
      {name: "intelligence", amount: 120},
      {name: "focus", amount: 50},
    ],
    academy: {
      name: "Magicien",
      role: "Dégats magiques,Distance",
      color: "text-primary",
      image: "magician.png",
    },
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
    items: [
      {
        id: 8,
        name: "Chaussures d'or",
        image: "https://wow.zamimg.com/images/wow/icons/large/inv_boots_cloth_05.jpg",
        cost: 5000,
        level: 50,
        type: "shoes",
        rarity: "legendary",
        characteristics: [
          {amount: 50, characteristic: {name: "Vie"}},
        ],
        itemsToCraft: [
          {
            amount: 1,
            item: {
              id: 9,
              name: "Épée d'or",
              image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Ancient_Short_Sword_Icon.png",
              cost: 5500,
              level: 55,
              type: "weapon",
              rarity: "legendary",
              characteristics: [
                {amount: 55, characteristic: {name: "Vie"}},
                {amount: 100, characteristic: {name: "Force"}},
              ]
            },
          },
          {
            amount: 1,
            item: {
              id: 11,
              name: "Bâton divin",
              image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Tree_Branch_Icon.png",
              cost: 4500,
              level: 45,
              type: "weapon",
              rarity: "epic",
              characteristics: [
                {amount: 100, characteristic: {name: "Confiance"}},
              ],
            }
          }
        ]
      },
      {
        id: 10,
        name: "Claymore de chevalier",
        image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Royal_Claymore_Icon.png",
        cost: 4500,
        level: 45,
        type: "weapon",
        rarity: "legendary",
        characteristics: [
          {amount: 35, characteristic: {name: "Vie"}},
          {amount: 30, characteristic: {name: "Force"}},
        ],
        itemsToCraft: [
          {
            amount: 2,
            item: {
              id: 9,
              name: "Épée d'or",
              image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Ancient_Short_Sword_Icon.png",
              cost: 5500,
              level: 55,
              type: "weapon",
              rarity: "legendary",
              characteristics: [
                {amount: 55, characteristic: {name: "Vie"}},
                {amount: 100, characteristic: {name: "Force"}},
              ]
            },
          }
        ]
      },
      {
        id: 20,
        name: "Morceau d'épée",
        image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Royal_Claymore_Icon.png",
        cost: 4500,
        type: "craft",
        rarity: "epic",
      },
    ]
  },
  {
    id: 2,
    name: "Green Barrow",
    image: "green-barrow.png",
    level: 45,
    givenExperience: 11500,
    levelTower: 2,
    characteristics: [
      {name: "health", amount: 800},
      {name: "haste", amount: 20},
      {name: "strength", amount: 70},
      {name: "intelligence", amount: 30},
      {name: "focus", amount: 80},
    ],
    academy: {
      name: "Archer",
      role: "Dégats physiques,Distance",
      color: "text-danger",
      image: "hunter.png",
    },
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
    items: [
      {
        id: 11,
        name: "Bâton divin",
        image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Tree_Branch_Icon.png",
        cost: 4500,
        level: 45,
        type: "weapon",
        rarity: "epic",
        characteristics: [
          {amount: 100, characteristic: {name: "Confiance"}},
        ],
        itemsToCraft: [
          {
            amount: 2,
            item: {
              id: 9,
              name: "Épée d'or",
              image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Ancient_Short_Sword_Icon.png",
              cost: 5500,
              level: 55,
              type: "weapon",
              rarity: "legendary",
              characteristics: [
                {amount: 55, characteristic: {name: "Vie"}},
                {amount: 100, characteristic: {name: "Force"}},
              ]
            },
          }
        ]
      },
    ]
  },
  {
    id: 3,
    name: "Le Berseker",
    image: "berseker.png",
    level: 55,
    givenExperience: 16000,
    levelTower: 3,
    characteristics: [
      {name: "health", amount: 1200},
      {name: "haste", amount: 50},
      {name: "strength", amount: 110},
      {name: "intelligence", amount: 20},
      {name: "focus", amount: 150},
    ],
    academy: {
      name: "Guerrier",
      image: "warrior.png",
      role: "Dégats physiques,Corps à corps",
      color: "text-danger",
    },
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
    items: [
      {
        id: 11,
        name: "Bâton divin",
        image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Tree_Branch_Icon.png",
        cost: 4500,
        level: 45,
        type: "weapon",
        rarity: "epic",
        characteristics: [
          {amount: 100, characteristic: {name: "Confiance"}},
        ],
        itemsToCraft: [
          {
            amount: 2,
            item: {
              id: 9,
              name: "Épée d'or",
              image: "https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Ancient_Short_Sword_Icon.png",
              cost: 5500,
              level: 55,
              type: "weapon",
              rarity: "legendary",
              characteristics: [
                {amount: 55, characteristic: {name: "Vie"}},
                {amount: 100, characteristic: {name: "Force"}},
              ]
            },
          }
        ]
      },
    ]
  },
];