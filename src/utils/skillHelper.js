import React from 'react'

// To get the color of the skill border
export const getBorderColorSkill = (isDark) => {
  return isDark ? '#7730ec' : '#fcce18'
}

export const getLabelTypeSkill = (type) => {
  switch (type) {
    case 'melee':
      return 'Attaque de mêlée'
    case 'range':
      return 'Attaque à distance'
    case 'heal':
      return 'Soin'
    case 'hot':
      return 'Soin sur la durée'
    case 'dot':
      return 'Dégats sur la durée'
    case 'movement':
      return 'Déplacement'
    case 'skill_block':
      return 'Blocage de compétence'
    case 'unknown':
      return 'Inconnu'
    default:
      return type
  }
}

export const getIconSkillType = (type, isTall) => {
  return (
    <img
      src={process.env.PUBLIC_URL + '/img/skill-types/' + type + '.svg'}
      width={isTall ? '30px' : '20px'}
      alt={type}
    />
  )
}
