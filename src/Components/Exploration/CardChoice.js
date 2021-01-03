import React, { Component } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const LevelNeededBackground = styled.div`
  position: absolute;
  font-size: 16px;
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

const AdventureButton = styled.button`
  background-color: #ffc312;
  color: black;

  &:hover {
    color: #fff;
  }
`

class CardChoice extends Component {
  render() {
    const { card, position, room, money } = this.props

    return (
      <div
        className={`col-sm-3 mt-5 mb-5 ${position === 0 ? 'offset-sm-2' : ''}`}
      >
        <div className="card">
          {room.cost && position === 0 && room.cost > money && (
            <RequirementBlock className="mt-2">
              &nbsp;Prix : {room.cost}&nbsp;
              <img
                src={process.env.PUBLIC_URL + '/img/money.svg'}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Thune"
              />
            </RequirementBlock>
          )}
          {room.cost && position === 0 && room.cost <= money && (
            <RequirementNotBlock className="mt-2">
              &nbsp;Prix : {room.cost}&nbsp;
              <img
                src={process.env.PUBLIC_URL + '/img/money.svg'}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Thune"
              />
            </RequirementNotBlock>
          )}
          <img className="card-img-top" src={card.img_url} alt={card.name} />
          <AdventureButton
            className={`card-footer btn${
              room.cost && position === 0 && room.cost > money
                ? ' disabled'
                : ''
            }`}
            onClick={() => {
              this.props.onClick(card)
            }}
          >
            {room.cost && position === 0 && room.cost > money && (
              <>
                <i className="fas fa-lock" />
                &nbsp;
              </>
            )}
            {card.text_btn}
          </AdventureButton>
        </div>
      </div>
    )
  }
}

CardChoice.propTypes = {
  card: PropTypes.shape({
    img_url: PropTypes.string,
    text_btn: PropTypes.string,
    name: PropTypes.string,
    cost: PropTypes.number,
    action: PropTypes.string
  }),
  position: PropTypes.number,
  money: PropTypes.number,
  room: PropTypes.shape({
    cost: PropTypes.number
  }),
  onClick: PropTypes.func
}

export default CardChoice
