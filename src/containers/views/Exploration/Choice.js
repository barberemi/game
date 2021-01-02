import React, { Component } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import CardChoice from '../../../Components/Exploration/CardChoice'
import PropTypes from 'prop-types'
import ExplorationNavBar from '../../../Components/NavBar/ExplorationNavBar'
import Loader from '../../../Components/Loader/Loader'
import axios from 'axios'
import Cookies from 'js-cookie'

const Container = styled.div`
  background-image: url('https://cdnb.artstation.com/p/assets/images/images/028/312/273/large/yarki-studio-treasure-island-artstation-1.jpg?1594115694');
  background-size: 100% 100%;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  height: calc(100% - 100px);
  text-align: center;
  color: white;
  min-height: 250px;
  overflow-y: scroll;
`

const SubContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6) !important;
  margin-top: 50px;
  border-radius: 0.3em;
`

const TextDescription = styled.div`
  font-size: 20px;
  text-shadow: 1px 1px 2px black;
`

class Choice extends Component {
  constructor(props) {
    super(props)

    let text = undefined
    let cards = []
    switch (this.props.match.params.type) {
      case 'arene-boss':
        text =
          'Vous êtes sur le point de vous battre contre le <span class="text-warning"><i>champion</i></span> de la carte, êtes-vous prêt ?'
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
      case 'dealer':
        text =
          "Oh mais dites-donc, vous êtes tombé nez à nez avec le forgeron!<br/> Il souhaite vous aider à <span class='text-warning'><i>forger un objet</i></span>, moyennant finance, bien évidemment."
        cards = [
          {
            img_url:
              'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1561633356762-4SM41FGVPRSU22E0YDD3/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/1920x1080_6.jpg',
            text_btn: 'Acheter',
            action: 'buy'
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
          'Vous tombez face à une personne se disant <span class="text-warning"><i>soigneur</i></span>.</br>Elle vous propose de vous aider. Que voulez-vous faire ?'
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

    this.state = {
      type: this.props.match.params.type,
      explorationId: parseInt(this.props.match.params.explorationId),
      user: undefined,
      loading: true,
      text: text,
      cards: cards
    }

    this.getHandleImage = this.getHandleImage.bind(this)
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
          this.setState({
            user: response.data,
            loading: false
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
        return process.env.PUBLIC_URL + '/img/' + user.exploration[1].image
      case 'dealer':
        return process.env.PUBLIC_URL + '/img/forgeron.png'
      case 'healer':
        return process.env.PUBLIC_URL + '/img/forgeron.png'
      default:
        return process.env.PUBLIC_URL + '/img/rubillax.png'
    }
  }

  render() {
    const { error, loading, user, text } = this.state

    return (
      <>
        <ExplorationNavBar user={user} />
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
                    alt="personnage de exploratino"
                    height="250px"
                  />
                </div>
                {_.map(this.state.cards, (card, index) => (
                  <CardChoice
                    key={index}
                    card={card}
                    type={this.state.type}
                    explorationId={this.state.explorationId}
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
      explorationId: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Choice
