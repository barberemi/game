import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Steps } from 'intro.js-react'
import 'intro.js/introjs.css'
import 'intro.js/themes/introjs-modern.css'

import './styles.scss' // dont remove

class Tutorial extends Component {
  constructor(props) {
    super(props)

    this.state = {
      steps: {
        'character#generalTab': [
          {
            element: '#tutorialExperience',
            title: 'Personnage',
            intro:
              'Nom, niveau et expérience sur le niveau en cours, guilde du personnage, ainsi que la possibilité d’activer ou non le tutoriel.'
          },
          {
            element: '#tutorialCharacteristicsGenerales',
            title: 'Caractéristiques',
            intro:
              'La défense sert le soir contre les attaques de monstres contre la guilde, tandis que les points d’actions restantes vous montrent su vous pouvez encore effectuer des actions journalières.'
          },
          {
            element: '#tutorialCharacteristics',
            title: 'Caractéristiques',
            intro:
              'Toutes les caractéristiques de votre personnage.<br/>Ce qui est après le + correspond aux caractéristiques obtenus grâce aux objets équipés.'
          },
          {
            element: '#tutorialEquipments',
            title: 'Equipements',
            intro:
              'Armurerie de votre personnage.<br/>Tous les objets équipés augmentent vos caractéristiques.'
          }
        ],
        'character#skillsTab': [
          {
            element: '#tutorialSkillsPointsRemaining',
            title: 'Points de compétences',
            intro: 'Nombre de points de compétences encore restant.'
          },
          {
            element: '#tutorialSkills',
            title: 'Arbre de compétences',
            intro:
              'Compétences de votre personnage.<br/>Vous pouvez cliquer sur chaque compétence pour voir les informations de celle-ci, ainsi que les activer et les désactiver pour vos combats.'
          }
        ],
        'character#itemsTab': [
          {
            element: '#tutorialNbRemainingItems',
            title: 'Places disponibles',
            intro: 'Nombre de place de stockage qu’il vous reste.'
          },
          {
            element: '#tutorialItems',
            title: 'Inventaire',
            intro:
              'Tous les objets que vous possèdez.<br/>Vous pouvez survoler chaque objet pour voir les caractéristiques de l’objet, ou cliquer dessus afin de l’équiper/déséquiper, ou encore pour l’envoyer dans l’inventaire de guilde.'
          }
        ],
        'character#jobsTab': [
          {
            element: '#tutorialJobs',
            title: 'Métier',
            intro:
              'Vous pouvez choisir ici un métier pour votre personnage.<br/>Attention, choisir un métier vous le fera garder pour une durée de 1 mois.'
          }
        ],
        'character#constructionsTab': [
          {
            element: '#tutorialConstructions',
            title: 'Constructions',
            intro:
              'Toutes les constructions que vous pouvez effectuer pour votre personnage.<br/>Elles permettent d’améliorer la défense de votre personnage et d’aider votre guilde.'
          }
        ],
        'character#friendsTab': [
          {
            element: '#tutorialAddFriends',
            title: 'Ajouter un ami',
            intro:
              'Pour ajouter un ami dans votre liste, il suffit d’insérer son email dans le champ de cliquer sur ajouter.'
          },
          {
            element: '#tutorialFriendsList',
            title: 'Listing des amis',
            intro:
              'Permet de voir tous vos amis, avec leur niveau, leur rang de guilde, ainsi que la possibilité de voir leur fiche personnage et de discuter avec eux.'
          }
        ],
        homeGuild: [
          {
            title: 'Guilde',
            intro: 'Zone permettant d‘accéder à la guilde.'
          }
        ],
        homeBoss: [
          {
            title: 'Tour des monstres',
            intro: 'Zone permettant d‘accéder au panthéon des monstres.'
          }
        ],
        homeMap: [
          {
            title: 'Carte de navigation',
            intro: 'Zone permettant de choisir son expédition.'
          }
        ],
        homeCharacter: [
          {
            title: 'Personnage',
            intro: 'Zone permettant d‘accéder à sa fiche de personnage.'
          }
        ],
        monsters: [
          {
            element: '#tutorialDescriptionMonster',
            title: 'Monstre',
            intro: 'Nom, type, aspect et niveau du monstre.'
          },
          {
            element: '#tutorialNextMonster',
            title: 'Prochain monstre',
            intro:
              'Permet en cliquant dessus de visualiser les informations du monstre suivant.'
          },
          {
            element: '#tutorialCharacteristicsMonster',
            title: 'Caractéristiques',
            intro:
              'Toutes les caractéristiques du monstre, ainsi que l‘expérience donnée lors d‘une victoire contre lui.'
          },
          {
            element: '#tutorialSkills',
            title: 'Arbre de compétences',
            intro:
              'Compétences du monstre.<br/>Vous pouvez cliquer sur chaque compétence pour voir les informations de celle-ci.'
          },
          {
            element: '#tutorialItems',
            title: 'Inventaire',
            intro:
              'Tous les objets que vous pouvez obtenir en battant le monstre.<br/>Vous pouvez survoler chaque objet pour voir les caractéristiques de l’objet.'
          }
        ],
        'guild#generalTab': [
          {
            element: '#tutorialGuildName',
            title: 'Guilde',
            intro:
              'Nom de la guilde (nombre jours ayant survécu) ainsi que les boutons d’actions de guilde et de métier.'
          },
          {
            element: '#tutorialGuildAnnouncement',
            title: 'Annonce',
            intro:
              'Permet de visualiser l‘annonce de la guilde, faite par le chef.'
          },
          {
            element: '#tutorialGuildEstimation',
            title: 'Estimation',
            intro:
              'Permet de visualiser rapidement la défense de votre guilde, et l’attaque des monstres qui attaqueront dans la soirée.'
          }
        ],
        'guild#chatTab': [
          {
            element: '#tutorialGuildChat',
            title: 'Discussion de guilde',
            intro: 'Permet de chatter avec tous les membres de la guilde.'
          }
        ],
        'guild#constructionsTab': [
          {
            element: '#tutorialConstructions',
            title: 'Constructions',
            intro:
              'Toutes les constructions que vous pouvez effectuer pour la guilde pour l’améliorer.'
          }
        ],
        'guild#membersTab': [
          {
            element: '#tutorialGuildMembers',
            title: 'Membres de la guilde',
            intro:
              'Permet de visualiser tous les membres de la guilde, avec leur niveau, leur rang, mais aussi de pouvoir naviguer sur leur profil de personnage.'
          }
        ],
        'guild#itemsGuildTab': [
          {
            element: '#tutorialGuildItems',
            title: 'Coffre de guilde',
            intro:
              'Permet de visualiser tous les objets que votre guilde possède.<br/>Vous pouvez survoler les survoler afin de voir leurs caractéristiques, et cliquer dessus afin de les envoyer dans votre coffre personnel.'
          }
        ],
        'guild#fightBossTab': [
          {
            element: '#tutorialGuildBossChoice',
            title: 'Champion de guilde',
            intro:
              'Permet de visualiser le champion contre lequel se bat votre guilde.'
          },
          {
            element: '#tutorialGuildBossAttacks',
            title: 'Combats journaliers',
            intro:
              'Permet de visualiser les attaques de la journée des membres de la guilde contre le champion.'
          }
        ],
        'guild#choiceBossTab': [
          {
            element: '#tutorialGuildChoiceBoss',
            title: 'Choix du champion',
            intro:
              'Permet de choisir le champion contre lequel votre guilde va pouvoir se battre tous les jours, parmis ceux déjà battus.'
          }
        ],
        crafting: [
          {
            element: '#tutorialCraftingListing',
            title: 'Forge',
            intro:
              'Choisissez un objet à forger, pou voir les composants nécessaires, et le forger si possible.'
          }
        ]
      }
    }
  }

  render() {
    return (
      <Steps
        enabled={this.props.stepsEnabled}
        steps={_.get(this.state.steps, this.props.stepName)}
        initialStep={0}
        onExit={this.props.onExit}
        onComplete={this.props.onComplete}
        options={{
          nextLabel: 'Suivant',
          prevLabel: 'Précédent',
          doneLabel: this.props.doneLabel,
          highlightClass: 'introjsCustomOverlay',
          tooltipClass: 'introjsCustomTooltip ' + this.props.customTooltipClass,
          showBullets: this.props.showBullets,
          hidePrev: true
        }}
      />
    )
  }
}

Tutorial.defaultProps = {
  showBullets: true,
  doneLabel: 'Terminer'
}

Tutorial.propTypes = {
  stepsEnabled: PropTypes.bool,
  stepName: PropTypes.string,
  doneLabel: PropTypes.string,
  customTooltipClass: PropTypes.string,
  showBullets: PropTypes.bool,
  onComplete: PropTypes.func,
  onExit: PropTypes.func
}

export default Tutorial
