import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import _ from 'lodash'
import CardChoice from '../../../Components/Exploration/CardChoice'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import HpNavBar from '../../../Components/NavBar/HpNavBar'
import ExperienceNavBar from '../../../Components/NavBar/ExperienceNavBar'
import Loader from '../../../Components/Loader/Loader'
import axios from 'axios'
import Cookies from 'js-cookie'
import AcademySprite from '../../../Components/Sprites/AcademySprite'
import MonsterSprite from '../../../Components/Sprites/MonsterSprite'

const Container = styled.div`
  ${() =>
    _.includes(window.location.href, 'guild_exploration') &&
    css`
      background-image: url(${process.env.PUBLIC_URL +
      '/img/backgrounds/guild-exploration-min.jpg'});
    `};

  ${() =>
    !_.includes(window.location.href, 'guild_exploration') &&
    css`
      background-image: url(${process.env.PUBLIC_URL +
      '/img/backgrounds/swamp-min.jpg'});
    `};
  background-size: 100% 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const SubContainer = styled.div`
  text-align: center;
  color: white;
  min-height: 250px;
  overflow-y: scroll;
`

const AvatarBox = styled.div`
  display: flex;
  left: 15%;

  @media (min-width: 768px) {
    bottom: 10%;
  }
`

const ImageChoice = styled.img`
  @media (min-width: 410px) {
    width: 70px;
  }

  @media (min-width: 768px) {
    width: 150px;
  }
`

const SubSubContainer = styled.div`
  margin-top: 100px;
