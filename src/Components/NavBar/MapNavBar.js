import React, { Component } from 'react'
import styled from '@emotion/styled'
import ProgressBar from '../Character/ProgressBar'
import NavBar from './NavBar'
import PropTypes from 'prop-types'

const Bar = styled.div`
  padding-top: 5px;
  text-align: center;
`

class MapNavBar extends Component {
  render() {
    const { user } = this.props

    return (
      <NavBar user={user}>
        <>
          {user && (
            <Bar className="col-sm-2 offset-sm-8">
              <div>Niv {user.level}</div>
              <ProgressBar
                actual={user.experience - user.xpToActualLevel}
                max={user.xpToNextLevel - user.xpToActualLevel}
                color="#FFC312"
                transparentColor="#7F8286"
              />
            </Bar>
          )}
        </>
      </NavBar>
    )
  }
}

MapNavBar.propTypes = {
  user: PropTypes.shape({})
}

export default MapNavBar
