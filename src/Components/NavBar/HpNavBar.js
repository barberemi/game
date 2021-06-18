import React, { Component } from 'react'
import styled from '@emotion/styled'
import ProgressBar from '../Character/ProgressBar'
import PropTypes from 'prop-types'
import AcademyAvatar from '../Character/AcademyAvatar'

const NavBarGlobale = styled.nav`
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.4) !important;
  padding-top: 5px;
  padding-bottom: 5px;
  position: fixed;
  right: 0;
  width: 500px;
  z-index: 20;
`

const DisplayFlex = styled.div`
  display: flex;
  flex-direction: row;
`

const MoneyBox = styled.div`
  text-align: center;
  padding-top: 5px;
`

const Bar = styled.div`
  padding-top: 5px;
  text-align: center;
`

class HpNavBar extends Component {
  render() {
    const { user } = this.props

    return (
      <NavBarGlobale role="navigation">
        <DisplayFlex className="col-sm-12 text-white justify-content-end">
          {user && (
            <>
              <MoneyBox>
                <div>
                  <img
                    src={process.env.PUBLIC_URL + '/img/money.svg'}
                    width="30"
                    height="30"
                    alt="Thune"
                  />
                </div>
                <div>{user.money ? user.money : 'Aucun'}</div>
              </MoneyBox>
              <Bar className="col-sm-9">
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
              <AcademyAvatar name={user.academy.name} flip={true} />
            </>
          )}
        </DisplayFlex>
      </NavBarGlobale>
    )
  }
}

HpNavBar.propTypes = {
  user: PropTypes.shape({})
}

export default HpNavBar
