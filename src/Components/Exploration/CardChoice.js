import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CardChoice extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render() {
    const { card, position, room, money } = this.props
    const { loading } = this.state

    return (
      <div
        className={`col-sm-3 mt-3 ${position === 0 ? 'offset-sm-3' : ''}`}
        style={{ fontSize: '2hv' }}
      >
        <div className="card">
          <button
            className={`btn ${card.btn_color}${
              room && room.cost && position === 0 && room.cost > money
                ? ' disabled'
                : ''
            }`}
            onClick={() => {
              if (
                !(
                  room &&
                  room.cost &&
                  position === 0 &&
                  room.cost > money &&
                  card.action === 'deal'
                )
              ) {
                this.setState({ loading: true })
                this.props.onClick(card)
              }
            }}
          >
            {loading && (
              <img
                src={process.env.PUBLIC_URL + '/img/tail-spinner.svg'}
                width="20"
                height="20"
                alt="spinner"
              />
            )}
            {!loading && (
              <>
                {room && room.cost && position === 0 && room.cost > money && (
                  <>
                    <i className="fas fa-lock" />
                    &nbsp;
                  </>
                )}
                {card.action !== 'deal' && card.text_btn}
                {card.action === 'deal' && (
                  <>
                    {room.cost}{' '}
                    <img
                      src={process.env.PUBLIC_URL + '/img/money.svg'}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="Thune"
                    />
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    )
  }
}

CardChoice.propTypes = {
  card: PropTypes.shape({
    btn_color: PropTypes.string,
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
