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
  cardBlocked() {
    const { card, user } = this.props

    return card.level_min > user.level ?? false
  }

  displayCardLevel() {
    if (this.cardBlocked() === true) {
      return (
        <RequirementBlock className="mt-2">
          <i className="fas fa-lock" />
          &nbsp;Niveau {this.props.card.level_min}
        </RequirementBlock>
      )
    } else {
      return (
        <RequirementNotBlock className="mt-2">
          Niveau {this.props.card.level_min}
        </RequirementNotBlock>
      )
    }
  }

  render() {
    return (
      <div className="col-sm-5 mt-5 mb-5">
        <div className="card">
          {this.displayCardLevel()}
          <TitleCard>{this.props.card.name}</TitleCard>
          <img
            className="card-img-top"
            src={this.props.card.img_url}
            alt={this.props.card.name}
          />
          <AdventureButton
            to="/exploration"
            className={`card-footer btn${
              this.cardBlocked() ? ' disabled' : ''
            }`}
          >
            {this.cardBlocked() === true && (
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
  card: PropTypes.shape({
    name: PropTypes.string,
    level_min: PropTypes.number,
    img_url: PropTypes.string
  }),
  user: PropTypes.shape({
    level: PropTypes.number
  })
}

export default CardMap
