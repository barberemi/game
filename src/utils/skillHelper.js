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

export const getIconSkillType = (type) => {
  switch (type) {
    case 'melee':
      return <i className="fas fa-fist-raised" />
    case 'range':
      return <i className="fas fa-bolt" />
    case 'heal':
      return <i className="fas fa-hand-holding-medical" />
    case 'hot':
      return <i className="fas fa-medkit" />
    case 'dot':
      return <i className="fas fa-burn" />
    case 'movement':
      return <i className="fas fa-shoe-prints" />
    case 'skill_block':
      return <i className="fas fa-lock" />
    case 'unknown':
      return <i className="fas fa-question" />
    default:
      return type
  }
}
