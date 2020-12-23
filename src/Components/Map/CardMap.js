import React, { Component } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const LevelNeededBackground = styled.div`
  position: absolute;
  font-size: 2vw;
  padding: 15px 25px 5px 10px;
  margin-left: -2%;
  -moz-box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.4);
`

const RequirementBlock = styled(LevelNeededBackground)`
  background-color: #000;
  color: #fff;
`

const RequirementNotBlock = styled(LevelNeededBackground)`
  background-color: #ffc312;
  color: #000;
  text-shadow: 1px 1px 2px white;
`

const TitleCard = styled.div`
  font-size: 3vw;
  width: 100%;
  text-shadow: #000 1px 0 10px;
  position: absolute;
  text-align: center;
  margin: auto;
  color: #fff;
  padding-top: 25%;
  text-shadow: 1px 1px 2px black;
`

const AdventureButton = styled.button`
  background-color: #ffc312;
  color: black;

  &:hover {
    color: #fff;
  }
`

class CardMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: undefined
    }
  }
  mapBlocked() {
    return this.props.map.levelMin > this.props.user.level ?? false
  }

  displayCardLevel() {
    if (this.props.isGuild || this.props.isCrafting) {
      return ''
    }

    if (this.mapBlocked() === true) {
      return (
        <RequirementBlock className="mt-2">
          <i className="fas fa-lock" />
          &nbsp;Niveau {this.props.map.levelMin}
        </RequirementBlock>
      )
    } else {
      return (
        <RequirementNotBlock className="mt-2">
          Niveau {this.props.map.levelMin}
        </RequirementNotBlock>
      )
    }
  }

  handleClick() {
    const { map, user, isGuild, isCrafting } = this.props

    if (isGuild) {
      this.setState({ redirect: '/guild/' + user.guild.id })
    } else if (isCrafting) {
      this.setState({ redirect: '/crafting' })
    } else {
      if (user.exploration) {
        this.setState({ redirect: '/exploration' })
      } else {
        axios
          .post(
            process.env.REACT_APP_API_URL +
              '/users/' +
              user.id +
              '/map/' +
              map.id,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth-token')}`
              }
            }
          )
          .then(() => {
            this.setState({ redirect: '/exploration' })
          })
          .catch((error) => {
            this.setState({
              error: error.response.status
            })
          })
      }
    }
  }

  render() {
    const { map, isGuild, isCrafting } = this.props
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <div className="col-sm-5 mt-5 mb-5">
        <div className="card">
          {this.displayCardLevel()}
          <TitleCard>{map.name}</TitleCard>
          <img
            className="card-img-top"
            src={
              isGuild
                ? 'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1586838637024-ZX7JWSH8KJYZAJA4P960/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/Pirates-Outlaws1.jpg?format=2500w'
                : isCrafting
                ? 'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1586838637024-ZX7JWSH8KJYZAJA4P960/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/Pirates-Outlaws1.jpg?format=2500w'
                : map.img_url ??
                  'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1561633356762-4SM41FGVPRSU22E0YDD3/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/1920x1080_6.jpg'
            }
            alt={map.name}
          />
          <AdventureButton
            onClick={() => this.handleClick()}
            className={`card-footer btn${this.mapBlocked() ? ' disabled' : ''}`}
          >
            {this.mapBlocked() === true && (
              <>
                <i className="fas fa-lock" />
                &nbsp;
              </>
            )}
            {isGuild && <>Guilder</>}
            {isCrafting && <>Forger</>}
            {!isCrafting && !isGuild && <>Explorer</>}
          </AdventureButton>
        </div>
      </div>
    )
  }
}

CardMap.propTypes = {
  map: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    levelMin: PropTypes.number,
    nbFloors: PropTypes.number,
    img_url: PropTypes.string
  }),
  user: PropTypes.shape({
    id: PropTypes.number,
    level: PropTypes.number,
    exploration: PropTypes.string,
    guild: PropTypes.shape({
      id: PropTypes.number
    })
  }),
  isGuild: PropTypes.bool,
  isCrafting: PropTypes.bool
}

export default CardMap
