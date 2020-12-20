import React, { Component } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const LevelNeededBackground = styled.div`
  position: absolute;
  font-size: 2vw;
  padding: 10px 25px 5px 10px;
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

const AdventureButton = styled(Link)`
  background-color: #ffc312;
  color: black;

  &:hover {
    color: #fff;
  }
`

class CardMap extends Component {
  mapBlocked() {
    const { map, user } = this.props

    return map.levelMin > user.level ?? false
  }

  displayCardLevel(isGuild) {
    if (isGuild) {
      return (
        <RequirementNotBlock className="mt-2">Ma guilde</RequirementNotBlock>
      )
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

  render() {
    return (
      <div className="col-sm-5 mt-5 mb-5">
        <div className="card">
          {this.displayCardLevel(this.props.isGuild)}
          <TitleCard>{this.props.map.name}</TitleCard>
          <img
            className="card-img-top"
            src={
              this.props.isGuild
                ? 'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1586838637024-ZX7JWSH8KJYZAJA4P960/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/Pirates-Outlaws1.jpg?format=2500w'
                : this.props.map.img_url ??
                  'https://images.squarespace-cdn.com/content/v1/5aaf208470e802c436dc1280/1561633356762-4SM41FGVPRSU22E0YDD3/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/1920x1080_6.jpg'
            }
            alt={this.props.map.name}
          />
          <AdventureButton
            to={
              this.props.isGuild
                ? '/guild/' + this.props.user.guild.id
                : '/exploration'
            }
            className={`card-footer btn${this.mapBlocked() ? ' disabled' : ''}`}
          >
            {this.mapBlocked() === true && (
              <>
                <i className="fas fa-lock" />
                &nbsp;
              </>
            )}
            S’y aventurer
          </AdventureButton>
        </div>
      </div>
    )
  }
}

CardMap.propTypes = {
  map: PropTypes.shape({
    name: PropTypes.string,
    levelMin: PropTypes.number,
    nbFloors: PropTypes.number,
    img_url: PropTypes.string
  }),
  user: PropTypes.shape({
    level: PropTypes.number
  }),
  isGuild: PropTypes.bool
}

export default CardMap
