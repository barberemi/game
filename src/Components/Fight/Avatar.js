import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const HitNumber = styled.div`
  top: 80px;
  z-index: 10;
  font-size: 24px;
  position: absolute;

  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  animation-duration: 2s;
`

class Avatar extends Component {
  animation() {
    const { faint, isHit } = this.props

    if (isHit) {
      return 'animated headShake'
    }
    if (faint === true) {
      return 'animated fadeOut slow'
    }
    if (faint === null) {
      return 'animated fadeInUp'
    }
    if (faint === undefined) {
      return 'hide'
    }
  }

  render() {
    return (
      <div className={this.animation()}>
        {this.props.isHit && (
          <HitNumber
            className={`${
              this.props.isPlayer
                ? 'offset-sm-9 col-sm-1'
                : 'offset-sm-2 col-sm-1'
            } animated bounceOut ${
              this.props.isHit.type === 'heal' ? 'text-success' : 'text-danger'
            }`}
          >
            {this.props.isHit.amount}
          </HitNumber>
        )}
        <img
          className={this.props.className}
          src={process.env.PUBLIC_URL + '/img/' + this.props.logoName}
          alt={this.props.logoName}
        />
      </div>
    )
  }
}

Avatar.propTypes = {
  faint: PropTypes.bool,
  isHit: PropTypes.bool,
  logoName: PropTypes.string,
  className: PropTypes.string,
  isPlayer: PropTypes.bool
}

export default Avatar
