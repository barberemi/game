export const explorations = {
  explorations: [
    {
      id: 16,
      image: 'arene-boss.png',
      width: '200px',
      col: 12,
      offset: 0,
      next: []
    },

    {
      id: 15,
      image: 'batiment.png',
      width: '100px',
      col: 4,
      offset: 0,
      next: [16]
    },
    {
      id: 14,
      image: 'batiment.png',
      width: '100px',
      col: 4,
      offset: 0,
      next: [16]
    },
    {
      id: 13,
      image: 'batiment.png',
      width: '100px',
      col: 4,
      offset: 0,
      next: [16]
    },

    {
      id: 12,
      image: 'batiment.png',
      width: '100px',
      col: 6,
      offset: 0,
      next: [14, 15]
    },
    {
      id: 11,
      image: 'batiment.png',
      width: '100px',
      col: 6,
      offset: 0,
      next: [13, 14]
    },

    {
      id: 10,
      image: 'batiment.png',
      width: '100px',
      col: 4,
      offset: 0,
      next: [12]
    },
    {
      id: 9,
      image: 'batiment.png',
      width: '100px',
      col: 4,
      offset: 0,
      next: [11, 12]
    },
    {
      id: 8,
      image: 'batiment.png',
      width: '100px',
      col: 4,
      offset: 0,
      next: [11]
    },

    {
      id: 7,
      image: 'ingenieur.png',
      width: '100px',
      col: 6,
      offset: 0,
      next: [9, 10]
    },
    {
      id: 6,
      image: 'marchand.png',
      width: '100px',
      col: 6,
      offset: 0,
      next: [8, 9]
    },

    {
      id: 5,
      image: 'batiment.png',
      width: '100px',
      col: 3,
      offset: 0,
      next: [7]
    },
    {
      id: 4,
      image: 'batiment.png',
      width: '100px',
      col: 3,
      offset: 0,
      next: [7]
    },
    {
      id: 3,
      image: 'batiment.png',
      width: '100px',
      col: 3,
      offset: 0,
      next: [6]
    },
    {
      id: 2,
      image: 'batiment.png',
      width: '100px',
      col: 3,
      offset: 0,
      next: [6]
    },

    {
      id: 1,
      image: 'batiment.png',
      width: '100px',
      col: 12,
      offset: 0,
      next: [2, 3, 4, 5]
    }
  ],
  boss: {
    name: 'Le Masqué',
    image: 'boss1-portrait.png',
    width: '60px',
    height: '60px'
  },
  player: {
    name: 'pikachu',
    image: 'pikachu.png',
    position: 15
  }
}
