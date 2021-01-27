import React, { Component } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import CardChoice from '../../../Components/Exploration/CardChoice'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import HpNavBar from '../../../Components/NavBar/HpNavBar'
import Loader from '../../../Components/Loader/Loader'
import axios from 'axios'
import Cookies from 'js-cookie'

const Container = styled.div`
  background-image: url('https://cdna.artstation.com/p/assets/images/images/004/345/358/large/nikita-bulatov-58.jpg?1482749515');
  background-size: cover;
  background-attachment: fixed;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  text-align: center;
  color: white;
  min-height: 100%;
  height: 100%;
  overflow-y: scroll;
`

const SubContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6) !important;
  border-radius: 0.3em;
  margin-top: 100px;
`

const TextDescription = styled.div`
  font-size: 20px;
  text-shadow: 1px 1px 2px black;
`

class Choice extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: this.props.match.params.type,
      idExploration: parseInt(this.props.match.params.idExploration),
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
          // 1 - Check if last fight is waiting
          let fightExists = _.filter(response.data.fights, {
            type: 'waiting',
            monster: { isGuildBoss: false }
          })
          if (fightExists.length > 0) {
            this.setState({ redirect: '/fight/' + fightExists[0].id })
          }

          // 2 - Get room
          let text = undefined
          let cards = []
          let room = undefined
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

          // 3 - Set cards and other
          switch (this.state.type) {
            case 'arene-boss':
              text =
                'Vous êtes sur le point de vous battre contre le <span class="text-warning"><i>champion</i></span> de la carte, êtes-vous prêt ?'
              cards = [
                {
                  img_url:
                    'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1561633356762-4SM41FGVPRSU22E0YDD3/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/1920x1080_6.jpg',
                  text_btn: 'Euh ben go...',
                  action: 'fight-boss'
                },
                {
                  img_url:
                    'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1563177869793-AAMHWHMYW2UPHBIH9ACV/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/PiratesOutlaws-Arena6.jpg',
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
                  img_url:
                    'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1561633356762-4SM41FGVPRSU22E0YDD3/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/1920x1080_6.jpg',
                  text_btn: 'Acheter',
                  action: 'deal'
                },
                {
                  img_url:
                    'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1563177869793-AAMHWHMYW2UPHBIH9ACV/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/PiratesOutlaws-Arena6.jpg',
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
                  img_url:
                    'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1561633356762-4SM41FGVPRSU22E0YDD3/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/1920x1080_6.jpg',
                  text_btn: 'Merci',
                  action: 'heal'
                },
                {
                  img_url:
                    'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1563177869793-AAMHWHMYW2UPHBIH9ACV/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/PiratesOutlaws-Arena6.jpg',
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
                  img_url:
                    'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1561633356762-4SM41FGVPRSU22E0YDD3/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/1920x1080_6.jpg',
                  text_btn: 'Euh ben go...',
                  action: 'fight'
                },
                {
                  img_url:
                    'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1563177869793-AAMHWHMYW2UPHBIH9ACV/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/PiratesOutlaws-Arena6.jpg',
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
    const { type, user } = this.state

    switch (type) {
      case 'arene-boss':
        return process.env.PUBLIC_URL + '/img/boss/' + user.exploration[1].image
      case 'dealer':
        return process.env.PUBLIC_URL + '/img/forgeron.png'
      case 'healer':
        return process.env.PUBLIC_URL + '/img/forgeron.png'
      default:
        return process.env.PUBLIC_URL + '/img/rubillax.png'
    }
  }

  handleClick = (card) => {
    if (card.action === 'fight-boss') {
      this.createFight(true)
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
    const { error, loading, redirect, user, text, room } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <>
        <HpNavBar user={user} />
        <Container className="container-fluid align-middle">
          {loading && <Loader />}
          {error && (
            <span className="text-danger">
              <b>Erreur :</b> {error.message}
            </span>
          )}
          {user && (
            <SubContainer className="container">
              <div className="row align-items-center">
                <TextDescription
                  className="col-sm-12 mt-5"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
              <div className="row align-items-center">
                <div className="col-sm-3 offset-sm-1 mt-5 mb-5">
                  <img
                    src={this.getHandleImage()}
                    alt="personnage de exploration"
                    height="250px"
                  />
                </div>
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
            </SubContainer>
          )}
        </Container>
      </>
    )
  }
}

Choice.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string,
      idExploration: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Choice
