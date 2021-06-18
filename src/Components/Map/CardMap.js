import React, { Component } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import axios from 'axios'
import Cookies from 'js-cookie'

const Card = styled.div`
  margin-top: 100px;
`

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
  background-color: #f26725;
  color: #fff;
  text-shadow: 1px 1px 2px black;
`

const Pin = styled.img`
  position: absolute;
  right: -15px;
  top: -10px;
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

const IconBoss = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #000;
  background-color: #fff;
  margin-right: 10px;
  cursor: pointer;
`

const IconTreasure = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #000;
  background-color: #fff;
  margin-right: 10px;
  cursor: pointer;
`

class CardMap extends Component {
  mapBlocked() {
    return this.props.map.levelMin > this.props.user.level ?? false
  }

  displayCardLevel() {
    if (this.props.map.levelMin === 0) {
      return ''
    } else if (this.mapBlocked() === true) {
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

  handleClick(type) {
    const { map, user, redirectTo } = this.props

    if (this.mapBlocked() === false) {
      if (user.exploration) {
        redirectTo('/exploration')
      } else {
        axios
          .post(
            process.env.REACT_APP_API_URL +
              '/users/' +
              user.id +
              '/map/' +
              map.id,
            { type: type },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth-token')}`
              }
            }
          )
          .then(() => {
            redirectTo('/exploration')
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
    const { map, user } = this.props

    return (
      <Card className="col-sm-5">
        <div className={`card mt-5`}>
          {this.displayCardLevel()}
          {user.exploration && user.exploration[1].map === map.id && (
            <>
              <Pin
                src={process.env.PUBLIC_URL + '/img/pin.svg'}
                width="35"
                height="35"
                alt="in progress pin"
                data-tip="Exploration en cours"
              />
              <ReactTooltip />
            </>
          )}
          <TitleCard>{map.name}</TitleCard>
          <img
            src={process.env.PUBLIC_URL + '/img/backgrounds/' + map.image}
            alt={map.name}
          />
        </div>
        {!this.mapBlocked() &&
          ((user.exploration && user.exploration[1].map === map.id) ||
            !user.exploration) && (
            <div className="d-flex justify-content-center">
              {(!user.exploration ||
                user.exploration[1].type === 'treasure') && (
                <IconTreasure onClick={() => this.handleClick('treasure')}>
                  <img
                    src={process.env.PUBLIC_URL + '/img/chest-close.svg'}
                    width="50px"
                    style={{ paddingTop: '7px' }}
                    alt="chasse au trésor"
                    data-tip="Chasse au trésor"
                  />
                </IconTreasure>
              )}
              {map.boss &&
                (!user.exploration ||
                  user.exploration[1].type !== 'treasure') && (
                  <IconBoss
                    src={process.env.PUBLIC_URL + '/img/boss/' + map.boss.image}
                    onClick={() => this.handleClick('boss')}
                    data-tip="Champion en fin d'exploration"
                  />
                )}
            </div>
          )}
        <ReactTooltip />
      </Card>
    )
  }
}

CardMap.propTypes = {
  map: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    levelMin: PropTypes.number,
    nbFloors: PropTypes.number,
    image: PropTypes.string,
    boss: PropTypes.shape({
      image: PropTypes.string
    })
  }),
  user: PropTypes.shape({
    id: PropTypes.number,
    level: PropTypes.number,
    exploration: PropTypes.shape({}),
    guild: PropTypes.shape({
      id: PropTypes.number
    })
  }),
  redirectTo: PropTypes.func
}

export default CardMap