`

const TextDescription = styled.div`
  text-shadow: 1px 1px 2px black;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`

class Choice extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: this.props.match.params.type,
      idExploration: parseInt(this.props.match.params.idExploration),
      typeExploration: this.props.match.params.typeExploration,
      user: undefined,
      loading: true,
      redirect: undefined,
      text: undefined,
      cards: undefined,
      room: undefined
    }

    this.getHandleImage = this.getHandleImage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setUserAndRedirect = this.setUserAndRedirect.bind(this)
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + '/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          // 2 - Get room
          let text = undefined
          let cards = []
          let room = undefined
          if (this.state.typeExploration === 'guild_exploration') {
            _.map(response.data.guild.exploration, (row) => {
              // 2.1 - Store the room
              if (row[0].id === this.state.idExploration) {
                room = row[0]
              }
            })
            // 2.2 - Url dont exists on rooms of guild exploration
            const nextPossible = response.data.guild.exploration.slice(
              -(response.data.guild.position + 1)
            )[0][0].next

            if (!_.includes(nextPossible, this.state.idExploration)) {
              this.setState({ redirect: '/guild_exploration' })
            }
          } else {
            _.map(response.data.exploration, (row, index) => {
              if (
                index !== '1' &&
                index !== String(Object.keys(response.data.exploration).length)
              ) {
                _.map(row, (col) => {
                  // 2.1 - Store the room
                  if (col.id === this.state.idExploration) {
                    room = col
                  }
                  // 2.2 - Url dont exists on rooms of user exploration
                  if (
                    col.id ===
                    response.data.exploration[
                      Object.keys(response.data.exploration).length
                    ].position
                  ) {
                    if (!_.includes(col.next, this.state.idExploration)) {
                      this.setState({ redirect: '/exploration' })
                    }
                  }
                })
              }
            })
          }

          // 3 - Set cards and other
          switch (this.state.type) {
            case 'arene-boss':
              text =
                this.state.typeExploration === 'guild_exploration'
                  ? 'Vous êtes sur le point de vous battre contre <span class="text-warning"><i>' +
                    room.name +
                    '</i></span>. Etes-vous prêt ?'
                  : 'Vous êtes sur le point de vous battre contre le <span class="text-warning"><i>champion</i></span> de la carte, êtes-vous prêt ?'
              cards = [
                {
                  btn_color: 'btn-danger',
                  text_btn: 'Euh ben go...',
                  action: 'fight-boss'
                },
                {
                  btn_color: 'btn-success',
                  text_btn: 'Foncer!',
                  action: 'fight-boss'
                }
              ]
              break
            case 'treasure':
              text =
                'Vous êtes sur le point de vous battre pour récupérer le <span class="text-warning"><i>trésor</i></span> de la carte, êtes-vous prêt ?'
              cards = [
                {
                  btn_color: 'btn-danger',
                  text_btn: 'Euh ben go...',
                  action: 'fight-boss'
                },
                {
                  btn_color: 'btn-success',
                  text_btn: 'Foncer!',
                  action: 'fight-boss'
                }
              ]
              break
            case 'dealer':
              text =
                "Oh mais dites-donc, vous êtes tombé nez à nez avec le forgeron!<br/> Il souhaite vous aider à <span class='text-warning'><i>forger un objet</i></span>, moyennant finance, bien évidemment."
              cards = [
                {
                  btn_color: 'btn-success',
                  text_btn: 'Acheter',
                  action: 'deal'
                },
                {
                  btn_color: 'btn-secondary',
                  text_btn: 'Partir',
                  action: 'leave'
                }
              ]
              break
            case 'healer':
              text =
                'Vous tombez face à une personne se disant <span class="text-warning"><i>soigneur</i></span>.</br>Elle vous propose de vous aider (<span class="text-warning"><i>soin de 30%</i></span>). Que voulez-vous faire ?'
              cards = [
                {
                  btn_color: 'btn-success',
                  text_btn: 'Merci',
                  action: 'heal'
                },
                {
                  btn_color: 'btn-secondary',
                  text_btn: 'Non merci',
                  action: 'leave'
                }
              ]
              break
            default:
              text =
                'Le bâtiment semble infesté de <span class="text-warning"><i>monstres</i></span>. Que voulez-vous faire ?'
              cards = [
                {
                  btn_color: 'btn-danger',
                  text_btn: 'Euh ben go...',
                  action: 'fight'
                },
                {
                  btn_color: 'btn-success',
                  text_btn: 'Foncer!',
                  action: 'fight'
                }
              ]
              break
          }
          this.setState({
            user: response.data,
            loading: false,
            cards: cards,
            room: room,
            text: text
          })
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.response.data
        })
      })
  }

  getHandleImage = () => {
    const { type, user, room, typeExploration } = this.state

    switch (type) {
      case 'arene-boss':
        if (typeExploration === 'guild_exploration') {
          return process.env.PUBLIC_URL + '/img/boss/' + room.image
        }
        return process.env.PUBLIC_URL + '/img/boss/' + user.exploration[1].image
      case 'treasure':
        return process.env.PUBLIC_URL + '/img/chest-close.svg'
      case 'dealer':
        return process.env.PUBLIC_URL + '/img/hammer.svg'
      case 'healer':
        return process.env.PUBLIC_URL + '/img/heal.svg'
      default:
        return process.env.PUBLIC_URL + '/img/versus.svg'
    }
  }

  handleClick = (card) => {
    if (card.action === 'fight-boss') {
      if (this.state.typeExploration === 'guild_exploration') {
        let fightExists = _.filter(this.state.user.fights, {
          type: 'waiting',
          monster: { id: this.state.room.monster }
        })
        if (fightExists.length > 0) {
          this.setState({ redirect: '/fight/' + fightExists[0].id })
        } else {
          this.createFight(false)
        }
      } else {
        this.createFight(true)
      }
    } else if (card.action === 'fight') {
      this.createFight(false)
    } else if (card.action === 'deal') {
      if (
        this.state.room.cost &&
        this.state.room.cost <= this.state.user.money
      ) {
        this.setUserAndRedirect('/exploration', false, true)
      }
    } else if (card.action === 'heal') {
      this.setUserAndRedirect('/exploration', true, false)
    } else if (card.action === 'leave') {
      this.setUserAndRedirect('/exploration', false, false)
    }
  }

  createFight = (isBossFight) => {
    const { user, room } = this.state

    axios
      .post(
        process.env.REACT_APP_API_URL + '/fights',
        {
          user: {
            id: user.id
          },
          monster: {
            id: isBossFight ? user.exploration[1].idBoss : room.monster
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`
          }
        }
      )
      .then((response) => {
        if (response.data) {
          this.setUserAndRedirect('/fight/' + response.data.id, false, false)
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  setUserAndRedirect = (redirect, healing, dealing) => {
    const { idExploration, user, room } = this.state

    // 1 - Change position
    user.exploration[
      Object.keys(user.exploration)[Object.keys(user.exploration).length - 1]
    ].position = idExploration

    // 2.1 - Change money + add item
    if (dealing) {
      user.money = user.money - room.cost
      user.items.push({
        item: {
          id: room.item
        },
        user: {
          id: user.id
        }
      })
    }

    // 2.2 - Change hp
    if (healing) {
      const explorationUser =
        user.exploration[
          Object.keys(user.exploration)[
            Object.keys(user.exploration).length - 1
          ]
        ]

      if (
        Math.round(explorationUser.hp + (explorationUser.hp * 30) / 100) >
        explorationUser.maxHp
      ) {
        user.exploration[
          Object.keys(user.exploration)[
            Object.keys(user.exploration).length - 1
          ]
        ].hp = explorationUser.maxHp
      } else {
        user.exploration[
          Object.keys(user.exploration)[
            Object.keys(user.exploration).length - 1
          ]
        ].hp = Math.round(explorationUser.hp + (explorationUser.hp * 30) / 100)
      }
    }

    // 3 - Send to api
    axios
      .put(
        process.env.REACT_APP_API_URL + '/users/' + user.id,
        {
          money: user.money,
          items: user.items,
          exploration: user.exploration
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`
          }
        }
      )
      .then((response) => {
        if (response.data) {
          this.setState({
            user: response.data,
            redirect: redirect
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      })
  }

  render() {
    const {
      error,
      loading,
      redirect,
      user,
      text,
      room,
      typeExploration
    } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <Container className="position-fixed container-fluid">
        {loading && <Loader />}
        {user && !_.includes(window.location.href, 'guild_exploration') && (
          <HpNavBar user={user} />
        )}
        {user && _.includes(window.location.href, 'guild_exploration') && (
          <ExperienceNavBar user={user} />
        )}
        <SubContainer className="container-fluid">
          {error && (
            <span className="text-danger">
              <b>Erreur :</b> {error.message}
            </span>
          )}
          {user && (
            <SubSubContainer className="container">
              <div className="row align-items-center">
                <TextDescription
                  className="col-sm-12"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
              <div className="row align-items-center">
                {_.map(this.state.cards, (card, index) => (
                  <CardChoice
                    key={index}
                    position={index}
                    card={card}
                    money={user.money}
                    room={room}
                    onClick={(card) => this.handleClick(card)}
                  />
                ))}
              </div>
              <AvatarBox>
                <div>
                  <AcademySprite name={user.academy.name} />
                </div>
                <div className="m-auto">
                  {typeExploration === 'guild_exploration' ? (
                    <MonsterSprite image={room.image} />
                  ) : (
                    <ImageChoice
                      src={this.getHandleImage()}
                      alt="personnage de exploration"
                      className="animated fadeInRight slow"
                      type={typeExploration}
                    />
                  )}
                </div>
              </AvatarBox>
            </SubSubContainer>
          )}
        </SubContainer>
      </Container>
    )
  }
}

Choice.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string,
      idExploration: PropTypes.string,
      typeExploration: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Choice
