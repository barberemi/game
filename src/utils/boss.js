export const boss = [
  {
    id: 1,
    name: "The Lich Skin",
    image: "lich-skin.png",
    level: 25,
    towerLevel: 1,
    academy: {
      name: "Magicien",
      roles: ["Dégats magiques", "Distance"],
      className: "text-primary",
      image: "magician.png",
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
    ]
  },
  {
    id: 2,
    name: "Green Barrow",
    image: "green-barrow.png",
    level: 45,
    towerLevel: 2,
    academy: {
      name: "Archer",
      roles: ["Dégats physiques", "Distance"],
      className: "text-danger",
      image: "hunter.png",
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
    towerLevel: 3,
    academy: {
      name: "Guerrier",
      image: "warrior.png",
      roles: ["Dégats physiques", "Corps à corps"],
      className: "text-danger",
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