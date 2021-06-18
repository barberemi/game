import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Tutorial from '../Tutorial/Tutorial'

const AvatarDiv = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: #fff;

  ${(props) =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `};

  ${(props) =>
    props.flip &&
    css`
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
    `};
`

class AcademyAvatar extends Component {
  render() {
    return (
      <AvatarDiv
        src={
          process.env.PUBLIC_URL +
          '/img/academies/' +
          this.props.name +
          '/Alert1H/0.png'
        }
        alt={this.props.name}
        backgroundColor={
          this.props.name === 'warrior'
            ? '#dc3545'
            : this.props.name === 'hunter'
            ? '#28a745'
            : '#007bff'
        }
        flip={this.props.flip}
      />
    )
  }
}

AcademyAvatar.defaultProps = {
  flip: false
}

AcademyAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  flip: PropTypes.bool
}

export default AcademyAvatar
