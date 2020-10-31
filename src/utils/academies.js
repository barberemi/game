export const academies = [
  {
    name: "Archer",
    description: "Académie de combat à distance, l'archer est présent sur le champ de bataille pour infliger des dégats physique.",
    roles: ["Dégats physiques", "Distance"],
    className: "text-danger",
    image: "hunter.png",
    skills: [
      {
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
      {
        name: "Tir de flibustier",
        description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
      },
    ],
  },
  {
    name: "Guerrier",
    description: "Académie de combat au corps à corps, le guerrier est présent sur le champ de bataille pour infliger des dégats physique.",
    roles: ["Dégats physiques", "Corps à corps"],
    className: "text-danger",
    image: "warrior.png",
    skills: [
      {
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
      {
        name: "Tir de flibustier",
        description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
      },
    ],
  },
  {
    name: "Magicien",
    description: "Académie de combat à distance, le mage est présent sur le champ de bataille pour infliger des dégats magique et de zone.",
    roles: ["Dégats magiques", "Distance"],
    className: "text-primary",
    image: "magician.png",
    skills: [
      {
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
      {
        name: "Tir de flibustier",
        description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
      },
    ],
  },
  {
    name: "Protecteur",
    description: "Académie de combat au corps à corps, le protecteur est présent sur le champ de bataille pour encaisser les dégats des ennemis et prendre le focus de ceux-ci.",
    roles: ["Encaisser les dégats", "Corps à corps"],
    className: "text-success",
    image: "protector.png",
    skills: [
      {
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
      {
        name: "Tir de flibustier",
        description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
      },
    ],
  },
  {
    name: "Prêtre",
    description: "Académie de soutien, le prêtre est présent sur le champ de bataille pour épauler ses collègues via des compétences de soin ou des buffs.",
    roles: ["Soutien", "Soin"],
    className: "text-success",
    image: "priest.png",
    skills: [
      {
        name: "Décoche flèches",
        description: "Décoche une volée de flèches sur l'ennemi, lui infligeant 46pts de dégats.",
      },
      {
        name: "Tir de flibustier",
        description: "Tire une énorme flèche sur l'ennemi, lui infligeant 99pts de dégats.",
      },
    ],
  },
];