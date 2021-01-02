import React, { Component } from 'react'
import styled from '@emotion/styled'
import ProgressBar from '../Character/ProgressBar'
import NavBar from './NavBar'
import PropTypes from 'prop-types'

const Bar = styled.div`
  padding-top: 5px;
  text-align: center;
`

const MoneyBox = styled.div`
  text-align: center;
  padding-top: 5px;
`

class ExplorationNavBar extends Component {
  render() {
    const { user } = this.props

    return (
      <NavBar user={user}>
        <>
          {user && (
            <>
              <MoneyBox className="col-sm-2 offset-sm-4">
                <div>
                  <img
                    src={process.env.PUBLIC_URL + '/img/money.svg'}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Thune"
                  />
                </div>
                <div>{user.money ? user.money : 'Aucune'} thune</div>
              </MoneyBox>
              <Bar className="col-sm-2">
                <div>Confiance</div>
                <ProgressBar
                  actual={300}
                  max={1000}
                  color="#182C51"
                  transparentColor="#5388A3"
                />
              </Bar>
              <Bar className="col-sm-2">
                <div>PV</div>
                <ProgressBar
                  actual={
                    user.hp
                      ? user.hp
                      : user.exploration[Object.keys(user.exploration).pop()].hp
                  }
                  max={
                    user.maxHp
                      ? user.maxHp
                      : user.exploration[Object.keys(user.exploration).pop()]
                          .maxHp
                  }
                  color="#DC3545"
                  transparentColor="#e09a9a"
                />
              </Bar>
            </>
          )}
        </>
      </NavBar>
    )
  }
}

ExplorationNavBar.propTypes = {
  user: PropTypes.shape({})
}

export default ExplorationNavBar
